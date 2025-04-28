"use client"
import { useForm } from "react-hook-form"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaArrowRightToBracket, FaRegUser } from "react-icons/fa6"
import { google_logo, login_register } from "@/lib/constants/images"
import { signupUser } from "@/lib/repositories/authRepository"
import { InputWithIcon, PasswordInput } from "@/components/shared/Input"
import { AiOutlineMail } from "react-icons/ai"
import { FaCheck } from "react-icons/fa"

type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Password validation rules
  const passwordValidationRules = {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message: "Password must include uppercase, lowercase, number and special character",
    },
  }

  // Confirm password validation rules
  const confirmPasswordValidationRules = {
    required: "Please confirm your password",
    validate: (value: string) => value === watch("password") || "Passwords do not match",
  }

  const onSubmit = async (data: FormData) => {
    try {
      await signupUser(data)
      alert("Signup successful!")
      window.location.href = "/login"
    } catch (error) {
      console.error("Signup error:", error)
      alert("Signup failed. Please try again.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <div className="order-2 md:order-1 w-[481px] h-[481px]">
            <Image
              src={login_register || "/placeholder.svg"}
              alt="Learning illustration"
              width={500}
              height={400}
              className="max-w-full h-auto"
            />
          </div>

          <div className="order-1 md:order-2 flex flex-col items-center">
            <h1 className="text-3xl font-medium text-[#404040] text-center mb-8">Sign up to get started</h1>

            <div className="w-full max-w-md">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-[#e6e6e6] rounded p-3 mb-4 hover:bg-[#f5f5f5]"
              >
                <Image src={google_logo || "/placeholder.svg"} alt="Google logo" width={24} height={24} />
                Sign up using Google
              </button>

              <div className="flex items-center gap-4 my-4">
                <div className="h-px bg-[#e6e6e6] flex-1"></div>
                <span className="text-[#666666]">or</span>
                <div className="h-px bg-[#e6e6e6] flex-1"></div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <InputWithIcon
                  name="firstName"
                  placeholder="First name"
                  icon={<FaRegUser className="h-5 w-5" />}
                  register={register}
                  required
                  error={!!errors.firstName}
                  valid={!errors.firstName && !!watch("firstName")}
                  errorMessage={errors.firstName?.message}
                />
                <InputWithIcon
                  name="lastName"
                  placeholder="Last name"
                  icon={<FaRegUser className="h-5 w-5" />}
                  register={register}
                  required
                  error={!!errors.lastName}
                  valid={!errors.lastName && !!watch("lastName")}
                  errorMessage={errors.lastName?.message}
                />

                <InputWithIcon
                  type="email"
                  name="email"
                  placeholder="Email"
                  icon={<AiOutlineMail className="h-5 w-5" />}
                  register={register}
                  required
                  error={!!errors.email}
                  valid={!errors.email && !!watch("email")}
                  errorMessage={errors.email?.message}
                />

                <div className="space-y-1">
                  <PasswordInput
                    name="password"
                    placeholder="Password"
                    show={showPassword}
                    toggle={() => setShowPassword(!showPassword)}
                    register={register}
                    validationRules={passwordValidationRules}
                    error={!!errors.password}
                    valid={!errors.password && watch("password")?.length >= 8}
                    errorMessage={errors.password?.message}
                  />
                  {!errors.password && watch("password") && (
                    <div className="text-xs text-[#666666] mt-1">
                      <p className="font-medium mb-1">Password must contain:</p>
                      <ul className="space-y-1 pl-4">
                        <li
                          className={`flex items-center gap-1 ${watch("password")?.length >= 8 ? "text-[#77C053]" : ""}`}
                        >
                          {watch("password")?.length >= 8 && <FaCheck className="h-3 w-3" />}
                          At least 8 characters
                        </li>
                        <li
                          className={`flex items-center gap-1 ${/[A-Z]/.test(watch("password") || "") ? "text-[#77C053]" : ""}`}
                        >
                          {/[A-Z]/.test(watch("password") || "") && <FaCheck className="h-3 w-3" />}
                          One uppercase letter
                        </li>
                        <li
                          className={`flex items-center gap-1 ${/[a-z]/.test(watch("password") || "") ? "text-[#77C053]" : ""}`}
                        >
                          {/[a-z]/.test(watch("password") || "") && <FaCheck className="h-3 w-3" />}
                          One lowercase letter
                        </li>
                        <li
                          className={`flex items-center gap-1 ${/\d/.test(watch("password") || "") ? "text-[#77C053]" : ""}`}
                        >
                          {/\d/.test(watch("password") || "") && <FaCheck className="h-3 w-3" />}
                          One number
                        </li>
                        <li
                          className={`flex items-center gap-1 ${/[@$!%*?&]/.test(watch("password") || "") ? "text-[#77C053]" : ""}`}
                        >
                          {/[@$!%*?&]/.test(watch("password") || "") && <FaCheck className="h-3 w-3" />}
                          One special character (@$!%*?&)
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <PasswordInput
                  name="confirmPassword"
                  placeholder="Confirm password"
                  show={showConfirmPassword}
                  toggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  register={register}
                  validationRules={confirmPasswordValidationRules}
                  error={!!errors.confirmPassword}
                  valid={
                    watch("confirmPassword") &&
                    watch("confirmPassword") === watch("password") &&
                    !errors.confirmPassword
                  }
                  errorMessage={errors.confirmPassword?.message}
                />

                <div className="text-right">
                  <Link href="/forgot-password" className="text-[#01589a] hover:underline">
                    Forgot password ?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#01589a] text-white rounded p-3 hover:bg-[#115ea5]"
                >
                  Signup <FaArrowRightToBracket className="h-4 w-4" />
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-[#404040]">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#01589a] hover:underline">
                    log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
