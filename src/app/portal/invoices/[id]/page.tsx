"use client"

import Link from "next/link"
import { ArrowLeft, Printer, Download } from "lucide-react"
import Image from "next/image"
import { PortalTabs } from "@/components/Portal/portal-tabs"
import { useState, useEffect } from "react"
import { cli_blue } from "@/lib/constants/images"

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

// Mock API fetch for a single invoice
const mockFetchInvoice = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    success: true,
    invoice: {
      _id: id,
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
  }
}

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const fetchInvoice = async () => {
      setLoading(true)
      try {
        const { id } = params
        const response = await mockFetchInvoice(id)
        if (response.success) {
          setInvoice(response.invoice)
        }
      } catch (error) {
        console.error("Error fetching invoice:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInvoice()
  }, [params])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-50 text-green-700"
      case "pending":
        return "bg-yellow-50 text-yellow-700"
      case "overdue":
        return "bg-red-50 text-red-700"
      default:
        return "bg-gray-50 text-gray-700"
    }
  }

  const handlePrint = async () => {
    if (!invoice) return
    setIsProcessing(true)
    try {
      // Use browser's native print functionality instead
      window.print()
    } catch (error) {
      console.error("Error printing:", error)
      alert("Error printing. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = async () => {
    if (!invoice) return
    setIsProcessing(true)
    try {
      // Create a simple HTML representation of the invoice
      const invoiceHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Invoice #${invoice._id.substring(0, 8)}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
                        .invoice { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #eee; }
                        .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
                        .company-info { margin-bottom: 20px; }
                        .invoice-details { text-align: right; }
                        .client-info { margin-bottom: 40px; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
                        th { background-color: #f9f9f9; text-align: left; padding: 10px; }
                        td { padding: 10px; border-bottom: 1px solid #eee; }
                        .text-right { text-align: right; }
                        .summary { margin-left: auto; width: 250px; }
                        .summary-row { display: flex; justify-content: space-between; padding: 5px 0; }
                        .total { font-weight: bold; border-top: 1px solid #eee; padding-top: 10px; }
                        .status { margin-top: 20px; padding: 10px; border-radius: 4px; }
                        .status.pending { background-color: #fff8e1; color: #f57c00; }
                        .status.paid { background-color: #e8f5e9; color: #2e7d32; }
                        .status.overdue { background-color: #ffebee; color: #c62828; }
                    </style>
                </head>
                <body>
                    <div class="invoice">
                        <div class="header">
                            <div class="company-info">
                                <h2>CiClient</h2>
                                <p>New Reiss, Ghana, Accra</p>
                                <p>+23341002000</p>
                                <p>info@ciclient.com</p>
                            </div>
                            <div class="invoice-details">
                                <h1>INVOICE</h1>
                                <p><strong>Invoice #:</strong> ${invoice._id.substring(0, 8)}</p>
                                <p><strong>Created:</strong> ${formatDate(invoice.createdAt)}</p>
                                <p><strong>Due Date:</strong> ${formatDate(invoice.dueDate)}</p>
                            </div>
                        </div>
                        <div class="client-info">
                            <h3>Bill To:</h3>
                            <p><strong>${invoice.learner.firstName} ${invoice.learner.lastName}</strong></p>
                            <p>${invoice.learner.email}</p>
                            <p>${invoice.learner.contact}</p>
                            <p>${invoice.learner.location}</p>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Duration</th>
                                    <th class="text-right">Price</th>
                                    <th class="text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>${invoice.track.name}</td>
                                    <td>${invoice.track.duration}</td>
                                    <td class="text-right">$${invoice.track.price}</td>
                                    <td class="text-right">$${invoice.amount}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="summary">
                            <div class="summary-row">
                                <span>Subtotal:</span>
                                <span>$${invoice.amount}</span>
                            </div>
                            <div class="summary-row">
                                <span>Tax:</span>
                                <span>$0.00</span>
                            </div>
                            <div class="summary-row total">
                                <span>Total:</span>
                                <span>$${invoice.amount}</span>
                            </div>
                            <div class="status ${invoice.status.toLowerCase()}">
                                <div class="summary-row">
                                    <span>Payment Status:</span>
                                    <span>${invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</span>
                                </div>
                            </div>
                            <div style="margin-top: 20px; font-size: 14px;">
                                <p><strong>Payment Due:</strong> ${formatDate(invoice.dueDate)}</p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `

      // Create a Blob from the HTML
      const blob = new Blob([invoiceHTML], { type: "text/html" })
      // Create a download link
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = `invoice-${invoice._id.substring(0, 8)}.html`
      // Trigger the download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error generating invoice for download:", error)
      alert("Error generating invoice for download. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  // Add print styles
  useEffect(() => {
    // Add print styles when component mounts
    const style = document.createElement("style")
    style.textContent = `
            @media print {
                body * {
                    visibility: hidden;
                }
                #invoice-content, #invoice-content * {
                    visibility: visible;
                }
                #invoice-content {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    padding: 40px;
                    box-sizing: border-box;
                }
                @page {
                    size: A4;
                    margin: 0.5cm;
                }
            }
        `
    document.head.appendChild(style)
    // Clean up when component unmounts
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="h-[135px] bg-[#01589a]"></div>
      <main className="flex-1">
        <div className="mx-auto flex flex-col gap-8 px-4 md:px-20 lg:px-48">
          {/* Portal Tabs */}
          <div className="-mt-14 overflow-hidden rounded-md shadow-md">
            <PortalTabs />
          </div>
          {/* Invoice Detail Content */}
          <div className="rounded-lg bg-white p-8 shadow-md">
            <div className="mb-8 flex items-center justify-between">
              <Link
                href="/invoices"
                className="flex items-center text-[#01589a] hover:text-[#28ace2]"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Invoices
              </Link>
              <div className="flex space-x-4">
                <button
                  onClick={handlePrint}
                  disabled={isProcessing || !invoice}
                  className="flex items-center text-[#01589a] hover:text-[#28ace2] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Printer className="mr-2 h-5 w-5" />
                  {isProcessing ? "Processing..." : "Print"}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={isProcessing || !invoice}
                  className="flex items-center text-[#01589a] hover:text-[#28ace2] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download className="mr-2 h-5 w-5" />
                  {isProcessing ? "Processing..." : "Download"}
                </button>
              </div>
            </div>
            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-[#01589a]"></div>
              </div>
            ) : invoice ? (
              <div id="invoice-content" className="rounded-lg border border-gray-200 bg-white p-8">
                {/* Invoice Header */}
                <div className="mb-10 flex items-start justify-between">
                  <div>
                    <div className="mb-4 flex items-center">
                      <Image
                        src={cli_blue}
                        alt="CiClient Logo"
                        width={60}
                        height={60}
                        className="mr-2"
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>{invoice.learner.location}</p>
                      <p>{invoice.learner.contact}</p>
                      <p>{invoice.learner.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h2 className="mb-2 text-2xl font-bold">INVOICE</h2>
                    <p className="mb-1 text-gray-600">
                      <span className="font-medium">Invoice #:</span> {invoice._id.substring(0, 8)}
                    </p>
                    <p className="mb-1 text-gray-600">
                      <span className="font-medium">Created:</span> {formatDate(invoice.createdAt)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Due Date:</span> {formatDate(invoice.dueDate)}
                    </p>
                  </div>
                </div>
                {/* Learner Info */}
                <div className="mb-10">
                  <h3 className="mb-2 text-lg font-medium">Bill To:</h3>
                  <div className="text-gray-600">
                    <p className="font-medium">
                      {invoice.learner.firstName} {invoice.learner.lastName}
                    </p>
                    <p>{invoice.learner.email}</p>
                    <p>{invoice.learner.contact}</p>
                    <p>{invoice.learner.location}</p>
                  </div>
                </div>
                {/* Invoice Items */}
                <div className="mb-10">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left font-medium">Description</th>
                        <th className="px-4 py-3 text-center font-medium">Duration</th>
                        <th className="px-4 py-3 text-right font-medium">Price</th>
                        <th className="px-4 py-3 text-right font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-3">{invoice.track.name}</td>
                        <td className="px-4 py-3 text-center">{invoice.track.duration}</td>
                        <td className="px-4 py-3 text-right">${invoice.track.price}</td>
                        <td className="px-4 py-3 text-right">${invoice.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Invoice Summary */}
                <div className="flex justify-end">
                  <div className="w-64">
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Subtotal:</span>
                      <span>${invoice.amount}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Tax:</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 py-2 font-bold">
                      <span>Total:</span>
                      <span>${invoice.amount}</span>
                    </div>
                    <div
                      className={`mt-4 flex justify-between rounded-md p-3 ${getStatusColor(invoice.status)}`}
                    >
                      <span className="font-medium">Payment Status:</span>
                      <span className="capitalize">{invoice.status}</span>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Payment Due:</span>{" "}
                        {formatDate(invoice.dueDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">Invoice not found</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
