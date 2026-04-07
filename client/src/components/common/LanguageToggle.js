import { useLanguage } from "../../context/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="btn btn-ghost btn-sm"
      aria-label="Toggle language"
      title={lang === "en" ? "Switch to Marathi" : "Switch to English"}
      style={{ fontFamily: "var(--font-devanagari)", fontWeight: 600, fontSize: "0.85rem", minWidth: "3.2rem" }}
    >
      {lang === "en" ? "मराठी" : "EN"}
    </button>
  );
}
