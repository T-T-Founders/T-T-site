import Link from "next/link";
import { game } from "@/lib/projects";
import SectionTitle from "./SectionTitle";
import FadeImage from "./FadeImage";
import avenue from "@/public/images/games/tamga-avenue.jpg";

export default function Games() {
  return (
    <section data-theme="night" aria-labelledby="games-title" className="bg-night text-paper">
      <div className="mx-auto max-w-[1600px] px-[var(--gutter)] pb-24 pt-14 sm:pb-32 sm:pt-20">
        <SectionTitle as="h1" id="games-title" roman="One game," italic="in development." />

        <div data-reveal className="mt-12 sm:mt-16">
          <article className="group press relative isolate overflow-hidden rounded-md has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-copper">
            <div className="absolute inset-0 -z-20">
              <FadeImage
                src={avenue}
                alt="Chernaya Tamga: the player walks down a dark Aktobe avenue under a violet, sunless sky."
                sizes="(min-width: 1600px) 1450px, 100vw"
                preload
                className="card-art h-full w-full object-cover object-[60%_55%]"
              />
            </div>
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_oklch,var(--night)_92%,transparent)_0%,color-mix(in_oklch,var(--night)_70%,transparent)_38%,transparent_70%)] max-md:bg-[linear-gradient(0deg,color-mix(in_oklch,var(--night)_94%,transparent)_10%,color-mix(in_oklch,var(--night)_40%,transparent)_70%)]" />
            <div className="flex min-h-[460px] flex-col justify-end p-8 sm:min-h-[480px] sm:p-12 lg:min-h-[500px]">
              <h2 className="font-display text-[clamp(2.6rem,1.6rem+3vw,4.2rem)] leading-none tracking-[-0.01em]">
                <Link href={game.href} className="stretched focus-visible:outline-none">
                  {game.name}
                </Link>
              </h2>
              <p className="mt-5 max-w-[34ch] text-[1.05rem] leading-[1.6] text-paper/90">{game.description}</p>
              <p className="mt-9">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-pill border border-paper/50 transition-colors duration-200 group-hover:bg-paper group-hover:text-night">
                  <svg viewBox="0 0 16 16" className="card-arrow h-4 w-4" aria-hidden="true">
                    <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </span>
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
