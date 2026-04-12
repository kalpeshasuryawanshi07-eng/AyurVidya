import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useLanguage } from "../context/LanguageContext";
import { login, register } from "../services/api";
import Navbar from "../components/layout/Navbar";
import styles from "../styles/LoginPage.module.css";

export default function LoginPage() {
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { loginUser } = useAuth();
  const { addToast } = useToast();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (tab === "register") {
        const data = await register(form.name, form.email, form.password);
        addToast(data.message || "Registration successful! Please login.", "success");
        setTab("login");
        setForm({ name: "", email: form.email, password: "" });
      } else {
        const data = await login(form.email, form.password);
        loginUser(data.token, data.user);
        addToast(`Welcome back, ${data.user.name}!`, "success");
        navigate("/dashboard");
      }
    } catch (err) {
      const message = err.response?.data?.message || (tab === "register" ? "Registration failed" : "Login failed");
      addToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.logo}>AyurVidya</div>
          <div className={styles.tabs}>
            <button className={`${styles.tab}${tab === "login" ? ` ${styles.activeTab}` : ""}`} onClick={() => setTab("login")}>{t("auth.login")}</button>
            <button className={`${styles.tab}${tab === "register" ? ` ${styles.activeTab}` : ""}`} onClick={() => setTab("register")}>{t("auth.register")}</button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {tab === "register" && (
              <div className={styles.field}>
                <label>{t("auth.name")}</label>
                <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" required />
              </div>
            )}
            <div className={styles.field}>
              <label>{t("auth.email")}</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
            </div>
            <div className={styles.field}>
              <label>{t("auth.password")}</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="********" required minLength={6} />
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ marginTop: "0.5rem" }}>
              {loading ? "Please wait..." : tab === "login" ? t("auth.loginBtn") : t("auth.registerBtn")}
            </button>
            {tab === "login" && (
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <Link to="/forgot-password" className={styles.switchBtn}>Forgot Password?</Link>
              </div>
            )}
          </form>

          <div className={styles.hint}>
            {tab === "login" ? (
              <><span>{t("auth.noAccount")}</span> <button className={styles.switchBtn} onClick={() => setTab("register")}>{t("auth.register")}</button></>
            ) : (
              <><span>{t("auth.hasAccount")}</span> <button className={styles.switchBtn} onClick={() => setTab("login")}>{t("auth.login")}</button></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
