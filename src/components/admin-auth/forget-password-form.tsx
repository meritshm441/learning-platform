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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  })

  const email = watch("email")

  const onSubmit = async (data: any) => {
    setError("")
    setIsLoading(true)

    try {
      // In a real app, this would call your API
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)
    } catch (err) {
      setError("Failed to send reset link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-[#1d1b20] rounded-lg shadow-md text-center">
        <div className="text-[#01589a] font-bold text-3xl flex items-center justify-center mb-6">
          <span className="text-4xl">C</span>
          <span className="text-xl">Client</span>
        </div>
        <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We&apos;ve sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the
          instructions to reset your password.
        </p>
        <Link
          href="/admin/auth/login"
          className="w-full bg-[#01589a] hover:bg-[#01589a]/90 text-white flex items-center justify-center py-2 rounded-md"
        >
          Back to Login
        </Link>
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
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      {error && <div className="bg-[#F7E9EA] text-[#A61D24] p-3 rounded-md mb-4 text-sm">{error}</div>}

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

        <button type="submit" className="w-full bg-[#01589a] hover:bg-[#01589a]/90 text-white" disabled={isLoading}>
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
