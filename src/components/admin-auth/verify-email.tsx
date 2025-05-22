"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FaCheckCircle, FaSpinner } from "react-icons/fa"
import { useAuth } from "@/lib/context/auth-context"

export function VerifyEmailForm() {
  const [token, setToken] = useState("")
  const [formError, setFormError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [verified, setVerified] = useState(false)
  const { verifyEmail, resendVerificationCode } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")

    if (!token) {
      setFormError("Please enter the verification code")
      return
    }

    setIsLoading(true)
    try {
      await verifyEmail(token)
      setVerified(true)
      setTimeout(() => {
        router.push("/admin/dashboard")
      }, 2000)
    } catch (err) {
      setFormError("Invalid verification code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setFormError("")
    setIsResending(true)
    try {
      await resendVerificationCode()
      alert("Verification code has been resent to your email")
    } catch (err) {
      setFormError("Failed to resend verification code. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  if (verified) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-[#1d1b20] rounded-lg shadow-md text-center">
        <FaCheckCircle className="mx-auto text-green-500 text-5xl mb-4" />
        <h1 className="text-2xl font-bold mb-2">Email Verified!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your email has been successfully verified. Redirecting to dashboard...
        </p>
        <button
          className="w-full bg-[#01589a] hover:bg-[#01589a]/90 text-white"
          onClick={() => router.push("/admin/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-[#1d1b20] rounded-lg shadow-md">
      <div className="text-center mb-8">
        <div className="text-[#01589a] font-bold text-3xl flex items-center justify-center mb-2">
          <span className="text-4xl">C</span>
          <span className="text-xl">Client</span>
        </div>
        <h1 className="text-2xl font-bold">Verify Your Email</h1>
        <p className="text-gray-600 dark:text-gray-400">
          We&apos;ve sent a verification code to your email. Please enter it below.
        </p>
      </div>

      {formError && <div className="bg-[#F7E9EA] text-[#A61D24] p-3 rounded-md mb-4 text-sm">{formError}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="token">Verification Code</label>
          <input
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter 6-digit code"
            required
          />
        </div>

        <button type="submit" className="w-full bg-[#01589a] hover:bg-[#01589a]/90 text-white" disabled={isLoading}>
          {isLoading ? (
            <>
              <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Verifying...
            </>
          ) : (
            "Verify Email"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        Didn&apos;t receive a code?{" "}
        <button onClick={handleResend} className="text-[#01589a] hover:underline" disabled={isResending}>
          {isResending ? (
            <>
              <FaSpinner className="inline mr-1 h-3 w-3 animate-spin" /> Resending...
            </>
          ) : (
            "Resend Code"
          )}
        </button>
      </div>

      <div className="mt-4 text-center text-sm">
        <Link href="/admin/auth/login" className="text-[#01589a] hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  )
}
