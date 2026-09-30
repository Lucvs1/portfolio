"use client";

import React, { useSyncExternalStore } from "react";
import { sound } from "@/lib/sound";
import { Volume2, VolumeX } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

function subscribeSound(cb: () => void) {
  return sound.subscribe(cb);
}

function getSoundSnapshot() {
  return sound.isEnabled();
}

function getSoundServerSnapshot() {
  return false;
}

export function SoundToggle() {
  const enabled = useSyncExternalStore(
    subscribeSound,
    getSoundSnapshot,
    getSoundServerSnapshot
  );

  const handleToggle = () => {
    sound.toggle();
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <MagneticButton
        onClick={handleToggle}
        strength={0.3}
        aria-label={enabled ? "Desativar efeitos sonoros" : "Ativar efeitos sonoros táteis"}
        className={`group flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all duration-300 backdrop-blur-xl ${
          enabled
            ? "bg-zinc-900/90 border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/10"
            : "bg-zinc-950/70 border-white/10 text-zinc-500 hover:text-zinc-300 hover:border-white/20"
        }`}
      >
        {enabled ? (
          <Volume2 className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
        )}
        <span className="text-[11px] font-mono tracking-wider uppercase hidden sm:inline-block">
          {enabled ? "Som Ativo" : "Mudo"}
        </span>
      </MagneticButton>
    </div>
  );
}
