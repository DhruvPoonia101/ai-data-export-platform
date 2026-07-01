"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function QueryGeneratorPage() {
  const [prompt, setPrompt] = useState("");
 const [generatedSql, setGeneratedSql] = useState("");
const [columns, setColumns] = useState<string[]>([]);
const [rows, setRows] = useState<any[][]>([]);
const [totalRows, setTotalRows] = useState(0);

const [page, setPage] = useState(1);
const [pageSize] = useState(3);
const [totalPages, setTotalPages] = useState(1);

const [loading, setLoading] = useState(false);

  const generateQuery = async () => {

  try {

    setLoading(true);

    const response = await fetch(
      "http://127.0.0.1:8000/ai/generate-sql",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question: prompt,
          page: page,
          page_size: pageSize,
        }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      alert(data.error);
      return;
    }

    setGeneratedSql(data.generated_sql);

    setColumns(data.columns);

    setRows(data.rows);

    setTotalRows(data.total_rows);

    setTotalPages(data.total_pages);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }
};

  useEffect(() => {

  if (!generatedSql) return;

  generateQuery();

}, [page]);

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

     {rows.length > 0 && (

  <div className="mt-8">

    <h2 className="text-xl font-bold mb-4">
      Query Results ({totalRows} rows)
    </h2>

    <div className="overflow-x-auto">

      <table className="w-full border border-slate-700 rounded-xl">

        <thead>

          <tr className="bg-slate-800">

            {columns
  .filter((column) => column !== "password_hash")
  .map((column) => (

    <th
      key={column}
      className="p-3 border border-slate-700 capitalize"
    >
      {column}
    </th>

))}

          </tr>

        </thead>

        <tbody>

          {rows.map((row, index) => (

            <tr
              key={index}
              className="text-center hover:bg-slate-800"
            >

              {row
  .filter((_: any, i: number) => columns[i] !== "password_hash")
  .map((value: any, i: number) => (

    <td
      key={i}
      className="p-3 border border-slate-700"
    >
      {String(value)}
    </td>

))}

            </tr>

          ))}

        </tbody>

      </table>

      <div className="flex justify-between items-center mt-6">

  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="
      bg-slate-700
      px-5
      py-2
      rounded-lg
      disabled:opacity-50
      disabled:cursor-not-allowed
    "
  >
    Previous
  </button>

  <span>
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="
      bg-blue-600
      px-5
      py-2
      rounded-lg
      disabled:opacity-50
      disabled:cursor-not-allowed
    "
  >
    Next
  </button>

</div>

    </div>

  </div>

  

)}      </main>
    </div>
  );
}