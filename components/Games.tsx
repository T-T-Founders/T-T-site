import Image from "next/image";
import Link from "next/link";
import { game } from "@/lib/projects";
import avenue from "@/public/images/games/tamga-avenue.jpg";

export default function Games() {
  return (
    <section
      id="games"
      data-theme="night"
      data-nav="games"
      aria-labelledby="games-title"
      className="bg-night text-paper"
    >
      <div className="mx-auto max-w-[1600px] px-[var(--gutter)] pb-20 pt-24 sm:pb-24 sm:pt-32">
        <h2 id="games-title" className="section-title">
          One game,
          <br />
          <em>in development.</em>
        </h2>

        <article className="group relative isolate mt-12 overflow-hidden rounded-md sm:mt-16 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-copper">
          <Image
            src={avenue}
            alt="Chernaya Tamga: the player walks down a dark Aktobe avenue under a violet, sunless sky."
            sizes="(min-width: 1600px) 1450px, 100vw"
            placeholder="blur"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-[60%_55%] transition-[filter] duration-500 group-hover:brightness-110"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_oklch,var(--night)_92%,transparent)_0%,color-mix(in_oklch,var(--night)_70%,transparent)_38%,transparent_70%)] max-md:bg-[linear-gradient(0deg,color-mix(in_oklch,var(--night)_94%,transparent)_10%,color-mix(in_oklch,var(--night)_40%,transparent)_70%)]" />
          <div className="flex min-h-[440px] flex-col justify-end p-8 sm:min-h-[460px] sm:p-12 lg:min-h-[480px]">
            <p className="text-[0.8rem] font-medium tracking-[0.08em] text-paper/75 uppercase">{game.kind}</p>
            <h3 className="mt-3 font-display text-[clamp(2.6rem,1.6rem+3vw,4.2rem)] leading-none tracking-[-0.01em]">
              <Link href={game.href} className="stretched focus-visible:outline-none">
                {game.name}
              </Link>
            </h3>
            <p lang="ru" className="mt-2 font-display text-[1.3rem] italic text-paper/70">
              {game.nativeName}
            </p>
            <p className="mt-5 max-w-[34ch] text-[1.05rem] leading-[1.6] text-paper/90">{game.description}</p>
            <p className="mt-8">
              <span className="inline-flex h-12 items-center gap-3 rounded-pill border border-paper/50 px-5 text-[0.95rem] transition-colors duration-200 group-hover:bg-paper group-hover:text-night">
                About the game
                <svg viewBox="0 0 24 12" className="h-3 w-5" aria-hidden="true">
                  <path d="M0 6h22M17 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </span>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
