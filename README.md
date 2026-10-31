# T&T Labs website

The official site of T&T Labs: one page with the company, its three divisions
(Skills, Applications, Games) and links to all eight projects, plus internal
product pages for projects without their own website.

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
| `/` | Hero, About, Skills, Applications, Games |
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
Worker static assets. `wrangler.jsonc` defines the Worker `tt-labs-site`; there is
no server code. Unknown paths get `out/404.html` with a 404 status.

Preview on the Workers runtime locally:

```bash
npm run preview
```

Deploy (needs `CLOUDFLARE_API_TOKEN` with the *Edit Cloudflare Workers* template,
and `CLOUDFLARE_ACCOUNT_ID`):

```bash
NEXT_PUBLIC_SITE_URL=https://tt-labs-site.<your-subdomain>.workers.dev npm run deploy
```

`NEXT_PUBLIC_SITE_URL` makes Open Graph image URLs absolute. Use the custom
domain instead once one is attached.

## Images

Game screenshots in `public/images/games/` are cropped from development-build
captures in the game repository (`docs/stepA/`), with HUD and dialogue removed.
