"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div
      style={{
        borderBottom: "1px solid #222",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <strong style={{ fontSize: 20 }}>MineRise</strong>

      <div style={{ display: "flex", gap: 20 }}>
        <Link href="/products">Store</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </div>
  );
}
