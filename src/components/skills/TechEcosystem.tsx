"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TECH_DATA, TechMeta } from "./TechIcons";
import { Cpu, Code, HardDrives, Wrench } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 12 Authentic Technologies partitioned into 3 distinct architectural clusters
const FRONTEND_TECHS: TechMeta[] = [
  TECH_DATA.react,
  TECH_DATA.nextjs,
  TECH_DATA.javascript,
  TECH_DATA.tailwind,
];

const BACKEND_TECHS: TechMeta[] = [
  TECH_DATA.python,
  TECH_DATA.flask,
  TECH_DATA.nodejs,
  TECH_DATA.mysql,
];

const TOOLS_TECHS: TechMeta[] = [
  TECH_DATA.git,
  TECH_DATA.github,
  TECH_DATA.vercel,
  TECH_DATA.terminal,
];

interface TechCardProps {
  tech: TechMeta;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  className?: string;
  cardRef?: (el: HTMLDivElement | null) => void;
}

function TechNodeCard({
  tech,
  isHovered,
  onHover,
  className = "",
  cardRef,
}: TechCardProps) {
  const IconComp = tech.icon;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => onHover(tech.id)}
      onMouseLeave={() => onHover(null)}
      className={cn(
        "group/node relative flex items-center gap-3.5 px-4 py-3.5 rounded-2xl bg-[#0e0e14]/90 border backdrop-blur-xl transition-all duration-300 cursor-pointer select-none min-h-[74px]",
        isHovered
          ? "border-emerald-400/80 bg-zinc-900/95 shadow-[0_0_28px_rgba(16,185,129,0.28)] -translate-y-0.5 scale-[1.02]"
          : "border-white/[0.08] hover:border-white/[0.2] hover:bg-[#12121a]/90 shadow-[0_4px_20px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {/* Brand Icon Box (28px - 32px Icon) */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/node:scale-110 shadow-inner"
        style={{ backgroundColor: tech.accentBg }}
      >
        <IconComp
          size={28}
          style={{ color: tech.color }}
          stroke={1.75}
        />
      </div>

      {/* Details */}
      <div className="flex flex-col text-left min-w-0 flex-1">
        <span className="text-sm font-bold text-zinc-100 group-hover/node:text-white transition-colors truncate">
          {tech.shortName}
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors",
              isHovered ? "bg-emerald-400 shadow-[0_0_6px_#10b981]" : "bg-emerald-500/80"
            )}
          />
          <span className="font-mono text-[11px] text-emerald-400/90 font-medium tracking-tight whitespace-nowrap">
            {tech.proficiency}
          </span>
        </div>
      </div>
    </div>
  );
}

