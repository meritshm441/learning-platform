import type { ApiResponse, AuthError, RegisterLearnerRequest, RegisterAdminRequest } from "../types/auth"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string

export class AuthRepository {
  private baseUrl: string

  constructor() {
    this.baseUrl = `${API_BASE_URL}/auth/`
  }
async registerLearner(data: RegisterLearnerRequest): Promise<ApiResponse<void>> {
    try {
        const response = await fetch(`${this.baseUrl}signup/learner`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            let errorData: AuthError
            try {
                errorData = await response.json()
                const errorMessage = errorData.errors?.[0]?.message ??
                    errorData.message ??
                    `Registration failed with status: ${response.status}`
                return {
                    success: false,
                    error: errorMessage,
                }
            } catch (e) {
                errorData = {
                    success: false,
                    message: `Registration failed with status: ${response.status}`,
                    statusCode: response.status,
                }
                return {
                    success: false,
                    error: errorData.message,
                }
            }
        }

        const result = await response.json()
        if (result.success && result.token) {
            // Store the token in localStorage
            localStorage.setItem('authToken', result.token)
            
            // Return the complete response
            return {
                success: true,
                message: "Learner created successfully",
                token: result.token,
                user: result.user
            }
        }

        return {
            success: true,
            message: "Registration successful but token was not received",
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
        return {
            success: false,
            error: errorMessage,
        }
    }
}


async registerAdmin(data: RegisterAdminRequest): Promise<ApiResponse<void>> {
    try {
        const response = await fetch(`${this.baseUrl}signup/admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            let errorData: AuthError
            try {
                errorData = await response.json()
                const errorMessage = errorData.errors?.[0]?.message ??
                    errorData.message ??
                    `Admin registration failed with status: ${response.status}`
                return {
                    success: false,
                    error: errorMessage,
                }
            } catch (e) {
                errorData = {
                    success: false,
                    message: `Admin registration failed with status: ${response.status}`,
                    statusCode: response.status,
                }
                return {
                    success: false,
                    error: errorData.message,
                }
            }
        }

        const result = await response.json()
        if (result.success && result.token) {
            // Store the token in localStorage
            localStorage.setItem('adminToken', result.token)
            
            return {
                success: true,
                message: "Admin created successfully",
                token: result.token,
                user: result.user
            }
        }

        return {
            success: true,
            message: "Registration successful but token was not received",
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
        return {
            success: false,
            error: errorMessage,
        }
    }
}

}
export const authRepository = new AuthRepository()
