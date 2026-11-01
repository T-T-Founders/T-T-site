import Link from "next/link";
import EclipseHorizon from "./EclipseHorizon";

export default function Hero() {
  return (
    <section
      data-theme="sky"
      aria-labelledby="hero-title"
      className="hero-sky relative -mt-[var(--header-h)] flex min-h-[max(100svh,600px)] flex-col overflow-hidden pt-[var(--header-h)] lg:min-h-[max(100svh,760px)]"
    >
      <EclipseHorizon />
      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-[var(--gutter)]">
        <div className="pt-[12vh] sm:pt-[18vh] lg:pt-[24vh]">
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
    </section>
  );
}
