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
    } catch {
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
    } catch {
      setFormError("Failed to resend verification code. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  if (verified) {
    return (
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 text-center shadow-md dark:bg-[#1d1b20]">
        <FaCheckCircle className="mx-auto mb-4 text-5xl text-green-500" />
        <h1 className="mb-2 text-2xl font-bold">Email Verified!</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Your email has been successfully verified. Redirecting to dashboard...
        </p>
        <button
          className="w-full bg-[#01589a] text-white hover:bg-[#01589a]/90"
          onClick={() => router.push("/admin/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-[#1d1b20]">
      <div className="mb-8 text-center">
        <div className="mb-2 flex items-center justify-center text-3xl font-bold text-[#01589a]">
          <span className="text-4xl">C</span>
          <span className="text-xl">Client</span>
        </div>
        <h1 className="text-2xl font-bold">Verify Your Email</h1>
        <p className="text-gray-600 dark:text-gray-400">
          We&apos;ve sent a verification code to your email. Please enter it below.
        </p>
      </div>

      {formError && (
        <div className="mb-4 rounded-md bg-[#F7E9EA] p-3 text-sm text-[#A61D24]">{formError}</div>
      )}

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

        <button
          type="submit"
          className="w-full bg-[#01589a] text-white hover:bg-[#01589a]/90"
          disabled={isLoading}
        >
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
        <button
          onClick={handleResend}
          className="text-[#01589a] hover:underline"
          disabled={isResending}
        >
          {isResending ? (
            <>
              <FaSpinner className="mr-1 inline h-3 w-3 animate-spin" /> Resending...
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
