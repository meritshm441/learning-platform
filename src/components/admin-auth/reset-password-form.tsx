"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { FaSpinner } from "react-icons/fa"
import { PasswordInput } from "../shared/Input"

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const password = watch("password")

  const onSubmit = async (data: any) => {
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
    } catch (err) {
      setError("Failed to reset password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-[#1d1b20] rounded-lg shadow-md">
      <div className="text-center mb-8">
        <div className="text-[#01589a] font-bold text-3xl flex items-center justify-center mb-2">
          <span className="text-4xl">C</span>
          <span className="text-xl">Client</span>
        </div>
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-gray-600 dark:text-gray-400">Create a new password for your account</p>
      </div>

      {error && <div className="bg-[#F7E9EA] text-[#A61D24] p-3 rounded-md mb-4 text-sm">{error}</div>}

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
              validate: (value: string) => value === password || "Passwords do not match",
            }}
            error={!!errors.confirmPassword}
            valid={dirtyFields.confirmPassword && !errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message as string}
          />
        </div>

        <button type="submit" className="w-full bg-[#01589a] hover:bg-[#01589a]/90 text-white" disabled={isLoading}>
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
