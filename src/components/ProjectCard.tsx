"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, GithubLogo, LockSimple, Globe, Sparkle } from "@phosphor-icons/react";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  isMobile?: boolean;
  className?: string;
}

export function ProjectCard({
  project,
  index,
  total,
  isMobile = false,
  className = "",
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Format hostname for realistic browser bar
  const hostname = React.useMemo(() => {
    try {
      const url = new URL(project.liveUrl);
      return url.hostname;
    } catch {
      return project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
    }
  }, [project.liveUrl]);

  // 3D Card tilt and cursor spotlight tracking
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile || prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpotlight({ x, y, visible: true });

    // Micro tilt within -3deg to +3deg
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -3;
    const rotY = ((x - centerX) / centerX) * 3;
    setTilt({ x: rotX, y: rotY });
  };

  const handlePointerLeave = () => {
    setSpotlight((prev) => ({ ...prev, visible: false }));
    setTilt({ x: 0, y: 0 });
  };

  // Magnetic button pull
  const handleBtnMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (isMobile || prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.28;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.28;
    setBtnOffset({ x, y });
  };

  const handleBtnLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "group relative rounded-[2rem] sm:rounded-[2.5rem] p-1.5 sm:p-2 bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-white/[0.02] border border-white/[0.08] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.85)] transition-shadow duration-500 hover:shadow-[0_32px_80px_-16px_rgba(0,0,0,0.95)]",
        className
      )}
      style={{
        transform:
          !isMobile && !prefersReducedMotion && (tilt.x !== 0 || tilt.y !== 0)
            ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : undefined,
        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease",
      }}
    >
      {/* Inner surface container */}
      <div className="relative rounded-[calc(2rem-0.375rem)] sm:rounded-[calc(2.5rem-0.5rem)] bg-[#0d0d12]/95 backdrop-blur-2xl border border-white/[0.06] overflow-hidden flex flex-col justify-between h-full p-6 sm:p-8 lg:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
        
        {/* Dynamic inner cursor spotlight glow */}
        {!isMobile && !prefersReducedMotion && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500 z-0"
            style={{
              opacity: spotlight.visible ? 1 : 0,
              background: `radial-gradient(550px circle at ${spotlight.x}px ${spotlight.y}px, rgba(16, 185, 129, 0.08), transparent 70%)`,
            }}
          />
        )}

        {/* Ambient background blur accent */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/[0.04] rounded-full blur-[100px] group-hover:bg-emerald-500/[0.07] transition-all duration-700" />

        {/* Top Meta Bar */}
        <div className="relative z-10 flex items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-white/[0.06]">
          {/* Index Counter & Featured Tag */}
          <div className="flex items-center gap-3">
            <div className="font-mono text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 flex items-center gap-1.5 tracking-wider">
              <span className="font-bold text-zinc-100">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-500">{String(total).padStart(2, "0")}</span>
            </div>

            {project.featured && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                <Sparkle size={12} weight="fill" />
                <span>Featured Project</span>
              </span>
            )}
          </div>

          {/* Live Status indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            </span>
            <span className="font-mono text-xs font-medium text-zinc-400 tracking-wider uppercase hidden sm:inline-block">
              {project.year ? `${project.year} · Production` : "Production"}
            </span>
          </div>
        </div>

        {/* Main Content Area: Split 2-Column on Desktop */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center py-6 sm:py-8 my-auto">
          
          {/* Left Column: Project Editorial Information */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 order-2 lg:order-1">
            {project.role && (
              <span className="font-mono text-xs text-emerald-400 font-medium tracking-widest uppercase">
                {project.role}
              </span>
            )}

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-100 group-hover:text-white transition-colors leading-[1.15]">
              {project.title}
            </h3>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-[55ch]">
              {project.description}
            </p>

            {/* Architectural Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {project.highlights.map((item, hIdx) => (
                  <span
                    key={hIdx}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-300 font-medium px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/[0.06]"
                  >
                    <span className="text-emerald-400 font-mono text-[11px]">✦</span>
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Technology Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons Row */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              {/* Magnetic Live Demo Button */}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onPointerMove={handleBtnMove}
                onPointerLeave={handleBtnLeave}
                className="group/btn relative inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs sm:text-sm shadow-[0_0_24px_rgba(16,185,129,0.3)] transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_32px_rgba(16,185,129,0.5)] focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                style={{
                  transform:
                    btnOffset.x !== 0 || btnOffset.y !== 0
                      ? `translate(${btnOffset.x}px, ${btnOffset.y}px)`
                      : undefined,
                  transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <span>Live Preview</span>
                <span className="w-7 h-7 rounded-full bg-zinc-950/15 flex items-center justify-center text-zinc-950 transition-transform duration-300 group-hover/btn:rotate-45">
                  <ArrowUpRight size={14} weight="bold" />
                </span>
              </a>

              {/* Optional GitHub Button */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs sm:text-sm font-semibold text-zinc-300 hover:bg-white/[0.08] hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                >
                  <GithubLogo size={16} weight="bold" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Digital Product Browser Mockup */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="group/mockup relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:border-white/[0.18]">
              
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-white/[0.06] backdrop-blur-md">
                {/* Window Dots */}
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/[0.15]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/[0.15]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/[0.15]" />
                </div>

                {/* URL Address Bar Pill */}
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/50 border border-white/[0.06] font-mono text-[11px] text-zinc-400 max-w-[260px] sm:max-w-xs truncate">
                  <LockSimple size={11} weight="bold" className="text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{hostname}</span>
                </div>

                {/* Browser Actions */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} website in new tab`}
                  className="text-zinc-500 hover:text-emerald-400 transition-colors p-1 rounded-md"
                >
                  <Globe size={14} weight="bold" />
                </a>
              </div>

              {/* Website Preview Screenshot Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                <Image
                  src={project.image}
                  alt={`${project.title} live production website preview`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority={index === 0}
                  className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/mockup:scale-[1.035]"
                />

                {/* Vignette Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent" />

                {/* Hover Action Badge */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/[0.14] text-[11px] font-mono text-zinc-200 shadow-xl">
                    <span>View Site</span>
                    <ArrowUpRight size={11} weight="bold" className="text-emerald-400" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom subtle hairline */}
        <div className="relative z-10 pt-4 flex items-center justify-between text-[11px] font-mono text-zinc-600 border-t border-white/[0.04]">
          <span>DEPLOYED ARCHITECTURE</span>
          <span className="text-zinc-500">{project.tags.join(" · ")}</span>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;

