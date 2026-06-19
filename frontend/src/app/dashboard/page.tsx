"use client";

import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const router = useRouter();
    const [userName, setUserName] = useState("User");

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        fetch(
            "http://127.0.0.1:8000/auth/me",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => res.json())
            .then((data) => {
                setUserName(data.name);
            })
            .catch((err) => {
                console.error(err);
            });

    }, [router]);

    

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-8">

                    <h1 className="text-3xl font-bold">
                        Welcome {userName} 👋
                    </h1>

                    <p className="text-slate-400 mt-2">
                        AI Data Export Platform Dashboard
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mt-8">

                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-2xl shadow-xl
hover:scale-105
hover:shadow-2xl
transition-all duration-300
cursor-pointer">
                            <h3 className="text-lg">Total Exports</h3>
                            <p className="text-4xl font-bold mt-3">0</p>
                        </div>

                        <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 rounded-2xl shadow-xl">
                            <h3 className="text-lg">Connected Sources</h3>
                            <p className="text-4xl font-bold mt-3">0</p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 rounded-2xl shadow-xl">
                            <h3 className="text-lg">AI Queries</h3>
                            <p className="text-4xl font-bold mt-3">0</p>
                        </div>

                    </div>

                    <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">

                        <h2 className="text-xl font-semibold mb-4">
                            User Information
                        </h2>

                        <div className="space-y-2 text-slate-300">

                            <p>
                                <span className="text-white font-medium">
                                    Name:
                                </span>{" "}
                                {userName}
                            </p>

                            <p>
                                <span className="text-white font-medium">
                                    Status:
                                </span>{" "}
                                Active
                            </p>

                            <p>
                                <span className="text-white font-medium">
                                    Role:
                                </span>{" "}
                                User
                            </p>

                        </div>

                    </div>

                    <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">

                        <h2 className="text-xl font-semibold mb-4">
                            Recent Activity
                        </h2>

                        <div className="space-y-3">

                            <div className="bg-slate-800 p-3 rounded-lg">
                                User logged in
                            </div>

                            <div className="bg-slate-800 p-3 rounded-lg">
                                Dashboard accessed
                            </div>

                            <div className="bg-slate-800 p-3 rounded-lg">
                                No exports available yet
                            </div>

                        </div>

                    </div>

                

                </main>

            </div>

        </div>
    );
}