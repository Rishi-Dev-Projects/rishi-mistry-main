"use client";

import React from "react";
import { GithubLogo } from "@phosphor-icons/react";
import { HeroSection44 } from "./ui/shadcn-studio-hero-section-44";
import { MacbookScroll } from "./ui/macbook-scroll";
import { PERSONAL_INFO } from "@/lib/data";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] overflow-hidden pt-12 pb-8">
      {/* 3D Physics Lanyard ID Card Hero with Greeting Rotator & Tech Marquee */}
      <div className="relative z-10">
        <HeroSection44
          greetings={["Hello", "नमस्ते", "Hey", "Kem Cho"]}
          name={PERSONAL_INFO.name}
          role={PERSONAL_INFO.role}
          description={PERSONAL_INFO.bio}
          availabilityLabel="Available for Work"
          profileImage={PERSONAL_INFO.profileImage}
          downloadAction={{ label: "Explore Projects", href: "#projects" }}
          connectAction={{ label: "Let's connect", href: "#contact" }}
        />
      </div>

      {/* Interactive Aceternity Macbook Scroll Workstation */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 overflow-hidden flex flex-col items-center justify-center -mt-10 sm:-mt-16">
        <MacbookScroll
          title={
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-100">
              Interactive Workstation. <br />
              <span className="text-emerald-400 text-lg sm:text-xl font-medium">
                Scroll to unfold real production builds.
              </span>
            </span>
          }
          badge={
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-white/[0.12] text-xs font-mono text-zinc-300 backdrop-blur-md transition-all hover:bg-emerald-500 hover:text-zinc-950"
            >
              <GithubLogo size={14} weight="bold" />
              <span>github/rishimistry</span>
            </a>
          }
          src="https://i.ibb.co/6RzLTksw/Screenshot-2026-01-04-122725.png"
          showGradient={false}
        />
      </div>
    </section>
  );
}
