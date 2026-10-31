import Link from "next/link";
import { directory } from "@/lib/projects";

export default function About() {
  return (
    <section
      id="about"
      data-theme="paper"
      data-nav="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-[1600px] px-[var(--gutter)] pb-16 pt-24 sm:pb-24 sm:pt-32"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h2 id="about-title" className="section-title">
            We started
            <br />
            <em>in college.</em>
          </h2>
          <div className="mt-10 h-px max-w-[610px] bg-line" />
        </div>
        <div className="max-w-[46ch] text-[1.1rem] leading-[1.7] text-ink/90 lg:col-span-5 lg:col-start-8 lg:pt-4">
          <p>
            T&amp;T Labs began with a few college students who wanted to make their own
            software, tools and games. Those experiments became the eight projects
            below. We still build, test and fix each of them ourselves.
          </p>
        </div>
      </div>

      {/* The project index. It replaces the decorative banner from the reference. */}
      <nav
        aria-label="Project index"
        className="plate relative mt-16 overflow-hidden rounded-md text-paper sm:mt-20"
      >
        <svg
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="band-light" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" style={{ stopColor: "var(--copper)", stopOpacity: 0 }} />
              <stop offset="0.6" style={{ stopColor: "var(--copper)", stopOpacity: 0.45 }} />
              <stop offset="1" style={{ stopColor: "var(--paper)", stopOpacity: 0.55 }} />
            </linearGradient>
          </defs>
          <path d="M520 300 C 760 260, 900 120, 1200 40" fill="none" stroke="url(#band-light)" strokeWidth="1.2" />
          <path d="M600 300 C 820 250, 980 150, 1200 100" fill="none" stroke="url(#band-light)" strokeWidth="0.8" opacity="0.6" />
        </svg>
        <div className="relative grid gap-10 p-8 sm:grid-cols-3 sm:gap-6 sm:p-12 lg:p-14">
          {directory.map((col) => (
            <div key={col.id}>
              <h3>
                <Link
                  href={`#${col.id}`}
                  className="link-line font-display text-[1.9rem] leading-none"
                >
                  {col.title}
                </Link>
              </h3>
              <p className="mt-2 text-[0.9rem] text-night-mute">
                {col.items.length} {col.items.length === 1 ? "project" : "projects"}
              </p>
              <ul className="mt-6 space-y-2.5 text-[1.02rem]">
                {col.items.map((item) => (
                  <li key={item.name}>
                    {item.external ? (
                      <a href={item.href} className="link-line text-paper/90 hover:text-paper">
                        {item.name}
                      </a>
                    ) : (
                      <Link href={item.href} className="link-line text-paper/90 hover:text-paper">
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </section>
  );
}
