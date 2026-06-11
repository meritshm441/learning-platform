"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { FiAlertOctagon } from "react-icons/fi"

export default function Custom500() {
  const router = useRouter()
  const [errorId] = useState(() => Math.random().toString(36).substring(2, 10).toUpperCase())

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-6 py-12 text-center">
        <div className="mb-6 flex items-center justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <FiAlertOctagon className="h-10 w-10 text-red-500" />
          </div>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-gray-400">Data Not Found</h1>

        <div className="mb-6 rounded-lg border border-gray-100 p-4 shadow-sm">
          <p className="text-gray-400">
            We&apos;re sorry, but the requested information is currently unavailable.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => router.refresh()}
            className="bg-secondary-500 hover:bg-secondary-600 rounded-md px-5 py-2 font-medium text-gray-700 transition-all duration-300"
          >
            Refresh Page
          </button>

          <button
            onClick={() => router.push("/")}
            className="rounded-md border border-gray-200 px-5 py-2 font-medium text-gray-700 transition-all duration-300 hover:bg-gray-50"
          >
            Return Home
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">Error ID: {errorId}</div>
      </div>
    </div>
  )
}
