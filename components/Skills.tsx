import { skills, githubUrl, type Skill } from "@/lib/projects";
import { CdesignPlate, LuauPlate, Tk3dPlate, TkrsPlate } from "./Illustrations";
import SectionTitle from "./SectionTitle";
import LazyMount from "./LazyMount";

const PLATES: Record<Skill["slug"], () => React.JSX.Element> = {
  tkrs: TkrsPlate,
  cdesign: CdesignPlate,
  luau: LuauPlate,
  tk3d: Tk3dPlate,
};

export default function Skills() {
  return (
    <section
      data-theme="paper"
      aria-labelledby="skills-title"
      className="mx-auto max-w-[1600px] px-[var(--gutter)] pb-24 pt-14 sm:pb-32 sm:pt-20 lg:pt-16"
    >
      <SectionTitle as="h1" id="skills-title" roman="Skills for" italic="AI agents." />

      <ul className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 xl:grid-cols-4">
        {skills.map((s, i) => {
          const Plate = PLATES[s.slug];
          return (
            <li key={s.slug} data-reveal style={{ ["--i" as string]: i }}>
              <article data-tilt="7" className="group press relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-raised transition-colors duration-300 hover:border-ink/40 focus-within:border-ink/40 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-copper">
                <div className="plate grain-on relative aspect-[320/240] overflow-hidden">
                  <LazyMount>
                    <Plate />
                  </LazyMount>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-[2rem] leading-none tracking-[-0.015em]">
                    <a href={githubUrl(s.repo)} className="stretched focus-visible:outline-none">
                      {s.name}
                    </a>
                  </h2>
                  <p className="mt-3 text-[0.95rem] leading-[1.55] text-mute">{s.description}</p>
                  <p className="mt-auto flex items-center justify-between pt-7 text-[0.9rem] font-medium">
                    GitHub
                    <svg viewBox="0 0 16 16" className="card-arrow h-4 w-4" aria-hidden="true">
                      <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
