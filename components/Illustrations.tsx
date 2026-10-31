/**
 * Project plates. Each drawing shows the object the product works on, and the
 * hover/focus response (driven by `group` on the card) shows what the product
 * does to it. All colors come from tokens via Tailwind classes.
 */

const svgBase = "absolute inset-0 h-full w-full";
const t = "transition-[opacity,transform,translate,rotate,stroke-dashoffset] duration-500 ease";

/* TKRS: an asset grid and a search query; the match moves when you engage. */
export function TkrsPlate() {
  const cols = 5;
  const rows = 3;
  const size = 42;
  const gap = 10;
  const x0 = 34;
  const y0 = 100;
  const glyphs = [
    "M10 32V16a11 11 0 0 1 22 0v16", // arch
    "M21 8v6M15 14h12l-2 14H17zM21 28v6", // lantern
    "M9 12h24v20H9zM9 18h24", // crate
    "M14 34V10h14v24M11 10h20M11 34h20", // column
    "M8 34h8v-7h8v-7h8v-7h4", // stairs
    "M21 34V22M21 22l-9-6 9-9 9 9z", // tree
    "M8 30c6-10 20-10 26 0M21 12v6", // dome
    "M10 34V14l11-6 11 6v20z", // house
    "M8 21h26M21 8v26", // plus / pad
    "M12 12l18 18M30 12 12 30", // vfx spark
    "M21 9a12 12 0 1 0 .1 0", // orb light
    "M9 26h24v6H9zM13 26V16h16v10", // bench
    "M14 34l7-26 7 26z", // spire
    "M10 18h22v8H10z", // beam
    "M21 10v24M13 18l8-8 8 8", // ui arrow
  ];
  return (
    <svg viewBox="0 0 320 260" className={svgBase} aria-hidden="true">
      <rect x="34" y="50" width="252" height="34" rx="6" className="fill-paper/[0.06] stroke-paper/30" />
      <circle cx="52" cy="67" r="6" className="fill-none stroke-paper/60" strokeWidth="1.4" />
      <path d="M56.5 71.5 61 76" className="stroke-paper/60" strokeWidth="1.4" />
      <text x="70" y="72" className="fill-paper font-mono text-[13px]">lantern</text>
      {Array.from({ length: rows * cols }).map((_, i) => {
        const cx = x0 + (i % cols) * (size + gap);
        const cy = y0 + Math.floor(i / cols) * (size + gap);
        return (
          <g key={i} transform={`translate(${cx} ${cy})`}>
            <rect width={size} height={size} rx="5" className="fill-paper/[0.04] stroke-paper/15" />
            <path d={glyphs[i]} transform="scale(1)" className="fill-none stroke-paper/45" strokeWidth="1.2" />
          </g>
        );
      })}
      {/* match: tile 1 at rest, tile 10 (orb light) on hover */}
      <rect
        x={x0 + 1 * (size + gap) - 3}
        y={y0 - 3}
        width={size + 6}
        height={size + 6}
        rx="7"
        className={`fill-copper/15 stroke-copper ${t} group-hover:opacity-0 group-focus-within:opacity-0`}
        strokeWidth="1.5"
      />
      <rect
        x={x0 + 0 * (size + gap) - 3}
        y={y0 + 2 * (size + gap) - 3}
        width={size + 6}
        height={size + 6}
        rx="7"
        className={`fill-copper/15 stroke-copper opacity-0 ${t} group-hover:opacity-100 group-focus-within:opacity-100`}
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* cdesign: a landing page wireframe whose hero light moves (the page is animated). */
export function CdesignPlate() {
  return (
    <svg viewBox="0 0 320 276" className={svgBase} aria-hidden="true">
      <defs>
        <clipPath id="cd-hero">
          <rect x="52" y="58" width="216" height="104" rx="4" />
        </clipPath>
        <linearGradient id="cd-silk" x1="0" x2="1">
          <stop offset="0" style={{ stopColor: "var(--copper)", stopOpacity: 0 }} />
          <stop offset="0.55" style={{ stopColor: "var(--copper)", stopOpacity: 0.95 }} />
          <stop offset="1" style={{ stopColor: "var(--paper)", stopOpacity: 0.9 }} />
        </linearGradient>
      </defs>
      <g transform="translate(0 16)">
      <rect x="40" y="28" width="240" height="214" rx="8" className="fill-paper/[0.04] stroke-paper/25" />
      <circle cx="56" cy="43" r="3" className="fill-paper/40" />
      <rect x="196" y="40" width="20" height="5" rx="2" className="fill-paper/30" />
      <rect x="222" y="40" width="20" height="5" rx="2" className="fill-paper/30" />
      <rect x="248" y="40" width="20" height="5" rx="2" className="fill-paper/30" />
      <g clipPath="url(#cd-hero)">
        <rect x="52" y="58" width="216" height="104" className="fill-night" />
        <g className={`${t} duration-[900ms] group-hover:-translate-x-6 group-focus-within:-translate-x-6`}>
          <path d="M30 170 C 120 160, 190 110, 300 50" fill="none" stroke="url(#cd-silk)" strokeWidth="14" opacity="0.35" />
          <path d="M40 175 C 130 160, 200 120, 310 70" fill="none" stroke="url(#cd-silk)" strokeWidth="5" />
          <path d="M60 180 C 150 165, 220 135, 320 95" fill="none" stroke="url(#cd-silk)" strokeWidth="2" opacity="0.8" />
        </g>
      </g>
      <rect x="52" y="58" width="216" height="104" rx="4" className="fill-none stroke-paper/20" />
      <rect x="52" y="176" width="120" height="9" rx="2" className="fill-paper/55" />
      <rect x="52" y="192" width="168" height="5" rx="2" className="fill-paper/25" />
      <rect x="52" y="202" width="140" height="5" rx="2" className="fill-paper/25" />
      <rect x="52" y="218" width="52" height="12" rx="6" className="fill-copper/80" />
      </g>
    </svg>
  );
}

/* LuauAISkill: real Luau with a legacy call flagged; engaging shows the current API. */
export function LuauPlate() {
  const y = (n: number) => 76 + (n - 1) * 27;
  const code = "fill-paper/80 font-mono text-[10.5px]";
  return (
    <svg viewBox="0 0 320 260" className={svgBase} aria-hidden="true">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <text key={n} x="14" y={y(n)} className="fill-paper/25 font-mono text-[10px]">
          {n}
        </text>
      ))}
      <text x="32" y={y(1)} className={code} xmlSpace="preserve">
        <tspan className="fill-copper">local</tspan> Players = game:GetService(<tspan className="fill-paper/55">&quot;Players&quot;</tspan>)
      </text>
      <text x="32" y={y(3)} className={code} xmlSpace="preserve">
        Players.PlayerAdded:Connect(<tspan className="fill-copper">function</tspan>(player)
      </text>
      {/* line 4: legacy wait() is flagged, then replaced by task.wait() */}
      <g className={`${t} group-hover:opacity-0 group-focus-within:opacity-0`}>
        <text x="32" y={y(4)} className={code} xmlSpace="preserve">
          {"    "}wait(1)
        </text>
        <path
          d={`M57 ${y(4) + 5} q3 3 6 0 t6 0 t6 0 t6 0 t6 0 t6 0 t6 0`}
          className="fill-none stroke-copper"
          strokeWidth="1.2"
        />
      </g>
      <text
        x="32"
        y={y(4)}
        className={`fill-paper font-mono text-[10.5px] opacity-0 ${t} group-hover:opacity-100 group-focus-within:opacity-100`}
        xmlSpace="preserve"
      >
        {"    "}task.wait(1)
      </text>
      <text x="32" y={y(5)} className={code} xmlSpace="preserve">
        {"    "}print(player.Name)
      </text>
      <text x="32" y={y(6)} className={code} xmlSpace="preserve">
        <tspan className="fill-copper">end</tspan>)
      </text>
    </svg>
  );
}

