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

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newCourse,
        duration: Number(newCourse.duration),
        price: Number(newCourse.price),
        isPaid: newCourse.isPaid && Number(newCourse.price) > 0,
        paymentMethods: newCourse.isPaid && Number(newCourse.price) > 0 ? newCourse.paymentMethods : [],
      };
      const result = await createCourse(payload);
      addToast("Course created.", "success");
      setCourses((prev) => [result.course, ...prev]);
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
    } catch (err) {
      addToast(err.response?.data?.message || "Failed to create course.", "error");
    }
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

          <h2 className="section-heading">Course Management</h2>
          <form className="card" style={{ marginBottom: "1rem", display: "grid", gap: "0.75rem" }} onSubmit={handleCreateCourse}>
            <input placeholder="slug" value={newCourse.slug} onChange={(e) => setNewCourse((prev) => ({ ...prev, slug: e.target.value }))} required />
            <input placeholder="title" value={newCourse.title} onChange={(e) => setNewCourse((prev) => ({ ...prev, title: e.target.value }))} required />
            <textarea placeholder="description" value={newCourse.description} onChange={(e) => setNewCourse((prev) => ({ ...prev, description: e.target.value }))} required />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
              <select value={newCourse.level} onChange={(e) => setNewCourse((prev) => ({ ...prev, level: e.target.value }))}>
                <option value="beginner">beginner</option>
                <option value="intermediate">intermediate</option>
                <option value="advanced">advanced</option>
              </select>
              <input type="number" min="1" placeholder="duration (hrs)" value={newCourse.duration} onChange={(e) => setNewCourse((prev) => ({ ...prev, duration: e.target.value }))} />
              <input
                type="number"
                min="0"
                placeholder="price"
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
            <label>
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
              Paid course
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
            <button className="btn btn-primary" type="submit">Create Course</button>
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
                <button className="btn btn-outline btn-sm" onClick={() => handleDeleteCourse(record._id)}>
                  Delete Course
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
