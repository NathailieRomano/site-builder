"use client";

import React, { useEffect, useRef, useState } from "react";

export interface ScrollRevealProps {
  children?: React.ReactNode;
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale";
  delay?: number;
  duration?: number;
  threshold?: number;
}

const animations = {
  "fade-up": { from: "translateY(30px) opacity(0)", initial: { opacity: 0, transform: "translateY(30px)" }, final: { opacity: 1, transform: "translateY(0)" } },
  "fade-in": { from: "", initial: { opacity: 0 }, final: { opacity: 1 } },
  "fade-left": { from: "", initial: { opacity: 0, transform: "translateX(-30px)" }, final: { opacity: 1, transform: "translateX(0)" } },
  "fade-right": { from: "", initial: { opacity: 0, transform: "translateX(30px)" }, final: { opacity: 1, transform: "translateX(0)" } },
  "scale": { from: "", initial: { opacity: 0, transform: "scale(0.95)" }, final: { opacity: 1, transform: "scale(1)" } },
};

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const anim = animations[animation];

  return (
    <div
      ref={ref}
      style={{
        ...(visible ? anim.final : anim.initial),
        transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
