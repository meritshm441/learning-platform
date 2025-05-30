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
    watch,
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
      localStorage.setItem("token", "google-auth-token") // You might want to store a real token if available
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
        }),
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
    await signIn("google", { callbackUrl: "/" })
  }

  return (
    <div className="flex flex-col items-center w-full p-4 md:p-8 lg:p-12 max-w-lg gap-8 ">
      <h1 className="md:text-3xl text-lg font-medium text-[#404040] text-center">
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
          className="w-full flex items-center justify-center gap-2 border border-[#e6e6e6] rounded p-3 mb-4 hover:bg-[#f5f5f5] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Image
            src={google_logo || "/placeholder.svg?height=24&width=24&query=google logo"}
            alt="Google logo"
            width={24}
            height={24}
          />
          Log in using Google
        </button>

        <div className="flex items-center gap-4 my-4">
          <div className="h-px bg-[#e6e6e6] flex-1" />
          <span className="text-[#666666]">or</span>
          <div className="h-px bg-[#e6e6e6] flex-1" />
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
            valid={!errors.email && !!watch("email")}
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
            valid={!errors.password && !!watch("password")}
            errorMessage={errors.password?.message}
          />

          <div className="text-right">
            <Link href="/forgot-password" className="text-[#01589a] hover:underline">
              Forgot password?
            </Link>
          </div>

          {loginError && <div className="p-3 bg-[#F7E9EA] text-[#A61D24] rounded text-sm">{loginError}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#01589a] text-white rounded p-3 hover:bg-[#115ea5] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
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

        <div className="text-center mt-6">
          <p className="text-[#404040]">
            Need to create an account?{" "}
            <Link href="/admin/register" className="text-[#01589a] hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
