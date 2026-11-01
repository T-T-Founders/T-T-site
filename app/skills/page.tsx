import type { Metadata } from "next";
import Skills from "@/components/Skills";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  alternates: { canonical: "/skills" },
  title: "Skills",
  description: "Four open agent skills from T&T Labs for Roblox Studio, Blender and Claude Code, each in a public GitHub repository.",
};

export default function SkillsPage() {
  return (
    <PageTransition>
      <Skills />
    </PageTransition>
  );
}
