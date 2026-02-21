"use client";

import React, { useEffect, useRef, useState } from "react";

export interface AnimationSettings {
  entrance: "none" | "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale" | "slide-up" | "blur-in";
  duration: "fast" | "normal" | "slow";
  delay: "none" | "short" | "medium" | "long";
  hover: "none" | "lift" | "glow" | "scale" | "shadow";
}

export const defaultAnimation: AnimationSettings = {
  entrance: "none",
  duration: "normal",
  delay: "none",
  hover: "none",
};

const durationMs = { fast: 400, normal: 600, slow: 1000 };
const delayMs = { none: 0, short: 100, medium: 300, long: 600 };

const entranceStyles: Record<string, { initial: React.CSSProperties; final: React.CSSProperties }> = {
  none: { initial: {}, final: {} },
  "fade-up": { initial: { opacity: 0, transform: "translateY(30px)" }, final: { opacity: 1, transform: "translateY(0)" } },
  "fade-in": { initial: { opacity: 0 }, final: { opacity: 1 } },
  "fade-left": { initial: { opacity: 0, transform: "translateX(-30px)" }, final: { opacity: 1, transform: "translateX(0)" } },
  "fade-right": { initial: { opacity: 0, transform: "translateX(30px)" }, final: { opacity: 1, transform: "translateX(0)" } },
  scale: { initial: { opacity: 0, transform: "scale(0.9)" }, final: { opacity: 1, transform: "scale(1)" } },
  "slide-up": { initial: { opacity: 0, transform: "translateY(60px)" }, final: { opacity: 1, transform: "translateY(0)" } },
  "blur-in": { initial: { opacity: 0, filter: "blur(8px)" }, final: { opacity: 1, filter: "blur(0px)" } },
};

const hoverClasses: Record<string, string> = {
  none: "",
  lift: "hover:-translate-y-1 hover:shadow-lg",
  glow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
  scale: "hover:scale-[1.02]",
  shadow: "hover:shadow-xl",
};

export function AnimationWrapper({
  children,
  animation,
  className = "",
}: {
  children: React.ReactNode;
  animation?: AnimationSettings;
  className?: string;
}) {
  const anim = animation || defaultAnimation;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(anim.entrance === "none");

  useEffect(() => {
    if (anim.entrance === "none") { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [anim.entrance]);

  const style = entranceStyles[anim.entrance] || entranceStyles.none;
  const dur = durationMs[anim.duration] || 600;
  const del = delayMs[anim.delay] || 0;
  const hoverCls = hoverClasses[anim.hover] || "";

  return (
    <div
      ref={ref}
      className={`transition-transform ${hoverCls} ${className}`}
      style={{
        ...(visible ? style.final : style.initial),
        transition: `all ${dur}ms cubic-bezier(0.16, 1, 0.3, 1) ${del}ms`,
        willChange: anim.entrance !== "none" ? "opacity, transform, filter" : undefined,
      }}
    >
      {children}
    </div>
  );
}

export const animationFields = {
  animation: {
    type: "object" as const,
    label: "✨ Animation",
    objectFields: {
      entrance: {
        type: "select" as const,
        label: "Eingangs-Animation",
        options: [
          { value: "none", label: "Keine" },
          { value: "fade-up", label: "Fade Up ↑" },
          { value: "fade-in", label: "Fade In" },
          { value: "fade-left", label: "Fade Left ←" },
          { value: "fade-right", label: "Fade Right →" },
          { value: "scale", label: "Scale" },
          { value: "slide-up", label: "Slide Up (gross)" },
          { value: "blur-in", label: "Blur In" },
        ],
      },
      duration: {
        type: "select" as const,
        label: "Dauer",
        options: [
          { value: "fast", label: "Schnell (0.4s)" },
          { value: "normal", label: "Normal (0.6s)" },
          { value: "slow", label: "Langsam (1s)" },
        ],
      },
      delay: {
        type: "select" as const,
        label: "Verzögerung",
        options: [
          { value: "none", label: "Keine" },
          { value: "short", label: "Kurz (0.1s)" },
          { value: "medium", label: "Mittel (0.3s)" },
          { value: "long", label: "Lang (0.6s)" },
        ],
      },
      hover: {
        type: "select" as const,
        label: "Hover-Effekt",
        options: [
          { value: "none", label: "Keiner" },
          { value: "lift", label: "Anheben" },
          { value: "glow", label: "Leuchten" },
          { value: "scale", label: "Vergrössern" },
          { value: "shadow", label: "Schatten" },
        ],
      },
    },
  },
};
