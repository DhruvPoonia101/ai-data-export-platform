"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">
        Dashboard Loaded Successfully
      </h1>

      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl"
      >
        Logout
      </button>
    </div>
  );
}