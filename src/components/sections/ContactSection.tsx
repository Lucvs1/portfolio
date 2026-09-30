"use client";

import React, { useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Copy, Check, Mail, Send, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { sound } from "@/lib/sound";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "lucasbezerracontact0@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    sound.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      <div className="relative rounded-3xl bg-zinc-900/50 border border-white/10 p-8 sm:p-14 overflow-hidden backdrop-blur-xl">
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            [04 // Vamos Conversar]
          </span>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Tem um projeto ou oportunidade em mente?
          </h2>

          <p className="text-zinc-400 max-w-xl text-base sm:text-lg mb-10 leading-relaxed">
            Seja para construir uma aplicação web do zero, elevar o nível visual de um produto ou discutir arquitetura de automação, estou sempre aberto a novos desafios.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
            <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-zinc-950/80 border border-white/10 text-sm font-mono text-zinc-300">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>{email}</span>
            </div>

            <MagneticButton
              onClick={handleCopyEmail}
              strength={0.25}
              className={`px-5 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                copied
                  ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20"
                  : "bg-white text-zinc-950 hover:bg-zinc-200"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar E-mail</span>
                </>
              )}
            </MagneticButton>
          </div>

          <div className="flex items-center gap-4">
            <MagneticButton
              asAnchor
              href="https://www.linkedin.com/in/lucas-bezerra-51030b303"
              target="_blank"
              rel="noopener noreferrer"
              strength={0.25}
              className="p-3.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-zinc-300 hover:text-white transition-colors"
              aria-label="Perfil do LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5" />
            </MagneticButton>

            <MagneticButton
              asAnchor
              href="https://github.com/Lucvs1"
              target="_blank"
              rel="noopener noreferrer"
              strength={0.25}
              className="p-3.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-zinc-300 hover:text-white transition-colors"
              aria-label="Perfil do GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </MagneticButton>

            <MagneticButton
              asAnchor
              href={`mailto:${email}`}
              strength={0.25}
              className="p-3.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-zinc-300 hover:text-white transition-colors"
              aria-label="Enviar e-mail diretamente"
            >
              <Send className="w-5 h-5" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

