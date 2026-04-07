export default function ProgressBar({ value = 0, label, showPercent = true, color }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div>
      {(label || showPercent) && (
        <div className="flex-between mb-1" style={{ fontSize: "0.8rem" }}>
          {label && <span style={{ color: "var(--color-text-secondary)" }}>{label}</span>}
          {showPercent && <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>{pct}%</span>}
        </div>
      )}
      <div className="progress-bar-wrap">
        <div
          className="progress-bar-fill"
          style={{
            width: `${pct}%`,
            background: color || undefined,
          }}
        />
      </div>
    </div>
  );
}
