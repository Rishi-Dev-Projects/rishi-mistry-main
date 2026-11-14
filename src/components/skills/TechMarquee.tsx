"use client";

import React from "react";
import { TECH_DATA } from "./TechIcons";

const ROW_ONE_KEYS = ["react", "nextjs", "javascript", "tailwind", "html5", "css3"];
const ROW_TWO_KEYS = ["python", "flask", "mysql", "nodejs", "git", "github", "vercel", "terminal"];

export function TechMarquee() {
  const rowOneItems = ROW_ONE_KEYS.map((k) => TECH_DATA[k]).filter(Boolean);
  const rowTwoItems = ROW_TWO_KEYS.map((k) => TECH_DATA[k]).filter(Boolean);

  // Triple items for seamless infinite loop with zero jump
  const rowOneLoop = [...rowOneItems, ...rowOneItems, ...rowOneItems, ...rowOneItems];
  const rowTwoLoop = [...rowTwoItems, ...rowTwoItems, ...rowTwoItems, ...rowTwoItems];

  return (
    <div className="relative w-full overflow-hidden py-4 sm:py-6 select-none">
      
      {/* Left and Right Edge Vignette Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-r from-[#09090b] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-l from-[#09090b] to-transparent z-10" />

      <style>{`
        @keyframes marquee-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track-left {
          display: flex;
          width: max-content;
          animation: marquee-scroll-left 32s linear infinite;
        }
        .marquee-track-right {
          display: flex;
          width: max-content;
          animation: marquee-scroll-right 36s linear infinite;
        }
        .marquee-track-left:hover,
        .marquee-track-right:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track-left,
          .marquee-track-right {
            animation: none !important;
          }
        }
      `}</style>

      {/* Row 1: Right to Left */}
      <div className="flex overflow-hidden py-2 sm:py-2.5">
        <div className="marquee-track-left gap-3 sm:gap-4 flex items-center">
          {rowOneLoop.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={`r1-${item.id}-${idx}`}
                className="group flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white/[0.025] border border-white/[0.08] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-emerald-500/40 hover:bg-white/[0.05] hover:scale-[1.02] flex-shrink-0"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                  style={{ backgroundColor: item.accentBg }}
                >
                  <IconComponent size={18} style={{ color: item.color }} stroke={1.75} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-white transition-colors whitespace-nowrap">
                    {item.shortName}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    {item.proficiency}
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 group-hover:bg-emerald-400 transition-colors ml-1" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Left to Right */}
      <div className="flex overflow-hidden py-2 sm:py-2.5">
        <div className="marquee-track-right gap-3 sm:gap-4 flex items-center">
          {rowTwoLoop.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={`r2-${item.id}-${idx}`}
                className="group flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white/[0.025] border border-white/[0.08] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-emerald-500/40 hover:bg-white/[0.05] hover:scale-[1.02] flex-shrink-0"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                  style={{ backgroundColor: item.accentBg }}
                >
                  <IconComponent size={18} style={{ color: item.color }} stroke={1.75} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-white transition-colors whitespace-nowrap">
                    {item.shortName}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    {item.proficiency}
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 group-hover:bg-emerald-400 transition-colors ml-1" />
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default TechMarquee;

