import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getSubjects } from "../services/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import { CardLoader } from "../components/common/Loader";
import styles from "../styles/SubjectsPage.module.css";

export default function SubjectsPage() {
  const { t, lang } = useLanguage();
  const [yearFilter, setYearFilter] = useState(0);
  const getSubjectEmoji = (slug) => {
    const map = {
      'basic-principles': '🌿',
      'dravyaguna': '🌱',
      'rachana-sharir': '🦴',
      'kriya-sharir': '❤️',
      'rog-nidan': '🔬',
      'kayachikitsa': '💊',
      'panchakarma': '🪔',
      'rasashastra': '⚗️',
      'agadtantra': '🛡️',
      'shalya-tantra': '🩺',
      'shalakya-tantra': '👁️',
      'prasuti-tantra': '🤱',
      'kaumarbhritya': '👶',
      'swasthavritta': '🧘',
    };
    return map[slug] || '📖';
  };
  const [reloadNonce, setReloadNonce] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        setError("");
        const params = { lang };
        if (yearFilter > 0) params.year = yearFilter;
        const data = await getSubjects(params);
        setSubjects(data.subjects || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load subjects.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [yearFilter, lang, reloadNonce]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <div className={styles.header}>
          <div className="container">
            <h1>{t("subjects.title")}</h1>
            <p>{t("subjects.subtitle")}</p>
          </div>
        </div>
        <div className="container" style={{ padding: "2rem 1.5rem" }}>
          <div className={styles.yearTabs}>
            {[0, 1, 2, 3, 4].map((year) => (
              <button
                key={year}
                className={`${styles.yearTab}${yearFilter === year ? ` ${styles.activeTab}` : ""}`}
                onClick={() => setYearFilter(year)}
              >
                {year === 0 ? t("subjects.allYears") : `${t("subjects.year")} ${year}`}
              </button>
            ))}
          </div>

          {loading && <CardLoader count={6} />}

          {!loading && error && (
            <div className="empty-state">
              <div className="empty-state-icon">!</div>
              <h3>{error}</h3>
              <button className="btn btn-primary mt-2" onClick={() => setReloadNonce((value) => value + 1)}>
                {t("common.retry")}
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className={styles.grid}>
              {subjects.map((subject) => (
                <Link key={subject.slug} to={`/subjects/${subject.slug}`} className={styles.card}>
                  <div className={styles.cardTop} style={{ background: `${subject.colorHex || "#1B4332"}18` }}>
                    <div className={styles.subjectIconWrapper}>
                      <span className={styles.subjectEmoji}>{getSubjectEmoji(subject.slug)}</span>
                    </div>
                    <span className="badge badge-blue" style={{ fontSize: "0.7rem" }}>
                      Year {subject.year}
                    </span>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 style={{ color: subject.colorHex || "#1B4332" }}>{subject.title}</h3>
                    <p>{subject.description}</p>
                    <div className={styles.cardFooter}>
                      <span className="text-muted">
                        {subject.topicCount || 0} {t("subjects.topics")}
                      </span>
                      <span className={styles.explore}>{t("subjects.explore")} -&gt;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
