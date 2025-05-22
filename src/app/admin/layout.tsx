import type React from "react"
import { Sidebar } from "@/components/admin-dashboard/sidebar"
import { ModeToggle } from "@/components/admin-dashboard/mode-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b border-border p-4 flex justify-end items-center gap-4">
          <ModeToggle />
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
            <Avatar className="h-8 w-8 bg-primary">
              <AvatarFallback className="text-primary-foreground">JD</AvatarFallback>
            </Avatar>
            <span className="font-medium">John Doe</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
