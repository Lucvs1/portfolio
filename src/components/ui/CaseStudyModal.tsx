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
      pt: "Plataforma de Logística, Rastreamento & Despacho Dinâmico",
      en: "Logistics Platform, Real-Time Tracking & Dynamic Dispatch",
    },
    badge: {
      pt: "Aplicação Web em Produção",
      en: "Live Web Application",
    },
    accentColor: "text-emerald-400",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    liveUrl: "https://rotabgr.vercel.app/",
    tags: ["Next.js 16", "React 19", "Mapbox GL", "Tailwind CSS", "Node.js", "WebSockets"],
    challenge: {
      pt: "Operações logísticas descentralizadas sofriam com atrasos na comunicação de despacho, perda de sincronia de posições em tempo real e lentidão de carregamento em ferramentas legadas.",
      en: "Decentralized logistics operations suffered from dispatch communication delays, lost real-time coordinate synchronization, and slow interface rendering in legacy tools.",
      points: {
        pt: [
          "Necessidade de mapa interativo de alta densidade sem travar no navegador do operador.",
          "Comunicação bidirecional com latência inferior a 30ms para atualizações de rota.",
          "Interface responsiva intuitiva para operadores de tráfego e motoristas.",
        ],
        en: [
          "Requirement for high-density interactive map rendering at 60fps on operator browsers.",
          "Sub-30ms bidirectional updates between dispatch center and drivers.",
          "Responsive, highly intuitive interface adapted for both dispatchers and field agents.",
        ],
      },
    },
    architecture: {
      pt: "Construído sobre o Next.js 16 com Server Components para entregar o esqueleto da aplicação em menos de 200ms. O Mapbox GL foi integrado com otimização WebGL e virtualização de marcadores, garantindo 60 FPS estáveis mesmo com centenas de waypoints simultâneos.",
      en: "Engineered on Next.js 16 with Server Components to serve the initial shell in under 200ms. Mapbox GL was integrated with WebGL acceleration and marker virtualization, sustaining a locked 60 FPS even with hundreds of concurrent waypoints.",
      techDecisions: [
        {
          title: { pt: "Next.js App Router & RSC", en: "Next.js App Router & RSC" },
          desc: {
            pt: "Separação cirúrgica entre dados no servidor e interatividade do mapa no cliente, minimizando o bundle inicial de JS.",
            en: "Clean decoupling of server-side data fetching and client-side map canvas, minimizing initial JS payload.",
          },
        },
        {
          title: { pt: "Mapbox WebGL Rendering", en: "Mapbox WebGL Rendering" },
          desc: {
            pt: "Aceleração por hardware direto na GPU para manipulação suave de rotas vetoriais sem gargalos de CPU.",
            en: "Direct GPU hardware acceleration for smooth vector route manipulation with zero CPU bottlenecks.",
          },
        },
        {
          title: { pt: "Telemetria & Cache Otimizado", en: "Telemetry & Smart Caching" },
          desc: {
            pt: "Estratégia de debounce inteligente e revalidação assíncrona reduzindo chamadas redundantes à API.",
            en: "Smart debounce strategy and background revalidation eliminating redundant API calls.",
          },
        },
      ],
    },
    metrics: [
      {
        value: "-42%",
        label: { pt: "Tempo de Despacho", en: "Dispatch Time" },
        sublabel: { pt: "Criação de rotas acelerada", en: "Faster route planning" },
      },
      {
        value: "< 25ms",
        label: { pt: "Latência de Resposta", en: "Response Latency" },
        sublabel: { pt: "Atualização fluida em tempo real", en: "Real-time updates" },
      },
      {
        value: "99.98%",
        label: { pt: "Disponibilidade", en: "Uptime" },
        sublabel: { pt: "Estabilidade operacional sustentada", en: "Sustained stability" },
      },
    ],
  },
  "cantinho-da-cigana": {
    id: "cantinho-da-cigana",
    title: "Cantinho da Cigana",
    subtitle: {
      pt: "E-Commerce de Alta Fidelidade & Branding Místico",
      en: "High-Fidelity E-Commerce & Mystical Digital Showcase",
    },
    badge: {
      pt: "Plataforma Comercial Ativa",
      en: "Live Commercial Platform",
    },
    accentColor: "text-amber-400",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    liveUrl: "https://cantinhodacigana.com/",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Design System", "Stripe & PIX", "UI/UX"],
    challenge: {
      pt: "Transformar uma loja tradicional de artigos místicos com mais de 300 produtos em um e-commerce cinematográfico que transmitisse elegância e gerasse confiança imediata no checkout mobile.",
      en: "Transform a traditional storefront with over 300 physical products into a cinematic e-commerce platform that instills trust and drives seamless mobile checkout conversions.",
      points: {
        pt: [
          "Superar a desconfiança comum em e-commerces novos através de identidade visual autoral e refinada.",
          "Garantir carregamento ultrarrápido (< 800ms) de fotos de produtos em alta resolução.",
          "Checkout de apenas 2 etapas com opções de pagamento instantâneo via PIX e Cartão.",
        ],
        en: [
          "Build instant brand trust through bespoke dark obsidian visual identity and gold accents.",
          "Ensure sub-800ms page load speeds for high-resolution product photography on mobile networks.",
          "Streamlined 2-step checkout flow supporting instant PIX and credit card processing.",
        ],
      },
    },
    architecture: {
      pt: "Desenvolvimento com Next.js e Tailwind CSS estruturado em torno de um Design System proprietário. As imagens são pré-otimizadas nos formatos WebP/AVIF com lazy loading contextual e blur-up placeholder, garantindo pontuações máximas no Google Core Web Vitals.",
      en: "Architected with Next.js and Tailwind CSS anchored on a bespoke Design System. Imagery is automatically converted and served in WebP/AVIF with blur-up placeholders, securing top-tier Google Core Web Vitals scores.",
      techDecisions: [
        {
          title: { pt: "Design System Dark Obsidian", en: "Dark Obsidian Design System" },
          desc: {
            pt: "Paleta escura elegante com acentos âmbar que destacam a atmosfera mística sem comprometer o contraste.",
            en: "Sophisticated dark palette with amber accents elevating mystical branding while preserving accessibility.",
          },
        },
        {
          title: { pt: "Otimização de Imagens AVIF/WebP", en: "AVIF/WebP Media Engine" },
          desc: {
            pt: "Compressão visual sem perda aparente, reduzindo em até 70% o consumo de dados de quem acessa pelo 4G.",
            en: "Lossless perceived compression shrinking image payloads by up to 70% for mobile 4G users.",
          },
        },
        {
          title: { pt: "Microinterações de Conversão", en: "Microinteractions & UX" },
          desc: {
            pt: "Feedback tátil e visual ao adicionar ao carrinho e validar formulários, elevando a conversão.",
            en: "Haptic visual feedback when adding to cart and validating forms, driving checkout conversion.",
          },
        },
      ],
    },
    metrics: [
      {
        value: "+160%",
        label: { pt: "Tempo de Sessão", en: "Session Duration" },
        sublabel: { pt: "Maior engajamento no catálogo", en: "Catalog engagement" },
      },
      {
        value: "98+",
        label: { pt: "PageSpeed Insights", en: "PageSpeed Score" },
        sublabel: { pt: "Performance mobile de elite", en: "Elite mobile speed" },
      },
      {
        value: "< 700ms",
        label: { pt: "Carregamento Inicial", en: "First Contentful Paint" },
        sublabel: { pt: "Navegação instantânea", en: "Instant browsing" },
      },
    ],
  },
  "bot-gateway-pro": {
    id: "bot-gateway-pro",
    title: "Bot Gateway Pro",
    subtitle: {
      pt: "Gateway de Integração Assíncrona & Orquestrador de Mensageria",
      en: "Asynchronous Integration Gateway & Messaging Orchestrator",
    },
    badge: {
      pt: "Backend / Open Source",
      en: "Backend / Open Source",
    },
    accentColor: "text-blue-400",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    githubUrl: "https://github.com/Lucvs1/bot-gateway-pro",
    tags: ["Node.js", "Docker", "Redis", "Webhooks", "REST API", "Microservices", "Git"],
    challenge: {
      pt: "Orquestrar múltiplos fluxos simultâneos de webhooks e eventos assíncronos entre bots de atendimento e sistemas de CRM sem perdas de pacotes durante picos súbitos de tráfego.",
      en: "Orchestrate high-concurrency webhook event streams between conversational bot systems and enterprise CRMs without message loss during sudden traffic surges.",
      points: {
        pt: [
          "Eliminar timeouts de APIs receptoras em horários de pico.",
          "Garantir entrega com garantia de ordem e retentativas exponenciais automáticas.",
          "Isolamento completo através de containers Docker e facilidade de deploy.",
        ],
        en: [
          "Eliminate third-party downstream webhook timeouts during traffic spikes.",
          "Guarantee at-least-once message delivery with exponential backoff retries.",
          "Complete environment isolation via Docker containers with effortless CI/CD.",
        ],
      },
    },
    architecture: {
      pt: "Pipeline orientado a eventos com Node.js e Redis para gestão de filas prioritárias. Adota o padrão Circuit Breaker para evitar falhas em cascata quando serviços externos ficam indisponíveis, com Dead-Letter Queue (DLQ) para auditoria forense de falhas.",
      en: "Event-driven architecture built with Node.js and Redis priority queues. Implements the Circuit Breaker pattern to protect against cascading downstream outages, coupled with a Dead-Letter Queue (DLQ) for forensic retry handling.",
      techDecisions: [
        {
          title: { pt: "Arquitetura Orientada a Eventos", en: "Event-Driven Engine" },
          desc: {
            pt: "Desacoplamento total entre o recebimento do webhook (resposta ACK < 2ms) e o processamento em segundo plano.",
            en: "Total decoupling of incoming webhook ingestion (ACK < 2ms) from asynchronous background workers.",
          },
        },
        {
          title: { pt: "Circuit Breaker & DLQ", en: "Circuit Breaker & DLQ" },
          desc: {
            pt: "Protege o gateway contra sobrecarga de endpoints lentos, reencaminhando mensagens após estabilização.",
            en: "Shields the gateway from slow downstream APIs, safely staging messages until service recovers.",
          },
        },
        {
          title: { pt: "Docker Containerization", en: "Docker Containerization" },
          desc: {
            pt: "Ambientes reproduzíveis com Docker Compose, facilitando orquestração local e em clusters de produção.",
            en: "Reproducible Docker Compose environments for seamless local development and cloud cluster scale.",
          },
        },
      ],
    },
    metrics: [
      {
        value: "10k+",
        label: { pt: "Webhooks / minuto", en: "Webhooks / min" },
        sublabel: { pt: "Throughput sustentado", en: "Sustained throughput" },
      },
      {
        value: "1.2ms",
        label: { pt: "Latência ACK", en: "ACK Ingestion Latency" },
        sublabel: { pt: "Resposta instantânea", en: "Instant acknowledgment" },
      },
      {
        value: "0%",
        label: { pt: "Perda de Mensagens", en: "Message Loss" },
        sublabel: { pt: "Garantia de entrega via DLQ", en: "Guaranteed delivery via DLQ" },
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
                    className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-white/10 flex flex-col items-center text-center justify-center space-y-2"
                  >
                    <span className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 tracking-tight">
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
