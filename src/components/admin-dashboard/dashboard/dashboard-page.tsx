"use client"

import { useState } from "react"
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa"
import { StatsCards } from "./stats-cards"
import { RevenueChart } from "./revenue-chart"
import { InvoicesList } from "./invoices-list"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { invoicesApi, learnersApi } from "@/lib/services/api"

// Mock data to use as fallback when API is unavailable
const MOCK_DATA = {
  stats: {
    collected: 20000,
    pending: 10000,
    totalInvoices: 35,
    totalLearners: 50,
  },
  invoices: [
    {
      _id: "mock-1",
      learner: {
        _id: "learner-1",
        firstName: "Jane",
        lastName: "Cooper",
        email: "jane.cooper@example.com",
      },
      amount: 420,
      status: "paid",
      createdAt: new Date().toISOString(),
      paidAt: new Date().toISOString(),
    },
    {
      _id: "mock-2",
      learner: {
        _id: "learner-2",
        firstName: "Savannah",
        lastName: "Nguyen",
        email: "savannah.nguyen@example.com",
      },
      amount: 420,
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "mock-3",
      learner: {
        _id: "learner-3",
        firstName: "Jerome",
        lastName: "Bell",
        email: "jerome.bell@example.com",
      },
      amount: 420,
      status: "paid",
      createdAt: new Date().toISOString(),
      paidAt: new Date().toISOString(),
    },
    {
      _id: "mock-4",
      learner: {
        _id: "learner-4",
        firstName: "Theresa",
        lastName: "Webb",
        email: "theresa.webb@example.com",
      },
      amount: 420,
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "mock-5",
      learner: {
        _id: "learner-5",
        firstName: "Ralph",
        lastName: "Edwards",
        email: "ralph.edwards@example.com",
      },
      amount: 420,
      status: "paid",
      createdAt: new Date().toISOString(),
      paidAt: new Date().toISOString(),
    },
  ],
  revenueData: [
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
  ],
}

export function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [usingMockData, setUsingMockData] = useState(true)
  const [_error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    collected: 0,
    pending: 0,
    totalInvoices: 0,
    totalLearners: 0,
  })
  type Invoice = {
    _id: string
    learner: {
      _id: string
      firstName: string
      lastName: string
      email: string
    }
    amount: number
    status: string
    createdAt: string
    paidAt?: string
  }
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [revenueData, setRevenueData] = useState<{ name: string; value: number }[]>([])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    setUsingMockData(false)

    try {
      // Try to fetch real data from API
      // Fetch invoices
      const invoicesResponse = await invoicesApi.getAll()
      const invoicesData = invoicesResponse.invoices || []
      setInvoices(invoicesData.slice(0, 5)) // Get latest 5 invoices

      // Fetch learners count
      const learnersResponse = await learnersApi.getAll()
      const learnersCount = learnersResponse.count || 0

      // Calculate stats
      const paidInvoices = invoicesData.filter((invoice: Invoice) => invoice.status === "paid")
      const pendingInvoices = invoicesData.filter(
        (invoice: Invoice) => invoice.status === "pending"
      )

      const totalCollected = paidInvoices.reduce(
        (sum: number, invoice: Invoice) => sum + invoice.amount,
        0
      )
      const totalPending = pendingInvoices.reduce(
        (sum: number, invoice: Invoice) => sum + invoice.amount,
        0
      )

      setStats({
        collected: totalCollected,
        pending: totalPending,
        totalInvoices: invoicesData.length,
        totalLearners: learnersCount,
      })

      // Generate revenue data (monthly)
      const currentYear = new Date().getFullYear()
      const monthlyRevenue = Array(12).fill(0)

      paidInvoices.forEach((invoice: Invoice) => {
        const paidDate = new Date(invoice.paidAt || invoice.createdAt)
        if (paidDate.getFullYear() === currentYear) {
          const month = paidDate.getMonth()
          monthlyRevenue[month] += invoice.amount
        }
      })

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]

      setRevenueData(
        months.map((name, index) => ({
          name,
          value: monthlyRevenue[index],
        }))
      )
    } catch (err) {
      console.error("Error fetching dashboard data:", err)
      setError("Failed to connect to the API. Using mock data instead.")

      // Fallback to mock data
      setStats(MOCK_DATA.stats)
      setInvoices(MOCK_DATA.invoices)
      setRevenueData(MOCK_DATA.revenueData)
      setUsingMockData(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <FaSpinner className="h-8 w-8 animate-spin text-[#01589a]" />
      </div>
    )
  }

  return (
    <div className="bg-white p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-[#666666] dark:text-[#999999]">Welcome to the admin portal</p>
        </div>

        {usingMockData && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50 dark:border-yellow-900/30 dark:bg-yellow-900/20">
            <FaExclamationTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
            <AlertTitle>API Connection Failed</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>
                Using mock data for demonstration purposes. The API server might be unavailable.
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchDashboardData}
                className="ml-4 border-yellow-600 text-yellow-600 hover:bg-yellow-100 dark:border-yellow-500 dark:text-yellow-500 dark:hover:bg-yellow-900/30"
              >
                Retry Connection
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <StatsCards stats={stats} />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-bold">Revenue Overview</h2>
            <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-[#1d1b20]">
              <RevenueChart data={revenueData} />
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">Latest Invoices</h2>
            <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-[#1d1b20]">
              <InvoicesList invoices={invoices} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
