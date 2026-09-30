"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Cpu, GraduationCap, Layout, Compass } from "lucide-react";
import { AutomationFlowVisualizer } from "@/components/ui/AutomationFlowVisualizer";

export function AboutSection() {
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
          [01 // Filosofia de Engenharia]
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          Do chão de fábrica à alta fidelidade digital.
        </h2>
        <p className="mt-4 text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed">
          Minha trajetória une a precisão cirúrgica da Automação Industrial com o dinamismo da Engenharia de Software contemporânea.
        </p>
      </div>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="group relative p-8 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-950/20 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
            <Cpu className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono text-zinc-400 block mb-1">
            Firjan SENAI • 2022
          </span>
          <h3 className="text-xl font-bold text-white mb-3">
            Automação Industrial
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Formação técnica de base que consolidou raciocínio lógico, tolerância zero a falhas, instrumentação de processos e arquitetura resiliente.
          </p>
        </div>

        <div className="group relative p-8 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-950/20 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono text-zinc-400 block mb-1">
            Anhanguera • Prev. 2027
          </span>
          <h3 className="text-xl font-bold text-white mb-3">
            Engenharia de Software
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Aprofundamento contínuo em algoritmos, arquitetura orientada a serviços, microsserviços, escalabilidade web e engenharia de software full stack.
          </p>
        </div>

        <div className="group relative p-8 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-950/20 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300">
            <Layout className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono text-zinc-400 block mb-1">
            Creative Development
          </span>
          <h3 className="text-xl font-bold text-white mb-3">
            Design & Microinterações
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Domínio de Figma, Tailwind CSS e GSAP para entregar interfaces ricas, tipografia escultural, microinterações a 60fps e acessibilidade exemplar.
          </p>
        </div>
      </div>

      {/* Visualizador Arquitetural Interativo "Chão de Fábrica ➔ Cloud" */}
      <AutomationFlowVisualizer />
    </section>
  );
}
