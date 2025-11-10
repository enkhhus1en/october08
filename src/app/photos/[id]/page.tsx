"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { photo } from "photo";
import { Dots } from "@/components/dots";
import { datetimeformat } from "@/lib/datetime";

const PhotoDetailPage = () => {
  const params = useParams();

  const [photo, setPhoto] = useState<photo>();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchPhoto();
  }, []);

  const fetchPhoto = async () => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/photos?id=${params?.id}`);
        if (!res.ok) console.log("failed to fetch");

        const data = await res.json();
        data.url && setPhoto(data);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div>
      {photo && (
        <div>
          <img className="h-full sm:h-96" src={photo.url} alt={photo.caption} />
          <p className="text-xs pt-3">{photo.caption}</p>
          <div className="text-[0.6rem] text-red-400 dark:text-red-200">
            {datetimeformat(photo.createdAt)}
          </div>
        </div>
      )}
      {isPending && <Dots />}
    </div>
  );
};

export default PhotoDetailPage;
