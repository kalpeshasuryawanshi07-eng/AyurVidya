import React from "react";

export function PageLoader() {
  return (
    <div style={{ padding: "3rem 2rem" }}>
      <div className="skeleton skeleton-title" style={{ width: "40%", marginBottom: "1.5rem" }} />
      <div className="skeleton skeleton-text" style={{ width: "90%" }} />
      <div className="skeleton skeleton-text" style={{ width: "80%" }} />
      <div className="skeleton skeleton-text" style={{ width: "85%" }} />
      <div className="skeleton skeleton-text" style={{ width: "70%", marginBottom: "2rem" }} />
      <div className="skeleton skeleton-card" style={{ height: "180px", marginBottom: "1rem" }} />
      <div className="skeleton skeleton-card" style={{ height: "180px" }} />
    </div>
  );
}

export function CardLoader({ count = 6 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton skeleton-card" style={{ height: "220px" }} />
      ))}
    </div>
  );
}

export default function Loader() {
  return (
    <div className="flex-center" style={{ padding: "4rem", flexDirection: "column", gap: "1rem" }}>
      <div style={{ fontSize: "2rem", animation: "pulse 1.5s infinite" }}>🌿</div>
      <p className="text-muted">Loading...</p>
    </div>
  );
}
