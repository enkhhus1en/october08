"use client";

import { useState } from "react";

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState("photos");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error ${res.status}: ${text}`);
      }

      const data = await res.json();
      setMessage(`success: ${data.fileUrl}`);
    } catch (err: any) {
      setMessage(`failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center">
      <h1 className="text-xl font-semibold">Upload Test</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <input
        type="text"
        placeholder="folder (optional)"
        value={folder}
        onChange={(e) => setFolder(e.target.value)}
        className="border rounded px-2 py-1 text-sm"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 rounded bg-foreground text-background hover:opacity-80 disabled:opacity-50"
      >
        {loading ? "..." : "upload"}
      </button>

      {message && (
        <p
          className={`mt-2 text-sm`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
