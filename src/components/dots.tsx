"use client";

import React, { useEffect, useState } from "react";

export const Dots = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center font-mono h-32 text-muted-foreground">
      {dots}
    </div>
  );
};
