"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { smile, navs } from "../constants/layout-constants";
import { dark, light } from "@/assets/icons";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  console.log("pathname: ", pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">{smile}</div>
        <img
          src={theme === "light" ? dark.src : light.src}
          className="h-8 cursor-pointer"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        />
      </div>
      <div className="flex justify-start items-center gap-3 py-3">
        {navs.map((nav: any, index: number) => (
          <Link
            href={nav.link}
            key={`${nav.name}_${index}`}
            className={
              nav.name !== "feed" && pathname.includes(nav.link)
                ? "line-through"
                : ""
            }
          >
            {nav.name}
          </Link>
        ))}
      </div>
    </header>
  );
};
