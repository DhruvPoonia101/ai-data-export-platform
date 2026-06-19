"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function LoginPage() {

    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const router = useRouter();

    const loginUser = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const data = await response.json();

    if (response.ok) {

      localStorage.setItem(
        "token",
        data.access_token
      );

      alert("Login Successful");

      router.push("/dashboard");

    } else {

      alert(data.detail);

    }

  } catch (error) {

    console.error(error);
    alert("Login Failed");

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
            Export and manage data intelligently
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">

          <h2 className="text-2xl font-semibold text-white mb-6">
            Welcome Back
          </h2>

          <div className="space-y-4">

           <input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full p-3 rounded-xl bg-slate-800 text-white"
/>

            <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full p-3 rounded-xl bg-slate-800 text-white"
/>

           <button
  onClick={loginUser}
  className="w-full bg-blue-600 text-white py-3 rounded-xl"
>
  Login
</button>

          </div>

          <p className="text-slate-400 text-center mt-6">
            Don't have an account?
            <span className="text-blue-400 ml-1 cursor-pointer">
              Register
            </span>
          </p>

        </div>

      </div>

    </main>
  );
}