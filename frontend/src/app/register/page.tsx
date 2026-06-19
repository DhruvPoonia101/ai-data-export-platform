"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const registerUser = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Registration Successful");

        router.push("/login");

      } else {

        alert(data.detail);

      }

    } catch (error) {

      console.error(error);
      alert("Registration Failed");

    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            AI Data Export Platform
          </h1>

          <p className="text-slate-400 mt-2">
            Create your account
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">

          <h2 className="text-2xl font-semibold text-white mb-6">
            Register
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />

            <button
              onClick={registerUser}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-medium
cursor-pointer
hover:bg-green-700
hover:scale-105
transition-all duration-300"
            >
              Create Account
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}