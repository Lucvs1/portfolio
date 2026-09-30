"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Download, Printer, Mail, MapPin, GraduationCap, Briefcase, Award, CheckCircle2, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { sound } from "@/lib/sound";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function openResumeModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-resume-modal"));
  }
}

export function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const email = "lucasbezerracontact0@gmail.com";

  const handleOpen = useCallback(() => {
    sound.playHover();
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const handleClose = useCallback(() => {
    sound.playClick();
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const onOpen = () => handleOpen();
    window.addEventListener("open-resume-modal", onOpen);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("open-resume-modal", onOpen);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleOpen, handleClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    sound.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Currículo de Lucas Cabral"
      className="fixed inset-0 z-[9500] flex items-center justify-center p-3 sm:p-6 bg-zinc-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-zinc-900 border border-white/15 shadow-2xl shadow-black/95 overflow-hidden animate-in zoom-in-95 duration-200 print:bg-white print:text-black print:border-none print:shadow-none print:max-h-none print:static"
      >
        {/* Barra superior de ações */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-950/60 print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider">
              Curriculum Vitae • Lucas Cabral
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
              title="Imprimir ou salvar em PDF"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Imprimir / PDF</span>
            </button>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Fechar currículo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Conteúdo com rolagem suave */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 print:p-0 print:space-y-4 text-zinc-200 print:text-black">
          {/* Header do CV */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/10 pb-6 print:border-zinc-300">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white print:text-black">
                Lucas Bezerra de Menezes Cabral
              </h1>
              <p className="text-sm sm:text-base font-medium text-emerald-400 mt-1">
                Engenheiro de Software | Full Stack & UI/UX Developer
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-zinc-400 print:text-zinc-600 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  Rio de Janeiro, Brasil
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  {email}
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">Disponível Imediatamente</span>
              </div>
            </div>

            <div className="flex items-center gap-2 print:hidden shrink-0">
              <MagneticButton
                asAnchor
                href="https://www.linkedin.com/in/lucas-bezerra-51030b303"
                target="_blank"
                rel="noopener noreferrer"
                strength={0.2}
                className="p-2.5 rounded-full bg-zinc-800/80 border border-white/10 text-zinc-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton
                asAnchor
                href="https://github.com/Lucvs1"
                target="_blank"
                rel="noopener noreferrer"
                strength={0.2}
                className="p-2.5 rounded-full bg-zinc-800/80 border border-white/10 text-zinc-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </MagneticButton>
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-full bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
              >
                {copied ? "Copiado!" : "Copiar E-mail"}
              </button>
            </div>
          </div>

          {/* Resumo Profissional */}
          <section>
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" />
              Resumo Profissional
            </h2>
            <p className="text-sm leading-relaxed text-zinc-300 print:text-zinc-700">
              Engenheiro de Software com base analítica sólida forjada no curso técnico de Automação Industrial (Firjan SENAI) e formação acadêmica em Engenharia de Software. Especializado no desenvolvimento de ecossistemas web de alta fidelidade visual, interfaces reativas em 60 FPS com GSAP e Next.js, arquitetura de APIs assíncronas escaláveis e pipelines tolerantes a falhas.
            </p>
          </section>

          {/* Formação Acadêmica & Técnica */}
          <section>
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5" />
              Formação Acadêmica & Técnica
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 print:bg-zinc-100 print:border-zinc-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-white print:text-black">
                    Graduação em Engenharia de Software
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 print:text-zinc-600">
                    Anhanguera • Previsão 2027
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Foco em engenharia de requisitos, arquitetura orientada a serviços, microsserviços, modelagem de dados e engenharia de software ágil.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 print:bg-zinc-100 print:border-zinc-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-white print:text-black">
                    Técnico em Automação Industrial
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 print:text-zinc-600">
                    Firjan SENAI • Concluído 2022
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Programação de Controladores Lógicos Programáveis (CLP), instrumentação industrial de campo, redes de automação (Modbus/Ethernet) e sistemas críticos tolerantes a falhas.
                </p>
              </div>
            </div>
          </section>

          {/* Projetos em Destaque */}
          <section>
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
              <Award className="w-3.5 h-3.5" />
              Projetos Selecionados em Produção
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 print:bg-zinc-100 print:border-zinc-300">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-bold text-white print:text-black">ROTA BGR</h3>
                  <a
                    href="https://rotabgr.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 print:hidden"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 block mb-2">
                  Next.js • Tailwind • GSAP
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Aplicação web interativa de alto desempenho para operações e comunidade, mantendo 99.98% de uptime e renderização a 60 FPS.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 print:bg-zinc-100 print:border-zinc-300">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-bold text-white print:text-black">Cantinho da Cigana</h3>
                  <a
                    href="https://cantinhodacigana.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 print:hidden"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 block mb-2">
                  React • UI/UX • E-commerce
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Plataforma de comércio eletrônico com catálogo dinâmico de produtos, UX voltada para conversão e alta performance no carregamento.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 print:bg-zinc-100 print:border-zinc-300">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-bold text-white print:text-black">Bot Gateway Pro</h3>
                  <a
                    href="https://github.com/Lucvs1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 print:hidden"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 block mb-2">
                  Node.js • Express • Docker
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Microsserviço de backend assíncrono para ingestão, fila e despacho de webhooks com latência inferior a 1.5ms.
                </p>
              </div>
            </div>
          </section>

          {/* Arsenal de Tecnologias */}
          <section>
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Competências Técnicas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-zinc-950/40 border border-white/5">
                <span className="text-emerald-400 font-bold block mb-1.5">Front-end</span>
                <p className="text-zinc-400 leading-relaxed">
                  Next.js (App Router), React, TypeScript, Tailwind CSS, GSAP, Lenis Scroll, HTML5/CSS3.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-950/40 border border-white/5">
                <span className="text-cyan-400 font-bold block mb-1.5">Back-end & Infra</span>
                <p className="text-zinc-400 leading-relaxed">
                  Node.js, Express, REST APIs, MySQL, Docker, Bash/Shell, Git/GitHub, Vercel.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-950/40 border border-white/5">
                <span className="text-indigo-400 font-bold block mb-1.5">UI/UX & Design</span>
                <p className="text-zinc-400 leading-relaxed">
                  Figma, Design Systems, Adobe Photoshop, Illustrator, Prototipação, Acessibilidade.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Rodapé com botão de download/fechar */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-zinc-950/70 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden shrink-0">
          <p className="text-xs text-zinc-400 font-mono">
            Pressione <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/10 text-zinc-300">ESC</kbd> para fechar
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Baixar / Imprimir PDF</span>
            </button>

            <button
              onClick={handleClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
