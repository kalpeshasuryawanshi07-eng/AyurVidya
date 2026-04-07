import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { getCourseBySlug, markLessonComplete, getCourseProgress, generateCertificate } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Loader from "../components/common/Loader";
import styles from "../styles/LessonPage.module.css";

export default function LessonPage() {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [markingComplete, setMarkingComplete] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const data = await getCourseBySlug(courseSlug);
        const courseData = data.course || data; // Handle both wrapped and unwrapped responses
        
        if (!courseData.lessons || courseData.lessons.length === 0) {
          setError('This course has no lessons yet.');
          return;
        }
        
        setCourse(courseData);
        
        // Fetch progress if user is logged in
        if (user) {
          try {
            const progressData = await getCourseProgress(courseSlug);
            setProgress(progressData);
            setCompletedLessons(progressData.completedLessons || []);
          } catch (err) {
            // Progress not found is okay (not enrolled yet)
            console.log('No progress found:', err);
          }
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err.response?.data?.message || 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseSlug, user]);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1, padding: "2rem" }}>
          <p style={{ color: "var(--color-error)", marginBottom: "1rem" }}>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate(`/courses/${courseSlug}`)}>
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  const lessons = course?.lessons || [];
  const currentLessonData = lessons[currentLesson];
  const isLessonCompleted = completedLessons.includes(currentLessonData?.lessonId);

  const handleMarkComplete = async () => {
    if (!user) {
      addToast('Please login to track your progress', 'error');
      navigate('/login');
      return;
    }

    if (isLessonCompleted) {
      addToast('Lesson already completed!', 'info');
      return;
    }

    try {
      setMarkingComplete(true);
      const result = await markLessonComplete(courseSlug, currentLessonData.lessonId);
      
      // Update local state
      setCompletedLessons(result.completedLessons);
      setProgress(result);
      
      // Show success message
      addToast('✓ Lesson marked as complete!', 'success');
      
      // Check if course is completed
      if (result.isCompleted) {
        addToast('🎉 Congratulations! Course completed!', 'success');
        
        // Offer to generate certificate
        setTimeout(() => {
          if (window.confirm('Would you like to generate your certificate now?')) {
            handleGenerateCertificate();
          }
        }, 1000);
      }
      
      // Auto-advance to next lesson if not last
      if (currentLesson < lessons.length - 1) {
        setTimeout(() => {
          setCurrentLesson(c => c + 1);
        }, 500);
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to mark lesson complete', 'error');
    } finally {
      setMarkingComplete(false);
    }
  };

  const handleGenerateCertificate = async () => {
    try {
      await generateCertificate(courseSlug);
      addToast('Certificate generated! View it in your certificates page.', 'success');
      setTimeout(() => {
        navigate('/certificates');
      }, 2000);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to generate certificate', 'error');
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <button 
        className={styles.mobileToggle}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span>📚 {sidebarOpen ? "Close Content" : "Course Content"}</span>
        <span>{sidebarOpen ? "✕" : "☰"}</span>
      </button>

      <div className={styles.container}>
        {/* Lesson Sidebar */}
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>{course?.title}</h2>
            <div style={{ fontSize: "0.85rem", color: "var(--color-text-light)", marginBottom: "0.75rem" }}>
              {lessons.length} Lessons • {course?.duration}
            </div>
            {progress && (
              <div style={{ marginTop: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-light)" }}>
                    PROGRESS
                  </span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)" }}>
                    {progress.progress}%
                  </span>
                </div>
                <div style={{ 
                  width: "100%", 
                  height: "6px", 
                  background: "var(--color-surface-alt)", 
                  borderRadius: "3px",
                  overflow: "hidden"
                }}>
                  <div style={{ 
                    width: `${progress.progress}%`, 
                    height: "100%", 
                    background: "var(--color-primary)",
                    transition: "width 0.3s ease"
                  }} />
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-light)", marginTop: "0.25rem" }}>
                  {completedLessons.length} of {lessons.length} completed
                </div>
              </div>
            )}
          </div>
          <div className={styles.courseContentLabel}>
            Course Content
          </div>
          {lessons.map((lesson, i) => {
            const isCompleted = completedLessons.includes(lesson.lessonId);
            return (
            <button
              key={lesson.lessonId}
              onClick={() => {
                setCurrentLesson(i);
                setSidebarOpen(false);
              }}
              className={`${styles.lessonBtn} ${currentLesson === i ? styles.lessonBtnActive : ""}`}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ 
                  fontSize: "0.75rem", 
                  color: "var(--color-text-light)",
                  minWidth: "1.5rem"
                }}>
                  {isCompleted ? '✓' : `${i + 1}.`}
                </span>
                <span style={{ textDecoration: isCompleted ? 'line-through' : 'none', opacity: isCompleted ? 0.7 : 1 }}>
                  {lesson.title}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingLeft: "2rem", fontSize: "0.75rem" }}>
                {lesson.isFree && (
                  <span style={{ 
                    padding: "0.125rem 0.5rem", 
                    background: "var(--color-success)", 
                    color: "white", 
                    borderRadius: "4px",
                    fontSize: "0.7rem",
                    fontWeight: 600
                  }}>
                    FREE
                  </span>
                )}
                {isCompleted && (
                  <span style={{ 
                    padding: "0.125rem 0.5rem", 
                    background: "var(--color-primary)", 
                    color: "white", 
                    borderRadius: "4px",
                    fontSize: "0.7rem",
                    fontWeight: 600
                  }}>
                    DONE
                  </span>
                )}
                <span style={{ color: "var(--color-text-light)" }}>{lesson.duration} min</span>
              </div>
            </button>
          );
        })}

          <div style={{ padding: "1.5rem", borderTop: "1px solid var(--color-border)", marginTop: "1rem" }}>
            <Link to={`/courses/${courseSlug}`} className="btn btn-ghost btn-sm w-full">← Back to Course</Link>
          </div>
        </aside>

        {/* Lesson Content */}
        <main className={styles.main}>
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ 
              display: "inline-block",
              padding: "0.5rem 1rem",
              background: "var(--color-surface-alt)",
              borderRadius: "8px",
              fontSize: "0.85rem",
              color: "var(--color-text-light)",
              marginBottom: "1rem"
            }}>
              Lesson {currentLesson + 1} of {lessons.length}
            </div>
            <h1 style={{ 
              color: "var(--color-primary)", 
              marginBottom: "0.5rem",
              fontSize: "2.25rem",
              fontWeight: 700,
              lineHeight: "1.2"
            }}>
              {currentLessonData?.title}
            </h1>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "1rem",
              color: "var(--color-text-light)",
              fontSize: "0.9rem"
            }}>
              <span>⏱️ {currentLessonData?.duration} minutes</span>
              {currentLessonData?.isFree && (
                <span style={{ 
                  padding: "0.25rem 0.75rem", 
                  background: "var(--color-success)", 
                  color: "white", 
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  fontWeight: 600
                }}>
                  FREE LESSON
                </span>
              )}
            </div>
          </div>

          {currentLessonData?.content ? (
            <div style={{ 
              lineHeight: "1.8", 
              color: "var(--color-text-secondary)",
              fontSize: "1.05rem"
            }}>
              {currentLessonData.content.split("\n\n").map((para, i) => {
                // Handle markdown headers
                if (para.startsWith("# ")) {
                  return <h1 key={i} style={{ fontSize: "2rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--color-primary)", lineHeight: "1.3" }}>{para.substring(2)}</h1>;
                }
                if (para.startsWith("## ")) {
                  return <h2 key={i} style={{ fontSize: "1.6rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem", color: "var(--color-text)", lineHeight: "1.3" }}>{para.substring(3)}</h2>;
                }
                if (para.startsWith("### ")) {
                  return <h3 key={i} style={{ fontSize: "1.3rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.75rem", color: "var(--color-text)", lineHeight: "1.3" }}>{para.substring(4)}</h3>;
                }
                // Handle lists
                if (para.startsWith("- ")) {
                  const items = para.split("\n").filter(line => line.startsWith("- "));
                  return (
                    <ul key={i} style={{ marginBottom: "1.5rem", paddingLeft: "2rem", listStyleType: "disc" }}>
                      {items.map((item, j) => (
                        <li key={j} style={{ marginBottom: "0.75rem", paddingLeft: "0.5rem" }}>{item.substring(2)}</li>
                      ))}
                    </ul>
                  );
                }
                // Handle horizontal rules
                if (para.trim() === "---") {
                  return <hr key={i} style={{ margin: "2rem 0", border: "none", borderTop: "1px solid var(--color-border)" }} />;
                }
                // Regular paragraphs
                return <p key={i} style={{ marginBottom: "1.25rem" }}>{para}</p>;
              })}
            </div>
          ) : (
            <p style={{ color: "var(--color-text-light)" }}>No content available for this lesson.</p>
          )}
          
          <div style={{ 
            display: "flex", 
            flexDirection: "column",
            gap: "1.5rem", 
            marginTop: "3rem", 
            paddingTop: "2rem", 
            borderTop: "2px solid var(--color-border)" 
          }}>
            {/* Mark as Complete Button */}
            {user && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button 
                  className={isLessonCompleted ? "btn btn-success" : "btn btn-primary"}
                  onClick={handleMarkComplete}
                  disabled={markingComplete || isLessonCompleted}
                  style={{ 
                    minWidth: "200px",
                    fontSize: "1rem",
                    padding: "0.75rem 2rem"
                  }}
                >
                  {markingComplete ? (
                    "Marking Complete..."
                  ) : isLessonCompleted ? (
                    "✓ Completed"
                  ) : (
                    "Mark as Complete"
                  )}
                </button>
              </div>
            )}
            
            {/* Previous/Next Navigation */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem"
            }}>
              <div>
                {currentLesson > 0 && (
                  <button 
                    className="btn btn-outline" 
                    onClick={() => setCurrentLesson(c => c - 1)}
                    style={{ minWidth: "140px" }}
                  >
                    ← Previous Lesson
                  </button>
                )}
              </div>
              <div>
                {currentLesson < lessons.length - 1 && (
                  <button 
                    className="btn btn-primary" 
                    onClick={() => setCurrentLesson(c => c + 1)}
                    style={{ minWidth: "140px" }}
                  >
                    Next Lesson →
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
