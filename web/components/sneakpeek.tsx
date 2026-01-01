"use client";

import { motion } from "framer-motion";

const items = [
  {
    title: "VIP Rank",
    desc: "Particles, chat tags, exclusive perks",
    image: "/sneak/vip.jpg",
  },
  {
    title: "Cosmetics",
    desc: "Capes, trails & visual effects",
    image: "/sneak/cosmetics.jpg",
  },
  {
    title: "Exclusive Areas",
    desc: "VIP-only warps & zones",
    image: "/sneak/areas.jpg",
  },
];

export default function SneakPeek() {
  return (
    <section style={section}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={title}
      >
        Sneak Peeks
      </motion.h2>

      <div style={grid}>
        {items.map((i, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, rotateX: 6, rotateY: -6 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{
              ...card,
              backgroundImage: `url(${i.image})`,
            }}
          >
            <div style={overlay} />
            <div style={content}>
              <h3>{i.title}</h3>
              <p>{i.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const section = {
  padding: "140px 40px",
  background:
    "radial-gradient(circle at top, rgba(177,18,18,0.25), transparent 60%)",
};

const title = {
  fontSize: 46,
  fontWeight: 900,
  textAlign: "center" as const,
  marginBottom: 60,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 32,
  maxWidth: 1200,
  margin: "0 auto",
};

const card = {
  position: "relative" as const,
  height: 360,
  borderRadius: 20,
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflow: "hidden",
  boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
  cursor: "pointer",
  transformStyle: "preserve-3d" as const,
};

const overlay = {
  position: "absolute" as const,
  inset: 0,
  background:
    "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2))",
};

const content = {
  position: "absolute" as const,
  bottom: 24,
  left: 24,
  right: 24,
};
