"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { PERSONAL_INFO } from "@/lib/data";

const NAV_LINKS = [
  { label: "Home", href: "#home", index: "01" },
  { label: "About", href: "#about", index: "02" },
  { label: "Projects", href: "#projects", index: "03" },
  { label: "Education", href: "#education", index: "04" },
  { label: "Skills", href: "#skills", index: "05" },
  { label: "Contact", href: "#contact", index: "06" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileOpen(false);
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 pointer-events-none px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1600px] mx-auto flex flex-col">
        {/* Main Floating Glass Capsule */}
        <nav
          aria-label="Main Navigation"
          className={cn(
            "pointer-events-auto w-full flex items-center justify-between px-3 sm:px-4 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            hasScrolled
              ? "py-2 bg-[#0e0e12]/85 backdrop-blur-2xl border border-white/[0.1] shadow-[0_12px_40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.1)]"
              : "py-2.5 bg-[#0e0e12]/60 backdrop-blur-xl border border-white/[0.07] shadow-[0_8px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]"
          )}
        >
          {/* Left: Signature Brand Mark & Identity */}
          <Link
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-xl"
            aria-label="Rishi Mistry portfolio home"
          >
            {/* Bitmoji Developer Badge */}
            <div className="relative">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-b from-white/[0.08] to-zinc-950 border border-white/[0.12] group-hover:border-emerald-500/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(16,185,129,0.35)] group-hover:scale-[1.03]">
                <div className="relative w-full h-full p-0.5">
                  <Image
                    src={PERSONAL_INFO.profileImage}
                    alt={PERSONAL_INFO.name}
                    fill
                    sizes="40px"
                    className="object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110"
                    priority
                  />
                </div>
              </div>

              {/* Live Signal Node */}
              <span
                className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0e0e12] shadow-[0_0_8px_#10b981] z-20"
                aria-hidden="true"
              />
            </div>

            {/* Typography Lockup */}
            <div className="flex flex-col">
              <span className="text-sm font-extrabold tracking-tight text-zinc-100 group-hover:text-white transition-colors duration-200">
                Rishi Mistry
              </span>
              <span className="text-[10px] font-mono text-zinc-400 group-hover:text-emerald-400/90 transition-colors duration-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
                <span>dev.sys // v2.6</span>
              </span>
            </div>
          </Link>

          {/* Center: Desktop Nav Capsule */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-1 bg-white/[0.03] border border-white/[0.06] rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={cn(
                      "relative z-10 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-colors duration-200 select-none inline-block",
                      isActive
                        ? "text-zinc-100"
                        : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    {link.label}
                  </Link>

                  {/* Animated Gliding Pill for Active Tab */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_2px_8px_rgba(0,0,0,0.4)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Micro Accent Dot */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavDot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right: Tactile CTA + Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Desktop Let's Talk CTA */}
            <Link
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="hidden sm:inline-flex items-center gap-2 pl-4 pr-2 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] hover:border-emerald-500/40 text-xs font-semibold text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-300 hover:shadow-[0_0_24px_rgba(16,185,129,0.25)] active:scale-[0.98] group/cta"
            >
              <span className="tracking-tight text-zinc-200 group-hover/cta:text-white transition-colors">
                Let&apos;s Talk
              </span>
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold transition-all duration-300 group-hover/cta:scale-105 group-hover/cta:bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                <ArrowRight size={12} weight="bold" />
              </span>
            </Link>

            {/* Mobile Hamburger Morph Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:border-white/[0.18] text-zinc-200 flex flex-col items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileOpen}
            >
              <motion.span
                animate={isMobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-0.5 bg-zinc-200 rounded-full"
              />
              <motion.span
                animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="w-5 h-0.5 bg-emerald-400 rounded-full"
              />
              <motion.span
                animate={isMobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-0.5 bg-zinc-200 rounded-full"
              />
            </button>
          </div>
        </nav>

        {/* Mobile Slide-Down Glass Drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto md:hidden mt-2 w-full rounded-2xl bg-[#0e0e12]/95 backdrop-blur-2xl border border-white/[0.12] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden"
            >
              {/* Navigation Items */}
              <ul className="flex flex-col gap-1 list-none m-0 p-0">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className={cn(
                          "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold tracking-tight transition-all duration-200",
                          isActive
                            ? "bg-white/[0.08] text-emerald-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                            : "text-zinc-300 hover:text-white hover:bg-white/[0.04]"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-zinc-500">
                            {link.index}
                          </span>
                          <span>{link.label}</span>
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Drawer Footer: CTA + Socials */}
              <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-col gap-3">
                <Link
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, "#contact")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs tracking-tight shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-200 active:scale-[0.98]"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowRight size={14} weight="bold" />
                </Link>

                <div className="flex items-center justify-between px-1 pt-1">
                  <span className="text-[11px] font-mono text-zinc-400">
                    {PERSONAL_INFO.email}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={PERSONAL_INFO.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 flex items-center justify-center transition-colors"
                      aria-label="GitHub"
                    >
                      <GithubLogo size={14} weight="bold" />
                    </a>
                    <a
                      href={PERSONAL_INFO.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 flex items-center justify-center transition-colors"
                      aria-label="LinkedIn"
                    >
                      <LinkedinLogo size={14} weight="bold" />
                    </a>
                    <a
                      href={PERSONAL_INFO.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 flex items-center justify-center transition-colors"
                      aria-label="Instagram"
                    >
                      <InstagramLogo size={14} weight="bold" />
                    </a>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 flex items-center justify-center transition-colors"
                      aria-label="Email"
                    >
                      <EnvelopeSimple size={14} weight="bold" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
