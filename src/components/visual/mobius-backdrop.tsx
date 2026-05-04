"use client";

import { useEffect, useRef } from "react";

/**
 * MobiusBackdrop — global ambient layer for brand v2 B3.
 *
 * v3 (2026-05-04): max-visibility pass + running light pulses.
 * - Body alpha cranked from 0.18 to 0.30 base, edge to 0.85.
 * - Inner edge: white 1.0 with 12px halo (was 0.85 / 8px).
 * - Outer edge: cyan 0.95 with 12px halo (was 0.70 / 8px).
 * - Five running light pulses (white, cyan, electric, pulse, white)
 *   travel around the U-loop at staggered speeds with comet trails.
 * - Pitch fixed at 0.62 rad — never edge-on, always reads as a strip.
 * - Anchored at viewport center (was upper third).
 * - Backdrop lifted slightly from #000000 to #04060A for contrast.
 *
 * Renders a parametric Möbius strip in canvas 2D, slowly rotating on
 * the Y-axis. Wireframe ribbon styling: signal-blue strokes along the
 * U-parameter at seven V-levels with depth-sorted painter's-algorithm
 * overdraw, plus bright white inner-edge and cyan outer-edge highlights
 * with glow halos, plus running light pulses.
 *
 * Why a Möbius: one continuous surface = perfect metaphor for the
 * compounding-system narrative. Geometric beauty ties to the
 * Renaissance / da Vinci visual heritage. Mathematical, premium,
 * unmistakably engineered.
 *
 * Performance:
 * - Pure canvas 2D — no Three.js dependency, no WebGL context.
 * - DPR clamped to 2.
 * - 1680 segments per frame + 5 pulses with trails. ~5-7ms/frame.
 * - rAF loop pauses when prefers-reduced-motion is set.
 *
 * Accessibility:
 * - aria-hidden, pointer-events: none, sits behind all content.
 * - prefers-reduced-motion → renders one frame, then halts.
 */
