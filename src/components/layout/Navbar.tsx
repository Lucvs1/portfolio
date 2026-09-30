"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

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

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-6 pointer-events-none"
      >
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-6 px-5 py-3 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-zinc-950/80 backdrop-blur-xl border-white/15 shadow-2xl shadow-black/80 scale-[0.98]"
              : "bg-zinc-950/40 backdrop-blur-md border-white/10 shadow-lg shadow-black/20"
          } w-full max-w-5xl`}
        >
          {/* Logo / Monograma */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group flex items-center gap-2.5 font-medium tracking-tight text-white hover:opacity-90 transition-opacity"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/15 text-xs font-semibold text-zinc-100 group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-all duration-300">
              LB
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-normal leading-tight text-zinc-100">
                Lucas Cabral
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase hidden sm:inline-block">
                Software Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-900/50 p-1 rounded-full border border-white/5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-1.5 text-xs uppercase tracking-wider text-zinc-400 hover:text-white rounded-full transition-colors duration-200 hover:bg-white/5 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Status & CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Disponível</span>
            </div>

            <MagneticButton
              asAnchor
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-zinc-950 bg-white hover:bg-zinc-200 transition-colors shadow-sm"
            >
              <span>Falar Comigo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-2xl flex flex-col justify-center items-center px-8 transition-all duration-300 md:hidden">
          <div className="flex flex-col items-center gap-6 text-center w-full max-w-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-xs text-emerald-400 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Disponível para novos projetos</span>
            </div>

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

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-colors"
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
