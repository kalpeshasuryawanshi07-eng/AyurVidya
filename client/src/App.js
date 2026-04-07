import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider }    from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider }     from "./context/AuthContext";
import { ToastProvider }    from "./context/ToastContext";

import HomePage         from "./pages/HomePage";
import SubjectsPage     from "./pages/SubjectsPage";
import SubjectPage      from "./pages/SubjectPage";
import TopicPage        from "./pages/TopicPage";
import HerbsPage        from "./pages/HerbsPage";
import HerbDetailPage   from "./pages/HerbDetailPage";
import DashboardPage    from "./pages/DashboardPage";
import CoursesPage      from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import MyCoursesPage    from "./pages/MyCoursesPage";
import LessonPage       from "./pages/LessonPage";
import PrakritiQuizPage from "./pages/PrakritiQuizPage";
import SearchPage       from "./pages/SearchPage";
import LoginPage        from "./pages/LoginPage";
import AdminPage        from "./pages/AdminPage";
import AboutPage        from "./pages/AboutPage";
import CertificatesPage from "./pages/CertificatesPage";
import ForgotPassword   from "./pages/ForgotPassword";
import ResetPassword    from "./pages/ResetPassword";
import NotFoundPage     from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/"                                    element={<HomePage />} />
                <Route path="/subjects"                            element={<SubjectsPage />} />
                <Route path="/subjects/:subjectSlug"               element={<SubjectPage />} />
                <Route path="/subjects/:subjectSlug/:topicSlug"    element={<TopicPage />} />
                <Route path="/herbs"                               element={<HerbsPage />} />
                <Route path="/herbs/:herbSlug"                     element={<HerbDetailPage />} />
                <Route path="/dashboard"                           element={<DashboardPage />} />
                <Route path="/courses"                             element={<CoursesPage />} />
                <Route path="/courses/:courseSlug"                 element={<CourseDetailPage />} />
                <Route path="/my-courses"                          element={<MyCoursesPage />} />
                <Route path="/courses/:courseSlug/learn"           element={<LessonPage />} />
                <Route path="/prakriti-quiz"                       element={<PrakritiQuizPage />} />
                <Route path="/search"                              element={<SearchPage />} />
                <Route path="/login"                               element={<LoginPage />} />
                <Route path="/admin"                               element={<AdminPage />} />
                <Route path="/certificates"                        element={<CertificatesPage />} />
                <Route path="/about"                               element={<AboutPage />} />
                <Route path="/forgot-password"                     element={<ForgotPassword />} />
                <Route path="/reset-password"                      element={<ResetPassword />} />
                <Route path="*"                                    element={<NotFoundPage />} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
