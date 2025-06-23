import { type NextRequest, NextResponse } from "next/server"
import { pool } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const offset = (page - 1) * limit

    const client = await pool.connect()
    try {
      let query = `
        SELECT 
          p.*,
          u.name as author_name,
          u.avatar_url as author_avatar
        FROM posts p
        JOIN users u ON p.author_id = u.id
        WHERE 1=1
      `
      const params: any[] = []
      let paramCount = 0

      // Filter by status
      if (status && status !== "all") {
        paramCount++
        query += ` AND p.status = $${paramCount}`
        params.push(status)
      }

      // Search functionality
      if (search) {
        paramCount++
        query += ` AND (p.title ILIKE $${paramCount} OR p.content ILIKE $${paramCount})`
        params.push(`%${search}%`)
      }

      // Role-based filtering
      if (user.role === "author") {
        paramCount++
        query += ` AND p.author_id = $${paramCount}`
        params.push(user.id)
      }

      // Add ordering and pagination
      query += ` ORDER BY p.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`
      params.push(limit, offset)

      const result = await client.query(query, params)

      // Get total count for pagination
      let countQuery = `
        SELECT COUNT(*) 
        FROM posts p 
        WHERE 1=1
      `
      const countParams: any[] = []
      let countParamCount = 0

      if (status && status !== "all") {
        countParamCount++
        countQuery += ` AND p.status = $${countParamCount}`
        countParams.push(status)
      }

      if (search) {
        countParamCount++
        countQuery += ` AND (p.title ILIKE $${countParamCount} OR p.content ILIKE $${countParamCount})`
        countParams.push(`%${search}%`)
      }

      if (user.role === "author") {
        countParamCount++
        countQuery += ` AND p.author_id = $${countParamCount}`
        countParams.push(user.id)
      }

      const countResult = await client.query(countQuery, countParams)
      const total = Number.parseInt(countResult.rows[0].count)

      return NextResponse.json({
        posts: result.rows,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("Get posts error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content, excerpt, slug, status, tags, meta_title, meta_description } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Generate slug if not provided
    const finalSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

    const client = await pool.connect()
    try {
      // Check if slug already exists
      const slugCheck = await client.query("SELECT id FROM posts WHERE slug = $1", [finalSlug])

      if (slugCheck.rows.length > 0) {
        return NextResponse.json({ error: "Slug already exists" }, { status: 400 })
      }

      // Insert new post
      const result = await client.query(
        `
        INSERT INTO posts (
          title, content, excerpt, slug, status, author_id, 
          tags, meta_title, meta_description, published_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `,
        [
          title,
          content,
          excerpt,
          finalSlug,
          status,
          user.id,
          tags || [],
          meta_title,
          meta_description,
          status === "published" ? new Date() : null,
        ],
      )

      return NextResponse.json({
        success: true,
        post: result.rows[0],
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("Create post error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
