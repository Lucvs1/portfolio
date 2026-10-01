"use client";

import React, { useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  Copy,
  Check,
  Send,
  MessageSquare,
  FileText,
  Clock,
  MapPin,
  Sparkles,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { sound } from "@/lib/sound";
import { openResumeModal } from "@/components/ui/ResumeModal";
import { useI18n } from "@/lib/i18n";

export function ContactSection() {
  const { t, language } = useI18n();
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<
    "success" | "unconfigured" | "error" | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");

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

  const openMailtoFallback = () => {
    const mailSubject = encodeURIComponent(
      `[Portfólio] ${formState.subject} - ${formState.name || "Contato"}`
    );
    const mailBody = encodeURIComponent(
      `Olá Lucas,\n\nMeu nome é ${formState.name || "Visitante"} (${
        formState.email || "não informado"
      }).\n\nAssunto: ${formState.subject}\n\nMensagem:\n${
        formState.message
      }\n\nEnviado através do portfólio.`
    );
    window.open(`mailto:${email}?subject=${mailSubject}&body=${mailBody}`, "_blank");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        sound.playSuccess();
        setSubmitResult("success");
        setFormState({
          name: "",
          email: "",
          subject: "Oportunidade de Engenharia de Software",
          message: "",
        });
      } else if (response.status === 501 || data.configured === false) {
        // Servidor ainda não tem RESEND_API_KEY ou SMTP configurado
        sound.playError();
        setSubmitResult("unconfigured");
      } else {
        sound.playError();
        setSubmitResult("error");
        setErrorMessage(data.error || "Ocorreu um erro ao enviar a mensagem.");
      }
    } catch (err: unknown) {
      console.error("[Submit Contact Error]", err);
      sound.playError();
      setSubmitResult("error");
      setErrorMessage(
        language === "pt"
          ? "Erro de conexão com o servidor. Tente novamente ou use o cliente de e-mail."
          : "Server connection error. Please try again or use your email client."
      );
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Tag da seção sincronizada */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            {t.contact.badge}
          </span>
        </div>

        {/* Grid de 2 colunas: Proposta & Formulário */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 relative z-10">
          {/* Coluna da Esquerda: Informações & Autoridade */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
                {t.contact.title}
              </h2>

              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
                {t.contact.subtitle}
              </p>

              {/* Card de Disponibilidade e Telemetria */}
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-white/10 mb-8 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                  </span>
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    {t.contact.statusAvailable}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>Rio de Janeiro, BR</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{t.contact.replyTime}</span>
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
                  className={`px-5 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    copied
                      ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/25"
                      : "bg-white text-zinc-950 hover:bg-zinc-200 shadow-sm"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 shrink-0" />
                      <span>{t.contact.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 shrink-0" />
                      <span>{t.contact.copyEmail}</span>
                    </>
                  )}
                </MagneticButton>

                <MagneticButton
                  onClick={openResumeModal}
                  strength={0.25}
                  className="px-5 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-zinc-800/90 hover:bg-zinc-700/90 border border-white/10 text-white transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.contact.resumeBtn}</span>
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
                    {t.contact.quickDispatchTitle}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  {t.contact.quickDispatchBadge}
                </span>
              </div>

              {/* Estado de Sucesso */}
              {submitResult === "success" && (
                <div className="py-10 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4 text-emerald-400 shadow-[0_0_20px_#10b981]">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {t.contact.successSentTitle}
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-sm mb-6 leading-relaxed">
                    {t.contact.successSentDesc}
                  </p>
                  <button
                    onClick={() => setSubmitResult(null)}
                    className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
                  >
                    {t.contact.sendAnotherBtn}
                  </button>
                </div>
              )}

              {/* Estado de Provedor Não Configurado no Servidor */}
              {submitResult === "unconfigured" && (
                <div className="py-8 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-4 text-amber-400">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {language === "pt"
                      ? "Aviso de Configuração de E-mail"
                      : "Email Provider Setup Notice"}
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-sm mb-4 leading-relaxed font-mono">
                    {t.contact.fallbackConfigNotice}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
                    <button
                      onClick={openMailtoFallback}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t.contact.fallbackEmailBtn}</span>
                    </button>
                    <button
                      onClick={() => setSubmitResult(null)}
                      className="py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
                    >
                      {language === "pt" ? "Voltar ao Formulário" : "Back to Form"}
                    </button>
                  </div>
                </div>
              )}

              {/* Estado de Erro Genérico */}
              {submitResult === "error" && (
                <div className="py-6 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mb-3 text-rose-400">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">
                    {t.contact.errorTitle}
                  </h4>
                  <p className="text-xs text-rose-300 max-w-xs mb-4">
                    {errorMessage}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={openMailtoFallback}
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{t.contact.fallbackEmailBtn}</span>
                    </button>
                    <button
                      onClick={() => setSubmitResult(null)}
                      className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono transition-colors cursor-pointer"
                    >
                      {language === "pt" ? "Tentar Novamente" : "Try Again"}
                    </button>
                  </div>
                </div>
              )}

              {/* Formulário Principal */}
              {submitResult === null && (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      {t.contact.formName} *
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
                      {t.contact.formEmail} *
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
                      {t.contact.inquiryTypeLabel}
                    </label>
                    <select
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState({ ...formState, subject: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono"
                    >
                      <option value={t.contact.inquiryOpt1}>
                        {t.contact.inquiryOpt1}
                      </option>
                      <option value={t.contact.inquiryOpt2}>
                        {t.contact.inquiryOpt2}
                      </option>
                      <option value={t.contact.inquiryOpt3}>
                        {t.contact.inquiryOpt3}
                      </option>
                      <option value={t.contact.inquiryOpt4}>
                        {t.contact.inquiryOpt4}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      {t.contact.formMessage} *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder={t.contact.messagePlaceholder}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{t.contact.sendingEmail}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{t.contact.formSubmit}</span>
                      </>
                    )}
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
