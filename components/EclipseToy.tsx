"use client";

import { useEffect, useRef, useState } from "react";

/*
 * The end of the story, to play with: drag the copper disc onto the grey one.
 * When they meet in the eclipse of the mark, the picture's sky darkens and
 * the sign-off lights up (CSS on the nearest [data-eclipse-host]). Drag it
 * away and the light comes back. Arrow keys move it too.
 */

const R = 64;
const GREY = { x: 150, y: 120 };
const TARGET = { x: GREY.x + R * 1.25, y: GREY.y }; // d / r = 1.25, as in the logo
const START = { x: 318, y: 150 };
const SNAP = 22;
const BOUNDS = { minX: R, maxX: 400 - R, minY: R, maxY: 240 - R };

export default function EclipseToy() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pos, setPos] = useState(START);
  const [locked, setLocked] = useState(false);
  const [dragging, setDragging] = useState(false);
  const anim = useRef(0);

  const clamp = (p: { x: number; y: number }) => ({
    x: Math.min(BOUNDS.maxX, Math.max(BOUNDS.minX, p.x)),
    y: Math.min(BOUNDS.maxY, Math.max(BOUNDS.minY, p.y)),
  });

  // tell the picture around us
  useEffect(() => {
    const host = svgRef.current?.closest<HTMLElement>("[data-eclipse-host]");
    if (!host) return;
    if (locked) host.dataset.eclipse = "";
    else delete host.dataset.eclipse;
  }, [locked]);

  useEffect(() => () => cancelAnimationFrame(anim.current), []);

  const near = (p: { x: number; y: number }) => Math.hypot(p.x - TARGET.x, p.y - TARGET.y) < SNAP;

  const settle = (p: { x: number; y: number }) => {
    if (!near(p)) {
      setLocked(false);
      return;
    }
    // glide into the exact eclipse, then lock
    cancelAnimationFrame(anim.current);
    let cur = p;
    const step = () => {
      cur = { x: cur.x + (TARGET.x - cur.x) * 0.25, y: cur.y + (TARGET.y - cur.y) * 0.25 };
      if (Math.hypot(cur.x - TARGET.x, cur.y - TARGET.y) < 0.3) {
        setPos(TARGET);
        setLocked(true);
        navigator.vibrate?.(18);
        return;
      }
      setPos(cur);
      anim.current = requestAnimationFrame(step);
    };
    anim.current = requestAnimationFrame(step);
  };

  const toSvg = (e: React.PointerEvent) => {
    const svg = svgRef.current;
    const m = svg?.getScreenCTM();
    if (!svg || !m) return null;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    return { x: pt.x, y: pt.y };
  };
  const grab = useRef({ dx: 0, dy: 0 });

  const onDown = (e: React.PointerEvent<SVGGElement>) => {
    const p = toSvg(e);
    if (!p) return;
    cancelAnimationFrame(anim.current);
    e.currentTarget.setPointerCapture(e.pointerId);
    grab.current = { dx: pos.x - p.x, dy: pos.y - p.y };
    setDragging(true);
    setLocked(false);
  };
  const onMove = (e: React.PointerEvent<SVGGElement>) => {
    if (!dragging) return;
    const p = toSvg(e);
    if (p) setPos(clamp({ x: p.x + grab.current.dx, y: p.y + grab.current.dy }));
  };
  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    settle(pos);
  };
  const onKey = (e: React.KeyboardEvent) => {
    const d = { ArrowLeft: [-8, 0], ArrowRight: [8, 0], ArrowUp: [0, -8], ArrowDown: [0, 8] }[e.key];
    if (!d) return;
    e.preventDefault();
    const p = clamp({ x: pos.x + d[0], y: pos.y + d[1] });
    setPos(p);
    settle(p);
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 240"
      className={`eclipse-toy ${locked ? "is-locked" : ""} ${dragging ? "is-dragging" : ""}`}
    >
      <defs>
        <radialGradient id="toy-l" cx="0.74" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#EFE1D5" />
          <stop offset="0.45" stopColor="#BBAAA2" />
          <stop offset="1" stopColor="#4E4648" />
        </radialGradient>
        <radialGradient id="toy-r" cx="0.7" cy="0.6" r="0.85">
          <stop offset="0" stopColor="#F7924A" />
          <stop offset="0.5" stopColor="#E2692B" />
          <stop offset="1" stopColor="#8E3A1B" />
        </radialGradient>
        <radialGradient id="toy-o" cx="0.35" cy="0.5" r="0.7">
          <stop offset="0" stopColor="#2D2425" />
          <stop offset="1" stopColor="#1A1516" />
        </radialGradient>
        <radialGradient id="toy-corona" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.45" stopColor="#F7924A" stopOpacity="0.55" />
          <stop offset="1" stopColor="#F7924A" stopOpacity="0" />
        </radialGradient>
        <clipPath id="toy-clip">
          <circle cx={GREY.x} cy={GREY.y} r={R} />
        </clipPath>
      </defs>

      <ellipse className="toy-corona" cx={(GREY.x + TARGET.x) / 2} cy={GREY.y} rx="190" ry="130" fill="url(#toy-corona)" />
      <circle cx={GREY.x} cy={GREY.y} r={R} fill="url(#toy-l)" />
      <g
        role="button"
        tabIndex={0}
        aria-label="Copper disc. Drag it, or use the arrow keys, onto the grey disc."
        aria-pressed={locked}
        className="toy-handle"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={onKey}
      >
        <circle className="toy-copper" cx={pos.x} cy={pos.y} r={R} fill="url(#toy-r)" />
        <circle cx={pos.x} cy={pos.y} r={R} fill="url(#toy-o)" clipPath="url(#toy-clip)" />
      </g>
    </svg>
  );
}
