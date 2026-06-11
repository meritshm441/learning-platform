import { login_register } from "@/lib/constants/images"
import Image from "next/image"
import type React from "react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto flex-1 px-4 py-8">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
          <div className="hidden w-full md:order-1 md:block">
            <Image
              src={login_register || "/placeholder.svg"}
              alt="Learning illustration"
              width={500}
              height={400}
              className="h-auto w-full max-w-[481px]"
              priority
            />
          </div>
          <div className="flex w-full flex-col items-center md:order-2">{children}</div>
        </div>
      </div>
    </div>
  )
}
