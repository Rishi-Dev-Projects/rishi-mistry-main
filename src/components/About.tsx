"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
  EnvelopeSimple,
  HardDrives,
  Atom,
  CloudArrowUp,
  MapPin,
  GraduationCap,
  ArrowUpRight,
  Sparkle,
  TerminalWindow,
  CheckCircle,
  Lightning,
  Compass,
} from "@phosphor-icons/react";
import { Eyebrow } from "./ui/Eyebrow";
import { PERSONAL_INFO } from "@/lib/data";
import { cn } from "@/lib/utils";

const CORE_PILLARS = [
  {
    id: "backend",
    title: "Systems & Backend Architecture",
    badge: "Core Discipline",
    icon: HardDrives,
    skills: ["Python", "Flask", "Node.js", "MySQL", "Relational DBs", "REST APIs"],
    description:
      "Architecting dependable server routines, data pipelines, and relational database schemas with high transaction integrity.",
  },
  {
    id: "frontend",
    title: "Creative Frontend & UI Systems",
    badge: "Craft & Velocity",
    icon: Atom,
    skills: ["React", "Next.js", "Tailwind CSS", "Three.js", "Framer Motion", "GSAP"],
    description:
      "Engineering fluid 60fps micro-interactions, responsive mobile grids, and expressive design systems that never feel templated.",
  },
  {
    id: "devops",
    title: "Cloud Infrastructure & Tooling",
    badge: "Production Rigor",
    icon: CloudArrowUp,
    skills: ["Git", "GitHub Actions", "Vercel Edge", "Linux / Bash", "CI/CD"],
    description:
      "Deploying high-availability platforms with strict version hygiene, edge caching strategies, and automated delivery.",
  },
];

const TRAJECTORY_STAGES = [
  {
    phase: "01",
    title: "Academic Rigor",
    context: "N.G. Patel Polytechnic",
    description: "Deep dive into data structures, operating systems, networking protocols, and C/Python programming.",
    status: "Active Foundation",
  },
  {
    phase: "02",
    title: "Production Proof",
    context: "Client Platforms",
    description: "Shipped commercial web applications for furniture enterprises and commercial services with dynamic catalogs.",
    status: "Verified Builds",
  },
  {
    phase: "03",
    title: "Modern Ecosystem",
    context: "Full-Stack Velocity",
    description: "Next.js App Router, 3D WebGL physics, Tailwind v3 architecture, and performance-tuned frontend systems.",
    status: "Production Standard",
  },
  {
    phase: "04",
    title: "Next Horizon",
    context: "Scale & Impact",
    description: "Contributing to high-throughput distributed systems, open-source engineering, and modern digital platforms.",
    status: "In Trajectory",
  },
];

