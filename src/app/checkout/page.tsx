"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { z } from "zod"
import { 
  FiUser, 
  FiMail, 
  FiBook, 
  FiUsers, 
  FiPhone, 
  FiMapPin, 
  FiHeart, 
  FiChevronDown, 
  FiArrowRight 
} from "react-icons/fi"

// Form validation schema
const checkoutSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  course: z.string().min(1, "Please select a course"),
  gender: z.string().optional(),
  phone: z.string().min(10, "Valid phone number is required"),
  location: z.string().min(3, "Location is required"),
  disabled: z.string().optional(),
  description: z.string().optional(),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get course details from URL params if available
  const courseName = searchParams.get("course") || ""
  const coursePrice = searchParams.get("price") || "350.00"

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    email: "",
    course: courseName,
    gender: "",
    phone: "",
    location: "",
    disabled: "",
    description: "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showGenderDropdown, setShowGenderDropdown] = useState(false)
  const [showDisabledDropdown, setShowDisabledDropdown] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev:any) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const selectGender = (gender: string) => {
    setFormData((prev:any) => ({ ...prev, gender }))
    setShowGenderDropdown(false)
  }

  const selectDisabled = (disabled: string) => {
    setFormData((prev:any) => ({ ...prev, disabled }))
    setShowDisabledDropdown(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form data
      const validatedData = checkoutSchema.parse(formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Form submitted successfully:", validatedData)

      // Redirect to success page
      router.push("/checkout/success")
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const formattedErrors: Partial<Record<keyof CheckoutFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof CheckoutFormData] = err.message
          }
        })
        setErrors(formattedErrors)
      } else {
        console.error("Submission error:", error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header */}
      <div className="bg-[#01589a] py-8 text-center">
        <h1 className="text-white text-3xl font-bold">Checkout</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Complete payment</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-[#f5f5f5] rounded border ${
                      errors.fullName ? "border-red-500" : "border-transparent"
                    }`}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-[#f5f5f5] rounded border ${
                      errors.email ? "border-red-500" : "border-transparent"
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Course */}
                <div className="relative">
                  <FiBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="course"
                    placeholder="Course name"
                    value={formData.course}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-[#f5f5f5] rounded border ${
                      errors.course ? "border-red-500" : "border-transparent"
                    }`}
                  />
                  {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
                </div>

                {/* Gender */}
                <div className="relative">
                  <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <div
                    className="w-full pl-10 pr-4 py-3 bg-[#f5f5f5] rounded flex justify-between items-center cursor-pointer"
                    onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                  >
                    <span className={formData.gender ? "text-black" : "text-gray-400"}>
                      {formData.gender || "Gender"}
                    </span>
                    <FiChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                  {showGenderDropdown && (
                    <div className="absolute z-10 mt-1 w-full  border border-gray-200 rounded shadow-lg">
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => selectGender("Male")}>
                        Male
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectGender("Female")}
                      >
                        Female
                      </div>
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => selectGender("Other")}>
                        Other
                      </div>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-[#f5f5f5] rounded border ${
                      errors.phone ? "border-red-500" : "border-transparent"
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* Location */}
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-[#f5f5f5] rounded border ${
                      errors.location ? "border-red-500" : "border-transparent"
                    }`}
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                {/* Disabled */}
                <div className="relative">
                  <FiHeart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <div
                    className="w-full pl-10 pr-4 py-3 bg-[#f5f5f5] rounded flex justify-between items-center cursor-pointer"
                    onClick={() => setShowDisabledDropdown(!showDisabledDropdown)}
                  >
                    <span className={formData.disabled ? "text-black" : "text-gray-400"}>
                      {formData.disabled || "Disabled"}
                    </span>
                    <FiChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                  {showDisabledDropdown && (
                    <div className="absolute z-10 mt-1 w-full  border border-gray-200 rounded shadow-lg">
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => selectDisabled("Yes")}>
                        Yes
                      </div>
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => selectDisabled("No")}>
                        No
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-[#f5f5f5] rounded resize-none"
                  />
                </div>
              </form>
            </div>

            {/* Right Column - Payment Summary */}
            <div className="lg:pl-8">
              <div className=" p-6 rounded-md shadow-md">
                <h3 className="text-2xl font-bold mb-6">$ {coursePrice} USD</h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Select amount</label>
                  <div className="relative">
                    <select title="menu" className="w-full px-4 py-3 bg-[#f5f5f5] rounded appearance-none pr-10" defaultValue="100">
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="300">300</option>
                      <option value="400">400</option>
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-[#01589a] text-white py-3 rounded flex items-center justify-center hover:bg-[#115ea5] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Complete my purchase <FiArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
