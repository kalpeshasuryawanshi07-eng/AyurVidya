import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { prakritQuestions, calculatePrakriti } from "../data/prakritQuestions";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PrakritiBadge from "../components/common/PrakritiBadge";
import ScrollToTop from "../components/common/ScrollToTop";
import styles from "../styles/PrakritiQuiz.module.css";

const doshaInfo = {
  Vata: {
    emoji: "💨",
    color: "#1565C0",
    bg: "#E3F2FD",
    desc: "You are predominantly Vata. You are creative, quick-thinking, and energetic when balanced. Focus on warm, nourishing foods, regular routine, and adequate rest.",
    diet: ["Warm, cooked foods", "Ghee and oils", "Sweet, sour, salty tastes", "Warm milk with spices", "Avoid raw, cold foods"],
    lifestyle: ["Regular sleep schedule", "Warm oil massage (Abhyanga)", "Gentle yoga and meditation", "Avoid excessive travel", "Stay warm"],
  },
  Pitta: {
    emoji: "🔥",
    color: "#E65100",
    bg: "#FFF3E0",
    desc: "You are predominantly Pitta. You are intelligent, focused, and driven when balanced. Focus on cooling foods, avoiding excess heat, and managing stress.",
    diet: ["Cool, refreshing foods", "Sweet, bitter, astringent tastes", "Coconut water, cucumber", "Avoid spicy, oily foods", "Limit alcohol and caffeine"],
    lifestyle: ["Avoid midday sun", "Cooling pranayama (Sheetali)", "Moonlight walks", "Avoid competitive stress", "Regular breaks"],
  },
  Kapha: {
    emoji: "🌊",
    color: "#2E7D32",
    bg: "#E8F5E9",
    desc: "You are predominantly Kapha. You are calm, steady, and compassionate when balanced. Focus on light, stimulating foods and regular vigorous exercise.",
    diet: ["Light, dry foods", "Pungent, bitter, astringent tastes", "Honey (in moderation)", "Avoid heavy, oily foods", "Limit dairy and sweets"],
    lifestyle: ["Vigorous daily exercise", "Wake up early (before 6am)", "Dry massage (Udvartana)", "Stimulating activities", "Avoid daytime sleep"],
  },
};

export default function PrakritiQuizPage() {
  const { t, lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers]  = useState({});
  const [result, setResult]    = useState(null);

  const q = prakritQuestions[current];
  const total = prakritQuestions.length;

  const handleScore = (score) => {
    const newAnswers = { ...answers, [q.id]: score };
    setAnswers(newAnswers);
    if (current + 1 >= total) {
      const answerArray = Object.entries(newAnswers).map(([questionId, score]) => ({ questionId: Number(questionId), score }));
      setResult(calculatePrakriti(answerArray));
    } else {
      setCurrent(c => c + 1);
    }
  };

  const handleRetake = () => { setCurrent(0); setAnswers({}); setResult(null); };

  if (result) {
    const info = doshaInfo[result.dominant];
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <div className={styles.resultPage}>
            <div className={styles.resultCard}>
              <div className={styles.resultEmoji}>{info.emoji}</div>
              <h1 className={styles.resultTitle}>{t("prakriti.result")}</h1>
              <PrakritiBadge dosha={result.dominant} size="lg" />
              <p className={styles.resultDesc}>{info.desc}</p>

              {/* Dosha Chart */}
              <div className={styles.doshaChart}>
                {["Vata", "Pitta", "Kapha"].map(d => (
                  <div key={d} className={styles.doshaBar}>
                    <div className={styles.doshaBarLabel}>{d}</div>
                    <div className={styles.doshaBarTrack}>
                      <div
                        className={styles.doshaBarFill}
                        style={{
                          width: `${result[d.toLowerCase()]}%`,
                          background: doshaInfo[d].color,
                        }}
                      />
                    </div>
                    <div className={styles.doshaBarPct}>{result[d.toLowerCase()]}%</div>
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              <div className={styles.recommendations}>
                <div className={styles.recSection}>
                  <h3>🥗 Diet Recommendations</h3>
                  <ul>
                    {info.diet.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                <div className={styles.recSection}>
                  <h3>🧘 Lifestyle Tips</h3>
                  <ul>
                    {info.lifestyle.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>

              <button className="btn btn-primary" onClick={handleRetake}>{t("prakriti.retake")}</button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <div className={styles.quizPage}>
          <div className={styles.quizCard}>
            <div className={styles.quizHeader}>
              <h1>{t("prakriti.title")}</h1>
              <p>{t("prakriti.subtitle")}</p>
            </div>
            <div className={styles.progressInfo}>
              {t("prakriti.question")} {current + 1} {t("prakriti.of")} {total}
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${((current) / total) * 100}%` }} />
            </div>
            <div className={styles.question}>
              {lang === "mr" ? q.mr : q.en}
            </div>
            <div className={styles.scaleLabels}>
              <span>{t("prakriti.notAtAll")}</span>
              <span>{t("prakriti.veryMuch")}</span>
            </div>
            <div className={styles.scaleButtons}>
              {[1, 2, 3, 4, 5].map(score => (
                <button
                  key={score}
                  className={styles.scaleBtn}
                  onClick={() => handleScore(score)}
                >
                  {score}
                </button>
              ))}
            </div>
            {current > 0 && (
              <button className="btn btn-ghost btn-sm" onClick={() => setCurrent(c => c - 1)} style={{ marginTop: "1rem" }}>
                ← {t("prakriti.previous")}
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
