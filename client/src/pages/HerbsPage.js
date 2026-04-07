import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getHerbs } from "../services/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HerbCard from "../components/herb/HerbCard";
import ScrollToTop from "../components/common/ScrollToTop";
import { CardLoader } from "../components/common/Loader";
import styles from "../styles/HerbsPage.module.css";

export default function HerbsPage() {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [herbs, setHerbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHerbs = async () => {
      try {
        setLoading(true);
        setError("");
        const params = { limit: 100, lang };
        if (search.trim()) params.search = search.trim();
        if (category !== "All") params.category = category;

        const data = await getHerbs(params);
        setHerbs(data.herbs || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load herbs.");
      } finally {
        setLoading(false);
      }
    };

    fetchHerbs();
  }, [search, category, lang]);

  const categories = useMemo(() => {
    const values = new Set();
    herbs.forEach((herb) => {
      if (herb.category) values.add(herb.category);
    });
    return Array.from(values).sort((a, b) => a.localeCompare(b));
  }, [herbs]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <div className={styles.header}>
          <div className="container">
            <h1>{t("herbs.title")}</h1>
            <p>{t("herbs.subtitle")}</p>
          </div>
        </div>
        <div className="container" style={{ padding: "2rem 1.5rem" }}>
          <div className={styles.controls}>
            <div className={styles.searchWrap}>
              <span>S</span>
              <input
                type="text"
                placeholder={t("herbs.search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
              {search && (
                <button className={styles.clearBtn} onClick={() => setSearch("")}>
                  x
                </button>
              )}
            </div>
            <div className={styles.categories}>
              <button
                className={`${styles.catBtn}${category === "All" ? ` ${styles.catActive}` : ""}`}
                onClick={() => setCategory("All")}
              >
                {t("herbs.allCategories")}
              </button>
              {categories.map((value) => (
                <button
                  key={value}
                  className={`${styles.catBtn}${category === value ? ` ${styles.catActive}` : ""}`}
                  onClick={() => setCategory(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {loading && <CardLoader count={6} />}

          {!loading && error && (
            <div className="empty-state">
              <div className="empty-state-icon">!</div>
              <h3>{error}</h3>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className={styles.resultsInfo}>{t("common.viewAll")}: {herbs.length} {t("nav.herbs")}</div>

              {herbs.length > 0 ? (
                <div className={styles.grid}>
                  {herbs.map((herb) => (
                    <HerbCard key={herb._id || herb.slug} herb={herb} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">H</div>
                  <h3>{t("common.noResults")}</h3>
                  <p>{t("common.retry")}</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
