"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiGrid, FiSettings, FiMessageSquare, FiFileText } from "react-icons/fi"

const tabs = [
  { name: "Dashboard", href: "/portal", icon: FiGrid },
  { name: "Settings", href: "/portal/settings", icon: FiSettings },
  { name: "Messages", href: "/portal/messages", icon: FiMessageSquare },
  { name: "Invoices", href: "/portal/invoices", icon: FiFileText },
]

export function PortalTabs() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col sm:flex-row bg-white">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || (tab.href !== "/portal" && pathname?.startsWith(tab.href))
        const Icon = tab.icon

        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`flex items-center px-6 py-4 ${
              isActive ? "bg-[#014273] text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon className="w-5 h-5 mr-2" />
            <span>{tab.name}</span>
          </Link>
        )
      })}
    </div>
  )
}
