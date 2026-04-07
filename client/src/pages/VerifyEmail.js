import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { verifyEmail } from "../services/api";
import { useToast } from "../context/ToastContext";
import Navbar from "../components/layout/Navbar";
import styles from "../styles/LoginPage.module.css";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState("verifying");
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const processVerification = async () => {
      try {
        await verifyEmail(token);
        setStatus("success");
        addToast("Email verified successfully!", "success");
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        setStatus("error");
        addToast("Verification failed. Link may be invalid or expired.", "error");
      }
    };
    processVerification();
  }, [token, addToast, navigate]);

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.logo}>Email Verification</div>
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            {status === "verifying" && (
              <>
                <p>Establishing wisdom. Verifying your presence...</p>
                <p>Connecting to AyurvedaLearn...</p>
              </>
            )}
            {status === "success" && (
              <>
                <p style={{ color: "#166534", fontSize: "1.2rem", fontWeight: "600" }}>Verified!</p>
                <p>Welcome to the family. Redirecting you to login in 3 seconds...</p>
                <Link to="/login" className="btn btn-primary w-full" style={{ marginTop: "20px" }}>Manual Login</Link>
              </>
            )}
            {status === "error" && (
              <>
                <p style={{ color: "#991b1b", fontWeight: "600" }}>Verification Link Invalid</p>
                <p>This may be because the link was already used or has expired (24h).</p>
                <Link to="/login" className="btn btn-primary w-full" style={{ marginTop: "20px" }}>Go to Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
