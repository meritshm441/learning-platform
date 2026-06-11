import { FileText, Clock, FileCheck, Users } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "Collected",
      value: "$20000",
      icon: <FileCheck className="h-5 w-5 text-[#01589a]" />,
    },
    {
      title: "Pending",
      value: "$10000",
      icon: <Clock className="h-5 w-5 text-[#01589a]" />,
    },
    {
      title: "Total invoices",
      value: "35",
      icon: <FileText className="h-5 w-5 text-[#01589a]" />,
    },
    {
      title: "Total Learners",
      value: "50",
      icon: <Users className="h-5 w-5 text-[#01589a]" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={index} className="overflow-hidden rounded-lg bg-[#f5f5f5] dark:bg-[#1d1b20]">
          <div className="flex items-center gap-2 border-b border-[#e6e6e6] bg-white p-4 dark:border-[#666666] dark:bg-[#404040]">
            {stat.icon}
            <h3 className="font-medium">{stat.title}</h3>
          </div>
          <div className="flex items-center justify-center p-6">
            <span className="text-2xl font-bold">{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
