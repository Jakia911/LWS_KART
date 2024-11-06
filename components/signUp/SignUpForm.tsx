"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const signUpData = {
      name:name;
      email:email;
      password:password
    }
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signUpData),
    });

    if (res.ok) {
      router.push('/auth/signin');
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   try {
  //     const formData = new FormData(event.currentTarget);
  //     const name = formData.get("name") as string | null;

  //     const email = formData.get("email") as string | null;
  //     const password = formData.get("password") as string | null;

  //     if (!name || !email || !password) {
  //       throw new Error("All fields are required");
  //     }
  //     console.log(name, email);
  //     const res = await fetch("/api/auth/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name,
  //         email,
  //         password,
  //       }),
  //     });

  //     if (res.status === 201) {
  //       router.push("/login");
  //     } else {
  //       const data = await res.json();
  //       throw new Error(data.message || "Registration failed");
  //     }
  //   } catch (error: any) {
  //     setError(error.message || "An unexpected error occurred");
  //   }
  // }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {error && <p>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default SignUpForm;
