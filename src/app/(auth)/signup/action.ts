"use server"

import { authRepository } from "@/lib/repositories/signup"
import { RegisterLearnerRequest } from "@/lib/types/auth"
import { redirect } from "next/navigation"

/**
 * Server action to handle learner registration
 */
export async function registerLearnerAction(formData: FormData) {
  // Extract and validate form data
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Basic validation
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return {
      success: false,
      error: "All fields are required",
    }
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      error: "Passwords do not match",
    }
  }

  // Create request data
  const requestData: RegisterLearnerRequest = {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }

  // Call the repository
  const result = await authRepository.registerLearner(requestData)

  // If successful, redirect to login page
  if (result.success) {
    redirect("/login?registered=true")
  }

  // Return the result
  return result
}