/* TK3D: a generated low-poly mesh on a ground grid; engaging turns it. */
export function Tk3dPlate() {
  // icosahedron, projected once at build time
  const p = (1 + Math.sqrt(5)) / 2;
  const v: [number, number, number][] = [
    [-1, p, 0], [1, p, 0], [-1, -p, 0], [1, -p, 0],
    [0, -1, p], [0, 1, p], [0, -1, -p], [0, 1, -p],
    [p, 0, -1], [p, 0, 1], [-p, 0, -1], [-p, 0, 1],
  ];
  const ay = 0.5;
  const ax = 0.35;
  const proj = v.map(([x, y, z]) => {
    const x1 = x * Math.cos(ay) + z * Math.sin(ay);
    const z1 = -x * Math.sin(ay) + z * Math.cos(ay);
    const y1 = y * Math.cos(ax) - z1 * Math.sin(ax);
    return [160 + x1 * 46, 118 - y1 * 46 * 0.92] as const;
  });
  const edges: [number, number][] = [];
  for (let i = 0; i < 12; i++)
    for (let j = i + 1; j < 12; j++) {
      const d = Math.hypot(v[i][0] - v[j][0], v[i][1] - v[j][1], v[i][2] - v[j][2]);
      if (Math.abs(d - 2) < 0.01) edges.push([i, j]);
    }
  return (
    <svg viewBox="0 0 320 260" className={svgBase} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse key={i} cx="160" cy="214" rx={30 + i * 26} ry={6 + i * 5} className="fill-none stroke-paper/[0.12]" />
      ))}
      <ellipse cx="160" cy="214" rx="54" ry="9" className="fill-black/40" />
      <g
        className={`origin-[160px_118px] ${t} duration-700 group-hover:rotate-[24deg] group-focus-within:rotate-[24deg]`}
      >
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={proj[a][0]}
            y1={proj[a][1]}
            x2={proj[b][0]}
            y2={proj[b][1]}
            className="stroke-paper/55"
            strokeWidth="1"
          />
        ))}
        {proj.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.2" className="fill-copper" />
        ))}
      </g>
    </svg>
  );
}

