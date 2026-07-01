"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function HistoryPage() {

  const [history, setHistory] = useState<any[]>([]);

  const loadHistory = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/history/"
    );

    const data = await response.json();

    setHistory(data);

  };

  useEffect(() => {

    loadHistory();

  }, []);

  return (

    <div className="min-h-screen bg-slate-950 text-white flex">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Query History
        </h1>

        <div className="overflow-x-auto">

          <table className="w-full border border-slate-700 rounded-xl">

            <thead>

              <tr className="bg-slate-800">

                <th className="p-3 border border-slate-700">
                  Question
                </th>

                <th className="p-3 border border-slate-700">
                  Generated SQL
                </th>

                <th className="p-3 border border-slate-700">
                  Executed At
                </th>

              </tr>

            </thead>

            <tbody>

              {history.map((item) => (

                <tr
                  key={item.id}
                  className="text-center hover:bg-slate-800"
                >

                  <td className="p-3 border border-slate-700">
                    {item.question}
                  </td>

                  <td className="p-3 border border-slate-700">
                    {item.generated_sql}
                  </td>

                  <td className="p-3 border border-slate-700">
                    {new Date(
                      item.executed_at
                    ).toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>

  );

}