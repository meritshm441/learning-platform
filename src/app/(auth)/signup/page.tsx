"use client"
import { useForm, useWatch } from "react-hook-form"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaArrowRightToBracket, FaRegUser } from "react-icons/fa6"
import { google_logo } from "@/lib/constants/images"
import { InputWithIcon, PasswordInput } from "@/components/shared/Input"
import { AiOutlineMail } from "react-icons/ai"
import { FaCheck } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { authRepository } from "@/lib/repositories/signup"
import { signIn, useSession } from "next-auth/react"

type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export default function SignupPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()
  const passwordValue = useWatch({ control, name: "password", defaultValue: "" })
  const confirmPasswordValue = useWatch({ control, name: "confirmPassword", defaultValue: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const userData = {
        firstname: session.user.name?.split(" ")[0] || "",
        lastname: session.user.name?.split(" ")[1] || "",
        email: session.user.email || "",
        image: session.user.image || "",
      }
      localStorage.setItem("token", session.user.accessToken || "google-auth-token")
      localStorage.setItem("user", JSON.stringify(userData))
      window.dispatchEvent(new Event("authStateChanged"))
      router.push("/")
    }
  }, [status, session, router])

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
      const result = await authRepository.registerLearner({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })

      if (result.success) {
        router.push("/verification")
      } else {
        setSubmitError(result.error || "Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("Signup error:", error)
      setSubmitError("An unexpected error occurred. Please try again.")
    }
  }

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true)
    setSubmitError(null)
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-8 p-4 md:p-8 lg:p-12">
      <h1 className="text-center text-lg font-medium text-[#404040] lg:text-3xl">
        Sign up to get started
      </h1>

      <div className="w-full">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded border border-[#e6e6e6] p-3 hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isGoogleLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#666666] border-t-transparent"></div>
          ) : (
            <Image
              src={google_logo || "/placeholder.svg"}
              alt="Google logo"
              width={24}
              height={24}
            />
          )}
          {isGoogleLoading ? "Signing in..." : "Sign up using Google"}
        </button>

        <div className="my-4 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#e6e6e6]"></div>
          <span className="text-[#666666]">or</span>
          <div className="h-px flex-1 bg-[#e6e6e6]"></div>
        </div>

        {submitError && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">{submitError}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <InputWithIcon
            name="firstName"
            placeholder="First name"
            icon={<FaRegUser className="h-5 w-5" />}
            register={register}
            required
            error={!!errors.firstName}
            valid={!errors.firstName}
            errorMessage={errors.firstName?.message}
          />
          <InputWithIcon
            name="lastName"
            placeholder="Last name"
            icon={<FaRegUser className="h-5 w-5" />}
            register={register}
            required
            error={!!errors.lastName}
            valid={!errors.lastName}
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
            valid={!errors.email}
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
            {isSubmitting ? "Signing up..." : "Signup"}{" "}
            {!isSubmitting && <FaArrowRightToBracket className="h-4 w-4" />}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#404040]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#01589a] hover:underline">
              log in
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            By confirming your email, you agree to our{" "}
            <Link href="/terms-of-service" className="font-medium text-black underline">
              Terms of Service
            </Link>{" "}
            and that you have read and understood our{" "}
            <Link href="/privacy-policy" className="font-medium text-black underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
