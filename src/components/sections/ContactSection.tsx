"use client";

import React, { useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  Copy,
  Check,
  Mail,
  Send,
  MessageSquare,
  FileText,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { sound } from "@/lib/sound";
import { openResumeModal } from "@/components/ui/ResumeModal";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "Oportunidade de Engenharia de Software",
    message: "",
  });

  const email = "lucasbezerracontact0@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    sound.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim()) return;

    sound.playSuccess();
    setFormSent(true);

    // Constrói link de mailto para envio instantâneo e garantido
    const mailSubject = encodeURIComponent(`[Portfólio] ${formState.subject} - ${formState.name}`);
    const mailBody = encodeURIComponent(
      `Olá Lucas,\n\nMeu nome é ${formState.name} (${formState.email}).\n\nAssunto: ${formState.subject}\n\nMensagem:\n${formState.message}\n\nEnviado através do portfólio.`
    );
    window.open(`mailto:${email}?subject=${mailSubject}&body=${mailBody}`, "_blank");

    setTimeout(() => {
      setFormSent(false);
      setFormState({
        name: "",
        email: "",
        subject: "Oportunidade de Engenharia de Software",
        message: "",
      });
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <div className="relative rounded-3xl bg-zinc-900/40 border border-white/10 p-6 sm:p-12 lg:p-14 overflow-hidden backdrop-blur-xl">
        {/* Glow de fundo */}
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"
        />

        {/* Tag da seção sincronizada com o circuito (05) */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            [05 // Contato & Oportunidades]
          </span>
        </div>

        {/* Grid de 2 colunas: Proposta & Formulário */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 relative z-10">
          {/* Coluna da Esquerda: Informações & Autoridade */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
                Vamos construir algo extraordinário juntos?
              </h2>

              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
                Aberto a posições de Engenharia de Software (Full Stack / Front-end Sênior), contratos de alto impacto e desafios que demandem precisão técnica e padrão visual de classe mundial.
              </p>

              {/* Card de Disponibilidade e Telemetria */}
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-white/10 mb-8 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                  </span>
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    Disponível para novos projetos & contratação
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>Rio de Janeiro, BR</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>Resposta em &lt; 24h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações Rápidas: Copiar e-mail & Abrir Currículo */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <MagneticButton
                  onClick={handleCopyEmail}
                  strength={0.25}
                  className={`px-5 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                    copied
                      ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/25"
                      : "bg-white text-zinc-950 hover:bg-zinc-200 shadow-sm"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 shrink-0" />
                      <span>E-mail Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 shrink-0" />
                      <span>Copiar E-mail</span>
                    </>
                  )}
                </MagneticButton>

                <MagneticButton
                  onClick={openResumeModal}
                  strength={0.25}
                  className="px-5 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-zinc-800/90 hover:bg-zinc-700/90 border border-white/10 text-white transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ver Currículo (CV)</span>
                </MagneticButton>
              </div>

              {/* Redes Sociais */}
              <div className="flex items-center gap-3">
                <MagneticButton
                  asAnchor
                  href="https://www.linkedin.com/in/lucas-bezerra-51030b303"
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.25}
                  className="p-3 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-zinc-300 hover:text-white transition-colors"
                  aria-label="Perfil do LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </MagneticButton>

                <MagneticButton
                  asAnchor
                  href="https://github.com/Lucvs1"
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.25}
                  className="p-3 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-zinc-300 hover:text-white transition-colors"
                  aria-label="Perfil do GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </MagneticButton>

                <MagneticButton
                  asAnchor
                  href={`mailto:${email}`}
                  strength={0.25}
                  className="p-3 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-zinc-300 hover:text-white transition-colors"
                  aria-label="Enviar e-mail diretamente"
                >
                  <Send className="w-4 h-4" />
                </MagneticButton>

                <span className="text-xs font-mono text-zinc-500 pl-2">
                  lucasbezerracontact0@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Coluna da Direita: Formulário de Despacho Rápido */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-zinc-950/70 border border-white/10 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">
                    Despacho Rápido de Mensagem
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  Canal Direto
                </span>
              </div>

              {formSent ? (
                <div className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4 text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    Mensagem Preparada com Sucesso!
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-xs">
                    Seu cliente de e-mail foi acionado com todos os dados preenchidos. Em instantes retorno o contato!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Seu Nome *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Ana Silva"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Seu E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seu.email@empresa.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Tipo de Proposta
                    </label>
                    <select
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState({ ...formState, subject: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono"
                    >
                      <option value="Oportunidade de Engenharia de Software">
                        Oportunidade CLT / PJ (Full Stack / Front-end)
                      </option>
                      <option value="Projeto Web & Creative UI/UX">
                        Desenvolvimento de Projeto Web & UI/UX
                      </option>
                      <option value="Consultoria Técnica & Automação">
                        Consultoria Técnica & Integração de APIs
                      </option>
                      <option value="Bate-papo Profissional">
                        Bate-papo Profissional / Networking
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Mensagem
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Descreva brevemente o projeto, escopo ou detalhes da oportunidade..."
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Despachar Mensagem Direta</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
