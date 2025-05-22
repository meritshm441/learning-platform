import { login_register } from "@/lib/constants/images"
import Image from "next/image"
import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <div className="hidden md:block md:order-1 w-full">
            <Image
              src={login_register || "/placeholder.svg"}
              alt="Learning illustration"
              width={500}
              height={400}
              className="w-full h-auto max-w-[481px]"
              priority
            />
          </div>
          <div className="md:order-2 flex flex-col items-center w-full ">{children}</div>
        </div>
      </div>
    </div>
  )
}
