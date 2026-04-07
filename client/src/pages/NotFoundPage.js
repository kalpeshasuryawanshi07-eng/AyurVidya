import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function NotFoundPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1rem" }}>
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🌿</div>
          <h1 style={{ color: "var(--color-primary)", fontSize: "3rem", marginBottom: "0.5rem" }}>404</h1>
          <h2 style={{ color: "var(--color-text-secondary)", marginBottom: "1rem" }}>Leaf not found</h2>
          <p style={{ color: "var(--color-text-light)", marginBottom: "2rem" }}>
            This page seems to have lost its way like a wandering Vata. Let's guide it back.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/" className="btn btn-primary">← Go Home</Link>
            <Link to="/subjects" className="btn btn-outline">Browse Subjects</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
