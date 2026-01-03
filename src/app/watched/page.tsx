"use client";

import { useEffect, useState } from "react";
import { watched } from "watched";
import Image from "next/image";
import { PageTitle } from "@/components/page-title";
import { IDKBRO } from "@/components/idk";
import { Dots } from "@/components/dots";

export default function Watched() {
  const [items, setItems] = useState<watched[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    async function fetchWatched() {
      try {
        const res = await fetch("/api/watched");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch watched items:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWatched();
  }, []);

  const types = [
    "all",
    ...new Set(items.map((item) => item.type).filter(Boolean)),
  ] as string[];
  const filteredItems =
    filter === "all" ? items : items.filter((item) => item.type === filter);

  return (
    <div className="space-y-8">
      <PageTitle
        title="watched"
        description="movies, series, animes and shows I've watched"
      />
      {types.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                filter === type
                  ? "bg-rose-200 dark:bg-rose-900 text-foreground"
                  : "bg-secondary hover:bg-secondary/80 text-muted-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {filteredItems.length === 0 ? (
        <IDKBRO />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {item.coverUrl ? (
                <div className="relative aspect-[2/3] overflow-hidden bg-muted">
                  <Image
                    src={item.coverUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-[2/3] bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                  <span className="text-4xl opacity-20">🎬</span>
                </div>
              )}

              <div className="p-4 space-y-2">
                <h3 className="font-semibold line-clamp-2 leading-tight">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {item.type && (
                    <span className="px-2 py-0.5 bg-secondary rounded">
                      {item.type}
                    </span>
                  )}
                  {item.platform && (
                    <span className="px-2 py-0.5 bg-secondary rounded">
                      {item.platform}
                    </span>
                  )}
                </div>

                {item.rating && (
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{item.rating}</span>
                    <span className="text-muted-foreground">/10</span>
                  </div>
                )}

                {item.notes && (
                  <p className="text-sm text-muted-foreground line-clamp-3 italic">
                    {item.notes}
                  </p>
                )}

                {item.createdAt && (
                  <p className="text-xs text-muted-foreground">
                    Added {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
