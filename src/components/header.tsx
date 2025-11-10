"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { smile, navs } from "@/constants/layout-constants";
import { dark, light } from "@/assets/icons";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const navMaps = navs.map((nav: any, index: number) => (
    <Link
      href={nav.link}
      key={`${nav.name}_${index}`}
      className={pathname.includes(nav.link) ? "line-through" : ""}
    >
      {nav.name}
    </Link>
  ));

  return (
    <header>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">{smile}</div>
        {/* <div className="hidden md:flex justify-center items-center gap-4">
          {navMaps}
        </div> */}
        <Image
          alt="theme"
          src={theme === "light" ? dark.src : light.src}
          width={30}
          height={30}
          className="cursor-pointer"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        />
      </div>
      <div className="flex flex-wrap justify-start items-center gap-x-2 sm:gap-x-4 pt-3 max-w-xs sm:flex-nowrap sm:gap-4 text-sm">
        {navMaps}
      </div>
    </header>
  );
};
