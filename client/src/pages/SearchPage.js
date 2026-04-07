import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchContent } from "../services/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Loader from "../components/common/Loader";

function highlightText(text, query) {
  if (!text || !query) return text || "";
  const parts = String(text).split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : <span key={index}>{part}</span>
  );
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") || "";
  const [query, setQuery] = useState(queryFromUrl);
  const [results, setResults] = useState({ topics: [], herbs: [], pagination: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setQuery(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    const q = queryFromUrl.trim();
    if (!q) {
      setResults({ topics: [], herbs: [], pagination: null });
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await searchContent({ q, limit: 20 });
        setResults({
          topics: data.topics || [],
          herbs: data.herbs || [],
          pagination: data.pagination || null,
        });
      } catch (err) {
        setError(err.response?.data?.message || "Search failed.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [queryFromUrl]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setSearchParams({});
      return;
    }
    setSearchParams({ q: trimmed });
  };

  const combinedResults = useMemo(() => {
    const rankedTopics = (results.topics || []).map((topic, index) => ({ type: "topic", rank: index + 1, item: topic }));
    const rankedHerbs = (results.herbs || []).map((herb, index) => ({ type: "herb", rank: index + 1, item: herb }));
    return [...rankedTopics, ...rankedHerbs];
  }, [results]);

  const total = (results.topics?.length || 0) + (results.herbs?.length || 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <div style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F)", padding: "3rem 0" }}>
          <div className="container">
            <h1 style={{ color: "#fff", marginBottom: "1.5rem" }}>Search</h1>
            <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.75rem", maxWidth: "560px" }}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search topics, herbs, subjects..."
                style={{ flex: 1, padding: "0.75rem 1.25rem", borderRadius: "var(--radius-pill)", border: "none", fontSize: "1rem", fontFamily: "var(--font-body)", outline: "none" }}
              />
              <button type="submit" className="btn btn-accent">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="container" style={{ padding: "2rem 1.5rem" }}>
          {queryFromUrl && !loading && <p className="text-muted" style={{ marginBottom: "1.5rem" }}>{total} results for "{queryFromUrl}"</p>}
          {loading && <Loader />}
          {!loading && error && (
            <div className="empty-state">
              <div className="empty-state-icon">!</div>
              <h3>{error}</h3>
            </div>
          )}

          {!loading && !error && queryFromUrl && combinedResults.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {combinedResults.map((entry, index) => (
                <Link
                  key={`${entry.type}-${entry.item.slug}-${index}`}
                  to={entry.type === "topic" ? `/subjects/${entry.item.subjectSlug}/${entry.item.slug}` : `/herbs/${entry.item.slug}`}
                  style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", background: "var(--color-surface-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", textDecoration: "none" }}
                >
                  <span style={{ fontWeight: 700, color: "var(--color-primary)", minWidth: 26 }}>#{entry.rank}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
                      {highlightText(entry.type === "topic" ? entry.item.title : entry.item.commonName, queryFromUrl)}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-light)" }}>
                      {entry.type === "topic"
                        ? highlightText(entry.item.subjectSlug || "Subject", queryFromUrl)
                        : highlightText(entry.item.botanicalName || "Herb", queryFromUrl)}
                    </div>
                  </div>
                  <span className="badge badge-blue" style={{ fontSize: "0.7rem" }}>{entry.type}</span>
                </Link>
              ))}
            </div>
          )}

          {!loading && !error && queryFromUrl && total === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">S</div>
              <h3>No results found for "{queryFromUrl}"</h3>
              <p>Try different keywords or browse subjects and herbs directly.</p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
                <Link to="/subjects" className="btn btn-primary">Browse Subjects</Link>
                <Link to="/herbs" className="btn btn-outline">Browse Herbs</Link>
              </div>
            </div>
          )}

          {!queryFromUrl && (
            <div className="empty-state">
              <div className="empty-state-icon">S</div>
              <h3>Search AyurvedaLearn</h3>
              <p>Search for topics, herbs, subjects, and more.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
