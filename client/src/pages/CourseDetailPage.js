import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useToast } from "../context/ToastContext";
import {
  getCourseBySlug,
  getMyCourses,
  enrollInCourse,
  initiateCheckout,
  getCourseProgress,
  generateCertificate,
} from "../services/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import Loader from "../components/common/Loader";
import styles from "../styles/CourseDetailPage.module.css";

const PAYMENT_METHOD_LABELS = {
  upi: "UPI",
  card: "Card",
  netbanking: "Net Banking",
  wallet: "Wallet",
  emi: "EMI",
  paylater: "Pay Later",
};

export default function CourseDetailPage() {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { addToast } = useToast();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [generatingCert, setGeneratingCert] = useState(false);
  const [error, setError] = useState("");
  const [openModule, setOpenModule] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [enrolledSlugs, setEnrolledSlugs] = useState([]);
  const [courseProgress, setCourseProgress] = useState(null);

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");
        setImageError(false); // Reset on new course
        const data = await getCourseBySlug(courseSlug);
        setCourse(data.course || null);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Course not found");
        } else {
          setError(err.response?.data?.message || "Failed to load course.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseSlug]);

  useEffect(() => {
    if (!user) {
      setEnrolledSlugs([]);
      setCourseProgress(null);
      return;
    }

    const fetchMyCourses = async () => {
      try {
        const data = await getMyCourses();
        const slugs = (data.courses || []).map((item) => item.slug);
        setEnrolledSlugs(slugs);
      } catch {
        setEnrolledSlugs([]);
      }
    };

    const fetchProgress = async () => {
      if (!courseSlug) return;
      try {
        const progressData = await getCourseProgress(courseSlug);
        setCourseProgress(progressData);
      } catch {
        setCourseProgress(null);
      }
    };

    fetchMyCourses();
    fetchProgress();
  }, [user, courseSlug]);

  const isEnrolled = useMemo(() => {
    if (!course) return false;
    return enrolledSlugs.includes(course.slug);
  }, [course, enrolledSlugs]);

  const availablePaymentMethods = useMemo(() => {
    if (!course || !course.isPaid || (course.price || 0) === 0) return [];
    const methods = Array.isArray(course.paymentMethods) ? course.paymentMethods : [];
    return methods.length > 0 ? methods : ["upi", "card", "netbanking"];
  }, [course]);

  const modules = useMemo(() => {
    if (!course) return [];
    if (Array.isArray(course.modules) && course.modules.length > 0) {
      return course.modules;
    }

    // Legacy mapping: group flat lessons into modules of 5
    const lessons = Array.isArray(course.lessons) ? course.lessons : [];
    const legacyModules = [];
    for (let i = 0; i < lessons.length; i += 5) {
      legacyModules.push({
        title: `Module ${Math.floor(i / 5) + 1}`,
        topics: lessons.slice(i, i + 5).map((l) => ({
          title: l.title,
          description: l.duration ? `${l.duration} min` : (l.content || "").substring(0, 100) + "...",
          lessonId: l.lessonId,
        })),
      });
    }
    return legacyModules;
  }, [course]);

  useEffect(() => {
    if (availablePaymentMethods.length === 0) {
      setSelectedPaymentMethod("");
      return;
    }

    setSelectedPaymentMethod((previous) => (
      availablePaymentMethods.includes(previous) ? previous : availablePaymentMethods[0]
    ));
  }, [availablePaymentMethods]);

  const handleEnroll = async () => {
    if (!course) return;
    if (!user) {
      addToast("Please login to enroll.", "info");
      navigate("/login");
      return;
    }

    const courseId = course._id || course.id;
    if (!courseId) {
      addToast("Unable to start checkout. Missing course identifier.", "error");
      return;
    }

    setEnrolling(true);
    try {
      if (!course.isPaid || (course.price || 0) === 0) {
        await enrollInCourse(course.slug);
        addToast("Successfully enrolled.", "success");
        setEnrolledSlugs((prev) => Array.from(new Set([...prev, course.slug])));
      } else {
        await initiateCheckout(
          courseId,
          selectedPaymentMethod || availablePaymentMethods[0],
          () => {
            addToast("Payment successful and enrollment completed.", "success");
            setEnrolledSlugs((prev) => Array.from(new Set([...prev, course.slug])));
          },
          (message) => {
            const normalizedMessage = String(message || "").toLowerCase();
            if (normalizedMessage.includes("already enrolled")) {
              setEnrolledSlugs((prev) => Array.from(new Set([...prev, course.slug])));
              addToast("You are already enrolled in this course.", "info");
              return;
            }

            addToast(message || "Payment failed.", "error");
          }
        );
      }
    } catch (err) {
      const msg = err?.response?.data?.errors?.[0] || err?.response?.data?.message || "Enrollment failed.";
      if (String(msg).toLowerCase().includes("already enrolled")) {
        setEnrolledSlugs((prev) => Array.from(new Set([...prev, course.slug])));
        addToast("You are already enrolled in this course.", "info");
      } else {
        addToast(msg, "error");
      }
    } finally {
      setEnrolling(false);
    }
  };

  const handleGenerateCertificate = async () => {
    if (!user) {
      addToast("Please login to generate certificate.", "info");
      navigate("/login");
      return;
    }

    setGeneratingCert(true);
    try {
      await generateCertificate(courseSlug);
      addToast("Certificate generated successfully!", "success");
      setTimeout(() => {
        navigate("/certificates");
      }, 1500);
    } catch (err) {
      const msg = err?.response?.data?.errors?.[0] || err?.response?.data?.message || "Failed to generate certificate.";
      addToast(msg, "error");
    } finally {
      setGeneratingCert(false);
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

  if (!course || error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <div className="empty-state">
          <div className="empty-state-icon">C</div>
          <h3>{error || "Course not found"}</h3>
          <Link to="/courses" className="btn btn-primary mt-2">
            Back to Courses
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
        <div className={styles.header}>
          <div className="container">
            <div className="breadcrumb" style={{ color: "rgba(255,255,255,0.7)" }}>
              <Link to="/" style={{ color: "rgba(255,255,255,0.7)" }}>
                Home
              </Link>
              <span className="breadcrumb-sep">/</span>
              <Link to="/courses" style={{ color: "rgba(255,255,255,0.7)" }}>
                Courses
              </Link>
              <span className="breadcrumb-sep">/</span>
              <span style={{ color: "#fff" }}>{course.title}</span>
            </div>

            <div className={styles.headerGrid}>
              <div className={styles.headerHero}>
                <div className={styles.thumbnailWrap}>
                  {course.thumbnail && !imageError ? (
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", fontSize: "4rem" }}>
                      🌿
                    </div>
                  )}
                </div>
                <div className={styles.headerInfo}>
                  <h1>{course.title}</h1>
                  <p>{course.description}</p>
                  <div className={styles.headerMeta}>
                    <span>🎓 {
                      course.level === '1st Year' || course.level === 'beginner' ? t("topic.beginner") :
                      course.level === '2nd Year' || course.level === 'intermediate' ? t("topic.intermediate") :
                      course.level === '3rd Year' || course.level === 'advanced' ? t("topic.advanced") :
                      course.level || t("topic.beginner")
                    }</span>
                    <span>⏱️ {course.duration ? `${course.duration} hrs` : "Self-paced"}</span>
                    <span>👥 {(course.enrollmentCount || 0).toLocaleString()} Students</span>
                    <span>⭐ {course.rating || 4.8}</span>
                  </div>
                </div>
              </div>

              <div className={styles.sidebar}>
                <div className={styles.price}>
                  {!course.isPaid || (course.price || 0) === 0 ? "Free" : `INR ${course.price}`}
                </div>
                
                {/* Show progress if enrolled */}
                {isEnrolled && courseProgress && (
                  <div style={{ marginBottom: "1rem", padding: "1rem", background: "var(--color-surface-alt)", borderRadius: "var(--radius-sm)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text)" }}>
                        Course Progress
                      </span>
                      <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-primary)" }}>
                        {courseProgress.progress}%
                      </span>
                    </div>
                    <div style={{ 
                      width: "100%", 
                      height: "8px", 
                      background: "var(--color-surface)", 
                      borderRadius: "4px",
                      overflow: "hidden"
                    }}>
                      <div style={{ 
                        width: `${courseProgress.progress}%`, 
                        height: "100%", 
                        background: "var(--color-primary)",
                        transition: "width 0.3s ease"
                      }} />
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-light)", marginTop: "0.5rem" }}>
                      {courseProgress.completedLessons?.length || 0} of {courseProgress.totalLessons || 0} lessons completed
                    </div>
                  </div>
                )}

                {/* Certificate button - show if course is completed */}
                {isEnrolled && courseProgress?.progress === 100 ? (
                  <button 
                    className="btn btn-success w-full" 
                    onClick={handleGenerateCertificate}
                    disabled={generatingCert}
                    style={{ marginBottom: "0.75rem" }}
                  >
                    {generatingCert ? "Generating..." : "🎓 Generate Certificate"}
                  </button>
                ) : null}

                {/* Continue Learning or Enroll button */}
                {isEnrolled ? (
                  <Link to={`/courses/${courseSlug}/learn`} className="btn btn-primary w-full">
                    Continue Learning →
                  </Link>
                ) : (
                  <button className="btn btn-primary w-full" onClick={handleEnroll} disabled={enrolling}>
                    {enrolling ? "Processing..." : !course.isPaid || (course.price || 0) === 0 ? "Enroll Free" : "Enroll Now"}
                  </button>
                )}
                
                <div style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "1rem", color: "rgba(255,255,255,0.9)" }}>
                    Course Includes:
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "0.75rem", color: "rgba(255,255,255,0.7)" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span>📱</span> Access on mobile and TV
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span>♾️</span> Full lifetime access
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span>🏆</span> Certificate of completion
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span>📑</span> Comprehensive study material
                    </li>
                  </ul>
                </div>

                {!isEnrolled && course.isPaid && (course.price || 0) > 0 && availablePaymentMethods.length > 0 && (
                  <div style={{ marginTop: "1.5rem" }}>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.75rem", fontWeight: 600 }}>
                      Secure Payment via Razorpay
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {availablePaymentMethods.map((method) => {
                        const isSelected = selectedPaymentMethod === method;
                        return (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setSelectedPaymentMethod(method)}
                            style={{
                              border: isSelected ? "1px solid var(--color-primary-light)" : "1px solid rgba(255,255,255,0.1)",
                              background: isSelected ? "var(--color-primary)" : "rgba(255,255,255,0.05)",
                              color: "#fff",
                              borderRadius: "var(--radius-pill)",
                              padding: "0.4rem 0.8rem",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            {PAYMENT_METHOD_LABELS[method] || method}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.curriculumSection}>
          <div className="container">
            <h2 className="section-heading">Course Curriculum</h2>
          {modules.length === 0 && (
            <div style={{ padding: "2rem", textAlign: "center", background: "var(--color-surface-alt)", borderRadius: "var(--radius-md)", marginBottom: "1rem" }}>
              <p className="text-muted">Curriculum will be published soon.</p>
            </div>
          )}
          {modules.map((module, index) => (
            <div key={index} className={styles.moduleBox}>
              <button
                className={styles.moduleButton}
                onClick={() => setOpenModule(openModule === index ? -1 : index)}
              >
                <span>{module.title}</span>
                <span>
                  {openModule === index ? "v" : ">"} {module.topics?.length || 0} topics
                </span>
              </button>
              {openModule === index && (
                <div style={{ borderTop: "1px solid var(--color-border)" }}>
                  {(module.topics || []).map((topic, tIdx) => (
                    <div key={tIdx} className={styles.lessonRow} style={{ paddingLeft: "1.5rem" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>{topic.title}</div>
                        {topic.description && (
                          <div style={{ fontSize: "0.8rem", color: "var(--color-text-light)" }}>{topic.description}</div>
                        )}
                      </div>
                      <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                        {topic.subtopics?.length > 0 ? `${topic.subtopics.length} sections` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
