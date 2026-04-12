import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  getAdminStats,
  getAdminUsers,
  getAdminCourses,
  updateUser,
  deleteUser,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/api";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Loader from "../components/common/Loader";

const PAYMENT_METHOD_OPTIONS = [
  { value: "upi", label: "UPI" },
  { value: "card", label: "Card" },
  { value: "netbanking", label: "Net Banking" },
  { value: "wallet", label: "Wallet" },
  { value: "emi", label: "EMI" },
  { value: "paylater", label: "Pay Later" },
];

export default function AdminPage() {
  const { user, loading, isAdmin } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");
  const [newCourse, setNewCourse] = useState({
    slug: "",
    title: "",
    description: "",
    level: "beginner",
    duration: 1,
    price: 0,
    isPaid: false,
    paymentMethods: [],
  });
  const [courseJson, setCourseJson] = useState("");
  const [editingCourseId, setEditingCourseId] = useState(null);


  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/");
  }, [user, loading, isAdmin, navigate]);

  const loadAdminData = async () => {
    try {
      setPageLoading(true);
      setError("");
      const [statsResp, usersResp, coursesResp] = await Promise.all([
        getAdminStats(),
        getAdminUsers({ page: 1, limit: 20 }),
        getAdminCourses({ page: 1, limit: 20 }),
      ]);
      setStats(statsResp.stats || null);
      setUsers(usersResp.users || []);
      setCourses(coursesResp.courses || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load admin data.");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin) loadAdminData();
  }, [user, isAdmin]);

  if (loading || !user || !isAdmin) return null;
  if (pageLoading) return <Loader />;

  const handleUserRoleChange = async (id, role) => {
    try {
      await updateUser(id, { role });
      addToast("User updated.", "success");
      setUsers((prev) => prev.map((item) => (item._id === id ? { ...item, role } : item)));
    } catch (err) {
      addToast(err.response?.data?.message || "Failed to update user.", "error");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      addToast("User deleted.", "success");
      setUsers((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      addToast(err.response?.data?.message || "Failed to delete user.", "error");
    }
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      let modules = [];
      if (courseJson.trim()) {
        try {
          const parsed = JSON.parse(courseJson);
          if (parsed.course_title && !newCourse.title) {
            newCourse.title = parsed.course_title;
          }
          if (parsed.description && !newCourse.description) {
            newCourse.description = parsed.description;
          }

          if (Array.isArray(parsed.modules)) {
            modules = parsed.modules.map(mod => ({
              title: mod.module_name || mod.title || "Untitled Module",
              topics: Array.isArray(mod.topics) ? mod.topics.map(topic => ({
                title: topic.topic_name || topic.title || "Untitled Topic",
                description: topic.description || "",
                definition: topic.definition || "",
                key_points: topic.key_points || [],
                summary: topic.summary || "",
                subtopics: Array.isArray(topic.subtopics) ? topic.subtopics.map(st => ({
                  title: st.title || "Untitled Subtopic",
                  content: st.content || "",
                  examples: st.examples || [],
                  applications: st.applications || [],
                  important_notes: st.important_notes || []
                })) : []
              })) : []
            }));
          } else if (Array.isArray(parsed)) {
            // Handle if they just pasted the modules array directly
            modules = parsed;
          }
        } catch (jsonErr) {
          addToast("Invalid JSON format for course content.", "error");
          return;
        }
      }

      const payload = {
        ...newCourse,
        duration: Number(newCourse.duration),
        price: Number(newCourse.price),
        isPaid: newCourse.isPaid && Number(newCourse.price) > 0,
        paymentMethods: newCourse.isPaid && Number(newCourse.price) > 0 ? newCourse.paymentMethods : [],
        modules: modules
      };

      if (editingCourseId) {
        const result = await updateCourse(editingCourseId, payload);
        addToast("Course updated successfully.", "success");
        setCourses((prev) => prev.map(c => c._id === editingCourseId ? result.course : c));
      } else {
        const result = await createCourse(payload);
        addToast("Course created successfully.", "success");
        setCourses((prev) => [result.course, ...prev]);
      }

      resetForm();
    } catch (err) {
      addToast(err.response?.data?.message || `Failed to ${editingCourseId ? 'update' : 'create'} course.`, "error");
    }
  };

  const resetForm = () => {
    setEditingCourseId(null);
    setNewCourse({
      slug: "",
      title: "",
      description: "",
      level: "beginner",
      duration: 1,
      price: 0,
      isPaid: false,
      paymentMethods: [],
    });
    setCourseJson("");
  };

  const handleEditCourse = (course) => {
    setEditingCourseId(course._id);
    setNewCourse({
      slug: course.slug || "",
      title: course.title || "",
      description: course.description || "",
      level: course.level || "beginner",
      duration: course.duration || 1,
      price: course.price || 0,
      isPaid: course.isPaid || false,
      paymentMethods: course.paymentMethods || [],
    });
    setCourseJson(course.modules ? JSON.stringify(course.modules, null, 2) : "");
    window.scrollTo({ top: document.getElementById('course-form').offsetTop - 100, behavior: 'smooth' });
  };


  const handleDeleteCourse = async (id) => {
    try {
      await deleteCourse(id);
      addToast("Course deleted.", "success");
      setCourses((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      addToast(err.response?.data?.message || "Failed to delete course.", "error");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target.result;
        // Validate JSON
        const parsed = JSON.parse(content);
        setCourseJson(JSON.stringify(parsed, null, 2));
        addToast("JSON file loaded successfully.", "info");

        // Try to auto-populate title/description if they are empty
        if (parsed.course_title) {
          setNewCourse(prev => ({ ...prev, title: parsed.course_title }));
        }
        if (parsed.description) {
          setNewCourse(prev => ({ ...prev, description: parsed.description }));
        }
        if (parsed.course_title && !newCourse.slug) {
          const generatedSlug = parsed.course_title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
          setNewCourse(prev => ({ ...prev, slug: generatedSlug }));
        }
      } catch (err) {
        addToast("Failed to parse JSON file.", "error");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <div style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F)", padding: "3rem 0", color: "#fff" }}>
          <div className="container">
            <h1 style={{ color: "#fff" }}>Admin Dashboard</h1>
            <p style={{ color: "rgba(255,255,255,0.8)", margin: 0 }}>Platform overview and management</p>
          </div>
        </div>

        <div className="container" style={{ padding: "2rem 1.5rem" }}>
          {error && (
            <div className="card" style={{ marginBottom: "1rem" }}>
              <strong>{error}</strong>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2196F3" }}>{stats?.totalUsers || 0}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-light)" }}>Total Users</div>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#4CAF50" }}>{stats?.totalTopics || 0}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-light)" }}>Total Topics</div>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#E91E63" }}>{stats?.totalEnrollments || 0}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-light)" }}>Enrollments</div>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#FF9800" }}>INR {stats?.revenue || 0}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-light)" }}>Revenue</div>
            </div>
          </div>

          <h2 className="section-heading">User Management</h2>
          <div className="card" style={{ marginBottom: "2rem", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <th style={{ textAlign: "left", padding: "0.75rem" }}>Name</th>
                  <th style={{ textAlign: "left", padding: "0.75rem" }}>Email</th>
                  <th style={{ textAlign: "left", padding: "0.75rem" }}>Role</th>
                  <th style={{ textAlign: "left", padding: "0.75rem" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((record) => (
                  <tr key={record._id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "0.75rem" }}>{record.name}</td>
                    <td style={{ padding: "0.75rem" }}>{record.email}</td>
                    <td style={{ padding: "0.75rem" }}>
                      <select value={record.role} onChange={(e) => handleUserRoleChange(record._id, e.target.value)}>
                        <option value="student">student</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td style={{ padding: "0.75rem" }}>
                      <button className="btn btn-outline btn-sm" onClick={() => handleDeleteUser(record._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="section-heading" id="course-form">
            {editingCourseId ? "Edit Course" : "Course Management"}
          </h2>
          <form className="card" style={{ marginBottom: "1rem", display: "grid", gap: "1rem" }} onSubmit={handleCourseSubmit}>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Course Slug</label>
                <input placeholder="e.g. ayurveda-fundamentals" value={newCourse.slug} onChange={(e) => setNewCourse((prev) => ({ ...prev, slug: e.target.value }))} required />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Course Title</label>
                <input placeholder="e.g. Ayurveda Fundamentals" value={newCourse.title} onChange={(e) => setNewCourse((prev) => ({ ...prev, title: e.target.value }))} required />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Description</label>
              <textarea placeholder="Briefly describe the course content..." value={newCourse.description} onChange={(e) => setNewCourse((prev) => ({ ...prev, description: e.target.value }))} required />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Level</label>
                <select value={newCourse.level} onChange={(e) => setNewCourse((prev) => ({ ...prev, level: e.target.value }))}>
                  <option value="beginner">beginner</option>
                  <option value="intermediate">intermediate</option>
                  <option value="advanced">advanced</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Duration (Hrs)</label>
                <input type="number" min="1" placeholder="e.g. 10" value={newCourse.duration} onChange={(e) => setNewCourse((prev) => ({ ...prev, duration: e.target.value }))} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Price (INR)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="0 for Free"
                  value={newCourse.price}
                  onChange={(e) =>
                    setNewCourse((prev) => {
                      const paidCourse = Number(e.target.value) > 0;
                      return {
                        ...prev,
                        price: e.target.value,
                        isPaid: paidCourse,
                        paymentMethods: paidCourse
                          ? (prev.paymentMethods.length > 0 ? prev.paymentMethods : ["upi", "card", "netbanking"])
                          : [],
                      };
                    })
                  }
                />
              </div>
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={newCourse.isPaid}
                onChange={(e) =>
                  setNewCourse((prev) => ({
                    ...prev,
                    isPaid: e.target.checked,
                    paymentMethods: e.target.checked
                      ? (prev.paymentMethods.length > 0 ? prev.paymentMethods : ["upi", "card", "netbanking"])
                      : [],
                  }))
                }
              />{" "}
              This is a paid course
            </label>
            {newCourse.isPaid && Number(newCourse.price) > 0 && (
              <div style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "0.8rem", background: "var(--color-surface-alt)" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--color-text-secondary)" }}>
                  Payment Methods
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                  {PAYMENT_METHOD_OPTIONS.map((option) => (
                    <label key={option.value} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>
                      <input
                        type="checkbox"
                        checked={newCourse.paymentMethods.includes(option.value)}
                        onChange={() =>
                          setNewCourse((prev) => {
                            const exists = prev.paymentMethods.includes(option.value);
                            return {
                              ...prev,
                              paymentMethods: exists
                                ? prev.paymentMethods.filter((method) => method !== option.value)
                                : [...prev.paymentMethods, option.value],
                            };
                          })
                        }
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            <div style={{ marginTop: "0.5rem" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>Course Content (JSON)</div>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={handleFileUpload} 
                  style={{ fontSize: "0.8rem", flex: 1 }}
                />
              </div>
              <textarea 
                placeholder='Paste course JSON here... { "course_title": "...", "modules": [...] }' 
                value={courseJson} 
                onChange={(e) => setCourseJson(e.target.value)} 
                rows="8"
                style={{ fontSize: "0.85rem", fontFamily: "monospace" }}
              />
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <button className="btn btn-primary" type="submit" style={{ flex: 1 }}>
                {editingCourseId ? "Update Course" : "Create Course"}
              </button>
              {editingCourseId && (
                <button className="btn btn-outline" type="button" onClick={resetForm}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>


          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            {courses.map((record) => (
              <div key={record._id} className="card">
                <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>{record.title}</div>
                <div className="text-muted" style={{ fontSize: "0.8rem", marginBottom: "0.5rem" }}>{record.slug}</div>
                <div style={{ fontSize: "0.85rem", marginBottom: "0.75rem" }}>Price: {record.isPaid ? `INR ${record.price}` : "Free"}</div>
                {record.isPaid && Array.isArray(record.paymentMethods) && record.paymentMethods.length > 0 && (
                  <div style={{ fontSize: "0.78rem", marginBottom: "0.75rem", color: "var(--color-text-secondary)" }}>
                    Methods: {record.paymentMethods.map((method) => (
                      PAYMENT_METHOD_OPTIONS.find((entry) => entry.value === method)?.label || method
                    )).join(", ")}
                  </div>
                )}
                 <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => handleEditCourse(record)}>
                    Edit Course
                  </button>
                  <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => handleDeleteCourse(record._id)}>
                    Delete
                  </button>
                </div>
              </div>

            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
