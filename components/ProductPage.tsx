import Link from "next/link";

export type Fact = { label: string; value: React.ReactNode };
export type ListBlock = {
  title: string;
  ordered?: boolean;
  items: { term?: string; text: React.ReactNode }[];
};

type Props = {
  theme: "paper" | "night";
  back: { href: string; label: string };
  kind: string;
  name: string;
  nativeName?: string;
  lead: React.ReactNode;
  facts: Fact[];
  blocks: ListBlock[];
  visual?: React.ReactNode;
  after?: React.ReactNode;
};

/**
 * Internal product page for projects without their own website.
 * Name, a short description, verified facts, and where the source lives.
 */
export default function ProductPage({ theme, back, kind, name, nativeName, lead, facts, blocks, visual, after }: Props) {
  const night = theme === "night";
  const mute = night ? "text-night-mute" : "text-mute";
  const line = night ? "border-night-line" : "border-line";
  return (
    <article
      data-theme={theme}
      className={night ? "bg-night text-paper" : "bg-paper text-ink"}
    >
      <div className="mx-auto max-w-[1600px] px-[var(--gutter)] pb-24 pt-14 sm:pb-32 sm:pt-20">
        <Link href={back.href} className={`link-line text-[0.95rem] ${mute} hover:text-current`}>
          ← {back.label}
        </Link>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <header className="lg:col-span-7">
            <p className={`text-[0.8rem] font-medium tracking-[0.08em] uppercase ${mute}`}>{kind}</p>
            <h1 className="display mt-4 text-[clamp(3.2rem,1.8rem+5vw,6.5rem)]">{name}</h1>
            {nativeName ? (
              <p lang="ru" className={`mt-3 font-display text-[1.5rem] italic ${mute}`}>
                {nativeName}
              </p>
            ) : null}
            <div className={`mt-8 max-w-[52ch] text-[1.15rem] leading-[1.65] ${night ? "text-paper/90" : "text-ink/90"}`}>
              {lead}
            </div>
          </header>

          <dl className={`self-start border-t ${line} lg:col-span-4 lg:col-start-9`}>
            {facts.map((f) => (
              <div key={f.label} className={`grid grid-cols-[8.5rem_1fr] gap-4 border-b ${line} py-4 text-[0.95rem]`}>
                <dt className={mute}>{f.label}</dt>
                <dd className="min-w-0 break-words">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {visual ? <div className="mt-16 sm:mt-20">{visual}</div> : null}

        <div className="mt-16 grid gap-12 sm:mt-20 md:grid-cols-2 lg:gap-16">
          {blocks.map((b) => {
            const List = b.ordered ? "ol" : "ul";
            return (
              <section key={b.title} aria-labelledby={`b-${b.title}`}>
                <h2 id={`b-${b.title}`} className="font-display text-[2.1rem] leading-none tracking-[-0.015em]">
                  {b.title}
                </h2>
                <List className={`mt-6 border-t ${line}`}>
                  {b.items.map((it, i) => (
                    <li key={i} className={`grid gap-1 border-b ${line} py-4 sm:grid-cols-[11rem_1fr] sm:gap-6`}>
                      {it.term ? (
                        <span className="font-medium">
                          {b.ordered ? <span className={`mr-2 ${mute}`}>{i + 1}.</span> : null}
                          {it.term}
                        </span>
                      ) : null}
                      <span className={`${it.term ? "" : "sm:col-span-2"} ${night ? "text-paper/85" : "text-ink/85"}`}>
                        {it.text}
                      </span>
                    </li>
                  ))}
                </List>
              </section>
            );
          })}
        </div>

        {after}
      </div>
    </article>
  );
}
