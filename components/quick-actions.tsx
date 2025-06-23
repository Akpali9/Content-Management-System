import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Upload, Settings, Users, ArrowRight } from "lucide-react"

const actions = [
  {
    title: "Create New Post",
    description: "Write a new blog post or article",
    icon: Plus,
    href: "/posts/new",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Upload Media",
    description: "Add images and files to your library",
    icon: Upload,
    href: "/media",
    color: "from-green-500 to-green-600",
  },
  {
    title: "Manage Users",
    description: "Add or edit user accounts",
    icon: Users,
    href: "/users",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Site Settings",
    description: "Configure your website settings",
    icon: Settings,
    href: "/settings",
    color: "from-orange-500 to-orange-600",
  },
]

export function QuickActions() {
  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-200/50 dark:border-slate-800/50">
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full"></div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-3">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="ghost"
              className="group justify-start h-auto p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50 rounded-xl transition-all duration-200"
            >
              <div
                className={`p-2 rounded-lg bg-gradient-to-br ${action.color} mr-4 shadow-sm group-hover:shadow-md transition-shadow`}
              >
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-left flex-1">
                <div className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {action.title}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{action.description}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-hover:translate-x-1 transition-all" />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
