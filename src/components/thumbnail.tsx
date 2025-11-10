"use client";

import { photo } from "photo";

type Props = {
  photo: photo;
};

export const Thumbnail = ({ photo }: Props) => {
  return (
    <div className="relative aspect-square">
      <img
        src={photo.url}
        className={`object-center rounded-md`}
        alt={photo.caption}
      />
    </div>
  );
};
