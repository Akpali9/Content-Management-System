import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Eye, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Posts",
    value: "124",
    change: "+12%",
    icon: FileText,
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50",
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+5%",
    icon: Users,
    color: "from-green-500 to-green-600",
    bgColor: "from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50",
  },
  {
    title: "Page Views",
    value: "45,231",
    change: "+18%",
    icon: Eye,
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50",
  },
  {
    title: "Growth Rate",
    value: "12.5%",
    change: "+2.1%",
    icon: TrendingUp,
    color: "from-orange-500 to-orange-600",
    bgColor: "from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50",
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50`} />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} shadow-lg`}>
              <stat.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              <span className="text-green-600 dark:text-green-400 font-medium">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