/* IZDAR: an industrial site and its emission readings. */
export function IzdarPlate() {
  const readings = [42, 38, 44, 51, 47, 39, 36, 41, 58, 46, 40, 37, 43, 49, 45, 38];
  const pts = readings.map((r, i) => `${330 + i * 26},${470 - r}`).join(" ");
  return (
    <svg viewBox="0 0 760 520" preserveAspectRatio="xMaxYMax slice" className={svgBase} aria-hidden="true">
      <defs>
        <radialGradient id="iz-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={{ stopColor: "var(--copper)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--copper)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id="iz-plume" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--paper)", stopOpacity: 0.35 }} />
          <stop offset="1" style={{ stopColor: "var(--paper)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <circle cx="560" cy="170" r="150" fill="url(#iz-sun)" />
      {/* plumes */}
      <path d="M548 120 C 540 80, 570 60, 556 20" fill="none" stroke="url(#iz-plume)" strokeWidth="18" strokeLinecap="round" />
      <path d="M640 210 C 632 180, 660 160, 648 120" fill="none" stroke="url(#iz-plume)" strokeWidth="12" strokeLinecap="round" />
      {/* buildings */}
      <g className="fill-[color-mix(in_oklch,var(--night),black_25%)]">
        <rect x="530" y="120" width="36" height="300" />
        <rect x="630" y="210" width="28" height="210" />
        <rect x="430" y="300" width="70" height="120" />
        <rect x="480" y="250" width="60" height="170" />
        <rect x="560" y="290" width="110" height="130" />
        <rect x="660" y="330" width="100" height="90" />
        <rect x="380" y="350" width="60" height="70" />
      </g>
      <rect x="530" y="120" width="36" height="5" className="fill-copper/80" />
      <rect x="630" y="210" width="28" height="4" className="fill-copper/80" />
      {[[452, 330], [472, 330], [500, 280], [592, 320], [612, 320], [690, 360]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="8" height="8" className="fill-copper/70" />
      ))}
      {/* the readings the app checks */}
      <rect x="300" y="420" width="460" height="100" className="fill-[color-mix(in_oklch,var(--night),black_35%)]" />
      <line x1="320" y1="436" x2="760" y2="436" className="stroke-paper/15" strokeDasharray="2 6" />
      <polyline points={pts} fill="none" className="stroke-copper" strokeWidth="1.5" />
      {readings.map((r, i) => (
        <circle key={i} cx={330 + i * 26} cy={470 - r} r={r > 55 ? 4 : 2} className={r > 55 ? "fill-paper" : "fill-copper"} />
      ))}
    </svg>
  );
}

