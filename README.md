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

```bash
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` (for example `https://example.com`) in production so
Open Graph images resolve to absolute URLs.

## Images

Game screenshots in `public/images/games/` are cropped from development-build
captures in the game repository (`docs/stepA/`), with HUD and dialogue removed.