export function TechEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const frontendRef = useRef<HTMLDivElement>(null);
  const backendRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const leftBridgeRef = useRef<SVGPathElement[]>([]);
  const rightBridgeRef = useRef<SVGPathElement[]>([]);
  const trunkLinesRef = useRef<SVGPathElement[]>([]);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          once: true,
        },
      });

      // 1. Header reveal
      if (headerRef.current) {
        tl.from(headerRef.current, {
          opacity: 0,
          y: 16,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      // 2. Central identity hub appears with authority
      if (coreRef.current) {
        tl.from(
          coreRef.current,
          {
            scale: 0.75,
            opacity: 0,
            y: 12,
            duration: 0.7,
            ease: "back.out(1.5)",
          },
          "-=0.3"
        );
      }

      // 3. Frontend cluster enters from the left
      if (frontendRef.current) {
        tl.from(
          frontendRef.current,
          {
            x: -24,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }

      // 4. Backend cluster enters from the right
      if (backendRef.current) {
        tl.from(
          backendRef.current,
          {
            x: 24,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }

      // 5. Tools cluster enters from below
      if (toolsRef.current) {
        tl.from(
          toolsRef.current,
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }

      // 6. SVG connection paths draw themselves cleanly
      const allPaths = [
        ...leftBridgeRef.current,
        ...rightBridgeRef.current,
        ...trunkLinesRef.current,
      ].filter(Boolean);

      if (allPaths.length > 0) {
        tl.from(
          allPaths,
          {
            strokeDashoffset: 300,
            opacity: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeTech = hoveredId ? TECH_DATA[hoveredId] : null;

  // Determine active cluster status for dynamic line illumination
  const isFrontendActive = FRONTEND_TECHS.some((t) => t.id === hoveredId);
  const isBackendActive = BACKEND_TECHS.some((t) => t.id === hoveredId);
  const isToolsActive = TOOLS_TECHS.some((t) => t.id === hoveredId);

  return (
    <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 my-16 sm:my-24">
      {/* Ecosystem Outer Bezel Shell */}
      <div
        ref={containerRef}
        className="relative rounded-[2.5rem] p-1.5 bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-white/[0.01] border border-white/[0.08] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.85)] overflow-hidden"
      >
        <div className="relative rounded-[calc(2.5rem-0.375rem)] bg-[#0c0c11]/95 backdrop-blur-2xl border border-white/[0.06] p-6 sm:p-8 lg:p-10 overflow-hidden flex flex-col justify-between">
          
          {/* Subtle Circuit Grid Texture */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035]" />
          
          {/* Central Radial Emerald Ambient Glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[340px] bg-emerald-500/[0.07] rounded-full blur-[100px]" />

          {/* ============================================================== */}
          {/* 1. HEADER BAR INSIDE ECOSYSTEM                                 */}
          {/* ============================================================== */}
          <div
            ref={headerRef}
            className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]"
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                  Structured Technology Network
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">
                Live Technology Ecosystem
              </h3>
            </div>

            {/* Interactive Focus Status Indicator */}
            <div className="font-mono text-xs text-zinc-300 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
              <span>
                {activeTech
                  ? `${activeTech.name} · ${activeTech.proficiency} Level · ${activeTech.category.toUpperCase()}`
                  : "3 Connected Clusters · 12 Core Production Technologies"}
              </span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 2. DESKTOP STRUCTURED TECHNOLOGY NETWORK (Visible >= 1024px)   */}
          {/* ============================================================== */}
          <div className="hidden lg:block relative z-10 my-8 select-none">
            
            {/* --- TOP ROW: 3 Distinct Regions (Frontend | Identity Hub | Backend) --- */}
            <div className="grid grid-cols-[1fr_44px_auto_44px_1fr] items-center">
              
              {/* LEFT REGION — FRONTEND ENGINEERING (2x2 Grid) */}
              <div ref={frontendRef} className="flex flex-col">
                <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Code size={14} weight="bold" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-200 font-bold">
                      Frontend Engineering
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                    4 Modules
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {FRONTEND_TECHS.map((tech) => (
                    <TechNodeCard
                      key={tech.id}
                      tech={tech}
                      isHovered={hoveredId === tech.id}
                      onHover={setHoveredId}
                    />
                  ))}
                </div>
              </div>

              {/* LEFT SVG CONNECTOR BRIDGE (Frontend to Central Hub) */}
              <div className="h-full flex items-center justify-center pt-8">
                <svg
                  className="w-11 h-[156px] overflow-visible"
                  viewBox="0 0 44 156"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="bridge-grad-left" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  {/* Trace 1: From React/Next.js Row (Y=37) to Hub Port (Y=78) */}
                  <path
                    ref={(el) => {
                      if (el) leftBridgeRef.current[0] = el;
                    }}
                    d="M 0 37 C 22 37, 22 78, 44 78"
                    stroke={
                      isFrontendActive || hoveredId === "react" || hoveredId === "nextjs"
                        ? "#10b981"
                        : "rgba(16, 185, 129, 0.35)"
                    }
                    strokeWidth={
                      isFrontendActive || hoveredId === "react" || hoveredId === "nextjs"
                        ? 2.5
                        : 1.5
                    }
                    strokeDasharray={
                      isFrontendActive || hoveredId === "react" || hoveredId === "nextjs"
                        ? "none"
                        : "4 3"
                    }
                    className="transition-all duration-300"
                  />

                  {/* Trace 2: From JS/Tailwind Row (Y=119) to Hub Port (Y=78) */}
                  <path
                    ref={(el) => {
                      if (el) leftBridgeRef.current[1] = el;
                    }}
                    d="M 0 119 C 22 119, 22 78, 44 78"
                    stroke={
                      isFrontendActive || hoveredId === "javascript" || hoveredId === "tailwind"
                        ? "#10b981"
                        : "rgba(16, 185, 129, 0.35)"
                    }
                    strokeWidth={
                      isFrontendActive || hoveredId === "javascript" || hoveredId === "tailwind"
                        ? 2.5
                        : 1.5
                    }
                    strokeDasharray={
                      isFrontendActive || hoveredId === "javascript" || hoveredId === "tailwind"
                        ? "none"
                        : "4 3"
                    }
                    className="transition-all duration-300"
                  />

                  {/* Junction Node onto Hub */}
                  <circle
                    cx="44"
                    cy="78"
                    r="3.5"
                    fill={isFrontendActive ? "#10b981" : "#059669"}
                    className="transition-colors duration-300"
                  />
                </svg>
              </div>

              {/* CENTER REGION — IDENTITY HUB (Rishi Mistry Anchor) */}
              <div
                ref={coreRef}
                className="relative z-20 flex flex-col items-center justify-center px-6 py-6 rounded-3xl bg-[#09090b]/95 border-2 border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.2)] text-center select-none backdrop-blur-2xl w-[232px] group/core hover:border-emerald-400 hover:shadow-[0_0_52px_rgba(16,185,129,0.32)] transition-all duration-300"
              >
                {/* Left & Right & Bottom Physical Connector Port Dots */}
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-zinc-950 shadow-[0_0_8px_#10b981]" />
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-zinc-950 shadow-[0_0_8px_#10b981]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-zinc-950 shadow-[0_0_8px_#10b981]" />

                {/* Micro Chip Icon */}
                <div className="w-13 h-13 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-2.5 shadow-[0_0_20px_rgba(16,185,129,0.3),inset_0_1px_1px_rgba(255,255,255,0.25)] group-hover/core:scale-105 transition-transform">
                  <Cpu size={30} weight="bold" />
                </div>

                {/* Eyebrow with Pulsing Ping */}
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                    Core Stack
                  </span>
                </div>

                {/* Name */}
                <span className="text-base sm:text-lg font-extrabold text-zinc-100 tracking-tight whitespace-nowrap">
                  Rishi Mistry
                </span>

                {/* Subtitle */}
                <span className="font-mono text-[11px] text-zinc-400 mt-0.5 whitespace-nowrap">
                  Full-Stack Architecture
                </span>

                {/* Module Pill */}
                <div className="mt-3 px-3 py-0.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/25 text-[10px] font-mono text-emerald-400/90 font-medium">
                  12 Core Modules
                </div>
              </div>

              {/* RIGHT SVG CONNECTOR BRIDGE (Central Hub to Backend) */}
              <div className="h-full flex items-center justify-center pt-8">
                <svg
                  className="w-11 h-[156px] overflow-visible"
                  viewBox="0 0 44 156"
                  fill="none"
                >
                  {/* Trace 1: From Hub Port (Y=78) to Python/Flask Row (Y=37) */}
                  <path
                    ref={(el) => {
                      if (el) rightBridgeRef.current[0] = el;
                    }}
                    d="M 0 78 C 22 78, 22 37, 44 37"
                    stroke={
                      isBackendActive || hoveredId === "python" || hoveredId === "flask"
                        ? "#10b981"
                        : "rgba(16, 185, 129, 0.35)"
                    }
                    strokeWidth={
                      isBackendActive || hoveredId === "python" || hoveredId === "flask"
                        ? 2.5
                        : 1.5
                    }
                    strokeDasharray={
                      isBackendActive || hoveredId === "python" || hoveredId === "flask"
                        ? "none"
                        : "4 3"
                    }
                    className="transition-all duration-300"
                  />

                  {/* Trace 2: From Hub Port (Y=78) to Node/MySQL Row (Y=119) */}
                  <path
                    ref={(el) => {
                      if (el) rightBridgeRef.current[1] = el;
                    }}
                    d="M 0 78 C 22 78, 22 119, 44 119"
                    stroke={
                      isBackendActive || hoveredId === "nodejs" || hoveredId === "mysql"
                        ? "#10b981"
                        : "rgba(16, 185, 129, 0.35)"
                    }
                    strokeWidth={
                      isBackendActive || hoveredId === "nodejs" || hoveredId === "mysql"
                        ? 2.5
                        : 1.5
                    }
                    strokeDasharray={
                      isBackendActive || hoveredId === "nodejs" || hoveredId === "mysql"
                        ? "none"
                        : "4 3"
                    }
                    className="transition-all duration-300"
                  />

                  {/* Junction Node onto Hub */}
                  <circle
                    cx="0"
                    cy="78"
                    r="3.5"
                    fill={isBackendActive ? "#10b981" : "#059669"}
                    className="transition-colors duration-300"
                  />
                </svg>
              </div>

              {/* RIGHT REGION — BACKEND & DATABASE (2x2 Grid) */}
              <div ref={backendRef} className="flex flex-col">
                <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <HardDrives size={14} weight="bold" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-200 font-bold">
                      Backend &amp; Database
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                    4 Modules
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {BACKEND_TECHS.map((tech) => (
                    <TechNodeCard
                      key={tech.id}
                      tech={tech}
                      isHovered={hoveredId === tech.id}
                      onHover={setHoveredId}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* --- VERTICAL TRUNK CONNECTION (From Hub to Tools Cluster) --- */}
            <div className="relative my-6 flex flex-col items-center">
              {/* Vertical Conduit Line descending from Center Hub */}
              <div className="w-[2px] h-7 bg-gradient-to-b from-emerald-500/80 via-emerald-500/50 to-emerald-500/20" />

              {/* SVG 4-Way Horizontal Distributor Bus */}
              <div className="w-full max-w-5xl px-4">
                <svg
                  className="w-full h-8 overflow-visible"
                  viewBox="0 0 1000 32"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  {/* Central feed */}
                  <path
                    ref={(el) => {
                      if (el) trunkLinesRef.current[0] = el;
                    }}
                    d="M 500 0 L 500 16"
                    stroke={isToolsActive ? "#10b981" : "rgba(16, 185, 129, 0.6)"}
                    strokeWidth={isToolsActive ? 2.5 : 1.75}
                  />

                  {/* Horizontal distribution trace */}
                  <path
                    ref={(el) => {
                      if (el) trunkLinesRef.current[1] = el;
                    }}
                    d="M 125 32 L 125 16 L 875 16 L 875 32"
                    stroke={isToolsActive ? "#10b981" : "rgba(16, 185, 129, 0.35)"}
                    strokeWidth={isToolsActive ? 2 : 1.5}
                    strokeDasharray={isToolsActive ? "none" : "5 4"}
                    className="transition-all duration-300"
                  />

                  {/* Middle drops to GitHub (375) and Vercel (625) */}
                  <path
                    ref={(el) => {
                      if (el) trunkLinesRef.current[2] = el;
                    }}
                    d="M 375 16 L 375 32"
                    stroke={isToolsActive ? "#10b981" : "rgba(16, 185, 129, 0.35)"}
                    strokeWidth={isToolsActive ? 2 : 1.5}
                    strokeDasharray={isToolsActive ? "none" : "5 4"}
                  />
                  <path
                    ref={(el) => {
                      if (el) trunkLinesRef.current[3] = el;
                    }}
                    d="M 625 16 L 625 32"
                    stroke={isToolsActive ? "#10b981" : "rgba(16, 185, 129, 0.35)"}
                    strokeWidth={isToolsActive ? 2 : 1.5}
                    strokeDasharray={isToolsActive ? "none" : "5 4"}
                  />

                  {/* Junction Nodes at feed and drop-points */}
                  <circle cx="500" cy="16" r="3.5" fill="#10b981" />
                  <circle cx="125" cy="32" r="2.5" fill="#10b981" />
                  <circle cx="375" cy="32" r="2.5" fill="#10b981" />
                  <circle cx="625" cy="32" r="2.5" fill="#10b981" />
                  <circle cx="875" cy="32" r="2.5" fill="#10b981" />
                </svg>
              </div>
            </div>

            {/* --- BOTTOM REGION — TOOLS & INFRASTRUCTURE (4 Equal Horizontal Nodes) --- */}
            <div ref={toolsRef} className="flex flex-col">
              <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Wrench size={14} weight="bold" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-200 font-bold">
                    Tools &amp; Infrastructure
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400 px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                  4 Modules · Deployment &amp; CI/CD
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {TOOLS_TECHS.map((tech) => (
                  <TechNodeCard
                    key={tech.id}
                    tech={tech}
                    isHovered={hoveredId === tech.id}
                    onHover={setHoveredId}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* 3. MOBILE & TABLET STRUCTURED NETWORK VIEW (Visible < 1024px)  */}
          {/* ============================================================== */}
          <div className="block lg:hidden my-6 space-y-5">
            
            {/* Central Identity Hub (Mobile) */}
            <div className="flex flex-col items-center justify-center p-5 rounded-3xl bg-[#09090b] border-2 border-emerald-500/40 shadow-[0_0_28px_rgba(16,185,129,0.2)] text-center max-w-sm mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-2 shadow-[0_0_16px_rgba(16,185,129,0.25)]">
                <Cpu size={26} weight="bold" />
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                  Core Stack
                </span>
              </div>
              <span className="text-base font-extrabold text-zinc-100">
                Rishi Mistry
              </span>
              <span className="font-mono text-[11px] text-zinc-400">
                Full-Stack Architecture
              </span>
              <div className="mt-2.5 px-3 py-0.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/25 text-[10px] font-mono text-emerald-400/90 font-medium">
                12 Core Modules
              </div>
            </div>

            {/* Connecting Vertical Stem */}
            <div className="w-[2px] h-5 bg-gradient-to-b from-emerald-500/60 to-white/[0.1] mx-auto" />

            {/* Cluster 1: Frontend Engineering */}
            <div className="rounded-2xl p-4 bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <Code size={16} className="text-emerald-400" />
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-200 font-semibold">
                    Frontend Engineering
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400">4 Modules</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FRONTEND_TECHS.map((tech) => (
                  <TechNodeCard
                    key={`mob-${tech.id}`}
                    tech={tech}
                    isHovered={hoveredId === tech.id}
                    onHover={setHoveredId}
                  />
                ))}
              </div>
            </div>

            {/* Connecting Vertical Stem */}
            <div className="w-[2px] h-4 bg-white/[0.08] mx-auto" />

            {/* Cluster 2: Backend & Database */}
            <div className="rounded-2xl p-4 bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <HardDrives size={16} className="text-emerald-400" />
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-200 font-semibold">
                    Backend &amp; Database
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400">4 Modules</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BACKEND_TECHS.map((tech) => (
                  <TechNodeCard
                    key={`mob-${tech.id}`}
                    tech={tech}
                    isHovered={hoveredId === tech.id}
                    onHover={setHoveredId}
                  />
                ))}
              </div>
            </div>

            {/* Connecting Vertical Stem */}
            <div className="w-[2px] h-4 bg-white/[0.08] mx-auto" />

            {/* Cluster 3: Tools & Infrastructure */}
            <div className="rounded-2xl p-4 bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <Wrench size={16} className="text-emerald-400" />
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-200 font-semibold">
                    Tools &amp; Infrastructure
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400">4 Modules</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TOOLS_TECHS.map((tech) => (
                  <TechNodeCard
                    key={`mob-${tech.id}`}
                    tech={tech}
                    isHovered={hoveredId === tech.id}
                    onHover={setHoveredId}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* 4. BOTTOM FOOTNOTE / ARCHITECTURE SPECIFICATION                 */}
          {/* ============================================================== */}
          <div className="relative z-20 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-zinc-500 border-t border-white/[0.04] gap-2">
            <span>FULL-STACK PIPELINE: 4 FRONTEND · 4 BACKEND · 4 TOOLS &amp; DEVOPS</span>
            <div className="flex items-center gap-2 text-emerald-400/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>12 PRODUCTION TECHNOLOGIES SYNCHRONIZED</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TechEcosystem;