"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Store</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {products.map(p => (
          <div key={p.id} style={{
            background: "#161616",
            padding: 20,
            borderRadius: 8
          }}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <strong>₹{p.price}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
