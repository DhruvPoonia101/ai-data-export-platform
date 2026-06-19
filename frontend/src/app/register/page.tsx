"use client";

export default function RegisterPage() {
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
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-green-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-green-500"
            />

            <button
              className="w-full bg-green-600 hover:bg-green-700 transition-all duration-200 text-white py-3 rounded-xl font-medium"
            >
              Create Account
            </button>

          </div>

          <p className="text-slate-400 text-center mt-6">
            Already have an account?
            <span className="text-green-400 ml-1 cursor-pointer">
              Login
            </span>
          </p>

        </div>

      </div>

    </main>
  );
}
