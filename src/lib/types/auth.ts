export interface RegisterLearnerRequest {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
  }
  
  export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
  }
  
  export interface AuthError {
    message: string
    statusCode: number
  }
  