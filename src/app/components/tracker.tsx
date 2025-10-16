"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const Tracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    fetch(`/api/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pathname }),
    });
  }, [pathname]);

  return null;
};
