"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 120;

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
    <>
      <header className="fixed top-4 left-0 right-0 z-50 pointer-events-none px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <nav
            className={cn(
              "pointer-events-auto w-full flex items-center justify-between py-2 px-3 sm:px-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              hasScrolled
                ? "bg-[#111115]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]"
                : "bg-[#111115]/50 backdrop-blur-md border border-white/[0.05]"
            )}
          >
            {/* Logo */}
            <Link
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="flex items-center gap-2.5 font-bold tracking-tight text-zinc-100 pl-1 group"
            >
              <span className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] text-emerald-400 font-mono text-xs flex items-center justify-center font-bold transition-all duration-300 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30">
                RM
              </span>
              <span className="text-sm tracking-tight hidden xs:inline-block">Rishi Mistry</span>
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 select-none",
                        isActive
                          ? "text-zinc-100 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right Action / Mobile Toggle */}
            <div className="flex items-center gap-2">
              <Link
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-zinc-950 transition-all duration-300 select-none"
              >
                <span>Let's Talk</span>
                <ArrowRight size={13} weight="bold" />
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] text-zinc-200 flex items-center justify-center transition-all duration-300 hover:bg-white/[0.1]"
                aria-label="Toggle navigation menu"
              >
                {isMobileOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#09090b]/90 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden flex flex-col justify-center items-center",
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <ul className="flex flex-col items-center gap-6 list-none m-0 p-0 text-center">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    "text-2xl font-bold transition-all duration-300",
                    isActive ? "text-emerald-400" : "text-zinc-400 hover:text-zinc-100"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

