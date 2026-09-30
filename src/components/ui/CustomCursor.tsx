"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import { sound } from "@/lib/sound";

type CursorType = "default" | "hover" | "project" | "text" | "hidden";

interface CursorState {
  type: CursorType;
  text?: string;
}

function subscribeToTouchMediaQuery(callback: () => void) {
  const mql = window.matchMedia("(pointer: coarse)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getTouchSnapshot(): boolean {
  return window.matchMedia("(pointer: coarse)").matches;
}

function getTouchServerSnapshot(): boolean {
  return true;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  const [cursorState, setCursorState] = useState<CursorState>({ type: "default" });

  const isTouchDevice = useSyncExternalStore(
    subscribeToTouchMediaQuery,
    getTouchSnapshot,
    getTouchServerSnapshot
  );

  useEffect(() => {
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const xCursor = gsap.quickTo(cursor, "x", { duration: 0.04, ease: "none" });
    const yCursor = gsap.quickTo(cursor, "y", { duration: 0.04, ease: "none" });

    const xFollower = gsap.quickTo(follower, "x", { duration: 0.45, ease: "power3.out" });
    const yFollower = gsap.quickTo(follower, "y", { duration: 0.45, ease: "power3.out" });

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
      sound.playClick();
      gsap.to(follower, { scale: 0.8, duration: 0.2, ease: "power2.out" });
    };

    const onMouseUp = () => {
      gsap.to(follower, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    const onMouseLeave = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
      isVisible = false;
    };

    let lastTarget: Element | null = null;

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        "[data-cursor], a, button, [role='button'], h1, h2, input, textarea"
      );

      if (!target) {
        setCursorState({ type: "default" });
        lastTarget = null;
        return;
      }

      if (target !== lastTarget) {
        sound.playHover();
        lastTarget = target;
      }

      const cursorAttr = target.getAttribute("data-cursor");
      const cursorTextAttr = target.getAttribute("data-cursor-text");

      if (cursorAttr === "project" || cursorTextAttr) {
        setCursorState({
          type: "project",
          text: cursorTextAttr || "Ver Projeto",
        });
      } else if (target.tagName.toLowerCase() === "h1" || target.tagName.toLowerCase() === "h2" || cursorAttr === "text") {
        setCursorState({ type: "text" });
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
  }, [isTouchDevice]);

  // Transições de morfologia com GSAP
  useEffect(() => {
    const follower = followerRef.current;
    const cursor = cursorRef.current;
    if (!follower || !cursor || isTouchDevice) return;

    if (cursorState.type === "project") {
      follower.style.mixBlendMode = "normal";
      gsap.to(follower, {
        width: 104,
        height: 104,
        borderRadius: "9999px",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderColor: "rgba(255, 255, 255, 1)",
        backdropFilter: "blur(8px)",
        duration: 0.4,
        ease: "back.out(1.6)",
      });
      gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.2 });
    } else if (cursorState.type === "text") {
      follower.style.mixBlendMode = "difference";
      gsap.to(follower, {
        width: 68,
        height: 68,
        borderRadius: "9999px",
        backgroundColor: "#ffffff",
        borderColor: "transparent",
        backdropFilter: "none",
        scale: 1,
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.15 });
    } else if (cursorState.type === "hover") {
      follower.style.mixBlendMode = "normal";
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
      follower.style.mixBlendMode = "normal";
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
    <>
      {/* Ponto central (Dot com mira esmeralda) */}
      <div
        ref={cursorRef}
        style={{ zIndex: 9999999, pointerEvents: "none" }}
        className="custom-cursor-dot fixed top-0 left-0 w-2 h-2 rounded-full bg-emerald-400 opacity-0 pointer-events-none shadow-[0_0_10px_rgba(34,197,94,0.9)]"
      />

      {/* Anel seguidor com inércia, mix-blend-mode e morfologia dinâmica */}
      <div
        ref={followerRef}
        style={{ width: 32, height: 32, zIndex: 9999998, pointerEvents: "none" }}
        className="custom-cursor-follower fixed top-0 left-0 border border-white/25 rounded-full flex flex-col items-center justify-center text-center opacity-0 pointer-events-none select-none transition-[border-color,background-color] duration-300"
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
    </>
  );
}
