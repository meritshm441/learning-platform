import type { ReactNode } from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Footer from "@/components/shared/Footer/footer"
import Header from "@/components/shared/Header/header"

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
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
