"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

/**
 * One observer for the whole site. Every element with `data-reveal` (or the
 * `title-lines` heading class) gets `data-shown` once it scrolls into view,
 * and the CSS in globals.css raises it. New pages are picked up through a
 * MutationObserver, so server components only need the attribute.
 */
export default function RevealObserver() {
  useEffect(() => {
    window.__revealReady = true;
    const root = document.documentElement;
    root.classList.add("js");

    const show = (el: Element) => el.setAttribute("data-shown", "");

    if (!("IntersectionObserver" in window)) {
      root.classList.remove("js");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    let queued = false;
    const scan = () => {
      queued = false;
      document
        .querySelectorAll("[data-reveal]:not([data-watch]), .title-lines:not([data-watch])")
        .forEach((el) => {
          el.setAttribute("data-watch", "");
          io.observe(el);
        });
    };
    scan();

    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
