/**
 * A crop of the hero's world for the story: dusk sky, the lit planet with its
 * relief, and (for "summit") the dark hilltop in front. No discs. Decorative.
 */
export default function Vista({ variant }: { variant: "horizon" | "summit" }) {
  return (
    <div className={`vista vista-${variant} hero-sky grain-on`} aria-hidden="true">
      <div className="planet-haze" />
      <div className="planet" />
      {variant === "summit" ? <div className="hero-ridge" /> : null}
    </div>
  );
}
