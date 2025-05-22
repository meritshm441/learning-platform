"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { FaEnvelope, FaSpinner } from "react-icons/fa"
import { useAuth } from "@/lib/context/auth-context"
import { InputWithIcon, PasswordInput } from "../shared/Input"

export function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: any) => {
    setError("")
    setIsLoading(true)

    try {
      // In a real app, this would call your API
      await login(data.email, data.password)
      router.push("/admin/dashboard")
    } catch (err) {
      setError("Invalid email or password. Please try again.")
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
            <h1 className="text-2xl font-bold mb-4">Welcome Back</h1>
            <p className="text-lg">Sign in to access your admin dashboard.</p>
          </div>

          <div className="mt-auto">
            <img src="/skateboarder-illustration.png" alt="Illustration" className="max-w-full h-auto" />
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full md:w-3/5 p-8">
          <div className="flex justify-end mb-6">
            <div className="text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/admin/auth/register" className="text-[#01589a] font-medium hover:underline">
                Register
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Sign in to your account</h2>

          {error && <div className="bg-[#F7E9EA] text-[#A61D24] p-3 rounded-md mb-4 text-sm">{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <div className="flex justify-between">
                <label htmlFor="password">Password</label>
                <Link href="/admin/auth/forgot-password" className="text-sm text-[#01589a] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <PasswordInput
                name="password"
                placeholder="Password"
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
                register={register}
                validationRules={{
                  required: "Password is required",
                }}
                error={!!errors.password}
                valid={dirtyFields.password && !errors.password}
                errorMessage={errors.password?.message as string}
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
                    <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
