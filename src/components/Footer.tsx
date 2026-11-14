"use client";

import React from "react";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";
import { PERSONAL_INFO } from "@/lib/data";

export function Footer() {
  const footerColumns = [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Education", href: "#education" },
        { label: "Skills", href: "#skills" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "GitHub", href: PERSONAL_INFO.socials.github },
        { label: "LinkedIn", href: PERSONAL_INFO.socials.linkedin },
        { label: "Instagram", href: PERSONAL_INFO.socials.instagram },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
        { label: PERSONAL_INFO.institution, href: "#education" },
        { label: "Available for Work", href: "#contact" },
      ],
    },
  ];

  return (
    <div className="w-full border-t border-white/[0.08]">
      <HalftoneWordmarkFooter
        wordmark="RISHI MISTRY"
        label={PERSONAL_INFO.name}
        meta={`© ${new Date().getFullYear()} · ${PERSONAL_INFO.role} · Gujarat, India`}
        columns={footerColumns}
        backToTop={true}
        preset="night"
        palette={{
          background: "#09090b",
          ink: "#f4f4f5",
          warm: "#10b981",
        }}
        dotGap={6}
        radius={85}
        crop={0}
        grain={0.4}
        interactive={true}
        height="560px"
      />
    </div>
  );
}
