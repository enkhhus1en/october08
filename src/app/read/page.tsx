"use client";

import { BookCover } from "@/components/book-cover";
import { Dots } from "@/components/dots";
import { IDKBRO } from "@/components/idk";
import { PageTitle } from "@/components/page-title";
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
    <div className="space-y-8">
      <PageTitle
        title="read"
        description="bro is a terrible reader but yeah here is a list of books i've read or currently reading."
      />
      {reads?.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {reads.map((read: read, index: number) => (
            <Link
              href={`/read/${read.id}`}
              key={`nom_sonin_${index}_${read.id}`}
            >
              <BookCover book={read} />
            </Link>
          ))}
        </div>
      ) : (
        <IDKBRO />
      )}
    </div>
  );
};

export default Read;
