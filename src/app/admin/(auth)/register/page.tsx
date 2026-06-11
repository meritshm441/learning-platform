"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaArrowRightToBracket, FaRegUser } from "react-icons/fa6"
import { InputWithIcon, PasswordInput } from "@/components/shared/Input"
import { AiOutlineMail } from "react-icons/ai"
import { useForm, useWatch } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation" // Import from next/navigation
import { FaCheck } from "react-icons/fa"
import { authRepository } from "@/lib/repositories/signup"
import { BiPhone } from "react-icons/bi"

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone: string
}

export default function RegistrationPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()
  const passwordValue = useWatch({ control, name: "password", defaultValue: "" })
  const confirmPasswordValue = useWatch({ control, name: "confirmPassword", defaultValue: "" })
  const firstNameValue = useWatch({ control, name: "firstName", defaultValue: "" })
  const lastNameValue = useWatch({ control, name: "lastName", defaultValue: "" })
  const emailValue = useWatch({ control, name: "email", defaultValue: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const router = useRouter() // Initialize router here

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
    validate: (value: string, formValues: FormData) =>
      value === formValues.password || "Passwords do not match",
  }

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitError(null)
      const result = await authRepository.registerAdmin({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        contact: data.phone,
      })
      if (result.success) {
        console.log("Registration successful:", result)
        if (result.token) {
          localStorage.setItem("adminToken", result.token)
        }
        router.push("/admin/verify-email")
      } else {
        setSubmitError(result.error || "Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("Signup error:", error)
      setSubmitError("An unexpected error occurred. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-4">
      <div className="flex justify-end border p-6">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Already have an account?</span>
          <Link href="/admin/login" className="text-blue-600 hover:underline">
            <Button variant="default" className="bg-blue-700 hover:bg-blue-800">
              Login <span className="ml-1">→</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 pb-5">
        <div className="w-full max-w-xl">
          <h1 className="mb-4 text-center text-3xl font-bold">Register to get started</h1>

          {submitError && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
              <p className="text-sm">{submitError}</p>
            </div>
          )}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputWithIcon
                name="firstName"
                placeholder="First name"
                icon={<FaRegUser className="h-5 w-5" />}
                register={register}
                required
                error={!!errors.firstName}
                valid={!errors.firstName && !!firstNameValue}
                errorMessage={errors.firstName?.message}
              />
              <InputWithIcon
                name="lastName"
                placeholder="Last name"
                icon={<FaRegUser className="h-5 w-5" />}
                register={register}
                required
                error={!!errors.lastName}
                valid={!errors.lastName && !!lastNameValue}
                errorMessage={errors.lastName?.message}
              />
            </div>
            <InputWithIcon
              type="email"
              name="email"
              placeholder="Email"
              icon={<AiOutlineMail className="h-5 w-5" />}
              register={register}
              required
              error={!!errors.email}
              valid={!errors.email && !!emailValue}
              errorMessage={errors.email?.message}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <PasswordInput
                  name="password"
                  placeholder="Password"
                  show={showPassword}
                  toggle={() => setShowPassword(!showPassword)}
                  register={register}
                  validationRules={passwordValidationRules}
                  error={!!errors.password}
                  valid={!errors.password && passwordValue?.length >= 8}
                  errorMessage={errors.password?.message}
                />
                {!errors.password && passwordValue && (
                  <div className="mt-1 text-xs text-[#666666]">
                    <p className="mb-1 font-medium">Password must contain:</p>
                    <ul className="space-y-1 pl-4">
                      <li
                        className={`flex items-center gap-1 ${
                          passwordValue?.length >= 8 ? "text-[#77C053]" : ""
                        }`}
                      >
                        {passwordValue?.length >= 8 && <FaCheck className="h-3 w-3" />}
                        At least 8 characters
                      </li>
                      <li
                        className={`flex items-center gap-1 ${
                          /[A-Z]/.test(passwordValue || "") ? "text-[#77C053]" : ""
                        }`}
                      >
                        {/[A-Z]/.test(passwordValue || "") && <FaCheck className="h-3 w-3" />}
                        One uppercase letter
                      </li>
                      <li
                        className={`flex items-center gap-1 ${
                          /[a-z]/.test(passwordValue || "") ? "text-[#77C053]" : ""
                        }`}
                      >
                        {/[a-z]/.test(passwordValue || "") && <FaCheck className="h-3 w-3" />}
                        One lowercase letter
                      </li>
                      <li
                        className={`flex items-center gap-1 ${
                          /\d/.test(passwordValue || "") ? "text-[#77C053]" : ""
                        }`}
                      >
                        {/\d/.test(passwordValue || "") && <FaCheck className="h-3 w-3" />}
                        One number
                      </li>
                      <li
                        className={`flex items-center gap-1 ${
                          /[@$!%*?&]/.test(passwordValue || "") ? "text-[#77C053]" : ""
                        }`}
                      >
                        {/[@$!%*?&]/.test(passwordValue || "") && <FaCheck className="h-3 w-3" />}
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
                  !!confirmPasswordValue &&
                  confirmPasswordValue === passwordValue &&
                  !errors.confirmPassword
                }
                errorMessage={errors.confirmPassword?.message}
              />
            </div>
            <InputWithIcon
              name="phone"
              placeholder="+251912345678"
              icon={<BiPhone className="h-5 w-5" />}
              register={register}
              required
              error={!!errors.phone}
              valid={!errors.phone}
              errorMessage={errors.phone?.message}
            />
            <div className="text-right">
              <Link href="/forgot-password" className="text-[#01589a] hover:underline">
                Forgot password ?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded bg-[#01589a] p-3 text-white hover:bg-[#115ea5] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "registering ..." : "Register"}{" "}
              {!isSubmitting && <FaArrowRightToBracket className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
