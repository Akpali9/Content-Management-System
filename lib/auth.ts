import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { pool } from "./db"

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key"

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  avatar_url?: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  )
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return decoded
  } catch {
    return null
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) return null

    const decoded = verifyToken(token)
    if (!decoded) return null

    // Fetch fresh user data from database
    const client = await pool.connect()
    try {
      const result = await client.query(
        "SELECT id, name, email, role, avatar_url FROM users WHERE id = $1 AND status = $2",
        [decoded.id, "active"],
      )

      if (result.rows.length === 0) return null

      return result.rows[0]
    } finally {
      client.release()
    }
  } catch {
    return null
  }
}

export async function setAuthCookie(user: AuthUser) {
  const token = generateToken(user)
  const cookieStore = await cookies()

  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}

export function requireAuth(allowedRoles?: string[]) {
  return async (request: Request) => {
    const user = await getCurrentUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return Response.json({ error: "Forbidden" }, { status: 403 })
    }

    return user
  }
}
