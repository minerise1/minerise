import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 60 }}>
      <h1 style={{ fontSize: 36 }}>MineRise Store</h1>
      <p>Minecraft Server Store System</p>

      <div style={{ marginTop: 20 }}>
        <Link href="/login">Login</Link><br />
        <Link href="/register">Register</Link><br />
        <Link href="/products">View Store</Link>
      </div>
    </main>
  );
}
