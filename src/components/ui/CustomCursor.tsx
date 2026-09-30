"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";

type CursorType = "default" | "hover" | "project" | "hidden";

interface CursorState {
  type: CursorType;
  text?: string;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  const [cursorState, setCursorState] = useState<CursorState>({ type: "default" });
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Desativa completamente o cursor customizado em telas de toque (mobile/tablet)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    setIsTouchDevice(false);

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // QuickTo do GSAP para interpolação suave sem causar re-render no React
    const xCursor = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power2.out" });
    const yCursor = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power2.out" });

    const xFollower = gsap.quickTo(follower, "x", { duration: 0.45, ease: "power3.out" });
    const yFollower = gsap.quickTo(follower, "y", { duration: 0.45, ease: "power3.out" });

    // Garante centralização inicial
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
        isVisible = true;
      }
      xCursor(e.clientX);
      yCursor(e.clientY);
      xFollower(e.clientX);
      yFollower(e.clientY);
    };

    const onMouseDown = () => {
      gsap.to(follower, { scale: 0.8, duration: 0.2, ease: "power2.out" });
    };

    const onMouseUp = () => {
      gsap.to(follower, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    const onMouseLeave = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
      isVisible = false;
    };

    // Delegação de eventos inteligente para detecção de contexto de hover
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        "[data-cursor], a, button, [role='button'], input, textarea"
      );

      if (!target) {
        setCursorState({ type: "default" });
        return;
      }

      const cursorAttr = target.getAttribute("data-cursor");
      const cursorTextAttr = target.getAttribute("data-cursor-text");

      if (cursorAttr === "project" || cursorTextAttr) {
        setCursorState({
          type: "project",
          text: cursorTextAttr || "Ver Projeto",
        });
      } else {
        setCursorState({ type: "hover" });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      gsap.killTweensOf([cursor, follower]);
    };
  }, []);

  // Animação de transição de morfologia do cursor de acordo com o estado contextual
  useEffect(() => {
    const follower = followerRef.current;
    const cursor = cursorRef.current;
    if (!follower || !cursor || isTouchDevice) return;

    if (cursorState.type === "project") {
      gsap.to(follower, {
        width: 110,
        height: 110,
        borderRadius: "9999px",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderColor: "rgba(255, 255, 255, 1)",
        backdropFilter: "blur(8px)",
        duration: 0.4,
        ease: "back.out(1.6)",
      });
      gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.2 });
    } else if (cursorState.type === "hover") {
      gsap.to(follower, {
        width: 48,
        height: 48,
        borderRadius: "9999px",
        backgroundColor: "rgba(34, 197, 94, 0.15)",
        borderColor: "rgba(34, 197, 94, 0.6)",
        backdropFilter: "blur(2px)",
        scale: 1.1,
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(cursor, { opacity: 1, scale: 0.6, duration: 0.2 });
    } else {
      gsap.to(follower, {
        width: 32,
        height: 32,
        borderRadius: "9999px",
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        borderColor: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "none",
        scale: 1,
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.2 });
    }
  }, [cursorState, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Ponto central (Dot) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-0 pointer-events-none shadow-sm shadow-emerald-400/50"
      />

      {/* Seguidor com inércia e morfologia dinâmica */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 border border-white/25 rounded-full flex flex-col items-center justify-center text-center opacity-0 pointer-events-none select-none transition-[border-color,background-color] duration-300"
        style={{ width: 32, height: 32 }}
      >
        {cursorState.type === "project" && (
          <span
            ref={textRef}
            className="flex items-center gap-1 text-[11px] font-bold text-zinc-950 uppercase tracking-tighter animate-in fade-in zoom-in-75 duration-200"
          >
            <span>{cursorState.text || "Ver"}</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-950" />
          </span>
        )}
      </div>
    </div>
  );
}
