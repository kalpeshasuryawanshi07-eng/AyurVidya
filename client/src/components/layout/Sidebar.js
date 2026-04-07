import { useCallback, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { getSubjects, getSubjectBySlug, getMyProgress } from "../../services/api";
import styles from "../../styles/Sidebar.module.css";

export default function Sidebar() {
  const { subjectSlug } = useParams();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [topicsBySubject, setTopicsBySubject] = useState({});
  const [progressBySubject, setProgressBySubject] = useState({});
  const [expanded, setExpanded] = useState(subjectSlug || null);

  useEffect(() => {
    if (subjectSlug) setExpanded(subjectSlug);
  }, [subjectSlug]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects({ limit: 50 });
        setSubjects(data.subjects || []);
      } catch {
        setSubjects([]);
      }
    };

    fetchSubjects();
  }, []);

  const loadSubjectData = useCallback(async (slug) => {
    if (topicsBySubject[slug] && progressBySubject[slug]) return;
    try {
      const [subjectData, progressData] = await Promise.all([
        getSubjectBySlug(slug),
        user ? getMyProgress({ subjectSlug: slug }) : Promise.resolve({ progress: [] })
      ]);

      setTopicsBySubject((prev) => ({
        ...prev,
        [slug]: subjectData.subject?.topics || [],
      }));
      setProgressBySubject((prev) => ({
        ...prev,
        [slug]: progressData.progress || [],
      }));
    } catch {
      setTopicsBySubject((prev) => ({ ...prev, [slug]: [] }));
      setProgressBySubject((prev) => ({ ...prev, [slug]: [] }));
    }
  }, [topicsBySubject, progressBySubject, user]);

  useEffect(() => {
    if (subjectSlug) {
      loadSubjectData(subjectSlug);
    }
  }, [subjectSlug, loadSubjectData]);

  const toggle = async (slug) => {
    if (expanded === slug) {
      setExpanded(null);
      return;
    }
    setExpanded(slug);
    await loadSubjectData(slug);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <span>S</span>
        <span>{t("nav.subjects")}</span>
      </div>
      <nav>
        {subjects.map((subject) => {
          const topics = topicsBySubject[subject.slug] || [];
          const progress = progressBySubject[subject.slug] || [];
          const isOpen = expanded === subject.slug;
          return (
            <div key={subject.slug} className={styles.subjectGroup}>
              <button
                className={`${styles.subjectBtn}${subjectSlug === subject.slug ? ` ${styles.activeSubject}` : ""}`}
                onClick={() => toggle(subject.slug)}
                aria-expanded={isOpen}
              >
                <span className={styles.subjectIcon}>{subject.icon || "S"}</span>
                <span className={styles.subjectTitle}>{subject.title}</span>
                <span className={styles.chevron}>{isOpen ? "v" : ">"}</span>
              </button>
              {isOpen && topics.length > 0 && (
                <div className={styles.topicList}>
                  {topics.map((topic) => {
                    const completedSlugs = progress.completedTopicSlugs || [];
                    const isCompleted = completedSlugs.includes(topic.slug);
                    return (
                      <NavLink
                        key={topic.slug}
                        to={`/subjects/${subject.slug}/${topic.slug}`}
                        className={({ isActive }) => `${styles.topicLink}${isActive ? ` ${styles.activeTopic}` : ""}`}
                      >
                        <span className={`${styles.topicNum}${isCompleted ? ` ${styles.completedNum}` : ""}`}>
                          {isCompleted ? "✓" : topic.orderIndex}
                        </span>
                        <span className={isCompleted ? styles.completedText : ""}>{topic.title}</span>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
