"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight, CheckCircle2, Cpu, Globe, ShoppingBag, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { MagneticButton } from "@/components/ui/MagneticButton";

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  gradient: string;
  accent: string;
  badge: string;
  previewType: "platform" | "ecommerce" | "gateway";
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const mockupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const mockup = mockupRef.current;
    if (!card) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    // QuickTo para interpolação elástica e fluida de perspectiva 3D
    const xRotTo = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power2.out" });
    const yRotTo = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power2.out" });
    const zMockupTo = mockup
      ? gsap.quickTo(mockup, "z", { duration: 0.6, ease: "power2.out" })
      : null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Inclinação angular sutil (máximo ~7 graus para efeito refinado)
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      xRotTo(rotateX);
      yRotTo(rotateY);
      if (zMockupTo) zMockupTo(20);

      // Atualiza coordenadas para o reflexo de luz dinâmico
      card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--mouse-y", `${(y / rect.top) * 100}%`);
    };

    const handleMouseLeave = () => {
      xRotTo(0);
      yRotTo(0);
      if (zMockupTo) zMockupTo(0);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(card);
      if (mockup) gsap.killTweensOf(mockup);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      data-cursor="project"
      data-cursor-text={project.liveUrl ? "Acessar" : "GitHub"}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      className="group relative rounded-3xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-colors duration-500 overflow-hidden backdrop-blur-xl p-6 sm:p-10 lg:p-12 hover:shadow-2xl hover:shadow-black/80"
    >
      {/* Reflexo de luz especular guiado pelo cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.06),transparent_60%)]"
      />

      {/* Brilho ambiente no canto do card */}
      <div
        className={`pointer-events-none absolute top-0 right-0 w-[420px] h-[420px] bg-gradient-to-bl ${project.gradient} blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Coluna de Informações do Projeto */}
        <div className="lg:col-span-6 space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-500">
              0{index + 1}
            </span>
            <span className="text-zinc-700">•</span>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
              {project.badge}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-emerald-300 transition-colors">
            {project.title}
          </h3>

          <p className="text-xs uppercase font-mono tracking-wider text-zinc-400">
            {project.category}
          </p>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1 rounded-md bg-zinc-800/60 border border-white/5 text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-4">
            {project.liveUrl && (
              <MagneticButton
                asAnchor
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                strength={0.2}
                className="px-6 py-3 rounded-full bg-white text-zinc-950 font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg shadow-white/5"
              >
                <span>Acessar Plataforma</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            )}

            {project.githubUrl && (
              <MagneticButton
                asAnchor
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                strength={0.2}
                className="px-6 py-3 rounded-full bg-zinc-800/90 border border-white/15 text-white font-semibold text-xs tracking-wider uppercase hover:bg-zinc-700 transition-all flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Repositório</span>
              </MagneticButton>
            )}
          </div>
        </div>

        {/* Coluna do Mockup Visual Interativo com profundidade Z */}
        <div
          ref={mockupRef}
          style={{ transformStyle: "preserve-3d" }}
          className="lg:col-span-6 w-full"
        >
          {project.previewType === "platform" && (
            <div className="relative rounded-2xl bg-zinc-950/80 border border-white/15 p-4 sm:p-5 shadow-2xl backdrop-blur-md group-hover:border-emerald-500/30 transition-colors">
              {/* Barra de janela do navegador/app */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-400">
                  <Globe className="w-3 h-3 text-emerald-400" />
                  <span>rotabgr.vercel.app</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">Online</span>
              </div>

              {/* Interface simulada da plataforma */}
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-white/5">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono">Status</span>
                    <p className="text-xs font-bold text-white mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Operacional
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-white/5">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono">Uptime</span>
                    <p className="text-xs font-bold text-emerald-400 mt-1">99.98%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-white/5">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono">Performance</span>
                    <p className="text-xs font-bold text-white mt-1">60 FPS</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/70 border border-white/5 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-300 font-medium">Fluxo de Dados Comunitário</span>
                    <span className="text-emerald-400 font-mono text-[10px]">Taxa de resposta &lt; 25ms</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="w-4/5 h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {project.previewType === "ecommerce" && (
            <div className="relative rounded-2xl bg-zinc-950/80 border border-white/15 p-4 sm:p-5 shadow-2xl backdrop-blur-md group-hover:border-amber-500/30 transition-colors">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-400">
                  <ShoppingBag className="w-3 h-3 text-amber-400" />
                  <span>cantinhodacigana.com</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400">Catálogo Ativo</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-white/5 space-y-2">
                  <div className="w-full h-16 rounded-lg bg-gradient-to-br from-amber-500/20 via-zinc-800 to-zinc-900 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-amber-400/80" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-3 w-3/4 bg-white/20 rounded" />
                    <div className="h-2.5 w-1/2 bg-amber-400/50 rounded" />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-white/5 space-y-2">
                  <div className="w-full h-16 rounded-lg bg-gradient-to-br from-orange-500/20 via-zinc-800 to-zinc-900 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-orange-400/80" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-3 w-2/3 bg-white/20 rounded" />
                    <div className="h-2.5 w-1/3 bg-orange-400/50 rounded" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {project.previewType === "gateway" && (
            <div className="relative rounded-2xl bg-zinc-950/90 border border-white/15 p-4 sm:p-5 shadow-2xl backdrop-blur-md group-hover:border-blue-500/30 transition-colors font-mono">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-white/5 text-[10px] text-zinc-400">
                  <Terminal className="w-3 h-3 text-blue-400" />
                  <span>api.gateway.pro/v1</span>
                </div>
                <span className="text-[10px] text-blue-400">Async Pipeline</span>
              </div>

              <div className="space-y-2.5 text-[11px] leading-relaxed">
                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/80 border border-white/5 text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-zinc-200">POST /webhook/dispatch</span>
                  </div>
                  <span className="text-emerald-400 font-bold">200 OK</span>
                </div>

                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-white/5 space-y-1 text-zinc-400">
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>QUEUE: active (0 ms delay)</span>
                    <span>WORKERS: 4/4</span>
                  </div>
                  <div className="text-[10px] text-zinc-300">
                    {"{ status: \"queued\", dispatched: true, latency: \"1.2ms\" }"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
