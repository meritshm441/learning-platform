"use client"

import { useState, useEffect } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaSpinner } from "react-icons/fa"
import { useAuth } from "@/lib/context/auth-context"
import { Sidebar } from "./sidebar"
import { ModeToggle } from "./mode-toggle"
import { StatsCards } from "./stats-cards"
import { RevenueChart } from "./revenue-chart"
import { InvoicesList } from "./invoice-list"

export function ClientDashboard() {
  const { user, logout } = useAuth()
  type Stats = {
    collected: number
    pending: number
    totalInvoices: number
    totalLearners: number
  }
  const [stats, setStats] = useState<Stats | null>(null)
  type Invoice = {
    id: number
    name: string
    role: string
    amount: string
    avatar: string
    initials: string
  }
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [revenueData, setRevenueData] = useState<{ name: string; value: number }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        // These would be replaced with actual API calls when endpoints are available
        // For now, using mock data

        // Uncomment these when API endpoints are available
        // const statsData = await dashboardService.getStats()
        // const invoicesData = await dashboardService.getInvoices()
        // const revenueData = await dashboardService.getRevenueData()

        // setStats(statsData)
        // setInvoices(invoicesData)
        // setRevenueData(revenueData)

        // Mock data for now
        setStats({
          collected: 20000,
          pending: 10000,
          totalInvoices: 35,
          totalLearners: 50,
        })

        setInvoices([
          {
            id: 1,
            name: "Jane Cooper",
            role: "Software Developer",
            amount: "$420.00",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "JC",
          },
          {
            id: 2,
            name: "Savannah Nguyen",
            role: "Data Science",
            amount: "$420.00",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "SN",
          },
          {
            id: 3,
            name: "Jerome Bell",
            role: "Data Science",
            amount: "$420.00",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "JB",
          },
          {
            id: 4,
            name: "Theresa Webb",
            role: "Cloud Engineer",
            amount: "$420.00",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "TW",
          },
          {
            id: 5,
            name: "Ralph Edwards",
            role: "Software Developer",
            amount: "$420.00",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "RE",
          },
        ])

        setRevenueData([
          { name: "Jan", value: 5000 },
          { name: "Feb", value: 8000 },
          { name: "Mar", value: 12000 },
          { name: "Apr", value: 9000 },
          { name: "May", value: 3000 },
          { name: "Jun", value: 5500 },
          { name: "Jul", value: 15000 },
          { name: "Aug", value: 22000 },
          { name: "Sep", value: 12000 },
          { name: "Oct", value: 16000 },
          { name: "Nov", value: 10000 },
          { name: "Dec", value: 25000 },
        ])
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError("Failed to load dashboard data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <FaSpinner className="h-8 w-8 animate-spin text-[#01589a]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-[#01589a] text-white px-4 py-2 rounded-md">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#f5f5f5] dark:bg-[#1d1b20]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-[#1d1b20] border-b border-[#e6e6e6] dark:border-[#404040] p-4 flex justify-end items-center gap-4">
          <ModeToggle />
          <div className="flex items-center gap-2 bg-[#f5f5f5] dark:bg-[#404040] px-4 py-2 rounded-lg">
            <Avatar className="h-8 w-8 bg-[#01589a]">
              {user?.lastName ? (
                <AvatarImage src={user.lastName || "/placeholder.svg"} alt={user.firstName} />
              ) : (
                <AvatarFallback className="text-white">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="font-medium">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-[#666666] dark:text-[#999999]">Welcome back, {user?.firstName}</p>
            </div>

            {stats && <StatsCards stats={stats} />}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Recent Revenue</h2>
                <div className="bg-white dark:bg-[#1d1b20] rounded-lg p-4 shadow-sm">
                  <RevenueChart data={revenueData} />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Latest Invoices</h2>
                <div className="bg-white dark:bg-[#1d1b20] rounded-lg p-4 shadow-sm">
                  <InvoicesList invoices={invoices} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
