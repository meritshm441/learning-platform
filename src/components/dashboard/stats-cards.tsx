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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-[#f5f5f5] dark:bg-[#1d1b20] rounded-lg overflow-hidden">
          <div className="p-4 bg-white dark:bg-[#404040] border-b border-[#e6e6e6] dark:border-[#666666] flex items-center gap-2">
            {stat.icon}
            <h3 className="font-medium">{stat.title}</h3>
          </div>
          <div className="p-6 flex justify-center items-center">
            <span className="text-2xl font-bold">{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
