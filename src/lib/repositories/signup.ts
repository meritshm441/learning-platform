import { ApiResponse, AuthError, RegisterLearnerRequest } from "../types/auth"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export class AuthRepository {
  private baseUrl: string

  constructor() {
    this.baseUrl = `${API_BASE_URL}/auth/`
  }

  /**
   * Register a new learner
   * @param data The learner registration data
   * @returns A promise that resolves to an ApiResponse
   */
  async registerLearner(data: RegisterLearnerRequest): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${this.baseUrl}signup/learner`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      // Check if the response is successful
      if (!response.ok) {
        let errorData: AuthError

        try {
          // Try to parse error response
          errorData = await response.json()
        } catch (e) {
          // If parsing fails, create a generic error
          errorData = {
            message: `Registration failed with status: ${response.status}`,
            statusCode: response.status,
          }
        }

        return {
          success: false,
          error: errorData.message,
        }
      }

      // Return success response
      return {
        success: true,
      }
    } catch (error) {
      // Handle network errors or other exceptions
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"

      return {
        success: false,
        error: errorMessage,
      }
    }
  }
}

// Create a singleton instance
export const authRepository = new AuthRepository()
