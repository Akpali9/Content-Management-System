"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye, Calendar, TrendingUp } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const posts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    status: "published",
    author: "John Doe",
    createdAt: new Date(2024, 0, 15),
    views: 1250,
  },
  {
    id: 2,
    title: "Building Modern Web Applications",
    status: "draft",
    author: "Jane Smith",
    createdAt: new Date(2024, 0, 14),
    views: 0,
  },
  {
    id: 3,
    title: "The Future of Web Development",
    status: "published",
    author: "Mike Johnson",
    createdAt: new Date(2024, 0, 13),
    views: 890,
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox",
    status: "review",
    author: "Sarah Wilson",
    createdAt: new Date(2024, 0, 12),
    views: 0,
  },
]

export function PostsTable() {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border-0 shadow-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Title</TableHead>
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Status</TableHead>
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Author</TableHead>
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Created</TableHead>
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Views</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.id}
              className="border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <TableCell className="font-medium text-slate-900 dark:text-slate-100">{post.title}</TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell className="text-slate-600 dark:text-slate-400">{post.author}</TableCell>
              <TableCell className="text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                </div>
              </TableCell>
              <TableCell className="text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {post.views.toLocaleString()}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
                    <DropdownMenuItem className="hover:bg-slate-100 dark:hover:bg-slate-800">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-slate-100 dark:hover:bg-slate-800">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
