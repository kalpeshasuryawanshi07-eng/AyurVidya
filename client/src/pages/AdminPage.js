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

const MODULE_TITLE_KEYS = ["module_name", "module_title", "title", "name", "chapter_name", "section_name"];
const TOPIC_TITLE_KEYS = ["topic_name", "title", "name", "heading", "lesson_title", "chapter_title"];

const getStringValue = (value) => (typeof value === "string" ? value.trim() : "");

const pickFirstString = (objectValue, keys, fallback = "") => {
  if (!objectValue || typeof objectValue !== "object" || Array.isArray(objectValue)) {
    return fallback;
  }

  for (const key of keys) {
    const text = getStringValue(objectValue[key]);
    if (text) return text;
  }

  return fallback;
};

const toStringArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((entry) => {
        if (typeof entry === "string") return entry.trim();
        if (entry && typeof entry === "object") {
          return pickFirstString(entry, ["title", "name", "text", "content"], "");
        }
        return getStringValue(String(entry ?? ""));
      })
      .filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
};

const normalizeSubtopic = (subtopic, index = 0) => {
  if (typeof subtopic === "string") {
    const title = subtopic.trim();
    if (!title) return null;
    return {
      title,
      content: "",
      examples: [],
      applications: [],
      important_notes: [],
    };
  }

  if (!subtopic || typeof subtopic !== "object" || Array.isArray(subtopic)) return null;

  return {
    title: pickFirstString(subtopic, ["title", "name", "subtopic_name", "heading"], `Subtopic ${index + 1}`),
    content: pickFirstString(subtopic, ["content", "description", "definition", "text"], ""),
    examples: toStringArray(subtopic.examples),
    applications: toStringArray(subtopic.applications || subtopic.real_life_application),
    important_notes: toStringArray(subtopic.important_notes || subtopic.notes),
  };
};

const looksLikeTopicObject = (value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const hasTitle = TOPIC_TITLE_KEYS.some((key) => getStringValue(value[key]));
  const hasBody =
    Boolean(getStringValue(value.definition)) ||
    Boolean(getStringValue(value.description)) ||
    Boolean(getStringValue(value.detailed_explanation)) ||
    Boolean(getStringValue(value.summary)) ||
    Boolean(getStringValue(value.content)) ||
    (Array.isArray(value.key_points) && value.key_points.length > 0) ||
    (Array.isArray(value.key_concepts) && value.key_concepts.length > 0) ||
    (Array.isArray(value.subtopics) && value.subtopics.length > 0);

  return hasTitle && hasBody;
};

const normalizeTopic = (topic, index = 0) => {
  if (typeof topic === "string") {
    const title = topic.trim();
    if (!title) return null;
    return {
      title,
      description: "",
      definition: "",
      key_points: [],
      summary: "",
      subtopics: [],
    };
  }

  if (!topic || typeof topic !== "object" || Array.isArray(topic)) return null;

  const subtopicSource = topic.subtopics || topic.sections || topic.children || topic.items || [];

  return {
    title: pickFirstString(topic, TOPIC_TITLE_KEYS, `Topic ${index + 1}`),
    description: pickFirstString(topic, ["description", "detailed_explanation", "overview", "intro"], ""),
    definition: pickFirstString(topic, ["definition"], ""),
    key_points: toStringArray(topic.key_points || topic.key_concepts || topic.points || topic.highlights),
    summary: pickFirstString(topic, ["summary", "conclusion", "takeaway"], ""),
    subtopics: Array.isArray(subtopicSource)
      ? subtopicSource.map((subtopic, subtopicIndex) => normalizeSubtopic(subtopic, subtopicIndex)).filter(Boolean)
      : [],
  };
};

const normalizeModule = (moduleValue, index = 0) => {
  if (!moduleValue || typeof moduleValue !== "object" || Array.isArray(moduleValue)) return null;

  const topicsSource = moduleValue.topics || moduleValue.lessons || moduleValue.chapters || moduleValue.sections || moduleValue.items;
  const topics = Array.isArray(topicsSource)
    ? topicsSource.map((topic, topicIndex) => normalizeTopic(topic, topicIndex)).filter(Boolean)
    : [];

  if (topics.length === 0 && looksLikeTopicObject(moduleValue)) {
    const inlineTopic = normalizeTopic(moduleValue, 0);
    if (inlineTopic) topics.push(inlineTopic);
  }

  return {
    title: pickFirstString(moduleValue, MODULE_TITLE_KEYS, `Module ${index + 1}`),
    topics,
  };
};

