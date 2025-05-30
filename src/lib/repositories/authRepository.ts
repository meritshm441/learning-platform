const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
// Add this interface for consistent error handling
interface AuthError {
  message: string;
  errors?: Array<{
    message: string;
  }>;
  statusCode?: number;
}

// Modified signupUser function with error display
export const signupUser = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      }
    );

    if (!response.ok) {
      const errorData: AuthError = await response.json();
      throw new Error(errorData.message || "Signup failed");
    }

    return await response.json();
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

// Modified verifyEmail function with error display
export const verifyEmail = async (data: string, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const errorData: AuthError = await response.json();
      throw new Error(errorData.errors?.[0]?.message || "Email verification failed");
    }

    return await response.json();
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

// Modified resendVerificationToken function with error display
export const resendVerificationToken = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/resend-token`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      const errorData: AuthError = await response.json();
      throw new Error(errorData.message || "Failed to resend verification token");
    }

    return await response.json();
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

// Modified forgotPassword function with error display
export const forgotPassword = async (email: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      const errorData: AuthError = await response.json();
      throw new Error(errorData.message || "Failed to initiate password reset");
    }

    return await response.json();
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

// Modified resetPassword function with error display
export const resetPassword = async (
  id: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/reset-password/${id}`,
      {
        method: "POST",
        body: JSON.stringify({ password, confirmPassword }),
      }
    );

    if (!response.ok) {
      const errorData: AuthError = await response.json();
      throw new Error(errorData.message || "Failed to reset password");
    }

    return await response.json();
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};