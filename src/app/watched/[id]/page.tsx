"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { watched } from "watched";
import { PageTitle } from "@/components/page-title";
import { Dots } from "@/components/dots";
import Link from "next/link";
import { datetimeformat } from "@/lib/datetime";

const WatchedDetail = () => {
  const params = useParams();
  const [item, setItem] = useState<watched | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(`/api/watched?id=${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setItem(data);
      } catch (error) {
        console.error("Failed to fetch watched item:", error);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchItem();
  }, [params.id]);

  if (loading) {
    return (
      <div className="space-y-8">
        <Dots />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="space-y-8">
        <PageTitle title="not found" description="404" />
        <Link
          href="/watched"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← watched
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-[280px,1fr] gap-8">
        <div className="w-full flex justify-center items-center">
          {item.coverUrl ? (
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted md:w-96">
              <img
                src={item.coverUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-[2/3] w-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center rounded-lg">
              <span className="text-6xl opacity-20">🎬</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="space-y-3">
            <Link
              href="/watched"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← watched
            </Link>
            <h1 className="text-xl font-bold tracking-tight leading-tight">
              {item.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              {item.type && (
                <span className="px-3 py-1 bg-secondary rounded-full text-xs">
                  {item.type}
                </span>
              )}
              {item.platform && (
                <span className="px-3 py-1 bg-secondary rounded-full text-xs">
                  {item.platform}
                </span>
              )}
              {item.rating && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 rounded-full">
                  <span className="text-yellow-500 text-sm">★</span>
                  <span className="font-semibold text-xs">{item.rating}</span>
                  <span className="text-muted-foreground text-xs">/10</span>
                </div>
              )}
            </div>
          </div>

          {item.notes && (
            <div className="space-y-2">
              <h2 className="text-md font-semibold">🤔💭</h2>
              <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {item.notes}
              </p>
            </div>
          )}

          {item.createdAt && (
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                ⏱︎ {datetimeformat(item.createdAt)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchedDetail;
