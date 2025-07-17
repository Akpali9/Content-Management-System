"use server"

import { redirect } from "next/navigation"

export interface CreatePostData {
  title: string
  content: string
  status: "draft" | "review" | "published"
  slug: string
  excerpt: string
  tags: string
}

export async function createPost(formData: FormData) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const postData: CreatePostData = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    status: formData.get("status") as "draft" | "review" | "published",
    slug: formData.get("slug") as string,
    excerpt: formData.get("excerpt") as string,
    tags: formData.get("tags") as string,
  }

  // Validate required fields
  if (!postData.title || !postData.content) {
    return {
      success: false,
      message: "Title and content are required",
    }
  }

  // Generate slug if not provided
  if (!postData.slug) {
    postData.slug = postData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }
  // In a real app, you would save to database here
  console.log("Creating post:", postData)

  // Simulate success
  redirect("/posts?created=true")
}

export async function updatePost(id: string, formData: FormData) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const postData: CreatePostData = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    status: formData.get("status") as "draft" | "review" | "published",
    slug: formData.get("slug") as string,
    excerpt: formData.get("excerpt") as string,
    tags: formData.get("tags") as string,
  }

  // In a real app, you would update in database here
  console.log("Updating post:", id, postData)

  return {
    success: true,
    message: "Post updated successfully",
  }
}
