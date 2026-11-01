import Link from "next/link";
import EclipseHorizon from "./EclipseHorizon";

export default function Hero() {
  return (
    <section data-theme="sky" aria-labelledby="hero-title" className="px-[var(--gutter)] pb-[var(--gutter)]">
      {/* the scene sits in a window with paper around it */}
      <div className="hero-window hero-sky relative mx-auto flex min-h-[max(calc(100svh-var(--header-h)-var(--gutter)),560px)] max-w-[1600px] flex-col overflow-hidden rounded-md lg:min-h-[max(calc(100svh-var(--header-h)-var(--gutter)),680px)]">
      <EclipseHorizon />
      <div className="relative flex w-full flex-1 flex-col px-6 sm:px-10 lg:px-16">
        <div className="pt-[9vh] sm:pt-[14vh] lg:pt-[18vh]">
          <h1
            id="hero-title"
            className="display hero-lines text-[clamp(2.9rem,1.3rem+5.8vw,7.2rem)] leading-[1.02]"
          >
            <span>
              <span>We build tools, </span>
            </span>
            <span>
              <span style={{ ["--l" as string]: 1 }}>
                apps and <em>games.</em>
              </span>
            </span>
          </h1>
          <div className="enter mt-10 sm:mt-12" style={{ ["--i" as string]: 3 }}>
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
      </div>
      </div>
    </section>
  );
}
