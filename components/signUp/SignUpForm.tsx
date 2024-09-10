"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string | null;

      const email = formData.get("email") as string | null;
      const password = formData.get("password") as string | null;

      if (!name || !email || !password) {
        throw new Error("All fields are required");
      }
      console.log(name, email);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.status === 201) {
        router.push("/login");
      } else {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
    }
  }

  return (
    <form action="#" method="post" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <div>
          <label className="text-gray-600 mb-2 block">Full Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="fulan fulana"
          />
        </div>
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
        <div>
          <label className="text-gray-600 mb-2 block">Confirm password</label>
          <input
            type="password"
            name="confirm"
            id="confirm"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="*******"
          />
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="aggrement"
            id="aggrement"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
          />
          <label className="text-gray-600 ml-3 cursor-pointer">
            I have read and agree to the
            <a href="#" className="text-primary">
              terms & conditions
            </a>
          </label>
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
        >
          create account
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
