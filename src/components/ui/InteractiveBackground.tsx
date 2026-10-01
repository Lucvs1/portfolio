"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  mass: number; // profundidade virtual 0.5 a 2
}

interface Shockwave {
  x: number;
  y: number;
  currentRadius: number;
  maxRadius: number;
  speed: number;
  strength: number;
  alpha: number;
}

const PARTICLE_COLORS = [
  "#34d399", // emerald-400
  "#10b981", // emerald-500
  "#22d3ee", // cyan-400
  "#06b6d4", // cyan-500
  "#a7f3d0", // emerald-200
  "#ffffff", // pure white star
];

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Respeita acessibilidade de movimento reduzido
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // DPR limitado a 1.5 para máxima economia de GPU mantendo nitidez em monitores 4K/Retina
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Mouse Physics State
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 170, // raio de atração/repulsão gravitacional
      isHovered: false,
    };

    // Scroll Momentum Tracking
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      // Adiciona impulso vertical nas partículas de acordo com o scroll do usuário
      scrollVelocity = Math.max(-18, Math.min(18, delta * 0.35));
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Shockwaves (Ondas de choque geradas por cliques)
    const shockwaves: Shockwave[] = [];

    // Densidade adaptativa de partículas (menos em mobile, mais em monitores amplos)
    const isMobile = width < 768;
    const particleCount = isMobile
      ? Math.floor((width * height) / 22000)
      : Math.min(140, Math.floor((width * height) / 14000));

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const mass = 0.6 + Math.random() * 1.4; // profundidade
      const baseAlpha = 0.15 + Math.random() * 0.5;

      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: 0.9 + Math.random() * 1.8 * mass,
        color:
          PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        alpha: baseAlpha,
        baseAlpha,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        mass,
      });
    }

    // Ouvintes de Mouse
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const onMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.isHovered = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      // Cria onda de choque gravitacional expansiva no ponto do clique
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        currentRadius: 5,
        maxRadius: Math.min(width, height) * 0.4,
        speed: 10,
        strength: 9,
        alpha: 0.5,
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    // Pausa a renderização quando a aba fica em segundo plano
    let isVisible = !document.hidden;
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    let lastTime = performance.now();

    // Render Loop a 60 FPS
    const render = (now: number) => {
      if (!isVisible) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Suaviza a posição do mouse com interpolação linear (LERP)
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // Amortece o impulso do scroll suavemente
      scrollVelocity *= 0.92;

      // Limpeza suave do canvas
      ctx.clearRect(0, 0, width, height);

      // Brilho radial dinâmico sutil acompanhando a gravidade do mouse
      if (mouse.isHovered && mouse.x > -100) {
        const glowRadius = mouse.radius * 1.4;
        const radial = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRadius
        );
        radial.addColorStop(0, "rgba(52, 211, 153, 0.055)");
        radial.addColorStop(0.5, "rgba(6, 182, 212, 0.025)");
        radial.addColorStop(1, "rgba(9, 9, 11, 0)");

        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Atualiza e desenha Ondas de Choque Gravitacionais
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.currentRadius += sw.speed;
        sw.alpha *= 0.94;
        sw.speed *= 0.98;

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(52, 211, 153, ${sw.alpha * 0.4})`;
        ctx.lineWidth = Math.max(1, 3 * sw.alpha);
        ctx.stroke();
        ctx.restore();

        if (sw.alpha < 0.01 || sw.currentRadius >= sw.maxRadius) {
          shockwaves.splice(s, 1);
        }
      }

      // Conexões estelares entre partículas muito próximas (constelação gravitacional efêmera)
      const maxConnectDistance = isMobile ? 55 : 75;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDistance * maxConnectDistance) {
            const dist = Math.sqrt(distSq);
            const lineAlpha =
              (1 - dist / maxConnectDistance) *
              0.12 *
              Math.min(particles[i].alpha, particles[j].alpha);

            ctx.strokeStyle = `rgba(52, 211, 153, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Atualiza cada partícula do campo
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulso senoidal de brilho
        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.18;

        // Movimento inercial base
        p.x += p.vx * 60 * dt;
        p.y += (p.vy - scrollVelocity * 0.4 * p.mass) * 60 * dt;

        // Gravidade do Mouse (Atração em anel e repulsão no núcleo)
        if (mouse.isHovered && mouse.x > -100) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 1) {
            const angle = Math.atan2(dy, dx);
            const force = (1 - dist / mouse.radius);

            // Núcleo repele suavemente, halo orbital atrai
            if (dist < 60) {
              // Repulsão suave próxima ao cursor
              p.vx -= Math.cos(angle) * force * 1.8;
              p.vy -= Math.sin(angle) * force * 1.8;
            } else {
              // Atração com leve torção orbital
              const tangentAngle = angle + Math.PI / 2.5;
              p.vx += (Math.cos(angle) * 0.6 + Math.cos(tangentAngle) * 0.4) * force;
              p.vy += (Math.sin(angle) * 0.6 + Math.sin(tangentAngle) * 0.4) * force;
            }

            // Acentua o brilho ao interagir com o mouse
            p.alpha = Math.min(0.9, p.alpha + force * 0.4);
          }
        }

        // Interação com Ondas de Choque
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const dx = p.x - sw.x;
          const dy = p.y - sw.y;
          const dist = Math.hypot(dx, dy);
          const waveDelta = Math.abs(dist - sw.currentRadius);

          if (waveDelta < 25) {
            const angle = Math.atan2(dy, dx);
            const push = ((25 - waveDelta) / 25) * sw.strength * sw.alpha;
            p.vx += Math.cos(angle) * push;
            p.vy += Math.sin(angle) * push;
            p.alpha = 1.0;
          }
        }

        // Amortecimento inercial
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Retorno suave em bordas infinitas (wrap-around)
        if (p.x < -30) p.x = width + 20;
        else if (p.x > width + 30) p.x = -20;

        if (p.y < -30) p.y = height + 20;
        else if (p.y > height + 30) p.y = -20;

        // Renderiza a partícula com halo sutil
        ctx.save();
        ctx.globalAlpha = Math.max(0.05, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Para partículas maiores, desenha micro-halo estelar
        if (p.size > 2.0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(52, 211, 153, 0.08)";
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none no-print print:hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block opacity-85 transition-opacity duration-700"
      />
    </div>
  );
}
