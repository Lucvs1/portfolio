"use client";

import React from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ArrowUp, Terminal, FileText } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { openResumeModal } from "@/components/ui/ResumeModal";
import { sound } from "@/lib/sound";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t, language } = useI18n();
  const { scrollTo } = useSmoothScroll();

  const handleBackToTop = () => {
    sound.playClick();
    scrollTo("#hero", { duration: 1.2 });
  };

  const handleOpenCommandPalette = () => {
    sound.playHover();
    const trigger = document.getElementById("cmd-k-trigger");
    if (trigger) trigger.click();
  };

  return (
    <footer className="relative border-t border-white/10 bg-zinc-950/80 py-14 px-4 sm:px-6 lg:px-8 no-print print:hidden">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-base font-bold text-white tracking-tight">
              Lucas Bezerra de Menezes Cabral
            </span>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              {language === "pt"
                ? "Engenheiro de Software & UI/UX Developer • Rio de Janeiro, Brasil"
                : "Software Engineer & Creative UI/UX Developer • Rio de Janeiro, Brazil"}
            </p>
          </div>

          {/* Links Rápidos do Footer */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-400">
            <button
              onClick={openResumeModal}
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{language === "pt" ? "Currículo (CV)" : "Resume (CV)"}</span>
            </button>
            <span className="text-zinc-700">•</span>
            <button
              onClick={handleOpenCommandPalette}
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{language === "pt" ? "Terminal (Ctrl + K)" : "Commands (Ctrl + K)"}</span>
            </button>
          </div>

          {/* Voltar ao Topo */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
              {t.footer.backToTop}
            </span>
            <MagneticButton
              onClick={handleBackToTop}
              strength={0.25}
              className="p-3 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-emerald-500/40 transition-colors shadow-sm"
              aria-label={t.footer.backToTop}
            >
              <ArrowUp className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>

        {/* Linha de créditos & telemetria */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
          <p className="flex items-center gap-2">
            <span>{t.footer.builtWith}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
