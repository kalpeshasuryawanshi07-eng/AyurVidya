import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import styles from "../../styles/HerbInteractive.module.css";

const PART_HOTSPOTS = {
  root: { top: "85%", left: "50%" },
  stem: { top: "50%", left: "45%" },
  leaf: { top: "35%", left: "30%" },
  flower: { top: "25%", left: "60%" },
  fruit: { top: "45%", left: "70%" },
  seed: { top: "55%", left: "75%" }
};

export default function HerbInteractiveIllustration({ herb }) {
  const { lang, t } = useLanguage();
  const [activePart, setActivePart] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset active part when herb changes
  useEffect(() => {
    setActivePart(null);
  }, [herb.slug]);

  if (!herb) return null;

  const handlePartClick = (part) => {
    setActivePart(activePart === part ? null : part);
  };

  const getPartData = (part) => {
    return herb.partsData?.[part] || null;
  };

  const availableParts = herb.partsUsed || [];

  return (
    <div className="interactive-guide-wrapper" style={{ marginBottom: "3rem" }}>
      <div className={styles.interactiveContainer}>
        {herb.imageUrl ? (
          <img 
            src={`/artifacts/${herb.imageUrl}`} 
            alt={herb.commonName} 
            className={styles.herbImage}
            onLoad={() => setIsLoaded(true)}
            style={{ opacity: isLoaded ? 1 : 0 }}
          />
        ) : (
          <div style={{ height: "400px", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "5rem" }}>🌿</span>
          </div>
        )}

        {/* Hotspots */}
        {availableParts.map(part => {
          const pos = PART_HOTSPOTS[part.toLowerCase()] || { top: "50%", left: "50%" };
          return (
            <div 
              key={part}
              className={`${styles.hotspot} ${activePart === part ? styles.hotspotActive : ""}`}
              style={{ top: pos.top, left: pos.left }}
              onClick={() => handlePartClick(part)}
              title={part}
            >
              <div className={styles.pulse}></div>
              <div className={styles.dot}></div>
            </div>
          );
        })}

        {/* Info Overlay */}
        <div className={`${styles.infoOverlay} ${activePart ? styles.infoOverlayActive : ""}`}>
          <button className={styles.closeBtn} onClick={() => setActivePart(null)}>&times;</button>
          {activePart && (
            <>
              <span className={styles.partName}>{activePart.charAt(0).toUpperCase() + activePart.slice(1)}</span>
              <span className={styles.benefitText}>
                {getPartData(activePart)?.benefits?.[lang] || getPartData(activePart)?.benefits?.en || t("common.noResults")}
              </span>
              <span className={styles.useText}>
                <strong>{lang === 'mr' ? 'उपयोग:' : 'Uses:'}</strong> {getPartData(activePart)?.uses?.[lang] || getPartData(activePart)?.uses?.en || "—"}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Legend / Manual Selection */}
      <div className={styles.partsLegend}>
        {availableParts.map(part => (
          <div 
            key={part} 
            className={`${styles.legendItem} ${activePart === part ? styles.legendItemActive : ""}`}
            onClick={() => handlePartClick(part)}
          >
            <div className={styles.legendDot}></div>
            {part.charAt(0).toUpperCase() + part.slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
}
