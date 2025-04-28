const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error: any) {
    console.error('Error during login:', error);
    throw new Error(error.message || 'Something went wrong');
  }
};
