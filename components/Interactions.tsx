"use client";

import { useEffect } from "react";

/**
 * Site-wide "touchable" behaviour, attached once and driven by data attributes:
 *
 * - data-magnetic: the element leans toward the mouse while it is over it.
 * - data-tilt="6": a card tilts toward the mouse (max degrees) with a light glare.
 * - On touch screens, a [data-tilt] card in the middle of the screen gets
 *   data-active="true", so its drawing plays the way it does on hover.
 *
 * Mouse effects are off under prefers-reduced-motion. Only CSS variables and
 * attributes are written; the transforms live in globals.css.
 */
export default function Interactions() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touch = window.matchMedia("(hover: none)");

    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;
    let raf = 0;
    let last: PointerEvent | null = null;

    const releaseMagnet = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.removeProperty("--mag-x");
      el.style.removeProperty("--mag-y");
      delete el.dataset.magnetOn;
    };
    const releaseTilt = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.removeProperty("--tilt-rx");
      el.style.removeProperty("--tilt-ry");
      delete el.dataset.tilting;
    };

    const frame = () => {
      raf = 0;
      const e = last;
      if (!e) return;
      const target = e.target instanceof Element ? e.target : null;

      const m = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (m !== magnet) {
        releaseMagnet(magnet);
        magnet = m;
      }
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        m.style.setProperty("--mag-x", `${(dx * 0.28).toFixed(1)}px`);
        m.style.setProperty("--mag-y", `${(dy * 0.35).toFixed(1)}px`);
        m.dataset.magnetOn = "";
      }

      const t = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (t !== tilt) {
        releaseTilt(tilt);
        tilt = t;
      }
      if (t) {
        const r = t.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const max = Number(t.dataset.tilt) || 6;
        t.style.setProperty("--tilt-rx", `${((0.5 - py) * max).toFixed(2)}deg`);
        t.style.setProperty("--tilt-ry", `${((px - 0.5) * max).toFixed(2)}deg`);
        t.style.setProperty("--glare-x", `${(px * 100).toFixed(1)}%`);
        t.style.setProperty("--glare-y", `${(py * 100).toFixed(1)}%`);
        t.dataset.tilting = "";
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reduce.matches) return;
      last = e;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onLeave = () => {
      releaseMagnet(magnet);
      releaseTilt(tilt);
      magnet = tilt = null;
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    // Touch: the card in the middle band of the screen is "active".
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          (en.target as HTMLElement).dataset.active = String(en.isIntersecting && touch.matches);
        }
      },
      { rootMargin: "-38% 0px -38% 0px" },
    );
    const scan = () =>
      document.querySelectorAll<HTMLElement>("[data-tilt]:not([data-tilt-watch])").forEach((el) => {
        el.dataset.tiltWatch = "";
        io.observe(el);
      });
    scan();
    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
