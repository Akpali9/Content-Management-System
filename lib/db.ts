// Database connection and models
import { Pool } from "pg"

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://localhost:5432/cms_pro",
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

export { pool }

// Database schema types
export interface User {
  id: string
  name: string
  email: string
  password_hash: string
  role: "admin" | "editor" | "author" | "subscriber"
  status: "active" | "inactive"
  avatar_url?: string
  created_at: Date
  updated_at: Date
}

export interface Post {
  id: string
  title: string
  content: string
  excerpt?: string
  slug: string
  status: "draft" | "review" | "published"
  author_id: string
  featured_image?: string
  tags: string[]
  meta_title?: string
  meta_description?: string
  views: number
  created_at: Date
  updated_at: Date
  published_at?: Date
}

export interface Media {
  id: string
  filename: string
  original_name: string
  mime_type: string
  size: number
  url: string
  alt_text?: string
  uploaded_by: string
  created_at: Date
}

export interface Analytics {
  id: string
  post_id?: string
  page_path: string
  views: number
  unique_visitors: number
  bounce_rate: number
  avg_time_on_page: number
  date: Date
}

// Database initialization
export async function initializeDatabase() {
  const client = await pool.connect()

  try {
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'author',
        status VARCHAR(50) DEFAULT 'active',
        avatar_url TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Create posts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(500) NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        slug VARCHAR(500) UNIQUE NOT NULL,
        status VARCHAR(50) DEFAULT 'draft',
        author_id UUID REFERENCES users(id) ON DELETE CASCADE,
        featured_image TEXT,
        tags TEXT[] DEFAULT '{}',
        meta_title VARCHAR(500),
        meta_description TEXT,
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        published_at TIMESTAMP
      )
    `)

    // Create media table
    await client.query(`
      CREATE TABLE IF NOT EXISTS media (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        size INTEGER NOT NULL,
        url TEXT NOT NULL,
        alt_text TEXT,
        uploaded_by UUID REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Create analytics table
    await client.query(`
      CREATE TABLE IF NOT EXISTS analytics (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
        page_path VARCHAR(500) NOT NULL,
        views INTEGER DEFAULT 0,
        unique_visitors INTEGER DEFAULT 0,
        bounce_rate DECIMAL(5,2) DEFAULT 0,
        avg_time_on_page INTEGER DEFAULT 0,
        date DATE DEFAULT CURRENT_DATE
      )
    `)

    // Create indexes for better performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
      CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
      CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
      CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics(date);
      CREATE INDEX IF NOT EXISTS idx_analytics_post ON analytics(post_id);
    `)

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Database initialization error:", error)
    throw error
  } finally {
    client.release()
  }
}
