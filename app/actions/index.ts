import { signIn } from "next-auth/react";

// Define the form data type
interface LoginFormData {
  email: string;
  password: string;
}

export async function login(formData: FormData): Promise<any> {
  try {
    // Extract email and password from formData with proper null checking
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    // Call signIn and wait for the response
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!response || response.error) {
      throw new Error(response?.error || "Login failed. Please try again.");
    }

    return response;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred during login.");
  }
}
