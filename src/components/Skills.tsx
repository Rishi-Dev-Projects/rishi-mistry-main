"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SkillsIntro } from "./skills/SkillsIntro";
import { TechMarquee } from "./skills/TechMarquee";
import { TechEcosystem } from "./skills/TechEcosystem";
import { SkillsBento } from "./skills/SkillsBento";
import { SkillsClosing } from "./skills/SkillsClosing";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      // Intro section GSAP timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
      });

      if (headingRef.current) {
        tl.from(headingRef.current, {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      if (descRef.current) {
        tl.from(
          descRef.current,
          {
            y: 35,
            opacity: 0,
            duration: 0.85,
            ease: "power2.out",
          },
          "-=0.7"
        );
      }

      if (metaRef.current) {
        tl.from(
          metaRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 sm:py-32 relative bg-transparent overflow-hidden"
    >
      {/* 1. CINEMATIC SECTION INTRODUCTION */}
      <SkillsIntro
        headingRef={headingRef}
        descRef={descRef}
        metaRef={metaRef}
      />

      {/* 2. INFINITE DUAL-ROW TECHNOLOGY MARQUEE */}
      <TechMarquee />

      {/* 3. SIGNATURE FEATURE: CONNECTED TECHNOLOGY ECOSYSTEM */}
      <TechEcosystem />

      {/* 4. ASYMMETRIC BENTO SKILLS SHOWCASE */}
      <SkillsBento />

      {/* 5. ANIMATED EDITORIAL CLOSING STATEMENT */}
      <SkillsClosing />
    </section>
  );
}

export default Skills;
