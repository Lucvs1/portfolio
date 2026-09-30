"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Code2, Server, Palette, CheckCircle2, Wrench } from "lucide-react";

const SKILL_GROUPS = [
  {
    category: "Front-end & Creative Dev",
    icon: Code2,
    accent: "text-emerald-400",
    borderAccent: "group-hover:border-emerald-500/40",
    skills: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GSAP Animations",
      "Lenis Smooth Scroll",
      "HTML5 Semântico",
      "Modern CSS / Sass",
    ],
  },
  {
    category: "Back-end & Infraestrutura",
    icon: Server,
    accent: "text-cyan-400",
    borderAccent: "group-hover:border-cyan-500/40",
    skills: [
      "Node.js",
      "Express",
      "RESTful APIs",
      "MySQL",
      "Docker & Containers",
      "Bash / Shell Scripting",
      "Git & GitHub Actions",
      "Vercel Cloud Deploy",
    ],
  },
  {
    category: "Design & UI/UX",
    icon: Palette,
    accent: "text-indigo-400",
    borderAccent: "group-hover:border-indigo-500/40",
    skills: [
      "Figma",
      "Design Systems",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Prototipação Interativa",
      "Acessibilidade (a11y)",
      "Responsividade Avançada",
      "Microinterações",
    ],
  },
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const items = containerRef.current.children;

      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <div className="flex flex-col items-start mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
          <Wrench className="w-4 h-4" />
          [03 // Habilidades Técnicas]
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          Arsenal Tecnológico & Design
        </h2>
        <p className="mt-4 text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed">
          Conjunto de ferramentas e linguagens utilizadas para projetar e implementar sistemas ponta a ponta.
        </p>
      </div>

      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {SKILL_GROUPS.map((group) => {
          const Icon = group.icon;
          return (
            <div
              key={group.category}
              className={`group relative p-8 rounded-3xl bg-zinc-900/40 border border-white/10 ${group.borderAccent} transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-black/80`}
            >
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${group.accent}`} />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/60 border border-white/5 text-xs text-zinc-300 font-mono hover:text-white hover:border-white/20 transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400/80" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

