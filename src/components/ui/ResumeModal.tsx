"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  Download,
  Printer,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { sound } from "@/lib/sound";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { useI18n } from "@/lib/i18n";

export function openResumeModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-resume-modal"));
  }
}

export function ResumeModal() {
  const { language } = useI18n();
  const isPt = language === "pt";
  const pdfHref = isPt ? "/Lucas_Cabral_Curriculo.pdf" : "/Lucas_Cabral_Resume.pdf";
  const pdfFileName = isPt ? "Lucas_Cabral_Curriculo.pdf" : "Lucas_Cabral_Resume.pdf";

  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { getLenis } = useSmoothScroll();

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
    const lenis = getLenis();
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isOpen, getLenis]);

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
      aria-label={isPt ? "Currículo de Lucas Cabral" : "Lucas Cabral's Resume"}
      data-lenis-prevent="true"
      className="resume-modal-backdrop fixed inset-0 z-[9500] flex items-center justify-center p-3 sm:p-6 bg-zinc-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
        className="resume-modal-card relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-zinc-900 border border-white/15 shadow-2xl shadow-black/95 overflow-hidden animate-in zoom-in-95 duration-200 print:bg-white print:text-black print:border-none print:shadow-none print:max-h-none print:static"
      >
        {/* Barra superior de ações */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-950/60 print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider">
              Curriculum Vitae • Lucas Cabral
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Opção 1: Baixar PDF */}
            <a
              href={pdfHref}
              download={pdfFileName}
              onClick={() => sound.playSuccess()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-mono text-emerald-300 transition-colors cursor-pointer"
              title={isPt ? "Baixar arquivo PDF de 1 página" : "Download 1-page PDF file"}
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isPt ? "Baixar PDF" : "Download PDF"}</span>
            </a>

            {/* Opção 2: Imprimir */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
              title={isPt ? "Abrir tela de impressão" : "Open print dialog"}
            >
              <Printer className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">{isPt ? "Imprimir" : "Print"}</span>
            </button>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-1"
              aria-label={isPt ? "Fechar currículo" : "Close resume"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Conteúdo com rolagem suave e suporte nativo ao scroll */}
        <div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          className="resume-modal-scroll flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 print:p-0 print:space-y-4 text-zinc-200 print:text-black"
        >
          {/* Header do CV */}
          <div className="resume-print-item flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/10 pb-6 print:border-zinc-300">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white print:text-black">
                Lucas Bezerra de Menezes Cabral
              </h1>
              <p className="text-sm sm:text-base font-medium text-emerald-400 mt-1">
                {isPt
                  ? "Engenheiro de Software | Full Stack & UI/UX Developer"
                  : "Software Engineer | Full Stack & UI/UX Developer"}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-zinc-400 print:text-zinc-600 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  {isPt ? "Rio de Janeiro, Brasil" : "Rio de Janeiro, Brazil"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  {email}
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">
                  {isPt ? "Disponível Imediatamente" : "Immediately Available"}
                </span>
              </div>
            </div>

            <div className="no-print flex items-center gap-2 print:hidden shrink-0">
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
                {copied
                  ? (isPt ? "Copiado!" : "Copied!")
                  : (isPt ? "Copiar E-mail" : "Copy Email")}
              </button>
            </div>
          </div>

          {/* Resumo Profissional */}
          <section className="resume-print-item">
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" />
              {isPt ? "Resumo Profissional" : "Professional Summary"}
            </h2>
            <p className="text-sm leading-relaxed text-zinc-300 print:text-zinc-800">
              {isPt
                ? "Engenheiro de Software com sólida base analítica forjada no curso técnico de Automação Industrial (Firjan SENAI) e formação acadêmica em Engenharia de Software. Especializado no desenvolvimento de ecossistemas web de alta fidelidade visual e interfaces fluidas com GSAP e Next.js, arquitetura de APIs assíncronas escaláveis e pipelines tolerantes a falhas."
                : "Software Engineer with a solid analytical foundation built through Industrial Automation technical training (Firjan SENAI) and an ongoing degree in Software Engineering. Specialized in architecting high-fidelity web ecosystems and fluid interfaces with GSAP and Next.js, scalable asynchronous APIs, and fault-tolerant pipelines."}
            </p>
          </section>

          {/* Formação Acadêmica & Técnica */}
          <section className="resume-print-item">
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5" />
              {isPt ? "Formação Acadêmica & Técnica" : "Education & Technical Background"}
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 print:bg-zinc-50 print:border-zinc-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-white print:text-black">
                    {isPt ? "Graduação em Engenharia de Software" : "B.S. in Software Engineering"}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 print:text-zinc-600">
                    {isPt ? "Anhanguera • Previsão 2027" : "Anhanguera • Est. 2027"}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 print:text-zinc-700 mt-1 leading-relaxed">
                  {isPt
                    ? "Foco em engenharia de requisitos, arquitetura orientada a serviços, microsserviços, modelagem de dados e engenharia de software ágil."
                    : "Emphasis on requirements engineering, service-oriented architecture, microservices, data modeling, and agile software development."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 print:bg-zinc-50 print:border-zinc-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-white print:text-black">
                    {isPt ? "Técnico em Automação Industrial" : "Industrial Automation Technician"}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 print:text-zinc-600">
                    {isPt ? "Firjan SENAI • Concluído 2022" : "Firjan SENAI • Completed 2022"}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 print:text-zinc-700 mt-1 leading-relaxed">
                  {isPt
                    ? "Programação de Controladores Lógicos Programáveis (CLP), instrumentação industrial de campo, redes de automação (Modbus/Ethernet) e sistemas críticos tolerantes a falhas."
                    : "Programming of Programmable Logic Controllers (PLC), industrial field instrumentation, automation networks (Modbus/Ethernet), and mission-critical fault-tolerant systems."}
                </p>
              </div>
            </div>
          </section>

          {/* Projetos em Destaque */}
          <section className="resume-print-item">
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
              <Award className="w-3.5 h-3.5" />
              {isPt ? "Projetos Selecionados em Produção" : "Selected Production Projects"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 print:bg-zinc-50 print:border-zinc-300">
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
                <span className="text-[10px] font-mono text-zinc-400 print:text-zinc-600 block mb-2">
                  Next.js • Tailwind • GSAP
                </span>
                <p className="text-xs text-zinc-400 print:text-zinc-700 leading-relaxed">
                  {isPt
                    ? "Aplicação web interativa para corporação policial em GTA RP/MTA: painel administrativo completo, catálogo de viaturas e fardas, memorial de Legends e recrutamento automatizado via Discord Webhooks e PDF."
                    : "Interactive web application for a GTA RP/MTA police department: complete admin dashboard, patrol fleet & uniforms catalog, Legends memorial, and recruitment automated via Discord Webhooks and dynamic PDF."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 print:bg-zinc-50 print:border-zinc-300">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-bold text-white print:text-black">Cantinho da Cigana</h3>
                  <a
                    href="https://cantinhadacigana.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 print:hidden"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 print:text-zinc-600 block mb-2">
                  {isPt ? "Next.js • Tailwind CSS • UX Místico" : "Next.js • Tailwind CSS • Mystical UX"}
                </span>
                <p className="text-xs text-zinc-400 print:text-zinc-700 leading-relaxed">
                  {isPt
                    ? "Plataforma cultural e e-commerce voltada ao universo cigano, com foco central no agendamento de leitura de baralho cigano, catálogo de produtos artesanais e estética Dark Obsidian."
                    : "Cultural platform and e-commerce centered around Gypsy culture, with its flagship focus on Gypsy Tarot readings booking, handcrafted item catalog, and immersive Dark Obsidian aesthetics."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 print:bg-zinc-50 print:border-zinc-300">
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
                <span className="text-[10px] font-mono text-zinc-400 print:text-zinc-600 block mb-2">
                  Discord.js • Mercado Pago • Stripe • Node.js
                </span>
                <p className="text-xs text-zinc-400 print:text-zinc-700 leading-relaxed">
                  {isPt
                    ? "Bot de Discord para monetização nativa com checkout via PIX (Mercado Pago) e Cartão/Cripto (Stripe), atribuição automatizada de cargos e entrega imediata de conteúdos adquiridos."
                    : "Discord bot for in-app monetization and native checkout via PIX (Mercado Pago) and Credit/Crypto (Stripe), featuring automated role assignment and immediate digital content dispatch."}
                </p>
              </div>
            </div>
          </section>

          {/* Arsenal de Tecnologias */}
          <section className="resume-print-item">
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isPt ? "Competências Técnicas" : "Technical Competencies"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-zinc-950/40 border border-white/5 print:bg-zinc-50 print:border-zinc-200">
                <span className="text-emerald-400 print:text-emerald-700 font-bold block mb-1.5">Front-end</span>
                <p className="text-zinc-400 print:text-zinc-700 leading-relaxed">
                  Next.js (App Router), React, TypeScript, Tailwind CSS, GSAP, Lenis Scroll, HTML5/CSS3.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-950/40 border border-white/5 print:bg-zinc-50 print:border-zinc-200">
                <span className="text-cyan-400 print:text-cyan-700 font-bold block mb-1.5">
                  {isPt ? "Back-end & Infra" : "Back-end & Infrastructure"}
                </span>
                <p className="text-zinc-400 print:text-zinc-700 leading-relaxed">
                  Node.js, Express, REST APIs, MySQL, Docker, Bash/Shell, Git/GitHub, Vercel.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-950/40 border border-white/5 print:bg-zinc-50 print:border-zinc-200">
                <span className="text-indigo-400 print:text-indigo-700 font-bold block mb-1.5">UI/UX & Design</span>
                <p className="text-zinc-400 print:text-zinc-700 leading-relaxed">
                  {isPt
                    ? "Figma, Design Systems, Adobe Photoshop, Illustrator, Prototipação, Acessibilidade."
                    : "Figma, Design Systems, Adobe Photoshop, Illustrator, Prototyping, Accessibility."}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Rodapé com botões de Baixar PDF, Imprimir e Fechar */}
        <div className="no-print p-4 sm:p-6 border-t border-white/10 bg-zinc-950/70 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden shrink-0">
          <p className="text-xs text-zinc-400 font-mono">
            {isPt ? (
              <>
                Pressione <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/10 text-zinc-300">ESC</kbd> para fechar
              </>
            ) : (
              <>
                Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/10 text-zinc-300">ESC</kbd> to close
              </>
            )}
          </p>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Opção Baixar PDF */}
            <a
              href={pdfHref}
              download={pdfFileName}
              onClick={() => sound.playSuccess()}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <Download className="w-4 h-4 text-zinc-950" />
              <span>{isPt ? "Baixar PDF (1 Página)" : "Download PDF (1 Page)"}</span>
            </a>

            {/* Opção Imprimir */}
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-zinc-400" />
              <span>{isPt ? "Imprimir" : "Print"}</span>
            </button>

            <button
              onClick={handleClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              {isPt ? "Fechar" : "Close"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