export function MobiusBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Möbius parameters
    const R = 1.0;
    const W = 0.5;
    const samplesU = 240;
    const samplesV = 7;

    type Vec3 = { x: number; y: number; z: number };
    type Segment = {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      z: number;
      edgeFactor: number;
    };

    const grid: Vec3[][] = Array.from({ length: samplesU + 1 }, () =>
      Array.from({ length: samplesV + 1 }, () => ({ x: 0, y: 0, z: 0 })),
    );
    const segments: Segment[] = new Array(samplesU * (samplesV + 1));
    for (let s = 0; s < segments.length; s++) {
      segments[s] = { x1: 0, y1: 0, x2: 0, y2: 0, z: 0, edgeFactor: 0 };
    }

    type Pulse = {
      speed: number;
      vIdx: number;
      color: string; // "r,g,b"
      size: number;
      phase: number;
    };
    const pulses: Pulse[] = [
      { speed: 0.0035, vIdx: 0, color: "255,255,255", size: 6, phase: 0.0 },
      { speed: 0.0028, vIdx: samplesV, color: "0,217,255", size: 5, phase: 1.7 },
      { speed: 0.0042, vIdx: 1, color: "74,158,255", size: 5, phase: 3.1 },
      {
        speed: 0.0024,
        vIdx: samplesV - 1,
        color: "139,92,246",
        size: 5,
        phase: 4.5,
      },
      {
        speed: 0.005,
        vIdx: Math.floor(samplesV / 2),
        color: "255,255,255",
        size: 4,
        phase: 0.9,
      },
    ];

    let frame = 0;
    let raf = 0;

    const render = () => {
      const t = frame * 0.0011;
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const scale = Math.min(width, height) * 0.4;

      const yaw = t;
      const pitch = 0.62; // fixed tilt — never edge-on
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);

      // Build rotated vertex grid
      for (let i = 0; i <= samplesU; i++) {
        const u = (i / samplesU) * Math.PI * 2;
        const halfU = u * 0.5;
        const cosU = Math.cos(u);
        const sinU = Math.sin(u);
        const cosHalfU = Math.cos(halfU);
        const sinHalfU = Math.sin(halfU);
        for (let j = 0; j <= samplesV; j++) {
          const v = (j / samplesV - 0.5) * 2 * W;
          const radial = R + v * cosHalfU;
          const x0 = radial * cosU;
          const y0 = radial * sinU;
          const z0 = v * sinHalfU;
          const x1 = x0 * cosY - z0 * sinY;
          const z1 = x0 * sinY + z0 * cosY;
          const y1 = y0 * cosP - z1 * sinP;
          const z2 = y0 * sinP + z1 * cosP;
          const cell = grid[i][j];
          cell.x = x1;
          cell.y = y1;
          cell.z = z2;
        }
      }

      // Build segments
      let s = 0;
      const half = samplesV * 0.5;
      for (let j = 0; j <= samplesV; j++) {
        const edgeFactor = Math.abs(j - half) / half;
        for (let i = 0; i < samplesU; i++) {
          const p1 = grid[i][j];
          const p2 = grid[i + 1][j];
          const seg = segments[s++];
          seg.x1 = p1.x;
          seg.y1 = p1.y;
          seg.x2 = p2.x;
          seg.y2 = p2.y;
          seg.z = (p1.z + p2.z) * 0.5;
          seg.edgeFactor = edgeFactor;
        }
      }

      // Painter's algorithm
      segments.sort((a, b) => a.z - b.z);

      // Pass 1 — body ribbons
      ctx.shadowColor = "rgba(74, 158, 255, 0.7)";
      ctx.shadowBlur = 8;
      for (let k = 0; k < segments.length; k++) {
        const seg = segments[k];
        const depthFade = (seg.z + 1.4) / 2.8;
        let alpha = (0.3 + seg.edgeFactor * 0.55) * (0.55 + depthFade * 0.45);
        if (alpha > 1) alpha = 1;
        ctx.beginPath();
        ctx.moveTo(cx + seg.x1 * scale, cy + seg.y1 * scale);
        ctx.lineTo(cx + seg.x2 * scale, cy + seg.y2 * scale);
        ctx.strokeStyle = `rgba(74, 158, 255, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 1.2 + seg.edgeFactor * 1.0;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      // Pass 2 — inner edge bright white halo
      ctx.shadowColor = "rgba(255, 255, 255, 0.85)";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      for (let i = 0; i <= samplesU; i++) {
        const p = grid[i][0];
        const sx = cx + p.x * scale;
        const sy = cy + p.y * scale;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 1.0)";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Pass 3 — outer edge cyan halo
      ctx.shadowColor = "rgba(0, 217, 255, 0.85)";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      for (let i = 0; i <= samplesU; i++) {
        const p = grid[i][samplesV];
        const sx = cx + p.x * scale;
        const sy = cy + p.y * scale;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = "rgba(0, 217, 255, 0.95)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Pass 4 — running light pulses with comet trails
      for (let p = 0; p < pulses.length; p++) {
        const pulse = pulses[p];
        const u01 = ((frame * pulse.speed) + pulse.phase) % 1;
        const iIdx = Math.floor(u01 * samplesU);
        const pPos = grid[iIdx][pulse.vIdx];
        const px = cx + pPos.x * scale;
        const py = cy + pPos.y * scale;

        // Outer glow
        const grad = ctx.createRadialGradient(px, py, 0, px, py, pulse.size * 4);
        grad.addColorStop(0, `rgba(${pulse.color}, 1.0)`);
        grad.addColorStop(0.4, `rgba(${pulse.color}, 0.4)`);
        grad.addColorStop(1, `rgba(${pulse.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, pulse.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = `rgba(${pulse.color}, 1.0)`;
        ctx.beginPath();
        ctx.arc(px, py, pulse.size * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Comet trail
        ctx.shadowColor = `rgba(${pulse.color}, 0.6)`;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        const trailLen = 30;
        for (let tk = 0; tk < trailLen; tk++) {
          const tIdx = (iIdx - tk + samplesU) % samplesU;
          const tp = grid[tIdx][pulse.vIdx];
          const tx = cx + tp.x * scale;
          const ty = cy + tp.y * scale;
          if (tk === 0) ctx.moveTo(tx, ty);
          else ctx.lineTo(tx, ty);
        }
        ctx.strokeStyle = `rgba(${pulse.color}, 0.6)`;
        ctx.lineWidth = 2.0;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      frame++;
      if (!reduceMotion) raf = requestAnimationFrame(render);
    };

    // Defer first render one frame so layout has settled.
    raf = requestAnimationFrame(() => {
      resize();
      render();
    });
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -5,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
