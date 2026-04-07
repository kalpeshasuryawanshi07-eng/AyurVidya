import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { getMyCourses } from "../services/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProgressBar from "../components/common/ProgressBar";
import Loader from "../components/common/Loader";

export default function MyCoursesPage() {
  const { user, loading } = useAuth();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchCourses = async () => {
      try {
        setPageLoading(true);
        setError("");
        const data = await getMyCourses();
        setCourses(data.courses || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load your courses.");
      } finally {
        setPageLoading(false);
      }
    };

    fetchCourses();
  }, [user, lang]);

  if (loading || !user) return null;
  if (pageLoading) return <Loader />;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <div style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F)", padding: "3rem 0", color: "#fff" }}>
          <div className="container">
            <h1 style={{ color: "#fff" }}>{t("courses.myCourses")}</h1>
          </div>
        </div>
        <div className="container" style={{ padding: "2rem 1.5rem" }}>
          {error && (
            <div className="empty-state">
              <div className="empty-state-icon">!</div>
              <h3>{error}</h3>
            </div>
          )}
          {!error && courses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">C</div>
              <h3>{t("courses.noEnrollments")}</h3>
              <Link to="/courses" className="btn btn-primary mt-2">
                {t("courses.browseCourses")}
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {courses.map((course) => (
                <div key={course.slug} className="card">
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>C</div>
                  <h3 style={{ color: "var(--color-primary)", marginBottom: "0.5rem" }}>{course.title}</h3>
                  <ProgressBar value={course.progress || 0} label="Progress" />
                  <Link to={`/courses/${course.slug}/learn`} className="btn btn-primary btn-sm w-full" style={{ marginTop: "1rem" }}>
                    {t("courses.continueLearning")} ->
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
