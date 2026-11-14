"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  CaretDown,
  Sparkle,
  Stack,
  ArrowRight,
} from "@phosphor-icons/react";
import { Eyebrow } from "./ui/Eyebrow";
import { ProjectCard } from "./ProjectCard";
import { PROJECTS } from "@/lib/data";

// Register GSAP plugins safely on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Keep cardRefs array sized to PROJECTS
  cardRefs.current = cardRefs.current.slice(0, PROJECTS.length);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mq.addEventListener("change", handleMotionChange);

    const ctx = gsap.context(() => {
      // 1. Header Masked Reveal Animation
      if (headerRef.current && headingRef.current && !mq.matches) {
        gsap.from(headingRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        if (descRef.current) {
          gsap.from(descRef.current, {
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
            y: 35,
            opacity: 0,
            duration: 0.85,
            delay: 0.15,
            ease: "power2.out",
          });
        }

        if (metaRef.current) {
          gsap.from(metaRef.current, {
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
            y: 25,
            opacity: 0,
            duration: 0.8,
            delay: 0.25,
            ease: "power2.out",
          });
        }
      }

      // 2. Desktop Pinned Stacked Card Timeline
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length <= 1 || !pinSectionRef.current) return;

        // Initial setup for cards: Card 0 active in center, subsequent cards placed below
        gsap.set(cards[0], {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          x: 0,
          rotateZ: 0,
          zIndex: 10,
          pointerEvents: "auto",
        });

        for (let i = 1; i < cards.length; i++) {
          gsap.set(cards[i], {
            yPercent: 118,
            scale: 0.94,
            opacity: 0,
            x: 16,
            rotateZ: 0.8,
            zIndex: 10 + i,
            pointerEvents: "none",
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: "top top",
            end: () => `+=${(cards.length - 1) * 900}`,
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
              const step = 1 / (cards.length - 1);
              const idx = Math.min(
                Math.round(self.progress / step),
                cards.length - 1
              );
              setActiveIndex(idx);
            },
          },
        });

        // Step-by-step card stacking transitions
        for (let i = 1; i < cards.length; i++) {
          const prevCard = cards[i - 1];
          const currCard = cards[i];
          const stepLabel = `step-${i}`;

          // Incoming card slides up smoothly to take center stage
          tl.to(
            currCard,
            {
              yPercent: 0,
              scale: 1,
              opacity: 1,
              x: 0,
              rotateZ: 0,
              pointerEvents: "auto",
              ease: "power2.inOut",
              duration: 1,
            },
            stepLabel
          );

          // Previous card scales down, dims, and drifts horizontally (parallax)
          tl.to(
            prevCard,
            {
              scale: 0.92,
              yPercent: -5,
              opacity: 0.3,
              x: -24,
              rotateZ: -0.8,
              pointerEvents: "none",
              ease: "power2.inOut",
              duration: 1,
            },
            stepLabel
          );

          // If there is an earlier card (i - 2), scale it even deeper into background
          if (i >= 2) {
            tl.to(
              cards[i - 2],
              {
                scale: 0.84,
                yPercent: -10,
                opacity: 0.08,
                x: -42,
                pointerEvents: "none",
                ease: "power2.inOut",
                duration: 1,
              },
              stepLabel
            );
          }

          // Brief reading pause before next card transition
          tl.to({}, { duration: 0.25 });
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      mq.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Programmatic jump to a specific project when clicking progress tabs
  const handleScrollToProject = (targetIndex: number) => {
    if (!pinSectionRef.current || targetIndex === activeIndex) return;

    const st = ScrollTrigger.getAll().find(
      (s) => s.trigger === pinSectionRef.current
    );
    if (st && st.start !== undefined && st.end !== undefined) {
      const step = (st.end - st.start) / (PROJECTS.length - 1);
      const targetScroll = st.start + step * targetIndex + 5;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-transparent overflow-hidden"
    >
      {/* 1. SECTION INTRODUCTION */}
      <div
        ref={headerRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pt-32 sm:pb-16 relative z-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.06]">
          {/* Left Title Column */}
          <div className="max-w-2xl">
            <Eyebrow showDot className="mb-4">
              Selected Work
            </Eyebrow>

            <div className="overflow-hidden">
              <h2
                ref={headingRef}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 leading-[1.1] mb-4"
              >
                Things I&apos;ve Built<span className="text-emerald-400">.</span>
              </h2>
            </div>

            <p
              ref={descRef}
              className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-[62ch]"
            >
              A curated showcase of production web applications, digital platforms, and full-stack systems engineered with modern workflows.
            </p>
          </div>

          {/* Right Meta Column: Project Counter & Scroll Pill */}
          <div
            ref={metaRef}
            className="flex flex-row md:flex-col items-start md:items-end gap-3 flex-shrink-0"
          >
            {/* Dynamic Accurate Project Count Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <Stack size={13} weight="bold" className="text-emerald-400" />
              <span>
                {String(PROJECTS.length).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")} PRODUCTION BUILDS
              </span>
            </div>

            {/* Subtle Scroll Hint */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
              <CaretDown size={13} className="animate-bounce" />
              <span>Scroll down to unveil showcase</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CINEMATIC DESKTOP STACKED EXPERIENCE (Hidden on mobile) */}
      <div
        ref={pinSectionRef}
        className="hidden lg:block relative w-full h-screen min-h-[720px] max-h-[960px] z-10"
      >
        <div className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-6">
          
          {/* Desktop Interactive Timeline Navigator */}
          <div className="w-full max-w-6xl mb-6 flex items-center justify-between">
            {/* Project Quick Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-full bg-zinc-950/80 border border-white/[0.08] backdrop-blur-md">
              {PROJECTS.map((proj, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => handleScrollToProject(idx)}
                    className={`group/tab relative px-3.5 py-1 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "bg-emerald-500 text-zinc-950 font-bold shadow-[0_0_16px_rgba(16,185,129,0.4)]"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{String(idx + 1).padStart(2, "0")}</span>
                    <span className="max-w-[120px] truncate hidden xl:inline">
                      {proj.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Stage Scroll Indicator */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span>PROJECT {activeIndex + 1} OF {PROJECTS.length}</span>
              <div className="w-24 h-1 rounded-full bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-300 ease-out"
                  style={{
                    width: `${Math.max(
                      10,
                      Math.min(100, scrollProgress * 100)
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Cards Stage Container */}
          <div
            ref={cardsContainerRef}
            className="relative w-full max-w-6xl h-[580px] sm:h-[610px] xl:h-[630px]"
          >
            {PROJECTS.map((project, idx) => (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="absolute inset-0 w-full h-full will-change-transform"
                style={{
                  zIndex: 10 + idx,
                }}
              >
                <ProjectCard
                  project={project}
                  index={idx}
                  total={PROJECTS.length}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MOBILE & TABLET VERTICAL STACKED PRESENTATION (Visible < 1024px) */}
      <div className="block lg:hidden max-w-4xl mx-auto px-4 sm:px-6 pb-24 relative z-10 space-y-8 sm:space-y-12">
        {PROJECTS.map((project, idx) => (
          <div key={project.id} className="w-full">
            <ProjectCard
              project={project}
              index={idx}
              total={PROJECTS.length}
              isMobile={true}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
