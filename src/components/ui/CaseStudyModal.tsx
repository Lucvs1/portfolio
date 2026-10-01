"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { sound } from "@/lib/sound";
import { useI18n } from "@/lib/i18n";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import {
  X,
  Target,
  Cpu,
  BarChart3,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Layers,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export interface CaseStudyData {
  id: string;
  title: string;
  subtitle: { pt: string; en: string };
  badge: { pt: string; en: string };
  accentColor: string;
  gradient: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  challenge: {
    pt: string;
    en: string;
    points: { pt: string[]; en: string[] };
  };
  architecture: {
    pt: string;
    en: string;
    techDecisions: { title: { pt: string; en: string }; desc: { pt: string; en: string } }[];
  };
  metrics: {
    value: string;
    label: { pt: string; en: string };
    sublabel: { pt: string; en: string };
  }[];
}

export const CASE_STUDIES: Record<string, CaseStudyData> = {
  "rota-bgr": {
    id: "rota-bgr",
    title: "ROTA BGR",
    subtitle: {
      pt: "Corporação Tática RP (GTA SA / MTA) • Painel Admin & Automação de Recrutamento",
      en: "Tactical Police RP Corporation (GTA SA / MTA) • Admin Panel & Recruitment Automation",
    },
    badge: {
      pt: "Plataforma em Produção",
      en: "Live Web Platform",
    },
    accentColor: "text-emerald-400",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    liveUrl: "https://rotabgr.vercel.app/",
    tags: ["React / Next.js", "Painel Admin", "MTA / GTA RP", "Discord Webhooks", "Geração de PDF", "Tailwind CSS"],
    challenge: {
      pt: "A corporação tática do servidor de GTA San Andreas / MTA necessitava de uma plataforma institucional de elite para apresentar sua estrutura militar (viaturas personalizadas, fardas da unidade, quadro do Alto Comando e galeria de veteranos Legends). Além disso, a gestão de recrutamentos gerava sobrecarga extrema: os alistamentos precisavam ser avaliados, corrigidos e arquivados manualmente pela banca examinadora.",
      en: "The tactical police corporation on the GTA San Andreas / MTA server needed an elite institutional platform showcasing its military structure (custom vehicle fleet, unit uniforms, High Command officers, and Legends veteran memorial). Additionally, manual recruitment reviews created massive operational bottlenecks for commanding officers.",
      points: {
        pt: [
          "Apresentação visual imersiva com catálogo de viaturas táticas, fardamentos da corporação, quadro do Alto Comando e memorial de membros Legends.",
          "Painel de Administração completo para gerenciar operações em tempo real, editar membros do Alto Comando e Legends.",
          "Controle dinâmico de recrutamento: o administrador abre e fecha o formulário de alistamento com um clique no painel.",
          "Automação no envio: ao submeter o formulário, a plataforma calcula a quantidade de acertos e erros do candidato e dispara um Webhook para o Discord da corporação.",
          "Geração dinâmica de PDF completo contendo todas as perguntas e respostas do candidato para análise e arquivo da banca examinadora.",
        ],
        en: [
          "Immersive visual catalog showcasing tactical patrol vehicles, custom uniforms, High Command officers, and inactive Legends veterans.",
          "Comprehensive Admin Dashboard to configure operations in real time, manage High Command members, and update Legends rosters.",
          "Dynamic recruitment controller: administrators can open or close application form access with a single click.",
          "Submission automation: evaluates exam results, calculating correct and incorrect answers, and fires instant Discord Webhook notifications.",
          "Server-side dynamic PDF generation containing full candidate questions and answers for commanding officers to audit.",
        ],
      },
    },
    architecture: {
      pt: "Desenvolvido com arquitetura moderna combinando Next.js, controle de acesso administrativo e pipeline automatizado de formulários. O fluxo de recrutamento valida os dados no servidor, computa o gabarito teórico, formata um embed enriquecido para o canal da corregedoria no Discord e gera um arquivo PDF completo para download e registro histórico.",
      en: "Architected with Next.js, role-based administrative controls, and an automated form pipeline. The recruitment engine validates submissions server-side, scores candidate answers, formats rich embeds for the Discord command staff, and compiles a comprehensive PDF dossier for historical filing.",
      techDecisions: [
        {
          title: { pt: "Painel Admin Centralizado", en: "Centralized Admin Dashboard" },
          desc: {
            pt: "Gestão completa de operações, cadastro do Alto Comando, memorial dos Legends e controle instantâneo de abertura/fechamento do alistamento.",
            en: "Comprehensive management of corporative operations, High Command members, Legends hall, and instant recruitment form toggling.",
          },
        },
        {
          title: { pt: "Automação com Discord Webhooks", en: "Discord Webhook Automation" },
          desc: {
            pt: "Notificação imediata no Discord da corporação com dados do candidato, nota de aprovação e contagem precisa de acertos e erros.",
            en: "Instant Discord notifications detailing candidate info, score grading, and precise correct/incorrect answer tallies.",
          },
        },
        {
          title: { pt: "Geração Dinâmica de Dossiê em PDF", en: "Dynamic PDF Dossier Generation" },
          desc: {
            pt: "Compilação automatizada da prova do candidato em PDF para análise detalhada da banca examinadora e arquivamento oficial.",
            en: "Automated exam transcription into standardized PDF documents for official grading and archival by staff officers.",
          },
        },
      ],
    },
    metrics: [
      {
        value: "100%",
        label: { pt: "Automação no Recrutamento", en: "Recruitment Automation" },
        sublabel: { pt: "Envio de webhook e dossiê em PDF", en: "Instant webhook & dynamic PDF" },
      },
      {
        value: "0 ms",
        label: { pt: "Atraso no Alistamento", en: "Application Latency" },
        sublabel: { pt: "Disponibilidade imediata no Discord", en: "Immediate Discord notification" },
      },
      {
        value: "100%",
        label: { pt: "Painel Responsivo", en: "Responsive Admin" },
        sublabel: { pt: "Gestão completa de efetivo e operações", en: "Full operations and staff management" },
      },
    ],
  },
  "cantinho-da-cigana": {
    id: "cantinho-da-cigana",
    title: "Cantinho da Cigana",
    subtitle: {
      pt: "E-Commerce Cultural & Plataforma com Foco em Leitura de Baralho Cigano",
      en: "Cultural E-Commerce & Platform Centered on Gypsy Tarot Readings",
    },
    badge: {
      pt: "Plataforma Comercial Ativa",
      en: "Live Commercial Platform",
    },
    accentColor: "text-amber-400",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    liveUrl: "https://cantinhodacigana.com/",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Baralho Cigano", "Cultura Cigana", "E-commerce", "Agendamento", "UI/UX"],
    challenge: {
      pt: "Criar uma plataforma digital acolhedora e de alta fidelidade que apresentasse e honrasse a tradição e cultura cigana, enquanto estruturava uma experiência fluida de e-commerce e agendamento voltada ao principal carro-chefe da cliente: o atendimento e Leitura de Baralho Cigano.",
      en: "Build a captivating, high-fidelity digital platform honoring Gypsy traditions and cultural heritage, while crafting an intuitive e-commerce and booking experience centered on the client's flagship service: personalized Gypsy Tarot (Baralho Cigano) readings.",
      points: {
        pt: [
          "Evidenciar a Leitura de Baralho Cigano como serviço central de autoridade e principal transformador para os consulentes.",
          "Divulgar a cultura e essência cigana com linguagem visual mística, respeitosa e cinematográfica.",
          "Disponibilizar conteúdos educativos, histórias e catálogo de artigos exclusivos da tradição cigana.",
          "Processo de compra e agendamento claro, com alta conversão e excelente usabilidade mobile.",
        ],
        en: [
          "Spotlight Gypsy Tarot Readings as the client's primary high-authority transformative service.",
          "Showcase Gypsy heritage through a mystical, culturally authentic, and captivating visual identity.",
          "Provide educational cultural content, narratives, and a curated catalog of authentic items.",
          "Deliver an effortless purchasing and consultation booking flow optimized for mobile conversions.",
        ],
      },
    },
    architecture: {
      pt: "Desenvolvido com Next.js e Tailwind CSS estruturado em uma identidade visual personalizada 'Dark Obsidian' com acentos âmbar e dourados. O design system prioriza a jornada de agendamento de consultas de baralho cigano e a imersão nos conteúdos culturais, alcançando carregamento instantâneo no Core Web Vitals.",
      en: "Engineered with Next.js and Tailwind CSS built around a bespoke 'Dark Obsidian' design system accented with warm amber and gold tones. The architecture prioritizes the booking funnel for tarot consultations and cultural discovery, achieving sub-second load times.",
      techDecisions: [
        {
          title: { pt: "Foco no Carro-Chefe (Baralho Cigano)", en: "Flagship Focus (Gypsy Tarot)" },
          desc: {
            pt: "Hierarquia visual e funil de conversão planejados para direcionar consulentes ao agendamento de leituras personalizadas de baralho.",
            en: "Visual hierarchy and conversion funnels strategically arranged to guide clients to book personalized tarot sessions.",
          },
        },
        {
          title: { pt: "Imersão Cultural & Branding Místico", en: "Cultural Immersion & Mystical Branding" },
          desc: {
            pt: "Design imersivo que desmistifica a tradição cigana com respeito, beleza estética e conexão humana profunda.",
            en: "Atmospheric design demystifying Gypsy traditions with cultural authenticity, aesthetic elegance, and emotional warmth.",
          },
        },
        {
          title: { pt: "Performance Mobile Otimizada", en: "Mobile-First Performance" },
          desc: {
            pt: "Otimização refinada de mídias e layout responsivo garantindo leitura fluida e carregamento rápido mesmo em conexões móveis 4G.",
            en: "Optimized media delivery and responsive layout ensuring smooth navigation and fast load speeds on mobile networks.",
          },
        },
      ],
    },
    metrics: [
      {
        value: "1º",
        label: { pt: "Carro-Chefe da Plataforma", en: "Flagship Offering" },
        sublabel: { pt: "Leitura de Baralho Cigano", en: "Gypsy Tarot Readings" },
      },
      {
        value: "98+",
        label: { pt: "PageSpeed Insights", en: "PageSpeed Score" },
        sublabel: { pt: "Performance mobile de elite", en: "Elite mobile speed" },
      },
      {
        value: "< 800ms",
        label: { pt: "Carregamento Inicial", en: "First Contentful Paint" },
        sublabel: { pt: "Navegação ágil e confiável", en: "Fast and reliable browsing" },
      },
    ],
  },
  "bot-gateway-pro": {
    id: "bot-gateway-pro",
    title: "Bot Gateway Pro",
    subtitle: {
      pt: "Bot de Discord para Pagamentos Automatizados via PIX, Cartão e Cripto",
      en: "Discord Automated Payment Bot via PIX (Mercado Pago), Credit/Debit & Crypto (Stripe)",
    },
    badge: {
      pt: "Bot em Produção (Dados Mockados)",
      en: "Production Bot (Mocked Data)",
    },
    accentColor: "text-blue-400",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    githubUrl: "https://github.com/Lucvs1/bot-gateway-pro",
    tags: ["Discord.js", "Node.js", "Mercado Pago SDK", "Stripe API", "Webhooks", "Automação", "PIX", "Cripto"],
    challenge: {
      pt: "Servidores e comunidades no Discord necessitavam monetizar produtos e assinaturas com checkout 100% nativo dentro do próprio Discord: receber pagamentos instantâneos via PIX (Mercado Pago) e Cartão de Crédito/Débito e Criptomoedas (Stripe), entregando automaticamente o cargo de cliente no servidor e despachando os conteúdos adquiridos logo após a confirmação. O bot foi desenvolvido com arquitetura robusta de produção e opera com dados mockados para exibição pública e segura de portfólio.",
      en: "Discord servers and communities needed a seamless in-app monetization engine: accept instant domestic PIX payments (Mercado Pago) alongside global Credit/Debit/Crypto payments (Stripe) inside Discord, with automated role granting and instant digital content delivery in DMs post-purchase. The bot is production-engineered and utilizes mocked datasets for safe portfolio showcase.",
      points: {
        pt: [
          "Checkout nativo e intuitivo dentro do Discord através de comandos e botões interativos.",
          "Múltiplos gateways: PIX instantâneo com confirmação via Mercado Pago e Cartão/Cripto com Stripe.",
          "Automação pós-venda: concessão imediata do cargo do comprador no servidor do Discord.",
          "Despacho automatizado do conteúdo ou arquivos comprados diretamente no chat privado (DM) do usuário.",
          "Arquitetura tolerante a falhas testada em produção, configurada com dados mockados para demonstração pública segura.",
        ],
        en: [
          "Native, intuitive Discord checkout experience utilizing slash commands and interactive buttons.",
          "Multi-gateway processing: instant QR Code PIX with Mercado Pago plus Credit/Debit/Crypto via Stripe.",
          "Post-sale automation: immediate buyer role assignment in the Discord server.",
          "Automated digital product delivery dispatched directly into the customer's private DMs.",
          "Fault-tolerant production architecture configured with sanitized mock data for safe public showcase.",
        ],
      },
    },
    architecture: {
      pt: "Construído em Node.js com Discord.js conectado a Webhooks de pagamento do Mercado Pago e da Stripe. Ao receber o evento de pagamento aprovado, o bot dispara o pipeline de fulfillment: interage com a API do Discord para atribuir a role e realiza o despacho seguro dos conteúdos comprados no chat privado do comprador, com tratamento robusto de erros e rate-limits.",
      en: "Engineered in Node.js using Discord.js connected to payment webhooks from Mercado Pago and Stripe. Upon receiving payment approval events, the bot initiates an automated fulfillment pipeline: communicating with the Discord API to grant roles and securely dispatching purchased assets via private DMs with robust rate-limit handling.",
      techDecisions: [
        {
          title: { pt: "Integração Híbrida Mercado Pago + Stripe", en: "Mercado Pago + Stripe Hybrid" },
          desc: {
            pt: "Combinação do ecossistema Mercado Pago para PIX nacional dinâmico com Stripe para pagamentos internacionais em cartão e cripto.",
            en: "Unified integration combining Mercado Pago for domestic dynamic PIX and Stripe for global credit card and crypto processing.",
          },
        },
        {
          title: { pt: "Entrega Automatizada de Cargos & Conteúdo", en: "Automated Role & Asset Delivery" },
          desc: {
            pt: "Atribuição instantânea de cargos no Discord e envio automático dos arquivos/links no privado do comprador após a aprovação da transação.",
            en: "Instant Discord role provisioning and automated asset dispatch to the buyer's DMs upon transaction approval.",
          },
        },
        {
          title: { pt: "Arquitetura Pronta com Dados Mockados", en: "Production Engine with Mock Data" },
          desc: {
            pt: "Código estruturado e testado em produção, configurado com catálogo e dados mockados para exibição pública e segura no portfólio.",
            en: "Fully battle-tested production codebase configured with mock product catalogs and demo transactions for safe public display.",
          },
        },
      ],
    },
    metrics: [
      {
        value: "< 1s",
        label: { pt: "Entrega do Cargo", en: "Role Assignment" },
        sublabel: { pt: "Atribuição imediata no Discord", en: "Immediate guild role update" },
      },
      {
        value: "2 em 1",
        label: { pt: "Gateways Integrados", en: "Integrated Gateways" },
        sublabel: { pt: "PIX, Cartão e Criptomoedas", en: "PIX, Card & Crypto" },
      },
      {
        value: "100%",
        label: { pt: "Automação Pós-Venda", en: "Post-Sale Automation" },
        sublabel: { pt: "Despacho de conteúdo sem ação manual", en: "Zero-touch content delivery" },
      },
    ],
  },
};

export function openCaseStudyModal(projectId: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-case-study", { detail: { projectId } })
    );
  }
}

