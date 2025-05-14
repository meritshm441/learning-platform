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
        "https://tmp-se-projectapi.azurewebsites.net/api/auth/register",
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
  