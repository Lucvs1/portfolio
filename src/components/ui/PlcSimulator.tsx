"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { sound } from "@/lib/sound";
import { useI18n } from "@/lib/i18n";
import {
  Cpu,
  Power,
  AlertTriangle,
  Play,
  RotateCcw,
  Gauge,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";

export function PlcSimulator() {
  const { t } = useI18n();

  const [isRunning, setIsRunning] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);
  const [unitsProduced, setUnitsProduced] = useState(48);
  const [isSensorTriggered, setIsSensorTriggered] = useState(false);
  const [isPistonActive, setIsPistonActive] = useState(false);
  const [pressure, setPressure] = useState(6.2);
  const [scanTime, setScanTime] = useState(0.85);
  const [partPosition, setPartPosition] = useState(20); // 0 to 100%

  const animRef = useRef<number | null>(null);

  // Ação de inspeção / estampagem pneumática
  const triggerInspection = useCallback(() => {
    setIsSensorTriggered(true);
    setIsPistonActive(true);
    sound.playClick();

    setTimeout(() => {
      setIsPistonActive(false);
      setUnitsProduced((prev) => prev + 1);
      sound.playSuccess();
    }, 350);

    setTimeout(() => {
      setIsSensorTriggered(false);
    }, 700);
  }, []);

  // Ciclo da esteira rolante e telemetria
  useEffect(() => {
    if (!isRunning || isEmergency) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    let currentPos = partPosition;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Movimenta a peça na esteira
      currentPos += delta * 25; // velocidade
      if (currentPos >= 100) {
        currentPos = 0;
      }

      setPartPosition(currentPos);

      // Gatilho do sensor óptico em ~50%
      if (currentPos >= 48 && currentPos <= 54 && !isSensorTriggered) {
        triggerInspection();
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isRunning, isEmergency, isSensorTriggered, partPosition, triggerInspection]);

  // Variação orgânica da pressão e tempo de scan do CLP
  useEffect(() => {
    if (isEmergency) return;

    const interval = setInterval(() => {
      setPressure(Number((6.1 + Math.random() * 0.25).toFixed(2)));
      setScanTime(Number((0.82 + Math.random() * 0.08).toFixed(2)));
    }, 1200);

    return () => clearInterval(interval);
  }, [isEmergency]);

  // Iniciar esteira
  const handleStart = () => {
    if (isEmergency) {
      sound.playError();
      return;
    }
    sound.playClick();
    setIsRunning(true);
  };

  // Parar esteira
  const handleStop = () => {
    sound.playClick();
    setIsRunning(false);
  };

  // Gatilho manual de peça / sensor
  const handleManualSensor = () => {
    if (isEmergency) {
      sound.playError();
      return;
    }
    sound.playClick();
    triggerInspection();
  };

  // Parada de Emergência (E-STOP)
  const handleEmergencyStop = () => {
    sound.playError();
    setIsEmergency(true);
    setIsRunning(false);
    setIsPistonActive(false);
    setIsSensorTriggered(false);
  };

  // Reset do Alarme de Emergência
  const handleReset = () => {
    sound.playClick();
    setIsEmergency(false);
  };

  return (
    <div className="relative rounded-2xl bg-zinc-950/90 border border-zinc-700/50 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Top Header do Painel Industrial */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center text-emerald-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-white tracking-wider">
                {t.simulator.controllerModel}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono">
                SENAI LAB
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono">
              MODBUS TCP • SCAN 1ms • 24V DC ISOLATED
            </p>
          </div>
        </div>

        {/* LEDs de Diagnóstico do CLP */}
        <div className="flex items-center gap-4 text-[10px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span className="text-zinc-300">PWR</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                isRunning && !isEmergency
                  ? "bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"
                  : "bg-zinc-700"
              }`}
            />
            <span className="text-zinc-300">RUN</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                isEmergency
                  ? "bg-rose-500 shadow-[0_0_10px_#f43f5e] animate-ping"
                  : "bg-zinc-700"
              }`}
            />
            <span className="text-zinc-300">ALM</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full transition-all duration-150 ${
                isSensorTriggered
                  ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                  : "bg-zinc-700"
              }`}
            />
            <span className="text-zinc-300">I/O</span>
          </div>
        </div>
      </div>

      {/* Banner de Parada de Emergência */}
      {isEmergency && (
        <div className="bg-rose-950/80 border-b border-rose-500/40 px-4 py-2 flex items-center justify-center gap-2 text-rose-300 text-xs font-mono font-bold animate-pulse text-center">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{t.simulator.emergencyBanner}</span>
        </div>
      )}

      {/* Área Central: Visualizador Gráfico da Célula Fabril */}
      <div className="p-5 sm:p-7 space-y-6">
        <div className="relative rounded-xl bg-zinc-900/60 border border-white/10 p-6 overflow-hidden">
          {/* Título da Área da Célula */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-6 border-b border-white/5 pb-2">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.simulator.conveyorLabel}</span>
            </span>
            <span
              className={`font-bold ${
                isEmergency
                  ? "text-rose-400"
                  : isRunning
                  ? "text-emerald-400"
                  : "text-zinc-500"
              }`}
            >
              {isEmergency
                ? t.simulator.statusEmergency
                : isRunning
                ? t.simulator.statusRunning
                : t.simulator.statusStopped}
            </span>
          </div>

          {/* Gráfico da Linha de Montagem / Esteira */}
          <div className="relative h-32 flex items-center justify-center">
            {/* Feixe laser óptico vertical do sensor (posicionado no centro 50%) */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 flex flex-col items-center pointer-events-none z-10">
              <span
                className={`w-3 h-3 rounded-full border mb-1 transition-all ${
                  isSensorTriggered
                    ? "bg-cyan-400 border-cyan-300 shadow-[0_0_12px_#22d3ee]"
                    : "bg-zinc-700 border-zinc-600"
                }`}
                title={t.simulator.sensorLabel}
              />
              <div
                className={`w-full flex-1 transition-opacity ${
                  isSensorTriggered
                    ? "bg-cyan-400 opacity-90 shadow-[0_0_8px_#22d3ee]"
                    : "bg-cyan-500/20 opacity-30"
                }`}
              />
              <span className="text-[9px] font-mono text-cyan-400 mt-1 whitespace-nowrap">
                B1 [SENSOR]
              </span>
            </div>

            {/* Cilindro / Pistão Estampador Pneumático */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
              <div className="w-7 h-4 bg-zinc-800 border border-zinc-600 rounded-t-sm" />
              <div
                className={`w-3 bg-gradient-to-b from-zinc-400 to-zinc-200 border-x border-zinc-600 transition-all duration-150 ${
                  isPistonActive ? "h-14" : "h-3"
                }`}
              />
              <div
                className={`w-10 h-2.5 rounded-sm transition-all duration-150 flex items-center justify-center ${
                  isPistonActive
                    ? "bg-amber-400 shadow-[0_0_12px_#fbbf24]"
                    : "bg-zinc-700 border border-zinc-600"
                }`}
              >
                {isPistonActive && <Sparkles className="w-2.5 h-2.5 text-zinc-950 animate-spin" />}
              </div>
            </div>

            {/* A Esteira Transportadora Física */}
            <div className="relative w-full h-12 rounded-lg bg-zinc-950 border-2 border-zinc-800 flex items-center overflow-hidden shadow-inner">
              {/* Listras em movimento contínuo da esteira rolante */}
              <div
                className={`absolute inset-0 bg-[repeating-linear-gradient(45deg,#27272a,#27272a_10px,#18181b_10px,#18181b_20px)] opacity-50 ${
                  isRunning && !isEmergency ? "animate-[pulse_1s_infinite]" : ""
                }`}
              />

              {/* Peça metálica deslizando na esteira */}
              <div
                style={{ left: `${partPosition}%` }}
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-7 rounded-md border transition-shadow duration-150 flex items-center justify-center font-mono text-[9px] font-bold ${
                  isSensorTriggered
                    ? "bg-emerald-500 text-zinc-950 border-white shadow-[0_0_14px_#10b981]"
                    : "bg-zinc-800 text-zinc-200 border-zinc-600 shadow-md"
                }`}
              >
                P-{unitsProduced}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard de Telemetria Industrial SCADA */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="p-3 rounded-xl bg-zinc-900/70 border border-white/5 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400" />
              {t.simulator.unitsProduced}
            </span>
            <p className="text-xl font-bold text-white">{unitsProduced}</p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/70 border border-white/5 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase flex items-center gap-1">
              <Gauge className="w-3 h-3 text-cyan-400" />
              {t.simulator.pressure}
            </span>
            <p className="text-xl font-bold text-cyan-400">
              {isEmergency ? "0.0" : pressure} <span className="text-xs font-normal text-zinc-400">bar</span>
            </p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/70 border border-white/5 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase flex items-center gap-1">
              <Cpu className="w-3 h-3 text-amber-400" />
              {t.simulator.scanTime}
            </span>
            <p className="text-xl font-bold text-amber-400">
              {scanTime} <span className="text-xs font-normal text-zinc-400">ms</span>
            </p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/70 border border-white/5 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase flex items-center gap-1">
              <Power className="w-3 h-3 text-emerald-400" />
              {t.simulator.efficiency}
            </span>
            <p className="text-xl font-bold text-emerald-400">
              {isEmergency ? "0.0%" : "99.4%"}
            </p>
          </div>
        </div>

        {/* Botoeira Operacional Chão de Fábrica */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Botão S1 - Iniciar */}
            {!isRunning ? (
              <button
                onClick={handleStart}
                disabled={isEmergency}
                className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-emerald-500/10 active:scale-95"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{t.simulator.btnStart}</span>
              </button>
            ) : (
              <button
                onClick={handleStop}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-600 text-xs font-mono font-semibold transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Power className="w-3.5 h-3.5" />
                <span>{t.simulator.btnStop}</span>
              </button>
            )}

            {/* Botão B1 - Acionamento Manual de Peça */}
            <button
              onClick={handleManualSensor}
              disabled={isEmergency}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-medium transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.simulator.btnSensor}</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Botão E-STOP - Cogumelo de Emergência */}
            <button
              onClick={handleEmergencyStop}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-rose-600/30 active:scale-95 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{t.simulator.btnEstop}</span>
            </button>

            {/* Botão Resetar Alarme */}
            {isEmergency && (
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-semibold transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.simulator.btnReset}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
