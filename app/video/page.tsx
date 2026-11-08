import Link from "next/link";
import { FilmPlayer } from "./player";

export default function VideoPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#bdcdf0",
        color: "#111",
        padding: "32px clamp(20px, 5vw, 80px)",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 28,
          }}
        >
          <Link href="/" style={{ fontSize: 20, fontWeight: 650 }}>
            Kynetic.
          </Link>
          <span style={{ color: "#777", fontSize: 14 }}>
            Solana hackathon · 58 seconds
          </span>
        </header>
        <FilmPlayer />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginTop: 24,
            fontSize: 14,
            color: "#777",
          }}
        >
          <p>Same model. Different datasets. Rewards follow measured impact.</p>
          <p>Built on Solana · Escrow, rewards, and stake refunds.</p>
        </div>
      </div>
    </main>
  );
}
