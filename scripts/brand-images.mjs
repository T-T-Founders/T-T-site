// Renders the social preview (app/opengraph-image.png, 1200x630) and the Apple
// touch icon (app/apple-icon.png, 180x180) with the site's real typeface.
// Run after changing the mark or the tagline:  npm run brand-images
// Needs Playwright with Chromium available (npx playwright install chromium).
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const font = (f) =>
  "data:font/woff2;base64," +
  readFileSync(path.join(root, "node_modules/@fontsource/eb-garamond/files", f)).toString("base64");

const MARK = `<svg viewBox="0 0 66 40" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="l" cx="0.74" cy="0.3" r="0.9"><stop offset="0" stop-color="#EFE1D5"/><stop offset="0.45" stop-color="#BBAAA2"/><stop offset="1" stop-color="#4E4648"/></radialGradient><radialGradient id="r" cx="0.7" cy="0.6" r="0.85"><stop offset="0" stop-color="#F7924A"/><stop offset="0.5" stop-color="#E2692B"/><stop offset="1" stop-color="#8E3A1B"/></radialGradient><radialGradient id="o" cx="0.35" cy="0.5" r="0.7"><stop offset="0" stop-color="#2D2425"/><stop offset="1" stop-color="#1A1516"/></radialGradient><clipPath id="c"><circle cx="22" cy="20" r="16"/></clipPath></defs><circle cx="22" cy="20" r="16" fill="url(#l)"/><circle cx="42" cy="20" r="16" fill="url(#r)"/><circle cx="42" cy="20" r="16" fill="url(#o)" clip-path="url(#c)"/></svg>`;

const base = `
  @font-face { font-family: G; src: url(${font("eb-garamond-latin-400-normal.woff2")}) format("woff2"); }
  @font-face { font-family: G; font-style: italic; src: url(${font("eb-garamond-latin-400-italic.woff2")}) format("woff2"); }
  * { margin: 0; box-sizing: border-box; }
  body { overflow: hidden; }
`;

// Same geometry as the hero: planet fitted to the reference horizon, mark above it.
const og = `<!doctype html><html><head><style>${base}
  .s { position: relative; width: 1200px; height: 630px; overflow: hidden;
       background: radial-gradient(60% 55% at 86% 70%, rgba(226,105,43,.32), transparent 70%),
                   linear-gradient(180deg, #F3E9E1 0%, #F2DFD2 55%, #F0CDB6 100%); }
  .p { position: absolute; width: 3840px; height: 3840px; left: -612px; top: calc(630px - 330px);
       border-radius: 50%;
       background: radial-gradient(circle closest-side, #0F0C0E 0%, #120E10 93%, #4A2416 97.6%, #C9581F 99.4%, #F4A57A 100%);
       box-shadow: 0 0 8px 1px #F4A57A, 0 0 32px 6px rgba(226,105,43,.7), 0 0 96px 24px rgba(226,105,43,.3); }
  .m { position: absolute; left: 760px; top: 84px; width: 380px; }
  .t { position: absolute; left: 80px; top: 196px; color: #231F1C; }
  h1 { font: 400 132px/0.95 G, serif; letter-spacing: -0.03em; }
  p { margin-top: 26px; font: 400 36px/1.25 G, serif; max-width: 560px; color: #3A332E; }
  i { font-style: italic; }
</style></head><body><div class="s"><div class="p"></div><div class="m">${MARK}</div>
  <div class="t"><h1>T&amp;T Labs</h1><p>Developer tools, software and games built by an <i>independent</i> team.</p></div>
</div></body></html>`;

const icon = `<!doctype html><html><head><style>${base}
  .s { width: 180px; height: 180px; background: #F3EFE9; display: flex; align-items: center; justify-content: center; }
  .s svg { width: 148px; }
</style></head><body><div class="s">${MARK}</div></body></html>`;

const browser = await chromium.launch();
for (const [html, w, h, out] of [
  [og, 1200, 630, "app/opengraph-image.png"],
  [icon, 180, 180, "app/apple-icon.png"],
]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, out) });
  console.log("wrote", out);
}
await browser.close();
