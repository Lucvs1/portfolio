"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Menu, X, ArrowUpRight, Search } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { LiveStatusWidget } from "@/components/ui/LiveStatusWidget";

const NAV_LINKS = [
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Habilidades", href: "#skills" },
  { label: "Contato", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollTo } = useSmoothScroll();
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
      );
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href, { offset: -40, duration: 1.2 });
  };

  const handleOpenCommandPalette = () => {
    const trigger = document.getElementById("cmd-k-trigger");
    if (trigger) trigger.click();
  };

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 py-4 md:py-6 pointer-events-none no-print print:hidden"
      >
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-4 lg:gap-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-zinc-950/85 backdrop-blur-xl border-white/15 shadow-2xl shadow-black/80 scale-[0.98]"
              : "bg-zinc-950/40 backdrop-blur-md border-white/10 shadow-lg shadow-black/20"
          } w-full max-w-6xl xl:max-w-7xl`}
        >
          {/* Logo / Monograma */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group flex items-center gap-2.5 font-medium tracking-tight text-white hover:opacity-90 transition-opacity shrink-0 whitespace-nowrap select-none"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/15 text-xs font-semibold text-zinc-100 group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-all duration-300 shrink-0">
              LB
            </span>
            <div className="flex flex-col shrink-0 whitespace-nowrap">
              <span className="text-sm font-semibold tracking-tight leading-snug text-zinc-100 whitespace-nowrap">
                Lucas Cabral
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase hidden sm:inline-block whitespace-nowrap leading-none mt-0.5">
                Software Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-0.5 sm:gap-1 bg-zinc-900/50 p-1 rounded-full border border-white/5 shrink-0">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 xl:px-4 py-1.5 text-xs uppercase tracking-wider text-zinc-400 hover:text-white rounded-full transition-colors duration-200 hover:bg-white/5 font-medium whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Status & Ações da Direita */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Live Status do Rio de Janeiro */}
            <div className="hidden md:flex shrink-0">
              <LiveStatusWidget />
            </div>

            {/* Botão de Disparo do Command Palette (Cmd + K) */}
            <button
              onClick={handleOpenCommandPalette}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 hover:border-emerald-500/40 text-xs font-mono text-zinc-400 hover:text-white transition-all shadow-sm group shrink-0 whitespace-nowrap cursor-pointer"
              aria-label="Abrir terminal de comandos rápidos (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">Comandos</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/10 text-[9px] text-zinc-300 shrink-0 font-sans">
                ⌘K
              </kbd>
            </button>

            {/* CTA Button */}
            <MagneticButton
              asAnchor
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-all shadow-sm shrink-0 whitespace-nowrap"
            >
              <span className="whitespace-nowrap font-medium">Falar Comigo</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </MagneticButton>

            {/* Trigger Menu Mobile */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-2xl flex flex-col justify-center items-center px-8 transition-all duration-300 lg:hidden">
          <div className="flex flex-col items-center gap-6 text-center w-full max-w-sm">
            <LiveStatusWidget />

            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl font-light text-zinc-200 hover:text-emerald-400 transition-colors py-2 tracking-tight"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenCommandPalette();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 text-sm font-mono hover:text-white transition-colors"
            >
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Abrir Command Palette (Ctrl + K)</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-colors"
            >
              <span>Iniciar Conversa</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
