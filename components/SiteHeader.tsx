"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Mark, Wordmark } from "./Logo";
import { orgGithub } from "@/lib/projects";

const NAV = [
  { href: "/skills", label: "Skills" },
  { href: "/applications", label: "Applications" },
  { href: "/games", label: "Games" },
  { href: "/#about", label: "About" },
];

type Theme = "sky" | "paper" | "night";

const themeFor = (path: string): Theme =>
  path === "/" ? "sky" : path.startsWith("/games") ? "night" : "paper";

/**
 * Sticky header. Its colors follow whatever section sits right under it
 * (sky, paper or night), and the active link follows the route.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // What was measured under the header, tagged with the route it was measured on,
  // so a reading from the previous page can never color the new one.
  const [measured, setMeasured] = useState<{ path: string; theme: Theme } | null>(null);
  const theme: Theme = measured?.path === pathname ? measured.theme : themeFor(pathname);
  const [aboutInView, setAboutInView] = useState(false);
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  // The home story pins a full-screen sky stage; while it is pinned nothing scrolls
  // under the header, so it can stay transparent the whole way through.
  const [skyPinned, setSkyPinned] = useState(false);
  const [shownPath, setShownPath] = useState(pathname);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // New route: start from that page's color and close the menu (state adjusted during render).
  if (shownPath !== pathname) {
    setShownPath(pathname);
    setOpen(false);
  }

  // Theme + "at top" from what is under the header's bottom edge. One rAF per scroll.
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      setAtTop(window.scrollY < 8);
      const stage = document.querySelector(".story-stage");
      setSkyPinned(!!stage && getComputedStyle(stage).position === "sticky");
      const header = document.querySelector("header");
      const y = Math.round((header?.getBoundingClientRect().height ?? 76) + 2);
      const el = document.elementFromPoint(Math.round(window.innerWidth / 2), y);
      const t = el?.closest<HTMLElement>("[data-theme]")?.dataset.theme as Theme | undefined;
      // the sky only exists on the home page; anything else is a stale hit mid-transition
      if (t && (t !== "sky" || pathname === "/")) setMeasured({ path: pathname, theme: t });
      const about = document.getElementById("about");
      if (about) {
        const r = about.getBoundingClientRect();
        const mid = window.innerHeight / 2;
        setAboutInView(r.top < mid && r.bottom > mid);
      } else setAboutInView(false);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    // let the new page paint first (and again once the page transition has settled), then read it
    const first = window.setTimeout(measure, 60);
    const settled = window.setTimeout(measure, 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(settled);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

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

  const isActive = (href: string) =>
    href === "/#about" ? isHome && aboutInView : pathname === href || pathname.startsWith(`${href}/`);

  const night = theme === "night";
  const bar =
    theme === "sky" && (atTop || skyPinned) && !open
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
      <div className="mx-auto grid h-full max-w-[1600px] grid-cols-[1fr_auto] items-center gap-6 px-[var(--gutter)] md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="flex items-center gap-3 justify-self-start rounded-sm" aria-label="T&T Labs, home">
          <Mark id="hdr" className="h-[30px] w-auto sm:h-[36px]" />
          <Wordmark className="whitespace-nowrap text-[1.6rem] sm:text-[1.95rem]" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 text-[0.98rem] lg:gap-10">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="link-line py-1"
                  aria-current={isActive(n.href) ? (n.href.startsWith("/#") ? "true" : "page") : undefined}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <a
            href={orgGithub}
            className={`group hidden h-11 items-center gap-2 rounded-pill border px-5 text-[0.95rem] transition-colors duration-200 md:inline-flex ${
              night
                ? "border-paper/50 hover:bg-paper hover:text-night"
                : "border-ink/60 hover:bg-ink hover:text-paper"
            }`}
          >
            GitHub
            <svg viewBox="0 0 16 16" className="card-arrow h-3.5 w-3.5" aria-hidden="true">
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

      {/* Overlays the page instead of pushing it down, so opening it never moves the content. */}
      <div
        id="mobile-menu"
        ref={menuRef}
        inert={!open}
        className={`absolute inset-x-0 top-full border-b px-[var(--gutter)] pb-6 pt-2 transition-[opacity,transform,visibility] duration-300 ease md:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        } ${night ? "border-night-line bg-night text-paper" : "border-line bg-paper text-ink"}`}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {NAV.map((n, i) => (
              <li
                key={n.href}
                className="transition-[opacity,transform] duration-500 ease"
                style={{
                  transitionDelay: open ? `${60 + i * 45}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(8px)",
                }}
              >
                <Link
                  href={n.href}
                  className="flex min-h-12 items-center font-display text-[1.75rem] leading-none"
                  aria-current={isActive(n.href) ? "page" : undefined}
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
