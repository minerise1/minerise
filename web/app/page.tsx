import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #3b0764, #0f0f12 60%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 1100, width: "100%", padding: 40 }}>
        {/* HERO TEXT */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h1 style={{ fontSize: 56, marginBottom: 10 }}>
            MineRise Store
          </h1>
          <p style={{ fontSize: 18, opacity: 0.8 }}>
            Premium ranks, gems & perks for our Minecraft server
          </p>

          <div style={{ marginTop: 30 }}>
            <Link href="/products">
              <button style={primaryBtn}>View Store</button>
            </Link>
            <Link href="/login">
              <button style={secondaryBtn}>Login</button>
            </Link>
          </div>
        </div>

        {/* CARD SECTION */}
        <div
          style={{
            display: "flex",
            gap: 30,
            justifyContent: "center",
            perspective: 1200,
          }}
        >
          <Card title="VIP Rank" text="Permanent access & perks" />
          <Card title="Gems" text="Buy in-game currency" active />
          <Card title="Bundles" text="Best value packs" />
        </div>
      </div>
    </main>
  );
}

/* Copy paste these to make more i think so */

function Card({
  title,
  text,
  active,
}: {
  title: string;
  text: string;
  active?: boolean;
}) {
  return (
    <div
      style={{
        width: 260,
        height: 340,
        background: "#16161d",
        borderRadius: 16,
        padding: 24,
        transform: active
          ? "scale(1.05)"
          : "rotateY(15deg)",
        boxShadow: active
          ? "0 0 40px rgba(139,92,246,0.6)"
          : "0 20px 40px rgba(0,0,0,0.6)",
        border: "1px solid #222",
        transition: "0.3s ease",
      }}
    >
      <h3 style={{ fontSize: 22 }}>{title}</h3>
      <p style={{ opacity: 0.8 }}>{text}</p>
    </div>
  );
}

/*Bro these are the Buttons*/

const primaryBtn = {
  background: "linear-gradient(90deg,#9333ea,#ec4899)",
  border: "none",
  padding: "12px 20px",
  borderRadius: 8,
  color: "white",
  fontSize: 16,
  cursor: "pointer",
  marginRight: 12,
};

const secondaryBtn = {
  background: "transparent",
  border: "1px solid #444",
  padding: "12px 20px",
  borderRadius: 8,
  color: "white",
  fontSize: 16,
  cursor: "pointer",
};
