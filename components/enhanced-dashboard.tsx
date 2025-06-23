"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Users,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Calendar,
  Clock,
  Star,
  Zap,
  Target,
  Activity,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total Posts",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50",
    description: "Published content",
  },
  {
    title: "Active Users",
    value: "12,350",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50",
    description: "Registered members",
  },
  {
    title: "Page Views",
    value: "1.2M",
    change: "+23.1%",
    trend: "up",
    icon: Eye,
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50",
    description: "Monthly traffic",
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "-2.1%",
    trend: "down",
    icon: Target,
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50",
    description: "Goal completions",
  },
]

const recentPosts = [
  {
    id: 1,
    title: "Advanced React Patterns for Modern Applications",
    status: "published",
    author: "John Doe",
    createdAt: new Date(2024, 0, 15),
    views: 2847,
    featured: true,
    category: "Development",
  },
  {
    id: 2,
    title: "Building Scalable APIs with Node.js and TypeScript",
    status: "draft",
    author: "Jane Smith",
    createdAt: new Date(2024, 0, 14),
    views: 0,
    featured: false,
    category: "Backend",
  },
  {
    id: 3,
    title: "The Future of Web Development: Trends for 2024",
    status: "published",
    author: "Mike Johnson",
    createdAt: new Date(2024, 0, 13),
    views: 1923,
    featured: true,
    category: "Industry",
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use Each",
    status: "review",
    author: "Sarah Wilson",
    createdAt: new Date(2024, 0, 12),
    views: 0,
    featured: false,
    category: "CSS",
  },
]

const quickActions = [
  {
    title: "Create New Post",
    description: "Write and publish content",
    icon: Plus,
    href: "/posts/new",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    title: "Schedule Content",
    description: "Plan your publishing calendar",
    icon: Calendar,
    href: "/posts/schedule",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/50",
  },
  {
    title: "View Analytics",
    description: "Track performance metrics",
    icon: Activity,
    href: "/analytics",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/50",
  },
  {
    title: "Manage Users",
    description: "Add or edit user accounts",
    icon: Users,
    href: "/users",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/50",
  },
]

export function EnhancedDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text text-reveal">Welcome back, John! 👋</h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg mt-2">
              Here's what's happening with your content today.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="glass">
              <Calendar className="w-4 h-4 mr-2" />
              This Week
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg btn-hover">
              <Zap className="w-4 h-4 mr-2" />
              Quick Start
            </Button>
          </div>
        </div>

        {/* Time-based greeting */}
        <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Last login: 2 hours ago</span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>5 new notifications</span>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className={cn(
              "relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 card-hover",
              "animate-in slide-in-from-bottom-4",
              `animation-delay-${index * 100}`,
            )}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-60`} />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16" />

            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">{stat.title}</CardTitle>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>

            <CardContent className="relative">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">{stat.value}</div>
              <div className="flex items-center space-x-2">
                <div
                  className={cn(
                    "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
                    stat.trend === "up"
                      ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300"
                      : "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300",
                  )}
                >
                  {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  <span>{stat.change}</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Posts - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl glass">
            <CardHeader className="border-b border-slate-200/50 dark:border-slate-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                    Recent Posts
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Your latest content activity</p>
                </div>
                <Button variant="outline" size="sm" className="glass">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {recentPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className={cn(
                      "group p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all duration-300 border-b border-slate-200/50 dark:border-slate-800/50 last:border-0",
                      "animate-in slide-in-from-left-4",
                      `animation-delay-${index * 100}`,
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-start space-x-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <p className="font-semibold leading-none text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {post.title}
                              </p>
                              {post.featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {post.author}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {post.views.toLocaleString()} views
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                post.status === "published"
                                  ? "default"
                                  : post.status === "draft"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={cn(
                                post.status === "published"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800"
                                  : post.status === "draft"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800",
                              )}
                            >
                              {post.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <Card className="border-0 shadow-xl glass">
            <CardHeader className="border-b border-slate-200/50 dark:border-slate-800/50">
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={action.title}
                    variant="ghost"
                    className={cn(
                      "group justify-start h-auto p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50 rounded-xl transition-all duration-300 card-hover",
                      "animate-in slide-in-from-right-4",
                      `animation-delay-${index * 100}`,
                    )}
                  >
                    <div
                      className={cn(
                        "p-3 rounded-lg bg-gradient-to-br shadow-sm group-hover:shadow-md transition-all duration-300 mr-4",
                        action.color,
                        action.bgColor,
                      )}
                    >
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {action.title}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{action.description}</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card className="border-0 shadow-xl glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Site Speed</span>
                  <span className="text-sm font-medium text-green-600">Excellent</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-[92%]" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">SEO Score</span>
                  <span className="text-sm font-medium text-blue-600">Good</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full w-[78%]" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Security</span>
                  <span className="text-sm font-medium text-green-600">Secure</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-[95%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
