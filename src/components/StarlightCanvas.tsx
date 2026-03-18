"use client";

import { useEffect, useRef } from "react";

interface Anchor { x: number; y: number }
interface Segment {
  a: number; b: number;
  progress: number; delay: number;
  glow: number; phase: number; pulseSpeed: number;
}
interface SpotLight {
  x: number; y: number;
  phase: number;        // offset for breathing
  breatheSpeed: number; // how fast it pulses
  glow: number;         // current mouse-reactive glow 0–1
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
    let spots: SpotLight[] = [];

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

    function buildSpots() {
      spots = [];
      const cx = W / 2, cy = H / 2;
      const count = 28 + Math.floor(Math.random() * 8);
      for (let i = 0; i < count; i++) {
        let x: number, y: number;
        do {
          x = 30 + Math.random() * (W - 60);
          y = 30 + Math.random() * (H - 60);
        } while (Math.abs(x - cx) < 160 && Math.abs(y - cy) < 90);

        spots.push({
          x, y,
          phase: Math.random() * Math.PI * 2,
          breatheSpeed: 0.2 + Math.random() * 0.6,
          glow: 0,
        });
      }
    }

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      buildAnchors();
      buildSegments();
      buildSpots();
    }

    function draw(now: number) {
      ctx!.clearRect(0, 0, W, H);
      if (!started) { animFrame = requestAnimationFrame(draw); return; }
      const t = now / 1000;

      // Update spot lights — mouse proximity glow
      spots.forEach((spot) => {
        const dist = Math.hypot(mouse.x - spot.x, mouse.y - spot.y);
        const target = dist < 150 ? Math.pow(1 - dist / 150, 1.4) : 0;
        spot.glow += (target - spot.glow) * 0.06;
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
        const baseOp = 0.28 + seg.glow * 0.55;
        const finalOp = baseOp * pulse * seg.progress;
        const lw = 1.8 + seg.glow * 2.2;

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

      // Static spot lights — pure glow, no hard edges
      spots.forEach((spot) => {
        const { x, y, phase, breatheSpeed, glow } = spot;

        // Slow breathing
        const breathe = 0.12 + 0.45 * (0.5 + 0.5 * Math.sin(t * breatheSpeed + phase));
        const intensity = breathe + glow * 0.5;

        // Wide soft glow — the main light spill
        const outerR = 30 + glow * 25;
        try {
          const gl = ctx!.createRadialGradient(x, y, 0, x, y, outerR);
          gl.addColorStop(0, `rgba(255,225,130,${intensity * 0.22})`);
          gl.addColorStop(0.15, `rgba(255,215,110,${intensity * 0.14})`);
          gl.addColorStop(0.4, `rgba(230,195,90,${intensity * 0.05})`);
          gl.addColorStop(0.7, `rgba(200,175,80,${intensity * 0.015})`);
          gl.addColorStop(1, "transparent");
          ctx!.fillStyle = gl;
          ctx!.fillRect(x - outerR, y - outerR, outerR * 2, outerR * 2);
        } catch {}

        // Tight bright center — no hard circle, just concentrated glow
        const innerR = 8 + glow * 6;
        try {
          const ig = ctx!.createRadialGradient(x, y, 0, x, y, innerR);
          ig.addColorStop(0, `rgba(255,240,180,${Math.min(1, intensity * 0.5)})`);
          ig.addColorStop(0.3, `rgba(255,225,140,${intensity * 0.2})`);
          ig.addColorStop(1, "transparent");
          ctx!.fillStyle = ig;
          ctx!.fillRect(x - innerR, y - innerR, innerR * 2, innerR * 2);
        } catch {}
      });

      // Anchor dots
      anchors.forEach((a, i) => {
        let maxGlow = 0;
        segments.forEach((s) => {
          if ((s.a === i || s.b === i) && s.glow > maxGlow) maxGlow = s.glow;
        });
        const aOp = 0.25 + maxGlow * 0.65;
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, 1.5 + maxGlow * 2.5, 0, Math.PI * 2);
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
