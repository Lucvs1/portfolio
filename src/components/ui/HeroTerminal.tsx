"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { sound } from "@/lib/sound";
import { openResumeModal } from "@/components/ui/ResumeModal";
import { rebootPortfolio } from "@/components/ui/Preloader";
import { changeTheme, ThemeGlow } from "@/components/ui/CommandPalette";
import { openCaseStudyModal } from "@/components/ui/CaseStudyModal";
import { useI18n } from "@/lib/i18n";
import {
  Terminal as TerminalIcon,
  Maximize2,
  Minimize2,
  X,
  CornerDownLeft,
  Sparkles,
  ExternalLink,
  Code2,
} from "lucide-react";

interface HistoryItem {
  id: string;
  command?: string;
  output: React.ReactNode;
  isError?: boolean;
}

const COMMAND_LIST = [
  "help",
  "bio",
  "skills",
  "projects",
  "casestudy",
  "simulator",
  "lang",
  "open",
  "resume",
  "contact",
  "ping",
  "theme",
  "matrix",
  "uptime",
  "clear",
  "reboot",
  "exit",
];

export function HeroTerminal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { language, setLanguage, toggleLanguage } = useI18n();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "initial",
      output: (
        <div className="space-y-2 text-xs font-mono text-zinc-300">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">LUCAS CABRAL DEVSTATION OS [v2.4.0-release]</span>
          </div>
          <p className="text-zinc-400 leading-relaxed">
            Ambiente de linha de comando interativo. Arquitetura full stack com raízes na automação industrial.
          </p>
          <p className="text-zinc-500">
            Digite <span className="text-cyan-400 font-semibold">&apos;help&apos;</span> para listar os comandos ou clique nos atalhos rápidos abaixo.
          </p>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [mountTime] = useState(() => Date.now());

  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Foco no input ao abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Rolagem suave para o fim ao adicionar novo item
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 40);
  }, []);

  // Matrix Rain Canvas Effect
  useEffect(() => {
    if (!isMatrixActive || !isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    resize();

    const chars = "0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(9, 9, 11, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10b981";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [isMatrixActive, isOpen]);

  // Execução de comandos
  const executeCommand = (cmdRaw: string) => {
    const trimmed = cmdRaw.trim();
    if (!trimmed) return;

    sound.playClick();
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output: React.ReactNode = null;
    let isError = false;

    switch (command) {
      case "help":
        output = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-emerald-400 font-semibold border-b border-white/10 pb-1">
              COMANDOS DISPONÍVEIS:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-zinc-300">
              <div>
                <span className="text-cyan-300 font-semibold">bio</span>
                <span className="text-zinc-500"> » </span>
                <span className="text-zinc-400">Trajetória e formação</span>
              </div>
              <div>
                <span className="text-cyan-300 font-semibold">skills</span>
                <span className="text-zinc-500"> » </span>
                <span className="text-zinc-400">Stack técnica detalhada</span>
              </div>
              <div>
                <span className="text-cyan-300 font-semibold">projects</span>
                <span className="text-zinc-500"> » </span>
                <span className="text-zinc-400">Catálogo de projetos web</span>
              </div>
              <div>
                <span className="text-cyan-300 font-semibold">open &lt;1|2|3&gt;</span>
                <span className="text-zinc-500"> » </span>
                <span className="text-zinc-400">Abre o projeto no navegador</span>
              </div>
              <div>
                <span className="text-cyan-300 font-semibold">resume / cv</span>
                <span className="text-zinc-500"> » </span>
                <span className="text-zinc-400">Abre o currículo executivo</span>
              </div>
              <div>
                <span className="text-cyan-300 font-semibold">contact</span>
                <span className="text-zinc-500"> » </span>
                <span className="text-zinc-400">Canais de contato direto</span>
              </div>
              <div>
                <span className="text-cyan-300 font-semibold">ping &lt;alvo&gt;</span>
                <span className="text-zinc-500"> » </span>
                <span className="text-zinc-400">Simula latência de rede</span>
              </div>
              <div>
                <span className="text-cyan-300 font-semibold">theme &lt;cor&gt;</span>
                <span className="text-zinc-500"> » </span>
                <span className="text-zinc-400">emerald, cyan, violet, mono</span>
              </div>
              <div>
                <span className="text-cyan-300 font-semibold">matrix</span>
                <span className="text-zinc-500"> » </span>
                <span className="text-zinc-400">Ativa/desativa chuva digital</span>
              </div>
              <div>
                <span className="text-cyan-300 font-semibold">uptime</span>
                <span className="text-zinc-500"> » </span>
                <span className="text-zinc-400">Telemetria da sessão</span>
              </div>
              <div>
                <span className="text-cyan-300 font-semibold">clear</span>
                <span className="text-zinc-500"> » </span>
                <span className="text-zinc-400">Limpa a tela do terminal</span>
              </div>
              <div>
                <span className="text-cyan-300 font-semibold">reboot</span>
                <span className="text-zinc-500"> » </span>
                <span className="text-zinc-400">Reinicia o preloader industrial</span>
              </div>
              <div>
                <span className="text-cyan-300 font-semibold">exit</span>
                <span className="text-zinc-500"> » </span>
                <span className="text-zinc-400">Fecha esta janela</span>
              </div>
            </div>
          </div>
        );
        sound.playSuccess();
        break;

      case "bio":
      case "cat":
        if (command === "cat" && args[0] && !args[0].includes("bio")) {
          output = <span className="text-rose-400">cat: arquivo não encontrado. Tente &apos;cat bio.txt&apos; ou &apos;skills&apos;.</span>;
          isError = true;
          sound.playError();
          break;
        }
        output = (
          <div className="space-y-2.5 text-xs font-mono bg-zinc-900/60 p-3.5 rounded-lg border border-white/5">
            <div className="text-emerald-400 font-bold text-sm">
              Lucas Bezerra de Menezes Cabral
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Software Engineer & Creative Developer sediado no Rio de Janeiro, Brasil.
              Trajetória singular combinando o rigor determinístico da automação industrial de missão crítica
              com engenharia de software full stack moderna e interfaces web com padrão Awwwards.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
              <div>
                <span className="text-zinc-500">FORMAÇÃO TÉCNICA:</span>
                <div className="text-zinc-300">Técnico em Automação Industrial — SENAI</div>
              </div>
              <div>
                <span className="text-zinc-500">GRADUAÇÃO:</span>
                <div className="text-zinc-300">Engenharia de Software — Anhanguera</div>
              </div>
            </div>
          </div>
        );
        sound.playSuccess();
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-xs font-mono bg-zinc-900/40 p-3 rounded-lg border border-white/5">
            <div className="text-emerald-400 font-bold">STACK TÉCNICA EM PRODUÇÃO:</div>
            <div className="space-y-1.5 text-zinc-300">
              <div>
                <span className="text-cyan-400 font-semibold">⚡ Frontend & Motion:</span> Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, GSAP 3, Lenis Scroll, Web Audio API, Canvas.
              </div>
              <div>
                <span className="text-emerald-400 font-semibold">⚙️ Backend & Infra:</span> Node.js, Express, PostgreSQL, REST APIs, Webhooks, Docker, CI/CD, Git.
              </div>
              <div>
                <span className="text-amber-400 font-semibold">🏭 Automação Industrial:</span> CLPs (Siemens/Rockwell), Ladder/SFC, Modbus TCP/IP, Profinet, IHM/SCADA.
              </div>
              <div>
                <span className="text-purple-400 font-semibold">🎨 Design & Performance:</span> Figma, Design Systems, Glassmorphism, 60/120 FPS optimization.
              </div>
            </div>
          </div>
        );
        sound.playSuccess();
        break;

      case "projects":
      case "ls":
        output = (
          <div className="space-y-2.5 text-xs font-mono">
            <p className="text-emerald-400 font-bold">PROJETOS EM DESTAQUE:</p>
            <div className="space-y-2">
              <div className="p-2.5 rounded bg-zinc-900/60 border border-white/5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-white font-semibold flex items-center gap-2">
                    <span className="text-cyan-400">[1]</span> ROTA BGR
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Produção</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] mt-0.5">
                    Sistema logístico com rastreamento de rotas em tempo real, telemetria e despacho inteligente.
                  </p>
                  <p className="text-zinc-500 text-[10px] mt-1 font-sans">Next.js • Node.js • Mapbox • Tailwind</p>
                </div>
                <a
                  href="https://rotabgr.com.br"
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 p-1.5 rounded hover:bg-white/10 text-cyan-400 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-2.5 rounded bg-zinc-900/60 border border-white/5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-white font-semibold flex items-center gap-2">
                    <span className="text-cyan-400">[2]</span> Cantinho da Cigana
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Produção</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] mt-0.5">
                    Plataforma e-commerce & branding místico com checkout fluido e catálogo de alta conversão.
                  </p>
                  <p className="text-zinc-500 text-[10px] mt-1 font-sans">Next.js • TypeScript • Tailwind • UI/UX</p>
                </div>
                <a
                  href="https://cantinhodacigana.com.br"
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 p-1.5 rounded hover:bg-white/10 text-cyan-400 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-2.5 rounded bg-zinc-900/60 border border-white/5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-white font-semibold flex items-center gap-2">
                    <span className="text-cyan-400">[3]</span> Bot Gateway Pro
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">Orquestrador</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] mt-0.5">
                    Orquestrador de mensageria com roteamento de webhooks e integração WhatsApp/CRM.
                  </p>
                  <p className="text-zinc-500 text-[10px] mt-1 font-sans">Node.js • Docker • Redis • Webhooks</p>
                </div>
                <a
                  href="https://github.com/Lucas-cabral1"
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 p-1.5 rounded hover:bg-white/10 text-cyan-400 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <p className="text-zinc-500 text-[11px]">
              Dica: Digite <span className="text-cyan-300 font-semibold">&apos;open 1&apos;</span>, <span className="text-cyan-300 font-semibold">&apos;open 2&apos;</span> ou <span className="text-cyan-300 font-semibold">&apos;open 3&apos;</span> para abrir o projeto.
            </p>
          </div>
        );
        sound.playSuccess();
        break;

      case "open": {
        const target = args[0]?.toLowerCase();
        if (target === "1" || target === "rotabgr") {
          window.open("https://rotabgr.com.br", "_blank");
          output = <span className="text-emerald-400">✓ Abrindo ROTA BGR em nova aba (https://rotabgr.com.br)...</span>;
        } else if (target === "2" || target === "cantinho" || target === "cigana") {
          window.open("https://cantinhodacigana.com.br", "_blank");
          output = <span className="text-emerald-400">✓ Abrindo Cantinho da Cigana em nova aba (https://cantinhodacigana.com.br)...</span>;
        } else if (target === "3" || target === "bot" || target === "gateway") {
          window.open("https://github.com/Lucas-cabral1", "_blank");
          output = <span className="text-emerald-400">✓ Abrindo repositório no GitHub...</span>;
        } else if (target === "github") {
          window.open("https://github.com/Lucas-cabral1", "_blank");
          output = <span className="text-emerald-400">✓ Abrindo GitHub...</span>;
        } else if (target === "linkedin") {
          window.open("https://linkedin.com/in/lucas-cabral-ti", "_blank");
          output = <span className="text-emerald-400">✓ Abrindo LinkedIn...</span>;
        } else {
          output = <span className="text-amber-400">Uso: open &lt;1 | 2 | 3 | github | linkedin&gt;</span>;
          isError = true;
          sound.playError();
        }
        break;
      }

      case "casestudy":
      case "cs": {
        const target = args[0]?.toLowerCase();
        if (target === "1" || target === "rotabgr") {
          openCaseStudyModal("rota-bgr");
          output = <span className="text-emerald-400">✓ Abrindo Case Study: ROTA BGR...</span>;
        } else if (target === "2" || target === "cantinho" || target === "cigana") {
          openCaseStudyModal("cantinho-da-cigana");
          output = <span className="text-emerald-400">✓ Abrindo Case Study: Cantinho da Cigana...</span>;
        } else if (target === "3" || target === "bot" || target === "gateway") {
          openCaseStudyModal("bot-gateway-pro");
          output = <span className="text-emerald-400">✓ Abrindo Case Study: Bot Gateway Pro...</span>;
        } else {
          output = <span className="text-amber-400">Uso: casestudy &lt;1 | 2 | 3&gt; (Ex: casestudy 1)</span>;
        }
        sound.playSuccess();
        break;
      }

      case "simulator":
      case "clp": {
        const aboutEl = document.getElementById("about");
        if (aboutEl) aboutEl.scrollIntoView({ behavior: "smooth" });
        output = <span className="text-emerald-400">✓ Navegando até a seção Sobre Mim. Inicie o simulador de CLP no painel interativo.</span>;
        sound.playSuccess();
        break;
      }

      case "lang":
      case "language": {
        const choice = args[0]?.toLowerCase();
        if (choice === "en") {
          setLanguage("en");
          output = <span className="text-emerald-400">✓ Language switched to English (EN).</span>;
        } else if (choice === "pt") {
          setLanguage("pt");
          output = <span className="text-emerald-400">✓ Idioma alterado para Português (PT).</span>;
        } else {
          toggleLanguage();
          output = (
            <span className="text-emerald-400">
              ✓ Idioma alternado para: <strong className="uppercase">{language === "pt" ? "EN" : "PT"}</strong>
            </span>
          );
        }
        sound.playSuccess();
        break;
      }

      case "resume":
      case "cv":
        openResumeModal();
        output = (
          <div className="text-emerald-400 font-mono text-xs">
            ✓ Modal do Currículo Executivo acionado com sucesso. (Opções de Impressão A4 e Download em PDF direto).
          </div>
        );
        sound.playSuccess();
        break;

      case "contact":
        output = (
          <div className="space-y-1.5 text-xs font-mono bg-zinc-900/60 p-3 rounded-lg border border-white/5">
            <div className="text-emerald-400 font-bold">CANAIS DE CONTATO DIRETO:</div>
            <div className="text-zinc-300">
              • WhatsApp:{" "}
              <a
                href="https://wa.me/5521981327561"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 underline hover:text-cyan-300"
              >
                +55 (21) 98132-7561
              </a>
            </div>
            <div className="text-zinc-300">
              • E-mail:{" "}
              <a
                href="mailto:lucasb.cabral@hotmail.com"
                className="text-cyan-400 underline hover:text-cyan-300"
              >
                lucasb.cabral@hotmail.com
              </a>
            </div>
            <div className="text-zinc-300">
              • LinkedIn:{" "}
              <a
                href="https://linkedin.com/in/lucas-cabral-ti"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 underline hover:text-cyan-300"
              >
                linkedin.com/in/lucas-cabral-ti
              </a>
            </div>
            <div className="text-zinc-300">
              • GitHub:{" "}
              <a
                href="https://github.com/Lucas-cabral1"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 underline hover:text-cyan-300"
              >
                github.com/Lucas-cabral1
              </a>
            </div>
          </div>
        );
        sound.playSuccess();
        break;

      case "ping": {
        const target = args[0] || "github.com";
        const latency1 = (12 + Math.random() * 8).toFixed(1);
        const latency2 = (11 + Math.random() * 8).toFixed(1);
        const latency3 = (13 + Math.random() * 8).toFixed(1);
        output = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <p className="text-cyan-400 font-bold">PING {target} (104.26.11.233): 56 data bytes</p>
            <p>64 bytes from {target}: icmp_seq=1 ttl=58 time={latency1} ms</p>
            <p>64 bytes from {target}: icmp_seq=2 ttl=58 time={latency2} ms</p>
            <p>64 bytes from {target}: icmp_seq=3 ttl=58 time={latency3} ms</p>
            <p className="text-emerald-400 font-semibold pt-1">
              --- {target} estatísticas de ping ---
            </p>
            <p className="text-zinc-400">
              3 pacotes transmitidos, 3 recebidos, 0.0% perda de pacotes, RTT médio: {latency2}ms
            </p>
          </div>
        );
        sound.playSuccess();
        break;
      }

      case "theme": {
        const themeChoice = args[0]?.toLowerCase() as ThemeGlow;
        if (["emerald", "cyan", "violet", "mono"].includes(themeChoice)) {
          changeTheme(themeChoice);
          output = (
            <span className="text-emerald-400">
              ✓ Tema de iluminação neon alterado para: <span className="font-bold uppercase">{themeChoice}</span> ⚡
            </span>
          );
          sound.playSuccess();
        } else {
          output = (
            <span className="text-amber-400">
              Temas válidos: emerald | cyan | violet | mono. Exemplo: <span className="text-white">theme cyan</span>
            </span>
          );
          isError = true;
          sound.playError();
        }
        break;
      }

      case "matrix":
        setIsMatrixActive((prev) => {
          const next = !prev;
          return next;
        });
        output = (
          <span className="text-emerald-400 font-bold">
            {isMatrixActive ? "Efeito Matrix Rain desativado." : "Efeito Matrix Rain ativado no terminal."}
          </span>
        );
        sound.playSuccess();
        break;

      case "uptime": {
        const seconds = Math.floor((Date.now() - mountTime) / 1000);
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        output = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <p className="text-cyan-400 font-bold">TELEMETRIA DO SISTEMA:</p>
            <p>• Uptime da sessão: <span className="text-emerald-400 font-semibold">{mins}m {secs}s</span></p>
            <p>• Engine: <span className="text-white">Next.js 16.3.7 (Turbopack) & React 19</span></p>
            <p>• Motion: <span className="text-white">GSAP 3.12 + Lenis Virtual Scroll (60 FPS)</span></p>
            <p>• Áudio: <span className="text-white">Web Audio API Synth Core (48 kHz)</span></p>
            <p>• Status: <span className="text-emerald-400 font-semibold">Ready / 0 memory leaks</span></p>
          </div>
        );
        sound.playSuccess();
        break;
      }

      case "clear":
        setHistory([]);
        setInputVal("");
        sound.playClick();
        return;

      case "reboot":
        rebootPortfolio();
        output = <span className="text-cyan-400 font-bold">Reinicializando dev-station...</span>;
        sound.playSuccess();
        break;

      case "exit":
        onClose();
        sound.playClick();
        return;

      default:
        isError = true;
        output = (
          <div className="text-xs font-mono space-y-1">
            <p className="text-rose-400">
              Comando não reconhecido: <span className="text-white font-bold">&quot;{cmdRaw}&quot;</span>.
            </p>
            <p className="text-zinc-500">
              Digite <span className="text-cyan-400 font-semibold">&apos;help&apos;</span> para consultar os comandos disponíveis.
            </p>
          </div>
        );
        sound.playError();
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        command: cmdRaw,
        output,
        isError,
      },
    ]);
    setInputVal("");
    scrollToBottom();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Tecla Enter para executar
    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(inputVal);
      return;
    }

    // Tecla Tab para auto-completar
    if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.toLowerCase().trim();
      if (!current) return;
      const match = COMMAND_LIST.find((c) => c.startsWith(current));
      if (match) {
        setInputVal(match);
        sound.playClick();
      }
      return;
    }

    // Seta Cima/Baixo para navegar no histórico
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIdx === -1 ? commandHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(commandHistory[nextIdx]);
      sound.playClick();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIdx(-1);
        setInputVal("");
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
      sound.playClick();
      return;
    }

    // Som de tecla ao digitar
    if (e.key.length === 1) {
      sound.playKey();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`relative w-full transition-all duration-300 mt-6 z-20 ${
        isMaximized ? "max-w-5xl" : "max-w-3xl"
      }`}
    >
      <div className="relative rounded-2xl border border-white/15 bg-zinc-950/90 backdrop-blur-xl shadow-2xl shadow-emerald-500/5 overflow-hidden transition-all duration-300">
        {/* Matrix Canvas Backdrop */}
        {isMatrixActive && (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-25"
          />
        )}

        {/* Top Window Bar */}
        <div className="relative z-10 flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              title="Fechar (exit)"
              className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors flex items-center justify-center group"
            >
              <X className="w-2 h-2 text-zinc-900 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setIsMatrixActive((p) => !p);
              }}
              title="Alternar Matrix Rain"
              className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors flex items-center justify-center group"
            >
              <Sparkles className="w-2 h-2 text-zinc-900 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setIsMaximized((p) => !p);
              }}
              title={isMaximized ? "Restaurar Janela" : "Expandir Janela"}
              className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors flex items-center justify-center group"
            >
              {isMaximized ? (
                <Minimize2 className="w-2 h-2 text-zinc-900 opacity-0 group-hover:opacity-100" />
              ) : (
                <Maximize2 className="w-2 h-2 text-zinc-900 opacity-0 group-hover:opacity-100" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-zinc-200 font-medium">lucas@dev-station:~ (zsh)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
              title="Fechar Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Body */}
        <div
          ref={scrollContainerRef}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onClick={() => inputRef.current?.focus()}
          className="relative z-10 p-4 sm:p-5 h-[280px] sm:h-[340px] overflow-y-auto space-y-3 font-mono cursor-text text-left scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5">
              {item.command && (
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="text-emerald-400 font-bold">lucas@dev-station</span>
                  <span className="text-zinc-600">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-zinc-500">$</span>
                  <span className="text-white font-medium">{item.command}</span>
                </div>
              )}
              <div>{item.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1">
            <span className="text-emerald-400 font-bold shrink-0">lucas@dev-station</span>
            <span className="text-zinc-600 shrink-0">:</span>
            <span className="text-cyan-400 shrink-0">~</span>
            <span className="text-zinc-500 shrink-0">$</span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                className="w-full bg-transparent border-none outline-none text-white font-mono text-xs p-0 focus:ring-0 placeholder:text-zinc-600"
                placeholder="digite 'help' ou escolha uma tag abaixo..."
              />
            </div>
          </div>

          <div ref={terminalBottomRef} />
        </div>

        {/* Quick Suggestion Chips Footer */}
        <div className="relative z-10 px-4 py-2.5 bg-zinc-950/95 border-t border-white/5 flex flex-wrap items-center gap-1.5 text-[11px] font-mono select-none">
          <span className="text-zinc-500 mr-1 flex items-center gap-1">
            <Code2 className="w-3 h-3 text-emerald-400" /> Atalhos:
          </span>
          {[
            { label: "help", cmd: "help" },
            { label: "bio", cmd: "bio" },
            { label: "skills", cmd: "skills" },
            { label: "projects", cmd: "projects" },
            { label: "simulator", cmd: "simulator" },
            { label: "casestudy 1", cmd: "casestudy 1" },
            { label: "lang en", cmd: "lang en" },
            { label: "resume", cmd: "resume" },
            { label: "ping rotabgr", cmd: "ping rotabgr.com.br" },
            { label: "theme cyan", cmd: "theme cyan" },
            { label: "matrix", cmd: "matrix" },
            { label: "clear", cmd: "clear" },
          ].map((chip) => (
            <button
              key={chip.label}
              onClick={() => executeCommand(chip.cmd)}
              className="px-2 py-1 rounded bg-zinc-900/90 hover:bg-emerald-500/10 hover:text-emerald-300 text-zinc-400 border border-white/5 hover:border-emerald-500/30 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>{chip.label}</span>
              <CornerDownLeft className="w-2.5 h-2.5 opacity-50" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
