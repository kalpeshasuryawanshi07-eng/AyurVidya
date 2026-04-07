import { createContext, useContext, useState } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem("ayurveda-lang") || "en"
  );

  const toggleLang = () => {
    const next = lang === "en" ? "mr" : "en";
    setLang(next);
    localStorage.setItem("ayurveda-lang", next);
  };

  const t = (key) => {
    const keys = key.split(".");
    let val = translations[lang];
    for (const k of keys) val = val?.[k];
    return val || key;
  };

  const withLang = (params = {}) => ({ ...params, lang });

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, withLang, apiLangParams: { lang }, isMarathi: lang === "mr" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
