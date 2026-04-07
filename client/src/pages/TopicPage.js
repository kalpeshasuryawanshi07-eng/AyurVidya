import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import {
  getTopicBySlug,
  getSubjectBySlug,
  getBookmarks,
  addBookmark,
  removeBookmark,
  getNote,
  saveNote,
  markComplete,
  getMyProgress,
} from "../services/api";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import RightTOC from "../components/layout/RightTOC";
import ShlokaBlock from "../components/topic/ShlokaBlock";
import TopicNavigation from "../components/topic/TopicNavigation";
import QuizBlock from "../components/quiz/QuizBlock";
import FlashcardDeck from "../components/quiz/FlashcardDeck";
import ScrollToTop from "../components/common/ScrollToTop";
import Loader from "../components/common/Loader";
import styles from "../styles/TopicPage.module.css";

export default function TopicPage() {
  const { subjectSlug, topicSlug } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { t, lang } = useLanguage();
  const { user } = useAuth();

  const [topic, setTopic] = useState(null);
  const [subjectName, setSubjectName] = useState("");
  const [navigation, setNavigation] = useState({ previous: null, next: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollPct(Math.min(100, Math.max(0, pct || 0)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        setLoading(true);
        setError("");
        setCompleted(false);

        // Fetch topic and subject info
        const [topicData, subjectData] = await Promise.all([
          getTopicBySlug(topicSlug, { lang }),
          getSubjectBySlug(subjectSlug, { lang })
        ]);

        setTopic(topicData.topic || null);
        setSubjectName(subjectData.subject?.title || subjectSlug);
        setNavigation(topicData.navigation || { previous: null, next: null });
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Topic not found");
        } else {
          setError(err.response?.data?.message || "Failed to load topic.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTopicData();
  }, [topicSlug, subjectSlug, lang]);

  useEffect(() => {
    if (!user || !topicSlug) {
      setBookmarked(false);
      setNoteContent("");
      return;
    }

    const fetchUserTopicState = async () => {
      try {
        const [bookmarksResp, noteResp, progressResp] = await Promise.allSettled([
          getBookmarks({ limit: 100 }),
          getNote(topicSlug),
          getMyProgress({ topicSlug })
        ]);

        if (bookmarksResp.status === "fulfilled") {
          const bookmarks = bookmarksResp.value.bookmarks || [];
          setBookmarked(bookmarks.some((item) => item.topicSlug === topicSlug));
        }

        if (noteResp.status === "fulfilled") {
          setNoteContent(noteResp.value.note?.content || "");
        } else if (noteResp.reason?.response?.status !== 404) {
          addToast("Failed to load saved note.", "error");
        }

        if (progressResp.status === "fulfilled") {
          // Check if this specific topic is marked complete
          const userProgress = progressResp.value.progress || {};
          const completedSlugs = userProgress.completedTopicSlugs || [];
          const isThisTopicComplete = completedSlugs.includes(topicSlug);
          setCompleted(isThisTopicComplete);
        }
      } catch {
        addToast("Failed to sync your topic actions.", "error");
      }
    };

    fetchUserTopicState();
  }, [user, topicSlug, addToast]);

  const requireAuth = () => {
    if (user) return true;
    addToast("Please login to continue.", "info");
    navigate("/login");
    return false;
  };

  const handleMarkComplete = async () => {
    if (!requireAuth()) return;
    try {
      await markComplete({ topicSlug, timeSpent: topic?.estimatedMins || 0 });
      setCompleted(true);
      addToast("Topic marked as complete!", "success");
    } catch (err) {
      addToast(err.response?.data?.message || "Failed to update progress.", "error");
    }
  };

  const handleBookmark = async () => {
    if (!requireAuth()) return;
    try {
      if (bookmarked) {
        await removeBookmark(topicSlug);
        setBookmarked(false);
        addToast("Bookmark removed.", "info");
      } else {
        await addBookmark(topicSlug);
        setBookmarked(true);
        addToast("Bookmarked.", "success");
      }
    } catch (err) {
      addToast(err.response?.data?.message || "Bookmark action failed.", "error");
    }
  };

  const handleSaveNote = async () => {
    if (!requireAuth()) return;
    try {
      await saveNote(topicSlug, noteContent);
      addToast("Note saved.", "success");
      setNoteOpen(false);
    } catch (err) {
      addToast(err.response?.data?.message || "Failed to save note.", "error");
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <Loader />
      </div>
    );
  }

  if (!topic || error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <div className="empty-state">
          <div className="empty-state-icon">T</div>
          <h3>{error || t("common.noResults")}</h3>
          <Link to={`/subjects/${subjectSlug}`} className="btn btn-primary mt-2">
            {t("common.back")}
          </Link>
        </div>
      </div>
    );
  }

  const summary = Array.isArray(topic.summary) ? topic.summary : [];
  const furtherReading = Array.isArray(topic.furtherReading) ? topic.furtherReading : [];
  const diffMap = { beginner: "badge-beginner", intermediate: "badge-intermediate", advanced: "badge-advanced" };

  return (
    <div>
      <div className="reading-progress-bar" style={{ width: `${scrollPct}%` }} />
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>

        <main className={styles.content}>
          <div className="breadcrumb">
            <Link to="/">{t("nav.home")}</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to="/subjects">{t("nav.subjects")}</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to={`/subjects/${subjectSlug}`}>{subjectName}</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{topic.title}</span>
          </div>

          <div className={styles.topicHeader}>
            <h1>{topic.title}</h1>
            <div className={styles.topicMeta}>
              <span className={`badge ${diffMap[topic.difficulty] || "badge-blue"}`}>
                {t(`topic.difficulty`)}: {t(`topic.${topic.difficulty || "beginner"}`)}
              </span>
              <span className="text-muted">{topic.estimatedMins || 10} {t("topic.minRead")}</span>
              {completed && <span className="badge badge-green">{t("topic.completed")}</span>}
            </div>
          </div>

          <section id="introduction" className={styles.section}>
            <h2 className="section-heading">{t("topic.introduction")}</h2>
            {(topic.introduction || "").split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>

          <section id="historical" className={styles.section}>
            <h2 className="section-heading">{t("topic.historicalContext")}</h2>
            <p>{topic.historicalContext}</p>
            {topic.shloka && <ShlokaBlock shloka={topic.shloka} />}
          </section>

          <section id="core-concept" className={styles.section}>
            <h2 className="section-heading">{t("topic.coreConcept")}</h2>
            <div dangerouslySetInnerHTML={{ __html: topic.coreExplanation || "" }} />
          </section>

          <section id="clinical" className={styles.section}>
            <h2 className="section-heading">{t("topic.clinicalApplications")}</h2>
            {(topic.clinicalApplications || "").split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>

          <section id="modern" className={styles.section}>
            <h2 className="section-heading">{t("topic.modernComparison")}</h2>
            {(topic.modernComparison || "").split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>

          <section id="summary" className={styles.section}>
            <h2 className="section-heading">{t("topic.summary")}</h2>
            <ul className={styles.summaryList}>
              {summary.map((point, index) => (
                <li key={index} className={styles.summaryItem}>
                  <span className={styles.summaryBullet}>-</span>
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.noteSection}>
            <button className="btn btn-ghost btn-sm" onClick={() => setNoteOpen((open) => !open)}>
              {noteOpen ? t("common.close") : t("topic.addNote")}
            </button>
            {noteOpen && (
              <div className={styles.noteBox}>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder={t("topic.addNote")}
                  rows={5}
                  className={styles.noteTextarea}
                />
                <button className="btn btn-primary btn-sm" onClick={handleSaveNote}>
                  {t("topic.saveNote")}
                </button>
              </div>
            )}
          </section>

          <section id="quiz" className={`${styles.section} quiz-section`}>
            <h2 className="section-heading">{t("topic.quiz")}</h2>
            <QuizBlock topicSlug={topic.slug} />
          </section>

          <section id="flashcards" className={`${styles.section} flashcards-section`}>
            <h2 className="section-heading">{t("topic.flashcards")}</h2>
            <FlashcardDeck topicSlug={topic.slug} />
          </section>

          <section id="further-reading" className={styles.section}>
            <h2 className="section-heading">{t("topic.furtherReading")}</h2>
            <ul className={styles.furtherList}>
              {furtherReading.map((item, index) => (
                <li key={index} className={styles.furtherItem}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <TopicNavigation prev={navigation.previous} next={navigation.next} subjectSlug={subjectSlug} />
        </main>

        <div className={styles.toc}>
          <RightTOC
            onMarkComplete={handleMarkComplete}
            isCompleted={completed}
            onBookmark={handleBookmark}
            isBookmarked={bookmarked}
            onPrint={() => window.print()}
          />
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}
