"use client";

import React from "react";

type Props = {
  title: string;
  description?: string;
};

export const PageTitle = ({ title, description }: Props) => {
  return (
    <div className="space-y-3 text-center">
      <h1 className="text-xl font-bold">⋆ {title} ⋆</h1>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
