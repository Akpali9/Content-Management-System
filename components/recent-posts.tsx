import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { Clock, User } from "lucide-react"

const recentPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    status: "published",
    author: "John Doe",
    createdAt: new Date(2024, 0, 15),
  },
  {
    id: 2,
    title: "Building Modern Web Applications",
    status: "draft",
    author: "Jane Smith",
    createdAt: new Date(2024, 0, 14),
  },
  {
    id: 3,
    title: "The Future of Web Development",
    status: "published",
    author: "Mike Johnson",
    createdAt: new Date(2024, 0, 13),
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox",
    status: "review",
    author: "Sarah Wilson",
    createdAt: new Date(2024, 0, 12),
  },
]

export function RecentPosts() {
  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-200/50 dark:border-slate-800/50">
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          Recent Posts
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="group p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <p className="font-medium leading-none text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                    </div>
                  </div>
                </div>
                <Badge
                  variant={post.status === "published" ? "default" : post.status === "draft" ? "secondary" : "outline"}
                  className={
                    post.status === "published"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800"
                      : post.status === "draft"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                  }
                >
                  {post.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
