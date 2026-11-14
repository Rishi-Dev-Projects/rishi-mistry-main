"use client";

import React from "react";
import { Eyebrow } from "../ui/Eyebrow";
import { Code, Cpu, HardDrives } from "@phosphor-icons/react";

interface SkillsIntroProps {
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
  descRef?: React.RefObject<HTMLParagraphElement | null>;
  metaRef?: React.RefObject<HTMLDivElement | null>;
}

export function SkillsIntro({ headingRef, descRef, metaRef }: SkillsIntroProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/[0.06]">
        
        {/* Left Column: Eyebrow + Masked Headline + Description */}
        <div className="max-w-2xl">
          <Eyebrow showDot className="mb-4">
            Technology &amp; Expertise
          </Eyebrow>

          <div className="overflow-hidden">
            <h2
              ref={headingRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-zinc-100 leading-[1.08] mb-4"
            >
              BEYOND THE CODE<span className="text-emerald-400">.</span>
            </h2>
          </div>

          <p
            ref={descRef}
            className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-[60ch]"
          >
            An evolving collection of technologies, tools, and frameworks I use to transform ideas into functional digital experiences.
          </p>
        </div>

        {/* Right Column: Metadata Badges & Evolution Indicator */}
        <div
          ref={metaRef}
          className="flex flex-wrap sm:flex-nowrap lg:flex-col items-start lg:items-end gap-3 flex-shrink-0"
        >
          {/* Dynamic Technology Count */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>14 PRODUCTION TECHNOLOGIES</span>
          </div>

          {/* Domains Indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <span className="text-emerald-400 font-bold">03</span>
            <span>CORE ARCHITECTURAL DOMAINS</span>
          </div>

          {/* Active Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span>Continuous Stack Evolution</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SkillsIntro;
