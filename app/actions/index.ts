// "use server"

// import { signIn } from "@/auth";

// // Define the form data type
// interface LoginFormData {
//   email: string;
//   password: string;
// }

// export async function login(formData: FormData): Promise<any> {
//   try {
//     const email = formData.get("email") as string | null;
//     const password = formData.get("password") as string | null;

//     if (!email || !password) {
//       throw new Error("Email and password are required.");
//     }

//     const response = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });

//     return response;
//   } catch (error: any) {
//     throw new Error(error.message || "An error occurred during login.");
//   }
// }
