import Link from "next/link";
import { applications } from "@/lib/projects";
import { IzdarPlate, MypcPlate, VeloPlate } from "./Illustrations";
import SectionTitle from "./SectionTitle";
import LazyMount from "./LazyMount";

const focusRing =
  "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-copper";

function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`card-arrow ${className}`} aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export default function Applications() {
  const [izdar, velo, mypc] = applications;
  return (
    <section
      data-theme="paper"
      aria-labelledby="applications-title"
      className="mx-auto max-w-[1600px] px-[var(--gutter)] pb-24 pt-14 sm:pb-32 sm:pt-20 lg:pt-16"
    >
      <SectionTitle as="h1" id="applications-title" roman="Software for" italic="Windows and industry." />

      <div className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-[1.45fr_1fr]">
        {/* IZDAR: the lead plate. It has its own website. */}
        <div data-reveal>
          <article
            className={`group press plate relative isolate flex h-full min-h-[500px] flex-col overflow-hidden rounded-md p-8 text-paper sm:min-h-[480px] sm:p-10 ${focusRing}`}
          >
            <div className="grain-on absolute inset-0 -z-10 opacity-90 max-sm:top-[38%] max-sm:opacity-70">
              <LazyMount>
                <div className="card-art absolute inset-0">
                  <IzdarPlate />
                </div>
              </LazyMount>
            </div>
            <h2 className="font-display text-[clamp(2.4rem,1.6rem+2.4vw,3.6rem)] leading-none tracking-[-0.015em]">
              <a href={izdar.href} className="stretched focus-visible:outline-none">
                {izdar.name}
              </a>
            </h2>
            <p className="mt-5 max-w-[36ch] text-[1.05rem] leading-[1.6] text-paper/85">{izdar.description}</p>
            <p className="mt-auto pt-10">
              <span className="inline-flex h-12 items-center gap-3 rounded-pill border border-paper/50 bg-night/70 px-5 text-[0.95rem] transition-colors duration-200 group-hover:bg-paper group-hover:text-night">
                {izdar.linkLabel}
                <Arrow />
              </span>
            </p>
          </article>
        </div>

        <div className="grid gap-5">
          {[
            { app: velo, Plate: VeloPlate, box: "h-[120px] w-[120px] sm:h-[190px] sm:w-[190px]" },
            { app: mypc, Plate: MypcPlate, box: "h-[104px] w-[122px] sm:h-[160px] sm:w-[190px]" },
          ].map(({ app, Plate, box }, i) => (
            <div key={app.slug} data-reveal style={{ ["--i" as string]: i + 1 }}>
              <article
                className={`group press relative flex h-full items-center justify-between gap-5 overflow-hidden rounded-md border border-line bg-raised p-7 transition-colors duration-300 hover:border-ink/40 sm:p-9 ${focusRing}`}
              >
                <div className="flex min-w-0 flex-col self-stretch">
                  <h2 className="font-display text-[clamp(2rem,1.6rem+1.2vw,2.6rem)] leading-none tracking-[-0.015em]">
                    <Link href={app.href} className="stretched focus-visible:outline-none">
                      {app.name}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-[30ch] text-[0.95rem] leading-[1.55] text-mute">{app.description}</p>
                  <p className="mt-auto pt-6">
                    <svg viewBox="0 0 24 12" className="nudge-x h-3 w-6" aria-hidden="true">
                      <path d="M0 6h22M17 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </p>
                </div>
                <div className={`relative shrink-0 ${box}`}>
                  <Plate />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
