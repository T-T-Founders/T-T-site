// Guard for `npm run deploy`: production builds need the real public origin,
// otherwise canonical links, the sitemap and social previews point at localhost.
const url = process.env.NEXT_PUBLIC_SITE_URL;
let ok = false;
try {
  const u = new URL(url ?? "");
  ok = u.protocol === "https:" && !["localhost", "127.0.0.1"].includes(u.hostname);
} catch {}
if (!ok) {
  console.error(
    "NEXT_PUBLIC_SITE_URL must be the public https origin of the site, e.g.\n" +
      "  NEXT_PUBLIC_SITE_URL=https://t-t-site.<subdomain>.workers.dev npm run deploy",
  );
  process.exit(1);
}
console.log(`Building for ${url}`);
