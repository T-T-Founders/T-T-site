/**
 * Public origin of the site, e.g. https://tt-labs.example. Set at build time
 * through NEXT_PUBLIC_SITE_URL; `npm run deploy` refuses to run without it
 * (scripts/check-site-url.mjs), so production builds never ship localhost URLs.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export const routes = [
  "/",
  "/skills",
  "/applications",
  "/games",
  "/applications/veloboost",
  "/applications/mypc",
  "/games/chernaya-tamga",
] as const;
