import Link from "next/link"
import { FiCheckCircle, FiArrowLeft } from "react-icons/fi"

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="bg-[#01589a] py-8 text-center">
        <h1 className="text-3xl font-bold text-white">Checkout Complete</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <FiCheckCircle className="h-24 w-24 text-green-500" />
          </div>
          <h2 className="mb-4 text-2xl font-bold">Payment Successful!</h2>
          <p className="mb-8 text-gray-600">
            Thank you for your purchase. Your course registration has been successfully processed.
            You will receive a confirmation email shortly with all the details.
          </p>
          <Link
            href="/"
            className="inline-flex items-center rounded bg-[#01589a] px-6 py-3 text-white hover:bg-[#115ea5]"
          >
            <FiArrowLeft className="mr-2" /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
