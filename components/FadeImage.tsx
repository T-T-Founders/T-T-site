"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image (lazy by default) over a shimmering skeleton. The picture fades
 * in once decoded; the skeleton sits underneath, so there is no layout jump.
 */
export default function FadeImage({ alt, className = "", wrapperClassName = "", ...props }: ImageProps & { wrapperClassName?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`grain-on absolute inset-0 overflow-hidden ${wrapperClassName}`}>
      {loaded ? null : <div className="skeleton absolute inset-0 rounded-none" aria-hidden="true" />}
      <Image
        {...props}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
