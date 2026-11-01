"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders a skeleton until the box comes near the viewport, then mounts the
 * real content and fades it in. Used for the project drawings, which are
 * large SVGs that nobody sees until they scroll to them.
 */
export default function LazyMount({
  children,
  className = "",
  skeletonClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  skeletonClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      {mounted ? (
        <div className="lazy-in absolute inset-0">{children}</div>
      ) : (
        <div className={`skeleton absolute inset-0 rounded-none ${skeletonClassName}`} aria-hidden="true" />
      )}
    </div>
  );
}
