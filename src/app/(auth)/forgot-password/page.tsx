"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { InputWithIcon } from "@/components/shared/Input"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { BsArrowRight } from "react-icons/bs"
import { RiMailLine } from "react-icons/ri"
import { forgotPassword } from "@/lib/repositories/authRepository"
import { toast } from "react-toastify"

export default function ForgotPassword() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [id, setId] = useState("")

  useEffect(() => {
    const storedId = localStorage.getItem("id")
    if (storedId) {
      setId(storedId)
    }
  }, [])

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
    } catch (error: any) {
      console.error("Password reset request failed:", error)
      toast.error(error.message || "Failed to send reset link. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-center gap-8">
       
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-[#404040] mb-4">Forgot Password</h1>
          <p className="text-[#666666] mb-6">
            Enter your email address and we'll send you a link to reset your password
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <InputWithIcon
                name="email"
                type="email"
                placeholder="Enter your email"
                icon={<RiMailLine className="w-5 h-5" />}
                register={register}
                required={true}
                error={!!errors.email}
                valid={isValid}
                errorMessage={errors.email?.message as string}
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-[#01589a] text-white py-3 px-4 rounded hover:bg-[#115ea5]"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}{" "}
              {!isSubmitting && <BsArrowRight className="ml-2 h-5 w-5" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#666666]">
              Remember your password?{" "}
              <button onClick={() => router.push("/login")} className="text-[#01589a] font-medium hover:underline">
                Back to login
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
