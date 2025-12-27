"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Container from "@/components/Container";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <Container>
      <h1 style={{ fontSize: 32, marginBottom: 30 }}>Store</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {products.map(p => (
          <div
            key={p.id}
            style={{
              background: "#16161d",
              padding: 20,
              borderRadius: 10,
              border: "1px solid #222",
            }}
          >
            <h3 style={{ fontSize: 20 }}>{p.name}</h3>
            <p style={{ opacity: 0.8 }}>{p.description}</p>

            <div
              style={{
                marginTop: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong style={{ fontSize: 18 }}>₹{p.price}</strong>
              <button
                style={{
                  background: "#5865f2",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: 6,
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
