import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";

export const metadata: Metadata = {
  alternates: { canonical: "/applications/veloboost" },
  title: "VeloBoost",
  description:
    "VeloBoost is a Windows utility that applies reversible system tweaks while a chosen game runs, then rolls them back.",
};

export default function VeloBoostPage() {
  return (
    <ProductPage
      theme="paper"
      back={{ href: "/applications", label: "Applications" }}
      name="VeloBoost"
      lead={
        <>
          <p>
            VeloBoost gives a selected game priority while it is running. It applies a set of
            Windows-level tweaks when the game starts and rolls every one of them back when the
            session ends.
          </p>
        </>
      }
      facts={[
        { label: "Platform", value: "Windows, .NET 8 (WPF)" },
        { label: "Permissions", value: "Runs as administrator" },
        { label: "Version", value: "1.0.8" },
        { label: "Availability", value: "No public download yet" },
      ]}
      blocks={[
        {
          title: "What it changes",
          items: [
            { term: "Power plan", text: "Switches to the Ultimate Performance power scheme." },
            { term: "Process priority", text: "Sets the game to High and background apps to Below Normal." },
            { term: "Timer resolution", text: "Requests 0.5 ms and opts out of Windows 11 power throttling." },
            { term: "Hybrid CPUs", text: "Steers game threads onto performance cores on hybrid Intel CPUs." },
            { term: "Network", text: "Lowers Windows network throttling for the session." },
            { term: "Game configs", text: "Game-specific settings for CS2, Dota 2 and Fortnite." },
          ],
        },
        {
          title: "What it never does",
          items: [
            { text: "Read or write game memory." },
            { text: "Inject code, hook or detour functions." },
            { text: "Patch game files or code." },
            { text: "Use the realtime priority class." },
          ],
        },
      ]}
    />
  );
}
