"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [ready, setReady] = useState(!isHome);

  const onLoadDone = useCallback(() => setReady(true), []);

  useEffect(() => {
    document.documentElement.classList.toggle("home-snap", isHome);
    document.documentElement.classList.toggle("theme-dark-home", isHome);
    if (!isHome) setReady(true);
    return () => {
      document.documentElement.classList.remove("home-snap");
      document.documentElement.classList.remove("theme-dark-home");
    };
  }, [isHome]);

  return (
    <>
      {isHome ? <InteractiveBackground /> : null}
      {isHome ? <LoadingScreen onDone={onLoadDone} /> : null}
      <div
        className={`relative z-10 transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <Header />
        <main className="w-full max-w-full overflow-x-hidden">{children}</main>
        {!isHome ? <Footer /> : null}
      </div>
    </>
  );
}
