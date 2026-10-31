"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { botMockups, projectNames, story, tools, type ChatLine } from "@/lib/story";

/*
 * The home story, told by the mark: the grey disc and the copper disc are the
 * two founders. Scrolling through a ~300svh section drives one progress value
 * `--p` (0..1) on the section; the copy, mockups and chips read it in CSS, and
 * the discs are moved here with setAttribute. As the discs close into the
 * eclipse of the logo, their overlap dims the horizon light (`--light`).
 *
 * Without JS or with prefers-reduced-motion the CSS shows the three screens as
 * ordinary blocks with static discs (see .story in globals.css).
 */

// Disc geometry in SVG units (viewBox 600 x 200). d / r = 1.25 at rest, as in the mark.
const R = 80;
const CY = 100;
const MID = 300;
const SEP_FAR = 400;
const SEP_NEAR = 260;
const SEP_ECLIPSE = 100;

/** Fade windows [in-start, in-end, out-start, out-end] in progress units. */
const WIN = {
  friends: [-1, -0.5, 0.24, 0.32],
  bots: [0.34, 0.42, 0.6, 0.68],
  mocks: [0.38, 0.47, 0.6, 0.68],
  tools: [0.66, 0.75, 0.8, 0.85],
  projects: [0.83, 0.91, 2, 3],
  final: [0.86, 0.94, 2, 3],
} as const;
const FINAL_AT = 0.9;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function separation(p: number) {
  if (p < 0.26) return SEP_FAR;
  if (p < 0.42) return lerp(SEP_FAR, SEP_NEAR, smooth(seg(p, 0.26, 0.42)));
  if (p < 0.64) return SEP_NEAR;
  return lerp(SEP_NEAR, SEP_ECLIPSE, smooth(seg(p, 0.64, FINAL_AT)));
}

function overlapFraction(d: number) {
  if (d >= 2 * R) return 0;
  if (d <= 0) return 1;
  const a = 2 * R * R * Math.acos(d / (2 * R)) - (d / 2) * Math.sqrt(4 * R * R - d * d);
  return a / (Math.PI * R * R);
}

const ECLIPSE_OVERLAP = overlapFraction(SEP_ECLIPSE);
const ECLIPSE_LIGHT = 0.78;
// more overlap -> deeper eclipse -> dimmer horizon (1 when apart, 0.78 in the logo)
const lightFor = (d: number) =>
  clamp(ECLIPSE_LIGHT - (overlapFraction(d) - ECLIPSE_OVERLAP) * 1.6, 0.5, 1);

const win = (w: readonly number[], extra?: Record<string, string | number>) =>
  ({ "--a": w[0], "--b": w[1], "--c": w[2], "--d": w[3], ...extra }) as React.CSSProperties;

/** Chip resting offsets around the eclipse (desktop), spread on an ellipse. */
const chipOffset = (i: number, n: number) => {
  const a = ((22.5 + (360 / n) * i) * Math.PI) / 180;
  return { "--x": `${(Math.cos(a) * 20).toFixed(2)}vw`, "--y": `${(Math.sin(a) * 12).toFixed(2)}vw` };
};

function DiscDefs({ id }: { id: string }) {
  return (
    <>
      <radialGradient id={`${id}-l`} cx="0.74" cy="0.3" r="0.9">
        <stop offset="0" stopColor="#EFE1D5" />
        <stop offset="0.45" stopColor="#BBAAA2" />
        <stop offset="1" stopColor="#4E4648" />
      </radialGradient>
      <radialGradient id={`${id}-r`} cx="0.7" cy="0.6" r="0.85">
        <stop offset="0" stopColor="#F7924A" />
        <stop offset="0.5" stopColor="#E2692B" />
        <stop offset="1" stopColor="#8E3A1B" />
      </radialGradient>
      <radialGradient id={`${id}-o`} cx="0.35" cy="0.5" r="0.7">
        <stop offset="0" stopColor="#2D2425" />
        <stop offset="1" stopColor="#1A1516" />
      </radialGradient>
    </>
  );
}

