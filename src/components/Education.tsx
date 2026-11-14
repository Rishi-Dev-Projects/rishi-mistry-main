"use client";

import React from "react";
import { Eyebrow } from "./ui/Eyebrow";
import { EDUCATION } from "@/lib/data";

export function Education() {
  return (
    <section id="education" className="py-24 sm:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <Eyebrow>Academic Pathway</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100 leading-tight mb-4">
            Structured learning &amp; technical qualifications.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            The academic institutions and milestones shaping my engineering fundamentals.
          </p>
        </div>

        {/* Timeline Track */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-gradient space-y-10 before:absolute before:inset-y-0 before:left-[-1px] before:w-[2px] before:bg-gradient-to-b before:from-emerald-400 before:via-white/[0.1] before:to-transparent">
          {EDUCATION.map((item) => (
            <div key={item.id} className="relative group">
              {/* Glowing Node Bullet */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full bg-[#09090b] border-2 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)] transition-transform duration-300 group-hover:scale-125 group-hover:bg-emerald-400" />

              {/* Double-Bezel Card */}
              <div className="rounded-[1.75rem] p-1.5 bg-white/[0.02] border border-white/[0.08] transition-all duration-300 hover:border-white/[0.16] hover:translate-x-1">
                <div className="rounded-[calc(1.75rem-0.375rem)] bg-[#111115] border border-white/[0.06] p-6 sm:p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-zinc-100">{item.degree}</h3>
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold w-fit">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-zinc-400 mb-4">
                    {item.institution}
                  </p>

                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-400 list-none m-0 p-0">
                    {item.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-emerald-400 font-mono text-xs mt-0.5">→</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

