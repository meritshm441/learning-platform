'use client'
import Link from "next/link"
import { Eye } from "lucide-react"
import Image from "next/image"
import { PortalTabs } from "@/components/Portal/portal-tabs"

import { useState, useEffect, SetStateAction } from 'react'

type Invoice = {
  _id: string;
  learner: {
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    location: string;
  };
  track: {
    name: string;
    price: number;
    duration: string;
  };
  amount: number;
  status: string;
  dueDate: string;
  createdAt: string;
};

export default function Dashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Mock API response - replace with actual fetch
  const mockFetchInvoices = async () => {
    return {
      success: true,
      count: 1,
      invoices: [
        {
          _id: "682b349417460c2f2264a3b7",
          learner: {
            firstName: "Passum",
            lastName: "Tornado",
            email: "spprofi@adminzoom.com",
            contact: "+233241333224",
            location: "Accra, Ghana"
          },
          track: {
            name: "Cloud Computing Expertise",
            price: 350,
            duration: "12 weeks"
          },
          amount: 250,
          status: "pending",
          dueDate: "2025-05-20T16:34:58.128Z",
          createdAt: "2025-05-19T13:39:32.972Z"
        }
      ]
    }
  }

  const fetchInvoices = async () => {
    const response = await mockFetchInvoices()
    if (response.success) {
      setInvoices(response.invoices)
    }
  }

  const totalPages = Math.ceil(invoices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedInvoices = invoices.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    fetchInvoices()
  }, [])

  const handlePageChange = (newPage: SetStateAction<number>) => {
    setCurrentPage(newPage)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-[#01589a] h-[135px]"></div>
      <main className="flex-1">
        <div className="flex flex-col mx-auto px-4 md:px-20 lg:px-48 gap-8">
          {/* Portal Tabs */}
          <div className="shadow-md rounded-md overflow-hidden -mt-14">
            <PortalTabs />
          </div>

          {/* Invoices Content */}
          <div className="bg-white rounded-b-lg shadow-md p-8">
            <h1 className="text-2xl font-bold mb-6">Past Invoices</h1>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Learner</th>
                    <th className="text-left py-3 px-4 font-medium">Track</th>
                    <th className="text-left py-3 px-4 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Due Date</th>
                    <th className="text-left py-3 px-4 font-medium sr-only">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInvoices.map((invoice) => (
                    <tr key={invoice._id}>
                      <td className="py-3 px-4">
                        <div className="font-medium">{invoice.learner.firstName} {invoice.learner.lastName}</div>
                        <div className="text-gray-500 text-sm">
                          {invoice.learner.location}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{invoice.track.name}</div>
                        <div className="text-gray-500 text-sm">
                          Duration: {invoice.track.duration}
                        </div>
                      </td>
                      <td className="py-3 px-4">${invoice.amount}</td>
                      <td className="py-3 px-4 capitalize">{invoice.status}</td>
                      <td className="py-3 px-4">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/portal/invoices/${invoice._id}`} passHref>
                          <button 
                            title="View invoice"
                            className="text-[#01589a] hover:text-[#28ace2]"
                          >
                            <Eye className="w-5 h-5" />
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
              <div className="flex justify-center mt-8">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 mx-1 rounded border ${
                      currentPage === index + 1 
                        ? 'bg-[#01589a] text-white'
                        : 'hover:bg-gray-100'
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