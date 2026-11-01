import Image from "next/image";
import Link from "next/link";
import { signOff, storyScreens } from "@/lib/story";
import landscape from "@/public/images/hero/landscape.webp";

/*
 * Home: one tall picture in a window with paper around it (an eclipse over a
 * planet, hills and a river at dusk). The first screen is the hero: the name
 * line and View projects on the pale sky, the eclipse beside it. Scrolling
 * down the same picture, the team's story follows in three screens on the
 * dark hills (paper text over a soft shade). Plain scroll; copy fades in once.
 */
export default function Hero() {
  return (
    <section
      id="about"
      data-nav="about"
      data-theme="sky"
      aria-labelledby="home-title"
      className="px-[var(--gutter)] pb-[var(--gutter)]"
    >
      <div className="grain-on relative mx-auto max-w-[1600px] overflow-hidden rounded-md bg-night">
        <Image
          src={landscape}
          alt="An eclipse of a grey and a copper disc above a planet's horizon; dark hills and a river below, lit copper at dusk."
          fill
          preload
          sizes="(min-width: 1600px) 1600px, 100vw"
          className="object-cover object-[85%_center] sm:object-[80%_center] lg:object-center"
        />

        {/* a soft shade behind the story on the dark hills, fading in from the sky */}
        <div className="story-shade" aria-hidden="true" />

        {/* the hero: on the pale sky, the eclipse of the picture beside it (below it on phones) */}
        <div className="relative z-[2] flex min-h-[calc(100svh-var(--header-h)-var(--gutter))] flex-col px-6 pt-[9vh] sm:px-10 sm:pt-[12vh] lg:px-16 lg:pt-[22vh]">
          <h1
            id="home-title"
            className="display hero-lines text-[clamp(2.9rem,1.3rem+5.4vw,7rem)] leading-[1.02] text-ink"
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

        {/* the story, further down the same picture */}
        {storyScreens.map((s, i) => {
          return (
            <div
              key={s.title}
              className="relative z-[2] flex min-h-[calc(100svh-var(--header-h)-var(--gutter))] items-center px-6 py-20 sm:px-10 lg:px-16"
            >
              <div data-reveal className="max-w-[34rem] text-paper">
                <h2 className="font-display text-[clamp(2.3rem,1.3rem+3.4vw,4.6rem)] leading-[1.02] tracking-[-0.02em] [text-wrap:balance]">
                  {s.title}
                </h2>
                {s.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 24)}
                    className="mt-5 text-[clamp(1rem,0.95rem+0.25vw,1.15rem)] leading-[1.7] text-paper/90"
                  >
                    {p}
                  </p>
                ))}
                {i === storyScreens.length - 1 ? (
                  <p className="mt-10 font-display text-[clamp(1.8rem,1.2rem+1.6vw,2.6rem)] leading-none">{signOff}</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
