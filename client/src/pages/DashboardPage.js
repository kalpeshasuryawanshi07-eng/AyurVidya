import { useNavigate, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import {
  getMyProgress,
  getStreak,
  getBookmarks,
  getMyCourses,
  getQuizStats,
  getMyCertificates,
} from "../services/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProgressBar from "../components/common/ProgressBar";
import StreakCalendar from "../components/dashboard/StreakCalendar";
import ScrollToTop from "../components/common/ScrollToTop";
import Loader from "../components/common/Loader";
import styles from "../styles/Dashboard.module.css";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const [progress, setProgress] = useState(null);
  const [streak, setStreak] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [quizStats, setQuizStats] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        setPageLoading(true);
        setError("");
        const [progressResp, streakResp, bookmarksResp, coursesResp, quizStatsResp, certificatesResp] = await Promise.all([
          getMyProgress(),
          getStreak(),
          getBookmarks({ limit: 5 }),
          getMyCourses(),
          getQuizStats(),
          getMyCertificates(),
        ]);

        setProgress(progressResp.progress || null);
        setStreak(streakResp.streak || null);
        setBookmarks(bookmarksResp.bookmarks || []);
        setCourses(coursesResp.courses || []);
        setQuizStats(quizStatsResp.stats || null);
        setCertificates(certificatesResp.certificates || []);
      } catch (err) {
        console.error("Dashboard Load Error details from catch:", err, "Response data:", err.response?.data);
        setError(err.response?.data?.message || "Failed to load dashboard data.");
      } finally {
        setPageLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, lang]);

    const subjectProgress = useMemo(() => {
    const bySubject = progress?.bySubject || {};
    return Object.entries(bySubject).map(([slug, value]) => ({
      slug,
      title: value.title || slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      pct: value.percentage || 0,
      completed: value.completed || 0,
      total: value.total || 0,
    }));
  }, [progress]);

  if (loading || !user) return null;
  if (pageLoading) return <Loader />;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <div className={styles.dashboardGrid}>
          <div className={styles.sidebar}>
            <div className="card">
              <div className={styles.greeting}>
                {t("dashboard.greeting")}, {user.name?.split(" ")[0]}!
              </div>
              <div className={styles.streakBadge}>{(streak?.currentStreak || 0)} {t("dashboard.streak")}</div>
              <hr className="divider" />
              <div
                style={{
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                {t("dashboard.overallProgress")}
              </div>
              <ProgressBar value={progress?.percentage || 0} />
            </div>

            <div className="card">
              <h4 style={{ marginBottom: "1rem", color: "var(--color-primary)" }}>{t("nav.subjects")}</h4>
              <div className={styles.subjectProgressList}>
                {subjectProgress.map((subject) => (
                  <div key={subject.slug} className={styles.subjectProgressItem}>
                    <div className={styles.subjectProgressLabel}>
                      <span>{subject.title}</span>
                      <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>{subject.pct}%</span>
                    </div>
                    <ProgressBar value={subject.pct} showPercent={false} />
                  </div>
                ))}
                {subjectProgress.length === 0 && <span className="text-muted">{t("common.noResults")}</span>}
              </div>
            </div>

            <div className="card">
              <h4 style={{ marginBottom: "1rem", color: "var(--color-primary)" }}>{t("dashboard.bookmarks")}</h4>
              {bookmarks.length > 0 ? (
                bookmarks.map((bookmark) => (
                  <Link
                    key={bookmark._id}
                    to={`/subjects/${bookmark.topic?.subjectSlug || ""}/${bookmark.topicSlug}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.4rem 0",
                      fontSize: "0.875rem",
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                  >
                    <span>{bookmark.topic?.title || bookmark.topicSlug}</span>
                  </Link>
                ))
              ) : (
                <span className="text-muted">{t("dashboard.noBookmarks")}</span>
              )}
            </div>
          </div>

          <div className={styles.main}>
            {error && (
              <div className="card" style={{ marginBottom: "1rem" }}>
                <strong>{error}</strong>
              </div>
            )}

            <div className={styles.statsRow}>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{progress?.percentage || 0}%</div>
                <div className={styles.statLabel}>{t("dashboard.overallProgress")}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{quizStats?.averageScore || 0}%</div>
                <div className={styles.statLabel}>{t("dashboard.avgQuizScore")}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{streak?.currentStreak || 0}</div>
                <div className={styles.statLabel}>{t("dashboard.studyStreak")}</div>
              </div>
            </div>

            <div className="card">
              <div className="flex-between mb-2">
                <h4 style={{ color: "var(--color-primary)" }}>{t("dashboard.enrolledCourses")}</h4>
                <Link to="/courses" className="btn btn-ghost btn-sm">
                  Browse -&gt;
                </Link>
              </div>
              {courses.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {courses.slice(0, 3).map((course) => (
                    <div
                      key={course.slug}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.75rem",
                        background: "var(--color-surface-alt)",
                        borderRadius: "var(--radius-md)",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{course.title}</div>
                        <ProgressBar value={course.progress || 0} showPercent={false} />
                      </div>
                      <span style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "0.9rem" }}>
                        {course.progress || 0}%
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">{t("courses.noEnrollments")}</p>
              )}
            </div>

            <div className="card">
              <div className="flex-between mb-2">
                <h4 style={{ color: "var(--color-primary)" }}>My Certificates</h4>
                <Link to="/certificates" className="btn btn-ghost btn-sm">
                  View All -&gt;
                </Link>
              </div>
              {certificates.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {certificates.slice(0, 3).map((cert) => (
                    <div
                      key={cert._id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.75rem",
                        background: "var(--color-surface-alt)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <div style={{ fontSize: "2rem" }}>🎓</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                          {cert.courseId?.title || "Course"}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", marginTop: "0.25rem" }}>
                          {cert.certificateNumber} • Grade: {cert.grade}
                        </div>
                      </div>
                      <Link
                        to="/certificates"
                        className="btn btn-sm btn-primary"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">Complete courses to earn certificates</p>
              )}
            </div>

            <div className="card">
              <h4 style={{ marginBottom: "1rem", color: "var(--color-primary)" }}>{t("dashboard.studyStreak")}</h4>
              <StreakCalendar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
