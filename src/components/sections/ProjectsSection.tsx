"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Layers } from "lucide-react";
import { ProjectCard, type ProjectData } from "@/components/ui/ProjectCard";
import { useI18n } from "@/lib/i18n";

const PROJECTS: ProjectData[] = [
  {
    id: "rota-bgr",
    title: "ROTA BGR",
    category: {
      pt: "Corporação Policial RP • GTA SA / MTA",
      en: "Tactical Police RP Unit • GTA SA / MTA",
    },
    description: {
      pt: "Portal da corporação tática para cidade de RP no GTA San Andreas / MTA. Apresenta o catálogo de viaturas, fardamentos oficiais, quadro do Alto Comando e galeria de veteranos Legends. Inclui Painel de Administração para controle de operações, gestão de alistamento com abertura/fechamento em tempo real, despacho automático via Discord Webhook com métricas de acertos/erros e geração de dossiê da prova em PDF.",
      en: "Official tactical police corporation portal for GTA San Andreas / MTA Roleplay. Showcases custom vehicle fleets, uniforms, High Command officers, and Legends hall. Features a secure Admin Dashboard to manage operations, toggle recruitment, and automate candidate exams via Discord Webhooks with score grading and dynamic PDF dossier generation.",
    },
    tags: ["React", "Next.js", "Painel Admin", "MTA / GTA RP", "Discord Webhooks", "PDF Generation", "Tailwind CSS"],
    liveUrl: "https://rotabgr.vercel.app/",
    githubUrl: null,
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accent: "text-emerald-400",
    badge: {
      pt: "Plataforma Ativa",
      en: "Live Platform",
    },
    previewType: "platform",
  },
  {
    id: "cantinho-da-cigana",
    title: "Cantinho da Cigana",
    category: {
      pt: "E-Commerce Cultural & Leitura de Baralho Cigano",
      en: "Cultural E-Commerce & Gypsy Tarot Readings",
    },
    description: {
      pt: "E-commerce e plataforma cultural dedicada à valorização e difusão das tradições ciganas, com venda de artigos temáticos e foco primordial no atendimento e agendamento de Leitura de Baralho Cigano — o serviço de maior autoridade e carro-chefe da cliente.",
      en: "Cultural e-commerce platform dedicated to honoring Gypsy heritage and traditions. Offers curated content and authentic items, anchored on its flagship high-authority offering: personalized Gypsy Tarot (Baralho Cigano) consultation bookings.",
    },
    tags: ["Next.js", "E-commerce", "Baralho Cigano", "Cultura Cigana", "Agendamento", "Tailwind CSS", "UI/UX"],
    liveUrl: "https://cantinhodacigana.com/",
    githubUrl: null,
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accent: "text-amber-400",
    badge: {
      pt: "E-commerce no Ar",
      en: "Live E-Commerce",
    },
    previewType: "ecommerce",
  },
  {
    id: "bot-gateway-pro",
    title: "Bot Gateway Pro",
    category: {
      pt: "Bot de Discord & Gateway de Pagamentos",
      en: "Discord Bot & Automated Payment Gateway",
    },
    description: {
      pt: "Bot de Discord de alta performance para monetização e checkout nativo. Processa pagamentos via PIX instantâneo (Mercado Pago) e Cartão de Crédito/Débito e Criptomoedas (Stripe). Atribui automaticamente os cargos aos compradores e despacha os conteúdos digitais adquiridos logo após a confirmação. Arquitetura completa de produção com dados mockados para exibição pública segura.",
      en: "High-performance automated Discord bot for in-app monetization and checkout. Processes instant PIX payments (Mercado Pago) and Credit/Debit/Crypto (Stripe). Automatically grants member roles in the server and delivers purchased digital content immediately post-sale. Fully engineered for production with sanitized mock data for safe public showcase.",
    },
    tags: ["Discord.js", "Node.js", "Mercado Pago (PIX)", "Stripe (Card & Crypto)", "Webhooks", "Automação", "Roles"],
    liveUrl: null,
    githubUrl: "https://github.com/Lucvs1/bot-gateway-pro",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    accent: "text-blue-400",
    badge: {
      pt: "Bot em Produção (Dados Mockados)",
      en: "Production Bot (Mocked Data)",
    },
    previewType: "gateway",
  },
];

export function ProjectsSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardsRef.current) return;

      const projectCards = cardsRef.current.children;

      gsap.fromTo(
        projectCards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            {t.projects.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            {t.projects.title}
          </h2>
        </div>
        <p className="text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed">
          {t.projects.subtitle}
        </p>
      </div>

      {/* Grid de Cards com 3D Tilt e Mockups */}
      <div ref={cardsRef} className="space-y-12">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}
