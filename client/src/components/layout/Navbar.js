import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import DarkModeToggle from "../common/DarkModeToggle";
import LanguageToggle from "../common/LanguageToggle";
import SearchModal from "../common/SearchModal";
import styles from "../../styles/Navbar.module.css";

export default function Navbar() {
  const { user, logoutUser, isAdmin } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  return (
    <>
      <nav className={`${styles.navbar}${scrolled ? ` ${styles.scrolled}` : ""}`}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo} onClick={() => { setMobileMenuOpen(false); setUserMenuOpen(false); }}>
            <span className={styles.logoIcon}>🌿</span>
            <span className={styles.logoText}>AyurvedaLearn</span>
          </Link>

          <div className={styles.navLinks}>
            <NavLink to="/subjects" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
              {t("nav.subjects")}
            </NavLink>
            <NavLink to="/herbs" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
              {t("nav.herbs")}
            </NavLink>
            <NavLink to="/courses" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
              {t("nav.courses")}
            </NavLink>
            <NavLink to="/prakriti-quiz" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
              {t("nav.prakriti")}
            </NavLink>
            {user && (
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
                {t("nav.dashboard")}
              </NavLink>
            )}
            {isAdmin && (
              <NavLink to="/admin" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
                {t("nav.admin")}
              </NavLink>
            )}
          </div>

          <div className={styles.controls}>
            <button className={styles.searchBtn} onClick={() => setSearchOpen(true)} aria-label="Search">
              🔍 <span className={styles.searchHint}><kbd>Ctrl+K</kbd></span>
            </button>
            <LanguageToggle />
            <DarkModeToggle />

            {user ? (
              <div className={styles.userMenu}>
                <span className={styles.userName}>
                  {user.name}
                </span>
                <button className={styles.avatar} onClick={() => { 
                  setUserMenuOpen((open) => !open);
                  setMobileMenuOpen(false); // Close mobile menu if desktop menu opens
                }}>
                  {user.name?.[0]?.toUpperCase() || "U"}
                </button>
                {userMenuOpen && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownHeader}>
                      <strong>{user.name}</strong>
                      <span className="text-muted">{user.email}</span>
                    </div>
                    <Link to="/dashboard" className={styles.dropdownItem} onClick={() => setUserMenuOpen(false)}>
                      📊 {t("nav.dashboard")}
                    </Link>
                    <Link to="/my-courses" className={styles.dropdownItem} onClick={() => setUserMenuOpen(false)}>
                      🎓 {t("nav.myCourses")}
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className={styles.dropdownItem} onClick={() => setUserMenuOpen(false)}>
                        ⚙️ {t("nav.admin")}
                      </Link>
                    )}
                    <hr className="divider" style={{ margin: "0.5rem 0" }} />
                    <button className={styles.dropdownItem} onClick={handleLogout}>
                      🚪 {t("nav.logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">
                {t("nav.login")}
              </Link>
            )}

            <button className={styles.hamburger} onClick={() => {
              setMobileMenuOpen((open) => !open);
              setUserMenuOpen(false); // Close user menu if mobile menu opens
            }} aria-label="Menu">
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <NavLink to="/subjects" onClick={() => setMobileMenuOpen(false)}>{t("nav.subjects")}</NavLink>
            <NavLink to="/herbs" onClick={() => setMobileMenuOpen(false)}>{t("nav.herbs")}</NavLink>
            <NavLink to="/courses" onClick={() => setMobileMenuOpen(false)}>{t("nav.courses")}</NavLink>
            <NavLink to="/prakriti-quiz" onClick={() => setMobileMenuOpen(false)}>{t("nav.prakriti")}</NavLink>
            {user && <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>{t("nav.dashboard")}</NavLink>}
            {user && <NavLink to="/my-courses" onClick={() => setMobileMenuOpen(false)}>{t("nav.myCourses")}</NavLink>}
            {isAdmin && <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)}>{t("nav.admin")}</NavLink>}
            {user ? (
              <button
                onClick={handleLogout}
                style={{ textAlign: "left", padding: "0.75rem 1.5rem", color: "var(--color-error)" }}
              >
                {t("nav.logout")}
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ margin: "0.5rem 1.5rem" }}>
                {t("nav.login")}
              </Link>
            )}
          </div>
        )}
      </nav>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
