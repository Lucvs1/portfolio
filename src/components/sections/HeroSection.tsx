"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ArrowUpRight, Terminal } from "lucide-react";
import { HeroTerminal } from "@/components/ui/HeroTerminal";
import { sound } from "@/lib/sound";
import { useI18n } from "@/lib/i18n";

export function HeroSection() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement | null>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleOpen = () => setIsTerminalOpen(true);
    window.addEventListener("open-hero-terminal", handleOpen);
    return () => window.removeEventListener("open-hero-terminal", handleOpen);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.15,
          opacity: 0.45,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        badgeRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3 }
      )
        .fromTo(
          [titleLine1Ref.current, titleLine2Ref.current],
          { y: 80, opacity: 0, skewY: 3 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 1.2,
            stagger: 0.15,
          },
          "-=0.6"
        )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.7"
        )
        .fromTo(
          actionsRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.7"
        )
        .fromTo(
          statsRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.7"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-32 pb-16 overflow-hidden"
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-emerald-500/20 via-cyan-500/10 to-transparent blur-[120px] rounded-full opacity-30"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-xs text-zinc-300 font-mono tracking-tight mb-8 shadow-inner shadow-white/5"
        >
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.hero.badgeLocation}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">{t.hero.badgeRole}</span>
        </div>

        <div className="overflow-hidden">
          <h1
            ref={titleLine1Ref}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.95]"
          >
            {t.hero.titleLine1}
          </h1>
        </div>
        <div className="overflow-hidden mb-6">
          <h1
            ref={titleLine2Ref}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600 bg-clip-text text-transparent uppercase leading-[0.95]"
          >
            {t.hero.titleLine2}
          </h1>
        </div>

        <p
          ref={subtitleRef}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed font-normal mb-10"
        >
          {t.hero.subtitleGreeting}<span className="text-white font-medium">{t.hero.subtitleName}</span>
          {t.hero.subtitleText}
        </p>

        <div
          ref={actionsRef}
          className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-300 ${
            isTerminalOpen ? "mb-6" : "mb-16"
          }`}
        >
          <MagneticButton
            strength={0.25}
            onClick={() => scrollTo("#projects", { offset: -30, duration: 1.2 })}
            className="group relative px-7 py-3.5 rounded-full bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-100 transition-all shadow-xl shadow-white/5 flex items-center gap-2 overflow-hidden"
          >
            <span>{t.hero.exploreBtn}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          <MagneticButton
            strength={0.25}
            onClick={() => scrollTo("#contact", { offset: -30, duration: 1.2 })}
            className="px-7 py-3.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800/80 border border-white/10 hover:border-white/20 text-zinc-200 font-medium text-sm transition-all flex items-center gap-2 backdrop-blur-sm"
          >
            <span>{t.hero.contactBtn}</span>
          </MagneticButton>

          <MagneticButton
            strength={0.25}
            onClick={() => {
              sound.playClick();
              setIsTerminalOpen((prev) => !prev);
            }}
            className={`px-6 py-3.5 rounded-full border text-sm font-medium transition-all flex items-center gap-2.5 backdrop-blur-sm ${
              isTerminalOpen
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-500/10"
                : "bg-zinc-900/80 hover:bg-zinc-800/80 border-white/10 hover:border-emerald-500/30 text-zinc-200"
            }`}
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>{t.hero.terminalBtn}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {isTerminalOpen ? t.hero.terminalActive : ">_"}
            </span>
          </MagneticButton>
        </div>

        {/* Terminal Interativo CLI */}
        <HeroTerminal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
        />

        <div
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 ${
            isTerminalOpen ? "pt-10 mt-10" : "pt-8"
          } border-t border-white/10 w-full max-w-4xl transition-all duration-300`}
        >
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
              Next.js 16
            </span>
            <span className="text-xs text-zinc-400 uppercase tracking-wider mt-1">
              {t.hero.statsNextSub}
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight font-mono">
              {t.hero.statsFps}
            </span>
            <span className="text-xs text-zinc-400 uppercase tracking-wider mt-1">
              {t.hero.statsFpsSub}
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
              Full Stack
            </span>
            <span className="text-xs text-zinc-400 uppercase tracking-wider mt-1">
              {t.hero.statsFullSub}
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
              UI / UX
            </span>
            <span className="text-xs text-zinc-400 uppercase tracking-wider mt-1">
              {t.hero.statsUiSub}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo("#about", { offset: -30, duration: 1.2 })}
        aria-label={t.hero.scrollDown}
        className="mt-16 flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer group"
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 group-hover:text-zinc-300">
          {t.hero.scrollDown}
        </span>
        <div className="w-5 h-9 rounded-full border border-zinc-700 flex justify-center p-1 group-hover:border-zinc-500 transition-colors">
          <div className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce" />
        </div>
      </button>
    </section>
  );
}
