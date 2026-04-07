import { useLanguage } from "../../context/LanguageContext";

export default function HerbProperties({ herb }) {
  const { t } = useLanguage();
  const doshaLabel = (effect) => {
    if (effect === "decreases") return `↓ ${t("common.decreases")}`;
    if (effect === "increases") return `↑ ${t("common.increases")}`;
    return `— ${t("common.neutral")}`;
  };
  const doshaColor = (effect) => {
    if (effect === "decreases") return "var(--color-success)";
    if (effect === "increases") return "var(--color-error)";
    return "var(--color-text-light)";
  };

  return (
    <div>
      <div className="herb-property-grid">
        <div className="herb-property-item">
          <div className="herb-property-label">{t("herbs.rasa")}</div>
          <div className="herb-property-value">{herb.rasa?.join(", ") || "—"}</div>
        </div>
        <div className="herb-property-item">
          <div className="herb-property-label">{t("herbs.guna")}</div>
          <div className="herb-property-value">{herb.guna?.join(", ") || "—"}</div>
        </div>
        <div className="herb-property-item">
          <div className="herb-property-label">{t("herbs.virya")}</div>
          <div className="herb-property-value">{herb.virya || "—"}</div>
        </div>
        <div className="herb-property-item">
          <div className="herb-property-label">{t("herbs.vipaka")}</div>
          <div className="herb-property-value">{herb.vipaka || "—"}</div>
        </div>
        <div className="herb-property-item">
          <div className="herb-property-label">{t("herbs.botanicalName")}</div>
          <div className="herb-property-value" style={{ fontSize: "0.8rem" }}>{herb.botanicalName || "—"}</div>
        </div>
        <div className="herb-property-item">
          <div className="herb-property-label">{t("herbs.allCategories")}</div>
          <div className="herb-property-value">{herb.category || "—"}</div>
        </div>
      </div>
      <div className="dosha-effect">
        <div className="dosha-pill vata" style={{ color: doshaColor(herb.doshaEffect?.vata) }}>
          Vata: {doshaLabel(herb.doshaEffect?.vata)}
        </div>
        <div className="dosha-pill pitta" style={{ color: doshaColor(herb.doshaEffect?.pitta) }}>
          Pitta: {doshaLabel(herb.doshaEffect?.pitta)}
        </div>
        <div className="dosha-pill kapha" style={{ color: doshaColor(herb.doshaEffect?.kapha) }}>
          Kapha: {doshaLabel(herb.doshaEffect?.kapha)}
        </div>
      </div>
    </div>
  );
}
