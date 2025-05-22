"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { FaUser, FaEnvelope, FaPhone, FaSpinner } from "react-icons/fa"
import { useAuth } from "@/lib/context/auth-context"
import { InputWithIcon, PasswordInput } from "../shared/Input"

export function RegisterForm() {
  const router = useRouter()
  const { register: registerUser } = useAuth()
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
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  })

  const password = watch("password")

  const onSubmit = async (data: any) => {
    setError("")
    setIsLoading(true)

    try {
      // In a real app, this would call your API
      await registerUser(data)
      router.push("/admin/auth/verify-email")
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-[#1d1b20] rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Blue background with logo and text */}
        <div className="w-full md:w-2/5 bg-[#01589a] text-white p-8 flex flex-col">
          <div className="mb-8">
            <div className="text-white font-bold text-3xl flex items-center">
              <span className="text-4xl">C</span>
              <span className="text-xl">Client</span>
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-4">Create Your Account</h1>
            <p className="text-lg">to Manage and Access the Dashboard Effortlessly.</p>
          </div>

          <div className="mt-auto">
            <img src="/skateboarder-illustration.png" alt="Illustration" className="max-w-full h-auto" />
          </div>
        </div>

        {/* Right side - Registration form */}
        <div className="w-full md:w-3/5 p-8">
          <div className="flex justify-end mb-6">
            <div className="text-sm">
              Already have an account?{" "}
              <Link href="/admin/auth/login" className="text-[#01589a] font-medium hover:underline">
                Login
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Register to get started</h2>

          {error && <div className="bg-[#F7E9EA] text-[#A61D24] p-3 rounded-md mb-4 text-sm">{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName">First Name</label>
                <InputWithIcon
                  name="firstName"
                  placeholder="First Name"
                  icon={<FaUser className="h-5 w-5" />}
                  register={register}
                  required={true}
                  error={!!errors.firstName}
                  valid={dirtyFields.firstName && !errors.firstName}
                  errorMessage={errors.firstName?.message as string}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName">Last Name</label>
                <InputWithIcon
                  name="lastName"
                  placeholder="Last Name"
                  icon={<FaUser className="h-5 w-5" />}
                  register={register}
                  required={true}
                  error={!!errors.lastName}
                  valid={dirtyFields.lastName && !errors.lastName}
                  errorMessage={errors.lastName?.message as string}
                />
              </div>
            </div>

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

            <div className="space-y-2">
              <label htmlFor="phone">Phone Number</label>
              <InputWithIcon
                name="phone"
                placeholder="Phone Number"
                icon={<FaPhone className="h-5 w-5" />}
                register={register}
                required={true}
                error={!!errors.phone}
                valid={dirtyFields.phone && !errors.phone}
                errorMessage={errors.phone?.message as string}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <PasswordInput
                name="password"
                placeholder="Password"
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
              <label htmlFor="confirmPassword">Confirm Password</label>
              <PasswordInput
                name="confirmPassword"
                placeholder="Confirm Password"
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

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#01589a] hover:bg-[#01589a]/90 text-white py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            <div className="text-xs text-center text-gray-500 mt-4">
              By confirming your email, you agree to our{" "}
              <Link href="/terms" className="text-[#01589a] hover:underline">
                Terms of Service
              </Link>{" "}
              and that you have read and understood our{" "}
              <Link href="/privacy" className="text-[#01589a] hover:underline">
                Privacy Policy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
