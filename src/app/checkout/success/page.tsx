import Link from "next/link"
import { BiCheckCircle } from "react-icons/bi"
import { BsArrowRight } from "react-icons/bs"

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <div className="bg-[#01589a] py-8 text-center">
        <h1 className="text-white text-3xl font-bold">Payment Successful</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <BiCheckCircle className="h-24 w-24 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Thank you for your purchase!</h2>
          <p className="text-gray-600 mb-8">
            Your payment was successful and your enrollment has been confirmed. You can now access your course
            materials.
          </p>
          <div className="space-y-4">
            <Link href="/courses" className="block w-full bg-[#01589a] text-white py-3 rounded hover:bg-[#115ea5]">
              Go to My Courses
            </Link>
            <Link
              href="/"
              className="block w-full  border border-[#01589a] text-[#01589a] py-3 rounded hover:bg-[#f5f5f5]"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
