import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchContent } from "../../services/api";

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchContent({ q, limit: 5 });
        const topicItems = (data.topics || []).map((item) => ({
          type: "topic",
          title: item.title,
          sub: item.subjectSlug,
          slug: item.slug,
          subjectSlug: item.subjectSlug,
          icon: "T",
        }));
        const herbItems = (data.herbs || []).map((item) => ({
          type: "herb",
          title: item.commonName,
          sub: item.botanicalName,
          slug: item.slug,
          icon: "H",
        }));
        setResults([...topicItems, ...herbItems].slice(0, 10));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (item) => {
    if (item.type === "topic") navigate(`/subjects/${item.subjectSlug}/${item.slug}`);
    if (item.type === "herb") navigate(`/herbs/${item.slug}`);
    onClose();
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrap">
          <span style={{ fontSize: "1.1rem" }}>S</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, herbs, subjects..."
            aria-label="Search"
          />
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            X
          </button>
        </div>
        {loading && (
          <div style={{ padding: "1rem", textAlign: "center", color: "var(--color-text-light)" }}>
            Searching...
          </div>
        )}
        {!loading && results.length > 0 && (
          <div className="search-results">
            {results.map((item, i) => (
              <div key={i} className="search-result-item" onClick={() => handleSelect(item)}>
                <span className="search-result-icon">{item.icon}</span>
                <div>
                  <div className="search-result-title">{item.title}</div>
                  <div className="search-result-sub">{item.sub}</div>
                </div>
                <span className="badge badge-blue" style={{ marginLeft: "auto", fontSize: "0.65rem" }}>
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        )}
        {query && !loading && results.length === 0 && (
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-light)" }}>
            No results for "{query}"
          </div>
        )}
        <div className="search-footer">
          <span>
            <kbd>Esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}
