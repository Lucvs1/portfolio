"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { sound } from "@/lib/sound";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

const LOGS = [
  "INICIANDO KERNEL INDUSTRIAL [FIRJAN SENAI]...",
  "CALIBRANDO RUNTIME REACT 19 & NEXT.JS 16...",
  "SINCRONIZANDO PIPELINE GSAP & MOTOR LENIS...",
  "ESTABELECENDO GATEWAYS ASSÍNCRONOS [ALTA PERFORMANCE]...",
  "SISTEMA PRONTO // BEM-VINDO AO PORTFÓLIO",
];

export function rebootPortfolio() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("portfolio_booted");
    window.dispatchEvent(new CustomEvent("portfolio-reboot"));
  }
}

export function Preloader() {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const logRef = useRef<HTMLParagraphElement | null>(null);
  const { getLenis } = useSmoothScroll();

  useEffect(() => {
    // Verifica se já executou o boot nesta sessão
    const hasBooted = sessionStorage.getItem("portfolio_booted");
    if (!hasBooted) {
      queueMicrotask(() => {
        setShouldRender(true);
      });
    }

    const handleReboot = () => {
      setShouldRender(true);
    };

    window.addEventListener("portfolio-reboot", handleReboot);
    return () => window.removeEventListener("portfolio-reboot", handleReboot);
  }, []);

  useEffect(() => {
    if (!shouldRender || !containerRef.current) return;

    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const counterObj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        sound.playSuccess();
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
          onComplete: () => {
            setShouldRender(false);
            sessionStorage.setItem("portfolio_booted", "true");
            document.body.style.overflow = "";
            lenis?.start();
            window.dispatchEvent(new CustomEvent("portfolio-loaded"));
          },
        });
      },
    });

    // Animação de contagem rápida de 0 a 100%
    tl.to(counterObj, {
      value: 100,
      duration: 1.3,
      ease: "power2.inOut",
      onUpdate: () => {
        const rounded = Math.round(counterObj.value);
        if (counterRef.current) {
          counterRef.current.innerText = `${rounded < 10 ? "0" : ""}${rounded}%`;
        }
        if (progressRef.current) {
          progressRef.current.style.width = `${rounded}%`;
        }

        // Atualiza os logs de telemetria com base no progresso
        if (logRef.current) {
          if (rounded < 25) {
            logRef.current.innerText = LOGS[0];
          } else if (rounded < 50) {
            logRef.current.innerText = LOGS[1];
          } else if (rounded < 75) {
            logRef.current.innerText = LOGS[2];
          } else if (rounded < 95) {
            logRef.current.innerText = LOGS[3];
          } else {
            logRef.current.innerText = LOGS[4];
          }
        }
      },
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [shouldRender, getLenis]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      aria-label="Carregando portfólio"
      className="fixed inset-0 z-[9990] bg-zinc-950 flex flex-col justify-between p-6 sm:p-12 select-none overflow-hidden no-print"
    >
      {/* Grade sutil de fundo estilo telemetria industrial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem]"
      />

      {/* Topo do Preloader */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-900 border border-emerald-500/40 text-emerald-400 font-bold text-xs shadow-[0_0_10px_rgba(34,197,94,0.3)]">
            LB
          </span>
          <span className="text-zinc-200 tracking-wider uppercase font-semibold">
            Lucas Cabral
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="hidden sm:inline">SYS.BOOT // V16.3</span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span>RIO DE JANEIRO, BR</span>
        </div>
      </div>

      {/* Centro: Contador de Telemetria e Logs */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
        <div className="mb-2">
          <span
            ref={counterRef}
            className="text-7xl sm:text-9xl md:text-[11rem] font-black font-mono tracking-tighter text-white tabular-nums leading-none select-none"
          >
            00%
          </span>
        </div>

        {/* Linha de status dinâmico */}
        <p
          ref={logRef}
          className="text-xs sm:text-sm font-mono text-emerald-400 uppercase tracking-widest h-6 flex items-center justify-center transition-all"
        >
          {LOGS[0]}
        </p>

        {/* Barra de Progresso Neon */}
        <div className="w-full max-w-sm sm:max-w-md h-[2px] bg-white/10 rounded-full overflow-hidden mt-6">
          <div
            ref={progressRef}
            className="h-full w-0 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 shadow-[0_0_12px_rgba(34,197,94,0.9)] rounded-full transition-all"
          />
        </div>
      </div>

      {/* Rodapé do Preloader */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-2 border-t border-white/5 pt-4">
        <span>ENGENHARIA DE SOFTWARE & AUTOMAÇÃO INDUSTRIAL</span>
        <span className="hidden sm:inline text-zinc-400">
          ARQUITETURA REATIVA • ALTA PERFORMANCE
        </span>
      </div>
    </div>
  );
}

