"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { items } = useCart();

  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav style={nav}>
      <div style={left}>
        <Link href="/" style={logo}>
          MineRise
        </Link>
      </div>

      <div style={right}>
        <Link href="/products" style={link}>
          Products
        </Link>

        <Link href="/cart" style={cart}>
          Cart
          {count > 0 && <span style={badge}>{count}</span>}
        </Link>
      </div>
    </nav>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 32px",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  position: "sticky" as const,
  top: 0,
  background: "#0f0f12",
  zIndex: 100,
};

const left = {};

const right = {
  display: "flex",
  alignItems: "center",
  gap: 24,
};

const logo = {
  fontSize: 22,
  fontWeight: 800,
  textDecoration: "none",
  color: "white",
};

const link = {
  textDecoration: "none",
  color: "#d1d5db",
};

const cart = {
  position: "relative" as const,
  textDecoration: "none",
  color: "white",
  fontWeight: 600,
};

const badge = {
  position: "absolute" as const,
  top: -6,
  right: -10,
  background: "#22c55e",
  color: "black",
  fontSize: 12,
  padding: "2px 6px",
  borderRadius: 999,
  fontWeight: 700,
};
