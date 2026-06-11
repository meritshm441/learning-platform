"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { InputWithIcon } from "@/components/shared/Input"
import { useForm } from "react-hook-form"
import { BsArrowRight } from "react-icons/bs"
import { RiMailLine } from "react-icons/ri"
import { forgotPassword } from "@/lib/repositories/authRepository"
import { toast } from "react-toastify"

export default function ForgotPassword() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [id] = useState(() => {
    if (typeof window === "undefined") return ""
    return localStorage.getItem("id") || ""
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: { email: string }) => {
    setIsSubmitting(true)
    try {
      await forgotPassword(data.email)
      toast.success(`We've sent a password reset link to ${data.email}`)
      router.push(`/forgot-password/reset-password?${id}`)
    } catch (error) {
      console.error("Password reset request failed:", error)
      if (error instanceof Error) {
        toast.error(error.message || "Failed to send reset link. Please try again.")
      } else {
        toast.error("Failed to send reset link. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center gap-8 px-4 py-12 md:flex-row">
        <div className="w-full max-w-md">
          <h1 className="mb-4 text-3xl font-bold text-[#404040]">Forgot Password</h1>
          <p className="mb-6 text-[#666666]">
            Enter your email address and we&apos;ll send you a link to reset your password
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <InputWithIcon
                name="email"
                type="email"
                placeholder="Enter your email"
                icon={<RiMailLine className="h-5 w-5" />}
                register={register}
                required={true}
                error={!!errors.email}
                valid={isValid}
                errorMessage={errors.email?.message as string}
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded bg-[#01589a] px-4 py-3 text-white hover:bg-[#115ea5]"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}{" "}
              {!isSubmitting && <BsArrowRight className="ml-2 h-5 w-5" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#666666]">
              Remember your password?{" "}
              <button
                onClick={() => router.push("/login")}
                className="font-medium text-[#01589a] hover:underline"
              >
                Back to login
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
