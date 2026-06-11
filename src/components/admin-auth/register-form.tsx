"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
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
    getValues,
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

  const onSubmit = async (data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
    confirmPassword: string
  }) => {
    setError("")
    setIsLoading(true)

    try {
      // In a real app, this would call your API
      await registerUser(data)
      router.push("/admin/verify-email")
    } catch {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-md dark:bg-[#1d1b20]">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Blue background with logo and text */}
        <div className="flex w-full flex-col bg-[#01589a] p-8 text-white md:w-2/5">
          <div className="mb-8">
            <div className="flex items-center text-3xl font-bold text-white">
              <span className="text-4xl">C</span>
              <span className="text-xl">Client</span>
            </div>
          </div>

          <div className="flex flex-grow flex-col justify-center">
            <h1 className="mb-4 text-2xl font-bold">Create Your Account</h1>
            <p className="text-lg">to Manage and Access the Dashboard Effortlessly.</p>
          </div>

          <div className="mt-auto">
            <Image
              src="/skateboarder-illustration.png"
              alt="Illustration"
              width={400}
              height={300}
              className="h-auto max-w-full"
            />
          </div>
        </div>

        {/* Right side - Registration form */}
        <div className="w-full p-8 md:w-3/5">
          <div className="mb-6 flex justify-end">
            <div className="text-sm">
              Already have an account?{" "}
              <Link href="/admin/login" className="font-medium text-[#01589a] hover:underline">
                Login
              </Link>
            </div>
          </div>

          <h2 className="mb-6 text-2xl font-bold">Register to get started</h2>

          {error && (
            <div className="mb-4 rounded-md bg-[#F7E9EA] p-3 text-sm text-[#A61D24]">{error}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                  validate: (value: string) =>
                    value === getValues("password") || "Passwords do not match",
                }}
                error={!!errors.confirmPassword}
                valid={dirtyFields.confirmPassword && !errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message as string}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#01589a] py-3 text-white hover:bg-[#01589a]/90"
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

            <div className="mt-4 text-center text-xs text-gray-500">
              By confirming your email, you agree to our{" "}
              <Link href="/terms-of-service" className="text-[#01589a] hover:underline">
                Terms of Service
              </Link>{" "}
              and that you have read and understood our{" "}
              <Link href="/privacy-policy" className="text-[#01589a] hover:underline">
                Privacy Policy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
