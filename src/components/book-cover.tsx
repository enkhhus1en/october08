"use client";

import React from "react";
import { read } from "read";

type Props = {
  book: read;
};

export const BookCover = ({ book }: Props) => {
  return (
    <div className="relative aspect-2/3">
      <img
        src={book.coverUrl}
        className="w-full h-full object-cover"
        alt={book.title}
      />
    </div>
  );
};
