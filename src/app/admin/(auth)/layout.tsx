import { admin_cli_blue } from "@/lib/constants/images"
import Image from "next/image"
import type React from "react"

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen min-h-screen w-full">
      <div className="hidden h-screen min-h-screen md:block" style={{ width: "500px" }}>
        <Image
          src={admin_cli_blue || "/placeholder.svg"}
          alt="Learning illustration"
          width={500}
          height={400}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      {/* Flexible content that fills the remaining space */}
      <div className="flex h-full flex-1 flex-col items-center justify-center">{children}</div>
    </div>
  )
}
