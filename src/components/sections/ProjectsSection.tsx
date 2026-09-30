"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Layers, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { MagneticButton } from "@/components/ui/MagneticButton";

const PROJECTS = [
  {
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
  },
  {
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
  },
  {
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
  },
];

export function ProjectsSection() {
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
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            [02 // Trabalhos Selecionados]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Projetos em Produção
          </h2>
        </div>
        <p className="text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed">
          Aplicações reais em produção, demonstrando flexibilidade desde plataformas de comércio eletrônico até automações avançadas no backend.
        </p>
      </div>

      <div ref={cardsRef} className="space-y-12">
        {PROJECTS.map((project, idx) => (
          <article
            key={project.title}
            data-cursor="project"
            data-cursor-text={project.liveUrl ? "Acessar" : "GitHub"}
            className="group relative rounded-3xl bg-zinc-900/30 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden backdrop-blur-md p-8 sm:p-12 hover:shadow-2xl hover:shadow-black/60"
          >
            <div
              className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${project.gradient} blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`}
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-zinc-400">
                    0{idx + 1}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                    {project.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs uppercase font-mono tracking-wider text-zinc-400">
                  {project.category}
                </p>

                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-3 py-1 rounded-md bg-zinc-800/60 border border-white/5 text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 lg:self-center">
                {project.liveUrl && (
                  <MagneticButton
                    asAnchor
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    strength={0.2}
                    className="px-6 py-3 rounded-full bg-white text-zinc-950 font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg shadow-white/5"
                  >
                    <span>Ver Projeto</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </MagneticButton>
                )}

                {project.githubUrl && (
                  <MagneticButton
                    asAnchor
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    strength={0.2}
                    className="px-6 py-3 rounded-full bg-zinc-800/90 border border-white/15 text-white font-semibold text-xs tracking-wider uppercase hover:bg-zinc-700 transition-all flex items-center gap-2"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Repositório</span>
                  </MagneticButton>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
