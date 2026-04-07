const { connect, disconnect } = require('./db');
const Course = require('../../models/Course');

const courses = [
  {
    title: "Foundations of Ayurveda",
    slug: "foundations-of-ayurveda",
    description: "Build the complete philosophical and theoretical base that every BAMS student needs from day one.",
    longDescription: `This course lays the intellectual bedrock of Ayurvedic science. You will explore Ayurveda not as a collection of remedies but as a complete system of thought — rooted in Vedic philosophy, refined through centuries of clinical observation, and codified in texts like Charaka Samhita and Ashtanga Hridayam. By the end, you will be able to read any classical sloka with structural understanding and map every concept back to its philosophical origin.`,
    level: "beginner",
    isFree: true,
    price: 0,
    duration: "12 hrs",
    totalLessons: 28,
    totalModules: 4,
    students: 2840,
    rating: 4.7,
    tags: ["foundations", "philosophy", "BAMS", "basics"],
    modules: [
      {
        title: "Padartha Vigyan & Philosophy",
        topics: [
          {
            title: "Sat-Asat Padartha",
            description: "Understand the six Padarthas from Vaisheshika Darshan with Ayurvedic interpretation. Includes classification of Dravya (Nitya vs Anitya) and the doctrine of causation. Explores how Ayurveda borrows and adapts from Nyaya-Vaisheshika to create its own ontological framework for clinical application."
          },
          {
            title: "Dravya, Guna, Karma",
            description: "Deep-dive into the 20 Gurvadi Gunas, how Karma (action) arises from Dravya-Guna conjunction, and how this triad forms the backbone of drug action in Ayurvedic pharmacology. Includes Samavaya and Vishesha relations."
          },
          {
            title: "Samanya-Vishesha",
            description: "The law of similarity and contrast — the fundamental principle behind every therapeutic decision in Ayurveda. Learn how Samanya increases and Vishesha decreases through food, lifestyle, and medicine, with clinical examples across all three Doshas."
          },
          {
            title: "Samsaraya & Karma-Kaarya",
            description: "Causal relationships in Ayurvedic logic. How cause (Karana) produces effect (Karya) and why the same herb can produce opposite effects depending on Prakriti, Agni, and season."
          }
        ]
      },
      {
        title: "Panchamahabhuta Siddhanta",
        topics: [
          {
            title: "5 Mahabhuta Theory",
            description: "From Akasha to Prithvi — understand how each of the five primordial elements manifests in the human body, in food, and in disease. Learn Tanmatra theory (Shabda, Sparsha, Rupa, Rasa, Gandha) and how sense organs correspond to elements."
          },
          {
            title: "Tanmatra Theory",
            description: "The subtle basis of the five elements — Tanmatras as the bridge between Purusha (consciousness) and Prakriti (matter). Learn how this connects to modern quantum field analogies used in contemporary Ayurveda research."
          },
          {
            title: "Paramanu Concept",
            description: "Ayurveda's atomic theory — how the Paramanu (ultimate indivisible particle) was conceptualized centuries before modern chemistry. Includes comparison with Vaisheshika Paramanu and its relevance to nano-medicine discussions in BAMS viva."
          },
          {
            title: "Clinical Relevance",
            description: "Mapping Panchamahabhuta to body tissues (Dhatus), organ systems, and disease presentations. How to use elemental logic to explain patient symptoms and select treatment modalities in clinical practice."
          }
        ]
      },
      {
        title: "Tridosha — Vata, Pitta, Kapha",
        topics: [
          {
            title: "Dosha Definitions & Subtypes",
            description: "All 5 subtypes of Vata, 5 of Pitta, and 5 of Kapha — their seats (Sthana), functions (Karma), and signs of aggravation (Vriddhi) and depletion (Kshaya). Includes Dashic seats and clinical mapping."
          },
          {
            title: "Dashic Seats",
            description: "Primary and secondary seats of each Dosha in the body. How disturbance at the seat manifests first before spreading — foundational for understanding disease progression (Samprapti)."
          },
          {
            title: "Seasonal Variation",
            description: "How Doshas accumulate (Sanchaya), provoke (Prakopa), spread (Prasara), and deposit (Sthana Samshraya) across seasons. Ritucharya planning based on Dosha seasonal cycles — essential for both prevention and exam preparation."
          }
        ]
      },
      {
        title: "Sapta Dhatu & Mala Vigyan",
        topics: [
          {
            title: "Rasa to Shukra Pathway",
            description: "The seven-tissue sequential transformation (Kshira-Dadhi nyaya & Kedari Kulya nyaya). How nutrients travel from Rasa Dhatu through to Shukra/Artava, with Poshaka and Poshya fractions explained with timing and Agni involvement."
          },
          {
            title: "Upa-dhatu & Dhatu-agni",
            description: "Sub-tissues (Upa-dhatus) like Stanya, Raja, Sira, Kandara, Twak — their formation and clinical significance. Role of each Dhatu-agni in tissue metabolism and how its impairment leads to specific Dhatu-gata disorders."
          },
          {
            title: "3 Malas",
            description: "Purisha, Mutra, and Sweda as metabolic by-products that also serve physiological roles. Normal quantities, signs of excess and deficiency, and how Mala assessment guides diagnosis in classical examination."
          },
          {
            title: "Ama Formation",
            description: "The concept of Ama — undigested metabolic residue — as the root of most chronic disease in Ayurveda. How Ama differs from Dosha, how to detect it clinically (Jihva Mala, Sroto-dusti, pulse), and the principle of Ama Pachana before Shodhana."
          }
        ]
      }
    ]
  },
  {
    title: "Dravyaguna Vigyan Mastery",
    slug: "dravyaguna-vigyan-mastery",
    description: "Comprehensive herb science — Rasa-Guna-Virya-Vipaka-Prabhava of 100+ medicinal plants with clinical formulations.",
    longDescription: `Dravyaguna is the pharmacological heart of Ayurveda. This course takes you beyond memorizing herb names into truly understanding WHY a herb works. You will learn to analyse any herb using the Rasa-Guna-Virya-Vipaka-Prabhava framework, predict drug interactions, design formulations, and interpret classical shlokas from Charaka, Sushruta, and Dhanvantari Nighantu. Designed for BAMS 2nd and 3rd year students preparing for theory, practical, and viva examinations.`,
    level: "intermediate",
    isFree: false,
    price: 1499,
    duration: "28 hrs",
    totalLessons: 56,
    totalModules: 4,
    students: 1420,
    rating: 4.9,
    tags: ["dravyaguna", "herbs", "pharmacology", "formulations", "BAMS"],
    modules: [
      {
        title: "Rasa, Guna, Virya, Vipaka Theory",
        topics: [
          {
            title: "6 Rasas",
            description: "Madhura, Amla, Lavana, Katu, Tikta, Kashaya — elemental composition, Dosha effects, organ affinities, and excessive-use consequences. Includes compound Rasa theory and Rasapanchaka analysis applied to 20 commonly tested herbs."
          },
          {
            title: "20 Gunas",
            description: "From Guru-Laghu to Sthira-Sara — complete analysis of all 20 pairs of opposing Gunas. How Gunas determine drug kinetics, tissue penetration, digestion speed, and channel action."
          },
          {
            title: "Ushna-Sheeta Virya",
            description: "Virya as the potency that determines immediate drug action. Ushna vs Sheeta effects on Agni, Doshas, and tissue metabolism. How Virya overrides Rasa in certain herbs (e.g., Amalaki — Amla Rasa but Sheeta Virya). Panchavirya and Ashtavirya schools compared."
          },
          {
            title: "Madhura-Katu-Amla Vipaka",
            description: "Post-digestive effect of drugs — the most important concept for understanding long-term drug action on Doshas, fertility, and elimination. Mapping Rasa to Vipaka with exceptions explained through Prabhava."
          },
          {
            title: "Prabhava",
            description: "Unexplained specific action — why certain herbs defy Rasa-Guna-Virya-Vipaka logic. Famous Prabhava examples: Haritaki (Tridoshahara despite Amla-Katu-Tikta-Kashaya), Guduchi (Rasayana action), Shilajit (Yogavahi). How Prabhava guides formulation when logic fails."
          }
        ]
      },
      {
        title: "Major Drug Families (Ganas)",
        topics: [
          {
            title: "Charaka's 50 Ganas",
            description: "Complete study of all 50 Ganas from Charaka Samhita Sutrasthana Chapter 4. Therapeutic intent of each Gana, lead herbs, and how Gana membership guides multi-herb prescription. Emphasis on 15 most-asked Ganas in BAMS exams."
          },
          {
            title: "Sushruta's 37 Ganas",
            description: "Comparative analysis of Sushruta's drug classification system. How Sushruta's surgical orientation influenced his Gana choices — drugs for wound healing, haemostasis, and Shodhana featured prominently."
          },
          {
            title: "Vrecha Dravya",
            description: "Purgative drug classification — Mridu, Madhyama, Teekshna Virechana drugs. Dose-response understanding, contraindications, and how Vrecha Dravya selection changes with Prakriti and season."
          },
          {
            title: "Snehana Dravya",
            description: "Oleation drug families — four types of Sneha (Ghrita, Taila, Vasa, Majja). Quality grading, processing principles (Murchhana), and therapeutic applications in Panchakarma preparatory procedures."
          },
          {
            title: "Brinhana Dravya",
            description: "Nourishing and tissue-building drugs — key for understanding Rasayana therapy, post-illness rehabilitation, and geriatric care in Ayurveda. Includes Jeevaniya Gana analysis."
          }
        ]
      },
      {
        title: "100 Key Herbs — Individual Monographs",
        topics: [
          {
            title: "Ashwagandha, Shatavari, Guduchi",
            description: "Adaptogenic triad — detailed monographs covering botanical identity, Sanskrit synonyms, Rasapanchaka, pharmacological actions, classical indications, modern research correlations, dose, Anupana, and contraindications. Formulations: Ashwagandhadi Churna, Shatavari Kalpa, Guduchyadi Kwatha."
          },
          {
            title: "Triphala herbs",
            description: "Haritaki, Bibhitaka, Amalaki — individual and combined analysis. Why Triphala is Tridoshashamaka, how each fruit acts on a different Dosha, and the 7 uses of Triphala from Rasayana to Netra Roga."
          },
          {
            title: "Guggulu, Shilajit, Brahmi",
            description: "Mineral-herb combination monographs. Guggulu types (Mahishaksha, Pariksha etc.), Shilajit authenticity testing, Brahmi vs Mandukparni disambiguation — a common BAMS exam confusion resolved."
          },
          {
            title: "Neem, Tulsi, Turmeric",
            description: "Three universally known herbs examined with clinical depth — beyond common knowledge. Nimba's role in Kushtha, Tulsi in Respiratory Shwasa, Haridra in Prameha and Twak Roga — with formulation contexts."
          },
          {
            title: "30+ more",
            description: "Complete monographs for Vasaka, Pushkarmula, Karkatakashringi, Kantakari, Yashtimadhu, Pippali, Chitraka, Vidanga, Kutaja, Indrayava, Bilva, Nagarmotha, Musta, Punarnava, Gokshura, Varuna, Parijata, Nirgundi, Eranda, Jatamansi, Shankhapushpi, Malkangni, Tagar, Jyotishmati, Kushtha, Haritaki, Twak, Ela, Nagakeshara, Patra, and more."
          }
        ]
      },
      {
        title: "Classical Formulations & Kalpana",
        topics: [
          {
            title: "Kashaya (decoctions)",
            description: "Decoction preparation ratios (1:4, 1:8, 1:16), drug addition timing (Prakshepa Dravya), shelf life, and the 40 most clinically used Kashaya formulations from Sahasrayogam and Ashtanga Hridayam. Includes Kwatha Kalpana practical assessment criteria."
          },
          {
            title: "Churna (powders)",
            description: "Mesh sizes, mixing ratios for compound powders, moisture content standards, and how the order of powder combination affects bioavailability. Formulary of 25 standard Churnas with proportions."
          },
          {
            title: "Vati (tablets)",
            description: "Classical tablet-making using binding agents (Kajjali, Guggulu, Honey, Ghee). Hardness testing, weight variation, disintegration time. 30 essential Vati formulations with ingredient analysis."
          },
          {
            title: "Ghrita (medicated ghee)",
            description: "Sneha Paka stages (Mridu, Madhyama, Khara Paka), quality assessment methods, shelf life, and the pharmacokinetic advantage of ghee as a drug vehicle. Formulations: Mahatiktaka Ghrita, Brahmi Ghrita, Trikatu Ghrita."
          },
          {
            title: "Asava-Arishta",
            description: "Self-generated fermented formulations — the unique Ayurvedic dosage form with bioavailability advantages. Fermentation science, Sandhan Kalpana standards, alcohol content permissibility in classical texts."
          },
          {
            title: "Avaleha",
            description: "Electuary/linctus preparations — Chyawanprash as the archetype. Sugar-jaggery-honey guidelines, incorporation sequence, and 15 Avaleha formulations for Respiratory, Digestive, and Rasayana applications."
          }
        ]
      }
    ]
  },
  {
    title: "Nadi Pariksha & Clinical Diagnosis",
    slug: "nadi-pariksha-clinical-diagnosis",
    description: "Master Ayurvedic examination — pulse diagnosis, Ashtavidha Pariksha, and complete case-taking with real patient scenarios.",
    longDescription: `Clinical diagnosis is where Ayurvedic theory becomes real medicine. This advanced course trains you in the complete Ayurvedic examination system — from reading the pulse at three levels to performing all 8 examination methods (Ashtavidha Pariksha). You will work through 15 documented case studies covering the most common BAMS clinical exam presentations. By course end, you will write structured case sheets, identify pathological findings, and formulate treatment plans independently.`,
    level: "advanced",
    isFree: false,
    price: 1999,
    duration: "22 hrs",
    totalLessons: 38,
    totalModules: 3,
    students: 980,
    rating: 4.8,
    tags: ["nadi pariksha", "clinical", "diagnosis", "ashtavidha", "BAMS"],
    modules: [
      {
        title: "Ashtavidha Pariksha (8-fold Exam)",
        topics: [
          {
            title: "Nadi (pulse)",
            description: "Pulse palpation technique — three-finger placement, pressure gradation (superficial/medium/deep levels), and identification of Vata, Pitta, Kapha, and mixed Dosha pulses. Includes pathological pulse patterns for Jwara, Prameha, Shotha, and Hridroga."
          },
          {
            title: "Mutra (urine)",
            description: "Urine examination — colour, smell, volume, and the classical oil-drop test (Taila Bindu Pariksha) for disease prognosis. Normal vs pathological findings with modern correlation to urinalysis."
          },
          {
            title: "Mala (stool)",
            description: "Stool examination parameters in classical Ayurveda — consistency, colour, presence of Ama, frequency, and floatation test. Mapping findings to GI disorders: Grahani, Atisara, Arsha."
          },
          {
            title: "Jihwa (tongue)",
            description: "Tongue diagnosis — coating (Sama vs Nirama), colour zones corresponding to organs, texture, moisture, and tremors. Systematic tongue mapping with photographic case study analysis."
          },
          {
            title: "Shabda (voice)",
            description: "Voice and sound examination — hoarseness (Swarabheda), nasal quality, clarity, and rhythm as diagnostic indicators for Prana Vata status and Respiratory channel health."
          },
          {
            title: "Sparsha (touch)",
            description: "Palpation technique — temperature, texture, moisture, tenderness gradation, and organ palpation boundaries. Includes abdominal mapping for Grahani, Gulma, and Yakrit-Pliha disorders."
          },
          {
            title: "Drika (eyes)",
            description: "Ocular examination — scleral colour, corneal clarity, pupillary response, and Tarpaka Kapha assessment. Eye signs for Pitta disorders, anaemia (Pandu), and jaundice (Kamala)."
          },
          {
            title: "Akriti (body)",
            description: "Overall body constitution assessment — Prakriti determination through physical build, skin quality, hair texture, and anthropometric markers. Includes Vikrita Prakriti signs indicating disease states."
          }
        ]
      },
      {
        title: "Nadi Pariksha — Pulse Mastery",
        topics: [
          {
            title: "3-finger technique",
            description: "Precise anatomical placement at Tarjani, Madhyama, Anamika positions on the radial artery. Pressure calibration — how much pressure to apply for each Dosha level. Common errors (thumb use, wrong wrist, patient position) and how to avoid them."
          },
          {
            title: "Vata pulse (snake)",
            description: "Irregular, quick, thin, cold — the Vata pulse characteristics and their clinical meaning. Sub-types for each of the 5 Vata subtypes. Distinguishing normal Vata constitution pulse from pathological Vata aggravation."
          },
          {
            title: "Pitta pulse (frog)",
            description: "Jumping, forceful, warm, moderately fast — Pitta pulse profile. Differentiating Sadhaka Pitta (mental Pitta) pulse from Pachaka Pitta (digestive Pitta) patterns."
          },
          {
            title: "Kapha pulse (swan)",
            description: "Slow, smooth, cool, strong — Kapha pulse and its clinical indicators. The swan-glide rhythm and how it changes in Kapha-predominant diseases like obesity, hypothyroidism, and depression."
          },
          {
            title: "Organ pulses",
            description: "Advanced organ-level pulse reading — how specific organ health is reflected at different radial positions in both hands. Includes Yakrit, Pliha, Hridaya, Phupphusa, Vrikka position mapping."
          },
          {
            title: "Nadi in disease",
            description: "Pathological pulse patterns for 20 major conditions: Jwara, Prameha, Hridroga, Apasmara, Gulma, Arsha, Grahani, Shwasa, Kasa, Pandu, Kamala, Shotha, Kushtha, Vatarakta, Amavata, Sandhivata, Katishoola, Anuvasana, Tikshna, Sheetala Nadi. Includes memory techniques for viva examination."
          }
        ]
      },
      {
        title: "Case Studies & Clinical Scenarios",
        topics: [
          {
            title: "Vata disorders case",
            description: "Complete case: 52-year-old male with Sandhivata (osteoarthritis). Full case sheet — chief complaint, Nadi reading, Ashtavidha findings, Nidana Panchaka analysis, treatment plan (Panchakarma + oral medications + Pathya), and prognosis discussion."
          },
          {
            title: "Pitta disorder case",
            description: "Complete case: 34-year-old female with Pitta-predominant Grahani (IBS-D variant). Differential diagnosis from Atisara and Amlapitta. Case sheet with Virechana protocol and dietary prescription."
          },
          {
            title: "Kapha disorder case",
            description: "Complete case: 45-year-old male with Sthaulya (obesity) and Prameha (pre-diabetes). Dual-Dosha management, Udwarthana protocol, Triphala Guggulu prescription, and 3-month lifestyle modification plan."
          },
          {
            title: "Chronic disease cases",
            description: "5 long-form chronic disease cases: Amavata (Rheumatoid Arthritis), Shwasa (Bronchial Asthma), Pandu (Iron Deficiency Anaemia), Arsha (Haemorrhoids), Mutrakriccha (UTI). Each includes diagnosis, treatment ladder, and expected outcomes."
          },
          {
            title: "Paediatric case",
            description: "Kaumarbhritya case: 7-year-old with recurrent Kasa (cough) and Ajirna (indigestion). Child-specific examination modifications, dose calculation for Bala, and safe herb selection without harsh Shodhana."
          },
          {
            title: "Geriatric case",
            description: "Vata-dominant geriatric case: 68-year-old with Kampavata (Parkinson's-like tremors) and Manovaha Srotas involvement. Brimhana-predominant treatment strategy, Nasya protocol, and caregiver guidance."
          },
          {
            title: "Emergency recognition",
            description: "Recognising Ayurvedic clinical emergencies — Ama-janya Jwara crisis, Vata Pravritti (acute abdominal Vata disturbance), Pitta Raktatisara (haemorrhagic diarrhoea), and when to refer to modern emergency care. Ethical practice boundaries."
          }
        ]
      }
    ]
  },
  {
    title: "Panchakarma: Complete Detox Therapies",
    slug: "panchakarma-complete-detox-therapies",
    description: "Full procedural training in all 5 purification therapies — indications, contraindications, step-by-step protocols, and post-care.",
    longDescription: `Panchakarma is the therapeutic jewel of Ayurveda — a systematic bio-purification process that addresses disease at its root by removing accumulated Doshas from their deepest channels. This course provides complete procedural mastery across all five primary therapies and 18 types of Basti (the king of Panchakarma). You will learn pre-procedure preparation (Purvakarma), execution (Pradhanakarma), and post-procedure recovery care (Pashchatkarma) — everything needed to administer and supervise Panchakarma protocols safely and effectively.`,
    level: "intermediate",
    isFree: false,
    price: 1799,
    duration: "25 hrs",
    totalLessons: 44,
    totalModules: 4,
    students: 1210,
    rating: 4.8,
    tags: ["panchakarma", "detox", "shodhana", "basti", "clinical"],
    modules: [
      {
        title: "Purvakarma — Pre-procedures",
        topics: [
          {
            title: "Pachana (digestion) internal",
            description: "Deepana-Pachana phase — preparing the gut for Shodhana by clearing Ama first. Herb selection (Chitrakadi Vati, Trikatu, Hingwashtak), duration assessment, and signs of Ama clearance (Niramamata) before proceeding."
          },
          {
            title: "Snehana external (Abhyanga)",
            description: "Full-body oil massage technique — stroke directions, pressure points, Marma awareness, oil selection per Prakriti and condition, temperature, and duration. Includes self-Abhyanga instruction and therapist technique for clinic settings."
          },
          {
            title: "Snehana internal",
            description: "Internal oleation with medicated ghee — dose calculation (Agni-based starting dose), escalation protocol (day 1 to day 7), signs of proper Snehana (Samyak Snigdha Lakshana), and what to do when over-oleation occurs."
          },
          {
            title: "Svedana (fomentation) types",
            description: "13 types of Svedana — Nadi (tube steam), Pinda (bolus), Parishteka (pouring), Avagaha (immersion), Upanaha (poultice), and more. Selection criteria, temperature control, contraindications, and post-Svedana care to prevent Vata aggravation."
          },
          {
            title: "Rookshana",
            description: "Drying pre-procedure for Kapha-excess conditions — when Snehana would be counterproductive. Dry powder massage (Udvarthana), Rooksha Svedana methods, and herb selection for Lekhana (scraping) effect."
          },
          {
            title: "Dose calculation",
            description: "Calculating Panchakarma doses by body weight, Agni status, Prakriti, disease severity, and season. Includes Hrasiyasi-Madhyama-Uttama dose ranges for Vamana, Virechana, Basti, Nasya, and Raktamokshana."
          }
        ]
      },
      {
        title: "Vamana & Virechana",
        topics: [
          {
            title: "Vamana indications",
            description: "Kapha-dominant conditions warranting therapeutic emesis — Shwasa, Kasa, Prameha, Kushtha, Arochaka, Urustambha, Apasmara, Shotha. Step-by-step Vamana day protocol from Kapha-provoking diet the night before to completion criteria."
          },
          {
            title: "Drug protocol (Madanaphala)",
            description: "Primary emetic agent — Madanaphala preparation, dose, Anupana (warm water, milk, or decoction), and timing. Backup emetics (Ikshvaku, Kutaja), antiemetic management if needed, and Samyak Vamana vs Heena/Atiyoga."
          },
          {
            title: "Vamana procedure steps",
            description: "Complete 10-step Vamana procedure: room setup, patient positioning, Pana (drinking fluid), observation during Vega (bouts), Kavalana (throat gargling between bouts), completion assessment, and immediate post-procedure protocol."
          },
          {
            title: "Virechana indications",
            description: "Pitta-dominant disorders for therapeutic purgation — Kamala, Kushtha, Rakta-Pitta, Raktavikar, Amlapitta, Hridroga, Shiroroga, Arsha, Visarpa. Differential case selection between Vamana and Virechana."
          },
          {
            title: "Trivrith Leha protocol",
            description: "The gold-standard Virechana drug — preparation, dose escalation, assessment of Samyak Virechana (correct purgation), and Samsarjana Krama (post-purgation graduated diet) over 7 days."
          }
        ]
      },
      {
        title: "Basti — King of Panchakarma",
        topics: [
          {
            title: "Niruha vs Anuvasana",
            description: "Two main types of Basti — decoction enema (Niruha/Asthapana) vs oil enema (Anuvasana/Sneha Basti). When to choose which, how they complement each other in Kala Basti (16 Basti course) and Karma Basti (30 Basti course)."
          },
          {
            title: "Kashaya Basti preparation",
            description: "Ingredient sequence — Saindhava, Sneha, Kalka, Kashaya — mixing order, temperature, consistency, and volume calculation. The critical importance of homogenous emulsification and how to test it before administration."
          },
          {
            title: "Sneha Basti",
            description: "Oil enema technique, retention time, and the 9 Sama-Samavaya criteria for proper Anuvasana Basti. Matra Basti as a mini-Anuvasana for weak patients — dose and indication."
          },
          {
            title: "Yoga Basti schedule",
            description: "8 Basti course alternating Anuvasana and Niruha — the standard introductory Basti course used in most clinical settings. Day-by-day protocol with assessment checkpoints."
          },
          {
            title: "Karma Basti",
            description: "The complete 30-Basti course for serious Vata disorders like paralysis, Muscular Dystrophy, Parkinson's, and severe Osteoarthritis. Planning, patient selection criteria, inpatient vs outpatient considerations."
          },
          {
            title: "Matra Basti",
            description: "Daily small-dose oil enema — the only Basti type that can be administered indefinitely. Uses in Nityaga (daily routine) for Vata management, constipation, and geriatric Vata disorders."
          }
        ]
      },
      {
        title: "Nasya & Raktamokshana",
        topics: [
          {
            title: "5 types of Nasya",
            description: "Navana, Avapeedana, Dhmapana, Dhuma, and Pratimarsha — each type's mechanism, drug selection, dose, and clinical applications. The nasal route as the highway to the brain and Prana Vata."
          },
          {
            title: "Pratimarsha Nasya",
            description: "Daily 2-drop self-administered Nasya — safe for daily use, improves voice, vision, and mental clarity. Technique, timing (morning vs evening), and oils (Anu Taila, Shadbindu Taila, Brahmi Ghrita)."
          },
          {
            title: "Brinhana Nasya",
            description: "Nutritive nasal therapy — for conditions of depletion, Vata excess, memory impairment, and neurological weakness. Drug preparation and patient instruction for home use between clinic visits."
          },
          {
            title: "6 methods of Raktamokshana",
            description: "Bloodletting methods — Siravyadha (phlebotomy), Pracchana (scarification), Jalaukavacharana (leech therapy), Shringa (horn suction), Alabu (gourd suction), Ghati (cup suction). Modern leech therapy protocol in detail including source, application, and wound care."
          },
          {
            title: "Jalaukavacharana (leeches)",
            description: "Leech therapy as the most refined Raktamokshana — sourcing medicinal leeches, body placement, application time, removal technique, post-procedure wound management, and conditions where leech therapy produces dramatic results (Vatarakta, Kushtha, Bhagandara)."
          }
        ]
      }
    ]
  },
  {
    title: "Ayurvedic Diet & Daily Lifestyle",
    slug: "ayurvedic-diet-daily-lifestyle",
    description: "Dinacharya, Ritucharya, and Ahara Vidhi — practical Ayurvedic living for students, patients, and practitioners.",
    longDescription: `Health maintenance (Swasthavritta) is as important as disease treatment in Ayurveda. This course bridges the gap between classical theory and everyday life — showing students, patients, and practitioners how to structure their day, eat intelligently, manage seasonal changes, and prevent disease before it begins. Completely free, this course reflects AyurvedaLearn's mission to make authentic Ayurvedic knowledge accessible to all.`,
    level: "beginner",
    isFree: true,
    price: 0,
    duration: "10 hrs",
    totalLessons: 22,
    totalModules: 4,
    students: 3150,
    rating: 4.6,
    tags: ["dinacharya", "diet", "lifestyle", "ritucharya", "prevention"],
    modules: [
      {
        title: "Ahara Vidhi — Rules of Eating",
        topics: [
          {
            title: "Ashta Ahara Vidhi Visheshaytana",
            description: "Eight specific factors governing food intake from Charaka — Prakriti (nature of food), Karana (processing), Samyoga (combination), Rashi (quantity), Desha (place of origin), Kala (timing), Upayoga Samstha (rules of use), and Upabhokta (the consumer). How ignoring any one factor causes disease."
          },
          {
            title: "Pathya-Apathya concept",
            description: "Beneficial vs harmful foods and behaviours — not as universal rules but as context-sensitive guidelines. How Pathya changes with Prakriti, disease, season, and age. The 45 universally Apathya food combinations from classical texts."
          },
          {
            title: "Kala (timing)",
            description: "When to eat — the Ayurvedic circadian nutrition guide. Why breakfast should be light (Pitta rises at 10am), lunch the largest meal (peak Agni at noon), and dinner completed before 7pm. Intermittent fasting parallels in classical Laghu Bhojana."
          },
          {
            title: "Vagbharana (suppression of urge)",
            description: "13 natural urges that must never be suppressed — and the diseases that result from suppression. Adharaniya Vegas (suppressible urges) vs Dharaniya Vegas. Practical implications for students with busy schedules."
          }
        ]
      },
      {
        title: "Dinacharya — Daily Routine",
        topics: [
          {
            title: "Brahma Muhurta waking",
            description: "The 96-minute window before sunrise — why classical texts prescribe waking at this time, what physiological changes occur (Vata-Kapha balance, cortisol, cognitive clarity), and how to implement it gradually for modern students."
          },
          {
            title: "Dantadhavana (oral hygiene)",
            description: "Tooth cleaning with medicated twigs (Nimba, Khadira, Karanja), tongue scraping (Jihwa Nirlekhana), oil pulling (Kavala and Gandusha) — techniques, duration, and the specific benefits each practice delivers to oral and systemic health."
          },
          {
            title: "Gandusha (oil pulling)",
            description: "How to perform Gandusha correctly — oil quantity (enough to move comfortably, not swallow), duration (3–5 minutes for Gandusha, longer for Kavala), oil selection by Prakriti, and documented benefits for gum health, headaches, and skin conditions."
          },
          {
            title: "Nasya (self-administered)",
            description: "Daily Pratimarsha Nasya — 2 drops of Anu Taila or plain sesame oil in each nostril every morning. Technique, timing, benefits for vision, memory, voice, and prevention of Shiro Roga."
          },
          {
            title: "Abhyanga (self-massage)",
            description: "Daily self-massage — 15-minute pre-bath oil application. Stroke directions for each body region, oil selection guide, timing, and how daily Abhyanga prevents Vata disorders, improves sleep quality, and nourishes skin."
          },
          {
            title: "Vyayama (exercise)",
            description: "Ayurvedic exercise principles — Half-capacity rule (Ardhashakti), signs of correct exertion (mild sweating, laboured breathing, lightness), and season-specific intensity adjustments. Yoga as Sattvic Vyayama."
          },
          {
            title: "Svapna (sleep)",
            description: "Classical sleep science — ideal sleep posture, timing, duration by age and Prakriti, and the consequences of Ati-nidra (oversleeping) vs Anidra (insomnia). Herbal support: Jatamansi, Brahmi, Ashwagandha with milk."
          }
        ]
      },
      {
        title: "Ritucharya — Seasonal Regimens",
        topics: [
          {
            title: "6 Indian seasons (Ritu)",
            description: "Vasanta, Grishma, Varsha, Sharad, Hemanta, Shishira — each season's Dosha accumulation pattern, effect on Agni, and how the body's susceptibility shifts. Why Hemanta is the best season for building strength and Varsha is the most disease-prone."
          },
          {
            title: "Hemanta-Shishira care",
            description: "Winter regimen — heavy, oily, sweet, salty, sour foods; vigorous exercise; Abhyanga with sesame oil; Utsadana (scrubbing); indoor warmth maintenance. Why Agni is strongest in winter and how to capitalise on it for Rasayana therapy."
          },
          {
            title: "Varsha Agni care",
            description: "Monsoon regimen — the most critical season for digestive care. Mandagni (weak Agni) management during Varsha: Laghu (light) food, rainwater avoidance, medicated wine (Sura) in small quantities, and Basti as the primary Panchakarma of the season."
          },
          {
            title: "Sharaka cooling diet",
            description: "Post-monsoon Pitta management (Sharad Ritucharya) — bitter, astringent, sweet foods; Virechana as the seasonal Panchakarma; moonlight exposure (Chandraprakasha Sevana) for Pitta cooling."
          },
          {
            title: "Sharaka seasonal food lists",
            description: "Complete seasonal food charts — grains, vegetables, fruits, dairy, and spices that are Pathya and Apathya in each of the 6 seasons. Includes a practical monthly food calendar for Pune/Maharashtra climate."
          },
          {
            title: "Herbal food by season",
            description: "Season-specific herbal additions to daily diet — Ginger in Hemanta, Amalaki in Sharad, Haritaki in Varsha, Neem in Vasanta. The 6-herb annual Rasayana cycle recommended in Charaka Samhita."
          }
        ]
      },
      {
        title: "Prakriti-Based Nutrition",
        topics: [
          {
            title: "Vata diet plan",
            description: "Vata-pacifying foods — warm, moist, heavy, oily, sweet, sour, salty. Foods to avoid: raw vegetables, cold drinks, dry snacks, excessive fasting. Sample 7-day meal plan with breakfast, lunch, dinner, and snack suggestions using readily available Indian foods."
          },
          {
            title: "Pitta diet plan",
            description: "Pitta-cooling foods — cool, heavy, sweet, bitter, astringent. Foods to avoid: hot spices, fermented foods, excessive salt, alcohol. Importance of regular meal timing. Sample 7-day Pitta meal plan."
          },
          {
            title: "Kapha diet plan",
            description: "Kapha-reducing foods — light, dry, warm, pungent, bitter, astringent. Foods to avoid: dairy excess, sweets, cold foods, daytime sleep. Sample 7-day Kapha meal plan with caloric density awareness."
          },
          {
            title: "Dual Prakriti combinations",
            description: "Managing Vata-Pitta, Pitta-Kapha, Vata-Kapha constitutional types — prioritisation strategies when dietary recommendations conflict. Season-based prioritisation and symptom-based dynamic switching."
          },
          {
            title: "Pregnancy diet",
            description: "Garbhini Paricharya (antenatal nutrition) by trimester. Month-by-month dietary and herbal recommendations from Charaka Samhita Sharirasthana — completely safe, research-aligned, and practical for Indian households."
          },
          {
            title: "Student brain-food protocol",
            description: "Medhya Rasayana for students — Brahmi, Shankhapushpi, Yashtimadhu, Jyotishmati with milk and ghee. Timing recommendations, exam preparation diet, and avoiding the Kapha-inducing heavy food trap during study season."
          }
        ]
      }
    ]
  },
  {
    title: "Rog Nidan & Disease Pathogenesis",
    slug: "rog-nidan-disease-pathogenesis",
    description: "Complete disease diagnosis system — Nidana Panchaka, Samprapti Ghataka, Kriyakala, and clinical reasoning for all major Ayurvedic diseases.",
    longDescription: `Understanding HOW disease develops is the foundation of genuine Ayurvedic clinical practice. This advanced course teaches you to think like a classical Vaidya — tracing every disease back through its 6-stage evolution (Kriyakala/Shat Kriyakala), identifying the exact Dosha-Dushya-Srotas combination involved, and applying this understanding to both prevention and treatment. Covers all major disease groups tested in BAMS final examinations with systematic Nidana Panchaka analysis for each.`,
    level: "advanced",
    isFree: false,
    price: 2199,
    duration: "30 hrs",
    totalLessons: 60,
    totalModules: 4,
    students: 870,
    rating: 4.9,
    tags: ["nidan", "pathogenesis", "samprapti", "kriyakala", "BAMS advanced"],
    modules: [
      {
        title: "Nidana Panchaka — 5-fold Cause",
        topics: [
          {
            title: "Nidana (causative factors)",
            description: "Complete taxonomy of disease causes — Asatmyendriyartha Samyoga (sensory misuse), Prajnaparadha (intellectual transgression), and Parinama (seasonal variation). How Nidana Sevana initiates the pathological cascade and why removing Nidana is the first therapeutic step in all Ayurvedic treatment."
          },
          {
            title: "Purvarupa (prodromal signs)",
            description: "Early warning signs before full disease manifestation — understanding Purvarupa as the therapeutic window where disease is easiest to reverse. Examples of Purvarupa for 20 major diseases including Jwara, Prameha, Kushtha, Amavata, and Hridroga."
          },
          {
            title: "Rupa (clinical features)",
            description: "Cardinal symptoms and signs — how to systematically list Rupa for any disease in the correct sequence for theory papers and viva. The difference between Samanya Rupa (common to Dosha) and Vishishta Rupa (disease-specific)."
          },
          {
            title: "Upasthana-Anupashaya",
            description: "Therapeutic trial — what aggravates (Anupashaya) and what relieves (Upashaya) the condition. How Upashaya-Anupashaya is used to confirm diagnosis when Rupa is ambiguous, and its modern parallel in empirical therapeutic trials."
          },
          {
            title: "Samprapti (pathogenesis)",
            description: "The complete pathological mechanism — from initial Dosha provocation to final Dushya-Srotas involvement. Writing Samprapti in Sanskrit sequence for examination papers. Ghataka (components) of Samprapti: Dosha, Dushya, Desha, Kala, Bala, Agni, Prakriti, Vaya, Satva, Satmya, Ahara."
          }
        ]
      },
      {
        title: "Samprapti & Kriyakala (6 Stages)",
        topics: [
          {
            title: "Sanchaya (aggravation)",
            description: "Stage 1 — Dosha accumulation in its own seat. Subtle symptoms that patients almost never report. How to elicit Sanchaya signs in patient interviews and why addressing disease here prevents 90% of chronic conditions."
          },
          {
            title: "Prakopa (spread)",
            description: "Stage 2 — Accumulated Dosha becomes agitated and starts to move. Characteristic signs for each Dosha's Prakopa phase and dietary/lifestyle triggers that push Stage 1 to Stage 2."
          },
          {
            title: "Prasara (spread)",
            description: "Stage 3 — Provoked Dosha overflows its seat and begins circulation through Srotas. This is the critical intervention point in Panchakarma — when Doshas are mobile and can be drawn back out most effectively."
          },
          {
            title: "Sthana Samshraya (localisation)",
            description: "Stage 4 — Circulating Dosha settles in a weak tissue (Khavaigunya). Why some people develop heart disease and others develop skin disease from the same Dosha imbalance — the role of genetic susceptibility and prior trauma."
          },
          {
            title: "Vyakti (manifestation)",
            description: "Stage 5 — Full clinical disease becomes apparent. At this stage, named diseases (Vyadhi) can be diagnosed. How the Dosha involved, the Dushya affected, and the Srotas involved together determine the disease name."
          },
          {
            title: "Bheda (complication)",
            description: "Stage 6 — Structural changes, complications, and Upadravas (secondary diseases). How to recognise when a disease has reached this stage, why it becomes harder to cure (Yapya vs Sadhya classification), and the shift in treatment goal from cure to palliation."
          },
          {
            title: "Stage-specific intervention",
            description: "Complete treatment algorithm mapped to all 6 stages — dietary modification at Stage 1-2, Shamana at Stage 2-3, Panchakarma at Stage 3-4, disease-specific Shamana at Stage 4-5, and Palliative care at Stage 6. Why treating Stage 5 disease with Stage 1 remedies fails."
          }
        ]
      },
      {
        title: "Major Disease Groups — Deep Dive",
        topics: [
          {
            title: "Jwara (fever) 8 types",
            description: "Complete Jwara Nidana Panchaka — Vataja, Pittaja, Kaphaja, Vata-Pittaja, Pitta-Kaphaja, Vata-Kaphaja, Sannipataja, and Agantuja types. Differential pulse and examination findings. Treatments: Sudation, Langhana, specific decoctions. When to use Svedana vs when to withhold it."
          },
          {
            title: "Prameha (diabetes) 20 types",
            description: "All 20 types of Prameha from Kaphaja (10), Pittaja (6), to Vataja (4). Madhumeha as the terminal Vataja Prameha and its Samprapti correlation with Type 1 DM. Nidana: sedentary behaviour, Guru-Snigdha-Madhura diet excess. Treatment differentiation by stage and type."
          },
          {
            title: "Kushtha (skin) 18 types",
            description: "Mahakushtha (7) and Kshudrakushtha (11) — complete analysis. Tridosha involvement in each type, skin biopsy correlation with classical descriptions, and the role of Virechana and Raktamokshana in Kushtha management."
          },
          {
            title: "Shotha (oedema) 8 types",
            description: "Oedema classification in Ayurveda — Vataja, Pittaja, Kaphaja, Sannipataja, Kshataja, Visarpa-ja, Abhighata-ja, Visha-ja. Pitting vs non-pitting correlation. Diuretic herbal management with Punarnava as lead drug."
          },
          {
            title: "Arsha (haemorrhoids) 6 types",
            description: "6 types of Arsha — Vataja, Pittaja, Kaphaja, Tridoshaja, Sahaja (congenital), and Rakta-Arsha. Kshara Sutra (medicated thread ligation) procedure basics. Conservative management with Abhayarishta, Arshkuthar Rasa."
          },
          {
            title: "Apasmara (epilepsy)",
            description: "Dosha involvement in seizure disorders, Purvarupa (aura phase correlation), and the role of Medhya Rasayana in neurological protection. Brahmi Ghrita and Panchagavya Ghrita protocols."
          }
        ]
      },
      {
        title: "Vikruti Assessment & Case Analysis",
        topics: [
          {
            title: "Manas Vikruti (mental)",
            description: "Mental disease analysis using Sattva-Rajas-Tamas framework. How Rajasic and Tamasic mental states produce psychological disorders (Unmada, Apasmara, Atattvabhinivesha). Assessment through conversation, Nadi, and behavioural observation."
          },
          {
            title: "Sharirik Vikruti (physical)",
            description: "Physical Vikruti determination protocol — 18-point examination checklist covering tongue, eyes, skin, nails, voice, pulse, and abdomen. How Vikruti differs from Prakriti and why this distinction guides the treatment priority."
          },
          {
            title: "Lab correlation with Doshas",
            description: "Mapping modern lab values to Ayurvedic disease states — CBC in Pandu (anaemia), LFT in Kamala, KFT in Mutrakriccha, fasting glucose in Prameha, lipid profile in Sthaulya. Integrative interpretation for clinical practice."
          },
          {
            title: "Case analysis method (SOAPAy)",
            description: "Modified SOAP note for Ayurvedic practice — Subjective (Anamnesis, Nidana), Objective (Ashtavidha Pariksha findings), Assessment (Nidana Panchaka + Dosha-Dushya-Srotas), Plan (Panchakarma + Oral medications + Pathya-Apathya). 20 documented case write-ups."
          },
          {
            title: "OSCE practice cases",
            description: "Objective Structured Clinical Examination preparation — 15 timed OSCE stations covering Nadi reading, tongue diagnosis, Abhyanga technique, case presentation, prescription writing, and patient counselling. Model answers with examiner marking rubric."
          },
          {
            title: "Viva preparation Q&A",
            description: "300 frequently asked BAMS viva questions across all disease groups — with model answers calibrated to impress examiners. Includes trick questions, conceptual traps, and how to handle 'I don't know' situations gracefully."
          }
        ]
      }
    ]
  }
];

async function seedCourses() {
  try {
    // Check if we need to connect (if called directly)
    const isDirectRun = require.main === module;
    if (isDirectRun) {
      await connect();
    }

    console.log('[seed] Seeding courses...');
    
    // Delete existing courses to avoid duplicates during development
    await Course.deleteMany({});
    
    // Insert new courses
    const createdCourses = await Course.insertMany(courses);
    console.log(`[seed] Successfully seeded ${createdCourses.length} courses`);

    if (isDirectRun) {
      await disconnect();
    }
    
    return createdCourses;
  } catch (error) {
    console.error('[seed] Error seeding courses:', error);
    if (require.main === module) {
      await disconnect();
      process.exit(1);
    }
    throw error;
  }
}

if (require.main === module) {
  seedCourses();
}

module.exports = { seedCourses };
