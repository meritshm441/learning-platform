"use client"

import React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FaTachometerAlt,
  FaFileInvoice,
  FaUsers,
  FaDesktop,
  FaGraduationCap,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa"

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path:any) => {
    return pathname === path
  }

  return (
    <div className="w-60 bg-[#01589a] dark:bg-primary text-white flex flex-col h-full">
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
          <NavItem
            href="/admin/dashboard"
            icon={<FaTachometerAlt size={18} />}
            text="Dashboard"
            active={isActive("/admin/dashboard")}
          />
          <NavItem
            href="/admin/invoices"
            icon={<FaFileInvoice size={18} />}
            text="Invoices"
            active={isActive("/admin/invoices") || pathname.startsWith("/admin/invoices/")}
          />
          <NavItem
            href="/admin/learners"
            icon={<FaUsers size={18} />}
            text="Learners"
            active={isActive("/admin/learners") || pathname.startsWith("/admin/learners/")}
          />
          <NavItem
            href="/admin/tracks"
            icon={<FaDesktop size={18} />}
            text="Tracks"
            active={isActive("/admin/tracks") || pathname.startsWith("/admin/tracks/")}
          />
          <NavItem
            href="/admin/courses"
            icon={<FaGraduationCap size={18} />}
            text="Courses"
            active={isActive("/admin/courses") || pathname.startsWith("/admin/courses/")}
          />
          <NavItem
            href="/admin/report"
            icon={<FaChartBar size={18} />}
            text="Report"
            active={isActive("/admin/report")}
          />
        </ul>
      </nav>
      <div className="p-2 mt-auto">
        <ul className="space-y-1">
          <NavItem
            href="/admin/settings"
            icon={<FaCog size={18} />}
            text="Settings"
            active={isActive("/admin/settings")}
          />
          <li>
            <button
              onClick={() => console.log("Logout")}
              className="flex w-full items-center gap-3 px-3 py-2 rounded-md transition-colors text-white hover:bg-[#115ea5]"
            >
              <FaSignOutAlt size={18} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
};

function NavItem({
  href,
  icon,
  text,
  active = false,
}: NavItemProps) {
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
