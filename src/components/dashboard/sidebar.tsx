import type React from "react"
import Link from "next/link"
import { LayoutDashboard, FileText, Users, BookOpen, GraduationCap, BarChart3, Settings, LogOut } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-60 bg-[#01589a] text-white flex flex-col h-full">
      <div className="p-4 border-b border-[#115ea5]">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-[#28ace2] font-bold text-2xl flex items-center">
            <span className="text-3xl">C</span>
            <span className="text-sm">Client</span>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          <NavItem href="/" icon={<LayoutDashboard size={20} />} text="Dashboard" active />
          <NavItem href="/invoices" icon={<FileText size={20} />} text="Invoices" />
          <NavItem href="/learners" icon={<Users size={20} />} text="Learners" />
          <NavItem href="/tracks" icon={<BookOpen size={20} />} text="Tracks" />
          <NavItem href="/courses" icon={<GraduationCap size={20} />} text="Courses" />
          <NavItem href="/report" icon={<BarChart3 size={20} />} text="Report" />
        </ul>
      </nav>
      <div className="p-2 mt-auto">
        <ul className="space-y-1">
          <NavItem href="/settings" icon={<Settings size={20} />} text="Settings" />
          <NavItem href="/logout" icon={<LogOut size={20} />} text="Logout" />
        </ul>
      </div>
    </div>
  )
}

function NavItem({
  href,
  icon,
  text,
  active = false,
}: {
  href: string
  icon: React.ReactNode
  text: string
  active?: boolean
}) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
          active ? "bg-white text-[#01589a]" : "text-white hover:bg-[#115ea5]"
        }`}
      >
        {icon}
        <span>{text}</span>
      </Link>
    </li>
  )
}
