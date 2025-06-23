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
    const period = searchParams.get("period") || "7d" // 7d, 30d, 90d
    const type = searchParams.get("type") || "overview" // overview, posts, users

    const client = await pool.connect()
    try {
      let dateFilter = ""
      switch (period) {
        case "7d":
          dateFilter = "date >= CURRENT_DATE - INTERVAL '7 days'"
          break
        case "30d":
          dateFilter = "date >= CURRENT_DATE - INTERVAL '30 days'"
          break
        case "90d":
          dateFilter = "date >= CURRENT_DATE - INTERVAL '90 days'"
          break
        default:
          dateFilter = "date >= CURRENT_DATE - INTERVAL '7 days'"
      }

      if (type === "overview") {
        // Get overview statistics
        const [postsCount, usersCount, viewsCount, analyticsData] = await Promise.all([
          client.query("SELECT COUNT(*) as count FROM posts"),
          client.query("SELECT COUNT(*) as count FROM users WHERE status = $1", ["active"]),
          client.query("SELECT SUM(views) as total FROM posts"),
          client.query(`
            SELECT 
              date,
              SUM(views) as views,
              SUM(unique_visitors) as unique_visitors,
              AVG(bounce_rate) as bounce_rate,
              AVG(avg_time_on_page) as avg_time_on_page
            FROM analytics 
            WHERE ${dateFilter}
            GROUP BY date 
            ORDER BY date ASC
          `),
        ])

        // Get growth data
        const growthData = await client.query(`
          SELECT 
            COUNT(*) as new_posts,
            DATE_TRUNC('day', created_at) as date
          FROM posts 
          WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
          GROUP BY DATE_TRUNC('day', created_at)
          ORDER BY date ASC
        `)

        return NextResponse.json({
          overview: {
            totalPosts: Number.parseInt(postsCount.rows[0].count),
            activeUsers: Number.parseInt(usersCount.rows[0].count),
            totalViews: Number.parseInt(viewsCount.rows[0].total || 0),
            avgBounceRate: 45.2, // Mock data
          },
          analytics: analyticsData.rows,
          growth: growthData.rows,
        })
      }

      if (type === "posts") {
        // Get post analytics
        const postAnalytics = await client.query(`
          SELECT 
            p.id,
            p.title,
            p.views,
            p.created_at,
            u.name as author_name,
            COALESCE(a.total_views, 0) as analytics_views,
            COALESCE(a.unique_visitors, 0) as unique_visitors
          FROM posts p
          JOIN users u ON p.author_id = u.id
          LEFT JOIN (
            SELECT 
              post_id,
              SUM(views) as total_views,
              SUM(unique_visitors) as unique_visitors
            FROM analytics 
            WHERE ${dateFilter} AND post_id IS NOT NULL
            GROUP BY post_id
          ) a ON p.id = a.post_id
          ORDER BY p.views DESC
          LIMIT 20
        `)

        return NextResponse.json({
          posts: postAnalytics.rows,
        })
      }

      return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
