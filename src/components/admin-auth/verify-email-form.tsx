"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { FaCheckCircle, FaSpinner } from "react-icons/fa"
import { MdOutlineVerified } from "react-icons/md"
import { useAuth } from "@/lib/context/auth-context"
import { InputWithIcon } from "../shared/Input"

export function VerifyEmailForm() {
  const router = useRouter()
  const { verifyEmail, resendVerificationCode } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      verificationCode: "",
    },
  })

  const onSubmit = async (data: any) => {
    setError("")
    setIsLoading(true)

    try {
      // In a real app, this would call your API
      await verifyEmail(data.verificationCode)
      setSuccess(true)
      setTimeout(() => {
        router.push("/admin/dashboard")
      }, 2000)
    } catch (err) {
      setError("Invalid verification code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setError("")
    setIsResending(true)

    try {
      // In a real app, this would call your API
      await resendVerificationCode()
      alert("Verification code has been resent to your email")
    } catch (err) {
      setError("Failed to resend verification code. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  if (success) {
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

      {error && <div className="bg-[#F7E9EA] text-[#A61D24] p-3 rounded-md mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="verificationCode">Verification Code</label>
          <InputWithIcon
            name="verificationCode"
            placeholder="Enter 6-digit code"
            icon={<MdOutlineVerified className="h-5 w-5" />}
            register={register}
            required={true}
            error={!!errors.verificationCode}
            valid={dirtyFields.verificationCode && !errors.verificationCode}
            errorMessage={errors.verificationCode?.message as string}
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
        <button onClick={handleResendCode} className="text-[#01589a] hover:underline" disabled={isResending}>
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
