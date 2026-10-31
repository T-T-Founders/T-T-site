"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Mark, Wordmark } from "./Logo";
import { orgGithub } from "@/lib/projects";

const NAV = [
  { id: "skills", label: "Skills" },
  { id: "applications", label: "Applications" },
  { id: "games", label: "Games" },
  { id: "about", label: "About" },
];

/**
 * Sticky header. Two pieces of state, both describing the page underneath:
 * - which section is in view (aria-current on the matching link)
 * - whether the header sits over a night section (it flips to night colors)
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const startTheme = isHome ? "sky" : pathname.startsWith("/games") ? "night" : "paper";
  const [active, setActive] = useState<string | null>(null);
  const [theme, setTheme] = useState<"sky" | "paper" | "night">(startTheme);
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-theme]"));
    if (!sections.length) return;

    // Theme: whatever section sits at the header's bottom edge.
    const hh = document.querySelector("header")?.getBoundingClientRect().height ?? 76;
    const themeIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setTheme((e.target as HTMLElement).dataset.theme as "sky" | "paper" | "night");
          }
        }
      },
      { rootMargin: `-${Math.round(hh)}px 0px -${Math.max(0, window.innerHeight - Math.round(hh) - 2)}px 0px`, threshold: 0 },
    );
    // Active link: the section crossing the middle of the viewport.
    const spyIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.nav ?? null);
        }
      },
      { rootMargin: "-45% 0px -54% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      themeIO.observe(s);
      spyIO.observe(s);
    });
    return () => {
      themeIO.disconnect();
      spyIO.disconnect();
    };
  }, [pathname]);

  // The header is transparent only while the hero sky is fully behind it.
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape and on outside click.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const night = theme === "night";
  const bar =
    theme === "sky" && atTop && !open
      ? "bg-transparent border-transparent"
      : night
        ? "bg-night border-night-line"
        : "bg-paper border-line";
  const fg = night ? "text-paper" : "text-ink";

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${bar} ${fg}`}
      style={{ height: "var(--header-h)" }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-6 px-[var(--gutter)]">
        <Link href="/" className="flex items-center gap-3 rounded-sm" aria-label="T&T Labs, home">
          <Mark id="hdr" className="h-[30px] w-auto sm:h-[36px]" />
          <Wordmark className="text-[1.6rem] sm:text-[1.95rem]" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-10 text-[0.98rem]">
            {NAV.map((n) => (
              <li key={n.id}>
                <Link
                  href={`/#${n.id}`}
                  className="link-line py-1"
                  aria-current={isHome && active === n.id ? "true" : undefined}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={orgGithub}
            className={`hidden h-11 items-center gap-2 rounded-pill border px-5 text-[0.95rem] transition-colors duration-200 md:inline-flex ${
              night
                ? "border-paper/50 hover:bg-paper hover:text-night"
                : "border-ink/60 hover:bg-ink hover:text-paper"
            }`}
          >
            GitHub
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>

          <button
            ref={buttonRef}
            type="button"
            className={`inline-flex h-11 items-center gap-2 rounded-pill border px-4 text-[0.95rem] md:hidden ${
              night ? "border-paper/50" : "border-ink/60"
            }`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className={`border-b px-[var(--gutter)] pb-6 pt-2 md:hidden ${
          night ? "border-night-line bg-night text-paper" : "border-line bg-paper text-ink"
        }`}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {NAV.map((n) => (
              <li key={n.id}>
                <Link
                  href={`/#${n.id}`}
                  className="flex min-h-12 items-center font-display text-[1.75rem] leading-none"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={orgGithub} className="flex min-h-12 items-center text-[1rem] text-current/80">
                GitHub ↗
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