/** The two discs at a fixed separation: used when the story is not pinned. */
function StaticDiscs({ id, sep }: { id: string; sep: number }) {
  const lx = MID - sep / 2;
  const rx = MID + sep / 2;
  return (
    <svg viewBox="0 0 600 200" className="story-static" aria-hidden="true">
      <defs>
        <DiscDefs id={id} />
        <clipPath id={`${id}-c`}>
          <circle cx={lx} cy={CY} r={R} />
        </clipPath>
      </defs>
      <circle cx={lx} cy={CY} r={R} fill={`url(#${id}-l)`} />
      <circle cx={rx} cy={CY} r={R} fill={`url(#${id}-r)`} />
      <circle cx={rx} cy={CY} r={R} fill={`url(#${id}-o)`} clipPath={`url(#${id}-c)`} />
    </svg>
  );
}

function Mockup({ kind }: { kind: "gem" | "telegram" }) {
  const m = botMockups[kind];
  const tg = kind === "telegram";
  return (
    <div className={`mock mock-${kind}`}>
      <div className="flex items-center gap-2.5 border-b border-line px-3.5 py-2 lg:px-4 lg:py-2.5">
        <span className={`mock-avatar ${tg ? "mock-avatar-copper" : "mock-avatar-grey"}`} />
        <span className="text-[0.85rem] font-medium">{m.title}</span>
      </div>
      <div className={`flex flex-col gap-1.5 px-3.5 py-2.5 lg:gap-2 lg:px-4 lg:py-3 ${tg ? "mock-chat-tg" : ""}`}>
        {m.lines.map((l: ChatLine, i: number) => (
          <p
            key={i}
            className={`mock-line ${l.from === "user" ? "mock-user" : "mock-bot"} ${
              tg ? "mock-bubble" : ""
            } ${l.text.startsWith("/") ? "font-mono" : ""}`}
          >
            {l.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<SVGCircleElement>(null);
  const rightRef = useRef<SVGCircleElement>(null);
  const clipRef = useRef<SVGCircleElement>(null);
  const shadowRef = useRef<SVGCircleElement>(null);
  // where the pinned track starts and how far it travels, for the final-button focus jump
  const geom = useRef({ top: 0, travel: 1, pinned: false, p: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const art = artRef.current;
    if (!section || !stage || !art) return;

    const g = geom.current;
    const start = performance.now();
    let raf = 0;
    let visible = true;
    let lastStep = "";

    const measure = () => {
      g.pinned = getComputedStyle(stage).position === "sticky";
      g.top = section.getBoundingClientRect().top + window.scrollY;
      g.travel = Math.max(1, section.offsetHeight - stage.offsetHeight);
    };

    const draw = (now: number) => {
      const p = g.pinned ? clamp((window.scrollY - g.top) / g.travel) : 1;
      if (Math.abs(p - g.p) > 0.0004 || now === start) {
        section.style.setProperty("--p", p.toFixed(4));
        g.p = p;
      }
      const step = p >= FINAL_AT - 0.02 ? "final" : "story";
      if (step !== lastStep) {
        section.dataset.step = step;
        lastStep = step;
      }

      // each disc drifts a little on its own until the eclipse locks
      const amp = 1 - seg(p, 0.64, FINAL_AT);
      const t = now - start;
      const sep = separation(p);
      const lx = MID - sep / 2 + Math.sin(t * 0.00042) * 7 * amp;
      const ly = CY + Math.cos(t * 0.00031) * 5 * amp;
      const rx = MID + sep / 2 + Math.sin(t * 0.00037 + 2) * 7 * amp;
      const ry = CY + Math.cos(t * 0.00029 + 1) * 5 * amp;
      leftRef.current?.setAttribute("cx", lx.toFixed(2));
      leftRef.current?.setAttribute("cy", ly.toFixed(2));
      clipRef.current?.setAttribute("cx", lx.toFixed(2));
      clipRef.current?.setAttribute("cy", ly.toFixed(2));
      rightRef.current?.setAttribute("cx", rx.toFixed(2));
      rightRef.current?.setAttribute("cy", ry.toFixed(2));
      shadowRef.current?.setAttribute("cx", rx.toFixed(2));
      shadowRef.current?.setAttribute("cy", ry.toFixed(2));
      art.style.setProperty("--light", lightFor(Math.hypot(rx - lx, ry - ly)).toFixed(3));
      return amp > 0;
    };

    // One frame per scroll event; keep looping only while the discs still drift.
    const tick = (now: number) => {
      raf = 0;
      const drifting = draw(now);
      if (drifting && g.pinned && visible && !document.hidden) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
      kick();
    };

    measure();
    draw(start);
    kick();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    io.observe(section);

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", kick);
    motion.addEventListener("change", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", kick);
      motion.removeEventListener("change", onResize);
    };
  }, []);

  // Keyboard users can tab to the final button before it has faded in: bring it into view.
  const revealFinal = () => {
    const g = geom.current;
    if (g.pinned && g.p < FINAL_AT) window.scrollTo({ top: g.top + g.travel });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      data-nav="about"
      data-theme="sky"
      aria-label="T&T Labs"
      className="story relative -mt-[var(--header-h)]"
      style={{ ["--p" as string]: 0 }}
    >
      <div ref={stageRef} className="story-stage hero-sky">
        {/* the drawing: planet, discs, chips. Pinned mode only. */}
        <div ref={artRef} className="story-art hero-scene" aria-hidden="true">
          <div className="planet-haze" />
          <div className="planet" />
          <svg viewBox="0 0 600 200" className="story-discs">
            <defs>
              <DiscDefs id="st" />
              <clipPath id="st-c">
                <circle ref={clipRef} cx={MID - SEP_FAR / 2} cy={CY} r={R} />
              </clipPath>
            </defs>
            <circle ref={leftRef} cx={MID - SEP_FAR / 2} cy={CY} r={R} fill="url(#st-l)" />
            <circle ref={rightRef} cx={MID + SEP_FAR / 2} cy={CY} r={R} fill="url(#st-r)" />
            <circle
              ref={shadowRef}
              cx={MID + SEP_FAR / 2}
              cy={CY}
              r={R}
              fill="url(#st-o)"
              clipPath="url(#st-c)"
            />
          </svg>
          <div className="story-chips" data-win style={win(WIN.tools)}>
            {tools.map((name, i) => (
              <span key={name} className="story-chip" style={chipOffset(i, tools.length) as React.CSSProperties}>
                {name}
              </span>
            ))}
          </div>
          <div className="story-chips" data-win style={win(WIN.projects)}>
            {projectNames.map((name, i) => (
              <span
                key={name}
                className="story-chip story-chip-project"
                style={chipOffset(i, projectNames.length) as React.CSSProperties}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Screen 1 */}
        <div className="story-screen" data-win style={win(WIN.friends)}>
          <div className="story-inner">
            <div className="story-copy">
              <h2 className="story-title">{story.friends.title}</h2>
              <p className="story-caption">{story.friends.caption}</p>
              <p className="story-place">
                <span className="story-place-dot" aria-hidden="true" />
                {story.friends.place}
              </p>
            </div>
          </div>
          <StaticDiscs id="sd1" sep={SEP_FAR} />
        </div>

        {/* Screen 2 */}
        <div className="story-screen" data-win style={win(WIN.bots)}>
          <div className="story-inner">
            <div className="story-copy">
              <h2 className="story-title">{story.bots.title}</h2>
              <p className="story-caption">{story.bots.caption}</p>
            </div>
            <div className="story-mocks" aria-hidden="true">
              <div className="story-mock-slot story-mock-left" data-win style={win(WIN.mocks)}>
                <Mockup kind="gem" />
              </div>
              <div className="story-mock-slot story-mock-right" data-win style={win(WIN.mocks)}>
                <Mockup kind="telegram" />
              </div>
            </div>
          </div>
          <StaticDiscs id="sd2" sep={SEP_NEAR} />
        </div>

        {/* Screen 3 */}
        <div className="story-screen story-final" data-win style={win(WIN.final)}>
          <div className="story-inner">
            <div className="story-copy">
              <h1 className="story-name display">{story.final.title}</h1>
              <p className="story-caption">{story.final.line}</p>
              <div className="mt-9">
                <Link
                  href="/skills"
                  onFocus={revealFinal}
                  className="group press inline-flex h-14 items-center gap-5 rounded-pill bg-ink pl-7 pr-6 text-[1rem] text-paper transition-colors duration-200 hover:bg-[color-mix(in_oklch,var(--ink),var(--copper)_28%)]"
                >
                  View projects
                  <svg viewBox="0 0 24 12" className="nudge-x h-3 w-6" aria-hidden="true">
                    <path d="M0 6h22M17 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <StaticDiscs id="sd3" sep={SEP_ECLIPSE} />
        </div>
      </div>
    </section>
  );
}
