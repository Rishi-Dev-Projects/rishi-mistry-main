"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, GithubLogo } from "@phosphor-icons/react";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Eyebrow } from "./ui/Eyebrow";
import { PERSONAL_INFO } from "@/lib/data";

const SHOWCASE_IMAGES = [
  "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
  "https://assets.aceternity.com/animated-modal.png",
  "https://assets.aceternity.com/animated-testimonials.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
  "https://assets.aceternity.com/github-globe.png",
  "https://assets.aceternity.com/glare-card.png",
  "https://assets.aceternity.com/layout-grid.png",
  "https://assets.aceternity.com/flip-text.png",
  "https://assets.aceternity.com/hero-highlight.png",
  "https://assets.aceternity.com/carousel.webp",
  "https://assets.aceternity.com/placeholders-and-vanish-input.png",
  "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
  "https://assets.aceternity.com/signup-form.png",
  "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
  "https://assets.aceternity.com/spotlight-new.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
  "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
  "https://assets.aceternity.com/tabs.png",
  "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
  "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
  "https://assets.aceternity.com/glowing-effect.webp",
  "https://assets.aceternity.com/hover-border-gradient.png",
  "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
  "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
  "https://assets.aceternity.com/macbook-scroll.png",
  "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
  "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
  "https://assets.aceternity.com/multi-step-loader.png",
  "https://assets.aceternity.com/vortex.png",
  "https://assets.aceternity.com/wobble-card.png",
  "https://assets.aceternity.com/world-map.webp",
];

export function MarqueeSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative flex min-h-[580px] sm:min-h-[640px] w-full flex-col items-center justify-center overflow-hidden rounded-[2.5rem] p-1.5 bg-white/[0.02] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="relative flex size-full flex-col items-center justify-center overflow-hidden rounded-[calc(2.5rem-0.375rem)] bg-[#0c0c10] border border-white/[0.06] px-6 py-20 text-center">
            {/* Eyebrow badge */}
            <div className="relative z-20 mb-4">
              <Eyebrow>Design &amp; Engineering Lab</Eyebrow>
            </div>

            {/* Headline */}
            <h2 className="relative z-20 mx-auto max-w-4xl text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
              Bridging modern UI design with{" "}
              <span className="relative z-20 inline-block rounded-2xl bg-emerald-500/15 border border-emerald-500/30 px-4 py-1 text-emerald-400 backdrop-blur-md">
                resilient code
              </span>{" "}
              one build at a time.
            </h2>

            {/* Subtext */}
            <p className="relative z-20 mx-auto max-w-2xl py-6 text-sm sm:text-base text-zinc-400 leading-relaxed">
              Every interface is an intersection of typography, motion physics, and clean architecture. Explore the component ecosystems, responsive experiments, and full-stack solutions I actively craft.
            </p>

            {/* CTAs */}
            <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold bg-zinc-100 text-zinc-950 hover:bg-white transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] active:scale-[0.98]"
              >
                <GithubLogo size={18} weight="bold" />
                <span>Explore GitHub Lab</span>
              </a>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold bg-white/[0.06] border border-white/[0.1] text-zinc-200 hover:bg-white/[0.1] hover:text-white transition-all duration-300 backdrop-blur-md active:scale-[0.98]"
              >
                <span>Discuss a Build</span>
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>

            {/* Background Overlay */}
            <div className="absolute inset-0 z-10 h-full w-full bg-gradient-to-b from-[#09090b]/90 via-[#09090b]/75 to-[#09090b]/90" />

            {/* 3D Marquee Canvas */}
            <ThreeDMarquee
              className="pointer-events-none absolute inset-0 h-full w-full"
              images={SHOWCASE_IMAGES}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

