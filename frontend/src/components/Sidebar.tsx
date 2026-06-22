"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-slate-900 min-h-screen p-6 flex flex-col">

      <h1 className="text-xl font-bold mb-8 text-white">
        AI Data Export
      </h1>

      <div className="space-y-5 text-slate-300">

        <Link
          href="/dashboard"
          className="block hover:text-white hover:translate-x-2 transition-all duration-300"
        >
          📊 Dashboard
        </Link>

        <Link
          href="/data-sources"
          className="block hover:text-white hover:translate-x-2 transition-all duration-300"
        >
          🔗 Data Sources
        </Link>

        <Link
  href="/query-generator"
  className="block hover:text-white hover:translate-x-2 transition-all duration-300"
>
  🤖 Query Generator
</Link>

        <Link
          href="/exports"
          className="block hover:text-white hover:translate-x-2 transition-all duration-300"
        >
          📦 Exports
        </Link>

        <Link
          href="/settings"
          className="block hover:text-white hover:translate-x-2 transition-all duration-300"
        >
          ⚙️ Settings
        </Link>

      </div>

      <div className="mt-auto pt-8">

        <button
          onClick={logout}
          className="
            w-full
            bg-red-600
            hover:bg-red-700
            hover:scale-105
            active:scale-95
            transition-all
            duration-300
            cursor-pointer
            py-3
            rounded-xl
            font-medium
          "
        >
          Logout
        </button>

      </div>

    </aside>
  );
}