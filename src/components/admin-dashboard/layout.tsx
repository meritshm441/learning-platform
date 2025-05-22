"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { ModeToggle } from "./mode-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user] = useState({
    name: "John Doe",
    initials: "JD",
  })

  return (
    <div className="flex h-screen bg-[#f5f5f5] dark:bg-[#1d1b20]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-[#1d1b20] border-b border-[#e6e6e6] dark:border-[#404040] p-4 flex justify-end items-center gap-4">
          <ModeToggle />
          <div className="flex items-center gap-2 bg-[#f5f5f5] dark:bg-[#404040] px-4 py-2 rounded-lg">
            <Avatar className="h-8 w-8 bg-[#01589a]">
              <AvatarFallback className="text-white">{user.initials}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{user.name}</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
