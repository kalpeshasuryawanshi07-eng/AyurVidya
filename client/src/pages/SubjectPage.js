import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { getSubjectBySlug, getMyProgress } from "../services/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import Loader from "../components/common/Loader";
import styles from "../styles/SubjectPage.module.css";

const difficultyBadge = (difficulty, t) => {
  const map = {
    beginner: "badge-beginner",
    intermediate: "badge-intermediate",
    advanced: "badge-advanced",
  };
  return <span className={`badge ${map[difficulty] || "badge-blue"}`}>{t(`topic.difficulty`)}: {difficulty || "beginner"}</span>;
};

export default function SubjectPage() {
  const { subjectSlug } = useParams();
  const { lang, t } = useLanguage();
  const { user } = useAuth();
  const [subject, setSubject] = useState(null);
  const [topics, setTopics] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Fetch subject and user progress in parallel
        const [subjectData, progressData] = await Promise.all([
          getSubjectBySlug(subjectSlug, { lang }),
          user ? getMyProgress({ subjectSlug }) : Promise.resolve({ progress: [] })
        ]);

        setSubject(subjectData.subject || null);
        setTopics(subjectData.subject?.topics || []);
        setUserProgress(progressData.progress || []);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Subject not found");
        } else {
          setError(err.response?.data?.message || "Failed to load subject.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubjectData();
  }, [subjectSlug, lang, user]);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Loader />
        </main>
        <Footer />
      </div>
    );
  }

  if (!subject || error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <div className="empty-state">
          <div className="empty-state-icon">S</div>
          <h3>{error || t("common.noResults")}</h3>
          <Link to="/subjects" className="btn btn-primary mt-2">
            {t("common.back")}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <div
          className={styles.header}
          style={{ background: `linear-gradient(135deg, ${subject.colorHex || "#1B4332"}dd, ${subject.colorHex || "#1B4332"}99)` }}
        >
          <div className="container">
            <div className="breadcrumb" style={{ color: "rgba(255,255,255,0.7)" }}>
              <Link to="/" style={{ color: "rgba(255,255,255,0.7)" }}>
                {t("nav.home")}
              </Link>
              <span className="breadcrumb-sep">/</span>
              <Link to="/subjects" style={{ color: "rgba(255,255,255,0.7)" }}>
                {t("nav.subjects")}
              </Link>
              <span className="breadcrumb-sep">/</span>
              <span style={{ color: "#fff" }}>{subject.title}</span>
            </div>
            <div className={styles.headerContent}>
              <span className={styles.headerIcon}>{subject.icon || "S"}</span>
              <div>
                <h1 style={{ color: "#fff" }}>{subject.title}</h1>
                <p style={{ color: "rgba(255,255,255,0.85)", margin: 0 }}>{subject.description}</p>
                <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <span className="badge badge-blue">{t("subjects.year")} {subject.year}</span>
                  <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem" }}>{topics.length} {t("subjects.topics")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container" style={{ padding: "2rem 1.5rem" }}>
          <h2 className="section-heading">{t("subjects.topics")}</h2>
          <div className={styles.topicGrid}>
            {topics.map((topic) => {
              const completedSlugs = userProgress.completedTopicSlugs || [];
              const isCompleted = completedSlugs.includes(topic.slug);
              return (
                <Link key={topic.slug} to={`/subjects/${subjectSlug}/${topic.slug}`} className={`${styles.topicCard}${isCompleted ? ` ${styles.completedCard}` : ""}`}>
                  <div className={styles.topicNum} style={{ 
                    background: isCompleted ? "var(--color-success-light)" : `${subject.colorHex || "#1B4332"}22`, 
                    color: isCompleted ? "var(--color-success)" : subject.colorHex || "#1B4332" 
                  }}>
                    {isCompleted ? "✓" : topic.orderIndex}
                  </div>
                  <div className={styles.topicInfo}>
                    <div className={styles.topicTitle}>{topic.title}</div>
                    <div className={styles.topicMeta}>
                      {difficultyBadge(topic.difficulty, t)}
                      <span className="text-muted">{t("topic.minRead")}: {topic.estimatedMins || 10}</span>
                      {isCompleted && <span className="badge badge-green" style={{ marginLeft: "auto" }}>{t("topic.completed")}</span>}
                    </div>
                  </div>
                  <span className={styles.topicArrow}>-&gt;</span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
