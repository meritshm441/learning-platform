"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PasswordInput } from "@/components/shared/Input"
import { resetPassword } from "@/lib/repositories/authRepository"
import { useForm, useWatch } from "react-hook-form"
import { BsArrowRight } from "react-icons/bs"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface ResetPasswordPageProps {
  params: Promise<{ id: string }>
}

export default function ResetPassword({ params }: ResetPasswordPageProps) {
  const router = useRouter()
  const [resetId, setResetId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Extract the ID from params when component mounts
  useEffect(() => {
    async function loadParams() {
      try {
        const resolvedParams = await params
        setResetId(resolvedParams.id)
      } catch (error) {
        console.error("Error resolving params:", error)
        toast.error("Invalid reset link. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    loadParams()
  }, [params])

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const passwordValue = useWatch({ control, name: "password", defaultValue: "" })

  const onSubmit = async (data: { password: string; confirmPassword: string }) => {
    if (!resetId) {
      toast.error("Missing reset ID. Please try the password reset process again.")
      return
    }

    setIsSubmitting(true)
    try {
      await resetPassword(resetId, data.password, data.confirmPassword)
      toast.success(
        "Your password has been reset successfully. You can now log in with your new password."
      )
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error) {
      console.error("Password reset failed:", error)
      if (error instanceof Error) {
        toast.error(error.message || "Failed to reset your password. Please try again.")
      } else {
        toast.error("Failed to reset your password. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <main className="container mx-auto flex flex-1 items-center justify-center px-4 py-12">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-t-[#01589a] border-r-transparent border-b-transparent border-l-transparent"></div>
            <p className="text-[#666666]">Loading...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center gap-8 px-4 py-12 md:flex-row">
        <ToastContainer />

        <div className="w-full max-w-lg">
          <h1 className="mb-4 text-3xl font-bold text-[#404040]">Reset Password</h1>
          <p className="mb-6 text-[#666666]">Create a new password for your account</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="mb-2 block text-[#404040]">New Password</label>
              <PasswordInput
                name="password"
                placeholder="Enter new password"
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
                register={register}
                error={!!errors.password}
                valid={passwordValue.length >= 8}
                errorMessage={errors.password?.message as string}
                validationRules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                }}
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-[#404040]">Confirm Password</label>
              <PasswordInput
                name="confirmPassword"
                placeholder="Confirm new password"
                show={showConfirmPassword}
                toggle={() => setShowConfirmPassword(!showConfirmPassword)}
                register={register}
                error={!!errors.confirmPassword}
                valid={!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message as string}
                validationRules={{
                  required: "Please confirm your password",
                  validate: (value: string) =>
                    value === getValues("password") || "Passwords do not match",
                }}
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded bg-[#01589a] px-4 py-3 text-white hover:bg-[#115ea5]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}{" "}
              {!isSubmitting && <BsArrowRight className="ml-2 h-5 w-5" />}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
