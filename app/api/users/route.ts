import { type NextRequest, NextResponse } from "next/server"
import { pool } from "@/lib/db"
import { getCurrentUser, hashPassword } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || !["admin", "editor"].includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const role = searchParams.get("role")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const offset = (page - 1) * limit

    const client = await pool.connect()
    try {
      let query = `
        SELECT 
          id, name, email, role, status, avatar_url, created_at, updated_at
        FROM users 
        WHERE 1=1
      `
      const params: any[] = []
      let paramCount = 0

      // Filter by role
      if (role && role !== "all") {
        paramCount++
        query += ` AND role = $${paramCount}`
        params.push(role)
      }

      // Filter by status
      if (status && status !== "all") {
        paramCount++
        query += ` AND status = $${paramCount}`
        params.push(status)
      }

      // Search functionality
      if (search) {
        paramCount++
        query += ` AND (name ILIKE $${paramCount} OR email ILIKE $${paramCount})`
        params.push(`%${search}%`)
      }

      // Add ordering and pagination
      query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`
      params.push(limit, offset)

      const result = await client.query(query, params)

      // Get total count
      let countQuery = `SELECT COUNT(*) FROM users WHERE 1=1`
      const countParams: any[] = []
      let countParamCount = 0

      if (role && role !== "all") {
        countParamCount++
        countQuery += ` AND role = $${countParamCount}`
        countParams.push(role)
      }

      if (status && status !== "all") {
        countParamCount++
        countQuery += ` AND status = $${countParamCount}`
        countParams.push(status)
      }

      if (search) {
        countParamCount++
        countQuery += ` AND (name ILIKE $${countParamCount} OR email ILIKE $${countParamCount})`
        countParams.push(`%${search}%`)
      }

      const countResult = await client.query(countQuery, countParams)
      const total = Number.parseInt(countResult.rows[0].count)

      return NextResponse.json({
        users: result.rows,
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
    console.error("Get users error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || !["admin", "editor"].includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { name, email, password, role, status } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const client = await pool.connect()
    try {
      // Check if email already exists
      const emailCheck = await client.query("SELECT id FROM users WHERE email = $1", [email.toLowerCase()])

      if (emailCheck.rows.length > 0) {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 })
      }

      // Hash password
      const passwordHash = await hashPassword(password)

      // Insert new user
      const result = await client.query(
        `
        INSERT INTO users (name, email, password_hash, role, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, email, role, status, created_at
      `,
        [name, email.toLowerCase(), passwordHash, role || "author", status || "active"],
      )

      return NextResponse.json({
        success: true,
        user: result.rows[0],
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
