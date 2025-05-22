import type { ReactNode } from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Footer from "@/components/shared/Footer/footer"
import Header from "@/components/shared/Header/header"
import { NextAuthProvider } from "./provider"
import LayoutWrapper from "@/components/layoutwrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CLeint - Learning Platform",
  description: "Unlock Your Potential with Industry-Leading Courses",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          
          <NextAuthProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </NextAuthProvider>

        </div>
      </body>
    </html>
  )
}
