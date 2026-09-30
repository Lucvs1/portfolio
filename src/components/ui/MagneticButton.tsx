"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  asAnchor = false,
  href,
  target,
  rel,
  onClick,
  ...props
}: MagneticButtonProps) {
  const elementRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = (clientX - centerX) * strength;
      const deltaY = (clientY - centerY) * strength;

      xTo(deltaX);
      yTo(deltaY);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove as EventListener);
    el.addEventListener("mouseleave", handleMouseLeave as EventListener);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove as EventListener);
      el.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  const baseClasses = cn(
    "relative inline-flex items-center justify-center transition-all duration-200 select-none cursor-pointer",
    className
  );

  if (asAnchor && href) {
    return (
      <a
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={baseClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseClasses}
      {...props}
    >
      {children}
    </button>
  );
}

