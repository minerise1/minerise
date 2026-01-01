"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OdometerNumber from "@/components/OdometerNumber";

export default function LiveStatCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit?: string;
}) {
  const [prev, setPrev] = useState(value);

  const direction =
    value > prev ? "up" : value < prev ? "down" : "same";

  useEffect(() => {
    setPrev(value);
  }, [value]);

  return (
    <motion.div
      animate={{
        boxShadow:
          direction === "up"
            ? "0 0 30px rgba(34,197,94,0.6)"
            : direction === "down"
            ? "0 0 30px rgba(239,68,68,0.6)"
            : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.6 }}
      style={card}
    >
      <p style={labelStyle}>{label}</p>

      <div style={valueRow}>
        <OdometerNumber value={value} />
        {unit && <span style={unitStyle}>{unit}</span>}
      </div>
    </motion.div>
  );
}

const card = {
  background: "rgba(20,20,25,0.9)",
  borderRadius: 22,
  padding: "28px 36px",
  border: "1px solid rgba(255,255,255,0.12)",
  minWidth: 260,
  textAlign: "center" as const,
};

const labelStyle = {
  opacity: 0.7,
  marginBottom: 14,
  letterSpacing: 1,
};

const valueRow = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  gap: 6,
};

const unitStyle = {
  fontSize: 22,
  opacity: 0.7,
  marginBottom: 6,
};
