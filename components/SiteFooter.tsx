import Link from "next/link";
import { Mark, Wordmark } from "./Logo";
import { orgGithub } from "@/lib/projects";

const LINKS = [
  { href: "/#skills", label: "Skills" },
  { href: "/#applications", label: "Applications" },
  { href: "/#games", label: "Games" },
  { href: "/#about", label: "About" },
];

export default function SiteFooter() {
  return (
    <footer data-theme="night" className="border-t border-night-line bg-night text-paper">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-[var(--gutter)] py-14 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-3 self-start rounded-sm" aria-label="T&T Labs, home">
          <Mark id="ftr" className="h-[30px] w-auto" />
          <Wordmark className="whitespace-nowrap text-[1.6rem]" />
        </Link>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[0.95rem] text-paper/80">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-line hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={orgGithub} className="link-line hover:text-paper">
                GitHub
              </a>
            </li>
          </ul>
        </nav>
        <p className="text-[0.9rem] text-night-mute">© {new Date().getFullYear()} T&amp;T Labs</p>
      </div>
    </footer>
  );
}
