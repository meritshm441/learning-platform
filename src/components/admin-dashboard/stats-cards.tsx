import { FaFileInvoice, FaClock, FaCheckCircle, FaUsers } from "react-icons/fa"

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
      value: `$${stats.collected}`,
      icon: <FaCheckCircle className="h-5 w-5 text-[#01589a]" />,
    },
    {
      title: "Pending",
      value: `$${stats.pending}`,
      icon: <FaClock className="h-5 w-5 text-[#01589a]" />,
    },
    {
      title: "Total invoices",
      value: stats.totalInvoices.toString(),
      icon: <FaFileInvoice className="h-5 w-5 text-[#01589a]" />,
    },
    {
      title: "Total Learners",
      value: stats.totalLearners.toString(),
      icon: <FaUsers className="h-5 w-5 text-[#01589a]" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsItems.map((stat, index) => (
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
