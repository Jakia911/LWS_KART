"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState<string>("");
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email")?.toString();
      const password = formData.get("password")?.toString();
      // Assuming login function is properly typed
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(response);
      if (response.error) {
        setError(response.error as string);
      } else {
        router.push("/shop");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    }
  }

  // new login data
  const loginUser = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      // Handle successful login (redirect, etc.)
    } else {
      // Handle error
      console.error(data.error);
    }
  };
  return (
    <>
      {/* {error && <div className="text-xl text-red-500 text-center">{error}</div>} */}
      <form action="#" method="post" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <div>
            <label className="text-gray-600 mb-2 block">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="youremail.@domain.com"
            />
          </div>
          <div>
            <label className="text-gray-600 mb-2 block">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="*******"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="text-primary focus:ring-0 rounded-sm cursor-pointer"
            />
            <label className="text-gray-600 ml-3 cursor-pointer">
              Remember me
            </label>
          </div>
          <a href="#" className="text-primary">
            Forgot password
          </a>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
