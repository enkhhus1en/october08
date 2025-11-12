"use client";

import { useEffect, useState } from "react";
import { read } from "read";

export default function ReadsPage() {
  const [reads, setReads] = useState<read[]>([]);
  const [editing, setEditing] = useState<read | null>(null);
  const [form, setForm] = useState({
    title: "",
    author: "",
    notes: "",
    rating: "",
    coverUrl: "",
  });
  const [loading, setLoading] = useState(false);

  async function fetchReads() {
    const res = await fetch("/api/reads");
    const data = await res.json();
    setReads(data);
  }

  useEffect(() => {
    fetchReads();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      rating: Number(form.rating) || null,
      coverUrl: form.coverUrl?.trim() || null,
    };

    const method = editing ? "PUT" : "POST";
    const endpoint = editing ? `/api/reads/${editing.id}` : "/api/reads";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.ok) {
      setEditing(null);
      setForm({ title: "", author: "", notes: "", rating: "", coverUrl: "" });
      fetchReads();
    } else alert("Something went wrong");
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this entry?")) return;
    await fetch(`/api/reads?id=${id}`, { method: "DELETE" });
    fetchReads();
  }

  function handleEdit(read: read) {
    setEditing(read);
    setForm({
      title: read.title,
      author: read.author || "",
      notes: read.notes || "",
      rating: read.rating?.toString() || "",
      coverUrl: read.coverUrl || "",
    });
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">reads</h1>

      <form onSubmit={handleSubmit} className="border rounded p-4 space-y-3">
        <h2 className="font-medium">{editing ? "edit entry" : "new entry"}</h2>

        <input
          placeholder="title"
          className="border w-full p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="author"
          className="border w-full p-2 rounded"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <textarea
          placeholder="notes"
          className="border w-full p-2 rounded"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <input
          placeholder="rating (1–10)"
          className="border w-full p-2 rounded"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
        />

        <input
          placeholder="cover URL (Goodreads, etc)"
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
                  author: "",
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
        {reads.map((read) => (
          <div
            key={read.id}
            className="border rounded p-3 flex gap-3 items-center justify-between"
          >
            <div className="flex gap-3 items-center">
              {read.coverUrl && (
                <img
                  src={read.coverUrl}
                  alt={read.title}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <h3 className="font-medium">{read.title}</h3>
                {read.author && (
                  <p className="text-sm text-muted-foreground">{read.author}</p>
                )}
                {read.rating && (
                  <p className="text-xs text-muted-foreground">
                    ⭐ {read.rating}/10
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(read)}
                className="text-sm px-2 py-1 border rounded hover:bg-muted"
              >
                edit
              </button>
              <button
                onClick={() => handleDelete(read.id)}
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