/* VeloBoost: a priority ring. Engaging raises it; leaving restores it (the tweaks are reversible). */
export function VeloPlate() {
  const c = 2 * Math.PI * 70;
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <circle cx="100" cy="100" r="70" className="fill-none stroke-ink/15" strokeWidth="22" />
      <circle
        cx="100"
        cy="100"
        r="70"
        transform="rotate(-90 100 100)"
        className={`fill-none stroke-copper ${t} duration-700 [stroke-dashoffset:var(--o)] group-hover:[stroke-dashoffset:var(--h)] group-focus-within:[stroke-dashoffset:var(--h)]`}
        strokeWidth="22"
        strokeDasharray={c}
        style={{ ["--o" as string]: c * 0.62, ["--h" as string]: c * 0.12 }}
      />
      <circle cx="100" cy="100" r="16" className="fill-ink/10" />
    </svg>
  );
}

/* MyPC: a monitor; engaging locks the screen (what the bot can do remotely). */
export function MypcPlate() {
  return (
    <svg viewBox="0 0 200 170" className="h-full w-full" aria-hidden="true">
      <rect x="10" y="8" width="180" height="116" rx="7" className="fill-ink/80" />
      <rect x="18" y="16" width="164" height="100" rx="3" className="fill-[color-mix(in_oklch,var(--paper),var(--ink)_22%)]" />
      <g className={`opacity-0 ${t} group-hover:opacity-100 group-focus-within:opacity-100`}>
        <rect x="18" y="16" width="164" height="100" rx="3" className="fill-ink" />
        <rect x="88" y="62" width="24" height="20" rx="3" className="fill-copper" />
        <path d="M93 62v-6a7 7 0 0 1 14 0v6" className="fill-none stroke-copper" strokeWidth="3" />
      </g>
      <rect x="94" y="124" width="12" height="28" className="fill-ink/80" />
      <rect x="64" y="152" width="72" height="6" rx="2" className="fill-ink/80" />
    </svg>
  );
}

/*
 * Chernaya Tamga: Aktobe on the fortieth night. The sun is a black disc with a
 * burning rim (the Black Khan swallowed it), panel blocks with a few lit
 * windows, an empty avenue and one walker. Engaging the card flares the rim.
 * Colors: the game's violet dusk, mixed from --night; copper from the tokens.
 */
