import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/api";
import { useToast } from "../context/ToastContext";
import Navbar from "../components/layout/Navbar";
import styles from "../styles/LoginPage.module.css"; // Reuse login styles

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
      addToast("Reset link sent if account exists.", "success");
    } catch (err) {
      addToast("Failed to send reset link.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.logo}>Reset Password</div>
          {!sent ? (
            <form onSubmit={handleSubmit} className={styles.form}>
              <p className={styles.hintText}>Enter your email address and we'll send you a link to reset your password.</p>
              <div className={styles.field}>
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className={styles.successBlock}>
              <p>Check your email for the reset link. It expires in 15 minutes.</p>
              <Link to="/login" className="btn btn-primary w-full">Return to Login</Link>
            </div>
          )}
          <div className={styles.hint}>
            <Link to="/login" className={styles.switchBtn}>Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
