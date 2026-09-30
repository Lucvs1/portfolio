"use client";

import React from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ArrowUp } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative border-t border-white/10 bg-zinc-950/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-sm font-semibold text-white">
            Lucas Bezerra de Menezes Cabral
          </p>
          <p className="text-xs text-zinc-400 mt-1">
            Engenheiro de Software | Full Stack & UI/UX Developer • Rio de Janeiro, Brasil
          </p>
        </div>

        <div className="flex items-center gap-6">
          <p className="text-xs text-zinc-400 font-mono">
            Next.js 16 • GSAP • Lenis • Tailwind
          </p>

          <MagneticButton
            onClick={() => scrollTo("#hero", { duration: 1.2 })}
            strength={0.2}
            className="p-2.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-4 h-4" />
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}

