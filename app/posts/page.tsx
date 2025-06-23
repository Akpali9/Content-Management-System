import { PostsTable } from "@/components/posts-table"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PostsPage({
  searchParams,
}: {
  searchParams: { created?: string }
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground">Manage your blog posts and articles</p>
        </div>
        <Link href="/posts/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {searchParams.created && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Post created successfully! It will appear in the list below.</AlertDescription>
        </Alert>
      )}

      <PostsTable />
    </div>
  )
}
