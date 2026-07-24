"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isArchive = pathname === "/archive" || pathname.startsWith("/demo/");

  useEffect(() => {
    document.documentElement.classList.toggle("home-snap", isHome);
    document.documentElement.classList.toggle("theme-dark-home", isHome);
    document.documentElement.classList.toggle("theme-archive", isArchive);
    return () => {
      document.documentElement.classList.remove("home-snap");
      document.documentElement.classList.remove("theme-dark-home");
      document.documentElement.classList.remove("theme-archive");
    };
  }, [isArchive, isHome]);

  return (
    <>
      {isHome ? <InteractiveBackground /> : null}
      <div className="relative z-10">
        <Header />
        <motion.main
          key={pathname}
          className="w-full max-w-full overflow-x-hidden"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.main>
        {!isHome ? <Footer /> : null}
      </div>
    </>
  );
}
