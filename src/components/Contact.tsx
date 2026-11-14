"use client";

import React, { useState } from "react";
import {
  EnvelopeSimple,
  LinkedinLogo,
  GithubLogo,
  InstagramLogo,
  ArrowUpRight,
  MapPin,
  Check,
  Copy,
  Sparkle,
} from "@phosphor-icons/react";
import { Eyebrow } from "./ui/Eyebrow";
import { PERSONAL_INFO } from "@/lib/data";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const CONTACT_CHANNELS = [
    {
      id: "email",
      label: "Direct Email",
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      description: "Fastest response for project inquiries, freelance work, and internship opportunities.",
      icon: <EnvelopeSimple size={24} weight="bold" />,
      tag: "Primary Channel",
      isPrimary: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/mistry-rishi",
      href: PERSONAL_INFO.socials.linkedin,
      description: "Connect for professional networking, engineering discussions, and career updates.",
      icon: <LinkedinLogo size={24} weight="bold" />,
      tag: "Professional Network",
      isPrimary: false,
    },
    {
      id: "github",
      label: "GitHub Lab",
      value: "github.com/rishimistry",
      href: PERSONAL_INFO.socials.github,
      description: "Explore my open-source repositories, experiments, code commits, and project architectures.",
      icon: <GithubLogo size={24} weight="bold" />,
      tag: "Code Repositories",
      isPrimary: false,
    },
    {
      id: "instagram",
      label: "Instagram",
      value: "@rishi_mistry",
      href: PERSONAL_INFO.socials.instagram,
      description: "Behind-the-scenes snapshots, creative design exploration, and personal updates.",
      icon: <InstagramLogo size={24} weight="bold" />,
      tag: "Social Profile",
      isPrimary: false,
    },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <Eyebrow showDot>Get In Touch</Eyebrow>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight mb-4">
            Let&apos;s build something exceptional together<span className="text-emerald-400">.</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Have a project in mind, an internship opportunity, or simply want to connect? Reach out directly through any of my verified channels below.
          </p>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {CONTACT_CHANNELS.map((channel) => (
            <a
              key={channel.id}
              href={channel.href}
              target={channel.id !== "email" ? "_blank" : undefined}
              rel={channel.id !== "email" ? "noopener noreferrer" : undefined}
              className={`group relative rounded-[2rem] p-1.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${
                channel.isPrimary
                  ? "bg-gradient-to-b from-emerald-500/20 via-white/[0.04] to-white/[0.02] border border-emerald-500/30 shadow-[0_12px_36px_-10px_rgba(16,185,129,0.15)]"
                  : "bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] border border-white/[0.08] shadow-[0_12px_36px_-10px_rgba(0,0,0,0.7)] hover:border-white/[0.16]"
              }`}
            >
              <div className="h-full rounded-[calc(2rem-0.375rem)] bg-[#111115]/90 backdrop-blur-xl border border-white/[0.06] p-6 sm:p-8 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] group-hover:bg-[#141419]/90 transition-colors">
                
                {/* Channel Top Bar */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                      channel.isPrimary
                        ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.25)]"
                        : "bg-white/[0.04] border border-white/[0.08] text-zinc-300 group-hover:text-emerald-400 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10"
                    }`}
                  >
                    {channel.icon}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-zinc-400">
                      {channel.tag}
                    </span>

                    <span className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-zinc-950 group-hover:border-transparent group-hover:rotate-45">
                      <ArrowUpRight size={14} weight="bold" />
                    </span>
                  </div>
                </div>

                {/* Channel Details */}
                <div>
                  <h3 className="text-xl font-bold text-zinc-100 mb-1 group-hover:text-white transition-colors">
                    {channel.label}
                  </h3>
                  <div className="font-mono text-sm text-emerald-400 font-medium mb-3 truncate">
                    {channel.value}
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {channel.description}
                  </p>
                </div>

                {/* Quick Copy Action on Email Card */}
                {channel.id === "email" && (
                  <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs text-zinc-500 font-mono">
                      Click to launch mail client
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:bg-white/[0.08] hover:text-white transition-all cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check size={12} weight="bold" className="text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} weight="bold" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* Location & Status Banner */}
        <div className="mt-8 rounded-[2rem] p-1.5 bg-white/[0.02] border border-white/[0.08]">
          <div className="rounded-[calc(2rem-0.375rem)] bg-[#111115]/70 backdrop-blur-md border border-white/[0.06] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} weight="bold" className="text-emerald-400" />
              </div>
              <div>
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block">
                  Location &amp; Availability
                </span>
                <span className="text-sm sm:text-base font-semibold text-zinc-200">
                  {PERSONAL_INFO.location} · Available for Remote &amp; On-Site Roles
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              </span>
              <span className="font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
                Active &amp; Ready to Collaborate
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;
