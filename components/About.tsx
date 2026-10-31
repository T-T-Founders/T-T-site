import Link from "next/link";
import { divisions } from "@/lib/projects";
import { IzdarPlate, TkrsPlate } from "./Illustrations";
import SectionTitle from "./SectionTitle";
import LazyMount from "./LazyMount";
import FadeImage from "./FadeImage";
import avenue from "@/public/images/games/tamga-avenue.jpg";

const ART: Record<(typeof divisions)[number]["id"], React.ReactNode> = {
  skills: (
    <LazyMount>
      <div className="card-art absolute inset-0">
        <TkrsPlate />
      </div>
    </LazyMount>
  ),
  applications: (
    <LazyMount>
      <div className="card-art absolute inset-0">
        <IzdarPlate />
      </div>
    </LazyMount>
  ),
  games: (
    <FadeImage
      src={avenue}
      alt=""
      sizes="(min-width: 1024px) 33vw, 100vw"
      className="card-art h-full w-full object-cover object-[60%_55%]"
    />
  ),
};

/** Home, second screen: who the team is, then one card per division. */
export default function About() {
  return (
    <section
      id="about"
      data-theme="paper"
      data-nav="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-[1600px] px-[var(--gutter)] pb-20 pt-20 sm:pb-28 sm:pt-28"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <SectionTitle id="about-title" roman="We started" italic="in college." />
          <div data-reveal className="mt-10 h-px max-w-[610px] origin-left bg-line" />
        </div>
        <p
          data-reveal
          style={{ ["--i" as string]: 1 }}
          className="max-w-[40ch] text-[1.1rem] leading-[1.7] text-ink/90 lg:col-span-5 lg:col-start-8 lg:self-center"
        >
          A few students who wanted to make their own tools, software and games. We still build,
          test and fix every project ourselves.
        </p>
      </div>

      <ul id="projects" className="mt-14 grid scroll-mt-[calc(var(--header-h)+24px)] gap-5 sm:mt-20 md:grid-cols-3">
        {divisions.map((d, i) => (
          <li key={d.id} data-reveal style={{ ["--i" as string]: i }}>
            <article className="group press relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-raised transition-colors duration-300 hover:border-ink/40 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-copper">
              <div className="plate relative aspect-[16/11] overflow-hidden">{ART[d.id]}</div>
              <div className="flex flex-1 items-end justify-between gap-6 p-6 sm:p-7">
                <div className="min-w-0">
                  <h3 className="font-display text-[2rem] leading-none tracking-[-0.015em]">
                    <Link href={d.href} className="stretched focus-visible:outline-none">
                      {d.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-[0.98rem] leading-[1.55] text-mute">{d.line}</p>
                </div>
                <svg viewBox="0 0 24 12" className="nudge-x mb-1.5 h-3 w-6 shrink-0" aria-hidden="true">
                  <path d="M0 6h22M17 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
