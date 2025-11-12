"use client";

import { BookCover } from "@/components/book-cover";
import Link from "next/link";
import React, { useState, useEffect, useTransition } from "react";
import { read } from "read";

const Read = () => {
  const [reads, setReads] = useState<read[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchReads();
  }, []);

  const fetchReads = async () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/reads");
        if (!res.ok) console.log("failed to fetch");

        const data = await res.json();
        data.length && setReads(data);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {reads &&
          reads.map((read: read, index: number) => (
            <Link
              href={`/read/${read.id}`}
              key={`nom_sonin_${index}_${read.id}`}
            >
              <BookCover book={read} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Read;
