import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getCourses } from "../services/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import { CardLoader } from "../components/common/Loader";
import styles from "../styles/CoursesPage.module.css";

const levelBadge = (level) => {
  const map = { beginner: "badge-beginner", intermediate: "badge-intermediate", advanced: "badge-advanced" };
  return <span className={`badge ${map[level] || "badge-blue"}`}>{level || "beginner"}</span>;
};

const CourseCardHeader = ({ course }) => {
  const categoryConfig = {
    'diet-nutrition': { emoji: '🥗', gradient: 'linear-gradient(135deg, #84cc16, #22c55e)' },
    'herbology':      { emoji: '🌿', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
    'introduction':   { emoji: '📖', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
    'default':        { emoji: '🎓', gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)' },
  };
  
  const config = categoryConfig[course.category] || categoryConfig.default;
  
  return (
    <div className={styles.courseCardHeader} 
         style={{background: config.gradient}}>
      <span className={styles.courseEmoji}>{config.emoji}</span>
    </div>
  );
};

export default function CoursesPage() {
  const { t, lang } = useLanguage();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getCourses({ lang });
        setCourses(data.courses || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [lang]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <div className={styles.header}>
          <div className="container">
            <h1>{t("courses.title")}</h1>
            <p>{t("courses.subtitle")}</p>
          </div>
        </div>
        <div className="container" style={{ padding: "2rem 1.5rem" }}>
          {loading && <CardLoader count={6} />}

          {!loading && error && (
            <div className="empty-state">
              <div className="empty-state-icon">!</div>
              <h3>{error}</h3>
            </div>
          )}

          {!loading && !error && (
            <div className={styles.coursesGrid}>
              {courses.map((course) => {
                const lessonCount = Array.isArray(course.lessons) ? course.lessons.length : 0;
                const durationLabel = course.duration ? `${course.duration} hrs` : "Self-paced";
                const isFree = !course.isPaid || (course.price || 0) === 0;
                return (
                  <div key={course.slug} className={styles.courseCard}>
                    <CourseCardHeader course={course} />
                    <div className={styles.courseContent}>
                      <div className={styles.courseTop}>
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                          {levelBadge(course.level)}
                          {isFree && <span className="badge badge-green">Free</span>}
                        </div>
                      </div>
                      <h3 className={styles.courseTitle}>{course.title}</h3>
                      <p className={styles.courseDesc}>{course.description}</p>
                      <div className={styles.courseMeta}>
                        <span>Modules: {Math.max(1, Math.ceil(lessonCount / 5))}</span>
                        <span>Lessons: {lessonCount}</span>
                        <span>Duration: {durationLabel}</span>
                      </div>
                      <div className={styles.courseStats}>
                        <span>Students: {(course.enrollmentCount || 0).toLocaleString()}</span>
                        <span>Rating: {course.rating || 0}</span>
                      </div>
                      <div className={styles.courseFooter}>
                        <div className={styles.priceWrap}>
                          {isFree ? (
                            <span className={styles.freeLabel}>Free</span>
                          ) : (
                            <span className={styles.discountedPrice}>INR {course.price}</span>
                          )}
                        </div>
                        <Link to={`/courses/${course.slug}`} className="btn btn-primary btn-sm">
                          View Course
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