export function CaseStudyModal() {
  const { language } = useI18n();
  const { getLenis } = useSmoothScroll();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<CaseStudyData | null>(null);
  const [activeTab, setActiveTab] = useState<"challenge" | "architecture" | "metrics">("challenge");

  const modalRef = useRef<HTMLDivElement | null>(null);

  // Escuta o disparo global do modal
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ projectId: string }>;
      const projectId = customEvent.detail?.projectId;
      const project = CASE_STUDIES[projectId] || CASE_STUDIES["rota-bgr"];

      setSelectedProject(project);
      setActiveTab("challenge");
      setIsOpen(true);
      sound.playSuccess();
    };

    window.addEventListener("open-case-study", handleOpen);
    return () => window.removeEventListener("open-case-study", handleOpen);
  }, []);

  // Bloqueio do Lenis smooth scroll enquanto o modal estiver aberto
  useEffect(() => {
    const lenis = getLenis();
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [isOpen, getLenis]);

  const closeModal = useCallback(() => {
    sound.playClick();
    setIsOpen(false);
  }, []);

  // Fechar com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen || !selectedProject) return null;

  const lang = language;

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-zinc-950/95 border border-white/15 shadow-2xl overflow-hidden backdrop-blur-2xl"
      >
        {/* Top Header do Modal */}
        <div className="relative px-6 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between gap-4 bg-gradient-to-r from-zinc-900/90 to-zinc-950 select-none">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                {selectedProject.badge[lang]}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs font-mono text-zinc-400">Case Study</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {selectedProject.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              {selectedProject.subtitle[lang]}
            </p>
          </div>

          <button
            onClick={closeModal}
            className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Fechar Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas de Navegação do Case Study */}
        <div className="px-6 sm:px-8 py-3 bg-zinc-900/50 border-b border-white/5 flex items-center gap-2 overflow-x-auto select-none scrollbar-none">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab("challenge");
            }}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === "challenge"
                ? "bg-white text-zinc-950 shadow-md font-semibold"
                : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 border border-white/5"
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>{lang === "pt" ? "O Desafio" : "The Challenge"}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab("architecture");
            }}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === "architecture"
                ? "bg-white text-zinc-950 shadow-md font-semibold"
                : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 border border-white/5"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{lang === "pt" ? "Arquitetura & Stack" : "Architecture & Stack"}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab("metrics");
            }}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === "metrics"
                ? "bg-white text-zinc-950 shadow-md font-semibold"
                : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 border border-white/5"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{lang === "pt" ? "Métricas & Resultados" : "Metrics & ROI"}</span>
          </button>
        </div>

        {/* Corpo Scrollável do Case Study */}
        <div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-sm text-zinc-300 leading-relaxed scrollbar-thin scrollbar-thumb-zinc-700"
        >
          {/* Aba: O Desafio */}
          {activeTab === "challenge" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                <span className="text-xs font-mono uppercase text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <Target className="w-4 h-4" />
                  {lang === "pt" ? "Problema de Negócio & Escopo" : "Business Challenge & Scope"}
                </span>
                <p className="text-base text-zinc-200 font-normal leading-relaxed">
                  {selectedProject.challenge[lang]}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  {lang === "pt" ? "Principais Obstáculos Superados:" : "Key Technical Bottlenecks Resolved:"}
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedProject.challenge.points[lang].map((point, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-zinc-900/40 border border-white/5 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-zinc-300">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-zinc-400">
                  {lang === "pt" ? "Stack Empregada:" : "Tech Stack:"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-md bg-zinc-800/80 border border-white/10 font-mono text-xs text-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Aba: Arquitetura & Stack */}
          {activeTab === "architecture" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                <span className="text-xs font-mono uppercase text-cyan-400 flex items-center gap-1.5 font-semibold">
                  <Layers className="w-4 h-4" />
                  {lang === "pt" ? "Visão Geral da Arquitetura" : "Architectural Blueprint"}
                </span>
                <p className="text-base text-zinc-200 font-normal leading-relaxed">
                  {selectedProject.architecture[lang]}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedProject.architecture.techDecisions.map((decision, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-white font-mono block">
                        {decision.title[lang]}
                      </span>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        {decision.desc[lang]}
                      </p>
                    </div>
                    <div className="pt-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 opacity-60" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Aba: Métricas & Resultados */}
          {activeTab === "metrics" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedProject.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-white/10 flex flex-col items-center text-center justify-center space-y-2 min-w-0 overflow-hidden"
                  >
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-emerald-400 tracking-tight break-words max-w-full text-center">
                      {metric.value}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {metric.label[lang]}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      {metric.sublabel[lang]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  {lang === "pt"
                    ? "Projeto validado em ambiente de produção com zero chamados de indisponibilidade de infraestrutura."
                    : "Production-validated release maintaining zero infrastructure downtime incidents."}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé do Modal com Ações */}
        <div className="px-6 sm:px-8 py-4 bg-zinc-950 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-3">
            {selectedProject.liveUrl && (
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-white/5"
              >
                <span>{lang === "pt" ? "Acessar Plataforma" : "Live Demo"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold uppercase tracking-wider border border-white/10 transition-all flex items-center gap-2"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>{lang === "pt" ? "Ver Código" : "Source Code"}</span>
              </a>
            )}
          </div>

          <button
            onClick={closeModal}
            className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
          >
            {lang === "pt" ? "Fechar [ESC]" : "Close [ESC]"}
          </button>
        </div>
      </div>
    </div>
  );
}
