"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import {
  ArrowUpRight,
  Globe,
  Sparkles,
  BookOpen,
  Shield,
  FileCheck2,
  Send,
  CreditCard,
  Crown,
  Scroll,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { openCaseStudyModal } from "@/components/ui/CaseStudyModal";
import { sound } from "@/lib/sound";
import { useI18n } from "@/lib/i18n";

export interface ProjectData {
  id: string;
  title: string;
  category: { pt: string; en: string };
  description: { pt: string; en: string };
  tags: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  gradient: string;
  accent: string;
  badge: { pt: string; en: string };
  previewType: "platform" | "ecommerce" | "gateway";
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { t, language } = useI18n();
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

      // Inclinação angular sutil (máximo ~6 graus para efeito refinado)
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

  const categoryText = project.category[language];
  const descriptionText = project.description[language];
  const badgeText = project.badge[language];

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
              {badgeText}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-emerald-300 transition-colors">
            {project.title}
          </h3>

          <p className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
            {categoryText}
          </p>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {descriptionText}
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

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <MagneticButton
              onClick={() => {
                sound.playClick();
                openCaseStudyModal(project.id);
              }}
              strength={0.2}
              className="px-5 py-3 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.projects.viewCaseStudy}</span>
            </MagneticButton>

            {project.liveUrl && (
              <MagneticButton
                asAnchor
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                strength={0.2}
                className="px-5 py-3 rounded-full bg-white text-zinc-950 font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg shadow-white/5 cursor-pointer"
              >
                <span>{t.projects.accessPlatform}</span>
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
                className="px-5 py-3 rounded-full bg-zinc-800/90 border border-white/15 text-white font-semibold text-xs tracking-wider uppercase hover:bg-zinc-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>{t.projects.repository}</span>
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
          {/* Mockup 1: ROTA BGR (GTA RP / MTA, Painel Admin, Webhook & PDF) */}
          {project.previewType === "platform" && (
            <div className="relative rounded-2xl bg-zinc-950/80 border border-white/15 p-4 sm:p-5 shadow-2xl backdrop-blur-md group-hover:border-emerald-500/30 transition-colors">
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
                <span className="text-[10px] font-mono text-emerald-400">MTA RP Portal</span>
              </div>

              <div className="space-y-3 font-mono">
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-white/5">
                    <span className="text-[10px] text-zinc-500 uppercase">Viaturas & Fardas</span>
                    <p className="text-xs font-bold text-white mt-1 flex items-center gap-1">
                      <Shield className="w-3 h-3 text-emerald-400" />
                      Catálogo
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-white/5">
                    <span className="text-[10px] text-zinc-500 uppercase">Alto Comando</span>
                    <p className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
                      <Crown className="w-3 h-3 text-amber-400" />
                      & Legends
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-white/5">
                    <span className="text-[10px] text-zinc-500 uppercase">Painel Admin</span>
                    <p className="text-xs font-bold text-cyan-400 mt-1">Recrutamento</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/70 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-200 font-medium flex items-center gap-1.5">
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                      {language === "pt"
                        ? "Automação: Formulário ➔ Discord Webhook"
                        : "Automation: Form ➔ Discord Webhook"}
                    </span>
                    <span className="text-emerald-400 text-[10px]">
                      {language === "pt" ? "Dossiê em PDF" : "PDF Transcript"}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-400 leading-relaxed bg-zinc-950/70 p-2 rounded border border-white/5">
                    {language === "pt"
                      ? "• Notificação instantânea com total de acertos/erros + anexo de perguntas e respostas em PDF gerado para os avaliadores."
                      : "• Instant notification with candidate score + attached dynamic PDF containing full exam questions & answers for evaluators."}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mockup 2: Cantinho da Cigana (Baralho Cigano & Cultura) */}
          {project.previewType === "ecommerce" && (
            <div className="relative rounded-2xl bg-zinc-950/80 border border-white/15 p-4 sm:p-5 shadow-2xl backdrop-blur-md group-hover:border-amber-500/30 transition-colors">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-400">
                  <Globe className="w-3 h-3 text-amber-400" />
                  <span>cantinhodacigana.com</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400">Baralho Cigano</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-amber-500/20 space-y-2">
                  <div className="w-full h-16 rounded-lg bg-gradient-to-br from-amber-500/20 via-zinc-800 to-zinc-900 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase text-amber-400 font-bold block">
                      {language === "pt" ? "Carro-Chefe" : "Flagship Service"}
                    </span>
                    <h5 className="text-xs font-bold text-white">
                      {language === "pt" ? "Leitura Baralho Cigano" : "Gypsy Tarot Readings"}
                    </h5>
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      {language === "pt"
                        ? "Consultas personalizadas e agendamento direto"
                        : "Personalized readings & direct online booking"}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-white/5 space-y-2">
                  <div className="w-full h-16 rounded-lg bg-gradient-to-br from-orange-500/20 via-zinc-800 to-zinc-900 flex items-center justify-center">
                    <Scroll className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase text-zinc-400 block">
                      {language === "pt" ? "Tradição & Loja" : "Heritage & Store"}
                    </span>
                    <h5 className="text-xs font-bold text-white">
                      {language === "pt" ? "Cultura Cigana" : "Gypsy Cultural Items"}
                    </h5>
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      {language === "pt"
                        ? "Conteúdos educativos e produtos temáticos"
                        : "Educational media & curated authentic goods"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mockup 3: Bot Gateway Pro (Discord Bot, PIX Mercado Pago, Stripe Card/Crypto, Cargo e Conteúdo) */}
          {project.previewType === "gateway" && (
            <div className="relative rounded-2xl bg-zinc-950/90 border border-white/15 p-4 sm:p-5 shadow-2xl backdrop-blur-md group-hover:border-blue-500/30 transition-colors font-mono">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-white/5 text-[10px] text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  <span>Discord Gateway Bot</span>
                </div>
                <span className="text-[10px] text-emerald-400">Online • Produção</span>
              </div>

              <div className="space-y-2 text-[11px] leading-relaxed">
                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/80 border border-white/5 text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                    <span>PIX (Mercado Pago) & Stripe (Cartão/Cripto)</span>
                  </div>
                  <span className="text-emerald-400 text-[10px] font-bold">Aprovado</span>
                </div>

                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-white/5 space-y-1.5 text-zinc-400">
                  <div className="flex items-center gap-2 text-indigo-300 text-[10px]">
                    <Shield className="w-3 h-3 text-indigo-400" />
                    <span>[DISCORD GUILD] Cargo @Cliente entregue automaticamente</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300 text-[10px]">
                    <Send className="w-3 h-3 text-emerald-400" />
                    <span>[DM BOT] Conteúdo digital despachado imediatamente</span>
                  </div>
                  <div className="pt-1 text-[9px] text-zinc-500 border-t border-white/5">
                    * Sistema com pipeline de produção ativa e dados mockados para exibição segura.
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
