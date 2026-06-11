"use client"
import { InputWithIcon } from "@/components/shared/Input"
import { useForm } from "react-hook-form"
import { BsArrowRight } from "react-icons/bs"
import { MdPassword } from "react-icons/md"
import { useState, useEffect } from "react"
import { resendVerificationToken, verifyEmail } from "@/lib/repositories/authRepository"

export default function OTPVerification() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  })

  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") || "" : ""

  const [showResend, setShowResend] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResend(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const onSubmit = async (data: { otp: string }) => {
    console.log("Form submitted:", data)
    try {
      const response = await verifyEmail(data.otp, token)
      console.log("Email verification successful:", response)
    } catch (error) {
      console.error("Email verification failed:", error)
    }
  }

  const handleResendToken = async () => {
    try {
      const response = await resendVerificationToken()
      console.log("Resend token successful:", response)
    } catch (error) {
      console.error("Failed to resend token:", error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center gap-8 px-4 py-12 md:flex-row">
        <div className="w-full max-w-md">
          <h1 className="mb-4 text-3xl font-bold text-[#404040]">OTP Verification</h1>
          <p className="mb-6 text-[#666666]">
            Verify your accounts using the six digit sent to test@gmail.com
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <InputWithIcon
                name="otp"
                placeholder="Enter 6-digit code"
                icon={<MdPassword className="h-5 w-5" />}
                register={register}
                required={true}
                error={!!errors.otp}
                valid={isValid}
                errorMessage={errors.otp?.message as string}
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded bg-[#01589a] px-4 py-3 text-white hover:bg-[#115ea5]"
              disabled={!isValid}
            >
              Verify OTP <BsArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>

          {showResend && (
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-[#01589a] hover:underline"
                onClick={handleResendToken}
              >
                Resend OTP
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
