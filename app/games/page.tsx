import type { Metadata } from "next";
import Games from "@/components/Games";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  alternates: { canonical: "/games" },
  title: "Games",
  description: "Chernaya Tamga, a third-person dark fantasy game in development at T&T Labs.",
};

export default function GamesPage() {
  return (
    <PageTransition>
      <Games />
    </PageTransition>
  );
}
