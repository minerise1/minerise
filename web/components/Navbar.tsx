"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { items } = useCart();
  const [open, setOpen] = useState(false);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const loggedIn = typeof window !== "undefined" && !!localStorage.getItem("token");

  return (
    <nav style={nav}>
      <Link href="/" style={logo}>
        <img src="/logo.png" height={36} />
        <span>MineRise</span>
      </Link>

      <div style={right}>
        <Link href="/products" style={link}>Store</Link>

        <Link href="/cart" style={cart}>
          <ShoppingCart size={18} />
          {count > 0 && <span style={badge}>{count}</span>}
        </Link>

        <div style={{ position: "relative" }}>
          <button onClick={() => setOpen(!open)} style={accountBtn}>
            <User size={18} />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={dropdown}
              >
                {!loggedIn && (
                  <>
                    <Link href="/login" style={dropItem}>Login</Link>
                    <Link href="/register" style={dropItem}>Register</Link>
                  </>
                )}

                {loggedIn && (
                  <>
                    <Link href="/account" style={dropItem}>Account</Link>
                    <button
                      style={dropItem}
                      onClick={() => {
                        localStorage.removeItem("token");
                        location.reload();
                      }}
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 32px",
  position: "sticky" as const,
  top: 0,
  zIndex: 100,
  background: "rgba(15,15,18,0.75)",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

const logo = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "white",
  fontWeight: 900,
  fontSize: 20,
  textDecoration: "none",
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: 22,
};

const link = {
  color: "#d1d5db",
  textDecoration: "none",
};

const cart = {
  position: "relative" as const,
  color: "white",
};

const badge = {
  position: "absolute" as const,
  top: -6,
  right: -8,
  background: "#22c55e",
  color: "black",
  fontSize: 11,
  padding: "2px 6px",
  borderRadius: 999,
  fontWeight: 800,
};

const accountBtn = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 999,
  padding: 8,
  cursor: "pointer",
  color: "white",
};

const dropdown = {
  position: "absolute" as const,
  right: 0,
  top: 44,
  background: "#141419",
  borderRadius: 12,
  minWidth: 160,
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.08)",
};

const dropItem = {
  padding: "12px 14px",
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "white",
  textDecoration: "none",
  background: "transparent",
  border: "none",
  cursor: "pointer",
};
