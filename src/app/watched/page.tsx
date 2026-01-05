"use client";

import { useEffect, useState } from "react";
import { watched } from "watched";
import Image from "next/image";
import { PageTitle } from "@/components/page-title";
import { IDKBRO } from "@/components/idk";
import { Dots } from "@/components/dots";
import Link from "next/link";

export default function Watched() {
  const [items, setItems] = useState<watched[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Group items by year
  const itemsByYear = items.reduce(
    (acc, item) => {
      const year = item.createdAt
        ? new Date(item.createdAt).getFullYear().toString()
        : "Unknown";
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    },
    {} as Record<string, watched[]>,
  );

  const sortedYears = Object.keys(itemsByYear).sort((a, b) => {
    if (a === "Unknown") return 1;
    if (b === "Unknown") return -1;
    return parseInt(b) - parseInt(a);
  });

  return (
    <div className="space-y-8">
      <PageTitle
        title="watched"
        description="my own letterboxd kinda thing except i can log literally anything here."
      />
      {loading ? (
        <Dots />
      ) : (
        <>
          {items.length === 0 ? (
            <IDKBRO />
          ) : (
            <div className="space-y-12">
              {sortedYears.map((year) => (
                <div key={year} className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground">{year}</h2>
                  <div className="grid grid-cols-3 lg:grid-cols-4 gap-2">
                    {itemsByYear[year].map((item) => (
                      <Link
                        key={item.id}
                        className="group relative bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                        href={`/watched/${item.id}`}
                      >
                        {item.coverUrl ? (
                          <div className="relative aspect-[2/3] overflow-hidden bg-muted">
                            <img
                              src={item.coverUrl}
                              alt={item.title}
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[2/3] bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                            <span className="text-4xl opacity-20">🎬</span>
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
