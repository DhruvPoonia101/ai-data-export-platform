"use client";

import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";

export default function SchemaExplorerPage() {

  const [metadata, setMetadata] = useState<any>({});

  const [openTable, setOpenTable] = useState<string | null>(null);

  const loadMetadata = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/metadata/"
      );

      const data = await response.json();

      setMetadata(data);

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {

    loadMetadata();

  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Schema Explorer
        </h1>

        <div className="space-y-6">

          {Object.entries(metadata).map(
            ([tableName, columns]: any) => (

              <div
                key={tableName}
                className="
                  bg-slate-900
                  p-6
                  rounded-xl
                  border
                  border-slate-800
                "
              >

               <button
  onClick={() =>
    setOpenTable(
      openTable === tableName
        ? null
        : tableName
    )
  }
  className="
    w-full
    flex
    justify-between
    items-center
    text-xl
    font-bold
    mb-4
    cursor-pointer
  "
>
  <span>{tableName}</span>

  <span>
    {openTable === tableName
      ? "▼"
      : "▶"}
  </span>
</button>
  {
  openTable === tableName && (

    <ul className="space-y-2">

      {Object.entries(columns).map(
        ([column, type]: any) => (

          <li
            key={column}
            className="
              flex
              justify-between
              border-b
              border-slate-800
              pb-2
            "
          >
            <span>{column}</span>

            <span className="text-slate-400">
              {String(type)}
            </span>

          </li>

        )
      )}

    </ul>

  )
}
                

              </div>

            )
          )}

        </div>

      </main>

    </div>
  );
}