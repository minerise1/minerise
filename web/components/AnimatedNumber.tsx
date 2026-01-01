"use client";

import { motion, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function AnimatedNumber({
  value,
  duration = 0.8,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [prev, setPrev] = useState(value);

  useEffect(() => {
    const controls = animate(prev, value, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        if (ref.current) {
          ref.current.textContent = Math.round(latest).toString();
        }
      },
    });

    setPrev(value);
    return () => controls.stop();
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
