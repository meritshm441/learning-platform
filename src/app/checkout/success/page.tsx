import Link from "next/link"
import { FiCheckCircle, FiArrowLeft } from "react-icons/fi"

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-[#01589a] py-8 text-center">
        <h1 className="text-white text-3xl font-bold">Checkout Complete</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <FiCheckCircle className="h-24 w-24 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your course registration has been successfully processed. You will receive a
            confirmation email shortly with all the details.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[#01589a] text-white rounded hover:bg-[#115ea5]"
          >
            <FiArrowLeft className="mr-2" /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
