import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getHerbBySlug, getHerbs } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import Loader from "../components/common/Loader";
import styles from "../styles/HerbDetail.module.css";

const pickLocalized = (value, lang, fallback = "") => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string") return value || fallback;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.length ? value.join(", ") : fallback;
  if (typeof value === "object") {
    const localized = value[lang] ?? value.en ?? value.mr;
    if (typeof localized === "string") return localized || fallback;
  }
  return fallback;
};

const splitList = (text = "") =>
  String(text)
    .split(/[,;/]+/)
    .map((item) => item.trim())
    .filter(Boolean);

const uniqueItems = (items = []) => {
  const seen = new Set();
  return items.filter((item) => {
    const key = String(item).trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const summarizeDoshaEffect = (doshaEffect = {}) => {
  const labels = ["vata", "pitta", "kapha"]
    .map((dosha) => {
      const state = doshaEffect?.[dosha];
      if (!state || state === "neutral") return "";
      return `${dosha.charAt(0).toUpperCase()}${dosha.slice(1)} ${state}`;
    })
    .filter(Boolean);

  return labels.length > 0 ? labels.join(", ") : "supports tridosha balance";
};

const normalizeNameDetailItems = (items = [], lang) =>
  (Array.isArray(items) ? items : [])
    .map((item) => {
      const name = pickLocalized(item?.name, lang, "");
      const details = pickLocalized(item?.details, lang, "");
      if (!name && !details) return null;
      return {
        name: name || "Classical reference",
        details: details || "Traditional use context.",
      };
    })
    .filter(Boolean);

const normalizeSynonyms = (items = [], lang) =>
  (Array.isArray(items) ? items : [])
    .map((item) => {
      const name = pickLocalized(item?.name, lang, "");
      const meaning = pickLocalized(item?.meaning, lang, "");
      if (!name && !meaning) return null;
      return {
        name: name || "Traditional name",
        meaning: meaning || "Classical reference term.",
      };
    })
    .filter(Boolean);

const normalizeResearchItems = (items = [], lang) =>
  (Array.isArray(items) ? items : [])
    .map((item) => {
      const action = pickLocalized(item?.action, lang, "");
      const mechanism = pickLocalized(item?.mechanism, lang, "");
      if (!action && !mechanism) return null;
      return {
        action: action || "Observed pharmacological support",
        mechanism: mechanism || "Likely through multi-target phytochemical modulation.",
        evidenceLevel: item?.evidenceLevel || "C",
      };
    })
    .filter(Boolean);

export default function HerbDetailPage() {
  const { herbSlug } = useParams();
  const { t, lang } = useLanguage();
  const [herb, setHerb] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    const fetchHerb = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getHerbBySlug(herbSlug, { lang });
        const currentHerb = data.herb || data;
        setHerb(currentHerb);

        if (currentHerb?.relatedHerbs?.length > 0) {
          const relatedResponse = await getHerbs({ limit: 20, lang });
          const relatedList = (relatedResponse.herbs || relatedResponse || []).filter((item) =>
            currentHerb.relatedHerbs.includes(item.slug)
          );
          setRelated(relatedList.slice(0, 3));
        } else if (currentHerb?.category) {
          const relatedResponse = await getHerbs({ category: currentHerb.category, limit: 8, lang });
          const relatedList = (relatedResponse.herbs || relatedResponse || [])
            .filter((item) => item.slug !== herbSlug)
            .slice(0, 3);
          setRelated(relatedList);
        } else {
          setRelated([]);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Herb not found");
        } else {
          setError(err.response?.data?.message || "Failed to load herb details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHerb();
  }, [herbSlug, lang]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-100px 0px -50% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [loading, herbSlug]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <Loader />
      </div>
    );
  }

  if (!herb || error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <div className="empty-state">
          <div className="empty-state-icon">H</div>
          <h3>{error || t("common.noResults")}</h3>
          <Link to="/herbs" className="btn btn-primary mt-2">
            {t("common.back")}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const herbName = herb.commonName || herb.commonNameMr || herb.slug;
  const medicinalSummary =
    (lang === "mr" && herb.medicinalUsesMr ? herb.medicinalUsesMr : herb.medicinalUses) || "";
  const partsUsedText = (herb.partsUsed || []).join(", ");

  const rawIndications = Array.isArray(herb.indications)
    ? herb.indications
    : Array.isArray(herb.indications?.[lang])
      ? herb.indications[lang]
      : Array.isArray(herb.indications?.en)
        ? herb.indications.en
        : [];

  const indicationItems = uniqueItems([...rawIndications, ...splitList(medicinalSummary)]);
  const indicationDisplayItems =
    indicationItems.length > 0 ? indicationItems : ["General rejuvenative support"];

  const aboutText =
    pickLocalized(herb.about, lang) ||
    medicinalSummary ||
    `${herbName} is used in Ayurveda for broad systemic support.`;

  const pharmacodynamicsExplanation =
    pickLocalized(herb.pharmacodynamicsExplanation, lang) ||
    `${herbName} expresses ${(herb.rasa || []).join(", ") || "balanced"} rasa, ${(herb.guna || []).join(", ") || "balanced"} guna, ${herb.virya || "moderate"} virya, and ${herb.vipaka || "madhura"} vipaka. This profile aligns with traditional use in ${indicationDisplayItems.slice(0, 3).join(", ")}.`;

  const doshaKarmaText =
    pickLocalized(herb.therapeuticActions?.doshaKarma, lang) ||
    `Traditionally selected to ${summarizeDoshaEffect(herb.doshaEffect)} patterns.`;

  const dhatuKarmaText =
    pickLocalized(herb.therapeuticActions?.dhatuKarma, lang) ||
    `${herbName} supports tissue nourishment and long-term restorative care.`;

  const doshaEffectExplanation =
    pickLocalized(herb.doshaEffectExplanation, lang) ||
    `${herbName} is prescribed according to prakriti and agni, with focus on ${summarizeDoshaEffect(herb.doshaEffect)} and symptom-specific indications.`;

  const morphologyItems = [
    { id: "habit", label: lang === "mr" ? "स्वरूप (Habit)" : "Habit", val: herb.morphology?.habit },
    { id: "leaves", label: lang === "mr" ? "पत्र (Leaves)" : "Leaves", val: herb.morphology?.leaves },
    { id: "flowers", label: lang === "mr" ? "पुष्प (Flowers)" : "Flowers", val: herb.morphology?.flowers },
    { id: "seeds", label: lang === "mr" ? "बीज / फळ" : "Fruits/Seeds", val: herb.morphology?.fruits },
  ]
    .map((item) => ({ ...item, text: pickLocalized(item.val, lang, "") }))
    .filter((item) => item.text);

  const morphologyDisplayItems =
    morphologyItems.length > 0
      ? morphologyItems
      : [
          {
            id: "habit",
            label: lang === "mr" ? "स्वरूप (Habit)" : "Habit",
            text: `${herbName} is identified clinically using its ${partsUsedText || "medicinally active"} parts and characteristic dravyaguna profile.`,
          },
          {
            id: "leaves",
            label: lang === "mr" ? "पत्र (Leaves)" : "Leaves",
            text: "Leaf morphology and texture are used for field-level authentication and quality checks.",
          },
          {
            id: "flowers",
            label: lang === "mr" ? "पुष्प (Flowers)" : "Flowers",
            text: "Flowering pattern supports seasonal identification and distinction from close botanical relatives.",
          },
          {
            id: "seeds",
            label: lang === "mr" ? "बीज / फळ" : "Fruits/Seeds",
            text: "Fruit and seed characters guide crude drug authentication in pharmacognosy and dispensary practice.",
          },
        ];

  const etymologyText =
    pickLocalized(herb.vivaPrep?.etymology, lang) ||
    `${herbName} is classically described for ${indicationDisplayItems.slice(0, 3).join(", ")} with broad therapeutic scope in Ayurvedic practice.`;

  const classicalKarmaItems = normalizeNameDetailItems(herb.classicalKarmas, lang);
  const classicalKarmaDisplayItems =
    classicalKarmaItems.length > 0
      ? classicalKarmaItems
      : indicationDisplayItems.slice(0, 4).map((item) => ({
          name: item,
          details: `Classically used in clinical management of ${String(item).toLowerCase()}.`,
        }));

  const synonymItems = normalizeSynonyms(herb.synonymsDetailed, lang);
  const synonymDisplayItems =
    synonymItems.length > 0
      ? synonymItems
      : [
          { name: herbName, meaning: "Commonly used Ayurvedic and vernacular identity." },
          {
            name: herb.botanicalName || "Botanical identity",
            meaning: "Accepted botanical reference for pharmacognosy.",
          },
          ...(herb.sanskritName
            ? [{ name: herb.sanskritName, meaning: "Classical Sanskrit nomenclature." }]
            : []),
        ];

  const dosageText =
    herb.dosage ||
    "Typical dose: 3-6 g powder or 30-50 ml decoction daily in divided doses, adjusted by physician.";

  const formulationItems = normalizeNameDetailItems(herb.formulations, lang);
  const formulationDisplayItems =
    formulationItems.length > 0
      ? formulationItems
      : [
          { name: `${herbName} Churna`, details: "Powder form used for daily supportive care." },
          {
            name: `${herbName} Kwatha`,
            details: "Decoction form used for acute or kapha-dominant presentations.",
          },
          {
            name: `${herbName} Ghrita / Avaleha`,
            details: "Nutritive form for long-term rasayana use.",
          },
        ];

  const contraindicationsText =
    (lang === "mr" && herb.contraindicationsMr ? herb.contraindicationsMr : herb.contraindications) ||
    "Use cautiously in pregnancy, lactation, children, autoimmune disorders, and during long-term medication; consult a physician.";

  const modernResearchText =
    (lang === "mr" && herb.modernResearchMr ? herb.modernResearchMr : herb.modernResearch) ||
    `${herbName} has emerging evidence for antioxidant, anti-inflammatory, and adaptogenic effects. Most findings are from preclinical models and early clinical studies.`;

  const researchItems = normalizeResearchItems(herb.modernResearchDetailed, lang);
  const researchDisplayItems =
    researchItems.length > 0
      ? researchItems
      : [
          {
            action: "Anti-inflammatory and antioxidant support",
            mechanism: "Likely through reduction of oxidative stress mediators and inflammatory signaling.",
            evidenceLevel: "B",
          },
          {
            action: "Clinical adjunct role",
            mechanism: `Traditional indications and early clinical observations support use in ${indicationDisplayItems
              .slice(0, 3)
              .join(", ")
              .toLowerCase()}.`,
            evidenceLevel: "C",
          },
        ];

  const phytochemistryItems = normalizeNameDetailItems(herb.phytochemistry, lang);
  const chemicalProfileText =
    pickLocalized(herb.chemicalProfile, lang) ||
    (phytochemistryItems.length > 0
      ? phytochemistryItems.map((item) => item.name).join(", ")
      : "Reported classes include alkaloids, flavonoids, glycosides, tannins, and other bioactive phytoconstituents.");

  const drugInteractionsText =
    pickLocalized(herb.drugInteractions, lang) ||
    "May potentiate antidiabetic, antihypertensive, sedative, and anticoagulant therapies in sensitive patients. Use under supervision.";

  const habitatClimate =
    pickLocalized(herb.habitat?.climate, lang) ||
    `${herbName} grows in tropical to subtropical climates across the Indian subcontinent.`;

  const habitatSeasonality =
    pickLocalized(herb.habitat?.seasonality, lang) ||
    "Best collected in mature season according to the medicinal part used.";

  const preparationsText =
    (lang === "mr" && herb.preparationsMr ? herb.preparationsMr : herb.preparations) ||
    "Common forms: churna, kwatha, ghanavati/tablet, ghrita, avaleha, and standardized extracts.";

  const namesData = [
    { label: "English", values: herb.vernacularNames?.en },
    { label: "Marathi", values: herb.vernacularNames?.mr },
    { label: "Hindi", values: herb.vernacularNames?.hi },
  ].filter((item) => Array.isArray(item.values) && item.values.length > 0);

  const getDoshaLevel = (status) => {
    if (status === "decreases") return "85%";
    if (status === "balances") return "40%";
    if (status === "increases") return "100%";
    return "10%";
  };

  const navItems = [
    { id: "about", label: lang === "mr" ? "माहिती" : "About" },
    { id: "viva", label: lang === "mr" ? "तोंडी परीक्षा" : "Viva Prep" },
    { id: "pharmacodynamics", label: lang === "mr" ? "गुणधर्म" : "Pharmacodynamics" },
    { id: "dosha", label: lang === "mr" ? "दोष प्रभाव" : "Dosha Effect" },
    { id: "morphology", label: lang === "mr" ? "अंग रचना" : "Morphology" },
    { id: "indications", label: lang === "mr" ? "उपयोग" : "Indications" },
    { id: "usage", label: lang === "mr" ? "वापर" : "Usage & Dosage" },
    { id: "research", label: lang === "mr" ? "आधुनिक शोध" : "Modern Science" },
    { id: "safety", label: lang === "mr" ? "सावधता" : "Safety" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <div className={styles.header}>
          <div className="container">
            <div className="breadcrumb" style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1rem" }}>
              <Link to="/" style={{ color: "rgba(255,255,255,0.7)" }}>
                {t("nav.home")}
              </Link>
              <span className="breadcrumb-sep">/</span>
              <Link to="/herbs" style={{ color: "rgba(255,255,255,0.7)" }}>
                {t("nav.herbs")}
              </Link>
              <span className="breadcrumb-sep">/</span>
              <span style={{ color: "#fff" }}>{herbName}</span>
            </div>

            <div className={styles.headerContent}>
              <div className={styles.herbImageWrapper}>
                {herb.imageUrl ? (
                  <img
                    src={`/images/herbs/${herb.imageUrl}`}
                    alt={herbName}
                    className={styles.herbImage}
                    onError={(e) => {
                      e.target.style.display = "none";
                      if (e.target.nextSibling) e.target.nextSibling.style.display = "block";
                    }}
                  />
                ) : null}
                <div className={styles.herbEmoji} style={{ display: herb.imageUrl ? "none" : "block" }}>
                  🌿
                </div>
              </div>

              <div className={styles.headerInfo}>
                <h1>{herbName}</h1>
                <div className={styles.herbNames}>
                  <div className={styles.botanical}>{herb.botanicalName}</div>
                  <div className={styles.sanskrit}>{herb.sanskritName ? `Sanskrit: ${herb.sanskritName}` : ""}</div>
                </div>
                <div className={styles.badgeRow}>
                  <span className={styles.badge}>{herb.category || "General"}</span>
                  <span className={styles.badge}>{herb.family || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.layout}>
          <nav className={styles.stickyNav}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`${styles.navLink} ${activeTab === item.id ? styles.navLinkActive : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById(item.id);
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.main}>
            <section className={styles.section} id="about">
              <h2 className={styles.sectionTitle}>
                <span>🌿</span> {lang === "mr" ? "माहिती" : "About"}
              </h2>
              <div className={styles.sectionCard}>
                <p className={styles.aboutText}>{aboutText}</p>
              </div>
            </section>

            <section className={styles.section} id="viva">
              <h2 className={styles.sectionTitle}>
                <span>📜</span> {lang === "mr" ? "तोंडी परीक्षा तयारी" : "Viva Prep & Identity"}
              </h2>
              <div className={styles.vivaSection}>
                <div className={styles.academicGrid}>
                  <div className={styles.academicCol}>
                    <h4 className={styles.etymologyHeading}>{lang === "mr" ? "व्युत्पत्ती" : "Etymology"}</h4>
                    <div className={styles.manuscriptBox}>{etymologyText}</div>

                    <div style={{ marginTop: "2rem" }}>
                      <h4 className={styles.etymologyHeading}>
                        {lang === "mr" ? "कर्म / कार्य" : "Pharmacological Actions"}
                      </h4>
                      <div className={styles.karmaGrid}>
                        {classicalKarmaDisplayItems.map((item, index) => (
                          <div key={`${item.name}-${index}`} className={styles.karmaItem}>
                            <div className={styles.karmaName}>{item.name}</div>
                            <div className={styles.karmaDetail}>{item.details}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.academicCol}>
                    <h4 className={styles.etymologyHeading}>
                      {lang === "mr" ? "नाम रूप ज्ञान" : "Synonyms & Meaning"}
                    </h4>
                    <div
                      className={styles.sectionCard}
                      style={{ background: "var(--color-surface-card)", border: "1px dashed var(--color-border)" }}
                    >
                      {synonymDisplayItems.map((syn, index) => (
                        <div key={`${syn.name}-${index}`} className={styles.synonymRow}>
                          <span className={styles.synonymItem}>{syn.name}</span>
                          <span className={styles.synonymMeaning}>{syn.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section} id="pharmacodynamics">
              <h2 className={styles.sectionTitle}>
                <span>🧪</span> {lang === "mr" ? "आयुर्वेदिक गुणधर्म" : "Pharmacodynamics"}
              </h2>
              <div className={styles.sectionCard}>
                <div className={styles.propertyGrid}>
                  <div className={styles.propCard}>
                    <span className={styles.propLabel}>{t("herbs.rasa")}</span>
                    <span className={styles.propValue}>{(herb.rasa || []).join(", ") || "-"}</span>
                  </div>
                  <div className={styles.propCard}>
                    <span className={styles.propLabel}>{t("herbs.guna")}</span>
                    <span className={styles.propValue}>{(herb.guna || []).join(", ") || "-"}</span>
                  </div>
                  <div className={styles.propCard}>
                    <span className={styles.propLabel}>{t("herbs.virya")}</span>
                    <span className={styles.propValue}>{herb.virya || "-"}</span>
                  </div>
                  <div className={styles.propCard}>
                    <span className={styles.propLabel}>{t("herbs.vipaka")}</span>
                    <span className={styles.propValue}>{herb.vipaka || "-"}</span>
                  </div>
                </div>

                <div className={styles.explanationBox}>
                  <p>{pharmacodynamicsExplanation}</p>
                </div>

                <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div className={styles.morphItem}>
                    <span className={styles.label}>{lang === "mr" ? "दोष कर्म" : "Dosha Karma"}</span>
                    <span className={styles.text}>{doshaKarmaText}</span>
                  </div>
                  <div className={styles.morphItem}>
                    <span className={styles.label}>{lang === "mr" ? "धातु कर्म" : "Dhatu Karma"}</span>
                    <span className={styles.text}>{dhatuKarmaText}</span>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section} id="dosha">
              <h2 className={styles.sectionTitle}>
                <span>⚖️</span> {lang === "mr" ? "दोष प्रभाव" : "Dosha Effect"}
              </h2>
              <div className={styles.sectionCard}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3rem" }}>
                  <div className={styles.doshaGrid}>
                    {["Vata", "Pitta", "Kapha"].map((dosha) => {
                      const key = dosha.toLowerCase();
                      const status = herb.doshaEffect?.[key];

                      return (
                        <div key={dosha} className={styles.doshaItem}>
                          <span className={styles.doshaLabel}>{dosha}</span>
                          <div className={styles.doshaBarWrapper}>
                            <div
                              className={`${styles.doshaBar} ${styles[`${key}Bar`]}`}
                              style={{ width: getDoshaLevel(status) }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ paddingLeft: "2rem", borderLeft: "1px solid var(--color-border)" }}>
                    <p style={{ color: "var(--color-text-secondary)", fontSize: "1rem", lineHeight: "1.8" }}>{doshaEffectExplanation}</p>
                    <div style={{ marginTop: "1rem", fontWeight: "600", color: "var(--color-primary)" }}>
                      Main Action: {doshaKarmaText}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section} id="morphology">
              <h2 className={styles.sectionTitle}>
                <span>🌳</span> {lang === "mr" ? "अंग रचना" : "Morphology"}
              </h2>
              <div className={styles.sectionCard}>
                <div className={styles.morphologyGrid}>
                  {morphologyDisplayItems.map((item) => (
                    <div key={item.id} className={styles.morphItem}>
                      <span className={styles.label}>{item.label}</span>
                      <span className={styles.text}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className={styles.section} id="indications">
              <h2 className={styles.sectionTitle}>
                <span>🩺</span> {lang === "mr" ? "संकेत / उपयोग" : "Clinical Indications"}
              </h2>
              <div className={styles.sectionCard}>
                <div className={styles.indicationGrid}>
                  {indicationDisplayItems.map((item, index) => (
                    <span key={`${item}-${index}`} className={styles.indicationChip}>
                      {item}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border)" }}>
                  <h4 style={{ color: "var(--color-text-primary)", marginBottom: "1rem" }}>
                    {lang === "mr" ? "औषधी उपयोग" : "Therapeutic Summary"}
                  </h4>
                  <p style={{ color: "var(--color-text-secondary)", lineHeight: "1.8" }}>{medicinalSummary || aboutText}</p>
                </div>
              </div>
            </section>

            <section className={styles.section} id="usage">
              <h2 className={styles.sectionTitle}>
                <span>💊</span> {lang === "mr" ? "मात्रा आणि वापर" : "Usage & Dosage"}
              </h2>
              <div className={styles.usageLayout}>
                <div className={styles.academicCol}>
                  <div className={styles.sectionCard}>
                    <h5 className={styles.subHeading}>{lang === "mr" ? "मात्रा" : "Standard Dosage"}</h5>
                    <div className={styles.dosageValue}>{dosageText}</div>

                    <div style={{ marginTop: "2rem" }}>
                      <h5 className={styles.subHeading}>
                        {lang === "mr" ? "महत्त्वपूर्ण कल्प" : "Important Formulations"}
                      </h5>
                      <div className={styles.formulationList}>
                        {formulationDisplayItems.map((item, index) => (
                          <div key={`${item.name}-${index}`} className={styles.formulationItem}>
                            <div className={styles.formulationName}>{item.name}</div>
                            <div className={styles.formulationDetail}>{item.details}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.academicCol}>
                  <div className={styles.sectionCard} style={{ background: "var(--color-danger-bg)", borderColor: "var(--color-danger-border)" }}>
                    <h5
                      style={{
                        color: "var(--color-danger-text)",
                        textTransform: "uppercase",
                        fontSize: "0.75rem",
                        letterSpacing: "0.1em",
                        marginBottom: "1rem",
                      }}
                    >
                      {lang === "mr" ? "सावधता" : "Contraindications"}
                    </h5>
                    <p style={{ color: "var(--color-danger-text)", lineHeight: "1.6", fontWeight: "500" }}>
                      {contraindicationsText}
                    </p>
                    <div
                      style={{
                        marginTop: "1rem",
                        padding: "1rem",
                        background: "rgba(255, 255, 255, 0.12)",
                        borderRadius: "12px",
                        fontSize: "0.85rem",
                        color: "var(--color-danger-text)",
                      }}
                    >
                      {lang === "mr"
                        ? "टिप: गर्भवती महिला आणि मुलांनी वापरण्यापूर्वी डॉक्टरांचा सल्ला घ्यावा."
                        : "Note: Pregnant women and children should consult a physician before use."}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section} id="research">
              <h2 className={styles.sectionTitle}>
                <span>🔬</span> {lang === "mr" ? "आधुनिक संशोधन" : "Modern Science"}
              </h2>
              <div className={styles.sectionCard}>
                <p style={{ color: "var(--color-text-secondary)", lineHeight: "1.8", fontSize: "1rem", marginBottom: "2rem" }}>
                  {modernResearchText}
                </p>

                <div style={{ display: "grid", gap: "1rem" }}>
                  {researchDisplayItems.map((item, index) => (
                    <div key={`${item.action}-${index}`} className={styles.researchCard}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h4 style={{ margin: 0, color: "var(--color-primary-dark)" }}>{item.action}</h4>
                        <span className={styles.evidenceBadge}>Evidence Level {item.evidenceLevel}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                        <strong>Mechanism:</strong> {item.mechanism}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "2rem",
                    padding: "1.5rem",
                    background: "var(--color-surface-alt)",
                    borderRadius: "16px",
                    border: "1px solid var(--color-border)",
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "2rem" }}>🧪</div>
                  <div>
                    <h5
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-text-secondary)",
                        textTransform: "uppercase",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Active Compounds
                    </h5>
                    <p style={{ color: "var(--color-text-primary)", fontWeight: "600", margin: 0 }}>{chemicalProfileText}</p>
                  </div>
                </div>

                {phytochemistryItems.length > 0 && (
                  <div style={{ marginTop: "1.5rem" }}>
                    <h5
                      style={{
                        color: "var(--color-text-secondary)",
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        marginBottom: "0.75rem",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Phytochemistry Highlights
                    </h5>
                    <div className={styles.indicationGrid}>
                      {phytochemistryItems.map((item, index) => (
                        <span key={`${item.name}-${index}`} className={styles.indicationChip}>
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className={styles.section} id="safety">
              <h2 className={styles.sectionTitle}>
                <span>⚠️</span> {lang === "mr" ? "सुरक्षा आणि सावधता" : "Safety & Interactions"}
              </h2>
              <div className={styles.safetyBox}>
                <div className={styles.safetyTitle}>
                  <span>🛑</span> Contraindications
                </div>
                <p style={{ color: "var(--color-danger-text)", lineHeight: "1.8" }}>{contraindicationsText}</p>

                <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--color-danger-border)" }}>
                  <div className={styles.safetyTitle} style={{ color: "var(--color-text-primary)" }}>
                    <span>💊</span> Drug Interactions
                  </div>
                  <p style={{ color: "var(--color-text-secondary)" }}>{drugInteractionsText}</p>
                </div>
              </div>
            </section>
          </div>

          <aside className={styles.aside}>
            <div className={styles.asideCard}>
              <h3 className={styles.asideTitle}>🏷️ {lang === "mr" ? "इतर नावे" : "Names"}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {namesData.length > 0 ? (
                  namesData.map((item) => (
                    <div key={item.label}>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--color-text-light)",
                          textTransform: "uppercase",
                          fontWeight: 700,
                        }}
                      >
                        {item.label}
                      </span>
                      <p style={{ margin: "0.25rem 0 0 0", fontWeight: 500, color: "var(--color-text-secondary)" }}>
                        {item.values.join(", ")}
                      </p>
                    </div>
                  ))
                ) : (
                  <div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--color-text-light)",
                        textTransform: "uppercase",
                        fontWeight: 700,
                      }}
                    >
                      Primary Name
                    </span>
                    <p style={{ margin: "0.25rem 0 0 0", fontWeight: 500, color: "var(--color-text-secondary)" }}>{herbName}</p>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.asideCard}>
              <h3 className={styles.asideTitle}>📖 {lang === "mr" ? "त्वरित संदर्भ" : "At a Glance"}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--color-text-light)",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    Habitat
                  </span>
                  <p style={{ margin: "0.25rem 0 0 0", color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
                    {habitatClimate}
                  </p>
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--color-text-light)",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    Season
                  </span>
                  <p style={{ margin: "0.25rem 0 0 0", color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
                    {habitatSeasonality}
                  </p>
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--color-text-light)",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    Preparations
                  </span>
                  <p style={{ margin: "0.25rem 0 0 0", color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
                    {preparationsText}
                  </p>
                </div>
              </div>
            </div>

            {related.length > 0 && (
              <div style={{ marginTop: "1rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
                  Related Herbs
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {related.map((item) => {
                    const relatedName =
                      (lang === "mr" ? item.commonNameMr : item.commonName) || item.commonName || item.slug;

                    return (
                      <Link to={`/herbs/${item.slug}`} key={item.slug} style={{ textDecoration: "none" }}>
                        <div className={styles.asideCard} style={{ padding: "1rem", transition: "transform 0.2s" }}>
                          <div style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--color-primary)" }}>
                            {relatedName}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{item.botanicalName}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
