import type { ReactNode } from "react"

interface PortalLayoutProps {
  children: ReactNode
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  return <div className="min-h-screen bg-gray-50">{children}</div>
}
