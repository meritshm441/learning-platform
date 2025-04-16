"use client";
import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { google_logo, login_register } from "@/lib/constants/images";
import { BiUser } from "react-icons/bi";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Replace with your actual signup API endpoint
      const response = await fetch(
        "https://tmp-se-projectapi.azurewebsites.net/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, email, password }),
        }
      );

      if (response.ok) {
        // Handle successful signup
        alert("Signup successful!");
        window.location.href = "/login";
      } else {
        // Handle error
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <div className="order-2 md:order-1 w-[481px] h-[481px]">
            <Image
              src={login_register}
              alt="Learning illustration"
              width={500}
              height={400}
              className="max-w-full h-auto"
            />
          </div>
          <div className="order-1 md:order-2 flex flex-col items-center">
            <h1 className="text-3xl font-medium text-[#404040] text-center mb-8">
              Sign up to get started
            </h1>

            <div className="w-full max-w-md">
              <button
                title=" button"
                className="w-full flex items-center justify-center gap-2 border border-[#e6e6e6] rounded p-3 mb-4 hover:bg-[#f5f5f5]"
              >
                <Image
                  src={google_logo}
                  alt="Google logo"
                  width={24}
                  height={24}
                />
                Log in using Google
              </button>

              <div className="flex items-center gap-4 my-4">
                <div className="h-px bg-[#e6e6e6] flex-1"></div>
                <span className="text-[#666666]">or</span>
                <div className="h-px bg-[#e6e6e6] flex-1"></div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    className="w-full p-3 bg-[#f5f5f5] rounded border-0 focus:ring-2 focus:ring-[#01589a] pl-10"
                    required
                  />
                  <div className="absolute  left-3 top-1/2 transform -translate-y-1/2 text-[#666666]">
                    <BiUser className="h-5 w-5 " />
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    className="w-full p-3 bg-[#f5f5f5] rounded border-0 focus:ring-2 focus:ring-[#01589a] pl-10"
                    required
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 bg-[#f5f5f5] rounded border-0 focus:ring-2 focus:ring-[#01589a] pl-10"
                    required
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full p-3 bg-[#f5f5f5] rounded border-0 focus:ring-2 focus:ring-[#01589a] pl-10"
                    required
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        width="18"
                        height="11"
                        x="3"
                        y="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666666]"
                    onClick={() => setShowPassword(!showPassword)}
                    title="Toggle password visibility"
                  >
                    <BsEye className="h-5 w-5" />
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="w-full p-3 bg-[#f5f5f5] rounded border-0 focus:ring-2 focus:ring-[#01589a] pl-10"
                    required
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        width="18"
                        height="11"
                        x="3"
                        y="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <button
                    title="button"
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666666]"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <BsEye className="h-5 w-5" />
                  </button>
                </div>

                <div className="text-right">
                  <Link
                    href="/forgot-password"
                    className="text-[#01589a] hover:underline"
                  >
                    Forgot password ?
                  </Link>
                </div>

                <button
                  title=" button"
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#01589a] text-white rounded p-3 hover:bg-[#115ea5]"
                >
                  Login <FaArrowRightToBracket className="h-4 w-4" />
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-[#404040]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-[#01589a] hover:underline"
                  >
                    log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