const dedupeTopicsByTitle = (topics) => {
  const seen = new Set();
  return topics.filter((topic) => {
    const key = String(topic?.title || "").trim().toLowerCase();
    if (!key) return false;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const collectTopicObjects = (node, bucket, depth = 0) => {
  if (!node || depth > 10) return;

  if (Array.isArray(node)) {
    node.forEach((entry) => collectTopicObjects(entry, bucket, depth + 1));
    return;
  }

  if (typeof node !== "object") return;

  if (looksLikeTopicObject(node)) {
    bucket.push(node);
  }

  Object.values(node).forEach((value) => {
    if (value && typeof value === "object") {
      collectTopicObjects(value, bucket, depth + 1);
    }
  });
};

const extractModulesFromParsedJson = (parsed) => {
  if (!parsed) return [];

  if (Array.isArray(parsed)) {
    const asModules = parsed.map((moduleValue, index) => normalizeModule(moduleValue, index)).filter(Boolean);
    const hasTopics = asModules.some((moduleValue) => moduleValue.topics.length > 0);
    if (hasTopics) return asModules;

    const asTopics = dedupeTopicsByTitle(
      parsed.map((topicValue, index) => normalizeTopic(topicValue, index)).filter(Boolean)
    );
    return asTopics.length > 0 ? [{ title: "Imported Module", topics: asTopics }] : [];
  }

  if (typeof parsed === "object") {
    if (Array.isArray(parsed.modules)) {
      return parsed.modules.map((moduleValue, index) => normalizeModule(moduleValue, index)).filter(Boolean);
    }

    const directTopicArrays = [parsed.topics, parsed.lessons, parsed.chapters, parsed.sections].find(
      (value) => Array.isArray(value) && value.length > 0
    );

    if (directTopicArrays) {
      const topics = dedupeTopicsByTitle(
        directTopicArrays.map((topicValue, index) => normalizeTopic(topicValue, index)).filter(Boolean)
      );
      return topics.length > 0 ? [{ title: "Imported Module", topics }] : [];
    }

    const collectedTopicObjects = [];
    collectTopicObjects(parsed, collectedTopicObjects);
    const normalizedTopics = dedupeTopicsByTitle(
      collectedTopicObjects.map((topicValue, index) => normalizeTopic(topicValue, index)).filter(Boolean)
    );

    if (normalizedTopics.length > 0) {
      return [{ title: "Imported Module", topics: normalizedTopics }];
    }
  }

  return [];
};

const analyzeCourseJson = (parsed) => {
  const title = pickFirstString(parsed, ["course_title", "courseTitle", "title", "name"], "");
  const description = pickFirstString(parsed, ["description", "course_description", "summary", "about"], "");
  const modules = extractModulesFromParsedJson(parsed);

  const topicCount = modules.reduce((sum, moduleValue) => sum + (moduleValue.topics?.length || 0), 0);
  const subtopicCount = modules.reduce(
    (sum, moduleValue) =>
      sum +
      (moduleValue.topics || []).reduce(
        (topicSum, topicValue) => topicSum + (topicValue.subtopics?.length || 0),
        0
      ),
    0
  );

  return {
    title,
    description,
    modules,
    moduleCount: modules.length,
    topicCount,
    subtopicCount,
  };
};

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
  const [jsonAnalysis, setJsonAnalysis] = useState(null);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [topicVideos, setTopicVideos] = useState({}); // { "Topic title": "url" }


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
      let analyzedJson = null;

      if (courseJson.trim()) {
        try {
          const parsed = JSON.parse(courseJson);
          analyzedJson = analyzeCourseJson(parsed);
          modules = analyzedJson.modules;
          setJsonAnalysis({
            moduleCount: analyzedJson.moduleCount,
            topicCount: analyzedJson.topicCount,
            subtopicCount: analyzedJson.subtopicCount,
          });
        } catch (jsonErr) {
          addToast("Invalid JSON format for course content.", "error");
          return;
        }
      }

      const fallbackTitle = analyzedJson?.title || "";
      const fallbackDescription = analyzedJson?.description || "";
      const resolvedTitle = (newCourse.title || fallbackTitle).trim();
      const resolvedDescription = (newCourse.description || fallbackDescription).trim();

      if (!resolvedTitle || !resolvedDescription) {
        addToast("Course title and description are required.", "error");
        return;
      }

      const payload = {
        ...newCourse,
        title: resolvedTitle,
        description: resolvedDescription,
        duration: Number(newCourse.duration),
        price: Number(newCourse.price),
        isPaid: newCourse.isPaid && Number(newCourse.price) > 0,
        paymentMethods: newCourse.isPaid && Number(newCourse.price) > 0 ? newCourse.paymentMethods : [],
        modules: modules.map(mod => ({
          ...mod,
          topics: (mod.topics || []).map(topic => ({
            ...topic,
            videoUrl: topicVideos[topic.title] || topic.videoUrl || ""
          }))
        })),
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
    setJsonAnalysis(null);
    setTopicVideos({});
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
    const modules = Array.isArray(course.modules) ? course.modules : [];
    setCourseJson(modules.length > 0 ? JSON.stringify(modules, null, 2) : "");
    if (modules.length > 0) {
      const topicCount = modules.reduce((sum, moduleValue) => sum + (moduleValue.topics?.length || 0), 0);
      const subtopicCount = modules.reduce(
        (sum, moduleValue) =>
          sum +
          (moduleValue.topics || []).reduce(
            (topicSum, topicValue) => topicSum + (topicValue.subtopics?.length || 0),
            0
          ),
        0
      );
      
      const extractedVideos = {};
      modules.forEach(mod => {
        (mod.topics || []).forEach(t => {
          extractedVideos[t.title] = t.videoUrl || "";
        });
      });
      setTopicVideos(extractedVideos);

      setJsonAnalysis({
        moduleCount: modules.length,
        topicCount,
        subtopicCount,
      });
    } else {
      setJsonAnalysis(null);
    }
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
        const parsed = JSON.parse(content);
        const analyzedJson = analyzeCourseJson(parsed);

        setCourseJson(JSON.stringify(parsed, null, 2));
        setJsonAnalysis({
          moduleCount: analyzedJson.moduleCount,
          topicCount: analyzedJson.topicCount,
          subtopicCount: analyzedJson.subtopicCount,
        });

        const derivedTitle = analyzedJson.title || "";
        const derivedDescription = analyzedJson.description || "";

        setNewCourse((prev) => {
          const next = { ...prev };

          if (!next.title && derivedTitle) {
            next.title = derivedTitle;
          }

          if (!next.description && derivedDescription) {
            next.description = derivedDescription;
          }

          if (!next.slug && derivedTitle) {
            next.slug = derivedTitle
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "");
          }

          return next;
        });

        if (analyzedJson.topicCount > 0) {
          const extractedVideos = {};
          analyzedJson.modules.forEach(mod => {
            (mod.topics || []).forEach(t => {
              extractedVideos[t.title] = t.videoUrl || "";
            });
          });
          setTopicVideos(extractedVideos);

          addToast(
            `JSON analyzed: extracted ${analyzedJson.topicCount} topics from ${analyzedJson.moduleCount} module(s).`,
            "success"
          );
        } else {
          addToast("JSON loaded, but no topics were detected. You can still edit/paste content manually.", "info");
        }
      } catch (err) {
        addToast("Failed to parse JSON file.", "error");
        setJsonAnalysis(null);
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
              {jsonAnalysis && (
                <div
                  style={{
                    marginBottom: "0.6rem",
                    padding: "0.6rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--color-surface-alt)",
                    border: "1px solid var(--color-border)",
                    fontSize: "0.82rem",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Extracted {jsonAnalysis.moduleCount} module(s), {jsonAnalysis.topicCount} topic(s), and {jsonAnalysis.subtopicCount} subtopic(s).
                </div>
              )}
              <textarea 
                placeholder='Paste course JSON here... { "course_title": "...", "modules": [...] }' 
                value={courseJson} 
                onChange={(e) => {
                  setCourseJson(e.target.value);
                  setJsonAnalysis(null);
                  try {
                    const parsed = JSON.parse(e.target.value);
                    const analyzed = analyzeCourseJson(parsed);
                    setJsonAnalysis({
                      moduleCount: analyzed.moduleCount,
                      topicCount: analyzed.topicCount,
                      subtopicCount: analyzed.subtopicCount,
                    });
                    const extractedVideos = {};
                    analyzed.modules.forEach(mod => {
                      (mod.topics || []).forEach(t => {
                        extractedVideos[t.title] = t.videoUrl || "";
                      });
                    });
                    setTopicVideos(extractedVideos);
                  } catch (err) {
                    // Silently fail analysis if JSON is incomplete/invalid while typing
                  }
                }} 
                rows="8"
                style={{ fontSize: "0.85rem", fontFamily: "monospace" }}
              />
            </div>

            {jsonAnalysis && Object.keys(topicVideos).length > 0 && (
              <div style={{ marginTop: "1rem" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.6rem" }}>Topic Video URLs</div>
                <div className="card" style={{ padding: "1rem", background: "var(--color-surface-alt)", display: "grid", gap: "0.75rem" }}>
                  {Object.keys(topicVideos).map((title) => (
                    <div key={title} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem", alignItems: "center" }}>
                      <div style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--color-text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={title}>
                        {title}
                      </div>
                      <input 
                        placeholder="Paste YouTube/Vimeo URL here..." 
                        value={topicVideos[title]} 
                        onChange={(e) => setTopicVideos(prev => ({ ...prev, [title]: e.target.value }))}
                        style={{ padding: "0.4rem 0.6rem", fontSize: "0.8rem" }}
                      />
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--color-text-light)", marginTop: "0.5rem" }}>
                  These URLs will be saved automatically when you create/update the course.
                </p>
              </div>
            )}

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
