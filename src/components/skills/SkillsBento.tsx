"use client";

import React from "react";
import { TECH_DATA } from "./TechIcons";
import {
  Code,
  HardDrives,
  Wrench,
  Sparkle,
  Terminal,
  Database,
  ArrowUpRight,
  GitBranch,
  CloudArrowUp,
  Cpu,
} from "@phosphor-icons/react";

export function SkillsBento() {
  const frontendSkills = [
    TECH_DATA.react,
    TECH_DATA.nextjs,
    TECH_DATA.javascript,
    TECH_DATA.tailwind,
    TECH_DATA.html5,
    TECH_DATA.css3,
  ];

  const backendSkills = [
    TECH_DATA.python,
    TECH_DATA.flask,
    TECH_DATA.nodejs,
    TECH_DATA.mysql,
  ];

  const toolsSkills = [
    TECH_DATA.git,
    TECH_DATA.github,
    TECH_DATA.vercel,
    TECH_DATA.terminal,
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 my-16 sm:my-20">
      
      {/* Bento Grid Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold block mb-1">
            Asymmetric Stack Breakdown
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">
            Specialized Engineering Domains
          </h3>
        </div>
        <div className="hidden sm:block font-mono text-xs text-zinc-500">
          3 DOMAINS · 14 PRODUCTION TECHNOLOGIES
        </div>
      </div>

      {/* Asymmetric Bento Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ============================================================== */}
        {/* CARD 1: FRONTEND ENGINEERING (Featured, 7 Cols / ~58% width)   */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 group rounded-[2.5rem] p-1.5 bg-gradient-to-b from-emerald-500/20 via-white/[0.04] to-white/[0.02] border border-emerald-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-emerald-500/50 hover:-translate-y-1">
          <div className="h-full rounded-[calc(2.5rem-0.375rem)] bg-[#0d0d12]/95 backdrop-blur-xl border border-white/[0.06] p-6 sm:p-8 lg:p-9 flex flex-col justify-between relative overflow-hidden">
            
            {/* Ambient emerald backlight */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/[0.07] rounded-full blur-[100px]" />

            <div>
              {/* Category Top Bar */}
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/[0.06] mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 flex items-center justify-center shadow-[0_0_16px_rgba(16,185,129,0.25)]">
                    <Code size={24} weight="bold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                        Primary Specialty
                      </span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-zinc-100">
                      Frontend Engineering
                    </h4>
                  </div>
                </div>

                <div className="font-mono text-xs text-zinc-400 hidden sm:block">
                  06 STACKS
                </div>
              </div>

              {/* Editorial Description */}
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
                Crafting performant, accessible user interfaces with clean semantic HTML, modular CSS systems, reactive component architectures, and responsive Next.js App Router patterns.
              </p>

              {/* Skills Interactive List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                {frontendSkills.map((skill) => {
                  const IconComp = skill.icon;
                  return (
                    <div
                      key={skill.id}
                      className="group/item p-3.5 rounded-2xl bg-white/[0.025] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: skill.accentBg }}
                          >
                            <IconComp size={16} style={{ color: skill.color }} stroke={1.75} />
                          </div>
                          <span className="text-sm font-bold text-zinc-200 group-hover/item:text-white transition-colors">
                            {skill.shortName}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 uppercase tracking-tight">
                          {skill.proficiency}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                        {skill.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom highlights */}
            <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>RESPONSIVE · ACCESSIBLE · PERFORMANCE-FIRST</span>
              <span className="text-emerald-400">REACT 19 &amp; NEXT.js 15</span>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* CARD 2: BACKEND & DATABASE (5 Cols / ~42% width)                */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 group rounded-[2.5rem] p-1.5 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-white/[0.18] hover:-translate-y-1">
          <div className="h-full rounded-[calc(2.5rem-0.375rem)] bg-[#0d0d12]/95 backdrop-blur-xl border border-white/[0.06] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            
            {/* Ambient blue/cyan backlight */}
            <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-blue-500/[0.05] rounded-full blur-[100px]" />

            <div>
              {/* Category Top Bar */}
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/[0.06] mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-zinc-200 flex items-center justify-center group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                    <HardDrives size={24} weight="bold" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 font-semibold block w-fit mb-1">
                      Data &amp; Logic
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold text-zinc-100">
                      Backend &amp; Database
                    </h4>
                  </div>
                </div>

                <div className="font-mono text-xs text-zinc-400 hidden sm:block">
                  04 STACKS
                </div>
              </div>

              {/* Editorial Description */}
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Engineering structured relational schemas, SQL databases, Python scripts, Flask REST APIs, and asynchronous Node.js backend workflows.
              </p>

              {/* Skills List */}
              <div className="space-y-3 mb-6">
                {backendSkills.map((skill) => {
                  const IconComp = skill.icon;
                  return (
                    <div
                      key={skill.id}
                      className="group/item p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.04] transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: skill.accentBg }}
                          >
                            <IconComp size={16} style={{ color: skill.color }} stroke={1.75} />
                          </div>
                          <span className="text-sm font-bold text-zinc-200 group-hover/item:text-white transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 uppercase tracking-tight">
                          {skill.proficiency}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed pl-9">
                        {skill.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom highlights */}
            <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>RELATIONAL INTEGRITY · REST APIS</span>
              <span className="text-zinc-400">PYTHON &amp; SQL</span>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* CARD 3: TOOLS & INFRASTRUCTURE (12 Cols / Wide Supporting Span) */}
        {/* ============================================================== */}
        <div className="lg:col-span-12 group rounded-[2.5rem] p-1.5 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-white/[0.18] hover:-translate-y-1">
          <div className="rounded-[calc(2.5rem-0.375rem)] bg-[#0d0d12]/95 backdrop-blur-xl border border-white/[0.06] p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-zinc-200 flex items-center justify-center group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                  <Wrench size={24} weight="bold" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 font-semibold block w-fit mb-1">
                    Workflow &amp; Delivery
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-zinc-100">
                    Tools &amp; Developer Infrastructure
                  </h4>
                </div>
              </div>

              <div className="font-mono text-xs text-zinc-400">
                CI/CD · VERSION CONTROL · AUTOMATION
              </div>
            </div>

            {/* 4-Column Grid for Tools */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {toolsSkills.map((skill) => {
                const IconComp = skill.icon;
                return (
                  <div
                    key={skill.id}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: skill.accentBg }}
                        >
                          <IconComp size={20} style={{ color: skill.color }} stroke={1.75} />
                        </div>
                        <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 uppercase tracking-tight">
                          {skill.proficiency}
                        </span>
                      </div>
                      <h5 className="text-base font-bold text-zinc-100 mb-1.5">
                        {skill.name}
                      </h5>
                      <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                        {skill.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <span>TOOLCHAIN</span>
                      <span className="text-emerald-400">PRODUCTION</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Terminal Pipeline Bar Mockup */}
            <div className="rounded-2xl p-4 bg-black/60 border border-white/[0.06] font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-zinc-400">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                </div>
                <span className="text-zinc-500">pipeline:</span>
                <span className="text-emerald-400 font-semibold">git push origin main → vercel deploy: ready</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Zero Downtime Deployment</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default SkillsBento;

