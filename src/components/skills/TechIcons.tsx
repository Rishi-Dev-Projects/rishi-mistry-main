"use client";

import React from "react";
import {
  IconBrandReact,
  IconBrandNextjs,
  IconBrandJavascript,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandTailwind,
  IconBrandPython,
  IconFlask,
  IconBrandMysql,
  IconBrandNodejs,
  IconBrandGit,
  IconBrandGithub,
  IconBrandVercel,
  IconTerminal2,
} from "@tabler/icons-react";

export interface TechMeta {
  id: string;
  name: string;
  shortName: string;
  category: "frontend" | "backend" | "tools";
  color: string;
  accentBg: string;
  description: string;
  proficiency: "Advanced" | "Proficient" | "Solid";
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    stroke?: number;
    color?: string;
    style?: React.CSSProperties;
  }>;
}

export const TECH_DATA: Record<string, TechMeta> = {
  react: {
    id: "react",
    name: "React.js",
    shortName: "React",
    category: "frontend",
    color: "#00d8ff",
    accentBg: "rgba(0, 216, 255, 0.12)",
    description: "Component-driven architectures, custom hooks, and reactive state management.",
    proficiency: "Proficient",
    icon: IconBrandReact,
  },
  nextjs: {
    id: "nextjs",
    name: "Next.js",
    shortName: "Next.js",
    category: "frontend",
    color: "#ffffff",
    accentBg: "rgba(255, 255, 255, 0.12)",
    description: "Server Components (RSC), App Router, dynamic routing, and edge rendering.",
    proficiency: "Proficient",
    icon: IconBrandNextjs,
  },
  javascript: {
    id: "javascript",
    name: "JavaScript (ES6+)",
    shortName: "JavaScript",
    category: "frontend",
    color: "#f7df1e",
    accentBg: "rgba(247, 223, 30, 0.12)",
    description: "Asynchronous programming, closures, DOM manipulation, and modern ESNext.",
    proficiency: "Advanced",
    icon: IconBrandJavascript,
  },
  html5: {
    id: "html5",
    name: "HTML5 & Semantic Web",
    shortName: "HTML5",
    category: "frontend",
    color: "#e34f26",
    accentBg: "rgba(227, 79, 38, 0.12)",
    description: "Accessible structures, semantic landmarks, microdata, and SEO best practices.",
    proficiency: "Advanced",
    icon: IconBrandHtml5,
  },
  css3: {
    id: "css3",
    name: "CSS3 & Modern Styling",
    shortName: "CSS3",
    category: "frontend",
    color: "#1572b6",
    accentBg: "rgba(21, 114, 182, 0.12)",
    description: "Flexbox, CSS Grid, keyframe motion, responsive media queries, and variables.",
    proficiency: "Advanced",
    icon: IconBrandCss3,
  },
  tailwind: {
    id: "tailwind",
    name: "Tailwind CSS",
    shortName: "Tailwind",
    category: "frontend",
    color: "#38bdf8",
    accentBg: "rgba(56, 189, 248, 0.12)",
    description: "Utility-first design systems, custom theme configuration, and responsive layouts.",
    proficiency: "Advanced",
    icon: IconBrandTailwind,
  },
  python: {
    id: "python",
    name: "Python Programming",
    shortName: "Python",
    category: "backend",
    color: "#3776ab",
    accentBg: "rgba(55, 118, 171, 0.12)",
    description: "Object-oriented scripting, algorithmic problem solving, automation, and backend logic.",
    proficiency: "Advanced",
    icon: IconBrandPython,
  },
  flask: {
    id: "flask",
    name: "Flask Framework",
    shortName: "Flask",
    category: "backend",
    color: "#ffffff",
    accentBg: "rgba(255, 255, 255, 0.12)",
    description: "Lightweight WSGI microservices, RESTful routing, request handlers, and Jinja templates.",
    proficiency: "Proficient",
    icon: IconFlask,
  },
  nodejs: {
    id: "nodejs",
    name: "Node.js Runtimes",
    shortName: "Node.js",
    category: "backend",
    color: "#68a063",
    accentBg: "rgba(104, 160, 99, 0.12)",
    description: "Event-driven architecture, npm package ecosystem, and server-side utilities.",
    proficiency: "Proficient",
    icon: IconBrandNodejs,
  },
  mysql: {
    id: "mysql",
    name: "MySQL & Relational DBs",
    shortName: "MySQL",
    category: "backend",
    color: "#00758f",
    accentBg: "rgba(0, 117, 143, 0.12)",
    description: "Relational schema design, structured queries (SQL), joins, indexing, and data integrity.",
    proficiency: "Proficient",
    icon: IconBrandMysql,
  },
  git: {
    id: "git",
    name: "Git Version Control",
    shortName: "Git",
    category: "tools",
    color: "#f05032",
    accentBg: "rgba(240, 80, 50, 0.12)",
    description: "Branching workflows, atomic commits, rebasing, merge resolutions, and history tracking.",
    proficiency: "Proficient",
    icon: IconBrandGit,
  },
  github: {
    id: "github",
    name: "GitHub Repositories",
    shortName: "GitHub",
    category: "tools",
    color: "#ffffff",
    accentBg: "rgba(255, 255, 255, 0.12)",
    description: "Collaborative code reviews, pull requests, issue tracking, and repository management.",
    proficiency: "Proficient",
    icon: IconBrandGithub,
  },
  terminal: {
    id: "terminal",
    name: "Command Line & Bash",
    shortName: "Bash / CLI",
    category: "tools",
    color: "#4ade80",
    accentBg: "rgba(74, 222, 128, 0.12)",
    description: "Shell navigation, process management, build automation scripts, and environment setup.",
    proficiency: "Solid",
    icon: IconTerminal2,
  },
  vercel: {
    id: "vercel",
    name: "Vercel Deployments",
    shortName: "Vercel",
    category: "tools",
    color: "#ffffff",
    accentBg: "rgba(255, 255, 255, 0.12)",
    description: "Automated CI/CD pipelines, preview branches, serverless functions, and global CDN delivery.",
    proficiency: "Advanced",
    icon: IconBrandVercel,
  },
};

export function TechIcon({
  name,
  size = 20,
  className = "",
  colored = true,
}: {
  name: string;
  size?: number;
  className?: string;
  colored?: boolean;
}) {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const found = Object.values(TECH_DATA).find(
    (t) =>
      t.id === key ||
      t.shortName.toLowerCase().replace(/[^a-z0-9]/g, "") === key ||
      key.includes(t.id) ||
      t.name.toLowerCase().includes(key)
  );

  if (!found) {
    return <IconTerminal2 size={size} className={className} />;
  }

  const IconComponent = found.icon;
  return (
    <IconComponent
      size={size}
      className={className}
      style={colored ? { color: found.color } : undefined}
    />
  );
}
