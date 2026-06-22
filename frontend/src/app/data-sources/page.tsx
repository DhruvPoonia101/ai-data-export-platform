"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";

export default function DataSourcesPage() {
  const [name, setName] = useState("");
  const [sourceType, setSourceType] = useState("");
  const [host, setHost] = useState("");
  const [databaseName, setDatabaseName] = useState("");
  const [username, setUsername] = useState("");
  const [port, setPort] = useState("");
  const [password, setPassword] = useState("");
  const [sources, setSources] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadSources = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/data-sources/"
      );

      const data = await response.json();

      setSources(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSources();
  }, []);

  const addSource = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/data-sources/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            source_type: sourceType,
            host,
            port: Number(port),
            database_name: databaseName,
            username,   
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Data Source Added");

        setName("");
        setSourceType("");
        setHost("");
        setPort("");
        setDatabaseName("");
        setUsername("");
        setPassword("");

        loadSources();

        console.log(data);
      } else {
        alert("Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteSource = async (id: number) => {
  try {

    const response = await fetch(
      `http://127.0.0.1:8000/data-sources/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (response.ok) {

      alert(data.message);

      loadSources();

    }

  } catch (error) {

    console.error(error);

  }
};

const testSource = async (id: number) => {
  try {

    const response = await fetch(
      `http://127.0.0.1:8000/data-sources/${id}/test`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    if (data.success) {

      alert("✅ Connection Successful");

    } else {

      alert("❌ Connection Failed");

    }

  } catch (error) {

    console.error(error);

    alert("❌ Connection Failed");

  }
};

const updateSource = async () => {

  try {

    const response = await fetch(
      `http://127.0.0.1:8000/data-sources/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          source_type: sourceType,
          host,
          port: Number(port),
          database_name: databaseName,
          username,
          password,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {

      alert("Data Source Updated");

      setEditingId(null);

      setName("");
      setSourceType("");
      setHost("");
      setPassword("");
      setDatabaseName("");
      setUsername("");
      setPassword("");

      loadSources();

    }

  } catch (error) {

    console.error(error);

  }
};

 return (
  <div className="min-h-screen bg-slate-950 text-white flex">

    <Sidebar />

    <main className="flex-1 p-8">

      <h1 className="text-3xl font-bold mb-6">
        Data Sources
      </h1>

      <div className="max-w-xl space-y-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">

        {/* FORM */}

        <input
          placeholder="Source Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
          placeholder="Source Type"
          value={sourceType}
          onChange={(e) => setSourceType(e.target.value)}
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
          placeholder="Host"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
  placeholder="Port"
  value={port}
  onChange={(e) => setPort(e.target.value)}
  className="w-full p-3 rounded bg-slate-800"
/>

        <input
          placeholder="Database Name"
          value={databaseName}
          onChange={(e) => setDatabaseName(e.target.value)}
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full p-3 rounded bg-slate-800"
/>

       <button
  onClick={
    editingId
      ? updateSource
      : addSource
  }
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
  {editingId
    ? "Update Data Source"
    : "Add Data Source"}
</button>

      </div>

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
          Connected Data Sources
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full border border-slate-700 rounded-xl overflow-hidden">

            <thead>
              <tr className="bg-slate-800">
                <th className="p-3 border border-slate-700">ID</th>
                <th className="p-3 border border-slate-700">Name</th>
                <th className="p-3 border border-slate-700">Type</th>
                <th className="p-3 border border-slate-700">Host</th>
                <th className="p-3 border border-slate-700">Port</th>
                <th className="p-3 border border-slate-700">Database</th>
                <th className="p-3 border border-slate-700">Username</th>
                <th className="p-3 border border-slate-700">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sources.map((source) => (
                <tr
                  key={source.id}
                  className="text-center hover:bg-slate-800 transition-all"
                >
                  <td className="p-3 border border-slate-700">
                    {source.id}
                  </td>

                  <td className="p-3 border border-slate-700">
                    {source.name}
                  </td>

                  <td className="p-3 border border-slate-700">
                    {source.source_type}
                  </td>

                  <td className="p-3 border border-slate-700">
                    {source.host}
                  </td>

                  <td className="p-3 border border-slate-700">
                    {source.port}
                  </td>

                  <td className="p-3 border border-slate-700">
                    {source.database_name}
                  </td>

                  <td className="p-3 border border-slate-700">
                    {source.username}
                  </td>
                  <td className="p-3 border border-slate-700">

  <div className="flex gap-2 justify-center">


    <button
  onClick={() => testSource(source.id)}
  className="
    bg-blue-600
    px-3
    py-1
    rounded-lg
    hover:bg-blue-700
    cursor-pointer
    transition-all
  "
>
  Test
</button>
    <button
      onClick={() => {

        setEditingId(source.id);
        setPort(String(source.port));
        setPassword(source.password);
        setName(source.name);
        setSourceType(source.source_type);
        setHost(source.host);
        setPort(String(source.port));
        setDatabaseName(source.database_name);
        setUsername(source.username);
        setPassword(source.password);

      }}
      className="
        bg-yellow-600
        px-3
        py-1
        rounded-lg
        hover:bg-yellow-700
        cursor-pointer
        transition-all
      "
    >
      Edit
    </button>

    <button
      onClick={() => deleteSource(source.id)}
      className="
        bg-red-600
        px-3
        py-1
        rounded-lg
        hover:bg-red-700
        cursor-pointer
        transition-all
      "
    >
      Delete
    </button>

  </div>

</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </main>

  </div>
);
}