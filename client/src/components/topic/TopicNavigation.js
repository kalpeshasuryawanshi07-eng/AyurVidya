import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import styles from "../../styles/TopicPage.module.css";

export default function TopicNavigation({ prev, next, subjectSlug }) {
  const { t, lang } = useLanguage();

  const getTitle = (topic) => {
    if (!topic) return "";
    return lang === "mr" ? (topic.titleMr || topic.title) : topic.title;
  };

  return (
    <div className={styles.topicNav}>
      {prev ? (
        <Link to={`/subjects/${subjectSlug}/${prev.slug}`} className={`${styles.navBtn} ${styles.navPrev}`}>
          <span>←</span>
          <div>
            <div className={styles.navLabel}>{t("topic.prevLabel")}</div>
            <div className={styles.navTitle}>{getTitle(prev)}</div>
          </div>
        </Link>
      ) : <div />}
      {next ? (
        <Link to={`/subjects/${subjectSlug}/${next.slug}`} className={`${styles.navBtn} ${styles.navNext}`}>
          <div>
            <div className={styles.navLabel}>{t("topic.nextLabel")}</div>
            <div className={styles.navTitle}>{getTitle(next)}</div>
          </div>
          <span>→</span>
        </Link>
      ) : <div />}
    </div>
  );
}
