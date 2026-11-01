import Link from "next/link";
import { botMockups, projectNames, story, tools, type ChatLine } from "@/lib/story";

/*
 * The founders' story, three plain screens under the hero. The two discs of
 * the mark are the two founders: far apart, closer, then the eclipse of the logo.
 * Copy and data: lib/story.ts.
 */

// Disc geometry in SVG units (viewBox 600 x 200). d / r = 1.25 in the eclipse, as in the mark.
const R = 80;
const CY = 100;
const MID = 300;
const SEP = { apart: 400, closer: 260, eclipse: 100 };

function Discs({ id, sep }: { id: string; sep: number }) {
  const lx = MID - sep / 2;
  const rx = MID + sep / 2;
  return (
    <svg viewBox="0 0 600 200" className="story-discs" aria-hidden="true">
      <defs>
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
      <div className="flex items-center gap-2.5 border-b border-line px-3.5 py-2">
        <span className={`mock-avatar ${tg ? "mock-avatar-copper" : "mock-avatar-grey"}`} />
        <span className="truncate text-[0.85rem] font-medium">{m.title}</span>
      </div>
      <div className={`flex flex-col gap-1.5 px-3.5 py-3 ${tg ? "mock-chat-tg" : ""}`}>
        {m.lines.map((l: ChatLine, i: number) => (
          <p
            key={i}
            className={`mock-line ${l.from === "user" ? "mock-user" : "mock-bot"} ${tg ? "mock-bubble" : ""} ${
              l.text.startsWith("/") ? "font-mono" : ""
            }`}
          >
            {l.text}
          </p>
        ))}
      </div>
    </div>
  );
}

/** Chips on two ellipses around the eclipse (from 640px up); a wrapped list below it on phones. */
const ring = (i: number, n: number, rx: number, ry: number, offset: number) => {
  const a = ((offset + (360 / n) * i) * Math.PI) / 180;
  return {
    ["--x" as string]: `${(Math.cos(a) * rx).toFixed(2)}%`,
    ["--y" as string]: `${(Math.sin(a) * ry).toFixed(2)}%`,
  } as React.CSSProperties;
};

export default function Story() {
  return (
    <section id="about" data-nav="about" data-theme="paper" aria-label="Our story" className="mx-auto max-w-[1600px] px-[var(--gutter)]">
      {/* 1: two friends */}
      <div className="story-screen">
        <div data-reveal>
          <h2 className="story-title">{story.friends.title}</h2>
          <p className="story-caption">{story.friends.caption}</p>
          <p className="story-place">
            <span className="story-place-dot" aria-hidden="true" />
            {story.friends.place}
          </p>
        </div>
        <div data-reveal style={{ ["--i" as string]: 1 }}>
          <Discs id="s1" sep={SEP.apart} />
        </div>
      </div>

      {/* 2: two small bots */}
      <div className="story-screen">
        <div data-reveal>
          <h2 className="story-title">{story.bots.title}</h2>
          <p className="story-caption">{story.bots.caption}</p>
        </div>
        <div data-reveal style={{ ["--i" as string]: 1 }}>
          <Discs id="s2" sep={SEP.closer} />
          <div className="story-mocks" aria-hidden="true">
            <Mockup kind="gem" />
            <Mockup kind="telegram" />
          </div>
        </div>
      </div>

      {/* 3: then it took off */}
      <div className="story-screen">
        <div data-reveal>
          <h2 className="story-title">{story.final.title}</h2>
          <p className="story-caption">{story.final.line}</p>
          <div className="mt-9">
            <Link
              href="/skills"
              className="group press inline-flex h-14 items-center gap-5 rounded-pill bg-ink pl-7 pr-6 text-[1rem] text-paper transition-colors duration-200 hover:bg-[color-mix(in_oklch,var(--ink),var(--copper)_28%)]"
            >
              View projects
              <svg viewBox="0 0 24 12" className="nudge-x h-3 w-6" aria-hidden="true">
                <path d="M0 6h22M17 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </Link>
          </div>
        </div>
        <div data-reveal style={{ ["--i" as string]: 1 }} className="story-ring" aria-hidden="true">
          <Discs id="s3" sep={SEP.eclipse} />
          <div className="story-chips">
            {tools.map((t, i) => (
              <span key={t} className="story-chip" style={ring(i, tools.length, 46, 46, 0)}>
                {t}
              </span>
            ))}
          </div>
          <div className="story-chips">
            {projectNames.map((p, i) => (
              <span key={p} className="story-chip story-chip-project" style={ring(i, projectNames.length, 33, 30, 22.5)}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
