"use client";

import React, { useState } from "react";
import { Cpu, Server, Layout, ArrowRight, Activity, Zap, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/sound";
import { useI18n } from "@/lib/i18n";

export function AutomationFlowVisualizer() {
  const { t } = useI18n();
  const [activeStage, setActiveStage] = useState<string>("backend");

  const handleStageClick = (id: string) => {
    sound.playHover();
    setActiveStage(id);
  };

  const stages = [
    {
      id: "industrial",
      name: t.about.stage1Name,
      subtitle: t.about.stage1Subtitle,
      icon: Cpu,
      accentColor: "text-amber-400",
      borderColor: "border-amber-500/30 hover:border-amber-500/60",
      badgeBg: "bg-amber-950/40 text-amber-300 border-amber-500/30",
      telemetry: {
        label: t.about.stage1TelemetryLabel,
        value: t.about.stage1TelemetryValue,
      },
      specs: t.about.stage1Specs,
    },
    {
      id: "backend",
      name: t.about.stage2Name,
      subtitle: t.about.stage2Subtitle,
      icon: Server,
      accentColor: "text-cyan-400",
      borderColor: "border-cyan-500/30 hover:border-cyan-500/60",
      badgeBg: "bg-cyan-950/40 text-cyan-300 border-cyan-500/30",
      telemetry: {
        label: t.about.stage2TelemetryLabel,
        value: t.about.stage2TelemetryValue,
      },
      specs: t.about.stage2Specs,
    },
    {
      id: "frontend",
      name: t.about.stage3Name,
      subtitle: t.about.stage3Subtitle,
      icon: Layout,
      accentColor: "text-emerald-400",
      borderColor: "border-emerald-500/30 hover:border-emerald-500/60",
      badgeBg: "bg-emerald-950/40 text-emerald-300 border-emerald-500/30",
      telemetry: {
        label: t.about.stage3TelemetryLabel,
        value: t.about.stage3TelemetryValue,
      },
      specs: t.about.stage3Specs,
    },
  ];

  return (
    <div className="relative mt-8 rounded-3xl bg-zinc-950/80 border border-white/10 p-6 sm:p-10 overflow-hidden backdrop-blur-2xl shadow-2xl">
      {/* Luz ambiente de circuito integrado */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/10 blur-[80px] rounded-full"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2 mb-1.5">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            {t.about.flowBadge}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t.about.flowTitle}
          </h3>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.about.pipelineStatus}</span>
        </div>
      </div>

      {/* Grid das 3 Etapas com Conectores Animados */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {stages.map((stage, idx) => {
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
                    0{idx + 1} • {t.about.stageLabel}
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
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-emerald-400 font-bold">{t.about.flowTrailLabel}</span>
          <span>{t.about.flowTrailStep1}</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
          <span>{t.about.flowTrailStep2}</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
          <span>{t.about.flowTrailStep3}</span>
        </div>

        <span className="text-[11px] text-zinc-500">
          {t.about.flowTrailFooter}
        </span>
      </div>
    </div>
  );
}
