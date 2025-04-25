"use client"

import { useRouter } from "next/navigation"
import { FiAlertOctagon } from "react-icons/fi"

export default function Custom500() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md px-6 py-12 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="p-3 bg-red-100 rounded-full">
            <FiAlertOctagon className="w-10 h-10 text-red-500" />
          </div>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-gray-400">Data Not Found</h1>

        <div className="p-4 mb-6 bg-white border rounded-lg shadow-sm border-gray-100">
          <p className="text-gray-400">We're sorry, but the requested information is currently unavailable.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => router.refresh()}
            className="px-5 py-2 font-medium text-gray-700 transition-all duration-300 rounded-md bg-secondary-500 hover:bg-secondary-600"
          >
            Refresh Page
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-5 py-2 font-medium transition-all duration-300 bg-white border rounded-md border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Return Home
          </button>
        </div>

        <div className="mt-8 text-xs text-center text-gray-400">
          Error ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
        </div>
      </div>
    </div>
  )
}
