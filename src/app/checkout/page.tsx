"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  FiArrowRight,
  FiLock,
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

// User data type from localStorage
type UserData = {
  firstname: string
  lastname: string
  email: string
  image?: string
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string
export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get course details from URL params if available
  const courseName = searchParams.get("course") || ""
  const coursePrice = searchParams.get("price") || "350.00"
  const courseId = searchParams.get("trackId") || "67f85311a3761b766ecff63e"
  console.log("courseId", courseId)

  const [formData, setFormData] = useState<CheckoutFormData>(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")
    if (token && userData) {
      try {
        const user = JSON.parse(userData) as UserData
        return {
          fullName: `${user.firstname} ${user.lastname}`.trim(),
          email: user.email,
          course: courseName,
          gender: "",
          phone: "",
          location: "",
          disabled: "",
          description: "",
        }
      } catch {
        // fallback below
      }
    }
    return {
      fullName: "",
      email: "",
      course: courseName,
      gender: "",
      phone: "",
      location: "",
      disabled: "",
      description: "",
    }
  })

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showGenderDropdown, setShowGenderDropdown] = useState(false)
  const [showDisabledDropdown, setShowDisabledDropdown] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")
    return !!(token && userData)
  })

  // Load user data from localStorage on component mount
  useEffect(() => {
    // Check if user is logged in by looking for token and user data
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      // If not logged in, redirect to login page
      router.push("/login?redirect=/checkout")
    }
    console.log("user")

    // Listen for auth state changes
    const handleAuthChange = () => {
      const newToken = localStorage.getItem("token")
      const newUserData = localStorage.getItem("user")

      if (newToken && newUserData) {
        try {
          const user = JSON.parse(newUserData) as UserData

          setFormData((prev) => ({
            ...prev,
            fullName: `${user.firstname} ${user.lastname}`.trim(),
            email: user.email,
          }))

          setIsLoggedIn(true)
        } catch (error) {
          console.error("Error parsing user data:", error)
        }
      } else {
        setIsLoggedIn(false)
      }
    }

    window.addEventListener("authStateChanged", handleAuthChange)

    return () => {
      window.removeEventListener("authStateChanged", handleAuthChange)
    }
  }, [router])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const selectGender = (gender: string) => {
    setFormData((prev) => ({ ...prev, gender }))
    setShowGenderDropdown(false)
  }

  const selectDisabled = (disabled: string) => {
    setFormData((prev) => ({ ...prev, disabled }))
    setShowDisabledDropdown(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setApiError(null)

    try {
      // Validate form data
      checkoutSchema.parse(formData)

      // Get the current origin URL
      const currentOrigin =
        typeof window !== "undefined"
          ? window.location.origin
          : process.env.NEXT_PUBLIC_API_BASE_URL

      // Send enrollment data to the correct API endpoint
      const response = await fetch(`${API_BASE_URL}/enrollments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          track: courseId,
          amount: parseInt(coursePrice),
          paystackCallbackUrl: `${currentOrigin}/payment`,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("Registration successful:", data)

      // Redirect to success page
      router.push("/checkout/success")
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<Record<keyof CheckoutFormData, string>> = {}
        error.issues.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof CheckoutFormData] = err.message
          }
        })
        setErrors(formattedErrors)
      } else {
        console.error("Submission error:", error)
        setApiError(error instanceof Error ? error.message : "An unexpected error occurred")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="bg-[#01589a] py-8 text-center">
        <h1 className="text-3xl font-bold text-white">Checkout</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-12 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-bold">Complete payment</h2>

          {apiError && (
            <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Left Column - Form */}
              <div className="space-y-4">
                {/* Full Name - Disabled if logged in */}
                <div className="relative">
                  {isLoggedIn ? (
                    <FiLock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  ) : (
                    <FiUser className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  )}
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={isLoggedIn}
                    className={`w-full py-3 pr-4 pl-10 ${isLoggedIn ? "bg-gray-100 text-gray-700" : "bg-[#f5f5f5]"} rounded border ${
                      errors.fullName ? "border-red-500" : "border-transparent"
                    } ${isLoggedIn ? "cursor-not-allowed" : ""}`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>

                {/* Email - Disabled if logged in */}
                <div className="relative">
                  {isLoggedIn ? (
                    <FiLock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  ) : (
                    <FiMail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  )}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoggedIn}
                    className={`w-full py-3 pr-4 pl-10 ${isLoggedIn ? "bg-gray-100 text-gray-700" : "bg-[#f5f5f5]"} rounded border ${
                      errors.email ? "border-red-500" : "border-transparent"
                    } ${isLoggedIn ? "cursor-not-allowed" : ""}`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Course */}
                <div className="relative">
                  <FiBook className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <input
                    type="text"
                    name="course"
                    placeholder="Course name"
                    value={formData.course}
                    onChange={handleInputChange}
                    className={`w-full rounded border bg-[#f5f5f5] py-3 pr-4 pl-10 ${
                      errors.course ? "border-red-500" : "border-transparent"
                    }`}
                  />
                  {errors.course && <p className="mt-1 text-sm text-red-500">{errors.course}</p>}
                </div>

                {/* Gender */}
                <div className="relative">
                  <FiUsers className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <div
                    className="flex w-full cursor-pointer items-center justify-between rounded bg-[#f5f5f5] py-3 pr-4 pl-10"
                    onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                  >
                    <span className={formData.gender ? "text-black" : "text-gray-400"}>
                      {formData.gender || "Gender"}
                    </span>
                    <FiChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                  {showGenderDropdown && (
                    <div className="absolute z-10 mt-1 w-full rounded border border-gray-200 bg-white shadow-lg">
                      <div
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        onClick={() => selectGender("Male")}
                      >
                        Male
                      </div>
                      <div
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        onClick={() => selectGender("Female")}
                      >
                        Female
                      </div>
                      <div
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        onClick={() => selectGender("Other")}
                      >
                        Other
                      </div>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div className="relative">
                  <FiPhone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full rounded border bg-[#f5f5f5] py-3 pr-4 pl-10 ${
                      errors.phone ? "border-red-500" : "border-transparent"
                    }`}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>

                {/* Location */}
                <div className="relative">
                  <FiMapPin className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full rounded border bg-[#f5f5f5] py-3 pr-4 pl-10 ${
                      errors.location ? "border-red-500" : "border-transparent"
                    }`}
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                  )}
                </div>

                {/* Disabled */}
                <div className="relative">
                  <FiHeart className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <div
                    className="flex w-full cursor-pointer items-center justify-between rounded bg-[#f5f5f5] py-3 pr-4 pl-10"
                    onClick={() => setShowDisabledDropdown(!showDisabledDropdown)}
                  >
                    <span className={formData.disabled ? "text-black" : "text-gray-400"}>
                      {formData.disabled || "Disabled"}
                    </span>
                    <FiChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                  {showDisabledDropdown && (
                    <div className="absolute z-10 mt-1 w-full rounded border border-gray-200 bg-white shadow-lg">
                      <div
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        onClick={() => selectDisabled("Yes")}
                      >
                        Yes
                      </div>
                      <div
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        onClick={() => selectDisabled("No")}
                      >
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
                    className="w-full resize-none rounded bg-[#f5f5f5] px-4 py-3"
                  />
                </div>
              </div>

              {/* Right Column - Payment Summary */}
              <div className="lg:pl-8">
                <div className="rounded-md p-6 shadow-md">
                  <h3 className="mb-6 text-2xl font-bold">$ {coursePrice} USD</h3>

                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium">Select amount</label>
                    <div className="relative">
                      <select
                        title="menu"
                        className="w-full appearance-none rounded bg-[#f5f5f5] px-4 py-3 pr-10"
                        defaultValue="100"
                      >
                        <option value="100">350</option>
                      </select>
                      <FiChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center rounded bg-[#01589a] py-3 text-white hover:bg-[#115ea5] disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
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
          </form>
        </div>
      </div>
    </div>
  )
}
