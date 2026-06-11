"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { FaSpinner } from "react-icons/fa"
import { PasswordInput } from "../shared/Input"

export function ResetPasswordForm({ token: _token }: { token?: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: { password: string; confirmPassword: string }) => {
    setError("")

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would call your API with the token
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/admin/auth/login?reset=success")
    } catch {
      setError("Failed to reset password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-[#1d1b20]">
      <div className="mb-8 text-center">
        <div className="mb-2 flex items-center justify-center text-3xl font-bold text-[#01589a]">
          <span className="text-4xl">C</span>
          <span className="text-xl">Client</span>
        </div>
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-gray-600 dark:text-gray-400">Create a new password for your account</p>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-[#F7E9EA] p-3 text-sm text-[#A61D24]">{error}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password">New Password</label>
          <PasswordInput
            name="password"
            placeholder="New Password"
            show={showPassword}
            toggle={() => setShowPassword(!showPassword)}
            register={register}
            validationRules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            error={!!errors.password}
            valid={dirtyFields.password && !errors.password}
            errorMessage={errors.password?.message as string}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <PasswordInput
            name="confirmPassword"
            placeholder="Confirm New Password"
            show={showConfirmPassword}
            toggle={() => setShowConfirmPassword(!showConfirmPassword)}
            register={register}
            validationRules={{
              required: "Please confirm your password",
              validate: (value: string) =>
                value === getValues("password") || "Passwords do not match",
            }}
            error={!!errors.confirmPassword}
            valid={dirtyFields.confirmPassword && !errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message as string}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#01589a] text-white hover:bg-[#01589a]/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <Link href="/admin/auth/login" className="text-[#01589a] hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  )
}
