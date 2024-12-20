"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
const SocialLogin = () => {
  const { data: session, status } = useSession();

  const userName = session?.user?.name;

  const router = useRouter();
  const searchParams = useSearchParams(); // Use useSearchParams to access query params
  const redirectPath = searchParams.get("redirect"); // Get the redirect path from the query

  useEffect(() => {
    if (userName) {
      // Check if login is successful
      // Redirect to the specified path or default to the homepage
      router.push(redirectPath || "/");
    }
  }, [userName]);

  const handleAuth = () => {
    signIn("google", { callbackUrl: "http://localhost:3000/shop" });
  };

  return (
    <div>
      <div className="mt-6 flex justify-center relative">
        <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
          Or login with
        </div>
        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
      </div>
      <div className="mt-4 flex gap-4">
        <a
          href="#"
          className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
        >
          facebook
        </a>
        <button
          onClick={handleAuth}
          className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
        >
          google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
