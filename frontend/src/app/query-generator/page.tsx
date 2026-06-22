"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function QueryGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [generatedSql, setGeneratedSql] = useState("");

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const generateQuery = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/query-generator/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
          }),
        }
      );

      const data = await response.json();

      setGeneratedSql(data.generated_sql);
    } catch (error) {
      console.error(error);
    }
  };

  const executeQuery = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/query-generator/execute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: generatedSql,
          }),
        }
      );

      const data = await response.json();

      setResults(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          AI Query Generator
        </h1>

        <div className="bg-slate-900 p-6 rounded-2xl max-w-3xl">

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Show all users"
            className="
              w-full
              h-40
              bg-slate-800
              p-4
              rounded-xl
              text-white
              resize-none
            "
          />

          <div className="flex gap-4 mt-4">

            <button
              onClick={generateQuery}
              className="
                bg-blue-600
                px-6
                py-3
                rounded-xl
                hover:bg-blue-700
                hover:scale-105
                transition-all
                duration-300
                cursor-pointer
              "
            >
              Generate SQL
            </button>

            <button
              onClick={executeQuery}
              className="
                bg-green-600
                px-6
                py-3
                rounded-xl
                hover:bg-green-700
                hover:scale-105
                transition-all
                duration-300
                cursor-pointer
              "
            >
              Execute Query
            </button>

          </div>
        </div>

        {generatedSql && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">
              Generated SQL
            </h2>

            <pre
              className="
                bg-slate-900
                p-6
                rounded-xl
                border
                border-slate-800
                overflow-auto
              "
            >
              {generatedSql}
            </pre>
          </div>
        )}

        {loading && (
          <p className="mt-6 text-blue-400">
            Executing Query...
          </p>
        )}

        {results.length > 0 && (

  <div className="mt-8">

    <h2 className="text-xl font-bold mb-4">
      Query Results
    </h2>

    <div className="overflow-x-auto">

      <table className="w-full border border-slate-700 rounded-xl overflow-hidden">

        <thead>

          <tr className="bg-slate-800">

            {Object.keys(results[0])
              .filter(
                (key) => key !== "password_hash"
              )
              .map((key) => (

                <th
                  key={key}
                  className="p-3 border border-slate-700 capitalize"
                >
                  {key}
                </th>

              ))}

          </tr>

        </thead>

        <tbody>

          {results.map(
            (row, index) => (

              <tr
                key={index}
                className="text-center hover:bg-slate-800 transition-all"
              >

                {Object.entries(row)
                  .filter(
                    ([key]) =>
                      key !== "password_hash"
                  )
                  .map(
                    ([key, value]) => (

                      <td
                        key={key}
                        className="p-3 border border-slate-700"
                      >
                        {String(value)}
                      </td>

                    )
                  )}

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  </div>

)}
      </main>
    </div>
  );
}