export function About() {
  const [activePillar, setActivePillar] = useState<string>("backend");

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <Eyebrow showDot>About &amp; Philosophy</Eyebrow>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-zinc-100 leading-[1.08] mb-6">
            Driven by curiosity, engineered with precision.
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-2xl">
            An Information Technology student and web developer based in Gujarat, India. I bridge rigorous systems fundamentals at N.G. Patel Polytechnic with expressive, production-ready frontend craft.
          </p>
        </div>

        {/* 12-Column Asymmetric Core Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start mb-16">
          
          {/* Left Column (7 cols): Terminal Dossier & Engineering Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Dossier Card: Terminal Window Theme */}
            <div className="relative rounded-[2rem] p-1 bg-white/[0.02] border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              <div className="h-full w-full rounded-[calc(2rem-0.25rem)] bg-[#111115] border border-white/[0.06] p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                
                {/* Terminal Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
                    <span className="ml-1.5 text-xs font-mono text-zinc-400">
                      sys://identity/rishi_mistry.md
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-semibold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>STATUS: ONLINE</span>
                  </div>
                </div>

                {/* Narrative Text */}
                <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
                  <p>
                    My journey in computer science started with understanding what happens behind the screen: how networks route packets across switches, how relational engines resolve relational queries, and how hardware transforms logic into interactive systems.
                  </p>
                  <p>
                    Currently pursuing my <span className="text-zinc-100 font-semibold">Diploma in Information Technology at N.G. Patel Polytechnic</span>, I develop software with a deep appreciation for foundational architecture. I translate abstract concepts into tangible, responsive digital experiences built to last.
                  </p>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    Today, that technical base powers live production platforms—including custom e-commerce systems, inventory engines, and high-performance commercial websites.
                  </p>
                </div>

                {/* Hardware & Identity Telemetry Grid */}
                <div className="mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="flex items-center gap-2 text-emerald-400 mb-1">
                      <GraduationCap size={16} weight="bold" />
                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Institution</span>
                    </div>
                    <span className="text-sm font-semibold text-zinc-200 block">
                      N.G. Patel Polytechnic, Isroli
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">Diploma in IT (2024 — Present)</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="flex items-center gap-2 text-emerald-400 mb-1">
                      <MapPin size={16} weight="bold" />
                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Location Base</span>
                    </div>
                    <span className="text-sm font-semibold text-zinc-200 block">
                      Gujarat, India
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">UTC+05:30 (IST)</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Core Disciplines Showcase */}
            <div className="relative rounded-[2rem] p-1 bg-white/[0.02] border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              <div className="h-full w-full rounded-[calc(2rem-0.25rem)] bg-[#111115] border border-white/[0.06] p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                      <Lightning size={18} weight="bold" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-zinc-100">Core Engineering Pillars</h3>
                      <p className="text-xs text-zinc-400">Key disciplines practiced across daily development</p>
                    </div>
                  </div>
                </div>

                {/* Pillar Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
                  {CORE_PILLARS.map((pillar) => {
                    const isSelected = activePillar === pillar.id;
                    const IconComponent = pillar.icon;
                    return (
                      <button
                        key={pillar.id}
                        type="button"
                        onClick={() => setActivePillar(pillar.id)}
                        className={cn(
                          "flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all duration-300 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                          isSelected
                            ? "bg-white/[0.08] border-emerald-500/40 text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_12px_rgba(0,0,0,0.3)]"
                            : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                        )}
                      >
                        <IconComponent
                          size={16}
                          weight="bold"
                          className={isSelected ? "text-emerald-400" : "text-zinc-500"}
                        />
                        <span className="truncate">{pillar.title.split(" ")[0]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Pillar Content */}
                {CORE_PILLARS.map((pillar) => {
                  if (pillar.id !== activePillar) return null;
                  const IconComponent = pillar.icon;
                  return (
                    <motion.div
                      key={pillar.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-zinc-100 font-bold text-sm">
                          <IconComponent size={18} weight="bold" className="text-emerald-400" />
                          <span>{pillar.title}</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold uppercase tracking-wider">
                          {pillar.badge}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                        {pillar.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {pillar.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300"
                          >
                            <span className="w-1 h-1 rounded-full bg-emerald-400" />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}

              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Portrait Card & Live Stats */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Signature Portrait Card */}
            <div className="relative rounded-[2rem] p-1 bg-white/[0.02] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="h-full w-full rounded-[calc(2rem-0.25rem)] bg-[#111115] border border-white/[0.06] p-6 sm:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col">
                
                {/* Top Badge Tray */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                    <TerminalWindow size={14} className="text-emerald-400" weight="bold" />
                    <span>ID_CARD // RM-2026</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>AVAILABLE</span>
                  </span>
                </div>

                {/* Portrait Visual Showcase */}
                <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.05] to-zinc-950 border border-white/[0.1] shadow-inner flex items-center justify-center mb-5 group">
                  {/* Subtle Background Radial */}
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(16,185,129,0.18),transparent_65%)] pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Bitmoji Portrait */}
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={PERSONAL_INFO.profileImage}
                      alt={`${PERSONAL_INFO.name} signature portrait`}
                      fill
                      sizes="(max-width: 768px) 176px, 208px"
                      priority
                      className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                    />
                  </div>

                  {/* Gradient Baseline Fade */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111115] to-transparent pointer-events-none" />
                </div>

                {/* Identity Lockup & Social Dock */}
                <div className="flex flex-col gap-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-100">
                      {PERSONAL_INFO.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-emerald-400">
                      {PERSONAL_INFO.role}
                    </p>
                  </div>

                  {/* Interactive Social Dock */}
                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={PERSONAL_INFO.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-emerald-500/30 text-zinc-300 hover:text-emerald-400 text-xs font-semibold transition-all duration-300 active:scale-[0.98]"
                      aria-label="GitHub Profile"
                    >
                      <GithubLogo size={16} weight="bold" />
                      <span>GitHub</span>
                    </a>

                    <a
                      href={PERSONAL_INFO.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-emerald-500/30 text-zinc-300 hover:text-emerald-400 text-xs font-semibold transition-all duration-300 active:scale-[0.98]"
                      aria-label="LinkedIn Profile"
                    >
                      <LinkedinLogo size={16} weight="bold" />
                      <span>LinkedIn</span>
                    </a>

                    <a
                      href={PERSONAL_INFO.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-emerald-500/30 text-zinc-300 hover:text-emerald-400 transition-all duration-300 active:scale-[0.98]"
                      aria-label="Instagram Profile"
                    >
                      <InstagramLogo size={16} weight="bold" />
                    </a>

                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-emerald-500/30 text-zinc-300 hover:text-emerald-400 transition-all duration-300 active:scale-[0.98]"
                      aria-label="Send direct email"
                    >
                      <EnvelopeSimple size={16} weight="bold" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Impact & Proof Telemetry Grid (Stats) */}
            <div className="relative rounded-[2rem] p-1 bg-white/[0.02] border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              <div className="h-full w-full rounded-[calc(2rem-0.25rem)] bg-[#111115] border border-white/[0.06] p-6 sm:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wider mb-5">
                  <Sparkle size={14} className="text-emerald-400" weight="bold" />
                  <span>Verified Impact Metrics</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {PERSONAL_INFO.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-4 bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-all duration-300 group flex flex-col justify-between"
                    >
                      <span className="font-mono text-3xl sm:text-4xl font-extrabold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                        {stat.number}
                      </span>
                      <span className="text-xs text-zinc-400 font-medium leading-snug mt-2">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Bottom Feature Ribbon: Trajectory & Milestones */}
        <div className="relative rounded-[2rem] p-1 bg-white/[0.02] border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
          <div className="h-full w-full rounded-[calc(2rem-0.25rem)] bg-[#111115] border border-white/[0.06] p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <Compass size={18} weight="bold" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100">Engineering Trajectory</h3>
                  <p className="text-xs sm:text-sm text-zinc-400">Chronological growth from academic foundations to high-scale delivery</p>
                </div>
              </div>

              <span className="text-[11px] font-mono text-zinc-400 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] w-fit">
                2022 — PRESENT &amp; BEYOND
              </span>
            </div>

            {/* 4-Stage Trajectory Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TRAJECTORY_STAGES.map((stage, i) => (
                <div
                  key={stage.phase}
                  className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        PHASE {stage.phase}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-400">
                        {stage.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-zinc-100 mb-1 group-hover:text-emerald-400 transition-colors">
                      {stage.title}
                    </h4>

                    <span className="text-[11px] font-mono text-zinc-400 block mb-2">
                      {stage.context}
                    </span>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 group-hover:text-emerald-400/80 transition-colors">
                    <CheckCircle size={13} weight="bold" />
                    <span>MILESTONE VERIFIED</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
