import { useLanguage } from "../../context/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="btn btn-sm"
      aria-label="Toggle language"
      title={lang === "en" ? "Switch to Marathi" : "Switch to English"}
      style={{ 
        fontFamily: "var(--font-devanagari)", 
        fontWeight: 700, 
        fontSize: "0.8rem", 
        minWidth: "3.5rem",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface-alt)",
        color: "var(--color-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 0.5rem"
      }}
    >
      {lang === "en" ? "मराठी" : "EN"}
    </button>

  );
}
