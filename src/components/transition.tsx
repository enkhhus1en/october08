"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Props = {
  children?: React.ReactNode;
};

export const PageTransition = ({ children }: Props) => {
  const pathname = usePathname();

  const [dispChild, setDispChild] = useState(children);
  const [transitionStage, setTransitionStage] = useState<"fadeIn" | "fadeOut">(
    "fadeIn",
  );

  useEffect(() => {
    setTransitionStage("fadeOut");

    const timeout = setTimeout(() => {
      setDispChild(children);
      setTransitionStage("fadeIn");
    }, 400); // fade duration

    return () => clearTimeout(timeout);
  }, [pathname, children]);

  return (
    <div
      className={`transition-opacity duration-400 ease-out ${
        transitionStage === "fadeIn" ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transition: "opacity 0.4s ease-in-out",
      }}
    >
      {dispChild}
    </div>
  );
};
