"use client"
import Link from "next/link"
import { Eye } from "lucide-react"
import { PortalTabs } from "@/components/Portal/portal-tabs"

import { useState, SetStateAction } from "react"

type Invoice = {
  _id: string
  learner: {
    firstName: string
    lastName: string
    email: string
    contact: string
    location: string
  }
  track: {
    name: string
    price: number
    duration: string
  }
  amount: number
  status: string
  dueDate: string
  createdAt: string
}

const MOCK_INVOICES = [
  {
    _id: "682b349417460c2f2264a3b7",
    learner: {
      firstName: "Passum",
      lastName: "Tornado",
      email: "spprofi@adminzoom.com",
      contact: "+233241333224",
      location: "Accra, Ghana",
    },
    track: {
      name: "Cloud Computing Expertise",
      price: 350,
      duration: "12 weeks",
    },
    amount: 250,
    status: "pending",
    dueDate: "2025-05-20T16:34:58.128Z",
    createdAt: "2025-05-19T13:39:32.972Z",
  },
]

export default function Dashboard() {
  const [invoices] = useState<Invoice[]>(MOCK_INVOICES)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const totalPages = Math.ceil(invoices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedInvoices = invoices.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (newPage: SetStateAction<number>) => {
    setCurrentPage(newPage)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="h-[135px] bg-[#01589a]"></div>
      <main className="flex-1">
        <div className="mx-auto flex flex-col gap-8 px-4 md:px-20 lg:px-48">
          {/* Portal Tabs */}
          <div className="-mt-14 overflow-hidden rounded-md shadow-md">
            <PortalTabs />
          </div>

          {/* Invoices Content */}
          <div className="rounded-b-lg bg-white p-8 shadow-md">
            <h1 className="mb-6 text-2xl font-bold">Past Invoices</h1>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-medium">Learner</th>
                    <th className="px-4 py-3 text-left font-medium">Track</th>
                    <th className="px-4 py-3 text-left font-medium">Amount</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Due Date</th>
                    <th className="sr-only px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInvoices.map((invoice) => (
                    <tr key={invoice._id}>
                      <td className="px-4 py-3">
                        <div className="font-medium">
                          {invoice.learner.firstName} {invoice.learner.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{invoice.learner.location}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{invoice.track.name}</div>
                        <div className="text-sm text-gray-500">
                          Duration: {invoice.track.duration}
                        </div>
                      </td>
                      <td className="px-4 py-3">${invoice.amount}</td>
                      <td className="px-4 py-3 capitalize">{invoice.status}</td>
                      <td className="px-4 py-3">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/portal/invoices/${invoice._id}`} passHref>
                          <button
                            title="View invoice"
                            className="text-[#01589a] hover:text-[#28ace2]"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {invoices.length > itemsPerPage && (
              <div className="mt-8 flex justify-center">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`mx-1 rounded border px-4 py-2 ${
                      currentPage === index + 1 ? "bg-[#01589a] text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
