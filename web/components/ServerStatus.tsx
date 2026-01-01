"use client";

import AnimatedNumber from "@/components/AnimatedNumber";
import { useEffect, useState } from "react";

export default function ServerStatus() {
  const [players, setPlayers] = useState(2413);
  const [ping, setPing] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers((p) => p + Math.floor(Math.random() * 10 - 5));
      setPing((p) => Math.max(20, p + Math.floor(Math.random() * 6 - 3)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section style={wrap}>
      <div style={card}>
        <h3>Players Online</h3>
        <div style={value}>
          <AnimatedNumber value={players} />
        </div>
      </div>

      <div style={card}>
        <h3>Latency</h3>
        <div style={value}>
          <AnimatedNumber value={ping} /> ms
        </div>
      </div>
    </section>
  );
}

const wrap = {
  display: "flex",
  justifyContent: "center",
  gap: 40,
  padding: "120px 40px",
};

const card = {
  background: "rgba(20,20,25,0.9)",
  borderRadius: 20,
  padding: "32px 40px",
  border: "1px solid rgba(255,255,255,0.1)",
  textAlign: "center" as const,
  minWidth: 220,
};

const value = {
  fontSize: 42,
  fontWeight: 900,
  marginTop: 12,
};
