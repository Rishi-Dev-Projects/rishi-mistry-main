"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, ArrowDown } from "@phosphor-icons/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SkillsClosing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      if (headlineRef.current) {
        tl.from(headlineRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      if (sublineRef.current) {
        tl.from(
          sublineRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-10 text-center relative z-10"
    >
      {/* Decorative center icon */}
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
        <Sparkle size={18} weight="fill" />
      </div>

      {/* Main Masked Statement */}
      <div className="overflow-hidden mb-4">
        <h3
          ref={headlineRef}
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-100 leading-snug"
        >
          Always learning<span className="text-emerald-400">.</span> Always building<span className="text-emerald-400">.</span> Always evolving<span className="text-emerald-400">.</span>
        </h3>
      </div>

      {/* Supporting Line */}
      <p
        ref={sublineRef}
        className="font-mono text-xs sm:text-sm text-zinc-400 tracking-wide uppercase max-w-[50ch] mx-auto mb-8"
      >
        Technology keeps evolving, and so do I.
      </p>

      {/* Subtle down flow connector to Contact */}
      <div className="flex flex-col items-center gap-2 text-zinc-600 font-mono text-[11px]">
        <div className="w-[1px] h-8 bg-gradient-to-b from-emerald-400/40 via-white/[0.1] to-transparent" />
      </div>
    </div>
  );
}

export default SkillsClosing;

