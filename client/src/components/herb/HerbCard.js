import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import styles from "../../styles/HerbCard.module.css";

export default function HerbCard({ herb }) {
  const { t, lang } = useLanguage();
  const doshaArrow = (effect) => {
    if (effect === "decreases") return <span className="dosha-arrow-down">↓</span>;
    if (effect === "increases") return <span className="dosha-arrow-up">↑</span>;
    return <span className="dosha-neutral">—</span>;
  };

  const name = herb.commonNameMr && lang === 'mr' ? herb.commonNameMr : herb.commonName || herb.slug;
  const preview = (herb.medicinalUsesMr && lang === 'mr' ? herb.medicinalUsesMr : herb.medicinalUses) || herb.preparations || t("common.noResults");

  return (
    <div className={`card card-hover ${styles.herbCard}`}>
      <div className={styles.herbHeader}>
        <div className={styles.herbEmoji}>
          {herb.imageUrl ? (
            <img src={`/artifacts/${herb.imageUrl}`} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
          ) : (
            "🌿"
          )}
        </div>
        <div className={styles.herbCategory}>
          <span className="badge badge-green">{herb.category || t("herbs.allCategories")}</span>
        </div>
      </div>
      <h3 className={styles.herbName}>{name}</h3>
      <div className={styles.botanicalName}>{herb.botanicalName}</div>
      <div className={styles.sanskritName}>{herb.sanskritName}</div>
      <div className={styles.rasaRow}>
        {(herb.rasa || []).map((rasa) => (
          <span key={rasa} className="badge badge-gold" style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem" }}>
            {rasa}
          </span>
        ))}
      </div>
      <div className={styles.doshaRow} style={{ marginTop: "1rem" }}>
        <div className="dosha-pill vata">V {doshaArrow(herb.doshaEffect?.vata)}</div>
        <div className="dosha-pill pitta">P {doshaArrow(herb.doshaEffect?.pitta)}</div>
        <div className="dosha-pill kapha">K {doshaArrow(herb.doshaEffect?.kapha)}</div>
      </div>
      <p className={styles.desc} style={{ display: "-webkit-box", WebkitLineClamp: "3", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {preview}
      </p>
      <Link to={`/herbs/${herb.slug}`} className="btn btn-outline btn-sm w-full" style={{ marginTop: "auto" }}>
        {t("herbs.viewDetails")}
      </Link>
    </div>
  );
}
