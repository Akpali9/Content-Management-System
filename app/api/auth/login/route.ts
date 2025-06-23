import { type NextRequest, NextResponse } from "next/server"
import { pool } from "@/lib/db"
import { verifyPassword, setAuthCookie } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const client = await pool.connect()
    try {
      // Find user by email
      const result = await client.query(
        "SELECT id, name, email, password_hash, role, status, avatar_url FROM users WHERE email = $1",
        [email.toLowerCase()],
      )

      if (result.rows.length === 0) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      const user = result.rows[0]

      // Check if user is active
      if (user.status !== "active") {
        return NextResponse.json({ error: "Account is inactive" }, { status: 401 })
      }

      // Verify password
      const isValidPassword = await verifyPassword(password, user.password_hash)
      if (!isValidPassword) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      // Set auth cookie
      const authUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar_url: user.avatar_url,
      }

      await setAuthCookie(authUser)

      return NextResponse.json({
        success: true,
        user: authUser,
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
