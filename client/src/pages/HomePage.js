import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getSubjects } from "../services/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import styles from "../styles/HomePage.module.css";

const stats = (t) => [
  { value: "10", label: "Subjects", labelMr: "विषय" },
  { value: "221", label: "Topics", labelMr: "विषय" },
  { value: "75+", label: "Herbs", labelMr: "औषधी" },
  { value: "5000+", label: "Students", labelMr: "विद्यार्थी" },
];

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

const features = [
  { icon: "L", titleKey: "home.feature1Title", descKey: "home.feature1Desc" },
  { icon: "B", titleKey: "home.feature2Title", descKey: "home.feature2Desc" },
  { icon: "Q", titleKey: "home.feature3Title", descKey: "home.feature3Desc" },
  { icon: "H", titleKey: "home.feature4Title", descKey: "home.feature4Desc" },
];

export default function HomePage() {
  const { t, lang } = useLanguage();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects({ limit: 10, lang });
        setSubjects((data.subjects || []).slice(0, 6));
      } catch {
        setSubjects([]);
      }
    };

    fetchSubjects();
  }, [lang]);

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>BAMS students & Practitioners</div>
          <h1 className={styles.heroTitle}>
            AyurVidya
            <span className={styles.heroTagline}>{t("home.tagline")}</span>
          </h1>
          <p className={styles.heroSubtitle}>{t("home.subtitle")}</p>
          <div className={styles.heroCta}>
            <Link to="/subjects" className="btn btn-primary btn-lg">{t("home.startLearning")}</Link>
            <Link to="/herbs" className="btn btn-outline btn-lg">{t("home.exploreHerbs")}</Link>
          </div>
          <div className={styles.heroStats}>
            {stats(t).map((stat) => (
              <div key={stat.label} className={styles.heroStat}>
                <span className={styles.heroStatValue}>{stat.value}</span>
                <span className={styles.heroStatLabel}>{lang === 'mr' ? stat.labelMr : stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroEmoji}>
            <svg viewBox="0 0 64 64" width="80" height="80" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
              <path d="M32 52 C20 40 10 30 32 12 C54 30 44 40 32 52Z"/>
              <path d="M32 52 C15 45 8 28 32 20 C56 28 49 45 32 52Z"/>
              <circle cx="32" cy="34" r="5"/>
            </svg>
          </div>
          <div className={styles.heroDecor1}>
            <svg viewBox="0 0 64 64" width="60" height="60" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
              <path d="M32 56 Q32 32 56 12 Q32 32 12 12 Q32 32 32 56 Z"/>
              <path d="M32 32 L32 56"/>
            </svg>
          </div>
          <div className={styles.heroDecor2}>
            <svg viewBox="0 0 64 64" width="70" height="70" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
              <path d="M12 24 L52 24 L48 48 Q32 56 16 48 Z"/>
              <rect x="28" y="8" width="8" height="24" rx="4"/>
            </svg>
          </div>
          <div className={styles.heroDecor3}>
            <svg viewBox="0 0 64 64" width="60" height="60" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
              <circle cx="32" cy="32" r="12"/>
              <path d="M32 8 L32 16 M32 48 L32 56 M8 32 L16 32 M48 32 L56 32 M15 15 L21 21 M43 43 L49 49 M15 49 L21 43 M43 15 L49 21"/>
            </svg>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t("home.featuredSubjects")}</h2>
          <div className={styles.subjectsGrid}>
            {subjects.map((subject) => (
              <Link key={subject.slug} to={`/subjects/${subject.slug}`} className={styles.subjectCard}>
                <div className={styles.subjectCardIcon} style={{ background: `${subject.colorHex || "#1B4332"}22`, color: subject.colorHex || "#1B4332" }}>
                  <span style={{fontSize: '1.5rem'}}>{getSubjectEmoji(subject.slug)}</span>
                </div>
                <div className={styles.subjectCardBody}>
                  <h3>{subject.title}</h3>
                  <p>{subject.description}</p>
                  <div className={styles.subjectCardMeta}>
                    <span className="badge badge-blue">Year {subject.year}</span>
                    <span className="text-muted">{subject.topicCount} topics</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-3">
            <Link to="/subjects" className="btn btn-outline">{t("home.browseSubjects")}</Link>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.featuresSection}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t("home.whyAyurVidya")}</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => {
              const iconMap = { L: '📚', B: '🌐', Q: '✏️', H: '🌿' };
              const displayIcon = iconMap[feature.icon] || feature.icon;
              return (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon} style={{fontSize:'2.5rem', lineHeight:1}}>{displayIcon}</div>
                  <h3>{t(feature.titleKey)}</h3>
                  <p>{t(feature.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.herbPreview}>
            <div className={styles.herbPreviewText}>
              <h2>{t("herbs.title")}</h2>
              <p>{t("herbs.subtitle")}</p>
              <Link to="/herbs" className="btn btn-primary">{t("home.exploreHerbs")} -&gt;</Link>
            </div>
            <div className={styles.herbPreviewCards}>
              {["Ashwagandha", "Brahmi", "Shatavari", "Guduchi", "Tulsi", "Turmeric"].map((herb) => (
                <div key={herb} className={styles.herbChip}>{herb}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container text-center">
          <h2>{t("home.startJourney")}</h2>
          <p>{t("home.startJourneyDesc")}</p>
          <div className={styles.ctaBtns}>
            <Link to="/subjects" className="btn btn-accent btn-lg">{t("home.startLearning")}</Link>
            <Link to="/prakriti-quiz" className="btn btn-outline btn-lg" style={{ borderColor: "#fff", color: "#fff" }}>
              {t("nav.prakriti")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
