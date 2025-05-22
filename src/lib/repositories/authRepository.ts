const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
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
        throw new Error("Signup failed");
      }
  
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  export const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
        method: "POST",
        
        body: JSON.stringify({ token }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.errors?.[0]?.message || "Email verification failed");
      }
  
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
export const resendVerificationToken = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/resend-token`,
      {
        method: "POST",
        
      }
    );

    if (!response.ok) {
      throw new Error("Failed to resend verification token");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

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
      // Handle HTTP errors (e.g., 400, 500)
      let errorMessage = "Failed to initiate password reset.";
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message; // Use the message from the API response if available
        }
      } catch (jsonError) {
        // If parsing JSON fails, keep the default message
      }
      throw new Error(errorMessage);
    }

    // Parse the JSON response
    const data = await response.json();
    return data; // Return the data from the successful response
  } catch (error: any) {
    // Catch network errors or errors thrown above
    throw error;
  }
};

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
      let errorMessage = "Failed to reset password.";
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (jsonError) {
        // Keep default message
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw error;
  }
};
