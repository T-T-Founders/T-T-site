import Link from "next/link";
import { Mark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section
      data-theme="paper"
      className="mx-auto flex max-w-[1600px] flex-col items-start px-[var(--gutter)] pb-32 pt-24 sm:pt-32"
    >
      <Mark id="nf" className="h-16 w-auto" />
      <h1 className="section-title mt-10">
        Page not
        <br />
        <em>found.</em>
      </h1>
      <ul className="mt-10 flex flex-wrap gap-3">
        {[
          { href: "/", label: "Home" },
          { href: "/skills", label: "Skills" },
          { href: "/applications", label: "Applications" },
          { href: "/games", label: "Games" },
        ].map((l, i) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`inline-flex h-12 items-center rounded-pill px-6 text-[0.95rem] transition-colors duration-200 ${
                i === 0
                  ? "bg-ink text-paper hover:bg-[color-mix(in_oklch,var(--ink),var(--copper)_28%)]"
                  : "border border-ink/50 hover:bg-ink hover:text-paper"
              }`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
