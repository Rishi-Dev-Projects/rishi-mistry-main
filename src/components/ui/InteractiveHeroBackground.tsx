"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  color: string;
  alpha: number;
}

export function InteractiveHeroBackground({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse coordinates with smooth lerping
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false,
    radius: 140,
    shockwave: { x: 0, y: 0, radius: 0, active: false },
  });

  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let visible = true;
    let inView = true;
    let width = 0;
    let height = 0;

    const particles: Particle[] = [];
    const PARTICLE_COUNT_DESKTOP = 55;
    const PARTICLE_COUNT_MOBILE = 28;
    const CONNECTION_DISTANCE = 110;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-init particles to fit area
      const count = width < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
      particles.length = 0;

      for (let i = 0; i < count; i++) {
        const isEmerald = Math.random() > 0.35;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          baseRadius: isEmerald ? Math.random() * 1.4 + 1.2 : Math.random() * 1.0 + 0.8,
          color: isEmerald ? "#10b981" : "#a1a1aa",
          alpha: isEmerald ? Math.random() * 0.4 + 0.4 : Math.random() * 0.25 + 0.2,
        });
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView && rafId === 0) loop();
    });
    io.observe(container);

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible && inView && rafId === 0) loop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Mouse & Touch listeners on window
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
      mouseRef.current.active = true;

      // Update React state throttled for smooth CSS spotlight
      setCursorPos({ x, y });
    };

    const onPointerLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
      setCursorPos({ x: -1000, y: -1000 });
    };

    const onPointerDown = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseRef.current.shockwave = {
        x,
        y,
        radius: 10,
        active: true,
      };
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);

    // Animation Loop
    const loop = () => {
      rafId = 0;
      if (!visible || !inView) return;

      const mouse = mouseRef.current;
      // Smooth lerp mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      // Handle shockwave expansion on click
      if (mouse.shockwave.active) {
        mouse.shockwave.radius += 5;
        const wave = mouse.shockwave;
        const alpha = Math.max(0, 1 - wave.radius / 180);

        if (alpha <= 0) {
          mouse.shockwave.active = false;
        } else {
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(16, 185, 129, ${alpha * 0.25})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // 1. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce gently off borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Cursor repulsion physics
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 0.01) {
            const force = (1 - dist / mouse.radius) * 3.5;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Shockwave repulsion
        if (mouse.shockwave.active) {
          const wave = mouse.shockwave;
          const dx = p.x - wave.x;
          const dy = p.y - wave.y;
          const dist = Math.hypot(dx, dy);
          const diff = Math.abs(dist - wave.radius);

          if (diff < 30 && dist > 0.01) {
            const push = (1 - diff / 30) * 4;
            p.x += (dx / dist) * push;
            p.y += (dy / dist) * push;
          }
        }

        // Draw particle dot with subtle aura
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color === "#10b981" 
          ? `rgba(16, 185, 129, ${p.alpha})`
          : `rgba(212, 212, 216, ${p.alpha * 0.6})`;
        ctx.fill();

        // 2. Proximity lines to neighboring particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < CONNECTION_DISTANCE) {
            const lineAlpha = (1 - dist / CONNECTION_DISTANCE) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Subtle Engineering Grid Layer (44px) */}
      <div
        className="absolute inset-0 opacity-[0.38]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.038) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.038) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* 2. Interactive Mouse-Driven Emerald Spotlight Layer */}
      <div
        className="absolute inset-0 transition-opacity duration-500 ease-out pointer-events-none"
        style={{
          background: cursorPos.x >= 0
            ? `radial-gradient(550px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(16, 185, 129, 0.11), transparent 65%)`
            : "none",
        }}
      />

      {/* 3. Deep Ambient Emerald Atmospheric Glow Blobs */}
      <div className="absolute -top-36 -left-36 w-[30rem] h-[30rem] bg-emerald-500/[0.08] rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: "9s" }} />
      <div className="absolute top-1/3 -right-32 w-[26rem] h-[26rem] bg-emerald-600/[0.06] rounded-full blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: "13s" }} />
      <div className="absolute -bottom-36 left-1/4 w-[32rem] h-[32rem] bg-emerald-500/[0.06] rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: "11s" }} />

      {/* 4. Interactive Live Particle Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* 5. Edge Vignette: Softly darkens outer periphery for cinematic focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#09090b_96%)] pointer-events-none" />
    </div>
  );
}

export { InteractiveHeroBackground as InteractiveBackground };
export default InteractiveHeroBackground;
