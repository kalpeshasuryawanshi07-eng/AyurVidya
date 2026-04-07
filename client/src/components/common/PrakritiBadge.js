export default function PrakritiBadge({ dosha, size = "sm" }) {
  const map = {
    Vata:  { label: "Vata",  emoji: "💨", cls: "badge-vata"  },
    Pitta: { label: "Pitta", emoji: "🔥", cls: "badge-pitta" },
    Kapha: { label: "Kapha", emoji: "🌊", cls: "badge-kapha" },
  };
  const info = map[dosha];
  if (!info) return null;
  return (
    <span className={`badge ${info.cls}`} style={{ fontSize: size === "lg" ? "0.9rem" : "0.75rem" }}>
      {info.emoji} {info.label}
    </span>
  );
}
