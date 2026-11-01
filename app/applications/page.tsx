import type { Metadata } from "next";
import Applications from "@/components/Applications";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  alternates: { canonical: "/applications" },
  title: "Applications",
  description: "IZDAR Industrial, VeloBoost and MyPC: software from T&T Labs for Windows and industrial sites.",
};

export default function ApplicationsPage() {
  return (
    <PageTransition>
      <Applications />
    </PageTransition>
  );
}
