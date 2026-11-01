"use client";

import { useEffect, useRef } from "react";

/**
 * A warm light that follows the pointer (or a finger) over the home picture:
 * "a quiet spark in the dark". Two layers moved by transform only: a broad
 * glow that warms the picture (soft-light) and a small bright core.
 * It eases after the pointer and fades out when the pointer leaves.
 */
export default function HeroLight() {
  const glowRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const core = coreRef.current;
    const host = glow?.parentElement;
    if (!glow || !core || !host) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let fade = 0;

    const place = () => {
      glow.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      core.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
    };
    const tick = () => {
      const k = reduce.matches ? 1 : 0.12;
      const kc = reduce.matches ? 1 : 0.3;
      x += (tx - x) * k;
      y += (ty - y) * k;
      cx += (tx - cx) * kc;
      cy += (ty - cy) * kc;
      place();
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.4 ? requestAnimationFrame(tick) : 0;
    };
    const show = (on: boolean) => {
      if (on) host.dataset.lit = "";
      else delete host.dataset.lit;
    };

    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!("lit" in host.dataset)) {
        x = cx = tx;
        y = cy = ty;
        place();
        show(true);
      }
      window.clearTimeout(fade);
      if (e.pointerType !== "mouse") fade = window.setTimeout(() => show(false), 1400);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => show(false);

    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerdown", move, { passive: true });
    host.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fade);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerdown", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="hero-light" aria-hidden="true" />
      <div ref={coreRef} className="hero-spark" aria-hidden="true" />
    </>
  );
}
