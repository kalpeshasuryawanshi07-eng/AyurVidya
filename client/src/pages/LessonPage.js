import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/layout/Navbar";
import { getCourseBySlug, markLessonComplete, getCourseProgress, generateCertificate } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Loader from "../components/common/Loader";
import styles from "../styles/LessonPage.module.css";

/**
 * LessonPage - A premium learning experience
 * Renders course topics with rich formatting and navigation
 */
export default function LessonPage() {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();

  const getEmbedUrl = (url) => {
    if (!url) return null;
    
    // YouTube
    const ytMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|shorts\/)?([^?&"'>]+)/);
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }
    
    // Vimeo
    const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/([^?&"'>]+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    
    return url;
  };
  
  const [currentLesson, setCurrentLesson] = useState(0);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [markingComplete, setMarkingComplete] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /**
   * Transforms structured topic data into formatted markdown-like content
   */
  const formatTopicContent = (topic) => {
    let content = "";
    if (topic.definition) content += `${topic.definition}\n\n`;
    if (topic.description) content += `${topic.description}\n\n`;
    
    if (Array.isArray(topic.key_points) && topic.key_points.length > 0) {
      content += `## Key Points\n\n`;
      topic.key_points.forEach(point => {
        content += `- ${point}\n`;
      });
      content += `\n`;
    }

    if (Array.isArray(topic.subtopics) && topic.subtopics.length > 0) {
      topic.subtopics.forEach(st => {
        if (st.title) content += `### ${st.title}\n\n`;
        if (st.content) content += `${st.content}\n\n`;
        
        if (Array.isArray(st.examples) && st.examples.length > 0) {
          content += `### Examples\n\n`;
          st.examples.forEach(ex => content += `- ${ex}\n`);
          content += `\n`;
        }
        
        if (Array.isArray(st.applications) && st.applications.length > 0) {
          content += `### Applications\n\n`;
          st.applications.forEach(app => content += `- ${app}\n`);
          content += `\n`;
        }

        if (Array.isArray(st.important_notes) && st.important_notes.length > 0) {
          st.important_notes.forEach(note => content += `> ${note}\n`);
          content += `\n`;
        }
      });
    }

    if (topic.summary) {
      content += `--- \n## Summary\n\n${topic.summary}`;
    }

    return content;
  };

  /**
   * Simple inline markdown parser for bold text (**)
   */
  const renderInlineMarkdown = (text) => {
    if (!text || typeof text !== 'string') return text;
    
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.substring(2, part.length - 2)}</strong>;
      }
      return part;
    });
  };


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const data = await getCourseBySlug(courseSlug);
        const courseData = data.course || data;
        
        const hasContent = (courseData.lessons && courseData.lessons.length > 0) || 
                         (courseData.modules && courseData.modules.some(m => m.topics && m.topics.length > 0));
        
        if (!hasContent) {
          setError('This course has no content yet.');
          return;
        }
        
        setCourse(courseData);
        
        if (user) {
          try {
            const progressData = await getCourseProgress(courseSlug);
            setProgress(progressData);
            setCompletedLessons(progressData.completedLessons || []);
          } catch (err) {
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

  /**
   * Derive lessons array from either legacy flat structure or modules/topics
   */
  const lessons = useMemo(() => {
    if (!course) return [];
    
    // If we have a flat lessons array from the API
    if (Array.isArray(course.lessons) && course.lessons.length > 0) {
      return course.lessons.map(lesson => ({
        ...lesson,
        // Ensure content is generated if missing
        content: lesson.content || formatTopicContent(lesson)
      }));
    }

    // Otherwise, flatten from modules
    const flattened = [];
    if (Array.isArray(course.modules)) {

      course.modules.forEach((mod, mIdx) => {
        if (Array.isArray(mod.topics)) {
          mod.topics.forEach((topic, tIdx) => {
            flattened.push({
              ...topic,
              lessonId: topic.lessonId || `m${mIdx}-t${tIdx}`,
              content: topic.content || formatTopicContent(topic),
              duration: topic.duration || 15
            });
          });
        }
      });
    }
    return flattened;
  }, [course]);

  const currentLessonData = lessons[currentLesson];
  const isLessonCompleted = currentLessonData ? completedLessons.includes(currentLessonData.lessonId) : false;

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
      setCompletedLessons(result.completedLessons);
      setProgress(result);
      addToast('✓ Lesson marked as complete!', 'success');
      
      if (result.isCompleted) {
        addToast('🎉 Congratulations! Course completed!', 'success');
        setTimeout(() => {
          if (window.confirm('Would you like to generate your certificate now?')) {
            handleGenerateCertificate();
          }
        }, 1000);
      }
      
      if (currentLesson < lessons.length - 1) {
        setTimeout(() => setCurrentLesson(c => c + 1), 500);
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
      setTimeout(() => navigate('/certificates'), 2000);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to generate certificate', 'error');
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <div className="empty-state">
           <h3>{error}</h3>
           <button className="btn btn-primary mt-2" onClick={() => navigate(`/courses/${courseSlug}`)}>
             Back to Course
           </button>
        </div>
      </div>
    );
  }

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
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>{course?.title}</h2>
            <div className={styles.sidebarProgress}>
              <div className="progress-bar-wrap" style={{ height: "6px", background: "rgba(255,255,255,0.1)" }}>
                <div className="progress-bar-fill" style={{ width: `${progress?.progress || 0}%`, background: "var(--color-primary)" }} />
              </div>
              <div className={styles.sidebarProgressInfo}>
                <span>{progress?.progress || 0}% COMPLETE</span>
                <span>{completedLessons.length}/{lessons.length} TOPICS</span>
              </div>
            </div>
          </div>
          
          <div className={styles.courseContentLabel}>Course Content</div>
          
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
                <div className={styles.lessonNumber}>
                   {isCompleted ? "✓" : (i + 1).toString().padStart(2, '0')}
                </div>
                <div style={{ flex: 1 }}>
                   <div style={{ textDecoration: isCompleted ? 'line-through' : 'none', opacity: isCompleted ? 0.6 : 1 }}>
                      {lesson.title}
                   </div>
                   <div className="text-muted" style={{ fontSize: '0.7rem' }}>
                      {lesson.duration} min {lesson.isFree ? "• FREE" : ""}
                   </div>
                </div>
              </button>
            );
          })}

          <div style={{ padding: "2rem 1.5rem", marginTop: "auto" }}>
            <Link to={`/courses/${courseSlug}`} className="btn btn-ghost btn-sm w-full">
               ← Back to Course
            </Link>
          </div>
        </aside>

        <main className={styles.main}>
          <div className={styles.contentWrapper}>
            <div className={styles.lessonHeader}>
               <div className={styles.lessonTag}>
                  Topic {currentLesson + 1} of {lessons.length}
               </div>
               <h1 className={styles.lessonTitle}>{currentLessonData?.title}</h1>
               <div className={styles.lessonMeta}>
                  <span>⏱️ {currentLessonData?.duration} minutes reading</span>
                  {currentLessonData?.isFree && <span className="badge badge-green">FREE ACCESS</span>}
                  {isLessonCompleted && <span className="badge badge-purple">✓ COMPLETED</span>}
               </div>
            </div>

            <div className={styles.contentBody}>
               {currentLessonData?.content ? (
                  currentLessonData.content.split("\n\n").map((para, i) => {
                    const trimmed = para.trim();
                    if (!trimmed) return null;

                    if (trimmed.startsWith("# ")) return <h1 key={i}>{renderInlineMarkdown(trimmed.substring(2))}</h1>;
                    if (trimmed.startsWith("## ")) return <h2 key={i}>{renderInlineMarkdown(trimmed.substring(3))}</h2>;
                    if (trimmed.startsWith("### ")) return <h3 key={i}>{renderInlineMarkdown(trimmed.substring(4))}</h3>;

                    
                    if (trimmed.startsWith("- ") || trimmed.includes("\n- ")) {
                      const items = trimmed.split("\n").map(line => line.trim()).filter(line => line.startsWith("- "));
                      return (
                        <ul key={i}>
                          {items.map((item, j) => <li key={j}>{renderInlineMarkdown(item.substring(2))}</li>)}
                        </ul>

                      );
                    }
                    
                    if (trimmed.startsWith("> ")) {
                      const lines = trimmed.split("\n").map(l => l.trim().substring(2).trim()).filter(Boolean);
                      return (
                        <blockquote key={i}>
                          {lines.map((ln, idx) => <div key={idx} style={{ marginBottom: "0.5rem" }}>{renderInlineMarkdown(ln)}</div>)}
                        </blockquote>

                      );
                    }
                    if (trimmed === "---") return <hr key={i} className="divider" />;
                    
                    return <p key={i}>{renderInlineMarkdown(trimmed)}</p>;

                  })
               ) : (
                  <div className="empty-state">No content available for this topic.</div>
               )}
            </div>
            
            {currentLessonData?.videoUrl && (
              <div style={{ marginTop: "5rem", paddingTop: "3rem", borderTop: "1px solid var(--color-border)" }}>
                <div className={styles.videoSection}>
                  <div className={styles.videoContainer}>
                    <iframe
                      src={getEmbedUrl(currentLessonData.videoUrl)}
                      title="Lesson Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className={styles.videoIframe}
                    ></iframe>
                  </div>
                </div>
              </div>
            )}
            
            <footer className={styles.actionFooter}>
               <div className="flex flex-gap-md">
                  {currentLesson > 0 && (
                     <button className="btn btn-outline" onClick={() => setCurrentLesson(c => c - 1)} style={{ padding: "0.75rem 1.5rem" }}>
                        ← {lessons[currentLesson - 1]?.title.substring(0, 20)}...
                     </button>
                  )}
               </div>

               {user && !isLessonCompleted && (
                  <button 
                    className="btn btn-primary" 
                    onClick={handleMarkComplete}
                    disabled={markingComplete}
                    style={{ padding: "0.85rem 2.5rem", borderRadius: "var(--radius-pill)", boxShadow: "0 10px 20px rgba(16, 185, 129, 0.2)" }}
                  >
                    {markingComplete ? "Saving..." : "Mark as Complete ✓"}
                  </button>
               )}

               <div className="flex flex-gap-md" style={{ justifyContent: 'flex-end' }}>
                  {currentLesson < lessons.length - 1 && (
                     <button className="btn btn-accent" onClick={() => setCurrentLesson(c => c + 1)} style={{ padding: "0.75rem 1.5rem" }}>
                        {lessons[currentLesson + 1]?.title.substring(0, 20)}... →
                     </button>
                  )}
               </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
