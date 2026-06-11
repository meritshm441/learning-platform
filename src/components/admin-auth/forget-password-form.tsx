"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { FaEnvelope, FaSpinner } from "react-icons/fa"
import { InputWithIcon } from "../shared/Input"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (_data: { email: string }) => {
    setError("")
    setIsLoading(true)
    setSubmittedEmail(_data.email)

    try {
      // In a real app, this would call your API
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)
    } catch {
      setError("Failed to send reset link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 text-center shadow-md dark:bg-[#1d1b20]">
        <div className="mb-6 flex items-center justify-center text-3xl font-bold text-[#01589a]">
          <span className="text-4xl">C</span>
          <span className="text-xl">Client</span>
        </div>
        <h1 className="mb-4 text-2xl font-bold">Check Your Email</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          We&apos;ve sent a password reset link to <strong>{submittedEmail}</strong>. Please check
          your inbox and follow the instructions to reset your password.
        </p>
        <Link
          href="/admin/auth/login"
          className="flex w-full items-center justify-center rounded-md bg-[#01589a] py-2 text-white hover:bg-[#01589a]/90"
        >
          Back to Login
        </Link>
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
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-[#F7E9EA] p-3 text-sm text-[#A61D24]">{error}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <InputWithIcon
            name="email"
            placeholder="Email Address"
            type="email"
            icon={<FaEnvelope className="h-5 w-5" />}
            register={register}
            required={true}
            error={!!errors.email}
            valid={dirtyFields.email && !errors.email}
            errorMessage={errors.email?.message as string}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#01589a] text-white hover:bg-[#01589a]/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        Remember your password?{" "}
        <Link href="/admin/auth/login" className="text-[#01589a] hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  )
}
