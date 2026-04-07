import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { resetPassword } from "../services/api";
import { useToast } from "../context/ToastContext";
import Navbar from "../components/layout/Navbar";
import styles from "../styles/LoginPage.module.css";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return addToast("Passwords do not match.", "error");
    if (!token) return addToast("Invalid reset link.", "error");

    setLoading(true);
    try {
      await resetPassword(token, password);
      addToast("Password reset successful!", "success");
      navigate("/login");
    } catch (err) {
      addToast("Failed to reset password. Link may be expired.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.logo}>New Password</div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label>New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                minLength={6}
              />
            </div>
            <div className={styles.field}>
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                required
                minLength={6}
              />
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
          <div className={styles.hint}>
            <Link to="/login" className={styles.switchBtn}>Cancel</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
