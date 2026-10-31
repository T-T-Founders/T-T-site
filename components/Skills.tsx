import { skills, githubUrl, type Skill } from "@/lib/projects";
import { CdesignPlate, LuauPlate, Tk3dPlate, TkrsPlate } from "./Illustrations";

const PLATES: Record<Skill["slug"], () => React.JSX.Element> = {
  tkrs: TkrsPlate,
  cdesign: CdesignPlate,
  luau: LuauPlate,
  tk3d: Tk3dPlate,
};

export default function Skills() {
  return (
    <section
      id="skills"
      data-theme="paper"
      data-nav="skills"
      aria-labelledby="skills-title"
      className="mx-auto max-w-[1600px] px-[var(--gutter)] pb-16 pt-16 sm:pb-24 sm:pt-24"
    >
      <div className="grid items-end gap-8 lg:grid-cols-12">
        <h2 id="skills-title" className="section-title lg:col-span-7">
          Skills for
          <br />
          <em>AI agents.</em>
        </h2>
        <p className="max-w-[38ch] text-[1.1rem] leading-[1.6] text-ink/90 lg:col-span-4 lg:col-start-9 lg:pb-3">
          Public repositories. Each one installs into a coding agent such as Claude Code.
        </p>
      </div>

      <ul className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 xl:grid-cols-4">
        {skills.map((s) => {
          const Plate = PLATES[s.slug];
          return (
            <li key={s.slug}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-raised transition-colors duration-300 hover:border-ink/40 focus-within:border-ink/40 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-copper">
                <div className="plate relative aspect-[320/260] overflow-hidden">
                  <Plate />
                  <span className="absolute left-4 top-4 rounded-pill bg-paper/90 px-3 py-1 text-[0.75rem] font-medium tracking-[0.04em] text-ink">
                    {s.platform}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[2rem] leading-none tracking-[-0.015em]">
                    <a href={githubUrl(s.repo)} className="stretched focus-visible:outline-none">
                      {s.name}
                    </a>
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-[1.55] text-mute">{s.description}</p>
                  <p className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-6 text-[0.8rem]">
                    <span className="min-w-0 font-mono text-mute [overflow-wrap:anywhere]">{s.repo}</span>
                    <span className="flex shrink-0 items-center gap-1.5 font-medium text-ink">
                      GitHub
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                        <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </span>
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
