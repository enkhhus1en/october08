"use client";

import React, { useState, useEffect } from "react";

type Photo = {
  id: number;
  url: string;
  caption: string | null;
  createdAt: string;
};

const PanelPhotos = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [caption, setCaption] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async () => {
    try {
      const res = await fetch("/api/photos");
      const data = await res.json();
      setPhotos(data);
    } catch (err) {
      console.error("failed to load photos", err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

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

      const photoBody = {
        url: data.url,
        caption: caption,
      };

      const photoRes = await fetch("/api/photos", {
        method: "POST",
        body: JSON.stringify(photoBody),
      });

      if (!photoRes.ok) {
        const text = await photoRes.text();
        throw new Error(`error on /api/photos ${photoRes.status}: ${text}`);
      }

      const photoData = await photoRes.json();
      setMessage(`success: ${photoData.url}`);
      setCaption("");
      setFile(null);
      fetchPhotos();
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Unknown error";
      setMessage(`failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("ustgah uu?")) return;
    try {
      const res = await fetch(`/api/photos?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("delete failed");
      fetchPhotos();
      setMessage("ustgasoon");
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  const handleEdit = async (photo: Photo) => {
    const newCaption = prompt("shine caption:", photo.caption || "");
    if (newCaption === null || newCaption === photo.caption) return;

    try {
      const res = await fetch("/api/photos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: photo.id, caption: newCaption }),
      });

      if (!res.ok) throw new Error("Update failed");
      fetchPhotos();
      setMessage("updated successfully");
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center max-w-2xl mx-auto py-8">
      <h3 className="pb-2 text-lg font-semibold">upload a photo</h3>
      <div className="flex flex-col gap-3 w-full">
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
        <p className="text-sm opacity-70">{message}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full mt-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="border rounded-lg p-3 flex flex-col items-center gap-2 bg-background"
          >
            <img
              src={photo.url}
              alt={photo.caption || ""}
              className="w-full max-h-80 object-cover rounded"
            />
            <div className="flex justify-between items-center w-full text-sm">
              <span>{photo.caption || "(no caption)"}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(photo)}
                  className="underline hover:opacity-70"
                >
                  edit
                </button>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="underline hover:opacity-70 text-red-500"
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {photos.length === 0 && (
          <p className="opacity-60 text-sm text-center mt-8">
            no photos yet 😌
          </p>
        )}
      </div>
    </div>
  );
};

export default PanelPhotos;
