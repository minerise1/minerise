"use client";

import { useEffect, useState } from "react";
import LiveStatCard from "@/components/LiveStatCard";

type Stats = {
  online: boolean;
  onlinePlayers: number;
  maxPlayers: number;
};

export default function ServerStatusPanel() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("http://localhost:5000/stats");
        const data = await res.json();
        setStats(data);
      } catch {
        setStats(null);
      }
    }

    fetchStats();
    const id = setInterval(fetchStats, 5000);
    return () => clearInterval(id);
  }, []);

  if (!stats) {
    return (
      <section style={wrap}>
        <h2 style={title}>Server Offline</h2>
      </section>
    );
  }

  return (
    <section style={wrap}>
      <h2 style={title}>
        Server Status{" "}
        <span
          style={{
            color: stats.online ? "#22c55e" : "#ef4444",
            fontSize: 16,
            marginLeft: 12,
          }}
        >
          {stats.online ? "ONLINE" : "OFFLINE"}
        </span>
      </h2>

      <div style={grid}>
        <LiveStatCard
          label="Players Online"
          value={stats.onlinePlayers}
        />

        <LiveStatCard
          label="Max Players"
          value={stats.maxPlayers}
        />
      </div>
    </section>
  );
}

const wrap = {
  padding: "160px 40px",
  textAlign: "center" as const,
};

const title = {
  fontSize: 46,
  fontWeight: 900,
  marginBottom: 80,
};

const grid = {
  display: "flex",
  justifyContent: "center",
  gap: 40,
  flexWrap: "wrap" as const,
};
