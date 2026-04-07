import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import styles from "../../styles/Footer.module.css";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>🌿 {t("nav.logo")}</div>
          <p>{t("footer.tagline")}</p>
          <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
            {t("footer.desc")}
          </p>
        </div>
        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4>{t("footer.learn")}</h4>
            <Link to="/subjects">{t("nav.subjects")}</Link>
            <Link to="/herbs">{t("nav.herbs")}</Link>
            <Link to="/courses">{t("nav.courses")}</Link>
            <Link to="/prakriti-quiz">{t("nav.prakriti")}</Link>
          </div>
          <div className={styles.linkGroup}>
            <h4>{t("nav.subjects")}</h4>
            <Link to="/subjects/basic-principles">Kriya Sharir</Link>
            <Link to="/subjects/dravyaguna-vigyan">Dravyaguna</Link>
            <Link to="/subjects/panchakarma">Panchakarma</Link>
            <Link to="/subjects/kayachikitsa">Kayachikitsa</Link>
          </div>
          <div className={styles.linkGroup}>
            <h4>{t("footer.platform")}</h4>
            <Link to="/about">{t("nav.about")}</Link>
            <Link to="/login">{t("nav.login")}</Link>
            <Link to="/dashboard">{t("nav.dashboard")}</Link>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} {t("nav.logo")}. {t("footer.copyright")} 🙏</span>
      </div>
    </footer>
  );
}
