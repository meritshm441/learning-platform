"use client"

import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { BsArrowRight } from "react-icons/bs"
import { AiOutlineMail } from "react-icons/ai"
import { InputWithIcon, PasswordInput } from "@/components/shared/Input"
import { google_logo } from "@/lib/constants/images"
import { loginUser } from "@/lib/repositories/login"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

type FormData = {
  email: string
  password: string
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  // Handle NextAuth session changes
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // Store user data in localStorage when authenticated with Google
      const userData = {
        firstname: session.user.name?.split(" ")[0] || "",
        lastname: session.user.name?.split(" ")[1] || "",
        email: session.user.email || "",
        image: session.user.image || "",
      }

      // Store token and user data
      localStorage.setItem("token", session.user.accessToken || "google-auth-token")
      localStorage.setItem("user", JSON.stringify(userData))

      // Notify other components about auth state change
      window.dispatchEvent(new Event("authStateChanged"))

      // Redirect to portal
      router.push("/")
    }
  }, [status, session, router])

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setLoginError("")

    try {
      const result = await loginUser(data.email.trim(), data.password)

      localStorage.setItem("token", result.token)
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstname: result.user.firstName,
          lastname: result.user.lastName,
          email: result.user.email,
        })
      )

      // Notify other components about auth state change
      window.dispatchEvent(new Event("authStateChanged"))

      router.push("/")
    } catch (err) {
      if (err instanceof Error) {
        setLoginError(err.message)
      } else {
        setLoginError("An unknown error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setLoginError("")
    try {
      const result = await signIn("google", { callbackUrl: "/", redirect: false })
      if (result?.error) {
        setLoginError("Google sign in failed. Please try again.")
      }
    } catch {
      setLoginError("Google sign in failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-8 p-4 md:p-8 lg:p-12">
      <h1 className="text-center text-lg font-medium text-[#404040] md:text-3xl">
        Log in to continue your
        <br />
        learning journey
      </h1>

      <div className="w-full">
        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded border border-[#e6e6e6] p-3 hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Image
            src={google_logo || "/placeholder.svg?height=24&width=24&query=google logo"}
            alt="Google logo"
            width={24}
            height={24}
          />
          Log in using Google
        </button>

        <div className="my-4 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#e6e6e6]" />
          <span className="text-[#666666]">or</span>
          <div className="h-px flex-1 bg-[#e6e6e6]" />
        </div>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <InputWithIcon
            type="email"
            placeholder="Email"
            icon={<AiOutlineMail className="h-5 w-5" />}
            register={register}
            required
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            error={!!errors.email}
            valid={!errors.email}
            errorMessage={errors.email?.message}
          />

          <PasswordInput
            name="password"
            placeholder="Password"
            show={showPassword}
            toggle={() => setShowPassword((prev) => !prev)}
            register={register}
            validationRules={{
              required: "Password is required",
            }}
            error={!!errors.password}
            valid={!errors.password}
            errorMessage={errors.password?.message}
          />

          <div className="text-right">
            <Link href="/forgot-password" className="text-[#01589a] hover:underline">
              Forgot password?
            </Link>
          </div>

          {loginError && (
            <div className="rounded bg-[#F7E9EA] p-3 text-sm text-[#A61D24]">{loginError}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded bg-[#01589a] p-3 text-white hover:bg-[#115ea5] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Logging in...
              </div>
            ) : (
              <>
                Login <BsArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#404040]">
            Need to create an account?{" "}
            <Link href="/signup" className="text-[#01589a] hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
