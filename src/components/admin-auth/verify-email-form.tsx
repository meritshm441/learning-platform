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

  const onSubmit = async (data: { verificationCode: string }) => {
    setError("")
    setIsLoading(true)

    try {
      // In a real app, this would call your API
      await verifyEmail(data.verificationCode)
      setSuccess(true)
      setTimeout(() => {
        router.push("/admin/dashboard")
      }, 2000)
    } catch {
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
    } catch {
      setError("Failed to resend verification code. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  if (success) {
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

      {error && (
        <div className="mb-4 rounded-md bg-[#F7E9EA] p-3 text-sm text-[#A61D24]">{error}</div>
      )}

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
          onClick={handleResendCode}
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
