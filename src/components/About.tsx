"use client";

import React from "react";
import Image from "next/image";
import {
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
  EnvelopeSimple,
  Stack,
  Compass,
  Code,
  Database,
  Network,
  Robot,
  DeviceMobile,
  Cloud,
  Certificate,
  Cube,
  GitBranch,
  Briefcase,
  Users,
  Lightning,
} from "@phosphor-icons/react";
import { BentoCard } from "./ui/BentoCard";
import { Eyebrow } from "./ui/Eyebrow";
import { PERSONAL_INFO } from "@/lib/data";

const INTEREST_ICONS = [
  Code,
  Database,
  Network,
  Robot,
  DeviceMobile,
  Cloud,
];

const ROADMAP_ICONS = [
  Certificate,
  Cube,
  GitBranch,
  Briefcase,
  Users,
  Lightning,
];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <Eyebrow>About Me</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100 leading-tight mb-4">
            Driven by curiosity, engineered with precision.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            A background grounded in technical fundamentals and a passion for crafting frictionless digital products.
          </p>
        </div>

        {/* 12-Column Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Tile 1: Profile Story (7 Cols) */}
          <BentoCard className="lg:col-span-7">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-zinc-800 border border-white/[0.08] shadow-md flex-shrink-0">
                <Image
                  src={PERSONAL_INFO.profileImage}
                  alt={`${PERSONAL_INFO.name} portrait`}
                  fill
                  sizes="96px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-1">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  {PERSONAL_INFO.role}
                </p>

                <div className="flex items-center gap-2">
                  <a
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 flex items-center justify-center transition-all duration-300 hover:bg-emerald-500/20 hover:border-emerald-500/30 hover:text-emerald-400"
                    aria-label="GitHub"
                  >
                    <GithubLogo size={16} weight="bold" />
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 flex items-center justify-center transition-all duration-300 hover:bg-emerald-500/20 hover:border-emerald-500/30 hover:text-emerald-400"
                    aria-label="LinkedIn"
                  >
                    <LinkedinLogo size={16} weight="bold" />
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 flex items-center justify-center transition-all duration-300 hover:bg-emerald-500/20 hover:border-emerald-500/30 hover:text-emerald-400"
                    aria-label="Instagram"
                  >
                    <InstagramLogo size={16} weight="bold" />
                  </a>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 flex items-center justify-center transition-all duration-300 hover:bg-emerald-500/20 hover:border-emerald-500/30 hover:text-emerald-400"
                    aria-label="Email"
                  >
                    <EnvelopeSimple size={16} weight="bold" />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
              <p>
                I am currently pursuing my Diploma in Information Technology at N.G. Patel Polytechnic, where I am developing deep foundations in computer programming, database architecture, networking, and modern web application development.
              </p>
              <p>
                My entry into tech started with understanding how websites operate behind the curtain. Today, that curiosity has turned into designing and deploying production-ready platforms for businesses and personal initiatives.
              </p>
            </div>
          </BentoCard>

          {/* Tile 2: Key Numbers & Proof (5 Cols) */}
          <BentoCard className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4 h-full">
              {PERSONAL_INFO.stats.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.06] flex flex-col justify-center transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.1]"
                >
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-zinc-100 mb-1">
                    {stat.number}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Tile 3: Technical Passions (6 Cols) */}
          <BentoCard className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Stack size={20} weight="bold" />
              </div>
              <h3 className="text-lg font-bold text-zinc-100">Areas of Technical Interest</h3>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {PERSONAL_INFO.interests.map((interest, i) => {
                const IconComponent = INTEREST_ICONS[i % INTEREST_ICONS.length];
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-medium text-zinc-300 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.15]"
                  >
                    <IconComponent size={14} weight="bold" className="text-emerald-400" />
                    <span>{interest}</span>
                  </span>
                );
              })}
            </div>
          </BentoCard>

          {/* Tile 4: Roadmap & Milestones (6 Cols) */}
          <BentoCard className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Compass size={20} weight="bold" />
              </div>
              <h3 className="text-lg font-bold text-zinc-100">Roadmap &amp; Milestones</h3>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {PERSONAL_INFO.roadmap.map((goal, i) => {
                const IconComponent = ROADMAP_ICONS[i % ROADMAP_ICONS.length];
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-medium text-zinc-300 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.15]"
                  >
                    <IconComponent size={14} weight="bold" className="text-emerald-400" />
                    <span>{goal}</span>
                  </span>
                );
              })}
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
