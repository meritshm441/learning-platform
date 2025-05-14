export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch('https://tmp-se-projectapi.azurewebsites.net/api/auth/login', {
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
    throw new Error(error.message || 'Something went wrong');
  }
};
