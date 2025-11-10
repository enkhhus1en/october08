"use client";

import React, { useState } from "react";

type Props = {};

const PanelPhotos = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [path, setPath] = useState("");
  const [caption, setCaption] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("File-aa songooch dee :P");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "photos");

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
      setPath(data.url);

      const photoBody = {
        url: data.url,
        caption: caption,
      };

      const photoRes = await fetch("/api/photos", {
        method: "POST",
        body: JSON.stringify(photoBody),
      });

      if (!photoRes.ok) {
        const text = await res.text();
        throw new Error(`error on /api/photos ${photoRes.status}: ${text}`);
      }

      const photoData = await photoRes.json();
      setMessage(`success: ${photoData.url} ${photoData.caption}`);
      setLoading(false);
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Unknown error";
      setMessage(`failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h3 className="pb-4">upload a photo</h3>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="text-sm border-b"
      />
      <input
        type="text"
        placeholder="caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="border rounded px-2 py-1 text-sm"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 rounded bg-foreground text-background hover:opacity-80 disabled:opacity-50 transition"
      >
        {loading ? "uploading..." : "upload"}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default PanelPhotos;

//first upload a photo using upload api
//then get the url and create photo entity
//ui
//1 . upload
//2 . caption
//3 . takenAt?
