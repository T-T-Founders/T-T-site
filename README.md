# T&T Labs website

The official site of T&T Labs: a home page with the team's philosophy, one page
per division (Skills, Applications, Games) linking to all eight projects, and
internal product pages for projects without their own website.

- Product decisions: [`PRODUCT.md`](PRODUCT.md)
- Design system, tokens, motion rules and the anti-slop audit: [`DESIGN.md`](DESIGN.md)
- All project copy and links: [`lib/projects.ts`](lib/projects.ts) (every claim is traceable to the project's repository)

## Stack

Next.js 16 (App Router, fully static), TypeScript, Tailwind CSS 4. Fonts are
self-hosted through `next/font` (EB Garamond, IBM Plex Sans, IBM Plex Mono).
No animation library: the hero animation is ~100 lines in
`components/EclipseHorizon.tsx` and pauses off-screen and under
`prefers-reduced-motion`.

## Routes

| Route | Content |
|---|---|
| `/` | Hero, philosophy |
| `/skills` | Four agent skills, each linking to its GitHub repository |
| `/applications` | IZDAR Industrial, VeloBoost, MyPC |
| `/games` | Chernaya Tamga |
| `/applications/veloboost` | VeloBoost product page |
| `/applications/mypc` | MyPC product page |
| `/games/chernaya-tamga` | Chernaya Tamga game page |
| anything else | 404 |

IZDAR Industrial links to its own site, https://izdar.org. Skills link to their GitHub repositories.

## Develop

```bash
npm install
npm run dev
```

## Deploy (Cloudflare Workers)

The site is a static export (`output: "export"`, built into `out/`) served as
Worker static assets by the Worker `t-t-site` (`wrangler.jsonc`). There is no
server code. Unknown paths get `out/404.html` with a 404 status.
`public/_headers` sets the security headers (CSP, HSTS, frame denial, etc.) and
caching (`/_next/static/*` immutable for a year, HTML always revalidated).

`NEXT_PUBLIC_SITE_URL` is the public origin. It feeds canonical links, the
sitemap, `robots.txt` and social preview URLs; `npm run deploy` refuses to run
without an https value.

Preview on the Workers runtime locally:

```bash
npm run preview
```

### Automatic deploys

Cloudflare Workers Builds is connected to this repository and builds every push
to `main` (production branch). In the Worker `t-t-site`, Settings > Build >
Variables, set `NEXT_PUBLIC_SITE_URL` (e.g. `https://t-t-site.<subdomain>.workers.dev`
or the custom domain); without it canonical links and the sitemap point at
`http://localhost:3000`.

### Manual deploy

```bash
npx wrangler login
```

```bash
NEXT_PUBLIC_SITE_URL=https://t-t-site.<subdomain>.workers.dev npm run deploy
```

### Custom domain

When the domain's zone is on the same Cloudflare account: add the `routes` entry
shown in `wrangler.jsonc`, change `NEXT_PUBLIC_SITE_URL` to the domain, and redeploy.

### Brand images

`app/opengraph-image.png` and `app/apple-icon.png` are rendered from
`scripts/brand-images.mjs` with the site's typeface. Re-run after changing the
mark or tagline (needs Playwright with Chromium):

```bash
npm run brand-images
```

## Images

Game screenshots in `public/images/games/` are cropped from development-build
captures in the game repository (`docs/stepA/`), with HUD and dialogue removed.
