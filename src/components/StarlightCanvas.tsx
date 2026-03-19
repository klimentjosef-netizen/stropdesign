"use client";

import { useEffect, useRef } from "react";

interface Anchor {
  x: number; y: number;
  baseX: number; baseY: number;
  driftSpeedX: number; driftSpeedY: number;
  driftAmpX: number; driftAmpY: number;
  driftPhaseX: number; driftPhaseY: number;
}
interface Segment {
  a: number; b: number;
  progress: number; delay: number;
  glow: number; phase: number; pulseSpeed: number;
}
interface Star {
  x: number; y: number;
  size: number;         // 0.5–2.5px
  phase: number;        // offset for twinkle
  speed: number;        // twinkle speed (rad/s)
  brightness: number;   // base brightness 0–1
  glow: number;         // mouse-reactive glow 0–1
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
    let stars: Star[] = [];

    function makeAnchor(x: number, y: number): Anchor {
      return {
        x, y, baseX: x, baseY: y,
        driftSpeedX: 0.08 + Math.random() * 0.18,
        driftSpeedY: 0.08 + Math.random() * 0.18,
        driftAmpX: 15 + Math.random() * 30,
        driftAmpY: 15 + Math.random() * 30,
        driftPhaseX: Math.random() * Math.PI * 2,
        driftPhaseY: Math.random() * Math.PI * 2,
      };
    }

    function buildAnchors() {
      anchors = [];
      for (let i = 0; i <= 6; i++) anchors.push(makeAnchor(W * (i / 6), 0));
      for (let i = 1; i <= 4; i++) anchors.push(makeAnchor(W, H * (i / 5)));
      for (let i = 6; i >= 0; i--) anchors.push(makeAnchor(W * (i / 6), H));
      for (let i = 4; i >= 1; i--) anchors.push(makeAnchor(0, H * (i / 5)));
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

    function buildStars() {
      stars = [];
      const cx = W / 2, cy = H / 2;
      const count = 120 + Math.floor(Math.random() * 60);
      for (let i = 0; i < count; i++) {
        let x: number, y: number;
        do {
          x = 10 + Math.random() * (W - 20);
          y = 10 + Math.random() * (H - 20);
        } while (Math.abs(x - cx) < 140 && Math.abs(y - cy) < 80);

        // Most stars small, a few larger
        const r = Math.random();
        const size = r < 0.7 ? 0.5 + Math.random() * 0.7 : 1.2 + Math.random() * 1.3;

        stars.push({
          x, y, size,
          phase: Math.random() * Math.PI * 2,
          speed: r < 0.5 ? 0.3 + Math.random() * 0.3 : 0.7 + Math.random() * 0.8,
          brightness: 0.3 + Math.random() * 0.7,
          glow: 0,
        });
      }
    }

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      buildAnchors();
      buildSegments();
      buildStars();
    }

    function draw(now: number) {
      ctx!.clearRect(0, 0, W, H);
      if (!started) { animFrame = requestAnimationFrame(draw); return; }
      const t = now / 1000;

      // Drift anchors slowly
      anchors.forEach((a) => {
        a.x = a.baseX + Math.sin(t * a.driftSpeedX + a.driftPhaseX) * a.driftAmpX;
        a.y = a.baseY + Math.sin(t * a.driftSpeedY + a.driftPhaseY) * a.driftAmpY;
      });

      // Update stars — mouse proximity glow
      stars.forEach((star) => {
        const dist = Math.hypot(mouse.x - star.x, mouse.y - star.y);
        const target = dist < 100 ? Math.pow(1 - dist / 100, 1.6) : 0;
        star.glow += (target - star.glow) * 0.08;
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

        const pulse = 0.65 + 0.35 * Math.sin(t * seg.pulseSpeed + seg.phase);
        const baseOp = 0.42 + seg.glow * 0.45;
        const finalOp = baseOp * pulse * seg.progress;
        const lw = 2.2 + seg.glow * 2.2;

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

      // Stars — Rolls-Royce starlight ceiling effect
      stars.forEach((star) => {
        const { x, y, size, phase, speed, brightness, glow } = star;

        // Twinkle: sinusoidal brightness with own phase and speed
        const twinkle = 0.5 + 0.5 * Math.sin(t * speed + phase);
        const alpha = (brightness * twinkle * 0.6 + glow * 0.5);
        if (alpha < 0.02) return;

        // Subtle halo glow around star
        const haloR = size * 3.5 + glow * 5;
        try {
          const hg = ctx!.createRadialGradient(x, y, 0, x, y, haloR);
          hg.addColorStop(0, `rgba(168,147,90,${alpha * 0.2})`);
          hg.addColorStop(0.5, `rgba(168,147,90,${alpha * 0.06})`);
          hg.addColorStop(1, "transparent");
          ctx!.fillStyle = hg;
          ctx!.fillRect(x - haloR, y - haloR, haloR * 2, haloR * 2);
        } catch {}

        // Sharp bright center dot
        const dotSize = size + glow * 1.5;
        ctx!.beginPath();
        ctx!.arc(x, y, dotSize, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(190,170,100,${Math.min(1, alpha * 1.2)})`;
        ctx!.fill();

        // Tiny bright core for larger stars
        if (size > 1.0) {
          ctx!.beginPath();
          ctx!.arc(x, y, dotSize * 0.4, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(240,225,180,${Math.min(1, alpha * 1.5)})`;
          ctx!.fill();
        }
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
      className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
      style={{ zIndex: 1 }}
    />
  );
}
