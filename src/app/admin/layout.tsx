import type React from "react"
import AdminLayoutWrapper from "@/components/shared/adminlayoutWrapper"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
}
