"use client";

import { useEffect, useRef } from "react";

interface Anchor { x: number; y: number }
interface Segment {
  a: number; b: number;
  progress: number; delay: number;
  glow: number; phase: number; pulseSpeed: number;
}
interface Drop {
  segIdx: number; t: number;
  speed: number; dir: number; alpha: number;
}

function distToSegment(
  px: number, py: number,
  ax: number, ay: number,
  bx: number, by: number,
) {
  const dx = bx - ax, dy = by - ay;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(px - ax, py - ay);
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

const SEGMENT_PAIRS = [
  [0,14],[1,15],[2,16],[3,17],[4,18],
  [5,20],[6,22],[7,24],[8,23],
  [9,19],[10,21],[11,13],
  [0,9],[4,8],[2,11],
  [14,26],[16,25],[18,26],
  [1,22],[3,20],[5,15],
];

export default function StarlightCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const mouse = { x: -9999, y: -9999 };
    let started = false;
    let animFrame = 0;

    let anchors: Anchor[] = [];
    let segments: Segment[] = [];
    let drops: Drop[] = [];

    function buildAnchors() {
      anchors = [];
      for (let i = 0; i <= 6; i++) anchors.push({ x: W * (i / 6), y: 0 });
      for (let i = 1; i <= 4; i++) anchors.push({ x: W, y: H * (i / 5) });
      for (let i = 6; i >= 0; i--) anchors.push({ x: W * (i / 6), y: H });
      for (let i = 4; i >= 1; i--) anchors.push({ x: 0, y: H * (i / 5) });
    }

    function buildSegments() {
      segments = [];
      SEGMENT_PAIRS.forEach(([ai, bi], idx) => {
        if (ai >= anchors.length || bi >= anchors.length) return;
        segments.push({
          a: ai, b: bi,
          progress: 0,
          delay: 0.3 + idx * 0.08 + Math.random() * 0.15,
          glow: 0,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.18 + Math.random() * 0.22,
        });
      });
    }

    function buildDrops() {
      drops = [];
      segments.forEach((_, i) => {
        if (Math.random() < 0.32) {
          drops.push({
            segIdx: i,
            t: Math.random(),
            speed: 0.04 + Math.random() * 0.08,
            dir: Math.random() < 0.5 ? 1 : -1,
            alpha: 0.5 + Math.random() * 0.4,
          });
        }
      });
    }

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      buildAnchors();
      buildSegments();
      buildDrops();
    }

    function draw(now: number) {
      ctx!.clearRect(0, 0, W, H);
      if (!started) { animFrame = requestAnimationFrame(draw); return; }
      const t = now / 1000;

      // Update drops
      drops.forEach((d) => {
        d.t += d.speed * d.dir * 0.016;
        if (d.t > 1.05) d.t = -0.05;
        if (d.t < -0.05) d.t = 1.05;
      });

      // Draw segments
      segments.forEach((seg) => {
        if (seg.progress < 1) {
          const rate = t > seg.delay ? Math.min(1, (t - seg.delay) / 1.2) : 0;
          seg.progress = rate;
        }
        if (seg.progress <= 0) return;

        const a = anchors[seg.a];
        const b = anchors[seg.b];

        const hover = distToSegment(mouse.x, mouse.y, a.x, a.y, b.x, b.y);
        const hoverTarget = hover < 55 ? Math.pow(1 - hover / 55, 1.6) : 0;
        seg.glow += (hoverTarget - seg.glow) * 0.08;

        const pulse = 0.72 + 0.28 * Math.sin(t * seg.pulseSpeed + seg.phase);
        const baseOp = 0.09 + seg.glow * 0.55;
        const finalOp = baseOp * pulse * seg.progress;
        const lw = 0.6 + seg.glow * 1.4;

        const ex = a.x + (b.x - a.x) * seg.progress;
        const ey = a.y + (b.y - a.y) * seg.progress;

        try {
          const g = ctx!.createLinearGradient(a.x, a.y, ex, ey);
          const gc = seg.glow > 0.1 ? "rgba(212,185,110," : "rgba(168,147,90,";
          g.addColorStop(0, gc + (finalOp * 0.3) + ")");
          g.addColorStop(0.35, gc + (finalOp * 0.9) + ")");
          g.addColorStop(0.65, gc + finalOp + ")");
          g.addColorStop(1, gc + (finalOp * 0.3) + ")");
          ctx!.strokeStyle = g;
        } catch {
          ctx!.strokeStyle = `rgba(168,147,90,${finalOp})`;
        }

        ctx!.lineWidth = lw;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(ex, ey);
        ctx!.stroke();

        if (seg.progress < 0.98) {
          ctx!.beginPath();
          ctx!.arc(ex, ey, 1.5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(212,185,110,${seg.progress * 0.8})`;
          ctx!.fill();
        }
      });

      // Light drops
      drops.forEach((d) => {
        const seg = segments[d.segIdx];
        if (!seg || seg.progress < 0.95) return;
        const a = anchors[seg.a];
        const b = anchors[seg.b];
        const dt = Math.max(0, Math.min(1, d.t));
        const x = a.x + (b.x - a.x) * dt;
        const y = a.y + (b.y - a.y) * dt;

        const edgeFade = dt < 0.1 ? dt / 0.1 : dt > 0.9 ? (1 - dt) / 0.1 : 1;
        const glowBoost = seg.glow;
        const a2 = d.alpha * edgeFade * (0.35 + glowBoost * 0.65);
        if (a2 < 0.02) return;

        const r = 1.2 + glowBoost * 1.5;
        try {
          const gl = ctx!.createRadialGradient(x, y, 0, x, y, r * 6);
          gl.addColorStop(0, `rgba(212,185,110,${a2 * 0.6})`);
          gl.addColorStop(1, "transparent");
          ctx!.fillStyle = gl;
          ctx!.fillRect(x - r * 6, y - r * 6, r * 12, r * 12);
        } catch {}

        ctx!.beginPath();
        ctx!.arc(x, y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(235,210,150,${Math.min(1, a2)})`;
        ctx!.fill();
      });

      // Anchor dots
      anchors.forEach((a, i) => {
        let maxGlow = 0;
        segments.forEach((s) => {
          if ((s.a === i || s.b === i) && s.glow > maxGlow) maxGlow = s.glow;
        });
        const aOp = 0.12 + maxGlow * 0.65;
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, 1.2 + maxGlow * 2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(168,147,90,${aOp})`;
        ctx!.fill();
      });

      // Mouse cursor glow
      if (mouse.x > 0 && mouse.x < W) {
        try {
          const mg = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
          mg.addColorStop(0, "rgba(168,147,90,0.05)");
          mg.addColorStop(0.6, "rgba(168,147,90,0.015)");
          mg.addColorStop(1, "transparent");
          ctx!.fillStyle = mg;
          ctx!.fillRect(mouse.x - 120, mouse.y - 120, 240, 240);
        } catch {}
      }

      animFrame = requestAnimationFrame(draw);
    }

    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    resize();
    const startTimer = setTimeout(() => { started = true; }, 400);
    animFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(startTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
