/**
 * Single source of project content. Every statement here was checked against
 * the project's repository (README, docs or source). Do not add claims that
 * cannot be traced back to one of those files.
 */

export type Skill = {
  slug: "tkrs" | "cdesign" | "luau" | "tk3d";
  name: string;
  platform: string;
  description: string;
  repo: string; // owner/name, public
};

export const skills: Skill[] = [
  {
    slug: "tkrs",
    name: "TKRS",
    platform: "Roblox Studio",
    description:
      "A searchable library of 3,604 openly licensed assets for Roblox Studio agents.",
    repo: "adaybekovt-boop/T-TRS",
  },
  {
    slug: "cdesign",
    name: "cdesign",
    platform: "Claude Code",
    description:
      "A Claude Code skill that builds animated Next.js landing pages from a brief.",
    repo: "adaybekovt-boop/cdesign-skill",
  },
  {
    slug: "luau",
    name: "LuauAISkill",
    platform: "Roblox · Luau",
    description:
      "Handbook, recipes and checks that help AI agents write current Luau code.",
    repo: "adaybekovt-boop/LuauAISkill",
  },
  {
    slug: "tk3d",
    name: "TK3D",
    platform: "Blender",
    description:
      "Procedural Blender generators with geometry checks, built for AI coding agents.",
    repo: "adaybekovt-boop/TK3D",
  },
];

export const githubUrl = (repo: string) => `https://github.com/${repo}`;

export type Application = {
  slug: "izdar" | "veloboost" | "mypc";
  name: string;
  kind: string;
  description: string;
  href: string;
  external: boolean;
  linkLabel: string;
};

export const applications: Application[] = [
  {
    slug: "izdar",
    name: "IZDAR Industrial",
    kind: "Industrial software",
    description:
      "Emission accounting for industrial sites: import a table, check it, get a report draft. Works offline and keeps a traceable edit history.",
    href: "https://izdar.org",
    external: true,
    linkLabel: "izdar.org",
  },
  {
    slug: "veloboost",
    name: "VeloBoost",
    kind: "Windows utility",
    description:
      "Applies reversible Windows tweaks while a chosen game runs, then rolls them back.",
    href: "/applications/veloboost",
    external: false,
    linkLabel: "Product page",
  },
  {
    slug: "mypc",
    name: "MyPC",
    kind: "Windows + Telegram",
    description:
      "A Telegram bot that tells you when your PC turns on and can lock it.",
    href: "/applications/mypc",
    external: false,
    linkLabel: "Product page",
  },
];

export const game = {
  slug: "chernaya-tamga",
  name: "Chernaya Tamga",
  nativeName: "Чёрная Тамга",
  kind: "Dark fantasy · Godot",
  description:
    "A third-person dark fantasy. Aktobe has gone forty days without a sun.",
  href: "/games/chernaya-tamga",
};

export const directory = [
  {
    id: "skills",
    title: "Skills",
    items: skills.map((s) => ({ name: s.name, href: githubUrl(s.repo), external: true })),
  },
  {
    id: "applications",
    title: "Applications",
    items: applications.map((a) => ({ name: a.name, href: a.href, external: a.external })),
  },
  {
    id: "games",
    title: "Games",
    items: [{ name: game.name, href: game.href, external: false }],
  },
];

export const orgGithub = "https://github.com/T-T-Founders";
