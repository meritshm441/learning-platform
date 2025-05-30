"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightToBracket, FaRegUser } from "react-icons/fa6";
import { google_logo } from "@/lib/constants/images";
import { InputWithIcon, PasswordInput } from "@/components/shared/Input";
import { AiOutlineMail } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { authRepository } from "@/lib/repositories/signup";
import { signIn } from "next-auth/react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Password validation rules
  const passwordValidationRules = {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message:
        "Password must include uppercase, lowercase, number and special character",
    },
  };

  // Confirm password validation rules
  const confirmPasswordValidationRules = {
    required: "Please confirm your password",
    validate: (value: string) =>
      value === watch("password") || "Passwords do not match",
  };

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitError(null);
      const result = await authRepository.registerLearner({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (result.success) {

        router.push("/verification");
      } else {
        setSubmitError(
          result.error || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Signup error:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      setSubmitError(null);
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google sign in error:", error);
      setSubmitError("Failed to sign in with Google. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4 md:p-8 lg:p-12 max-w-lg gap-8">
      <h1 className="lg:text-3xl text-lg font-medium text-[#404040] text-center">
        Sign up to get started
      </h1>

      <div className="w-full">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
          className="w-full flex items-center justify-center gap-2 border border-[#e6e6e6] rounded p-3 mb-4 hover:bg-[#f5f5f5] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGoogleLoading ? (
            <div className="h-5 w-5 border-2 border-[#666666] border-t-transparent rounded-full animate-spin"></div>
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

        <div className="flex items-center gap-4 my-4">
          <div className="h-px bg-[#e6e6e6] flex-1"></div>
          <span className="text-[#666666]">or</span>
          <div className="h-px bg-[#e6e6e6] flex-1"></div>
        </div>

        {submitError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
            {submitError}
          </div>
        )}

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
                    className={`flex items-center gap-1 ${
                      watch("password")?.length >= 8 ? "text-[#77C053]" : ""
                    }`}
                  >
                    {watch("password")?.length >= 8 && (
                      <FaCheck className="h-3 w-3" />
                    )}
                    At least 8 characters
                  </li>
                  <li
                    className={`flex items-center gap-1 ${
                      /[A-Z]/.test(watch("password") || "")
                        ? "text-[#77C053]"
                        : ""
                    }`}
                  >
                    {/[A-Z]/.test(watch("password") || "") && (
                      <FaCheck className="h-3 w-3" />
                    )}
                    One uppercase letter
                  </li>
                  <li
                    className={`flex items-center gap-1 ${
                      /[a-z]/.test(watch("password") || "")
                        ? "text-[#77C053]"
                        : ""
                    }`}
                  >
                    {/[a-z]/.test(watch("password") || "") && (
                      <FaCheck className="h-3 w-3" />
                    )}
                    One lowercase letter
                  </li>
                  <li
                    className={`flex items-center gap-1 ${
                      /\d/.test(watch("password") || "") ? "text-[#77C053]" : ""
                    }`}
                  >
                    {/\d/.test(watch("password") || "") && (
                      <FaCheck className="h-3 w-3" />
                    )}
                    One number
                  </li>
                  <li
                    className={`flex items-center gap-1 ${
                      /[@$!%*?&]/.test(watch("password") || "")
                        ? "text-[#77C053]"
                        : ""
                    }`}
                  >
                    {/[@$!%*?&]/.test(watch("password") || "") && (
                      <FaCheck className="h-3 w-3" />
                    )}
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
            <Link
              href="/forgot-password"
              className="text-[#01589a] hover:underline"
            >
              Forgot password ?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-[#01589a] text-white rounded p-3 hover:bg-[#115ea5] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing up..." : "Signup"}{" "}
            {!isSubmitting && <FaArrowRightToBracket className="h-4 w-4" />}
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

        <div className="text-sm text-center text-gray-600 mt-4">
          <p>
            By confirming your email, you agree to our{" "}
            <Link
              href="/terms-of-service"
              className="text-black font-medium underline"
            >
              Terms of Service
            </Link>{" "}
            and that you have read and understood our{" "}
            <Link
              href="/privacy-policy"
              className="text-black font-medium underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
