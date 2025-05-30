export interface RegisterLearnerRequest {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
  }
  export interface RegisterAdminRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  contact: string
}

  export interface ApiResponse<T> {
    success: boolean
    message?: string
    token?: string
    user?: {
        firstName: string
        lastName: string
        email: string
        role: string
        isVerified: boolean
        verificationToken?: string
        verificationTokenExpiresAt?: string
        _id: string
        lastLogin?: string
        createdAt: string
        updatedAt: string
        __v?: number
    }
    data?: T
    error?: string
}
  export interface AuthError {
    success: boolean;
    errors?: Array<{
        message: string;
    }>;
    message?: string;  // Optional for generic error cases
    statusCode?: number;  // Optional for generic error cases
}