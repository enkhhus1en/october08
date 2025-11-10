"use client";

import React, { useEffect, useState, useTransition } from "react";
import { photo } from "photo";
import { Thumbnail } from "@/components/thumbnail";
import { Dots } from "@/components/dots";
import Link from "next/link";

type Props = {};

const Photos = (props: Props) => {
  const [photos, setPhotos] = useState<photo[]>();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/photos");
        if (!res.ok) console.log("failed to fetch");

        const data = await res.json();
        data.length && setPhotos(data);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {photos &&
          photos.map((photo: photo, index: number) => (
            <Link
              href={`/photos/${photo.id}`}
              key={`zurag_hurug_${index}_${photo.id}`}
            >
              <Thumbnail photo={photo} />
            </Link>
          ))}
      </div>
      {isPending && <Dots />}
    </div>
  );
};

export default Photos;
