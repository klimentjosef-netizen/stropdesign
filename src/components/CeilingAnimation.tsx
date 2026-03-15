"use client";

import { useEffect, useRef } from "react";

export default function CeilingAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;

    const margin = 40;
    const fL = margin;
    const fR = W - margin;
    const fT = margin + 20;
    const fB = H - margin - 20;
    const fW = fR - fL;
    const fH = fB - fT;

    let animFrame: number;

    function draw(timestamp: number) {
      const t = timestamp / 1000;

      ctx.clearRect(0, 0, W, H);

      // === PROFILES (static frame) ===
      const profileGrad = ctx.createLinearGradient(fL, fT, fL, fT + 6);
      profileGrad.addColorStop(0, "#555");
      profileGrad.addColorStop(0.5, "#888");
      profileGrad.addColorStop(1, "#444");

      ctx.fillStyle = profileGrad;
      ctx.fillRect(fL, fT - 4, fW, 5);
      ctx.fillRect(fL, fB - 1, fW, 5);

      const sideGrad = ctx.createLinearGradient(fL, fT, fL + 6, fT);
      sideGrad.addColorStop(0, "#444");
      sideGrad.addColorStop(0.5, "#888");
      sideGrad.addColorStop(1, "#555");
      ctx.fillStyle = sideGrad;
      ctx.fillRect(fL - 4, fT, 5, fH);
      ctx.fillRect(fR - 1, fT, 5, fH);

      // Corner dots
      ctx.fillStyle = "rgba(196, 154, 48, 0.7)";
      [[fL, fT], [fR, fT], [fL, fB], [fR, fB]].forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // === FABRIC SURFACE with gentle breathing ===
      const breathe = Math.sin(t * 0.8) * 0.5 + 0.5; // 0-1 slow pulse
      const ripple = Math.sin(t * 0.6) * 0.3;

      ctx.beginPath();
      ctx.moveTo(fL + 2, fT + 2);

      // Top edge - very subtle wave
      for (let x = 0; x <= fW; x += 2) {
        const xt = x / fW;
        const wave = Math.sin(xt * Math.PI * 2 + t * 0.7) * (1.5 + breathe);
        ctx.lineTo(fL + 2 + x, fT + 2 + wave);
      }

      ctx.lineTo(fR - 2, fB - 2);

      // Bottom edge - gentle undulation
      for (let x = fW; x >= 0; x -= 2) {
        const xt = x / fW;
        const wave = Math.sin(xt * Math.PI * 2 - t * 0.5) * (2 + breathe) + ripple;
        ctx.lineTo(fL + 2 + x, fB - 2 + wave);
      }

      ctx.closePath();

      // Fabric gradient
      const fabricGrad = ctx.createLinearGradient(fL, fT, fR, fB);
      fabricGrad.addColorStop(0, "rgba(26, 26, 46, 0.95)");
      fabricGrad.addColorStop(0.3, "rgba(30, 30, 55, 0.95)");
      fabricGrad.addColorStop(0.5, "rgba(35, 35, 65, 0.97)");
      fabricGrad.addColorStop(0.7, "rgba(28, 28, 50, 0.95)");
      fabricGrad.addColorStop(1, "rgba(22, 22, 40, 0.95)");
      ctx.fillStyle = fabricGrad;
      ctx.fill();

      // === CONTINUOUS SHEEN SWEEP ===
      // Two sheens moving at different speeds for organic feel
      for (let s = 0; s < 2; s++) {
        const speed = s === 0 ? 0.12 : 0.08;
        const offset = s === 0 ? 0 : 0.45;
        const alpha = s === 0 ? 0.07 : 0.04;
        const width = s === 0 ? 50 : 70;

        // Position loops continuously across the surface
        const sheenPos = ((t * speed + offset) % 1.4 - 0.2);
        const sheenX = fL + fW * sheenPos;

        const sheenGrad = ctx.createLinearGradient(
          sheenX - width, fT, sheenX + width, fT
        );
        sheenGrad.addColorStop(0, "rgba(255,255,255,0)");
        sheenGrad.addColorStop(0.5, `rgba(255,255,255,${alpha})`);
        sheenGrad.addColorStop(1, "rgba(255,255,255,0)");

        ctx.fillStyle = sheenGrad;
        ctx.fillRect(fL + 2, fT + 2, fW - 4, fH - 4);
      }

      // === LED LIGHT SPOTS - gentle pulse ===
      const lightPositions = [
        [0.25, 0.3],
        [0.5, 0.25],
        [0.75, 0.3],
        [0.33, 0.65],
        [0.66, 0.65],
      ];

      lightPositions.forEach(([lx, ly], i) => {
        const x = fL + fW * lx;
        const y = fT + fH * ly;
        const pulse = Math.sin(t * 1.2 + i * 1.3) * 0.15 + 0.85; // 0.7-1.0

        // Glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 18);
        glow.addColorStop(0, `rgba(196, 154, 48, ${0.25 * pulse})`);
        glow.addColorStop(0.5, `rgba(196, 154, 48, ${0.08 * pulse})`);
        glow.addColorStop(1, "rgba(196, 154, 48, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(x - 22, y - 22, 44, 44);

        // Dot
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 154, 48, ${0.8 * pulse})`;
        ctx.fill();
      });

      // === SUBTLE FLOATING PARTICLES ===
      for (let i = 0; i < 6; i++) {
        const px = fL + (Math.sin(t * 0.25 + i * 1.7) * 0.5 + 0.5) * fW;
        const py = fT + (Math.cos(t * 0.18 + i * 2.1) * 0.5 + 0.5) * fH;
        const alpha = (Math.sin(t * 0.5 + i * 1.1) * 0.5 + 0.5) * 0.2;
        ctx.beginPath();
        ctx.arc(px, py, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      animFrame = requestAnimationFrame(draw);
    }

    animFrame = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div className="w-[88%] h-[82%] relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ imageRendering: "auto" }}
        />

        {/* Label */}
        <div className="absolute bottom-3 right-4">
          <span className="text-accent/50 text-[9px] tracking-[0.14em] uppercase">
            Napínaný strop
          </span>
        </div>
      </div>
    </div>
  );
}
