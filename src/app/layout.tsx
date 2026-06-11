import type { ReactNode } from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { NextAuthProvider } from "./provider"
import LayoutWrapper from "@/components/layoutwrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CLeint - Learning Platform",
  description: "Unlock Your Potential with Industry-Leading Courses",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="flex min-h-screen flex-col">
          <NextAuthProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </NextAuthProvider>
        </div>
      </body>
    </html>
  )
}
