import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { getTopicFlashcards } from "../../services/api";
import Loader from "../common/Loader";
import styles from "../../styles/Flashcard.module.css";

export default function FlashcardDeck({ topicSlug }) {
  const { t, lang } = useLanguage();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!topicSlug) return;
      try {
        setLoading(true);
        setError("");
        const data = await getTopicFlashcards(topicSlug, lang);
        setCards(data.flashcards || []);
        setCurrent(0);
        setFlipped(false);
      } catch (err) {
        setError(err.response?.data?.message || t("common.error"));
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [topicSlug, lang, t]);

  const prev = () => {
    setCurrent((value) => Math.max(0, value - 1));
    setFlipped(false);
  };

  const next = () => {
    setCurrent((value) => Math.min(cards.length - 1, value + 1));
    setFlipped(false);
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">!</div>
        <h3>{error}</h3>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">?</div>
        <h3>{t("common.noResults")}</h3>
      </div>
    );
  }

  return (
    <div className={styles.deck}>
      <div className={styles.deckHeader}>
        <span className={styles.deckCount}>
          {current + 1} / {cards.length}
        </span>
        <span className={styles.deckHint}>{t("topic.flipHint")}</span>
      </div>

      <div className={`flip-card${flipped ? " flipped" : ""}`} onClick={() => setFlipped((value) => !value)}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div>
              <div className={styles.cardLabel}>{t("topic.question")}</div>
              {cards[current].front}
            </div>
          </div>
          <div className="flip-card-back">
            <div>
              <div className={styles.cardLabel} style={{ color: "rgba(255,255,255,0.7)" }}>
                {t("topic.answer")}
              </div>
              <div style={{ whiteSpace: "pre-line" }}>{cards[current].back}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.deckControls}>
        <button className="btn btn-outline btn-sm" onClick={prev} disabled={current === 0}>
          ← {t("topic.prevLabel")}
        </button>
        <div className={styles.dots}>
          {cards.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot}${index === current ? ` ${styles.dotActive}` : ""}`}
              onClick={() => {
                setCurrent(index);
                setFlipped(false);
              }}
              aria-label={`Card ${index + 1}`}
            />
          ))}
        </div>
        <button className="btn btn-outline btn-sm" onClick={next} disabled={current === cards.length - 1}>
          {t("topic.nextLabel")} →
        </button>
      </div>
    </div>
  );
}
