import Link from "next/link";
import Vista from "./Vista";
import { story } from "@/lib/story";

/*
 * The founders' story, one compact section under the hero: two short texts,
 * each over a picture in the hero's style, then where it led.
 * Copy: lib/story.ts.
 */
export default function Story() {
  return (
    <section
      id="about"
      data-nav="about"
      data-theme="paper"
      aria-label="Our story"
      className="mx-auto max-w-[1600px] px-[var(--gutter)] py-20 sm:py-28"
    >
      <div className="grid gap-14 md:grid-cols-2 md:gap-6 lg:gap-8">
        <div data-reveal className="flex flex-col">
          <h2 className="story-title">{story.friends.title}</h2>
          <p className="story-caption">{story.friends.caption}</p>
          <p className="story-place self-start">
            <span className="story-place-dot" aria-hidden="true" />
            {story.friends.place}
          </p>
          <div className="mt-8 md:mt-auto md:pt-10">
            <Vista variant="horizon" />
          </div>
        </div>
        <div data-reveal style={{ ["--i" as string]: 1 }} className="flex flex-col">
          <h2 className="story-title">{story.bots.title}</h2>
          <p className="story-caption">{story.bots.caption}</p>
          <div className="mt-8 md:mt-auto md:pt-10">
            <Vista variant="summit" />
          </div>
        </div>
      </div>

      <div data-reveal className="mt-16 flex flex-col gap-8 sm:mt-20 md:flex-row md:items-end md:justify-between">
        <h2 className="story-title max-w-[18ch]">{story.final.line}</h2>
        <Link
          href="/skills"
          className="group press inline-flex h-14 shrink-0 items-center gap-5 self-start rounded-pill bg-ink pl-7 pr-6 text-[1rem] text-paper transition-colors duration-200 hover:bg-[color-mix(in_oklch,var(--ink),var(--copper)_28%)] md:self-auto"
        >
          View projects
          <svg viewBox="0 0 24 12" className="nudge-x h-3 w-6" aria-hidden="true">
            <path d="M0 6h22M17 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
