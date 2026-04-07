import { useTheme } from "../../context/ThemeContext";

export default function DarkModeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-sm"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      style={{ fontSize: "1.1rem", padding: "0.4rem 0.6rem", minWidth: "2.2rem", lineHeight: 1 }}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
