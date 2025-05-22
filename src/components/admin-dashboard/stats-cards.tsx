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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsItems.map((stat, index) => (
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
