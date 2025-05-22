"use client";
import { InputWithIcon } from "@/components/shared/Input";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { BsArrowRight } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import { RiMailLine } from "react-icons/ri";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { resendVerificationToken, verifyEmail } from "@/lib/repositories/authRepository";

export default function OTPVerification() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  const [showResend, setShowResend] = useState(false); 
  useEffect(() => {
    // Set a timer to show the resend button after 3 seconds
    const timer = setTimeout(() => {
      setShowResend(true);
    }, 3000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const onSubmit = async (data: { otp: string }) => {
    console.log("Form submitted:", data);
    try {
      const response = await verifyEmail(data.otp);
      console.log("Email verification successful:", response);
      // Handle successful verification
    } catch (error: any) {
      console.error("Email verification failed:", error);
      // Handle verification failure
    }
  };

  const handleResendToken = async () => {
    try {
      const response = await resendVerificationToken();
      console.log("Resend token successful:", response);
      // Optionally, display a success message
    } catch (error: any) {
      console.error("Failed to resend token:", error);
      // Optionally, display an error message
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-center gap-8">
        
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-[#404040] mb-4">OTP Verification</h1>
          <p className="text-[#666666] mb-6">Verify your accounts using the six digit sent to test@gmail.com</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <InputWithIcon
                name="otp"
                placeholder="Enter 6-digit code"
                icon={<MdPassword className="w-5 h-5" />}
                register={register}
                required={true}
                error={!!errors.otp}
                valid={isValid}
                errorMessage={errors.otp?.message as string}
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-[#01589a] text-white py-3 px-4 rounded hover:bg-[#115ea5]"
              disabled={!isValid}
            >
              Verify OTP <BsArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>

          {showResend && (
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-[#01589a] hover:underline"
                onClick={handleResendToken}
              >
                Resend OTP
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}