export function GamePlate() {
  const violet = "oklch(0.55 0.15 305)";
  const sky = (p: number) => `color-mix(in oklch, var(--night), ${violet} ${p}%)`;
  const blockFar = sky(26);
  const blockNear = "color-mix(in oklch, var(--night), black 30%)";

  // near panel blocks: [x, width, floors]
  const near: [number, number, number][] = [
    [560, 150, 9],
    [930, 120, 7],
    [1060, 190, 11],
  ];
  const far: [number, number][] = [
    [520, 120],
    [640, 80],
    [720, 140],
    [870, 90],
    [980, 110],
    [1100, 120],
  ];
  const horizon = 400;
  const vx = 860; // vanishing point of the avenue

  return (
    <svg viewBox="0 0 1200 520" preserveAspectRatio="xMaxYMax slice" className={svgBase} aria-hidden="true">
      <defs>
        <linearGradient id="gp-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" style={{ stopColor: sky(6) }} />
          <stop offset="0.55" style={{ stopColor: sky(30) }} />
          <stop offset="0.71" style={{ stopColor: `color-mix(in oklch, ${sky(40)}, var(--copper) 18%)` }} />
          <stop offset="1" style={{ stopColor: sky(10) }} />
        </linearGradient>
        <radialGradient id="gp-corona" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.3" style={{ stopColor: "var(--copper)", stopOpacity: 0.55 }} />
          <stop offset="0.55" style={{ stopColor: `color-mix(in oklch, var(--copper), ${violet} 50%)`, stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: violet, stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id="gp-road" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" style={{ stopColor: sky(22) }} />
          <stop offset="1" style={{ stopColor: "color-mix(in oklch, var(--night), black 20%)" }} />
        </linearGradient>
        <filter id="gp-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <rect width="1200" height="520" fill="url(#gp-sky)" />

      {/* the swallowed sun */}
      <g className={`${t} duration-700 origin-[900px_190px] group-hover:scale-[1.06] group-focus-within:scale-[1.06]`}>
        <circle cx="900" cy="190" r="170" fill="url(#gp-corona)" />
        <circle
          cx="900"
          cy="190"
          r="62"
          fill="none"
          strokeWidth="10"
          filter="url(#gp-glow)"
          className={`stroke-copper opacity-70 ${t} group-hover:opacity-100 group-focus-within:opacity-100`}
        />
        <circle cx="900" cy="190" r="62" fill="none" strokeWidth="2.5" style={{ stroke: "color-mix(in oklch, var(--copper), var(--paper) 45%)" }} />
        <circle cx="900" cy="190" r="60.5" style={{ fill: "color-mix(in oklch, var(--night), black 45%)" }} />
      </g>

      {/* far blocks in the haze */}
      {far.map(([x, w], i) => (
        <rect key={i} x={x} y={horizon - 50 - (i % 3) * 18} width={w} height={54 + (i % 3) * 18} style={{ fill: blockFar }} />
      ))}

      {/* near panel blocks with a few lit windows */}
      {near.map(([x, w, floors], b) => {
        const fh = 20;
        const top = horizon - floors * fh;
        const cols = Math.floor((w - 14) / 20);
        return (
          <g key={b}>
            <rect x={x} y={top} width={w} height={floors * fh + 4} style={{ fill: blockNear }} />
            {Array.from({ length: floors * cols }).map((_, k) => {
              const r = Math.floor(k / cols);
              const c = k % cols;
              const lit = (r * 7 + c * 13 + b * 5) % 9 === 0;
              const dim = (r * 3 + c * 5 + b) % 4 === 0;
              if (!lit && !dim) return null;
              return (
                <rect
                  key={k}
                  x={x + 10 + c * 20}
                  y={top + 7 + r * fh}
                  width="7"
                  height="7"
                  style={{ fill: lit ? "color-mix(in oklch, var(--copper), var(--paper) 62%)" : "var(--paper)" }}
                  opacity={lit ? 0.85 : 0.06}
                />
              );
            })}
          </g>
        );
      })}

      {/* ground and the empty avenue */}
      <rect y={horizon} width="1200" height={520 - horizon} style={{ fill: "color-mix(in oklch, var(--night), black 25%)" }} />
      <path d={`M${vx - 6} ${horizon} L${vx + 6} ${horizon} L1260 520 L470 520 Z`} fill="url(#gp-road)" />
      {[0.08, 0.2, 0.38, 0.62].map((p, i) => {
        const y1 = horizon + (520 - horizon) * p;
        const y2 = y1 + 5 + 30 * p;
        const x = (y: number) => vx + ((y - horizon) / (520 - horizon)) * -5;
        return (
          <path
            key={i}
            d={`M${x(y1)} ${y1} L${x(y2)} ${y2}`}
            strokeWidth={1 + 5 * p}
            strokeLinecap="round"
            className="stroke-paper/45"
          />
        );
      })}

      {/* a street lamp */}
      <path d="M1010 520 V350 h-26" fill="none" strokeWidth="3" style={{ stroke: blockNear }} />
      <circle cx="982" cy="354" r="18" className="fill-paper/10" filter="url(#gp-glow)" />
      <circle cx="982" cy="354" r="3" className="fill-paper/80" />

      {/* the walker, hood up, tamga hand at the side */}
      <g transform="translate(838 436) scale(0.85)" style={{ fill: "color-mix(in oklch, var(--night), black 55%)" }}>
        <path d="M14 0c-8 0-12 7-12 14 0 4 2 7 3 9l-5 37 6 1 4-22 3 22h7l3-22 4 22 6-1-5-37c1-2 3-5 3-9 0-7-5-14-12-14z" />
        <circle cx="31" cy="38" r="3" className="fill-copper" />
      </g>
    </svg>
  );
}
