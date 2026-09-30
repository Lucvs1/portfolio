"use client";

import React, { useState, useEffect } from "react";
import { Clock, MapPin } from "lucide-react";

export function LiveStatusWidget() {
  const [timeString, setTimeString] = useState<string>("");
  const [status, setStatus] = useState<{
    text: string;
    shortText: string;
    color: string;
    pingColor: string;
  }>({
    text: "Disponível para contato",
    shortText: "Disponível",
    color: "text-emerald-400",
    pingColor: "bg-emerald-400",
  });

  useEffect(() => {
    const updateTimeAndStatus = () => {
      const now = new Date();

      // Formatação no fuso horário do Rio de Janeiro (UTC-3)
      const formatter = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const rioTime = formatter.format(now);
      setTimeString(rioTime);

      // Determina status com base na hora local do Rio
      const hourFormatter = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "numeric",
        hour12: false,
      });
      const hour = parseInt(hourFormatter.format(now), 10);

      if (hour >= 9 && hour < 19) {
        setStatus({
          text: "Disponível para contato",
          shortText: "Disponível",
          color: "text-emerald-400",
          pingColor: "bg-emerald-400",
        });
      } else if (hour >= 19 && hour < 24) {
        setStatus({
          text: "Modo Dev / Deep Focus",
          shortText: "Modo Dev",
          color: "text-cyan-400",
          pingColor: "bg-cyan-400",
        });
      } else {
        setStatus({
          text: "Standby / Noturno",
          shortText: "Standby",
          color: "text-amber-400",
          pingColor: "bg-amber-400",
        });
      }
    };

    updateTimeAndStatus();
    const interval = setInterval(updateTimeAndStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-[11px] font-mono text-zinc-300 backdrop-blur-md whitespace-nowrap shrink-0 select-none shadow-sm"
      title={`Rio de Janeiro (UTC-3) • ${status.text}`}
    >
      <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status.pingColor}`}
          />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${status.pingColor}`} />
        </span>
        <span className={`font-semibold ${status.color} whitespace-nowrap`}>
          <span className="hidden xl:inline">{status.text}</span>
          <span className="xl:hidden">{status.shortText}</span>
        </span>
      </div>

      <span className="text-zinc-600 select-none hidden lg:inline">•</span>

      <div className="hidden lg:flex items-center gap-1 text-zinc-400 whitespace-nowrap font-medium">
        <span className="text-zinc-500">RJ:</span>
        <span className="text-zinc-200 tabular-nums font-semibold">
          {timeString || "--:--:--"}
        </span>
      </div>
    </div>
  );
}
