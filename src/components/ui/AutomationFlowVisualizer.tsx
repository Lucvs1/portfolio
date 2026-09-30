"use client";

import React, { useState } from "react";
import { Cpu, Server, Layout, ArrowRight, Activity, Zap, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/sound";

interface Stage {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  borderColor: string;
  badgeBg: string;
  telemetry: { label: string; value: string };
  specs: string[];
}

const STAGES: Stage[] = [
  {
    id: "industrial",
    name: "Chão de Fábrica & CLP",
    subtitle: "Base Firjan SENAI (2022)",
    icon: Cpu,
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-950/40 text-amber-300 border-amber-500/30",
    telemetry: { label: "Sinal I/O", value: "4-20mA Estável" },
    specs: ["Modbus / Redes Industriais", "Lógica Ladder & Automação", "Tolerância Zero a Falhas"],
  },
  {
    id: "backend",
    name: "Gateway API & Broker",
    subtitle: "Node.js & Infraestrutura",
    icon: Server,
    accentColor: "text-cyan-400",
    borderColor: "border-cyan-500/30 hover:border-cyan-500/60",
    badgeBg: "bg-cyan-950/40 text-cyan-300 border-cyan-500/30",
    telemetry: { label: "Throughput", value: "< 1.5ms Latência" },
    specs: ["Pipelines Assíncronos", "Orquestração Docker", "APIs RESTful Escaláveis"],
  },
  {
    id: "frontend",
    name: "Interface Reativa 60 FPS",
    subtitle: "Next.js 16 & Creative Dev",
    icon: Layout,
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-950/40 text-emerald-300 border-emerald-500/30",
    telemetry: { label: "Taxa de Quadro", value: "60 FPS Custo Zero" },
    specs: ["GSAP + Lenis Smooth", "Design System & Figma", "Acessibilidade & Micro-UX"],
  },
];

export function AutomationFlowVisualizer() {
  const [activeStage, setActiveStage] = useState<string>("backend");

  const handleStageClick = (id: string) => {
    sound.playHover();
    setActiveStage(id);
  };

  return (
    <div className="relative mt-16 rounded-3xl bg-zinc-950/80 border border-white/10 p-6 sm:p-10 overflow-hidden backdrop-blur-2xl shadow-2xl">
      {/* Luz ambiente de circuito integrado */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/10 blur-[80px] rounded-full"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2 mb-1.5">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            [Pipeline Integrado • Engenharia de Automação ➔ Nuvem]
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Da Instrumentação de Campo à Experiência Digital Reativa
          </h3>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Status do Pipeline: Ativo</span>
        </div>
      </div>

      {/* Grid das 3 Etapas com Conectores Animados */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isSelected = activeStage === stage.id;

          return (
            <div
              key={stage.id}
              onClick={() => handleStageClick(stage.id)}
              className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-zinc-900/50 border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? `${stage.borderColor} bg-zinc-900/90 shadow-xl shadow-black/80 scale-[1.02]`
                  : "border-white/10 hover:border-white/20 hover:bg-zinc-900/70"
              }`}
            >
              <div>
                {/* Header do Card */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${stage.accentColor}`} />
                  </div>
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${stage.badgeBg}`}>
                    0{idx + 1} • ETAPA
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mb-1">
                  {stage.name}
                </h4>
                <p className="text-xs text-zinc-400 font-mono mb-4">
                  {stage.subtitle}
                </p>

                {/* Especificações Técnicas */}
                <ul className="space-y-2 mb-6">
                  {stage.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/70 flex-shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Barra de Telemetria Inferior */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">{stage.telemetry.label}</span>
                <span className={`font-semibold ${stage.accentColor}`}>
                  {stage.telemetry.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trilha de Conexão Inferior demonstrando o fluxo contínuo de dados */}
      <div className="relative mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">FLUXO ARQUITETURAL:</span>
          <span>Sinais Físicos</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
          <span>Gateway Assíncrono</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
          <span>Interface Web 60 FPS</span>
        </div>

        <span className="text-[11px] text-zinc-500">
          Engenharia de precisão com experiência do usuário em nível global
        </span>
      </div>
    </div>
  );
}
