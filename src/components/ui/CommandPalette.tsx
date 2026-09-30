"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback, useSyncExternalStore } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { sound } from "@/lib/sound";
import {
  Search,
  Terminal,
  Compass,
  Layers,
  Wrench,
  Mail,
  Palette,
  Check,
  CornerDownLeft,
  X,
  FileCode2,
  FileText,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { openResumeModal } from "@/components/ui/ResumeModal";

export type ThemeGlow = "emerald" | "cyan" | "violet" | "mono";

export const THEMES: Record<ThemeGlow, { name: string; color: string; hex: string; glow: string }> = {
  emerald: {
    name: "Esmeralda (Padrão)",
    color: "text-emerald-400",
    hex: "#22c55e",
    glow: "rgba(34, 197, 94, 0.25)",
  },
  cyan: {
    name: "Ciano Cyberpunk",
    color: "text-cyan-400",
    hex: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.25)",
  },
  violet: {
    name: "Violeta Obsidian",
    color: "text-purple-400",
    hex: "#a855f7",
    glow: "rgba(168, 85, 247, 0.25)",
  },
  mono: {
    name: "Titânio Monocromático",
    color: "text-zinc-200",
    hex: "#f4f4f5",
    glow: "rgba(244, 244, 245, 0.2)",
  },
};

let currentTheme: ThemeGlow = "emerald";
const themeListeners = new Set<() => void>();

if (typeof window !== "undefined") {
  const saved = localStorage.getItem("portfolio_theme_glow") as ThemeGlow;
  if (saved && THEMES[saved]) {
    currentTheme = saved;
    const themeData = THEMES[saved];
    document.documentElement.style.setProperty("--accent", themeData.hex);
    document.documentElement.style.setProperty("--accent-glow", themeData.glow);
  }
}

function getThemeSnapshot(): ThemeGlow {
  return currentTheme;
}

function getThemeServerSnapshot(): ThemeGlow {
  return "emerald";
}

function subscribeTheme(callback: () => void): () => void {
  themeListeners.add(callback);
  return () => themeListeners.delete(callback);
}

function changeTheme(theme: ThemeGlow) {
  currentTheme = theme;
  if (typeof window !== "undefined") {
    const root = document.documentElement;
    const themeData = THEMES[theme];
    root.style.setProperty("--accent", themeData.hex);
    root.style.setProperty("--accent-glow", themeData.glow);
    localStorage.setItem("portfolio_theme_glow", theme);
  }
  themeListeners.forEach((cb) => cb());
}

