"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  ImageIcon,
  BarChart3,
  Sparkles,
  ChevronDown,
  Plus,
  Search,
  Bell,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Posts",
    href: "/posts",
    icon: FileText,
    badge: "12",
    children: [
      { name: "All Posts", href: "/posts" },
      { name: "New Post", href: "/posts/new" },
      { name: "Categories", href: "/posts/categories" },
      { name: "Tags", href: "/posts/tags" },
    ],
  },
  {
    name: "Media",
    href: "/media",
    icon: ImageIcon,
    badge: null,
  },
  {
    name: "Users",
    href: "/users",
    icon: Users,
    badge: "5",
    children: [
      { name: "All Users", href: "/users" },
      { name: "Add User", href: "/users/new" },
      { name: "Roles", href: "/users/roles" },
    ],
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    badge: null,
    children: [
      { name: "General", href: "/settings" },
      { name: "SEO", href: "/settings/seo" },
      { name: "Security", href: "/settings/security" },
    ],
  },
]

export function EnhancedSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName) ? prev.filter((item) => item !== itemName) : [...prev, itemName],
    )
  }

  const filteredNavigation = navigation.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.children?.some((child) => child.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="hidden md:flex w-72 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-r border-slate-200/50 dark:border-slate-700/50 flex-col shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg pulse-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold gradient-text">CMS Pro</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">v2.0 Premium</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button
            size="sm"
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg btn-hover"
          >
            <Plus className="w-4 h-4 mr-1" />
            New
          </Button>
          <Button size="sm" variant="outline" className="glass">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search navigation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-100/50 dark:bg-slate-800/50 border-0 focus-ring"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href
          const isExpanded = expandedItems.includes(item.name)
          const hasChildren = item.children && item.children.length > 0

          return (
            <div key={item.name} className="space-y-1">
              <div
                className={cn(
                  "group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer card-hover",
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white",
                )}
                onClick={() => (hasChildren ? toggleExpanded(item.name) : null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center flex-1"
                  onClick={(e) => hasChildren && e.preventDefault()}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 mr-3 transition-all duration-300",
                      isActive
                        ? "text-white"
                        : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200",
                      "group-hover:scale-110",
                    )}
                  />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className={cn("ml-2 text-xs", isActive ? "bg-white/20 text-white" : "")}>
                      {item.badge}
                    </Badge>
                  )}
                </Link>
                {hasChildren && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      isExpanded ? "rotate-180" : "",
                      isActive ? "text-white" : "text-slate-400",
                    )}
                  />
                )}
              </div>

              {/* Submenu */}
              {hasChildren && isExpanded && (
                <div className="ml-6 space-y-1 animate-in slide-in-from-top-2 duration-300">
                  {item.children?.map((child) => {
                    const isChildActive = pathname === child.href
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={cn(
                          "flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200",
                          isChildActive
                            ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-l-2 border-blue-500"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-white",
                        )}
                      >
                        <div className="w-2 h-2 rounded-full bg-current opacity-50 mr-3" />
                        {child.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="glass rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center float">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Need Help?</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">24/7 Support Available</div>
            </div>
          </div>
          <Button size="sm" variant="outline" className="w-full mt-3 glass hover:bg-white/20 dark:hover:bg-black/20">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  )
}
