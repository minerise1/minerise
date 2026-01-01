"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import footer from "@/components/footer";
import SneakPeek from "@/components/SneakPeek";
import ServerStatusPanel from "@/components/ServerStatusPanel";

const slides = [
  { title: "VIP Rank", desc: "Permanent rank with exclusive perks" },
  { title: "Gems", desc: "Purchase in-game currency packs" },
  { title: "Bundles", desc: "Best value combined packages" },
];

export default function Home() {
  const [index, setIndex] = useState(1);
  const [hovering, setHovering] = useState(false);
  const [serverStats, setServerStats] = useState({
    online: 0,
    max: 0,
  });

  const router = useRouter();
  const wheelLock = useRef(false);

  const prev = () =>
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (hovering) return;
    const interval = setInterval(next, 3500);
    return () => clearInterval(interval);
  }, [hovering]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/stats")
      .then((res) => res.json())
      .then((data) => {
        setServerStats({
          online: data.onlinePlayers ?? 0,
          max: data.maxPlayers ?? 0,
        });
      })
      .catch(() => {});
  }, []);

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    if (wheelLock.current) return;
    if (e.deltaY > 0) next();
    if (e.deltaY < 0) prev();
    wheelLock.current = true;
    setTimeout(() => (wheelLock.current = false), 400);
  }

  return (
    <main style={page}>
      {/* HERO */}
      <section style={hero}>
        <h1 style={heroTitle}>MineRise Store</h1>
        <p style={heroSubtitle}>
          Premium ranks, gems & perks for our Minecraft server
        </p>

        <div
          style={carousel}
          onWheelCapture={onWheel}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <button onClick={prev} style={arrow}>‹</button>

          <div style={track}>
            {slides.map((s, i) => (
              <div
                key={i}
                style={{
                  ...card,
                  transform: `
                    translateX(${(i - index) * 320}px)
                    scale(${i === index ? 1.1 : 0.85})
                    rotateY(${(i - index) * -20}deg)
                  `,
                  opacity: i === index ? 1 : 0.6,
                  filter: i === index ? "blur(0)" : "blur(2px)",
                  pointerEvents: i === index ? "auto" : "none",
                  zIndex: i === index ? 3 : 1,
                }}
              >
                <h2>{s.title}</h2>
                <p style={{ opacity: 0.8 }}>{s.desc}</p>
                {i === index && (
                  <button
                    style={cardButton}
                    onClick={() => router.push("/products")}
                  >
                    View in Store
                  </button>
                )}
                {i === index && <div style={glow} />}
              </div>
            ))}
          </div>

          <button onClick={next} style={arrow}>›</button>
        </div>
      </section>

      {/* SNEAK PEEK */}
      <SneakPeek />

      {/* LIVE SERVER STATUS (ODOMETER) */}
      <ServerStatusPanel />

      {/* LEGACY STATS GRID */}
      <section style={statsSection}>
        <div style={statCard}>
          <h2 style={statValue}>{serverStats.online}</h2>
          <p style={statLabel}>Players Online</p>
        </div>
        <div style={statCard}>
          <h2 style={statValue}>{serverStats.max}</h2>
          <p style={statLabel}>Max Slots</p>
        </div>
        <div style={statCard}>
          <h2 style={statValue}>54K+</h2>
          <p style={statLabel}>Products Sold</p>
        </div>
        <div style={statCard}>
          <h2 style={statValue}>99.9%</h2>
          <p style={statLabel}>Uptime</p>
        </div>
      </section>

      {footer()}
    </main>
  );
}

/* ================= STYLES ================= */

const page = { background: "#0b0b12", color: "white" };

const hero = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
};

const heroTitle = { fontSize: 60, fontWeight: 900 };
const heroSubtitle = { fontSize: 18, opacity: 0.8, marginBottom: 40 };

const carousel = { display: "flex", alignItems: "center", gap: 40 };
const track = { position: "relative" as const, width: 960, height: 380 };
const card = {
  position: "absolute" as const,
  width: 280,
  height: 360,
  background: "#141419",
  borderRadius: 16,
  padding: 24,
};

const cardButton = {
  marginTop: 20,
  background: "linear-gradient(90deg,#b11212,#22c55e)",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  color: "white",
  fontWeight: 700,
};

const glow = {
  position: "absolute" as const,
  inset: -20,
  background: "radial-gradient(circle, rgba(177,18,18,0.25), transparent 60%)",
};

const arrow = {
  fontSize: 32,
  width: 48,
  height: 48,
  borderRadius: "50%",
};

const statsSection = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 24,
  maxWidth: 1000,
  margin: "120px auto",
};

const statCard = {
  background: "#141419",
  borderRadius: 14,
  padding: 24,
  textAlign: "center" as const,
};

const statValue = { fontSize: 36, fontWeight: 900 };
const statLabel = { opacity: 0.8 };
