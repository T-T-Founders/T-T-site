type MarkProps = {
  id: string; // unique per instance; used to namespace SVG gradient ids
  className?: string;
};

/**
 * The T&T Labs mark: a soft grey disc and a copper disc whose overlap reads
 * as an eclipse. Geometry matches the large hero version (d / r = 1.25).
 */
export function Mark({ id, className }: MarkProps) {
  const l = `${id}-l`;
  const r = `${id}-r`;
  const o = `${id}-o`;
  const c = `${id}-c`;
  return (
    <svg viewBox="0 0 66 40" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={l} cx="0.72" cy="0.32" r="0.85">
          <stop offset="0" stopColor="#EADBCF" />
          <stop offset="0.5" stopColor="#B7A69E" />
          <stop offset="1" stopColor="#5B5254" />
        </radialGradient>
        <radialGradient id={r} cx="0.66" cy="0.58" r="0.8">
          <stop offset="0" stopColor="#F58A3E" />
          <stop offset="0.55" stopColor="#E2692B" />
          <stop offset="1" stopColor="#97401E" />
        </radialGradient>
        <radialGradient id={o} cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#2A2223" />
          <stop offset="1" stopColor="#1D1819" />
        </radialGradient>
        <clipPath id={c}>
          <circle cx="22" cy="20" r="16" />
        </clipPath>
      </defs>
      <circle cx="22" cy="20" r="16" fill={`url(#${l})`} />
      <circle cx="42" cy="20" r="16" fill={`url(#${r})`} />
      <circle cx="42" cy="20" r="16" fill={`url(#${o})`} clipPath={`url(#${c})`} />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={`font-display leading-none tracking-[-0.035em] ${className ?? ""}`}
    >
      T&amp;T Labs
    </span>
  );
}
