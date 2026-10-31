/**
 * Copy and data for the home page story (components/Hero.tsx).
 * The facts here come from the founders; project names and counts are derived
 * from lib/projects.ts so the story never drifts from the project pages.
 */
import { applications, games, skills } from "./projects";

export const projectNames: string[] = [
  ...skills.map((s) => s.name),
  ...applications.map((a) => a.name),
  ...games.map((g) => g.name),
];

export const projectCount = projectNames.length;

const WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen",
  "Nineteen", "Twenty",
];

/** "Eight" for 8; falls back to digits past twenty. */
export const countWord = (n: number) => WORDS[n] ?? String(n);

export const story = {
  friends: {
    title: "Two friends from college.",
    caption: "Two enthusiasts from a college in Aktobe.",
    place: "Aktobe · EKEB",
  },
  bots: {
    title: "It started with two small bots.",
    caption: "One of us built a custom Gem in Gemini. The other tried making a first Telegram bot.",
  },
  final: {
    title: "T&T Labs",
    line: `${countWord(projectCount)} projects later, we're still building.`,
  },
} as const;

/** Tools that show up around the discs on the third screen. Text only, no logos. */
export const tools = [
  "Gemini",
  "Telegram",
  "Claude Code",
  "Codex",
  "Roblox Studio",
  "Blender",
  "Godot",
  "Cloudflare",
];

export type ChatLine = { from: "user" | "bot"; text: string };

// TODO: replace with real lines from the original bots
export const botMockups: {
  gem: { title: string; lines: ChatLine[] };
  telegram: { title: string; lines: ChatLine[] };
} = {
  gem: {
    title: "My Gem",
    lines: [
      { from: "user", text: "Hi" },
      { from: "bot", text: "Hi! I'm a custom Gem." },
    ],
  },
  telegram: {
    title: "My first bot",
    lines: [
      { from: "user", text: "/start" },
      { from: "bot", text: "Hi! I'm a bot." },
    ],
  },
};
