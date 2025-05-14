"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { BsArrowRight } from "react-icons/bs"
import { AiOutlineMail } from "react-icons/ai"
import { InputWithIcon, PasswordInput } from "@/components/shared/Input"
import { login_register, google_logo } from "@/lib/constants/images"
import { loginUser } from "@/lib/repositories/login"
import Header from "@/components/shared/Header/header"

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
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [Loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState("")

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setLoginError("");
  
    try {
      const result = await loginUser(data.email.trim(), data.password);
  
      localStorage.setItem("token", result.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstname: result.user.firstName,
          lastname: result.user.lastName,
          email: result.user.email,
        })
      );
      
       
      window.location.href = "/";
    } catch (err) {
      if (err instanceof Error) {
        setLoginError(err.message);
      } else {
        setLoginError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Illustration */}
          <div className="order-2 md:order-1">
            <Image
              src={login_register}
              alt="Learning illustration"
              width={500}
              height={400}
              className="max-w-full h-auto"
            />
          </div>

          {/* Right Form */}
          <div className="order-1 md:order-2 flex flex-col items-center">
            <h1 className="text-3xl font-medium text-[#404040] text-center mb-8">
              Log in to continue your
              <br />
              learning journey
            </h1>

            <div className="w-full max-w-md">
              {/* Google Login */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-[#e6e6e6] rounded p-3 mb-4 hover:bg-[#f5f5f5]"
              >
                <Image src={google_logo} alt="Google logo" width={24} height={24} />
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
                  disabled={Loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#01589a] text-white rounded p-3 hover:bg-[#115ea5] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {Loading ? (
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
                  <Link href="/signup" className="text-[#01589a] hover:underline">
                    Signup
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
