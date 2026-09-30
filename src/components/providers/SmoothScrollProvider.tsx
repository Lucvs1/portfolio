"use client";

import React, { createContext, useContext, useEffect, useCallback, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Previne erro nativo do navegador quando o Next DevTools ou outros elementos tentam liberar ponteiros inativos
if (typeof window !== "undefined") {
  const originalReleasePointerCapture = Element.prototype.releasePointerCapture;
  if (originalReleasePointerCapture) {
    Element.prototype.releasePointerCapture = function (pointerId: number) {
      try {
        originalReleasePointerCapture.call(this, pointerId);
      } catch (err: unknown) {
        if ((err as Error)?.name !== "NotFoundError") {
          throw err;
        }
      }
    };
  }
}

interface SmoothScrollContextType {
  getLenis: () => Lenis | null;
  scrollTo: (
    target: string | HTMLElement,
    options?: { offset?: number; duration?: number }
  ) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  getLenis: () => null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const getLenis = useCallback(() => lenisRef.current, []);

  const scrollTo = useCallback(
    (
      target: string | HTMLElement,
      options?: { offset?: number; duration?: number }
    ) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset: options?.offset ?? 0,
          duration: options?.duration ?? 1.2,
        });
      }
    },
    []
  );

  return (
    <SmoothScrollContext.Provider value={{ getLenis, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