interface CommandItem {
  id: string;
  category: "Navegação" | "Comandos Dev" | "Tema de Luz" | "Links";
  label: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  badge?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const activeTheme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const { scrollTo, getLenis } = useSmoothScroll();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const lenis = getLenis();
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isOpen, getLenis]);

  const openPalette = useCallback(() => {
    sound.playClick();
    setSearch("");
    setSelectedIndex(0);
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 60);
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Listener global de atalho Cmd + K / Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          closePalette();
        } else {
          openPalette();
        }
      } else if (e.key === "Escape" && isOpen) {
        closePalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, openPalette, closePalette]);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("lucasbezerracontact0@gmail.com");
    sound.playSuccess();
    setCopiedNotification("E-mail copiado para o clipboard!");
    setTimeout(() => {
      setCopiedNotification(null);
      closePalette();
    }, 1200);
  }, [closePalette]);

  const simulateResumeCurl = useCallback(() => {
    sound.playSuccess();
    setCopiedNotification("curl /api/resume: Status 200 OK (Abrindo CV...)");
    setTimeout(() => {
      setCopiedNotification(null);
      closePalette();
      openResumeModal();
    }, 700);
  }, [closePalette]);

  const commands: CommandItem[] = useMemo(
    () => [
      // Seção Navegação
      {
        id: "nav-hero",
        category: "Navegação",
        label: "Ir para o Início (Hero)",
        detail: "Apresentação e visão de engenharia",
        icon: Terminal,
        action: () => {
          scrollTo("#hero", { duration: 1.2 });
          closePalette();
        },
      },
      {
        id: "nav-about",
        category: "Navegação",
        label: "Ir para Sobre Mim",
        detail: "Formação SENAI + Software e Pipeline",
        icon: Compass,
        action: () => {
          scrollTo("#about", { offset: -30, duration: 1.2 });
          closePalette();
        },
      },
      {
        id: "nav-projects",
        category: "Navegação",
        label: "Ir para Projetos Selecionados",
        detail: "ROTA BGR, Cantinho da Cigana, Bot Gateway",
        icon: Layers,
        action: () => {
          scrollTo("#projects", { offset: -30, duration: 1.2 });
          closePalette();
        },
      },
      {
        id: "nav-skills",
        category: "Navegação",
        label: "Ir para Habilidades & Stack",
        detail: "Next.js, Node, GSAP, Docker, Figma",
        icon: Wrench,
        action: () => {
          scrollTo("#skills", { offset: -30, duration: 1.2 });
          closePalette();
        },
      },
      {
        id: "nav-resume",
        category: "Navegação",
        label: "Visualizar Currículo (CV)",
        detail: "Abrir resumo executivo de formação e competências",
        icon: FileText,
        action: () => {
          closePalette();
          openResumeModal();
        },
      },
      {
        id: "nav-contact",
        category: "Navegação",
        label: "Ir para Contato",
        detail: "Canais diretos e propostas",
        icon: Mail,
        action: () => {
          scrollTo("#contact", { offset: -30, duration: 1.2 });
          closePalette();
        },
      },

      // Seção Comandos Dev
      {
        id: "cli-skills",
        category: "Comandos Dev",
        label: "lucas --skills",
        detail: "Exibir o arsenal tecnológico completo",
        icon: FileCode2,
        badge: "CLI",
        action: () => {
          sound.playSuccess();
          scrollTo("#skills", { offset: -30 });
          closePalette();
        },
      },
      {
        id: "cli-contact",
        category: "Comandos Dev",
        label: "lucas --contact",
        detail: "Copiar e-mail de contato e rolar",
        icon: Mail,
        badge: "CLI",
        action: () => {
          copyEmail();
          scrollTo("#contact", { offset: -30 });
        },
      },
      {
        id: "cli-resume",
        category: "Comandos Dev",
        label: "lucas --resume",
        detail: "Abrir o modal de currículo executivo",
        icon: FileText,
        badge: "CLI",
        action: () => {
          sound.playSuccess();
          closePalette();
          openResumeModal();
        },
      },
      {
        id: "cli-curl-resume",
        category: "Comandos Dev",
        label: "curl /api/resume",
        detail: "Simular requisição de currículo da API",
        icon: Terminal,
        badge: "CURL",
        action: simulateResumeCurl,
      },

      // Seção Temas de Luz
      {
        id: "theme-emerald",
        category: "Tema de Luz",
        label: "Brilho Esmeralda Neon",
        detail: "Tema padrão de engenharia com alta fluidez",
        icon: Palette,
        badge: activeTheme === "emerald" ? "Ativo" : undefined,
        action: () => {
          sound.playSuccess();
          changeTheme("emerald");
          closePalette();
        },
      },
      {
        id: "theme-cyan",
        category: "Tema de Luz",
        label: "Brilho Ciano Cyberpunk",
        detail: "Atmosfera de telemetria futurista",
        icon: Palette,
        badge: activeTheme === "cyan" ? "Ativo" : undefined,
        action: () => {
          sound.playSuccess();
          changeTheme("cyan");
          closePalette();
        },
      },
      {
        id: "theme-violet",
        category: "Tema de Luz",
        label: "Brilho Violeta Obsidian",
        detail: "Visual escuro com toques luxuosos",
        icon: Palette,
        badge: activeTheme === "violet" ? "Ativo" : undefined,
        action: () => {
          sound.playSuccess();
          changeTheme("violet");
          closePalette();
        },
      },
      {
        id: "theme-mono",
        category: "Tema de Luz",
        label: "Brilho Titânio Minimalista",
        detail: "Estética monocromática pura e limpa",
        icon: Palette,
        badge: activeTheme === "mono" ? "Ativo" : undefined,
        action: () => {
          sound.playSuccess();
          changeTheme("mono");
          closePalette();
        },
      },

      // Seção Links
      {
        id: "link-github",
        category: "Links",
        label: "Abrir GitHub (@Lucvs1)",
        detail: "github.com/Lucvs1",
        icon: GithubIcon,
        action: () => {
          window.open("https://github.com/Lucvs1", "_blank");
          closePalette();
        },
      },
      {
        id: "link-linkedin",
        category: "Links",
        label: "Abrir LinkedIn",
        detail: "linkedin.com/in/lucas-bezerra-51030b303",
        icon: LinkedinIcon,
        action: () => {
          window.open("https://www.linkedin.com/in/lucas-bezerra-51030b303", "_blank");
          closePalette();
        },
      },
    ],
    [scrollTo, activeTheme, closePalette, copyEmail, simulateResumeCurl]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return commands;
    const query = search.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(query) ||
        c.detail.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query)
    );
  }, [search, commands]);

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      sound.playHover();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      sound.playHover();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  return (
    <>
      <button
        id="cmd-k-trigger"
        onClick={openPalette}
        aria-label="Abrir Command Palette"
        className="hidden"
      />

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent="true"
          className="fixed inset-0 z-[9000] flex items-start justify-center pt-20 sm:pt-28 px-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closePalette}
        >
          <div
            data-lenis-prevent="true"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDownList}
            className="relative w-full max-w-2xl rounded-2xl bg-zinc-900 border border-white/15 shadow-2xl shadow-black/90 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
          >
            {/* Input de Busca */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-zinc-950/50">
              <Search className="w-5 h-5 text-zinc-400 flex-shrink-0" />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Digite um comando, seção ou tema (ex: 'lucas --skills', 'projetos')..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none font-mono"
              />
              <button
                onClick={closePalette}
                className="p-1 rounded-md text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Notificação Temporária */}
            {copiedNotification && (
              <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-4 py-2 text-xs font-mono text-emerald-400 flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>{copiedNotification}</span>
              </div>
            )}

            {/* Lista de Comandos com scroll nativo liberado */}
            <div
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              className="max-h-80 overflow-y-auto p-2 space-y-1"
            >
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 text-xs font-mono">
                  Nenhum comando encontrado para &quot;{search}&quot;.
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = selectedIndex === idx;

                  return (
                    <div
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => {
                        if (selectedIndex !== idx) {
                          sound.playHover();
                          setSelectedIndex(idx);
                        }
                      }}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                        isSelected
                          ? "bg-zinc-800 text-white"
                          : "text-zinc-300 hover:bg-zinc-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                            isSelected
                              ? "bg-zinc-700 border-white/20 text-emerald-400"
                              : "bg-zinc-900 border-white/5 text-zinc-400"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm font-semibold tracking-tight font-mono">
                            {item.label}
                          </span>
                          <span className="text-[11px] text-zinc-400">
                            {item.detail}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300">
                            {item.badge}
                          </span>
                        )}
                        <span className="text-[10px] uppercase font-mono text-zinc-500">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Rodapé da Paleta */}
            <div className="px-4 py-2.5 bg-zinc-950/60 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/10 text-[10px] text-zinc-300">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/10 text-[10px] text-zinc-300">
                    ↓
                  </kbd>
                  Navegar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/10 text-[10px] text-zinc-300 flex items-center gap-0.5">
                    <CornerDownLeft className="w-2.5 h-2.5" /> Enter
                  </kbd>
                  Executar
                </span>
              </div>

              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/10 text-[10px] text-zinc-300">
                  Esc
                </kbd>{" "}
                Fechar
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
