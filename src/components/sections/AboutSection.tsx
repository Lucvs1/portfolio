"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Cpu, GraduationCap, Layout, Compass, Workflow, Gauge } from "lucide-react";
import { AutomationFlowVisualizer } from "@/components/ui/AutomationFlowVisualizer";
import { PlcSimulator } from "@/components/ui/PlcSimulator";
import { useI18n } from "@/lib/i18n";
import { sound } from "@/lib/sound";

export function AboutSection() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<"flow" | "simulator">("flow");

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardsRef.current) return;

      const cards = cardsRef.current.children;

      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <div className="flex flex-col items-start mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
          <Compass className="w-4 h-4" />
          {t.about.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          {t.about.title}
        </h2>
        <p className="mt-4 text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed">
          {t.about.subtitle}
        </p>
      </div>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
      >
        <div className="group relative p-8 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-950/20 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
            <Cpu className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono text-zinc-400 block mb-1">
            {t.about.card1Date}
          </span>
          <h3 className="text-xl font-bold text-white mb-3">
            {t.about.card1Title}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {t.about.card1Desc}
          </p>
        </div>

        <div className="group relative p-8 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-950/20 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono text-zinc-400 block mb-1">
            {t.about.card2Date}
          </span>
          <h3 className="text-xl font-bold text-white mb-3">
            {t.about.card2Title}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {t.about.card2Desc}
          </p>
        </div>

        <div className="group relative p-8 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-950/20 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300">
            <Layout className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono text-zinc-400 block mb-1">
            {t.about.card3Date}
          </span>
          <h3 className="text-xl font-bold text-white mb-3">
            {t.about.card3Title}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {t.about.card3Desc}
          </p>
        </div>
      </div>

      {/* Seletor de Modo: Fluxo Arquitetural vs Simulador de CLP */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block">
              {t.about.labBadge}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {t.about.labTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-full bg-zinc-900 border border-white/10 select-none">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab("flow");
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "flow"
                  ? "bg-white text-zinc-950 font-bold shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>{t.about.tabFlow}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab("simulator");
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "simulator"
                  ? "bg-emerald-400 text-zinc-950 font-bold shadow-[0_0_12px_#34d399]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>{t.about.tabSimulator}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </div>
        </div>

        {/* Visualização Condicional */}
        {activeTab === "flow" ? (
          <AutomationFlowVisualizer />
        ) : (
          <PlcSimulator />
        )}
      </div>
    </section>
  );
}
