import { FileText, Clock, FileCheck, Users } from "lucide-react"

type StatsProps = {
  stats: {
    collected: number
    pending: number
    totalInvoices: number
    totalLearners: number
  }
}

export function StatsCards({ stats }: StatsProps) {
  const statsItems = [
    {
      title: "Collected",
      value: `$${stats.collected.toLocaleString()}`,
      icon: <FileCheck className="h-5 w-5 text-[#01589a]" />,
    },
    {
      title: "Pending",
      value: `$${stats.pending.toLocaleString()}`,
      icon: <Clock className="h-5 w-5 text-[#01589a]" />,
    },
    {
      title: "Total invoices",
      value: stats.totalInvoices.toString(),
      icon: <FileText className="h-5 w-5 text-[#01589a]" />,
    },
    {
      title: "Total Learners",
      value: stats.totalLearners.toString(),
      icon: <Users className="h-5 w-5 text-[#01589a]" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsItems.map((stat, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-[#e6e6e6] bg-[#F5F5F5] px-2.5 pb-2.5 dark:border-[#666666] dark:bg-[#1d1b20]"
        >
          <div className="flex items-center gap-2 p-4 dark:bg-[#404040]">
            {stat.icon}
            <h3 className="font-medium">{stat.title}</h3>
          </div>
          <div className="flex items-center justify-center rounded-lg bg-white p-6">
            <span className="text-2xl font-bold">{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
