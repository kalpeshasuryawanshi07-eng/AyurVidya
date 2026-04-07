import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import styles from "../../styles/RightTOC.module.css";

const sections = [
  { id: "introduction",    key: "topic.introduction", emoji: "📖" },
  { id: "historical",      key: "topic.historicalContext", emoji: "📜" },
  { id: "core-concept",    key: "topic.coreConcept", emoji: "🔬" },
  { id: "clinical",        key: "topic.clinicalApplications", emoji: "🏥" },
  { id: "modern",          key: "topic.modernComparison", emoji: "🔄" },
  { id: "summary",         key: "topic.summary", emoji: "✅" },
  { id: "quiz",            key: "topic.quiz", emoji: "🧠" },
  { id: "flashcards",      key: "topic.flashcards", emoji: "🃏" },
  { id: "further-reading", key: "topic.furtherReading", emoji: "📚" },
];

export default function RightTOC({ onMarkComplete, isCompleted, onBookmark, isBookmarked, onPrint }) {
  const { t } = useLanguage();
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <aside className={styles.toc}>
      <div className={styles.tocTitle}>{t("topic.onThisPage")}</div>
      <nav>
        {sections.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`${styles.tocLink}${active === s.id ? " " + styles.tocActive : ""}`}
          >
            {s.emoji} {t(s.key)}
          </a>
        ))}
      </nav>
      <div className={styles.tocActions}>
        <button
          className={`btn btn-sm w-full${isCompleted ? " btn-primary" : " btn-outline"}`}
          onClick={onMarkComplete}
          style={{ marginBottom: "0.5rem" }}
        >
          {isCompleted ? t("topic.completed") : t("topic.markComplete")}
        </button>
        <button
          className={`btn btn-sm w-full${isBookmarked ? " btn-accent" : " btn-ghost"}`}
          onClick={onBookmark}
          style={{ marginBottom: "0.5rem" }}
        >
          🔖 {isBookmarked ? t("topic.bookmarked") : t("topic.bookmark")}
        </button>
        <button className="btn btn-ghost btn-sm w-full" onClick={onPrint}>
          🖨️ {t("topic.print")}
        </button>
      </div>
    </aside>
  );
}
