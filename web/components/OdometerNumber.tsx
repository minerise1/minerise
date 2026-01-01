"use client";

import { motion, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export default function OdometerNumber({
  value,
  height = 48,
}: {
  value: number;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const controls = animate(
      ref.current.scrollTop,
      value * height,
      {
        duration: 0.8,
        ease: "easeOut",
      }
    );

    return () => controls.stop();
  }, [value]);

  return (
    <div
      style={{
        height,
        overflow: "hidden",
        fontSize: height,
        fontWeight: 900,
        lineHeight: `${height}px`,
      }}
    >
      <div ref={ref}>
        {Array.from({ length: 10000 }).map((_, i) => (
          <div key={i} style={{ height }}>
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}
