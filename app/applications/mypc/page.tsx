import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";
import { githubUrl } from "@/lib/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/applications/mypc" },
  title: "MyPC",
  description:
    "MyPC is a Telegram bot that tells you when your Windows PC turns on and can lock it remotely.",
};

const REPO = "adaybekovt-boop/MyPC";

export default function MyPcPage() {
  return (
    <ProductPage
      theme="paper"
      back={{ href: "/#applications", label: "Applications" }}
      kind="Windows + Telegram"
      name="MyPC"
      lead={
        <>
          <p>
            MyPC connects a Windows PC to a Telegram bot. When the computer turns on, the bot asks
            whether it was you. Answer no, and the PC locks.
          </p>
        </>
      }
      facts={[
        { label: "Server", value: "Cloudflare Workers with a D1 database" },
        { label: "Bot language", value: "Russian" },
        { label: "Version", value: "1.0.0" },
        { label: "Windows app", value: "Separate; not in this repository" },
        {
          label: "Source",
          value: (
            <a href={githubUrl(REPO)} className="font-mono text-[0.85rem] underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              {REPO}
            </a>
          ),
        },
      ]}
      blocks={[
        {
          title: "How it works",
          ordered: true,
          items: [
            { term: "Pair", text: "Send /add to the bot, then send it the one-time 6-digit code shown by MyPC on the computer. The code expires after 10 minutes, and the pairing must be confirmed on the PC." },
            { term: "Startup alert", text: "When the paired computer is switched on, the bot asks whether it was you." },
            { term: "Lock", text: "Answering no sends a lock command to the PC." },
            { term: "Recovery", text: "A 6-digit code to unlock the lock screen arrives in the same chat. It is valid for 5 minutes." },
          ],
        },
        {
          title: "Bot commands",
          items: [
            { term: "/add", text: "Pair a new computer with a one-time code." },
            { term: "/devices", text: "List paired computers." },
            { term: "/url", text: "Show the server address for the Windows app." },
            { term: "/help", text: "List the commands." },
          ],
        },
      ]}
    />
  );
}
