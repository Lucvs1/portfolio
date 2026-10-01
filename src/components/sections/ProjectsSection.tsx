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
    category: "Web Application & Interactive Platform",
    description:
      "Interface web imersiva de alta performance voltada para comunidade e operações, com design responsivo, gerenciamento de dados e experiência fluida.",
    tags: ["React", "Tailwind CSS", "Vercel", "UI/UX", "Interactive UI"],
    liveUrl: "https://rotabgr.vercel.app/",
    githubUrl: null,
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accent: "text-emerald-400",
    badge: "Plataforma Ativa",
    previewType: "platform",
  },
  {
    id: "cantinho-da-cigana",
    title: "Cantinho da Cigana",
    category: "E-Commerce & Digital Showcase",
    description:
      "Plataforma comercial completa para exibição e conversão de produtos, integrando identidade visual proprietária e foco em conversão e usabilidade.",
    tags: ["Web Platform", "E-commerce", "Design System", "Responsividade"],
    liveUrl: "https://cantinhodacigana.com/",
    githubUrl: null,
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accent: "text-amber-400",
    badge: "E-commerce no Ar",
    previewType: "ecommerce",
  },
  {
    id: "bot-gateway-pro",
    title: "Bot Gateway Pro",
    category: "Backend & Automation Integration",
    description:
      "Gateway de integração e processamento assíncrono de dados para fluxos automatizados, orquestração de APIs e regras de negócio escaláveis.",
    tags: ["Node.js", "API Gateway", "Automação", "Assíncrono", "Git"],
    liveUrl: null,
    githubUrl: "https://github.com/Lucvs1/bot-gateway-pro",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    accent: "text-blue-400",
    badge: "Open Source / Backend",
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
