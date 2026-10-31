import type { Metadata, Viewport } from "next";
import { EB_Garamond, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  display: "swap",
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "T&T Labs",
    template: "%s · T&T Labs",
  },
  description:
    "T&T Labs is an independent team that builds developer tools for AI agents, Windows and industrial software, and a game.",
  applicationName: "T&T Labs",
  openGraph: {
    type: "website",
    siteName: "T&T Labs",
    title: "T&T Labs",
    description: "Developer tools, software and games built by an independent team.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "T&T Labs",
    description: "Developer tools, software and games built by an independent team.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F3EFE9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${garamond.variable} ${plex.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-svh flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
