"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { sound } from "@/lib/sound";

const SECTIONS = [
  { id: "hero", label: "01 // HERO" },
  { id: "about", label: "02 // BASE" },
  { id: "projects", label: "03 // PROJETOS" },
  { id: "skills", label: "04 // SKILLS" },
  { id: "contact", label: "05 // CONTATO" },
];

export function CircuitScrollLine() {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const line = lineRef.current;
    const head = headRef.current;
    if (!line || !head) return;

    // Sincronização scrub da barra de circuito industrial com a rolagem total da página
    const progressTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(line, {
          scaleY: progress,
          duration: 0.1,
          ease: "none",
          transformOrigin: "top center",
        });
        gsap.to(head, {
          top: `${progress * 100}%`,
          duration: 0.1,
          ease: "none",
        });
      },
    });

    // Detectores para iluminar os nós conforme a seção ativa entra na viewport
    const sectionTriggers = SECTIONS.map((sec) => {
      return ScrollTrigger.create({
        trigger: `#${sec.id}`,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setActiveSection(sec.id),
        onEnterBack: () => setActiveSection(sec.id),
      });
    });

    return () => {
      progressTrigger.kill();
      sectionTriggers.forEach((t) => t.kill());
    };
  }, []);

  const handleNodeClick = (id: string) => {
    sound.playClick();
    scrollTo(`#${id}`, { offset: -40, duration: 1.2 });
  };

  return (
    <aside
      aria-label="Trilha de navegação de circuito"
      className="fixed left-6 xl:left-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center select-none pointer-events-auto"
    >
      {/* Trilho base de circuito integrado */}
      <div className="relative h-64 sm:h-80 w-[2px] bg-white/10 rounded-full flex flex-col justify-between items-center py-2">
        {/* Linha energizada sincronizada com o Scroll (GSAP Scrub) */}
        <div
          ref={lineRef}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-400 via-teal-400 to-cyan-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] rounded-full scale-y-0 origin-top pointer-events-none"
        />

        {/* Cabeça do circuito iluminado com pulso */}
        <div
          ref={headRef}
          className="absolute -left-[3px] top-0 w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_12px_#34d399] pointer-events-none -translate-y-1/2"
        />

        {/* Nós do circuito correspondentes a cada seção */}
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;

          return (
            <button
              key={sec.id}
              onClick={() => handleNodeClick(sec.id)}
              onMouseEnter={() => sound.playHover()}
              className="group relative flex items-center justify-center cursor-pointer p-1 -m-1 focus:outline-none"
              aria-label={`Rolar para ${sec.label}`}
            >
              {/* Ponto / Chip do circuito */}
              <span
                className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-400 border-white shadow-[0_0_10px_rgba(52,211,153,0.9)] scale-125"
                    : "bg-zinc-950 border-white/20 group-hover:border-emerald-400 group-hover:scale-110"
                }`}
              />

              {/* Rótulo de telemetria revelado ao passar o mouse */}
              <span className="absolute left-6 px-2.5 py-1 rounded-md bg-zinc-900/90 border border-white/10 text-[10px] font-mono text-zinc-300 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 shadow-xl backdrop-blur-md">
                {sec.label}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
