"use client";

import { useEffect, useState } from "react";
import { watched } from "watched";

export default function WatchedPage() {
  const [watched, setWatched] = useState<watched[]>([]);
  const [editing, setEditing] = useState<watched | null>(null);
  const [form, setForm] = useState({
    title: "",
    type: "",
    platform: "",
    notes: "",
    rating: "",
    coverUrl: "",
  });
  const [loading, setLoading] = useState(false);

  async function fetchWatched() {
    const res = await fetch("/api/watched");
    const data = await res.json();
    setWatched(data);
  }

  useEffect(() => {
    fetchWatched();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      rating: Number(form.rating) || null,
      coverUrl: form.coverUrl?.trim() || null,
      type: form.type?.trim() || null,
      platform: form.platform?.trim() || null,
    };

    const method = editing ? "PUT" : "POST";
    const endpoint = editing ? `/api/watched` : "/api/watched";

    const body = editing ? { id: editing.id, ...payload } : payload;

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      setEditing(null);
      setForm({
        title: "",
        type: "",
        platform: "",
        notes: "",
        rating: "",
        coverUrl: "",
      });
      fetchWatched();
    } else alert("Something went wrong");
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this entry?")) return;
    await fetch(`/api/watched?id=${id}`, { method: "DELETE" });
    fetchWatched();
  }

  function handleEdit(item: watched) {
    setEditing(item);
    setForm({
      title: item.title,
      type: item.type || "",
      platform: item.platform || "",
      notes: item.notes || "",
      rating: item.rating?.toString() || "",
      coverUrl: item.coverUrl || "",
    });
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">watched</h1>

      <form onSubmit={handleSubmit} className="border rounded p-4 space-y-3">
        <h2 className="font-medium">{editing ? "edit entry" : "new entry"}</h2>

        <input
          placeholder="title"
          className="border w-full p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="type (movie, series, anime, etc)"
          className="border w-full p-2 rounded"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />
        <input
          placeholder="platform (netflix, disney+, etc)"
          className="border w-full p-2 rounded"
          value={form.platform}
          onChange={(e) => setForm({ ...form, platform: e.target.value })}
        />
        <textarea
          placeholder="notes"
          className="border w-full p-2 rounded"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <input
          placeholder="rating (110)"
          className="border w-full p-2 rounded"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
        />

        <input
          placeholder="cover URL (IMDb, etc)"
          className="border w-full p-2 rounded"
          value={form.coverUrl}
          onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="border px-3 py-1 rounded hover:bg-muted disabled:opacity-50"
          >
            {loading ? "saving..." : editing ? "update" : "create"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm({
                  title: "",
                  type: "",
                  platform: "",
                  notes: "",
                  rating: "",
                  coverUrl: "",
                });
              }}
              className="border px-3 py-1 rounded hover:bg-muted"
            >
              cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {watched.map((item) => (
          <div
            key={item.id}
            className="border rounded p-3 flex gap-3 items-center justify-between"
          >
            <div className="flex gap-3 items-center">
              {item.coverUrl && (
                <img
                  src={item.coverUrl}
                  alt={item.title}
                  className="w-16 h-24 object-cover rounded"
                />
              )}
              <div>
                <h3 className="font-medium">{item.title}</h3>
                {(item.type || item.platform) && (
                  <p className="text-sm text-muted-foreground">
                    {[item.type, item.platform].filter(Boolean).join(" • ")}
                  </p>
                )}
                {item.rating && (
                  <p className="text-xs text-muted-foreground">
                    ⭐ {item.rating}/10
                  </p>
                )}
                {item.notes && (
                  <p className="text-sm text-muted-foreground mt-1 italic">
                    {item.notes}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-sm px-2 py-1 border rounded hover:bg-muted"
              >
                edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-sm px-2 py-1 border rounded hover:bg-muted"
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
