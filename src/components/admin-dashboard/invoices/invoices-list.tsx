"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FaEdit, FaTrash, FaSearch, FaPlus, FaCheck, FaClock, FaSpinner, FaExclamationTriangle } from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { formatDate } from "@/lib/constants/utils"
import { invoicesApi } from "@/lib/services/api"

// Mock data to use as fallback when API is unavailable
const MOCK_INVOICES = [
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
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
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
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
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
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
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
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
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
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    paidAt: new Date().toISOString(),
  },
]

type Invoice = {
  _id: string
  learner: {
    _id: string
    firstName: string
    lastName: string
    email: string
    profileImage?: string
  }
  amount: number
  status: string
  createdAt: string
  dueDate: string
  paidAt?: string
}

export function InvoicesList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)

  const fetchInvoices = async () => {
    setIsLoading(true)
    setError(null)
    setUsingMockData(false)

    try {
      const response = await invoicesApi.getAll()
      setInvoices(response.invoices || [])
    } catch (err) {
      console.error("Error fetching invoices:", err)
      setError("Failed to connect to the API. Using mock data instead.")

      // Fallback to mock data
      setInvoices(MOCK_INVOICES)
      setUsingMockData(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInvoices()
  }, [])

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.learner.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.learner.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.learner.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <FaSpinner className="h-8 w-8 animate-spin text-[#01589a]" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Invoices</h1>

      {usingMockData && (
        <Alert className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900/30">
          <FaExclamationTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
          <AlertTitle>API Connection Failed</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>Using mock data for demonstration purposes. The API server might be unavailable.</span>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchInvoices}
              className="ml-4 border-yellow-600 text-yellow-600 hover:bg-yellow-100 dark:border-yellow-500 dark:text-yellow-500 dark:hover:bg-yellow-900/30"
            >
              Retry Connection
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between mb-6">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search Invoices"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="bg-[#01589a] hover:bg-[#01589a]/90" onClick={() => router.push("/admin/invoices/create")}>
          <FaPlus className="mr-2 h-4 w-4" /> Create invoice
        </Button>
      </div>

      {filteredInvoices.length === 0 ? (
        <div className="bg-white dark:bg-[#1d1b20] rounded-lg p-8 text-center">
          <p className="text-gray-500">No invoices found</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1d1b20] rounded-lg overflow-hidden">
          <div className="grid grid-cols-5 gap-4 p-4 bg-[#f5f5f5] dark:bg-[#404040] font-medium">
            <div>Learner</div>
            <div>Email</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Status</div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredInvoices.map((invoice) => (
              <div key={invoice._id} className="grid grid-cols-5 gap-4 p-4 items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    {invoice.learner.profileImage ? (
                      <AvatarImage
                        src={invoice.learner.profileImage || "/placeholder.svg"}
                        alt={`${invoice.learner.firstName} ${invoice.learner.lastName}`}
                      />
                    ) : (
                      <AvatarFallback className="bg-[#01589a] text-white">
                        {invoice.learner.firstName?.[0]}
                        {invoice.learner.lastName?.[0]}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span>
                    {invoice.learner.firstName} {invoice.learner.lastName}
                  </span>
                </div>
                <div>{invoice.learner.email}</div>
                <div>${invoice.amount.toLocaleString()}</div>
                <div>{formatDate(invoice.createdAt)}</div>
                <div className="flex items-center justify-between">
                  <Badge
                    className={`${
                      invoice.status === "paid"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    } text-white flex items-center gap-1`}
                  >
                    {invoice.status === "paid" ? <FaCheck className="h-3 w-3" /> : <FaClock className="h-3 w-3" />}
                    {invoice.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-green-600"
                      onClick={() => router.push(`/admin/invoices/${invoice._id}`)}
                    >
                      <FaEdit />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
