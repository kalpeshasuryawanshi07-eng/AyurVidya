const SUBJECT_CONTENT_DATA = {
  'basic-principles': {
    't001': {
      intro: "Ayurvedic philosophy (Darshana) is the root of clinical practice. It posits that the human body is a microcosm of the universe, composed of five elements (Panchamahabhuta) and governed by the laws of nature. This foundation allows us to understand the purpose of life (Dharma, Artha, Kama, Moksha) and the role of health in achieving it.",
      core: "The core of this philosophy is the **Purusha** (Consciousness) and **Prakriti** (Matter). The interaction between these creates existence. In medicine, this manifests as the **Tridosha** theory, where Vata (Space/Air), Pitta (Fire/Water), and Kapha (Water/Earth) maintain the balance of life. Understanding these elements is crucial for diagnosing any imbalance.",
      clinical: "Clinically, we use these philosophical principles to determine the patient's 'Prakriti' (Innate Nature). For example, if a patient is predominantly Vata (Air/Space), they will tend toward dryness and movement. Diagnosis is not just about the disease (Vyadhi) but about the person (Aatura), ensuring an individualized treatment plan.",
      marathi: {
        intro: "आयुर्वेदातील दर्शन शास्त्र शरीर आणि विश्वाचा परस्पर संबंध समजावून सांगते.",
        core: "पंचमहाभूत आणि त्रिदोष हे आरोग्याचे मूळ आधार आहेत. पुरुष आणि प्रकृती यांच्या संयोगाला जीवन म्हणतात.",
        clinical: "रुग्णाचे निदान करताना त्याच्या प्रकृतीचा विचार करणे अत्यंत महत्त्वाचे आहे."
      }
    },
    't002': {
      intro: "The Tridosha theory (Vata, Pitta, Kapha) is the cornerstone of Ayurvedic physiology. These three 'Doshas' are biological energies that govern all physical and mental processes. When in balance (Samanya), they support life; when out of balance (Vikriti), they initiate disease.",
      core: "**Vata** represents movement (Air/Space), **Pitta** represents transformation (Fire/Water), and **Kapha** represents structure and lubrication (Water/Earth). Each Dosha has five subtypes (Sub-doshas), such as Prana Vata or Pachaka Pitta, each performing specific functions in localized areas of the body.",
      clinical: "In the OPD, we analyze the symptoms to see which Dosha is aggravated. For instance, sharp pain and burning sensations point to Pitta, while dryness and erratic pulses point to Vata. Treatment involves 'Guna-viruddha' (opposite quality) logic: cooling therapies for Pitta and warming, grounding therapies for Vata.",
      marathi: {
        intro: "त्रिदोष (वात, पित्त, कफ) शरीरातील सर्व क्रिया नियंत्रित करतात.",
        core: "वात म्हणजे गती, पित्त म्हणजे पचन आणि परिवर्तन, तर कफ म्हणजे शरीराची रचना आणि स्थिरता. प्रत्येकाचे ५ उपप्रकार आहेत.",
        clinical: "दोषांच्या लक्षणांच्या आधारावर चिकित्सा ठरवली जाते."
      }
    },
    't003': {
      intro: "The body's structural integrity is maintained by the **Sapta Dhatu** (Seven Tissues). These tissues are Rasa (Plasma), Rakta (Blood), Mamsa (Muscle), Meda (Fat), Asthi (Bone), Majja (Marrow), and Shukra (Reproductive). Each Dhatu is formed sequentially from the previous one.",
      core: "The formation process (Dhatu-Poshana) relies on **Dhatvagni** (tissue-specific fire). If Rasa-Dhatvagni is weak, the subsequent tissue (Rakta) will be substandard. This chain reaction explains how a simple digestive issue can eventually lead to bone loss (Asthi-kshaya) or infertility (Shukra-dusti).",
      clinical: "When a patient presents with anemia (Pandu), we look at **Rakta Dhatu**. If they have obesity (Sthulya), we focus on **Meda Dhatu**. Clinical success depends on restoring the 'Paka' (transformation) at each tissue level using specific herbs (Dhatu-gamitwa).",
      marathi: {
        intro: "शरीराची रचना ७ धातूंनी बनलेली आहे: रस, रक्त, मांस, मेद, अस्थी, मज्जा आणि शुक्र.",
        core: "प्रत्येक धातू पुढील धातूला पोषण देतो. धातू अग्नीची भूमिका यामध्ये महत्त्वाची आहे.",
        clinical: "धातूंचे क्षय आणि वृद्धी होऊन रोगाची निर्मिती होते."
      }
    },
    't004': {
      intro: "**Agni** is the primary biological fire responsible for all metabolic transformations. Ayurveda recognizes 13 types of Agni: Jatharagni (the main digestive fire), 5 Bhutagnis (elemental fires), and 7 Dhatvagnis (tissue fires). It is the source of Ojas (Immunity), Tejas (Clarity), and Prana (Life).",
      core: "Jatharagni is the king of all fires. If it is high (Tikshnagni), it burns tissues; if low (Mandagni), it creates **Ama** (toxins); if erratic (Vishamagni), it causes gas and bloating. **Samagni** (balanced fire) is the goal, where digestion and elimination are perfect, and the body feels light and energetic.",
      clinical: "The first rule of Ayurvedic treatment is 'Agni-rakshana' (protecting the fire). We use **Deepana** (stimulating) and **Pachana** (digesting) drugs like Shunthi or Pippali to correct any Agni imbalance. A patient with good Agni can survive diseases that would fatal to others.",
      marathi: {
        intro: "अग्नी म्हणजे शरीरातील पचनशक्ती आणि चयापचय क्रिया.",
        core: "१३ प्रकारचे अग्नी सांगितले आहेत. जठराग्नी हा सर्वांत महत्त्वाचा आहे. मंदाग्नीमुळे आम निर्माण होतो.",
        clinical: "अग्नी रक्षण म्हणजे आरोग्याचे रक्षण होय."
      }
    },
    't005': {
      intro: "**Ama** is the undigested toxic residue resulting from impaired Agni. It is considered the root cause of most chronic diseases (Amaya). Ama is sticky, heavy, and foul-smelling, and it obstructs the Srotas (channels), preventing nutrient flow and waste removal.",
      core: "When Ama combines with Doshas, it is called **Saama** (e.g., Saama Vata). Saama Lakshanas include coating on the tongue, lack of appetite, heaviness, and body aches. If left untreated, Ama enters deep tissues and catalyzes degenerative processes like Rheumatoid Arthritis (Amavata).",
      clinical: "The goal of treatment for Ama is **Amapachana** (digestion of toxins). We prescribe fasting (Langhana) and bitter/pungent herbs until the tongue is clear and the patient feels light. We never give heavy tonics or Shodhana (purification) while Ama is present, as it may drive toxins deeper.",
      marathi: {
        intro: "मंदाग्नीमुळे शरीरात निर्माण होणारा अविपाक द्रव्य म्हणजे 'आम'.",
        core: "आम हा चिकट असतो आणि शरीरातील स्त्रोतस ब्लॉक करतो. सर्व रोगांचे मूळ म्हणजे 'आम'.",
        clinical: "आम पाचण्यासाठी लंघन आणि पाचनीय औषधी दिल्या जातात."
      }
    },
    't006': {
      intro: "**Prakriti** (Innate Nature) is the unique biological blueprint determined at the moment of conception (Shukra-Shonita-Samyoga). It never changes throughout one's life and is the most critical factor in personalized Ayurvedic medicine.",
      core: "Prakriti is classified into **Ekadoshaja** (predominance of one Dosha), **Dwidoshaja** (predominance of two), or the ideal **Sama Prakriti** (equal balance). A Vata-dominant person is light and active, a Pitta-dominant person is focused and warm, and a Kapha-dominant person is heavy and calm.",
      clinical: "Knowledge of Prakriti helps in 'Swasthavritta' (staying healthy) and 'Chikitsa' (treatment). We prescribe specific diets and lifestyle habits that are 'Viruddha' (opposite) to one's Prakriti to maintain balance. For instance, a Vata Prakriti person should avoid extremely light or cold foods.",
      marathi: {
        intro: "प्रकृती म्हणजे मनुष्याची जन्मजात शारीरिक आणि मानसिक रचना.",
        core: "ही वात, पित्त आणि कफ यांच्या प्रबळतेवर ठरवली जाते. सम प्रकृती सर्वांत उत्तम मानली जाते.",
        clinical: "आरोग्य टिकवून धरण्यासाठी आणि चिकित्सा ठरवण्यासाठी प्रकृती-परीक्षण महत्त्वाचे आहे."
      }
    },
    't007': {
      intro: "**Dinacharya** (Daily Regimen) is the foundation of preventive medicine. It is a sequence of biological lifestyle synchronization from the time of waking up until sleep, designed to maintain the balance of Doshas with the sun's cycle.",
      core: "Key steps include waking up in **Brahma Muhurta** (early morning), cleansing (Aushadha-shnaucha), **Abhyanga** (oil massage), exercise (Vyayama), and **Nasa-karma**. Each step has a specific physiological purpose, such as Abhyanga for Vata-shanti or Vyayama for Kapha-hara and Agni-vardhana.",
      clinical: "In clinical consultations, we first correct the patient's Dinacharya. Many lifestyle diseases (Sthulya, Prameha) can be resolved purely by following 'Pathya' (wholesome) routines. It establishes a rhythm that prevents 'Prajnaparadha' (intellectual error), the root of most ailments.",
      marathi: {
        intro: "दिनचर्या म्हणजे सूर्योदयापासून सूर्यास्तापर्यंतचे नियमित दिनक्रम.",
        core: "ब्रह्म मुहूर्तात उठणे, अभ्यंग, व्यायाम आणि नस्य हे दिनचर्येचे मुख्य भाग आहेत.",
        clinical: "आरोग्य टिकवण्यासाठी आणि 'लाईफस्टाईल डिसीजेस' दूर करण्यासाठी याचा उपयोग होतो."
      }
    },
    't008': {
      intro: "**Ritucharya** (Seasonal Regimen) adjusts our lifestyle according to the changing environment. As the external 'Gunas' change with seasons, our internal Doshas also fluctuate. Adaptability to these changes ensures sustained health.",
      core: "Ayurveda divides the year into **Adana-kala** (energy-extracting months) and **Visarga-kala** (energy-giving months). Each of the six seasons (Vasanta, Grishma, etc.) has specific dietary and activity guidelines. For example, during Vasanta (Spring), Kapha is naturally liquefied, requiring bitter/astringent foods.",
      clinical: "Seasonal transitions (Ritu-sandhi) are the most vulnerable times for disease onset. We use Ritucharya to advise 'Ritu-shodhana' (seasonal purification), such as Vamana in Spring or Virechana in Autumn, to clear accumulated Doshas before they manifest as severe illness.",
      marathi: {
        intro: "ऋतूचर्या म्हणजे बदलत्या ऋतूंनुसार शरीरात केला जाणारा आहार-विहार बदल.",
        core: "शरद, वसंत, ग्रीष्म या ऋतूंन प्रमाणे आहार-विहार बदलणे गरजेचे आहे.",
        clinical: "ऋतू-संधीत होणाऱ्या रोगांचे निदान आणि निवारण करण्यासाठी याचा उपयोग होतो."
      }
    },
    't009': {
      intro: "**Srotas** (Channels of Circulation) are the internal pathways through which nutrients, waste, and information flow. Life is defined as the 'continuous movement' through these channels. Healthy channels ensure a healthy body.",
      core: "There are 13 main types of Srotas in males (14 in females), such as Prana-vaha (Respiratory), Anna-vaha (Digestive), and Rasa-vaha (Lymphatic). Any obstruction (**Srotorodha**) or abnormal flow (**Sanga** or **Vimarga-gamana**) leads to the manifestation of disease.",
      clinical: "In diagnostics, we identify the 'Mula-sthana' (root) of the affected Srotas. For instance, the Mula of Anna-vaha Srotas is the Stomach (Amashaya). Treatment often focuses on clearing these blockages (Srotas-shodhana) using specific 'Gamitwa' (targeted) herbs.",
      marathi: {
        intro: "स्त्रोतस म्हणजे शरीरातील सर्व वाहिनी मार्ग (Channels).",
        core: "प्रत्येक धातूसाठी आणि क्रियेसाठी स्वतंत्र स्त्रोतस सांगितल्या आहेत. त्यातील अवरोध म्हणजे रोग.",
        clinical: "रोगाचे मूळ स्थान समजून घेण्यासाठी स्त्रोतस-विचार महत्त्वाचा आहे."
      }
    },
    't010': {
      intro: "**Ojas** is the supreme essence of all Sapta Dhatus, representing the core of vitality, immunity, and resilience (**Vyadhikshamatva**). It is the final refined product of digestion and assimilation.",
      core: "Ojas exists in two forms: **Para Ojas** (8 drops residing in the heart, vital for life) and **Apara Ojas** (circulating throughout the body, providing immunity). It is the 'Tejas' of all tissues. Loss of Ojas leads to fear, weakness, sensory loss, and eventually death.",
      clinical: "We manage Ojas through **Rasayana** (rejuvenative) therapies like Amalaki and Guduchi. Lifestyle factors like stress, excessive anger, and irregular sleep deplete Ojas (Ojo-kshaya). Clinical recovery is marked by the 'Ojo-vriddhi' signs like clarity, strength, and immunity.",
      marathi: {
        intro: "ओज म्हणजे ७ धातूंचा सार जो शरीरातील शक्ती आणि प्रतिकारशक्ती वाढवतो.",
        core: "हे दोन प्रकारचे असते: पर आणि अपर. हे शरीराला रोगांपासून वाचवते.",
        clinical: "ओजो-क्षयामुळे दुर्बलता आणि मानसिक बदल होतात. रसायन चिकित्सेमुळे ओज वाढते."
      }
    },
    't011': {
      intro: "The **Trividha Upasthambha** are the three sub-pillars of life: **Ahara** (Diet), **Nidra** (Sleep), and **Brahmacharya** (Controlled Vitality). While Doshas are the pillars, these three sustain the structure of health.",
      core: "Ahara provides the physical building blocks; Nidra allows for tissue repair and mental clarity; Brahmacharya ensures the preservation of reproductive and creative essence (Shukra). Neglect of any sub-pillar compromises the biological integrity of the body.",
      clinical: "In the OPD, we assess these three pillars to find the cause of imbalance. Irregular sleep leads to Vata-vriddhi, while poor eating habits (Apathya) damage Agni. Restoring these pillars is often the most cost-effective and enduring part of Ayurvedic treatment.",
      marathi: {
        intro: "जीवनाचे तीन उप-स्तंभ: आहार, निद्रा आणि ब्रह्मचर्य.",
        core: "हे शरीराचे धारण आणि पोषण करण्यासाठी मुख्य भूमिका बजावतात.",
        clinical: "या तिन्हींवर आरोग्य अवलंबून आहे. निद्रा-नाशामुळे अनेक शारीरिक-मानसिक त्रास होतात."
      }
    },
    't012': {
      intro: "**Manas** (The Mind) is considered an 'Indriya' (Sense Organ) that coordinates both physical and mental activities. Ayurveda believes in the 'Satva', 'Rajas', and 'Tamas' (Maha-gunas) that define our psychological temperament.",
      core: "The mind resides in the Heart (Hridaya) and communicates through the Manovaha Srotas. **Satva** is clarity, **Rajas** is activity/passion, and **Tamas** is darkness/inertia. Mental health (Manas Swasthya) is the dominance of Satva over Rajas and Tamas.",
      clinical: "We treat mental disorders (Unmada, Apasmara) by increasing Satva through Meditation (Dhyana), proper diet, and herbs like Brahmi and Shankhapushpi. The mind-body connection (Manas-Sharira Sambandha) explains how emotional stress translates into physical disease (Ama).",
      marathi: {
        intro: "मन हे एक इंद्रिय असून ते शरीर आणि आत्मा यामधील दुवा आहे.",
        core: "सत्व, रज आणि तम हे मनाचे तीन गुण आहेत. सत्व गुण आरोग्यासाठी सर्वाधिक महत्त्वाचा आहे.",
        clinical: "मानसिक रोगांचे निदान आणि 'सत्वावजय' चिकित्सा यातून समजते."
      }
    },
    't013': {
      intro: "The **Shad-padartha** are the six categories of existence in Ayurvedic philosophy, based on the Vaisheshika Darshana. They provide a logical framework for understanding everything in the universe.",
      core: "The six are: **Dravya** (Substance), **Guna** (Quality), **Karma** (Action), **Samanya** (Similarity), **Vishesha** (Difference), and **Samavaya** (Inseparable Relationship). This logic allows us to use an item with a similar 'Guna' to increase a tissue, or an opposite one to decrease it.",
      clinical: "The 'Samanya-Vishesha' logic is the master key to treatment. If a patient is burning (Pitta/Ushna), we apply its 'Vishesha'—cold (Sheeta). If a tissue is wasting, we give its 'Samanya'—nourishing substances. This makes Ayurveda a rational, evidence-based science.",
      marathi: {
        intro: "षड्-पदार्थ म्हणजे जीवन आणि विश्वाचा अभ्यास करण्याचे ६ मुख्य भाग.",
        core: "द्रव्य, गुण, कर्म, सामान्य, विशेष आणि समवाय हे ते ६ भाग आहेत.",
        clinical: "सामान्य-विशेष सिद्धांत चिकित्सेत अत्यंत महत्त्वाचा आहे."
      }
    },
    't014': {
      intro: "**Nidan Panchaka** is the five-fold diagnostic framework used to understand a disease from its origin to its full manifestation. It is the diagnostic methodology that precedes any treatment plan.",
      core: "The five components are: **Nidana** (Etiology/Cause), **Purvarupa** (Premonitory symptoms), **Rupa** (Clinical signs), **Upashaya** (Diagnostic tests via therapy), and **Samprapti** (Pathogenesis). This systematic approach ensures that the doctor treats the 'root' rather than just the 'symptoms'.",
      clinical: "For example, in Jwara (Fever), identifying the specific 'Nidana' (like eating cold food while standing in rain) helps in advising what to avoid. 'Upashaya' helps differentiate between two similar diseases by seeing which remedy providing relief.",
      marathi: {
        intro: "निदान पंचक म्हणजे रोग निदान करण्याचे ५ मुख्य अंग.",
        core: "निदान, पूर्वरूप, रूप, उपशय आणि संप्राप्ती हे ५ भाग आहेत.",
        clinical: "रोगाच्या मूळ कारणापासून चिकित्सा करण्यासाठी याचा उपयोग होतो."
      }
    },
    't015': {
      intro: "**Shat-kriya-kala** (The Six Stages of Disease) explains the chronological progression of a disease. It allows a Vaidya to intervene early before the pathology becomes irreversible.",
      core: "The stages are: **Sanchaya** (Accumulation), **Prakopa** (Aggravation), **Prasara** (Spread), **Sthana-samshraya** (Localization), **Vyakti** (Manifestation), and **Bheda** (Complication/Chronicity). Early detection in the Sanchaya stage is 'easier' to treat than a fully manifested 'Vyakti' disease.",
      clinical: "Clinically, we aim to catch Dosha imbalances in the first three stages. If a patient has mild bloating (Sanchaya of Vata), simple spices can fix it. If it reaches 'Sthana-samshraya' in the joints, it becomes Arthritis, requiring intensive therapy.",
      marathi: {
        intro: "षट्-क्रिया-काल म्हणजे रोग निर्माण होण्याच्या ६ अवस्था.",
        core: "संचय, प्रकोप, प्रसार, स्थान-संश्रय, व्यक्ती आणि भेद.",
        clinical: "सुरुवातीच्या अवस्थेत रोग दूर करणे सोपे असते."
      }
    },
    't016': {
      intro: "**Janapadodhwansa** refers to events that destroy large populations simultaneously, similar to modern pandemics or natural disasters. Ayurveda attributes this to 'Adharma' (wrong conduct) leading to environmental degradation.",
      core: "Four factors are primarily affected: **Vayu** (Air), **Jala** (Water), **Desha** (Land), and **Kala** (Time). When these become toxic, entire communities fall ill regardless of individual Prakriti. This concept highlights the importance of environmental health for human health.",
      clinical: "Treatment focuses on **Rasayana** for mass immunity and 'Sadvritta' (ethical conduct) to restore social and environmental harmony. It involves public health measures like water purification and air fumigation with anti-microbial herbs.",
      marathi: {
        intro: "जनपदोद्ध्वंस म्हणजे मोठ्या प्रमाणात लोकसंख्या नष्ट करणारे उपद्रव (साथीचे रोग).",
        core: "हवा, पाणी, जागा आणि वेळ या ४ घटकांच्या प्रदूषणामुळे हे घडते.",
        clinical: "सामाजिक आरोग्य आणि पर्यावरण रक्षणातून हे दूर करता येते."
      }
    },
    't017': {
      intro: "**Langhana** (Depletion) and **Brimhana** (Nourishment) are the two primary therapeutic directions in Ayurveda (Dwividha Upakarma). All treatments fall under one of these categories.",
      core: "Langhana is used for 'Santarpanotta' diseases (excessive nutrition like Obesity). It includes fasting and purification. Brimhana is for 'Apatarpanotta' diseases (deficiency/wasting). It includes tonic herbs and heavy nutrition. Balance between these two is the goal of clinical practice.",
      clinical: "In a 'Sthula' (obese) patient, we use Langhana to clear Srotorodha. In a 'Krisha' (emaciated) patient, we use Brimhana like Ashwagandha and Ghee. Knowing which one to apply is the mark of a skilled practitioner.",
      marathi: {
        intro: "लंघन (कमी करणे) आणि बृंहण (वाढवणे) हे दोन मुख्य चिकित्सा प्रकार आहेत.",
        core: "मेद-वृद्धीमध्ये लंघन तर दुर्बलतेमध्ये बृंहण दिले जाते.",
        clinical: "रुग्णाच्या गरजेनुसार या दोन्ही मार्गांचा वापर होतो."
      }
    },
    't018': {
      intro: "**Deepana** (Carminative) and **Pachana** (Digestive) are the Twin-Pillar therapies for correcting Agni and Ama. They are almost always the first step in any Ayurvedic treatment.",
      core: "Deepana stimulates the **Jatharagni** (digestive fire) without necessarily digesting toxins. Pachana directly 'cooks' or digests the **Ama** (toxins). Spices like Shunthi (Ginger) often perform both actions, clearing the path for successful herb absorption.",
      clinical: "Before giving heavy tonics, we must ensure 'Deepana-Pachana' is complete. Otherwise, the tonic will just create more Ama. Signs of success include a clear tongue, return of appetite, and lightness of the body.",
      marathi: {
        intro: "दीपन (अग्नी वाढवणे) आणि पाचन (आम पचन करणे) या प्राथमिक चिकित्सा आहेत.",
        core: "अग्नी मांडल्यास दीपन आणि 'आम' असल्यास पाचन औषधी महत्त्वाच्या आहेत.",
        clinical: "कोणत्याही चिकित्सेपूर्वी या दोन्ही क्रिया करणे गरजेचे आहे."
      }
    },
    't019': {
      intro: "**Sneha** (Oleation) and **Sweda** (Sudation) are the foundational 'Poorva Karmas' (preparatory acts) that prepare the body for deep purification. They soften the tissues and bring Doshas to the gut.",
      core: "Sneha uses oils/ghee internally and externally to lubricate the 'Srotas'. Sweda uses heat to liquefy the 'stuck' Doshas. Without these two, purification (Shodhana) is like trying to dry-clean a cloth without water/soap; it can damage the tissues.",
      clinical: "In the clinic, we use Abhyanga (Massage) and Bashpa Sweda (Steam) regularly for pain relief. For chronic Vata issues, internal 'Snehapana' (drinking ghee) is the ultimate remedy for deep-seated dryness and rigidity.",
      marathi: {
        intro: "स्नेहन (तेल/तूप वापरणे) आणि स्वेदन (वाफ देणे) या पूर्व प्रक्रिया आहेत.",
        core: "यामुळे शरीरातील दोष विलीन होऊन कोष्ठात येतात.",
        clinical: "पंचकर्मापूर्वी या दोन्ही क्रिया करणे अनिवार्य आहे."
      }
    },
    't020': {
      intro: "**Koshta** (Gastro-intestinal tract status) and **Agni** (Digestive fire) analysis are mandatory before prescribing any internal medication. They determine the 'drug sensitivity' of the patient.",
      core: "Koshta is classified as **Mrudu** (Soft - easily purged), **Madhyama** (Medium), or **Krura** (Hard - resistant to purging). This tells us the dose of laxatives. Agni analysis tells us the metabolic rate. A Krura Koshta patient with Mandagni requires a very different approach than a Mrudu Koshta patient.",
      clinical: "Prescribing a high dose of purgative to a Mrudu Koshta patient can cause dehydration. Similarly, a low dose for a Krura Koshta patient is ineffective. Precision in this analysis prevents 'Vyapat' (complications) in clinical practice.",
      marathi: {
        intro: "कोष्ठ आणि अग्नी यांचे निदान चिकित्सेपूर्वी गरजेचे आहे.",
        core: "मृदू, मध्यम आणि क्रूर असे कोष्ठाचे प्रकार आहेत.",
        clinical: "औषधाची मात्रा ठरवण्यासाठी याचा खूप मोठा उपयोग होतो."
      }
    },
    't021': {
      intro: "**Shodhana** (Purification) and **Shamana** (Palliation) are the two modes of disease management. Shodhana exits the Doshas, while Shamana balances them within the body.",
      core: "Shodhana (Panchakarma) is used when Doshas are extremely high. It is like uprooting a weed. Shamana (Herbs/Diet) is for moderate imbalances. It is like trimming the weed. Shodhana offers a permanent cure, while Shamana requires longer duration and can have recurrences.",
      clinical: "In the OPD, we start with Shamana for acute conditions. For chronic, deep-seated issues, we admit the patient for Shodhana. The choice depends on the patient's 'Bala' (strength)—Shodhana is intensive and requires good stamina.",
      marathi: {
        intro: "शोधन (शरीर-शुद्धी) आणि शमन (दोष-शांती) हे दोन उपचार मार्ग आहेत.",
        core: "पंचकर्म हे 'शोधन' आहे तर औषधी देणे हे 'शमन' आहे.",
        clinical: "रोगाचा वेग आणि रुग्णाच्या बलानुसार याची निवड केली जाते."
      }
    },
    't022': {
      intro: "**Vyadhikshamatva** is the Ayurvedic concept of immunity, encompassing both the prevention of disease onset and the ability to fight manifested disease.",
      core: "It is categorized into **Sahaja** (Innate/Genetic), **Kalaja** (Seasonal/Age-related), and **Yuktikrita** (Acquired through diet/lifestyle/herbs). Ojas is the biological substrate of this resilience. Balance of all three Doshas is required for optimal Vyadhikshamatva.",
      clinical: "We improve Vyadhikshamatva using **Rasayanas**. In the post-COVID era, this concept is vital. We teach patients that health is not just the absence of disease, but the presence of 'Kshamatva'—the power to resist environmental and internal stressors.",
      marathi: {
        intro: "व्याधिक्षमत्व म्हणजे शरीराची रोग-प्रतिकारशक्ती (Immunity).",
        core: "सहज, कालज आणि युक्तिकृत असे याचे तीन प्रकार आहेत.",
        clinical: "आहार-विहार आणि रसायन यांच्यामुळे ही शक्ती वाढवता येते."
      }
    },
    't023': {
      intro: "**Ahara Vidhi** are the logic-based rules of eating. Ayurveda believes that 'How' you eat is just as important as 'What' you eat for maintaining Agni.",
      core: "Rules include: eating only when hungry, eating warm food (**Ushna**), unctuous food (**Snigdha**), and in proper quantity (**Matravat**). It also emphasizes **Viruddha Ahara** (Incompatible combinations like milk and fish) which act like slow poison in the body.",
      clinical: "Most digestive issues like Acid Reflux are caused by 'Atyashana' (over-eating) or 'Vishamashana' (irregular eating). Correcting Vidhi is the first 'Chikitsa'. We advise patients to fill 1/3 of the stomach with solids, 1/3 with liquids, and leave 1/3 for air/digestion.",
      marathi: {
        intro: "आहार विधी म्हणजे जेवणाचे नियम.",
        core: "गरम आणि ताजे अन्न, भूक लागल्यावर जेवणे यांसारखे नियम सांगितले आहेत.",
        clinical: "पाचन-रोग दूर करण्यासाठी आहार-विधी पाळणे गरजेचे आहे."
      }
    },
    't024': {
      intro: "**Vihara** (Lifestyle conduct) covers daily physical activities, exercise, and ethical behavior. It is the 'active' component of health maintenance.",
      core: "It includes **Vyayama** (Exercise - to be done to half capacity), **Sadvritta** (Moral conduct), and **Achara Rasayana** (Behavioral rejuvenation). Consistent Vihara prevents mental stress (Manas vikriti) and maintains physical 'Bala'.",
      clinical: "We prescribe specific Vihara for different seasons. For example, avoiding daytime sleep in Winter but allowing it in Summer. For mental health, 'Dharaniya Vega' (Controlling negative urges like anger/greed) is the chief Vihara practice.",
      marathi: {
        intro: "विहार म्हणजे शारीरिक आणि मानसिक आचरण (Lifestyle).",
        core: "व्यायाम, सवृत्त आणि योग्य विश्रांती यांचा उपयोग होतो.",
        clinical: "स्वास्थ्य रक्षणात आहारासोबतच विहाराला खूप महत्त्व आहे."
      }
    },
    't025': {
      intro: "The **Historical Evolution of Ayurvedic Samhitas** tracks the transition of knowledge from the Oral tradition (Vedas) to the classical written medical texts that we study today.",
      core: "The lineage follows: Brahma -> Prajapati -> Ashvinikumar -> Indra -> Bharadwaja. The 'Brihat-trayi' (The Great Three: Charaka, Sushruta, Vagbhata) form the core of current BAMS curriculum. They provide the most authenticated details of internal medicine, surgery, and clinical synthesis respectively.",
      clinical: "Understanding the era of a text (e.g., Charaka is ~2nd century BCE) helps us contextualize the geographical and ecological advice provided. It also shows a clear, unbroken line of clinical evidence spanning thousands of years, proving the validity of Ayurvedic principles.",
      marathi: {
        intro: "आयुर्वेदातील ग्रंथांचा (संहिता) इतिहास आणि त्यांचा विकास.",
        core: "चरक, सुश्रुत आणि वाग्भट या 'बृहत्-त्रयी' मुख्य आहेत.",
        clinical: "प्राचीन ज्ञानाला आधुनिक संदर्भात समजावून घेण्यासाठी इतिहास महत्त्वाचा आहे."
      }
    }


  },
  'kriya-sharir': {
    't001': {
      intro: "Kriya Sharir (Physiology) focuses on the dynamic interaction of Doshas, Dhatus, and Malas. It explains how the body functions to maintain stability and react to the environment. Understanding normal function is the only way to recognize pathological deviations.",
      core: "The functional unit is the **Srotas** (Channel). Life depends on the continuous movement (Gati) of nutrients into these channels and waste out of them. We also study the role of the **Atma** (Soul) and **Manas** (Mind) in coordinating these physical processes.",
      clinical: "Physiological assessment includes checks for 'Dhatu-samya' (Tissue Equilibrium). We look for normal color, strength, and sensory sharpness. Deviations tell us which functional system (Prana-vaha, Anna-vaha, etc.) is failing.",
      marathi: {
        intro: "क्रिया शरीर (Physiology) दोष, धातू आणि मलांच्या गतिमान परस्परसंवादावर लक्ष केंद्रित करते. शरीर स्थिरता टिकवून ठेवण्यासाठी आणि वातावरणाला प्रतिसाद देण्यासाठी कसे कार्य करते हे ते स्पष्ट करते.",
        core: "कार्यात्मक एकक म्हणजे **स्त्रोतस** (वाहिनी). जीवन या वाहिन्यांमध्ये पोषक तत्वांच्या सतत हालचालीवर (गती) आणि त्यातून कचरा बाहेर काढण्यावर अवलंबून असते.",
        clinical: "शारीरिक मूल्यांकनामध्ये 'धातू-साम्य' (उतक संतुलन) तपासणीचा समावेश होतो. आम्ही सामान्य रंग, शक्ती आणि संवेदनांची तीव्रता पाहतो."
      }
    },
    't002': {
      intro: "**Vata Dosha** is divided into five Sub-doshas (Prana, Udana, Samana, Vyana, and Apana), each with a specific location and direction of movement. Vata is the 'driver'—without it, Pitta and Kapha cannot move.",
      core: "**Prana** (head) governs inhalation and sensory input. **Udana** (chest) governs speech and effort. **Samana** (stomach) governs digestion. **Vyana** (heart) circulates blood. **Apana** (colon) governs excretion and reproduction. Each subtype must move in its designated direction (Anulomana) for health.",
      clinical: "If a patient has constipation, **Apana Vata** is moving upward instead of downward. If they have irregular heartbeats, **Vyana Vata** is disturbed. We use Vata-anulomana drugs like Haritaki to restore the natural direction of these air-currents.",
      marathi: {
        intro: "वात दोष ५ प्रकारचा असतो: प्राण, उदान, समान, व्यान आणि अपान.",
        core: "प्रत्येकाचे शरीरात विशिष्ट कार्य आणि स्थान सांगितले आहे.",
        clinical: "वाताचे अनुलोमन चिकित्सेत अत्यंत महत्त्वाचे आहे."
      }
    },
    't003': {
      intro: "**Pitta Dosha Subtypes** (Pachaka, Ranjaka, Sadhaka, Alochaka, and Bhrajaka) represent different facets of transformation, from digestion to visual perception and metabolic heat.",
      core: "**Pachaka** (Stomach) is the main Pitta governing digestion. **Ranjaka** (Liver/Spleen) colors the blood. **Sadhaka** (Heart) governs mental intelligence and courage. **Alochaka** (Eyes) facilitates vision. **Bhrajaka** (Skin) maintains luster and processes topical applications.",
      clinical: "If a patient is pale, **Ranjaka Pitta** is failing to color the Rakta. If they have poor memory or depression, we focus on **Sadhaka Pitta** using herbs like Brahmi. High acidity (Amla-pitta) is a direct 'Vikriti' of Pachaka Pitta.",
      marathi: {
        intro: "पित्त दोषाचे ५ उपप्रकार आहेत: पाचका, रंजका, साधका, आलोचका आणि भ्राजका.",
        core: "हे शरीरातील पचन, रक्ताचा रंग, बुद्धी आणि ज्ञानेंद्रिये यांचे नियंत्रण करतात.",
        clinical: "पांडुता (ॲनिमिया) असल्यास रंजक तर मानसिक त्रासात साधक पित्ताचा विचार केला जातो."
      }
    },
    't004': {
      intro: "**Kapha Dosha Subtypes** (Kledaka, Avalambaka, Bodhaka, Tarpaka, and Shlesaka) provide structure, lubrication, and emotional stability to the body.",
      core: "**Kledaka** (Stomach) moistens food. **Avalambaka** (Chest) supports the heart and lungs. **Bodhaka** (Tongue) enables taste. **Tarpaka** (Head) nourishes the sense organs. **Shlesaka** (Joints) provides lubrication (synovial fluid) for movement.",
      clinical: "When joints crack or hurt (**Sandhi-shula**), **Shlesaka Kapha** is depleted. If the mouth feels dry, **Bodhaka Kapha** is disturbed. We use 'Brimhana' (nourishing) therapies like Ghee or specific herbal pastes to restore these vital lubricants.",
      marathi: {
        intro: "कफ दोष ५ प्रकारचे आहेत: क्लेदक, अवलंबक, बोधक, तर्पक आणि श्लेषक.",
        core: "हे शरीराला मार्दव (वंगण) आणि शक्ती प्रदान करतात.",
        clinical: "संधी-वातात (सांधेदुखी) श्लेषक कफाचा क्षय होतो."
      }
    },
    't005': {
      intro: "**Dhatu Poshana Nyaya** refers to the classical laws of tissue nutrition. They explain how the nutrients from 'Ahara Rasa' are distributed and transformed into the seven tissues (Dhatus).",
      core: "Three main theories exist: **Ksheera-Dadhi Nyaya** (Transformation - like Milk to Curd), **Kedari-Kulya Nyaya** (Irrigation - like water flowing through fields), and **Khale-Kapota Nyaya** (Selection - like pigeons picking specific grains). Together, they explain sequential and simultaneous tissue formation.",
      clinical: "If a patient has strong muscles (Mamsa) but weak bones (Asthi), it means the **Khale-Kapota** selection process is failing for Asthi. We use 'Dhatu-Agni' stimulators to fix the specific path that is blocked, rather than just giving generic supplements.",
      marathi: {
        intro: "धातू पोषण न्याय म्हणजे धातूंचे शरीरात कसे पोषण होते याचे सिद्धांत.",
        core: "क्षीर-दधि, केतारी-कुल्या आणि खले-कपोत हे ३ मुख्य सिद्धांत आहेत.",
        clinical: "धातूंचे क्षय-वृद्धी समजण्यासाठी या सिद्धांतांचा उपयोग होतो."
      }
    },
    't006': {
      intro: "**Rasa Dhatu** is the first tissue formed after digestion. It is the plasma/lymph that circulates and 'pleases' (Prinana) every cell with nutrients.",
      core: "Its 'Upadhatu' is Breast milk (Stanya) and Menstrual fluid (Artava). Its 'Mala' is Kapha. Healthy Rasa leads to glowing skin and mental happiness. **Rasa-kshaya** leads to dryness, exhaustion, and intolerance to noise.",
      clinical: "Dehydration or Anemia (initial stage) is often **Rasa-dhatu-kshaya**. We treat it with juicy fruits, sugarcane, and herbs like Shatavari. Measuring 'Rasa-sara' (quality of plasma) is the first step in assessing a person's metabolic baseline.",
      marathi: {
        intro: "रस धातू म्हणजे पचनानंतर बनलेल्या आहार-रसाचा पुढील भाग.",
        core: "याचे मुख्य कार्य शरीराला तप्ती (समाधान) आणि पोषण देणे आहे.",
        clinical: "थकवा आणि त्वचेचा रुक्षपणा रस-क्षय दर्शवतो."
      }
    },
    't007': {
      intro: "**Rakta Dhatu** (Blood) is responsible for 'Jeevana' (sustenance of life). It carries the 'Tejas' (heat) and oxygen to all parts of the body.",
      core: "It is formed from Rasa through the action of **Ranjaka Pitta**. Its 'Upadhatu' is Blood vessels (Sira) and Tendons (Kandara). Its 'Mala' is Pitta. A healthy Rakta-sara person has copper-colored nails, eyes, and tongue.",
      clinical: "Bleeding disorders (**Raktapitta**) and skin diseases (Kushtha) are primarily Rakta-dhatu disturbances. We use bitter (Tikta) herbs like Manjistha and Neem to 'cool' the blood and remove 'Visha' (toxins) from this vital tissue.",
      marathi: {
        intro: "रक्त धातू म्हणजे शरीरातील जीवनाचा आधार (Blood).",
        core: "हे शरीराला लाल रंग आणि तेज (उष्णता) प्रदान करते.",
        clinical: "पाळीचे त्रास आणि त्वचा-रोग रक्त-दुष्टीमुळे होतात."
      }
    },
    't008': {
      intro: "**Mamsa Dhatu** (Muscle) provides 'Lepana' (covering and plastering) to the skeletal frame. It is responsible for physical strength (Bala) and protection of vital organs.",
      core: "It is developed from Rakta through Mamsagni. Its 'Upadhatu' is Fat layers (Vasa) and Skin (Twak). Its 'Mala' is Earwax and secretions (Kha-mala). Good Mamsa leads to well-defined joints and endurance.",
      clinical: "In cases of muscular dystrophy or wasting (Mamsa-kshaya), we use 'Brimhana' therapy like Ashwagandha and meat soups (Mamsa-rasa). For tumors (Arbuda), we look at 'Mamsa-vriddhi' (excessive growth) as the pathological base.",
      marathi: {
        intro: "मांस धातू शरीराला आकार आणि शक्ती देतो.",
        core: "हे शरीरातील मुख्य अवयवांचे रक्षण करते.",
        clinical: "शारीरिक कमजोरी आणि मांस-शोष (wasting) यामध्ये याचा विचार केला जातो."
      }
    },
    't009': {
      intro: "**Meda Dhatu** (Adipose/Fat) provides 'Snehana' (lubrication) and 'Sweda' (sweat). It is the energy reservoir and insulator of the body.",
      core: "It is formed from Mamsa. Its 'Upadhatu' is Ligaments (Snayu). Its 'Mala' is Sweat (Sweda). Excess Meda leads to **Sthulya** (Obesity) and obstruction of other tissue nutrients (Srotorodha).",
      clinical: "Obesity management focuses on 'Meda-hara' (fat-reducing) herbs like Guggulu and Triphala. High cholesterol is seen as 'Meda-dusthi'. Treatment must involve 'Lekhana' (scraping) to clear the pathways and restore normal Medo-dhatvagni.",
      marathi: {
        intro: "मेद धातू म्हणजे शरीरातील चरबी (Fat).",
        core: "हे शरीराला मार्दव आणि उष्णता प्रदान करते.",
        clinical: "स्थौल्य (Obesity) म्हणजे मेद-धातूची वृद्धी होय."
      }
    },
    't010': {
      intro: "**Asthi Dhatu** (Bone) is the densest tissue providing 'Dharana' (holding up the structure). It protects the delicate nerves and marrow within.",
      core: "It is formed from Meda. Its 'Upadhatu' is Teeth (Danta). Its 'Mala' is Hair and Nails (Kesha & Nakha). Vata has a special 'Ashraya-Ashrayi' relationship with Asthi; when Vata increases, Asthi decreases (Osteoporosis).",
      clinical: "Bone density issues correspond to **Asthi-kshaya**. Brittle nails and hair loss are early warning signs. We use Calcium-rich 'Bhasmas' (like Shukti or Godanti) and medicated oils through 'Basti' (Milk enema) to treat bone-related ailments.",
      marathi: {
        intro: "अस्थि धातू म्हणजे शरीरातील हाडांची रचना.",
        core: "शरीराला आधार (Support) देणे हे याचे मुख्य कार्य आहे.",
        clinical: "हाडांमधील ठिसूळपणा (Osteoporosis) म्हणजे अस्थि-क्षय."
      }
    },
    't011': {
      intro: "**Majja Dhatu** (Marrow/Nervous Tissue) fills the cavities of the bones (Purana). It is responsible for sensory perception and 'Sneha' of the bones.",
      core: "It contributes to 'Balya' (Strength) and 'Shukra-pushti' (Nourishing reproductive tissue). Healthy Majja leads to soft joints, clear voice, and sharp intellect. Its 'Upadhatu' is not explicitly listed in most texts, but some consider hair/tears.",
      clinical: "Neurological disorders like tremors (Kampa-vata) involve **Majja-dusthi**. We use 'Majja-gamitwa' herbs like Brahmi and Jyotishmati. It is also the seat of 'Dhee' (Acquisition), 'Dhriti' (Retention), and 'Smriti' (Recall).",
      marathi: {
        intro: "मज्जा धातू हाडांच्या आतील भाग आणि चेता-संस्थेशी संबंधित आहे.",
        core: "हा शरीराला 'पूरण' (भरणे) आणि ज्ञानेंद्रियांना शक्ती प्रदान करतो.",
        clinical: "चेता-संस्थेचे विकार आणि बुद्धिमत्ता यावर मज्जा-धातूचा प्रभाव असतो."
      }
    },
    't012': {
      intro: "**Shukra Dhatu** is the refined reproductive essence responsible for 'Garbhotpadana' (procreation) and the overall 'glow' (Ojas) of the person.",
      core: "In males, it is Sperm/Semen; in females, it is the deeper Essence (not just Artava). It is present in every cell but manifests specifically at the designated centers. It provides stability, strength, and attraction.",
      clinical: "Fertility issues (Klaibya) are treated with **Vajikarana** herbs like Kapikacchu and Musli. Preservation of Shukra is considered the key to longevity and high immunity (Vyadhikshamatva). It is the seventh and final tissue in the nutrition chain.",
      marathi: {
        intro: "शुक्र धातू म्हणजे प्रजनन शक्ती आणि शरीरातील तेज.",
        core: "हा नवीन सजीव निर्माण करण्यासाठी आवश्यक असतो.",
        clinical: "वाजीकरण चिकित्सा शुक्र-धातूसाठी दिली जाते."
      }
    },
    't013': {
      intro: "**Mala Kriya** refers to the physiology of waste products (Malas). Ayurveda says 'Malas are the roots of the body' when they are in balance, as they maintain the structural pressure of organs.",
      core: "The three main Malas are **Purisha** (Feces), **Mutra** (Urine), and **Sweda** (Sweat). Purisha maintains the tone of the colon; Mutra handles fluid balance; Sweda manages skin moisture and temperature. Their timely elimination is crucial (Malotsarga).",
      clinical: "Retention of waste (**Mala-sanga**) creates toxins (Ama). For instance, constipation (Vibandha) is the root of many Vata diseases. We analyze the smell, color, and consistency of Malas to diagnose deep-seated metabolic errors.",
      marathi: {
        intro: "मल क्रिया म्हणजे शरीरातील टाकाऊ पदार्थांचे वहन आणि निष्कासन.",
        core: "पुरीष, मूत्र आणि स्वेद हे मुख्य मल आहेत.",
        clinical: "मल-संगामुळे अनेक विकार होतात, म्हणून नियमित पचन महत्त्वाचे आहे."
      }
    },
    't014': {
      intro: "**Purisha** (Feces) and **Mutra** (Urine) have specific roles in maintaining 'Samashariratva' (Physical balance). Their formation occurs in the Pakvashaya (Colon) and Vrikka (Kidneys).",
      core: "Purisha provides support to the lower abdomen. Mutra is the byproduct of Agni working on fluids. Healthy Purisha should float in water (sign of no Ama). Healthy Mutra is clear/pale and flows without obstruction or burning.",
      clinical: "Frequent urination (Prameha) or lack of it (Mutraghata) are clinical markers. Piles (Arsha) occur when Purisha is too hard (Vibandha) for too long. We use 'Bhedana' or 'Anulomana' herbs to correct these processes according to the specific Dosha involved.",
      marathi: {
        intro: "पुरीष (मल) आणि मूत्र यांची निर्मिती आणि कार्ये.",
        core: "शरीरातील टॉक्सिन्स बाहेर काढण्यासाठी हे मार्ग महत्त्वाचे आहेत.",
        clinical: "प्रमेह (मधुमेह) मध्ये मूत्राचा विचार केला जातो."
      }
    },
    't015': {
      intro: "**Sveda** (Sweat) is the 'Mala' of Meda Dhatu. Its primary function is 'Kleda-vidhruti' (holding moisture) and skin health.",
      core: "Sweating maintains the body's internal temperature and cleanses the superficial Srotas. Lack of sweat (**Asveda**) leads to dry skin and Vata issues; excessive sweat (**Atisveda**) leads to fungal infections and Pitta aggravation.",
      clinical: "In clinical practice, we induce sweating (**Swedana**) to liquefy toxins. For skin diseases where there is no sweat (like Psoriasis/Eczema), we use 'Bashpa Sweda' to open the blocked pores and allow the Vata to escape.",
      marathi: {
        intro: "स्वेद म्हणजे घाम, जो मेद धातूचा मल आहे.",
        core: "त्वचेचा मार्दव आणि उष्णता नियंत्रण हे याचे कार्य आहे.",
        clinical: "त्वचा-रोगात घाम येणे गरजेचे आहे, म्हणून स्वेदन चिकित्सा दिली जाते."
      }
    },
    't016': {
      intro: "The **Atma** (Soul) and **Indriya** (Senses) are the non-physical components that make the body 'alive' and 'conscious'. Ayurveda treats the person as a whole: Atma-Indriya-Manas-Sharira.",
      core: "The Atma is the observer (**Sakshi**). The Indriyas are the tools through which we experience the world. There are 5 Jnanendriya (Sensory) and 5 Karmendriya (Motor). Coordination of these through the Mind (Manas) is essential for 'Samyak' (proper) knowledge.",
      clinical: "Loss of sensory perception (Indriya-abhava) without physical damage points to Atma/Manas disturbances. We use 'Sattvavajaya' (mental therapy) and 'Daiva Vyapashraya' (spiritual therapy) to treat these deep-seated coordination issues.",
      marathi: {
        intro: "आत्मा आणि इंद्रिये शरीराला चेतना देते.",
        core: "१० इंद्रिये आणि १ मन यांद्वारा आपण जग पाहतो.",
        clinical: "ज्ञानेंद्रियांची कार्यक्षमता मानसिक आरोग्यावर अवलंबून आहे."
      }
    },
    't017': {
      intro: "**Nidra** (Sleep) is one of the three pillars of life. It is the time when the body recovers, the Agni stabilizes, and the tissues are repaired.",
      core: "Healthy sleep is caused by 'Tamas' naturally increasing at night, calming the Rajas and Vata. **Akala Nidra** (sleeping at wrong times) leads to obesity and dullness. **Nidra-nasha** (Insomnia) leads to Vata-vriddhi and mental exhaustion.",
      clinical: "For Insomnia, we use 'Shirodhara' and 'Abhyanga' to calm the Vata. We advise patients to avoid 'Diva-swapna' (day sleep) as it creates 'Meda' and 'Kapha' blockages. Sleep is the best 'Brimhana' (nourishing) therapy available.",
      marathi: {
        intro: "निद्रा म्हणजे झोप, शरीराला पूर्वस्थितीत आणण्यासाठी आवश्यक.",
        core: "नियमित झोपेमुळे बुद्धी आणि शरीर शक्तिशाली होते.",
        clinical: "झोप न येणे (Insomnia) हा वात-दोषामुळे होणारा त्रास आहे."
      }
    },
    't018': {
      intro: "**Artava** (Menstrual Fluid) and **Stanya** (Breast Milk) are the 'Upadhatus' of Rasa and Rakta respectively. They define the reproductive health of the female body.",
      core: "Artava is not just the menstrual discharge but the ovulatory force as well. Stanya is the primary source of 'Ojas' for the infant. Their health depends directly on the quality of 'Ahara Rasa' and the peace of the mother's mind.",
      clinical: "Menstrual irregularities (Artava-vyapat) are treated by correcting the Rasa and Rakta Dhatus. Breast milk deficiency is managed with 'Galactagogues' (Stanya-janaka) like Shatavari and proper hydration. They are indicators of the mother's nutritional status.",
      marathi: {
        intro: "आर्तव (Menstruation) आणि स्तन्य (Breast milk) हे स्त्री-विशिष्ट घटक आहेत.",
        core: "यावर स्त्रीचे प्रजनन आरोग्य अवलंबून असते.",
        clinical: "पाळीचे त्रास आणि दूध कमी येणे यावर आयुर्वेदिक उपचार खूप फायदेशीर आहेत."
      }
    },
    't019': {
      intro: "**Garbha Sambhava** (Embryogenesis) factors are the four essentials for healthy conception: **Ritu** (Season/Timing), **Kshetra** (Womb), **Ambu** (Nutrients), and **Bija** (Ovum/Sperm).",
      core: "If any of these is 'Dusta' (defective), the resulting Garbha will have congenital defects (Vikriti). Healthy progeny (**Su-praja**) is achieved through pre-conceptional purification (Shodhana) of both parents to ensure the quality of 'Bija'.",
      clinical: "We help couples achieve 'Garbha-Samskara' through these principles. Preparing the 'Kshetra' (uterine lining) and providing 'Ambu' (high-quality maternal plasma) through diet ensures a healthy pregnancy and a brilliant child.",
      marathi: {
        intro: "गर्भ संभव म्हणजे गर्भधारणेसाठी आवश्यक घटक.",
        core: "ऋतू, क्षेत्र, अम्बु आणि बीज या ४ गोष्टी उत्तम असणे गरजेचे आहे.",
        clinical: "उत्तम संतती प्राप्तीसाठी 'गर्भ-संस्कार' महत्त्वाचे आहेत."
      }
    },
    't020': {
      intro: "**Prakriti Nirmana** occurs at the very second of fertilization. The dominant Dosha at that moment determines the child's constitution (Deha-prakriti) for life.",
      core: "It is influenced by the parents' diet, their current health state, the time of day, and even their mental state during conception. This is why Ayurveda emphasizes a peaceful, holy atmosphere during the act of procreation.",
      clinical: "We analyze a child's Prakriti early to guide their diet and upbringing. A 'Kapha' child is prone to congestion and needs more activity; a 'Vata' child needs more warming, unctuous food and stability. This is truly personalized preventive care from birth.",
      marathi: {
        intro: "प्रकृती निर्माण फलित होण्याच्या क्षणीच घडते. त्या क्षणी असलेला प्रभावी दोष मुलाची जन्मजात प्रकृती (देह-प्रकृती) आयुष्यभरासाठी ठरवतो.",
        core: "हे पालकांचा आहार, त्यांची तत्कालीन आरोग्य स्थिती, दिवसाची वेळ आणि गर्भधारणेच्या वेळची मानसिक स्थिती यावर अवलंबून असते.",
        clinical: "मुलाचा आहार आणि संगोपन करण्यासाठी आम्ही सुरुवातीलाच मुलाची प्रकृती तपासतो. 'कफ' प्रकृतीच्या मुलाला अधिक हालचालींची गरज असते, तर 'वात' मुलाला अधिक स्निग्ध आहाराची."
      }
    },
    't021': {
      intro: "**Deha Bala** (Physical Strength) is classified as **Sahaja** (Innate), **Kalaja** (Age/Season related), and **Yuktikrita** (Acquired through training/diet).",
      core: "Strength is not just muscle size but the 'Vyadhikshamatva' (resistance to disease). It is peak in youth and during winter (Shishira Ritu) and lowest in extreme old age or during the peak of summer (Grishma Ritu).",
      clinical: "We assess 'Bala' using the 'Vyayama-shakti' (exercise capacity) test. Treatment doses are adjusted based on Bala. A 'Heena Bala' (weak) patient cannot tolerate strong purification, so we use gentle, slow-acting therapies for them.",
      marathi: {
        intro: "देह बल (शारीरिक शक्ती) हे **सहज** (जन्मजात), **कालज** (वय/ऋतू संबंधित) आणि **युक्तिकृत** (प्रशिक्षण/आहाराद्वारे प्राप्त) असे वर्गीकृत केले आहे.",
        core: "शक्ती म्हणजे केवळ स्नायूंचा आकार नाही तर 'व्याधिक्षमत्व' (रोगाचा प्रतिकार करण्याची क्षमता) आहे. हे तारुण्यात आणि हिवाळ्यात सर्वाधिक असते.",
        clinical: "आम्ही 'व्यायाम-शक्ती' चाचणी वापरून बलाचे मूल्यांकन करतो. बलावर आधारित औषधांच्या मात्रा समायोजित केल्या जातात."
      }
    },
    't022': {
      intro: "**Kriya-Kala** (Stages of Digestion) refers to the 'Avastha-paka' or the physiological changes food undergoes as it moves through the GI tract.",
      core: "Three stages: **Madhura** (Sweet - Kapha stage in stomach), **Amla** (Sour - Pitta stage in small intestine), and **Katu** (Pungent - Vata stage in colon). Proper transformation at each stage ensures that the right Doshas are formed to sustain the body.",
      clinical: "If a patient gets gas 3-4 hours after eating, the 'Katu' stage (Vata) in the colon is disturbed. If they get burning 1-2 hours after, the 'Amla' stage (Pitta) is problematic. Diagnosis of 'Avastha-paka' is essential for targeted digestive treatment.",
      marathi: {
        intro: "क्रिया-काल (पचनाचे टप्पे) म्हणजे अन्न पचनमार्गातून जात असताना होणारे शारीरिक बदल किंवा 'अवस्था-पाक'.",
        core: "तीन टप्पे: **मधुर** (पोटातील कफ अवस्था), **अम्ल** (लहान आतड्यातील पित्त अवस्था), आणि **कटू** (मोठ्या आतड्यातील वात अवस्था).",
        clinical: "जेवणानंतर ३-४ तासांनी गॅस होत असल्यास, मोठ्या आतड्यातील 'कटू' अवस्था विस्कळीत आहे. १-२ तासांनी जळजळ होत असल्यास, 'अम्ल' अवस्थेत समस्या आहे."
      }
    },
    't023': {
      intro: "**Upadhatu** are the secondary tissues that do not 'nourish' the next tissue but provide structural and functional support. They are derived from the 'Saara' (essence) of the main Dhatus.",
      core: "Examples: Stanya (Milk), Artava (Menstruation), Kandara (Tendons), Sira (Veins), Vasa (Muscle fat), and Twak (Skin layers). Healthy Dhatus lead to healthy Upadhatus. For instance, strong Rasa Dhatu ensures good Breast milk and Menstruation.",
      clinical: "Treating 'Twak' (Skin) issues often requires treating 'Mamsa Dhatu', its parent tissue. Treating Varicose Veins (Sira-granthi) requires treating the 'Rakta Dhatu'. This hierarchical logic is unique to Ayurvedic internal medicine.",
      marathi: {
        intro: "**उपधातू** हे दुय्यम ऊतक आहेत जे पुढील धातूचे पोषण करत नाहीत परंतु संरचनात्मक आणि कार्यात्मक आधार देतात.",
        core: "उदाहरणे: स्तन्य (दूध), आर्तव (मासिक पाळी), कंडरा (स्नायू बंध), सिरा (शिरा), वसा आणि त्वचा. निरोगी धातूंमुळे निरोगी उपधातू मिळतात.",
        clinical: "त्वचेच्या समस्यांवर उपचार करण्यासाठी अनेकदा त्याचा मूळ धातू असलेल्या 'मांस धातू'वर उपचार करावे लागतात. हे आयुर्वेदाचे वैशिष्ट्य आहे."
      }
    }
  },
  'panchakarma': {
    't001': {
      intro: "Panchakarma (The Five Actions) is the comprehensive purification system of Ayurveda. It is indicated when Doshas are extremely high (Bahudoshavastha) and cannot be balanced by mere palliative herbs. It removes toxins at the cellular level.",
      core: "The five actions are **Vamana** (Emesis), **Virechana** (Purgation), **Basti** (Enema), **Nasya** (Nasal delivery), and **Raktamokshana** (Bloodletting). They follow a rigorous cycle: Poorva Karma (Prep), Pradhana (Main), and Paschat (Post-op rehab).",
      clinical: "Panchakarma is not just a 'massage service'; it is a medical procedure. Incorrect application can lead to 'Vyapat' (complications). We use it to treat chronic skin issues, metabolic disorders, and autoimmune conditions that are resistant to other therapies.",
      marathi: {
        intro: "पंचकर्म (पाच क्रिया) ही आयुर्वेदाची सर्वसमावेशक शुद्धीकरण प्रणाली आहे. जेव्हा दोष अत्यंत वाढलेले असतात (बहुदोषावस्था), तेव्हा ते केवळ औषधांनी संतुलित होऊ शकत नाहीत, तिथे पंचकर्माची गरज असते.",
        core: "पाच क्रिया म्हणजे **वमन**, **विरेचन**, **बस्ती**, **नस्य** आणि **रक्तमोक्षण**. यामध्ये पूर्व कर्म (तयारी), प्रधान कर्म आणि पश्चात कर्म असे टप्पे असतात.",
        clinical: "पंचकर्म ही केवळ 'मसाज सर्व्हिस' नाही; ती एक वैद्यकीय प्रक्रिया आहे. याचा वापर जुनाट त्वचा विकार, चयापचय विकार आणि ऑटोइम्यून आजारांवर होतो."
      }
    },
    't006': {
      intro: "**Basti** (Medicated Enema) is regarded as the 'mother of all treatments' (Chikitsardha). It is the primary therapy for Vata-related disorders, which comprise about 80% of all diseases in Ayurveda. It acts directly on the colon, the chief seat of Vata.",
      core: "There are two main types: **Niruha** (decoction enema) to cleanse and **Anuvasana** (oil enema) to nourish. Basti doesn't just clean the bowel; its essence (Virya) travels throughout the Srotas, reaching the bones and nervous system. It balances Vata, Pitta, and Kapha simultaneously.",
      clinical: "In our clinic, Basti is used for chronic back pain, paralysis (Pakshaghata), infertility, and degenerative disorders. A 'Kala Basti' or 'Yoga Basti' course is prescribed based on the severity. It is the most powerful tool for long-term health and anti-aging (Rasayana).",
      marathi: {
        intro: "**बस्ती** (औषधी एनीमा) ला 'सर्व उपचारांची माता' (चिकित्सार्ध) मानले जाते. वात-संबंधित विकारांसाठी हा प्राथमिक उपचार आहे, जे आयुर्वेदातील एकूण ८०% आजार आहेत.",
        core: "दोन मुख्य प्रकार आहेत: **निरुह** (काढा बस्ती) शुद्धीकरणासाठी आणि **अनुवासन** (तेल बस्ती) पोषणासाठी. बस्ती केवळ आतडे स्वच्छ करत नाही तर हाडे आणि मज्जासंस्थेपर्यंत पोहोचते.",
        clinical: "आमच्या क्लिनिकमध्ये, कंबर दुखी, अर्धांगवायू (पक्षाघात), वंध्यत्व आणि झीज होणाऱ्या आजारांसाठी बस्ती वापरली जाते. हे वृद्धत्व रोखण्यासाठी (रसायन) सर्वात शक्तिशाली साधन आहे."
      }
    }
  },
  'rachana-sharir': {
    't001': {
      intro: "Rachana Sharir (Anatomy) is the study of the structure of the human body. In Ayurveda, this involves understanding the organization of organs, tissues (Dhatus), and vital points (Marmas) from both a gross and subtle perspective.",
      core: "Ayurvedic anatomy identifies the foundation of the body as the **Garbha** (Embryo), which develops through the union of Shukra and Artava. Key structural units include **Asthi** (Bones), **Sandhi** (Joints), **Snayu** (Ligaments), and **Peshi** (Muscles). The concept of **Kala** (membranous linings) is unique to Ayurvedic histology.",
      clinical: "In clinical practice, knowledge of Rachana is essential for surgical procedures and trauma management. Knowing the exact location and depth of organs helps in determining the prognosis of injuries and the reach of local therapies.",
      marathi: {
        intro: "रचना शरीर (Anatomy) म्हणजे मानवी शरीराच्या संरचनेचा अभ्यास. आयुर्वेदामध्ये, यामध्ये अवयव, धातू आणि मर्म (महत्त्वाचे बिंदू) समजून घेणे समाविष्ट आहे.",
        core: "आयुर्वेदिक शरीरशास्त्र शरीराचा पाया **गर्भ** (भ्रूण) म्हणून ओळखते. अस्थी (हाडे), संधी (सांधे), स्नायू आणि पेशी हे मुख्य संरचनात्मक घटक आहेत.",
        clinical: "क्लिनिकल प्रॅक्टिसमध्ये, शस्त्रक्रिया आणि ट्रॉमा मॅनेजमेंटसाठी रचनेचे ज्ञान आवश्यक आहे. अवयवांचे अचूक स्थान समजल्याने अचूक निदान करता येते."
      }
    },
    't002': {
      intro: "**Garbha Rachana** (Embryology) describes the monthly development of the fetus. It emphasizes the 'Masaanumasiki' (month-by-month) growth and the factors influencing the formation of organs.",
      core: "The heart starts beating in the 4th month, and the mind develops in the 5th. In the 6th month, intelligence (Buddhi) is formed. Ayurveda also describes the **Panchabhautic** contribution: Earth forms bones, Water forms fluids, Fire forms heat/vision, Air forms movement, and Space forms cavities.",
      clinical: "Month-specific diet and herbs (**Garbhini Paricharya**) are prescribed to support the specific organ developing in that month. For example, milk and ghee in the 4th month support the heart's formation. This ensures a child with no congenital structural defects.",
      marathi: {
        intro: "**गर्भ रचना** (Embryology) गर्भाचा महिना-दर-महिना विकास वर्णन करते. हे 'मासानुमासिकि' वाढ आणि अवयव निर्मितीवर प्रभाव पाडणाऱ्या घटकांवर भर देते.",
        core: "चौथ्या महिन्यात हृदय धडधडू लागते आणि पाचव्या महिन्यात मन विकसित होते. सहाव्या महिन्यात बुद्धी तयार होते. पृथ्वीपासून हाडे, पाण्यापासून द्रव, अग्नीपासून दृष्टी/उष्णता निर्माण होते.",
        clinical: "गर्भिणी परिचर्या (गर्भासाठी आहार) त्या महिन्यात विकसित होणाऱ्या अवयवाला आधार देण्यासाठी दिली जाते. यामुळे जन्मापासूनच बाळ निरोगी राहते."
      }
    },
    't003': {
      intro: "**Asthi Sharir** (Osteology) classifies the 360 bones (as per Charaka) or 300 bones (as per Sushruta). Bones are the most stable 'Dhatu' provide the permanent frame for the body.",
      core: "Bones are classified into five types: **Kapala** (Flat - skull), **Ruchaka** (Teeth), **Taruna** (Cartilage - nose/ears), **Valaya** (Curved - ribs), and **Nalaka** (Long - limbs). This classification helps in understanding the vulnerability and strength of different skeletal regions.",
      clinical: "Fracture management (**Bhagna Chikitsa**) is built on this knowledge. Different types of splints and bandages are used for 'Nalaka' vs 'Kapala' bones. Healthy 'Asthi-sara' (bone quality) is an indicator of longevity and high physical resilience.",
      marathi: {
        intro: "**अस्थि शरीर** (Osteology) चरकानुसार ३६० किंवा सुश्रुतानुसार ३०० हाडांचे वर्गीकरण करते. हाडे शरीराला कायमस्वरूपी चौकट देतात.",
        core: "हाडे पाच प्रकारची असतात: **कपाल** (फ्लॅट - कवटी), **रुचक** (दात), **तरुण** (कूर्चा - नाक/कान), **वलय** (वलय - बरगड्या), आणि **नलक** (लांब हाडे).",
        clinical: "अस्थि-भंग चिकित्सा (Fracture management) या ज्ञानावर आधारित आहे. निरोगी 'अस्थि-सार' हे दीर्घायुष्याचे आणि शारीरिक सामर्थ्याचे लक्षण आहे."
      }
    },
    't004': {
      intro: "**Sandhi Sharir** (Arthrology) details the joints and their classification based on structure and range of motion. Ayurveda recognizes 200 joints in the human body.",
      core: "Joints are broadly classified into **Cheshtavanta** (Movable) and **Sthira** (Immovable). Specific types include **Kora** (Hinge), **Ulukhala** (Ball and socket), **Samudga** (Symphysis), and **Tunnasevani** (Sutures). Healthy joints depend on the 'Shlesaka Kapha' for lubrication.",
      clinical: "In Arthritis (**Sandhigata Vata**), the lubrication dries up, leading to 'Sandhi-shula' (pain) and 'Hanti' (loss of motion). We use 'Janu Basti' (local oil pooling) to nourish the specific anatomical structure of the joint involved.",
      marathi: {
        intro: "**संधी शरीर** (Arthrology) सांध्यांचे सांध्यांचे वर्गीकरण आणि त्यांच्या हालचालींचे वर्णन करते. आयुर्वेद मानवी शरीरात २०० सांधे मानतो.",
        core: "सांधे प्रामुख्याने **चेष्टावंत** (हालचाल होणारे) आणि **स्थिर** असे वर्गीकृत आहेत. यामध्ये कोरा (हिंज), उलूखल (बॉल आणि सॉकेट) असे उपप्रकार आहेत.",
        clinical: "संधी-वात (Arthritis) मध्ये वंगण (श्लेषक कफ) सुकल्याने सांधेदुखी होते. आम्ही 'जानू बस्ती' द्वारे सांध्यांच्या संरचनेला पोषण देतो."
      }
    },
    't005': {
      intro: "**Snayu** (Ligaments/Tendons) and **Peshi** (Muscles) are the structures that bind the bones and provide the power for movement. They are the 'supporting ropes' of the body.",
      core: "There are 900 Snayus and 500 Peshi (in males). Snayus are classified into four types (Pratana, Vrutta, Prathu, Shushira). Muscles (Peshi) provide the covering for vital organs and give the body its distinct shape and contours.",
      clinical: "Sprains (Snayu-shula) are often more painful than fractures because Snayus host many minor Marma points. We use 'Lepas' (medicated pastes) and 'Upanaha' (poultices) to heal these delicate binding tissues effectively.",
      marathi: {
        intro: "**स्नायू** (Ligaments/Tendons) आणि **पेशी** (Muscles) हे हाडांना बांधून ठेवणारे आणि हालचालीसाठी शक्ती देणारे घटक आहेत.",
        core: "शरीरात ९०० स्नायू आणि ५०० पेशी असतात. स्नायू हाडांना जोडतात तर पेशी शरीराला विशिष्ट आकार आणि संरक्षण देतात.",
        clinical: "स्नायू-शूल (मोच/Sprain) हे हाड मोडण्यापेक्षा जास्त वेदनादायक असू शकते कारण स्नायूंच्या ठिकाणी अनेक मर्म बिंदू असतात. आम्ही लेप आणि उपनाह याद्वारे उपचार करतो."
      }
    },
    't006': {
      intro: "**Sira** (Veins) and **Dhamani** (Arteries) represent the vascular anatomy. While modern medicine distinguishes them by oxygen content, Ayurveda distinguishes them by their 'pulsation' and 'flow' characteristics.",
      core: "Dhamanis are 'pulsating' channels, while Siras are 'carrying' channels. All originate from the **Nabhi** (Umbilicus) in the fetus and the Heart (Hridaya) in the adult. They carry Rasa, Rakta, and even Doshas to every part of the body.",
      clinical: "Bloodletting (**Siravyadha**) is done specifically through Siras. Choosing the correct Sira based on anatomical landmarks (like the 'Kshipra Marma' area) is vital to avoid damaging the pulsating Dhamanis or adjacent nerves.",
      marathi: {
        intro: "**सिरा** (Veins) आणि **धमनी** (Arteries) रक्तवाहिन्यांचे प्रतिनिधित्व करतात. आयुर्वेद त्यांच्या 'स्पंदन' (धडधड) आणि 'वहन' वैशिष्ट्यांवरून त्यांना ओळखतो.",
        core: "धमनी म्हणजे धडधडणाऱ्या वाहिन्या, तर सिरा म्हणजे वहन करणाऱ्या वाहिन्या. सर्व शिरा नाभी आणि हृदयापासून उगम पावतात.",
        clinical: "रक्तमोक्षण (शिरा-व्यध) विशेषतः शिरांद्वारे केले जाते. धमनी किंवा मर्म बिंदूंना इजा टाळण्यासाठी अचूक 'सिरा' निवडणे आवश्यक आहे."
      }
    },
    't007': {
      intro: "**Marma Sharir** is the most critical clinical branch of Ayurvedic anatomy. Marma refers to 107 vital points where Prana (life force) resides. These points are the meeting places of Mamsa, Sira, Snayu, Asthi, and Sandhi.",
      core: "Marmas are classified by their anatomical location (Shaakha, Madhya Sharir, Shira) and by the consequence of injury (Sadyo-pranahara - instant death, Kalantara-pranahara - delayed death, etc.). Protecting these points is the hallmark of safe medicine.",
      clinical: "Clinically, Marma points are used in **Marma Therapy** to relieve pain and stimulate organ function. In surgery, avoiding these points is mandatory. Injury to a 'Sadyo-pranahara' Marma like the Heart (Hriday) or Bladder (Basti) is usually fatal.",
      marathi: {
        intro: "**मर्म शरीर** हे आयुर्वेदिक शरीरशास्त्रातील सर्वात महत्त्वाचे अंग आहे. मर्म म्हणजे १०७ महत्त्वाचे बिंदू जिथे प्राण (जीवनशक्ती) राहते.",
        core: "मर्माचे वर्गीकरण स्थानानुसार आणि दुखापत झाल्यास होणाऱ्या परिणामानुसार (सद्यः प्राणहर - तत्काळ मृत्यू, कालान्तर प्राणहर इ.) केले जाते.",
        clinical: "मर्म चिकित्सा वापरून वेदना कमी केल्या जातात आणि अवयवांचे कार्य सुधारले जाते. शस्त्रक्रियेत या बिंदूंना इजा टाळणे अनिवार्य आहे."
      }
    },
    't008': {
      intro: "**Ashaya** refers to the cavities or 'receptacles' that hold the organs and biological fluids. They provide the sheltered space for physiological processes to occur.",
      core: "The seven Ashayas are: **Vatashaya**, **Pittashaya**, **Kaphashaya**, **Raktashaya**, **Amashaya** (Stomach), **Pakvashaya** (Colon), and **Mutrashaya** (Bladder). Females have an eighth, the **Garbhashaya** (Uterus). They act as the 'working offices' of the Doshas.",
      clinical: "Disease often starts by 'lodging' in an empty Ashaya (Sthana-samshraya). For example, Ama in the Amashaya causes indigestion. We target our medicine to reach these specific anatomical cavities using 'Bheda' (breaking) or 'Shodhana' properties.",
      marathi: {
        intro: "**आशय** म्हणजे पोकळी किंवा 'कप्पे' जे अवयव आणि जैविक द्रव धरून ठेवतात. ते शारीरिक प्रक्रिया घडण्यासाठी जागा देतात.",
        core: "सात महत्त्वाचे आशय आहेत: वाताशय, पित्ताशय, कफाशय, रक्ताशय, **आमाशय** (पोट), **पक्वाशय** (मोठे आतडे) आणि **मुत्राशय**. स्त्रियांमध्ये आठवा **गर्भाशय** असतो.",
        clinical: "कोणताही रोग सुरू होताना रिकाम्या आशयात जागा घेतो. आम्ही विशिष्ट आहाराने किंवा शोधनाने या कप्प्यांपर्यंत औषध पोहोचवतो."
      }
    },
    't009': {
      intro: "**Indriya Sharir** is the anatomy of the sense organs. Ayurveda distinguishes between the physical 'seat' (Adhisthana) and the actual 'functional faculty' (Indriya) itself.",
      core: "The five Adhisthanas are the Eyes (Netra), Ears (Karna), Nose (Nasa), Tongue (Rasana), and Skin (Twak). They are composed of the five elements respectively. For example, the faculty of sight resides in the eye but is powered by 'Alochaka Pitta' and 'Tejas'.",
      clinical: "Loss of function doesn't always mean the Adhisthana is damaged; it could be the Srotas or the Mind. We use 'Tarpan' for eyes and 'Nasya' for nose to nourish these anatomical sites and their functional counterparts.",
      marathi: {
        intro: "**इंद्रिय शरीर** म्हणजे ज्ञानेंद्रियांची रचना. आयुर्वेद शारीरिक 'स्थान' (अधिष्ठान) आणि प्रत्यक्ष 'कार्यक्षमता' (इंद्रिय) यातील फरक स्पष्ट करतो.",
        core: "पाच अधिष्ठाने म्हणजे डोळे, कान, नाक, जीभ आणि त्वचा. कार्यक्षमता 'आलोचक पित्त' आणि 'तेज' द्वारे नियंत्रित केली जाते.",
        clinical: "ज्ञानेंद्रियांचे कार्य बिघडल्यास केवळ डोळा किंवा नाक खराब आहे असे नाही, तर मन किंवा स्त्रोतस यांचाही विचार करावा लागतो. यासाठी 'तर्पण' किंवा 'नस्य' वापरले जाते."
      }
    },
    't010': {
      intro: "**Shira and Kantha** (Head and Neck) is known as 'Uttamanga' (the superior organ) because it houses the master control—the Brain and all sensory inlets.",
      core: "It contains 37 Marmas. The **Shira** (Head) is where the Prana resides and from where all nerves (Nadi/Srotas) originate. The **Kantha** (Neck/Throat) connects the metabolic fire of the stomach to the sensory faculties of the head.",
      clinical: "Headaches (Shirashula) are often treated through the nose (**Nasya**) because it is the 'gateway to the head'. Injuries to the neck (Greeva) are dangerous because they involve multiple Siras (Vessels) and Snayus (Nerves) in a very compact space.",
      marathi: {
        intro: "**शिर आणि कंठ** (डोके आणि मान) ला 'उत्तमांग' (सर्वोत्तम अंग) म्हटले जाते कारण यामध्ये मेंदू आणि सर्व ज्ञानेंद्रिये असतात.",
        core: "यामध्ये ३७ मर्म असतात. शिर (डोके) ही प्राणाचे स्थान आहे आणि सर्व मज्जातंतू तिथून उगम पावतात. कंठ डोक्याकडील ज्ञानेंद्रियांना शरीराशी जोडतो.",
        clinical: "डोकेदुखीवर नाकाद्वारे (**नस्य**) उपचार केले जातात कारण नाक हे मेंदूचे प्रवेशद्वार आहे. मानेचे विकार गंभीर असू शकतात कारण तिथे अनेक शिरा आणि स्नायू असतात."
      }
    },
    't011': {
      intro: "**Ura Sharir** (Thoracic Anatomy) involves the study of the chest cavity, housing the Heart (Hridaya) and Lungs (Phupphusa). It is the seat of **Avalambaka Kapha** and **Prana Vata**.",
      core: "The Heart is described as an inverted lotus bud. It is the root of the Rasa-vaha and Prana-vaha Srotas. The lungs are formed from the 'froth' of the blood (Rakta-phena). Their rhythmic expansion is the core of physical life.",
      clinical: "In Respiratory distress (Shwasa/Kasa), we analyze the Ura region for 'Kapha-sanga' (blockage). We use localized heat (**Uro-basti**) to soften the rigid structures of the chest and allow the Prana to flow freely again.",
      marathi: {
        intro: "**उर शरीर** (Thoracic Anatomy) मध्ये छातीच्या पोकळीचा अभ्यास केला जातो, ज्यामध्ये हृदय आणि फुफ्फुस असतात.",
        core: "हृदय उपड्या कमळाच्या कळीसारखे वर्णन केले आहे. फुफ्फुसे रक्ताच्या 'फेसा' (रक्त-फेन) पासून तयार होतात. त्यांची लयबद्ध हालचाल हे जीवनाचे लक्षण आहे.",
        clinical: "श्वासाच्या विकारात (Asthma) आम्ही उर प्रदेशातील 'कफ-संग' तपासतो. छातीची जडता कमी करण्यासाठी आणि श्वास मोकळा करण्यासाठी आम्ही 'उरो-बस्ती' वापरतो."
      }
    },
    't012': {
      intro: "**Udara Sharir** (Abdominal Anatomy) covers the vast region between the diaphragm and the pelvis, containing the organs of digestion, detoxification, and waste formation.",
      core: "Key organs include **Amashaya** (Stomach), **Yakrit** (Liver), **Pleeha** (Spleen), **Vrikka** (Kidneys), and **Sshudrantra/Sthulantra** (Intestines). The **Nabhi** (Umbilicus) is the anatomical center from which the body's 'Siravyuha' (vascular network) spreads.",
      clinical: "Abdominal examination (**Udara Pariksha**) through palpation and percussion is a standard diagnostic. Ascites (**Jalodara**) is seen as a failure of the water-carrying channels (Udakavaha) within this cavity.",
      marathi: {
        intro: "**उदर शरीर** (Abdominal Anatomy) मध्ये पचन, शुद्धीकरण आणि मल निर्मितीचे अवयव असतात.",
        core: "मुख्य अवयव: **आमाशय** (पोट), **यकृत** (Liver), **प्लीहा** (Spleen), **वृक्क** (Kidneys) आणि आतडे. **नाभी** हा शरीराचा असा केंद्रबिंदू आहे जिथून रक्तवाहिन्यांचे जाळे पसरते.",
        clinical: "पोटाची तपासणी (उदर परीक्षा) निदानासाठी मानक आहे. 'जलोदर' (Ascites) हे शरीरातील जल-वहनाच्या प्रक्रियेत बिघाड झाल्याने होते."
      }
    },
    't013': {
      intro: "**Pristha Sharir** (Anatomy of the Back) focuses on the vertebral column (Pristha-vansha) and the strong muscle-ligament complexes that support our upright posture.",
      core: "It contains the **Kukundara** and **Nitamba** Marmas. The spinal cord is understood as the pathway for 'Sushumna', the subtle energy channel. The back provides the 'anchor' for the limbs and the protection for the spinal nerves.",
      clinical: "Chronic low back pain (Kati-shula) involves the **Kati-taruna** region. We use 'Kati Basti' to saturate the vertebrae and discs with medicated oils, bypassing the digestive fire for faster structural repair.",
      marathi: {
        intro: "**पृष्ठ शरीर** (Anatomy of the Back) पाठीचा कणा आणि स्नायूंच्या कॉम्प्लेक्सवर लक्ष केंद्रित करते जो शरीराला ताठ ठेवतो.",
        core: "पाठीचा कणा 'सुषुम्ना' नाडीचा मार्ग आहे. पाठ अवयवांना आधार देते आणि पाठीच्या मज्जासंस्थेचे रक्षण करते.",
        clinical: "कंबरदुखी (कटी-शूल) मध्ये आम्ही 'कटी बस्ती' वापरतो जेणेकरून मणक्यांना औषधी तेलाचे पोषण मिळून झीज भरून निघते."
      }
    },
    't014': {
      intro: "**Shaakha Sharir** refers to the anatomy of the upper and lower extremities (limbs). They are our 'Karmendriyas' (organs of action).",
      core: "Each limb is composed of bones (Asthi), joints (Sandhi), muscles (Peshi), and a complex web of Siras and Snayus. There are 11 Marmas in each limb (making 44 total). The **Tala-hridaya** (palm/sole) points are considered sub-centers of vitality.",
      clinical: "Pain in the legs (**Gridhrasi/Sciatica**) is traced through the anatomical path of the 'Kandara' (nerves). We use 'Agnikarma' on specific limb points to release the trapped Vata that causes debilitating nerve pain.",
      marathi: {
        intro: "**शाखा शरीर** म्हणजे हात आणि पाय यांची रचना. ते आमचे 'कर्मेंद्रिय' (क्रिया करण्याचे अवयव) आहेत.",
        core: "प्रत्येक अवयवात हाडे, सांधे, स्नायू आणि शिरा/स्नायूंचे जाळे असते. प्रत्येक हात आणि पायात ११ मर्म बिंदू (एकूण ४४) असतात.",
        clinical: "सायटिका (Gridhrasi) मध्ये मज्जातंतूतून वेदना होतात. आम्ही विशिष्ट मर्म बिंदूंवर 'अग्निकर्म' करून अडकलेला वात मोकळा करतो."
      }
    },
    't015': {
      intro: "**Kala Sharir** is the study of the biological membranes or 'linings' that separate the Ashayas and Dhatus. It is the Ayurvedic counterpart to Histology.",
      core: "There are seven Kalas, each with a specific name like **Purishadhara** (lining the colon) or **Raktadhara** (lining the blood vessels). They are not just physical barriers but active metabolic interfaces where 'Dhatvagni' works.",
      clinical: "Damage to a Kala leads to serious systemic issues. For example, if the **Pittadhara Kala** (duodenal lining) is damaged, the patient suffers from Grahani (IBS/Malabsorption). Treatment must focus on 'Kala-Ropana' (healing the membrane).",
      marathi: {
        intro: "**कला शरीर** म्हणजे अवयवांचे आणि कप्प्यांचे भाग करणारे जैविक पदर किंवा स्तर. हे हिस्टोलॉजीचे आयुर्वेदिक रूप आहे.",
        core: "सात कला आहेत, जसे की **पुरीषधरा** (आतड्याचा पदर) किंवा **रक्तधरा** (रक्तवाहिन्यांचा पदर). हे केवळ अडथळे नसून चयापचय प्रक्रिया घडवून आणणारे स्तर आहेत.",
        clinical: "कला खराब झाल्यास गंभीर आजार होतात. उदाहरणार्थ, जर **पित्तधरा कला** खराब झाली, तर 'ग्रहणी' (IBS) हा आजार होतो. उपचार करताना या स्तराला बरे करण्यावर भर दिला जातो."
      }
    },
    't016': {
      intro: "**Strotas Rachana** describes the anatomical physical form of the internal channels. While Srotas is a functional concept, it has a physical seat (Mula).",
      core: "Srotas are described as being 'Vritta' (cylindrical), 'Anu' (minute), and 'Dirgha' (long). They resemble the veins of a leaf. Any dilation (**Sira-granthi**) or constriction (**Srotas-sankocha**) is an anatomical basis for pathology.",
      clinical: "In Varicose Veins, the Srotas (Sira) has lost its elasticity and anatomical structure. Treatment involves restoring the tone of the 'Sira-snayu' through local compression and herbs that strengthen tissue integrity.",
      marathi: {
        intro: "**स्त्रोतस रचना** शरीरातील अंतर्गत वाहिन्यांचे भौतिक रूप वर्णन करते. स्त्रोतस ही एक कार्यात्मक संकल्पना आहे, परंतु त्याला भौतिक आधार (मूळ) आहे.",
        core: "स्त्रोतस नळीसारखे, सूक्ष्म आणि लांब असतात. ते झाडाच्या पानांच्या शिरांसारखे दिसतात. वाहिनीचा विस्तार (Varicose veins) किंवा संकोच होणे हा रोगाचा पाया आहे.",
        clinical: "व्हेरिकोज व्हेन्समध्ये, शिरा (सिरा) आपली लवचिकता आणि रचना गमावून बसते. आम्ही आकुंचन पावणाऱ्या लेपांद्वारे आणि दाबाने उपचार करतो."
      }
    },
    't017': {
      intro: "**Pramana Sharir** is the study of anthropometry—measuring the body's proportions. Ayurveda uses the 'Anjali' (volume) and 'Anguli' (length of finger) as personalized units of measurement.",
      core: "An ideal body is **'Sama-Pramana'**, where the height equals the span of the outstretched arms. Individual measurements (**Sva-angula**) are used to identify abnormalities. For example, a liver that exceeds its normal 'Anguli' count is diagnosed as Hepatomegaly.",
      clinical: "We use Pramana to assess the quality of tissues (Sara). If a person has ideal proportions, their stability (Bala) and life span (Ayu) are predicted to be high. It is a tool for both physical assessment and forensic identification.",
      marathi: {
        intro: "**प्रमाण शरीर** म्हणजे शरीराच्या अवयवांचे मोजमाप. आयुर्वेद 'अंजली' (व्हॉल्यूम) आणि 'अंगुली' (बोटाची लांबी) ही मोजमापाची एकके वापरते.",
        core: "आदर्श शरीर 'सम-प्रमाण' असते, जिथे उंची आणि पसरवलेल्या हातांचे अंतर समान असते. यकृत किंवा इतर अवयव वाढल्यास 'अंगुली' मोजमापावरून निदान केले जाते.",
        clinical: "आम्ही ऊतकांचा दर्जा (सार) तपासण्यासाठी प्रमाणाचा वापर करतो. योग्य प्रमाण असल्यास आरोग्य, शक्ती आणि आयुष्य चांगले असते असा अंदाज लावला जातो."
      }
    },
    't018': {
      intro: "**Tvak Sharir** (Anatomy of the Skin) describes the seven layers of the skin, identifying which layer is the seat of which specific skin disease.",
      core: "The layers are: **Avabhasini**, **Lohita**, **Shweta**, **Tamra**, **Vedini**, **Rohini**, and **Mamsadhara**. For example, the Tamra layer is the seat of Kilasa (Vitiligo). Each layer is nourished by a specific Dhatu (Rasa/Rakta).",
      clinical: "Understanding the depth of the skin layer affected helps in prognosis. If a disease is in the superficial 'Avabhasini', it heals quickly. If it reaches the deep 'Mamsadhara', it is difficult to cure. Medicated creams must be 'Suksma' enough to reach the target layer.",
      marathi: {
        intro: "**त्वक शरीर** (Anatomy of the Skin) त्वचेच्या सात थरांचे वर्णन करते आणि कोणता थर कोणत्या त्वचेच्या रोगाचे स्थान आहे हे ओळखते.",
        core: "थर: अवभासिनी, लोहिता, श्वेता, ताम्रा, वेदिनी, रोहिणी आणि मांसधरा. ताम्रा थर हा धवल रोग (Vitiligo) चे स्थान आहे.",
        clinical: "त्वचेचा कोणता थर बाधित झाला आहे यावरून उपचार ठरवले जातात. वरच्या थरातील रोग लवकर बरे होतात, तर सखोल 'मांसधरा' थरातील रोग बरे व्हायला कठीण असतात."
      }
    },
    't019': {
      intro: "**Kosthanga** refers to the fifteen vital organs located within the 'Kostha' (trunk). They are the functional powerhouses of the human machine.",
      core: "List includes: Hridaya (Heart), Kloma (Pancreas), Yakrit (Liver), Pleeha (Spleen), Vrikka (Kidneys), Nabhi (Umbilicus), Amashaya (Stomach), Pakvashaya (Colon), etc. Each organ has a specific 'seat' where it performs its duty.",
      clinical: "Injury to any Kosthanga is often life-threatening. Chronic failure of these organs (like Liver cirrhosis/Yakrit-dalodara) requires intensive 'Shodhana' followed by long-term 'Rasayana' to restore the organ's native power.",
      marathi: {
        intro: "**कोष्ठांग** म्हणजे शरीराच्या मध्यभागात (ट्रंक) असलेले १५ महत्त्वाचे अवयव. ते मानवी यंत्राचे कार्यात्मक पॉवरहाऊस आहेत.",
        core: "यामध्ये हृदय, क्लोम (Pancreas), यकृत, प्लीहा, नाभी, आमाशय, पक्वाशय इ. अवयवांचा समावेश होतो. प्रत्येक अवयवाचे विशिष्ट कार्य करण्यासाठी एक 'स्थान' असते.",
        clinical: "कोणत्याही कोष्ठांगाला झालेली इजा प्राणघातक असू शकते. जुनाट अवयव अपयशात (उदा. लिव्हर सिरोसिस) सखोल 'शोधन' आणि 'रसायन' आवश्यक असते."
      }
    },
    't020': {
      intro: "**Anjali Pramana** is the volumetric measurement of the body's primary fluids (Jala-tattva). One Anjali is the volume held by joining both hands.",
      core: "Standard measurements: Water (**Udaka**) - 10 Anjalis, Rasa - 9, Rakta - 8, Purisha - 7, Sveda - 6, Mutra - 4, Ojas - 1/2 Anjali. This distribution shows the precise fluid balance required for 'Sama' health.",
      clinical: "When tissues increase beyond their Anjali count (Vriddhi), it leads to 'Kleda' (excess moisture/congestion). When they decrease (Kshaya), like Rakta-kshaya (8 -> 6), the body shows signs of dryness and loss of warmth (anemia symptoms).",
      marathi: {
        intro: "**अंजली प्रमाण** शरीरातील मुख्य द्रवांचे (जल-तत्त्व) मोजमाप आहे. दोन्ही हात जोडून तयार झालेल्या पोकळीला 'अंजली' म्हणतात.",
        core: "पाणी - १० अंजली, रस - ९, रक्त - ८, पुरीष - ७, स्वेद - ६, मूत्र - ४, ओज - १/२ अंजली. हे संतुलन उत्तम आरोग्यासाठी आवश्यक आहे.",
        clinical: "जब अंजली प्रमाण वाढते (वृद्धी), तेव्हा शरीरात जडपणा आणि जळजळ होते. जेव्हा कमी होते (क्षय), जसे की रक्त-क्षय, तेव्हा कोरडेपणा आणि अशक्तपणा जाणवतो."
      }
    }
  },
  'dravyaguna-vigyan': {
    't001': {
      intro: "Dravyaguna Vigyan is the Ayurvedic science of pharmacology and pharmacognosy. It deals with the identification, properties (Guna-Karma), and clinical uses of medicinal substances, primarily plants.",
      core: "The action of any drug is understood through the **Rasa-Panchaka** framework: Rasa (Taste), Guna (Qualities), Virya (Potency), Vipaka (Post-digestive effect), and Prabhava (Specific action). This allows for a logical prediction of how a herb will affect the Doshas.",
      clinical: "A Dravyaguna expert chooses herbs based on the principle of 'Samanya-Vishesha' (Similarity and Difference). If Pitta is high, we use a herb with 'Sheeta Virya' (Cold Potency) to balance it. Precise identification (Namarupa) is the first step in ensuring drug safety.",
      marathi: {
        intro: "द्रव्यगुण विज्ञान हे आयुर्वेदाचे औषधशास्त्र (Pharmacology) आणि वनस्पतीशास्त्र (Pharmacognosy) आहे. हे औषधी पदार्थांची (प्रामुख्याने वनस्पतींची) ओळख, गुणधर्म (गुण-कर्म) आणि क्लिनिकल वापराशी संबंधित आहे.",
        core: "कोणत्याही औषधाचे कार्य **रस-पंचक** चौकटीतून समजले जाते: रस (चव), गुण (वैशिष्ट्ये), वीर्य (शक्ती), विपाक (पचनपश्चात प्रभाव) आणि प्रभाव (विशिष्ट कार्य).",
        clinical: "द्रव्यगुण तज्ञ 'सामान्य-विशेष' सिद्धांतावर आधारित औषधे निवडतात. जर पित्त वाढले असेल, तर आम्ही ते संतुलित करण्यासाठी 'शीत वीर्य' (थंड शक्ती) असलेली वनस्पती वापरतो."
      }
    },
    't002': {
      intro: "**Rasa** (Taste) is the first indicator of a drug's action. There are six primary tastes: Madhura (Sweet), Amla (Sour), Lavana (Salty), Katu (Pungent), Tikta (Bitter), and Kashaya (Astringent).",
      core: "Each Rasa is composed of two Mahabhutas. For example, Tikta Rasa (Air + Space) is incredibly light and clearing. Rasa influences the Doshas immediately upon contact with the tongue. Madhura, Amla, and Lavana reduce Vata; Tikta, Katu, and Kashaya increase it.",
      clinical: "If a patient has severe inflammation (Pitta), we avoid Amla and Lavana, and prioritize Tikta and Kashaya. Taste-based prescribing allows a Vaidya to adjust the diet even if specific herbs are not available.",
      marathi: {
        intro: "**रस** (चव) औषधाच्या कार्याचा पहिला संकेत आहे. सहा मुख्य रस आहेत: मधुर (गोड), अम्ल (आंबट), लवण (खारट), कटू (तिखट), तिक्त (कडू) आणि कषाय (तुरट).",
        core: "प्रत्येक रस दोन महाभूतांपासून बनलेला असतो. उदाहरणार्थ, तिक्त रस (वायु + आकाश) अत्यंत हलका आणि मार्ग मोकळा करणारा असतो. जिभेला स्पर्श होताच रस दोषांवर परिणाम करतो.",
        clinical: "गंभीर जळजळ (पित्त) असल्यास, आम्ही अम्ल आणि लवण रस टाळतो आणि तिक्त व कषाय रसांना प्राधान्य देतो. रसावर आधारित औषधोपचारामुळे वनस्पती नसतानाही आहारातून बदल करता येतो."
      }
    },
    't003': {
      intro: "**Guna** refers to the 10 pairs of opposite physical attributes (Gurvadi Guna) like Heavy-Light, Cold-Hot, Oily-Dry. They define the physical impact of a substance on the body tissues.",
      core: "The 20 Gunas are the tools of balance. If a disease is **Ruksha** (Dry - Vata), we treat it with its opposite, **Snigdha** (Unctuous/Oily). If it is **Guru** (Heavy - Kapha), we use **Laghu** (Light). This 'Opposite Quality' logic is the most rational basis for Ayurvedic therapy.",
      clinical: "We assess the patient's current state in terms of Gunas. A patient with 'Guru' qualities (obesity) needs herbs with 'Lekhana' (scraping) and 'Laghu' guna like Guggulu. Precise Guna analysis prevents prescribing a 'Hot' herb to a person already suffering from 'Heat'.",
      marathi: {
        intro: "**गुण** म्हणजे १० विरुद्ध भौतिक वैशिष्ट्यांच्या जोड्या (गुर्वादी गुण), जसे की जड-हलके, थंड-गरम, स्निग्ध-कोरडे. ते ऊतींवर होणारा भौतिक परिणाम ठरवतात.",
        core: "हे २० गुण संतुलनाचे साधन आहेत. जर आजार **रूक्ष** (कोरडा - वात) असेल, तर आम्ही त्याच्या विरुद्ध **स्निग्ध** (तेलासारखा) गुणाने उपचार करतो. जर तो **गुरू** (जड - कफ) असेल, तर आम्ही **लघू** (हलका) गुण वापरतो.",
        clinical: "आम्ही रुग्णाची सद्यस्थिती गुणांच्या भाषेत तपासतो. 'गुरू' गुण (लठ्ठपणा) असलेल्या रुग्णाला गुग्गुळूंसारख्या हलक्या (लघू) आणि 'लेखन' करणाऱ्या औषधांची गरज असते."
      }
    },
    't004': {
      intro: "**Virya** (Potency) is the power behind a drug's main action. It is primarily classified into **Sheeta** (Cold) and **Ushna** (Hot).",
      core: "Virya overcomes Rasa in activity. A herb might be sweet (Madhura) but if it has Ushna Virya, it will increase Pitta. Ushna Virya promotes digestion and movement, while Sheeta Virya promotes nourishment, stability, and cooling.",
      clinical: "For acute pain/spasm (Vata), we use Ushna Virya. For bleeding or inflammation (Pitta), we use Sheeta Virya. Understanding Virya ensures that the medicine addresses the 'Internal Temperature' of the disease correctly.",
      marathi: {
        intro: "**वीर्य** (शक्ति) ही औषधाच्या मुख्य कार्यामागील ताकद आहे. हे प्रामुख्याने **शीत** (थंड) आणि **उष्ण** (गरम) असे वर्गीकृत केले जाते.",
        core: "कार्यात वीर्य रसापेक्षा श्रेष्ठ असते. एखादी वनस्पती चवीला गोड (मधुर) असू शकते, परंतु उष्ण वीर्य असल्यास ती पित्त वाढवते. उष्ण वीर्य पचन आणि हालचालीला चालना देते, तर शीत वीर्य पोषण आणि स्थिरता देते.",
        clinical: "तीव्र वेदना किंवा पेटके (वात) असल्यास आम्ही उष्ण वीर्य वापरतो. रक्तस्त्राव किंवा जळजळ (पित्त) असल्यास शीत वीर्य वापरतो. वीर्य समजून घेतल्याने आजाराच्या 'अंतर्गत तापमानाला' योग्य औषध मिळते."
      }
    },
    't005': {
      intro: "**Vipaka** is the transformation of tastes after digestion. It determines the long-term, post-metabolic effect of a substance on the tissues.",
      core: "The six Rasas transform into three Vipakas: **Madhura** (Sweet), **Amla** (Sour), and **Katu** (Pungent). Madhura Vipaka nourishes (Kapha-like), Katu Vipaka reduces (Vata-like), and Amla Vipaka is generally Pitta-increasing. Vipaka explains why a medicine's long-term effect might differ from its immediate taste.",
      clinical: "We choose Vipaka based on whether the patient needs 'Brimhana' (Nourishing - Madhura Vipaka) or 'Langhana' (Depleting - Katu Vipaka). For chronic metabolic waste (Ama), Katu Vipaka herbs are essential for deep-seated cleansing.",
      marathi: {
        intro: "**विपाक** म्हणजे पचनानंतर होणारा रसाचा बदल. हे शरीराच्या ऊतींवर होणारा दीर्घकालीन, पचनपश्चात प्रभाव ठरवते.",
        core: "सहा रसांचे तीन विपाकात रूपांतर होते: **मधुर**, **अम्ल** आणि **कटू**. मधुर विपाक पोषण करतो (कफासारखा), कटू विपाक घटवतो (वातासारखा), आणि अम्ल विपाक पित्त वाढवतो.",
        clinical: "रुग्णाला पोषण (बृंहण) हवे आहे की घटवणे (लङ्घन) यानुसार आम्ही विपाक निवडतो. जुनाट चयापचय कचरा (आम) दूर करण्यासाठी कटू विपाक असलेली औषधे आवश्यक आहेत."
      }
    },
    't006': {
      intro: "**Prabhava** is the 'Specific Action' of a drug that cannot be explained by Ras-Guna-Virya-Vipaka. It is the mysterious, unique signature of the herb.",
      core: "Example: Two herbs have same Rasa-Virya-Vipaka, but one works as a brain tonic and the other as a purgative. This unique effect is called Prabhava. It represents the herb's specific affinity (**Karmatmaka**) for an organ or system.",
      clinical: "Identifying Prabhava allows us to use herbs like **Arjuna** specifically for the Heart, or **Brahmi** for the Brain, even when other herbs with similar properties don't yield the same results. It is the higher intelligence of nature manifest in the plant.",
      marathi: {
        intro: "**प्रभाव** म्हणजे औषधाची 'विशिष्ट क्रिया' जी रस-गुण-वीर्य-विपाकाद्वारे स्पष्ट करता येत नाही. ही वनस्पतीची एक गूढ, अनोखी ओळख आहे.",
        core: "उदाहरण: दोन वनस्पतींचा रस-वीर्य-विपाक समान असू शकतो, परंतु एक मेंदूसाठी टॉनिक म्हणून काम करते आणि दुसरी रेचक म्हणून. या प्रभावाला वनस्पतीचे विशिष्ट अवयवाशी असलेले आकर्षण (कर्मात्मक) मानले जाते.",
        clinical: "प्रभाव ओळखूनच आम्ही हृदयासाठी **अर्जुन** किंवा मेंदूसाठी **ब्राह्मी** वापरतो, जरी इतर सारख्या गुणांच्या वनस्पतींनी तसाच परिणाम मिळत नसला तरी."
      }
    },
    't007': {
      intro: "**Bheshaja Pariksha** (Drug Evaluation) is the process of authenticating a medicinal plant using sensory organs and traditional knowledge (Namarupa Vigyan).",
      core: "It involves checking the **Kala** (collection season), **Desha** (region of growth), and **Guna** (current quality). A herb grown in the Himalayas is different from one in a desert. Modern pharmacognosy (thin-layer chromatography, etc.) now supplements these traditional sensory tests.",
      clinical: "Using the wrong subspecies or an adulterated plant leads to 'Vyapat' (failures). We teach students to identify 'Guduchi' by its 'parchment' bark and heart-shaped leaves, ensuring we are not using a toxic look-alike.",
      marathi: {
        intro: "**भेषज परीक्षा** (Drug Evaluation) म्हणजे इंद्रिय आणि पारंपारिक ज्ञानाचा (नामरूप विज्ञान) वापर करून औषधी वनस्पतीची सत्यता तपासण्याची प्रक्रिया.",
        core: "यामध्ये वनस्पती गोळा करण्याची **वेळ** (ऋतू), **देश** (वाढण्याचा प्रदेश) आणि सद्य **गुण** तपासले जातात. हिमालयात वाढलेली वनस्पती वाळवंटातील वनस्पतीपेक्षा वेगळी असते.",
        clinical: "चुकीची पोटजात किंवा भेसळयुक्त वनस्पती वापरल्याने उपचारात अपयश (व्यापत) येते. आम्ही विद्यार्थ्यांना त्यांच्या विशिष्ट पानांच्या आकारावरून आणि वैशिष्ट्यांवरून वनस्पती ओळखायला शिकवतो."
      }
    },
    't008': {
      intro: "**Classification of Medicinal Plants** follows the 'Gana' (groups) system established by Charaka (50 groups) and Sushruta (37 groups) based on their clinical actions.",
      core: "Groups include **Deepaniya** (Digestive stimulants), **Vishagna** (Anti-toxic), **Vayah-sthapana** (Anti-aging), and **Kasahara** (Cough relievers). This allows a doctor to quickly find substitutes if one herb is unavailable by picking another from the same Gana.",
      clinical: "If we need an anti-allergic herb and cannot find one, we look into the 'Kandughna' (Itch-relieving) Gana. This logical clustering is the basis of Ayurvedic poly-herbal formulation logic (**Yoga-nirmana**).",
      marathi: {
        intro: "**कोषांग वर्गीकरण** (Gana system) चरक (५० गट) आणि सुश्रुत (३७ गट) यांनी त्यांच्या क्लिनिकल क्रियांच्या आधारे केले आहे.",
        core: "या गटांमध्ये **दीपनीय** (पचन उत्तेजक), **विषघ्न** (विषविरोधी), **वयःस्थापन** (वृद्धत्व रोखणारे) आणि **कासहर** (खोकला निवारक) यांचा समावेश होतो. यामुळे एक वनस्पती उपलब्ध नसल्यास दुसरा पर्याय निवडता येतो.",
        clinical: "जर आम्हाला अँटी-ॲलर्जिक वनस्पती सापडत नसेल, तर आम्ही 'कण्डूघ्न' (खज कमी करणारे) गणात पाहतो. हे आयुर्वेदिक औषध निर्मितीचे (योग-निर्माण) लॉजिक आहे."
      }
    },
    't009': {
      intro: "**Ashwagandha** (Withania somnifera) is the premier 'Rasayana' (rejuvenative) herb. It is often called 'Indian Ginseng' for its powerful adaptogenic and strength-giving properties.",
      core: "It is **Tikta-Katu-Madhura** in Rasa, with **Ushna Virya**. It is the best herb for **Vata-shamana**. It acts as a 'Balya' (toning) agent for the muscles, nerves, and reproductive system. It directly nourishes the Majja and Shukra Dhatus.",
      clinical: "In our clinic, it is used for chronic fatigue, anxiety, insomnia, and male infertility. Its unique ability is that it is both strengthening yet calming, making it perfect for the modern 'burnt-out' Vata constitution.",
      marathi: {
        intro: "**अश्वगंधा** (Withania somnifera) ही सर्वोच्च 'रसायन' (पुनरुज्जीवन करणारी) वनस्पती आहे. सामर्थ्य देणाऱ्या गुणांमुळे तिला 'इंडियन जिनसेंग' म्हटले जाते.",
        core: "हा रसामध्ये **तिक्त-कटू-मधुर** आणि **उष्ण वीर्य** आहे. हे **वात-शमना**साठी सर्वोत्तम आहे. हे स्नायू, मज्जातंतू आणि पुनरुत्पादन प्रणालीसाठी 'बल्य' म्हणून काम करते.",
        clinical: "आमच्या क्लिनिकमध्ये, याचा वापर जुनाट थकवा, चिंता, निद्रानाश आणि पुरुष वंध्यत्वासाठी केला जातो. हे शक्ती देणारे आणि शांत करणारे दोन्ही असल्याने मॉडर्न ताणतणावावर उत्तम आहे."
      }
    },
    't010': {
      intro: "**Tulsi** (Ocimum sanctum), the Holy Basil, is revered as 'The Queen of Herbs'. It is the ultimate protector of the respiratory system and a potent immune modulator.",
      core: "Tulsi has **Katu-Tikta Rasa** and **Ushna Virya**. It is a 'Kapha-Vata' hara herb. It clears the Srotas of the lungs, reduces fever (Jwaraghna), and acts as an 'Antah-parimarjana' (internal cleanser). It also has significant anti-microbial properties.",
      clinical: "We use Tulsi in common colds, bronchitis, and viral fevers. Chewing fresh leaves or taking it as a tea (Phanta) helps in clearing lymphatic congestion. It also has a 'Sattvic' effect on the mind, reducing stress and promoting clarity.",
      marathi: {
        intro: "**तुळस** (Ocimum sanctum) ला 'वनस्पतींची राणी' मानले जाते. ही श्वसनसंस्थेची परम रक्षक आणि रोगप्रतिकारशक्ती वाढवणारी वनस्पती आहे.",
        core: "तुळस **कटू-तिक्क रस** आणि **उष्ण वीर्य** असलेली आहे. ही 'कफ-वात' हर वनस्पती आहे. ही फुफ्फुसाचे स्त्रोतस स्वच्छ करते, ज्वर कमी करते आणि अंतर्गत स्वच्छता (अन्तःपरिमार्जन) करते.",
        clinical: "आम्ही सर्दी, ब्रॉन्कायटिस आणि व्हायरल तापात तुळस वापरतो. ताज्या पानांचा चहा कफ कमी करण्यास आणि मनाला 'सात्त्विक' शांतता देण्यास मदत करतो."
      }
    },
    't011': {
      intro: "**Guduchi** (Tinospora cordifolia) is famously called 'Amrita' (Nectar). It is a unique tri-dosha balance herb, especially known for its 'Medhya' (brain-boosting) and 'Rasayana' (rejuvenative) qualities.",
      core: "Guduchi is **Tikta-Kashaya Rasa** but it has **Ushna Virya** and **Madhura Vipaka**. This unique combination allows it to treat Pitta conditions (fever/burning) while specifically balancing Vata and Kapha as well. It is a 'Dhatu-Agni' stabilizer.",
      clinical: "It is the gold standard for chronic fevers (Jirna Jwara) and autoimmune disorders like Gout (**Vatarakta**). It purifies the blood and protects the liver. In the OPD, we use it as a daily tonic for everyone to maintain baseline immunity.",
      marathi: {
        intro: "**गुडूची** (गुळवेल) ला 'अमृता' म्हटले जाते. ही त्रि-दोष संतुलित करणारी, मेंदूची शक्ती वाढवणारी (मेध्य) आणि रसायन गुण असलेली वनस्पती आहे.",
        core: "गुडूची **तिक्त-कषाय रस** असूनही **उष्ण वीर्य** आणि **मधुर विपाक** असलेली आहे. हे अनोखे कॉम्बिनेशन तिला पित्ताच्या आजारांवरही (जळजळ/ताप) प्रभावी बनवते.",
        clinical: "जुनाट ताप आणि संधिवात (Gout) साठी हा सुवर्ण मानक उपचार आहे. हे रक्ताची शुद्धी करते आणि यकृताचे रक्षण करते. दैनंदिन प्रतिकारशक्ती वाढवण्यासाठी आम्ही ते वापरतो."
      }
    },
    't012': {
      intro: "**Amalaki** (Emblica officinalis) is the best 'Vayasthapana' (anti-aging) herb. It contains five of the six tastes (all except Salty) and is a source of natural, stable Vitamin C.",
      core: "Despite being sour (Amla Rasa), it has **Sheeta Virya** (Cold Potency) and **Madhura Vipaka**. This makes it the absolute best herb for **Pitta-shamana** without increasing other Doshas. It is the core ingredient of 'Chyavanprash'.",
      clinical: "We use it for acidity (Amla-pitta), hair fall, early graying, and eye health (**Chakshushya**). It regenerates the tissues (Dhatus) and prevents the 'burning' away of Ojas by high Pitta heat.",
      marathi: {
        intro: "**आमलकी** (आवळा) ही सर्वोत्तम 'वयःस्थापन' (वृद्धत्व रोखणारी) वनस्पती आहे. यामध्ये सहापैकी पाच रस (खारट वगळता) असतात आणि तो व्हिटॅमिन सी चा नैसर्गिक स्रोत आहे.",
        core: "आंबट (अम्ल रस) असूनही, त्याचे वीर्य **शीत** (थंड) आणि विपाक **मधुर** आहे. त्यामुळे पित्त वाढवण्याऐवजी ते शांत करण्यासाठी सर्वोत्तम औषध आहे. हे 'च्यवनप्राश'मधील मुख्य घटक आहे.",
        clinical: "आम्ही याचा वापर पित्त (Acidity), केस गळणे आणि डोळ्यांच्या आरोग्यासाठी (**चक्षुष्य**) करतो. हे उच्च पित्तामुळे शरीरात होणारी जळजळ थांबवते."
      }
    },
    't013': {
      intro: "**Triphala** is the most widely used Ayurvedic formula, consisting of three fruits: Amalaki, Bibhitaki, and Haritaki. It is the ultimate 'Anulomana' (mild laxative) and 'Chakshushya' (vision-enhancer).",
      core: "**Haritaki** (Terminalia chebula) scrapes toxins; **Bibhitaki** (Terminalia bellirica) clears Kapha; **Amalaki** (Phyllanthus emblica) cools Pitta. Together, they regulate the entire digestive tract and the 'Malas' without causing depletion. It is a 'Rasayana' for the intestines.",
      clinical: "We prescribe Triphala for habitual constipation, eye strain, and weight management. It is best taken with warm water at bedtime. Its universal nature makes it safe for long-term use across all ages and Prakritis.",
      marathi: {
        intro: "**त्रिफळा** हे आयुर्वेदातील सर्वात जास्त वापरले जाणारे चूर्ण आहे, ज्यामध्ये आवळा, बेहडा आणि हिरडा ही तीन फळे असतात.",
        core: "**हिरडा** विषारी पदार्थ काढून टाकतो; **बेहडा** कफ स्वच्छ करतो; **आवळा** पित्त शांत करतो. एकत्रितपणे, ते पचनमार्गाचे नियमन करतात आणि आतड्यांसाठी 'रसायन' म्हणून काम करतात.",
        clinical: "आम्ही मलावरोध (Constipation), डोळ्यांवरील ताण और वजन व्यवस्थापनासाठी त्रिफळा देतो. हे सर्व वयोगटांसाठी सुरक्षित आहे."
      }
    },
    't014': {
      intro: "**Shatavari** (Asparagus racemosus) is known as 'The Woman with a Hundred Husbands', referring to its power to support female reproductive health and vitality.",
      core: "It has **Madhura-Tikta Rasa**, **Sheeta Virya**, and **Madhura Vipaka**. It is the premier tonic for Rasa and Shukra Dhatu in females. It is a galactagogue (Stanya-janaka) and an adaptogen that balances the hormonal cycle.",
      clinical: "In clinical practice, it is used for PMS, Menopause, Infertility, and to increase breast milk in nursing mothers. Because of its 'Sheeta' (cooling) nature, it is also Excellent for gastric ulcers and high Pitta acidity.",
      marathi: {
        intro: "**शतावरी** ही स्त्री आरोग्य आणि चैतन्य टिकवून ठेवण्यासाठी ओळखली जाते. तिला 'शंभर पती असलेली स्त्री' म्हटले जाते, जे तिच्या प्रजनन शक्तीला दर्शवते.",
        core: "या वनस्पतीचा रस **मधुर-तिक्त**, वीर्य **शीत** आणि विपाक **मधुर** आहे. ही स्त्रियांमधील रस आणि शुक्र धातूसाठी उत्तम टॉनिक आहे. हे आईचे दूध वाढवण्यासाठी (स्तन्य-जनक) उत्तम आहे.",
        clinical: "स्त्री रोगांमध्ये—मासिक पाळीच्या समस्यांपासून ते मेनोपॉजपर्यंत शतावरी वापरली जाते. थंड प्रकृतीमुळे ती पोटातील अल्सर आणि ॲसिडिटीसाठी देखील उत्तम आहे."
      }
    },
    't015': {
      intro: "**Brahmi** (Bacopa monnieri) is the supreme 'Medhya Rasayana' (brain tonic). It is used to enhance memory, intellect, and emotional stability.",
      core: "It has **Tikta-Kashaya Rasa** and **Sheeta Virya**. It works by clearing the 'Manovaha Srotas' (mental channels) and balancing the Sadhaka Pitta. It protects the neurons from oxidative stress and improves the coordination between the senses and the mind.",
      clinical: "We use Brahmi for ADHD, memory loss, anxiety, and epilepsy (Apasmara). It is often given as 'Brahmi Ghrita' (medicated ghee) because the brain tissues (Majja) have high affinity for healthy fats.",
      marathi: {
        intro: "**ब्राह्मी** ही सर्वोच्च 'मेध्य रसायन' (मेंदूचे टॉनिक) आहे. याचा वापर स्मृती, बुद्धी आणि भावनिक स्थिरता वाढवण्यासाठी केला जातो.",
        core: "याचा रस **तिक्त-कषाय** आणि वीर्य **शीत** आहे. हे मनाचे मार्ग (मनोवह स्त्रोतस) स्वच्छ करून 'साधक पित्त' संतुलित करते. हे मज्जासंस्थेचे ऑक्सिडेटिव्ह स्ट्रेसपासून रक्षण करते.",
        clinical: "आम्ही ब्राह्मीचा वापर मुलांची एकाग्रता वाढवण्यासाठी, चिंता कमी करण्यासाठी आणि स्मृतिभ्रंशासाठी करतो. मेंदूच्या पेशींना तेलकटपणा आवडतो म्हणून ते अनेकदा 'ब्राह्मी घृत' रूपात दिले जाते."
      }
    },
    't016': {
      intro: "**Haridra** (Curcuma longa), or Turmeric, is the most research-backed Ayurvedic herb. It is a potent anti-inflammatory, anti-microbial, and blood purifier.",
      core: "It has **Tikta-Katu Rasa** and **Ushna Virya**. Its 'Prabhava' is **Vishagna** (Anti-toxic) and **Pramehagna** (Anti-diabetic). It specifically acts on the Rakta (Blood) and Twak (Skin) Dhatus, clearing 'Kleda' (moisture/congestion) from the tissues.",
      clinical: "Clinically, we use Haridra for allergies (Sheeta-pitta), Diabetes (Prameha), and chronic skin diseases. 'Haridra Khanda' is a standard formulation for respiratory and skin allergies. It is also an excellent wound healer when applied topically.",
      marathi: {
        intro: "**हरिद्रा** (हळद) ही विज्ञानाने सिद्ध केलेली सर्वात महत्त्वाची आयुर्वेदिक वनस्पती आहे. ही दाहशामक (Anti-inflammatory) आणि उत्तम रक्तशुद्धीकारक आहे.",
        core: "हळदीचा रस **तिक्त-कटू** आणि वीर्य **उष्ण** आहे. तिचा प्रभाव **विषघ्न** आणि **प्रमेहघ्न** (डायबिटीज रोखणारा) आहे. ती रक्त आणि त्वचेमधील ओलावा (क्लेद) दूर करते.",
        clinical: "एलर्जी (शीतपित्त), मधुमेह आणि त्वचेच्या आजारांवर हळद खूप गुणकारी आहे. 'हरिद्रा खंड' हे ॲलर्जीसाठी प्रमाणित औषध आहे. जखम भरून काढण्यासाठी ती वरून लावली जाते."
      }
    },
    't017': {
      intro: "**Guggulu** (Commiphora mukul) is a resin known for its 'Lekhana' (scraping) property. It is the best herb for clearing 'Srotorodha' (channel blockages).",
      core: "It has a unique 'Suksma' (penetrating) quality that allows it to reach deep tissues like bones and joints. It is **Katu-Tikta-Kashaya Rasa** and **Ushna Virya**. It directly reduces Meda (Fat) and Vata Dosha.",
      clinical: "It is the main ingredient in all 'Guggulu' preparations (Triphala Guggulu, Kaishore Guggulu, etc.) used for Gout, High Cholesterol, Obesity, and Arthritis. It should be avoided in pregnancy and extreme Pitta conditions.",
      marathi: {
        intro: "**गुग्गुळू** हा एक डिंक असून तो शरीरातील ब्लॉक झालेले मार्ग (स्त्रोतस) साफ करण्यासाठी ओळखला जातो.",
        core: "त्याचा 'सूक्ष्म' गुण हाडे आणि सांध्यांपर्यंत सहज पोहोचतो. याचा रस **कटू-तिक्क-कषाय** आणि वीर्य **उष्ण** आहे. तो शरीरातील चरबी (मेद) आणि वात दोष थेट कमी करतो.",
        clinical: "हाडे आणि सांध्यांच्या दुखण्यावर, कोलेस्ट्रॉलवर आणि लठ्ठपणावर वापरल्या जाणाऱ्या अनेक औषधांचा गुग्गुळू मुख्य घटक आहे. गर्भावस्थेत आणि तीव्र पित्तात तो टाळावा."
      }
    },
    't018': {
      intro: "**Arjuna** (Terminalia arjuna) is the definitive 'Hridya' (cardiac) tonic. Its bark has a specific affinity for the heart muscles and coronary vessels.",
      core: "It is **Kashaya Rasa** and **Sheeta Virya**. It strengthens the heart muscles, improves circulation, and acts as an anti-ischemic agent. It is 'Sandhaniya' (healing), useful in repairing internal tissue damages.",
      clinical: "We prescribe Arjuna bark powder with milk (Arjuna Ksheer-paka) for hypertension, palpitations, and post-stroke recovery. It provides structural support to the heart and prevents arterial thickening.",
      marathi: {
        intro: "**अर्जुन** हे हृदयासाठी सर्वोत्तम टॉनिक ('हृद्य') मानले जाते. या झाडाच्या सालीचा हृदयाच्या स्नायूंवर आणि रक्तवाहिन्यांवर विशिष्ट परिणाम होतो.",
        core: "अर्जुन साल **कषाय रस** आणि **शीत वीर्य** असलेली आहे. ती हृदयाच्या स्नायूंना बळकट करते, रक्ताभिसरण सुधारते आणि अंतर्गत जखम भरून काढण्याचे काम करते.",
        clinical: "हृदयाचे विकार, उच्च रक्तदाब आणि हाडे मोडल्यास अर्जुन सालीचा काढा किंवा चूर्ण दुधासोबत दिले जाते. हे हृदयाला रचनात्मकरित्या आधार देते."
      }
    },
    't019': {
      intro: "**Neem** (Azadirachta indica) is the 'Village Pharmacy' of India. It is the most powerful natural anti-septic and Pitta-Kapha reducing herb.",
      core: "Neem is intensely **Tikta** (Bitter) and **Sheeta Virya**. It is the premier **Kusthagna** (skin disease reliever) and **Krimighna** (anti-parasitic). It purifies the liver and the blood, removing 'Daha' (burning sensation) and itching.",
      clinical: "We use it for Acne, Psoriasis, Eczema, and during the recovery phase of viral fevers. It is also used in dental care (Datun) to prevent oral infections and maintain gum health.",
      marathi: {
        intro: "**कडुनिंब** हे भारताचे 'गावठी फार्मसी' आहे. हे जंतूनाशक आणि पित्त-कफ कमी करणारे सर्वात शक्तिशाली औषध आहे.",
        core: "कडुनिंब अत्यंत **तिक्त** (कडू) आणि **शीत वीर्य** आहे. हे उत्तम **कुष्ठघ्न** (त्वचारोग निवारक) आणि **कृमिघ्न** (जंतूनाशक) आहे. हे यकृत आणि रक्तातील उष्णता आणि खाज कमी करते.",
        clinical: "मुरुमे (Pimples), सोरायसिस आणि त्वचेच्या इतर आजारांवर आम्ही कडुनिंब वापरतो. तोंडाच्या आरोग्यासाठी आणि हिरड्यांच्या मजबुतीसाठी दातवण म्हणूनही याचा वापर होतो."
      }
    },
    't020': {
      intro: "**Vacha** (Acorus calamus), or Sweet Flag, is a potent 'Medhya' herb with a specific action on speech and neurological coordination.",
      core: "It has **Katu-Tikta Rasa** and **Teekshna-Ushna Virya**. It 'scrapes' the tongue and clears the Manovaha Srotas. It is used as a 'Sanvgya-sthapana' (restoring consciousness) herb in Ayurvedic emergencies.",
      clinical: "We use Vacha for speech impediments (stammering), intellectual disabilities, and epilepsy. In very small doses, it clears the mind of 'Tamas' (dullness) and improves articulation and recall speed.",
      marathi: {
        intro: "**वचा** (वेखंड) हे बोलण्याच्या क्रिया आणि मज्जासंस्थेच्या समन्वयावर काम करणारे महत्त्वाचे मेध्य औषध आहे.",
        core: "याचा रस **कटू-तिक्क** आणि वीर्य **तीक्ष्ण-उष्ण** आहे. हे जिभेवरील जडपणा दूर करते आणि मेंदूचे मार्ग स्वच्छ करते. बेशुद्ध रुग्णाला शुद्धीवर आणण्यासाठी हे वापरले जाते.",
        clinical: "बोबडे बोलणे (Stammering), मतिमंदत्व आणि अपस्मारावर वचा वापरली जाते. कमी मात्रेत वापरल्यास ते बुद्धी आणि आठवण्याच्या शक्तीला वेग देते."
      }
    },
    't021': {
      intro: "**Shunthi** (Dry Ginger) is called 'Vishwabheshaja' (The Universal Medicine) because of its broad-spectrum therapeutic utility in every household.",
      core: "It is **Katu Rasa** but has **Madhura Vipaka** and **Ushna Virya**. This unique combination allows it to stimulate Agni without excessively aggravating Pitta. It is the best herb for 'Amapachana' and 'Vata-anulomana'.",
      clinical: "We use it for indigestion, bloating, respiratory congestion, and joint pain. Ginger tea (Sunthi-Kshaya) is the first line of defense against seasonal Vata-Kapha imbalances.",
      marathi: {
        intro: "**शुंठी** (सुंठ) ला 'विश्वभेषज' (जगातील सर्वोत्तम औषध) म्हटले जाते कारण प्रत्येक घरात तिचा औषधी वापर होतो.",
        core: "हा रस **कटू** असूनही विपाक **मधुर** आणि वीर्य **उष्ण** आहे. त्यामुळे पित्त जास्त न वाढवता ते पचनशक्ती (अग्नी) वाढवते. हे 'आम' पचन आणि वात कमी करण्यासाठी सर्वोत्तम आहे.",
        clinical: "अपचन, गॅस, सर्दी-खोकला आणि सांधेदुखीवर सुंठीचा चहा किंवा काढा हा पहिला घरगुती उपचार आहे."
      }
    },
    't022': {
      intro: "**Pippali** (Piper longum) is a unique 'Deepana' herb that also acts as a 'Rasayana'. It is most famous for its action on the Pranavaha Srotas (Lungs).",
      core: "Pippali is **Katu Rasa** but **Madhura Vipaka**. It increases the 'Bio-availability' (Pippali-yoga) of other herbs. It is used in the 'Vardhamana Pippali' protocol for deep cellular purification and immune rebuilding.",
      clinical: "In chronic Asthma (Tamaka Shwasa) and enlarged Spleen (Pleeha-vriddhi), Pippali is the drug of choice. Its Madhura Vipaka prevents it from being as drying as white pepper, making it safer for long-term respiratory support.",
      marathi: {
        intro: "**पिप्पली** (पिंपळी) ही अग्नी वाढवणारी आणि श्वसनसंस्थेची शक्ती वाढवणारी (रसायन) वनस्पती आहे.",
        core: "ही रसामध्ये **कटू** असली तरी विपाकात **मधुर** आहे. ती इतर औषधांचे शोषण वाढवते. शरीराची प्रतिकारशक्ती आणि पेशींची शुद्धी करण्यासाठी 'वर्धमान पिप्पली' उपचार वापरले जातात.",
        clinical: "जुनाट दमा (Asthma) आणि प्लीहा वाढल्यास पिंपळी मुख्य औषध आहे. ही कोरडेपणा आणत नसल्याने दीर्घकाळ श्वसनसंस्थेला आधार देण्यासाठी सुरक्षित आहे."
      }
    },
    't023': {
      intro: "**Maricha** (Black Pepper) is the primary stimulator of 'Teekshnagni' and is used to clear the heaviest of Kapha blockages.",
      core: "It is intensely **Katu Rasa** and **Ushna Virya**. It acts as a 'Srotas-shodhaka' (channel cleanser) and a 'Pradhama' (nasal powder) to wake up the brain. It makes the nutrients 'Laghu' (light) for better absorption.",
      clinical: "We add Maricha to formulas to help 'penetrate' the tissues. It is used in sinusitis, obesity, and as a metabolic booster. It clears the excess mucus (Kapha) from the lungs and the gut immediately.",
      marathi: {
        intro: "**मरीच** (मिरी) हे तीव्र अग्नी वाढवणारे आणि कफाचे जड अडथळे दूर करणारे औषध आहे.",
        core: "हे अत्यंत **कटू रस** आणि **उष्ण वीर्य** असलेले आहे. हे मार्ग स्वच्छ करते आणि अन्नातील पोषक तत्वे शोषण्यासाठी त्यांना हलके करते.",
        clinical: "सायनुसायटिस, लठ्ठपणा आणि चयापचय वाढवण्यासाठी आम्ही मिरी वापरतो. ती फुफ्फुस आणि पचनमार्गातील जास्तीचा कफ त्वरित बाहेर काढून टाकते."
      }
    },
    't024': {
      intro: "**Research Methodologies in Dravyaguna** involve the synthesis of classical knowledge with modern scientific validation protocols.",
      core: "Current research focuses on Phyto-pharmacovigilance, standardized herbal extraction, and Clinical trials for 'Rasayana' effects. The goal is to prove the 'Guna-Karma' of herbs using modern biomarkers while respecting the Ayurvedic holistic context.",
      clinical: "Understanding research allows a Vaidya to explain the mechanism of 'Tulsi' or 'Amalaki' in biochemical terms (like anti-oxidant levels) to the scientific community, ensuring the global acceptance of Ayurvedic pharmacology.",
      marathi: {
        intro: "**द्रव्यगुण संशोधन पद्धती** पारंपारिक ज्ञान आणि आधुनिक शास्त्रीय निकष यांचा मेळ घालते.",
        core: "सध्याचे संशोधन वनस्पतीच्या अर्कांचे प्रमाणीकरण आणि त्यांच्या 'गुण-कर्मा'च्या वैज्ञानिक सिद्धांतांवर लक्ष केंद्रित करते. आयुर्वेदाला जागतिक स्तरावर मान्यता मिळवून देण्यात या संशोधनाचा मोठा वाटा आहे.",
        clinical: "संशोधनामुळे वैद्यांना 'तुळस' किंवा 'आवळा' यांसारख्या वनस्पतींचे कार्य आधुनिक भाषेत स्पष्ट करता येते, ज्यामुळे वैज्ञानिक समुदायामध्ये स्वीकारार्हता वाढते."
      }
    }
  },
  'rog-nidan': {
    't001': {
      intro: "**Nidan Panchaka** is the five-fold diagnostic framework used in Ayurveda to understand the entire lifespan of a disease. It is the most comprehensive clinical methodology for a Vaidya.",
      core: "The five components are: **Nidan** (Etiology/Causes), **Purvaroopa** (Prodromal symptoms), **Roopa** (Clinical signs), **Upashaya** (Therapeutic-trial), and **Samprapti** (Pathogenesis). This systematic approach allows the doctor to differentiate between similar-looking diseases like Jwara and Vatarakta.",
      clinical: "In our clinic, we use Nidan Panchaka to identify the 'Mula' (root cause). For example, if a headache (Roopa) reduces with heat (Upashaya), we confirm it is a Vata-type disorder even before laboratory tests are back. It transforms a symptom-based treatment into a root-cause treatment.",
      marathi: {
        intro: "**निदान पंचक** ही पाच-सूत्री चौकटी आहे जी एखाद्या आजाराचा संपूर्ण जीवनप्रवाह समजून घेण्यासाठी वापरली जाते. वैद्यासाठी ही सर्वात व्यापक क्लिनिकल पद्धत आहे.",
        core: "पाच घटक आहेत: **निदान** (कारण), **पूर्वरूप** (सुरुवातीची लक्षणे), **रूप** (दिसणारी लक्षणे), **उपशय** (चाचणी उपचार), आणि **संप्राप्ती** (आजार तयार होण्याची प्रक्रिया).",
        clinical: "आमच्या क्लिनिकमध्ये, आम्ही 'मूळ' (Root cause) शोधण्यासाठी याचा वापर करतो. उदाहरणार्थ, डोकेदुखी उष्णतेने कमी झाल्यास (उपशय), लॅब रिपोर्ट येण्यापूर्वीच तो वात विकार असल्याचे स्पष्ट होते।"
      }
    },
    't002': {
      intro: "**Shat-Kriya-Kala** describes the six chronological stages of disease progression. It is the core of Ayurvedic preventive medicine and pathology.",
      core: "The stages are: **Chaya** (Accumulation), **Prakopa** (Aggravation), **Prasara** (Migration), **Sthana-samshraya** (Localization), **Vyakti** (Manifestation), and **Bheda** (Complication/Chronicity). Early detection at 'Chaya' or 'Prakopa' allows for easy 'Shodhana' before the disease takes deep root.",
      clinical: "Modern medicine often detects disease at the 'Vyakti' stage—when symptoms appear. Ayurveda aims to catch the 'Samprapti' (pathology) at the 'Prasara' stage, where the patient feels vague malaise but tests are normal. This is 'Functional medicine' at its best.",
      marathi: {
        intro: "**षट्-क्रिया-काल** आजाराच्या वाढीच्या सहा कालानुक्रमे टप्प्यांचे वर्णन करते. हे प्रतिबंधात्मक औषध आणि पॅथॉलॉजीचे मूळ आहे.",
        core: "टप्पे आहेत: **चय** (संचय), **प्रकोप** (वाढ), **प्रसर** (प्रसार), **स्थान-संश्रय** (एका ठिकाणी स्थिरावणे), **व्यक्ती** (प्रकटीकरण), आणि **भेद** (जुनाट अवस्था).",
        clinical: "आधुनिक औषध शास्त्र आजार 'व्यक्ती' टप्प्यावर (लक्षणे दिसल्यावर) शोधते. आयुर्वेद 'प्रसर' टप्प्यावरच पकडण्याचे उद्दिष्ट ठेवतो, जिथे रुग्णाला अस्वस्थ वाटते पण रिपोर्ट नॉर्मल येतात."
      }
    },
    't003': {
      intro: "**Samanya Samprapti** (General Pathogenesis) is the process of disease evolution from the moment of cause until the manifestation of clinical signs.",
      core: "It involves the interaction between corrupted Doshas (**Dosha-dushti**) and the weakened tissues (**Dushya-samurchana**). The pathogenesis is like a river—it follows the path of least resistance (Khavaigunya). If the lungs are weak, the Doshas will settle there and cause respiratory illness.",
      clinical: "Understanding the 'Samprapti-vighatana' (breaking the pathogenesis) is the key to cure. We don't just clear the symptom; we identify the 'Srotorodha' (blockage) and clear the path, ensuring the disease doesn't recur once treatment stops.",
      marathi: {
        intro: "**सामान्य संप्राप्ती** म्हणजे कारण घडल्यापासून लक्षणे दिसण्यापर्यंतची आजार तयार होण्याची प्रक्रिया.",
        core: "यामध्ये बिघडलेले दोष (**दोष-दुष्टी**) आणि कमकुवत ऊती (**दूष्य-समुर्च्छना**) यांचा परस्परसंवाद समाविष्ट असतो. संप्राप्ती नदीसारखी असते—ती सर्वात कमी प्रतिकाराचा मार्ग शोधते.",
        clinical: "'संप्राप्ती-विघटन' (Pathogenesis तोडणे) हीच खऱ्या उपचाराची गुरुकिल्ली आहे. आम्ही केवळ लक्षणे दूर करत नाही, तर जो मार्ग बिघडला आहे तो मोकळा करतो."
      }
    },
    't004': {
      intro: "**Ashtavidha Pariksha** is the 'Eight-fold Examination' of the patient established by Acharya Yogaratnakara. It is the basic clinical protocol for every Ayurvedic doctor.",
      core: "The eight parameters are: **Nadi** (Pulse), **Mutra** (Urine), **Mala** (Feces), **Jihwa** (Tongue), **Shabda** (Voice/Speech), **Sparsha** (Touch), **Druk** (Eye/Vision), and **Aakriti** (Physical form). These allow for a 360-degree assessment of the patient's biological state.",
      clinical: "In modern BAMS practice, we still start with Ashtavidha Pariksha. A 'Coated Jihwa' (Tongue) immediately tells us about the presence of Ama (Toxins) in the gut, regardless of whether the patient complains of indigestion. It is a rapid, non-invasive diagnostic suite.",
      marathi: {
        intro: "**अष्टविध परीक्षा** आचार्य योगरत्नाकर यांनी मांडलेली रुग्णाची आठ-सूत्री तपासणी पद्धत आहे. ही प्रत्येक आयुर्वेदिक डॉक्टरांसाठी मूलभूत प्रोटोकॉल आहे.",
        core: "आठ घटक आहेत: **नाडी**, **मूत्र**, **मल**, **जिव्हा** (जीभ), **शब्द** (आवाज), **स्पर्श**, **दृक** (डोळे), आणि **आकृती**. यामुळे रुग्णाच्या स्थितीचे ३६०-डिग्री मूल्यांकन होते.",
        clinical: "जीभेवर पांढरा थर (साम जिव्हा) असल्यास पचनात विषारी पदार्थ (आम) असल्याचे त्वरित समजते. ही एक जलद आणि विना-हल्ला (Non-invasive) निदान पद्धत आहे."
      }
    },
    't005': {
      intro: "**Dashavidha Pariksha** is the 'Ten-fold Patient Study' emphasized by Charaka. It focuses more on the patient's strength and resilience rather than just the disease.",
      core: "Parameters include **Prakriti** (Constitution), **Vikriti** (Current imbalance), **Sara** (Tissue quality), **Samhanana** (Build), **Pramana** (Measurements), **Satmya** (Adaptability), **Satwa** (Mental strength), **Ahara-shakti** (Digestion), **Vyayama-shakti** (Exercise capacity), and **Vayas** (Age).",
      clinical: "It answers the question: 'Can this patient handle a strong detoxification?' A patient with low 'Satwa' and 'Sara' should never be given intense Vamana, even if the disease demands it. It is the foundation of person-centered medicine (Personalized Treatment).",
      marathi: {
        intro: "**दशविध परीक्षा** ही चरकांनी सांगितलेली रुग्णाची १०-सूत्री तपासणी आहे. हे केवळ आजारापेक्षा रुग्णाच्या ताकदीवर आणि प्रतिकारशक्तीवर जास्त लक्ष केंद्रित करते.",
        core: "घटकांमध्ये **प्रकृती**, **विकृती** (सध्याचा बिघाड), **सार** (ऊतींचा दर्जा), **संहनन** (बांधणी), **प्रमाण**, **सात्म्य**, **सत्त्व** (मानसिक शक्ती) इ. चा समावेश होतो.",
        clinical: "हे 'हा रुग्ण तीव्र शोधन सहन करू शकेल का?' या प्रश्नाचे उत्तर देते. कमी 'सत्त्व' असलेल्या रुग्णाला कधीही तीव्र वमन दिले जात नाही, जरी आजार गंभीर असला तरी."
      }
    },
    't006': {
      intro: "**Nadi Pariksha** (Pulse Diagnosis) is the ancient Ayurvedic art of assessing the state of Doshas and Dhatus through the radial pulse. It is considered the most sophisticated diagnostic tool in Ayurveda.",
      core: "The practitioner feels the 'gait' (Gati) of the pulse using three fingers. A Vata pulse feels like a snake (Sarpa), a Pitta pulse like a frog (Manduka), and a Kapha pulse like a swan (Hansa). Advanced practitioners can detect organ-specific pathologies and mental states through sub-pulses.",
      clinical: "In clinical practice, Nadi Pariksha helps determine the current state (Vikriti) of the patient in seconds. It provides information about Agni status, the presence of Ama, and the emotional stress levels of the patient, directing the treatment strategy immediately.",
      marathi: {
        intro: "**नाडी परीक्षा** ही नाडीद्वारे दोष आणि धातूंची स्थिती तपासण्याची प्राचीन कला आहे. हे आयुर्वेदातील सर्वात प्रगत निदान साधन मानले जाते.",
        core: "तज्ञ तीन बोटांनी नाडीची 'गती' तपासतात. वात नाडी सापासारखी (सर्प), पित्त बेडकासारखी (मंडूक) आणि कफ हंसासारखी चालते. प्रगत वैद्य यातून अवयव-विशिष्ट विसंगतीही शोधू शकतात.",
        clinical: "नाडी परीक्षा सेकंदात रुग्णाची 'विकृती' ओळखण्यास मदत करते. हे अन्नातील पचनशक्ती (अग्नी), आमची उपस्थिती आणि मानसिक तणावाचे स्तर त्वरित सांगते."
      }
    },
    't007': {
      intro: "**Mutra and Jihva Pariksha** provide direct physical evidence of metabolic efficiency and the state of internal organs through urine and tongue examination.",
      core: "**Tailabindu Pariksha** (Urine-oil drop test) is a prognostic tool where a drop of sesame oil is placed on urine to observe its spread. **Jihva** (Tongue) acts as the 'mirror of the digestive system'; a yellow coating indicates Pitta and Ama, while a black/cracked tongue indicates Vata exhaustion.",
      clinical: "Clinical observations of the tongue are indispensable for deciding diet. If the tongue is 'Lipta' (coated), we prescribe fasting or light soups. Urine color and clarity help in identifying the involvement of 'Mutra-vaha Srotas' in systemic diseases.",
      marathi: {
        intro: "**मूत्र आणि जिव्हा परीक्षा** लघवी आणि जीभ तपासणीद्वारे चयापचय कार्यक्षमता आणि अंतर्गत अवयवांच्या स्थितीबद्दल प्रत्यक्ष पुरावा देतात.",
        core: "**तैल-बिंदू परीक्षा** हा लघवीवर तेलाचा थेंब टाकून आजाराचा अंदाज घेण्याचा प्रकार आहे. **जिव्हा** (जीभ) ही पचनसंस्थेचा आरसा आहे; पिवळा थर पित्त आणि आम दर्शवतो, तर काळी/भेगा पडलेली जीभ वात थकवा दर्शवते.",
        clinical: "जीभ बघूनच आहार ठरवला जातो. जर जीभेवर थर (लिप्तता) असेल, तर आम्ही उपवास किंवा हलके सूप घेण्यास सांगतो. रंगावरून 'मूत्रवह स्त्रोतस' मधील बिघाड समजतो."
      }
    },
    't008': {
      intro: "**Introduction to Srotodusthi** covers the four types of pathological abnormalities that occur within the body's channels (Srotas).",
      core: "Abnormalities are: **Ati-pravrutti** (Excessive flow - e.g., Diarrhea), **Sanga** (Stagnation/Obstruction - e.g., Constipation), **Sira-granthi** (Dilatation/Nodules - e.g., Tumors), and **Vimarga-gamana** (Flow in wrong direction - e.g., Vomiting). Pathology is basically the 'corruption' of Srotas.",
      clinical: "A Vaidya's job is to restore 'Srotoshuddhi'. In cases of **Sanga** (obstruction), we use 'Deepana-Pachana' herbs to melt the blockage. Recognizing the type of Srotodusthi tells us exactly which surgical or medicinal approach to take.",
      marathi: {
        intro: "**स्त्रोतोदृष्टी** म्हणजे शरीरातील वाहिन्यांमध्ये (स्त्रोतस) होणारे चार प्रकारचे पॅथॉलॉजिकल बिघाड.",
        core: "बिघाड: **अति-प्रवृत्ती** (अति प्रवाह - जुलाब), **सङ्ग** (अडथळा - मलावरोध), **सिरा-ग्रंथी** (गाठी होणे - गाठी), आणि **विमार्ग-गमन** (चुकीच्या दिशेने प्रवाह - उलट्या).",
        clinical: "वैद्याचे काम 'स्त्रोतोशुद्धी' करणे हे आहे. 'सङ्ग' (अडथळा) असल्यास आम्ही अडथळे वितळवण्यासाठी 'दीपन-पाचन' औषधे वापरतो. बिघाडाचा प्रकार ओळखून योग्य उपचार पद्धती निवडली जाते."
      }
    },
    't009': {
      intro: "**Vikriti Vigyan** is the study of pathological changes in tridoshas. It explains how balanced doshas transform into disease-causing entities.",
      core: "It studies **Vridhdhi** (Accumulation), **Kshaya** (Depletion), and **Avarana** (Occlusion). Avarana is the most complex concept where one Dosha blocks the movement of another (e.g., Kapha blocking Vata), leading to severe paralysis or pain that doesn't respond to standard Vata treatment.",
      clinical: "Clinical success in chronic pain depends on identifying **Prana-Vayu Avarana**. If we treat just the 'pain' (Vata) without clearing the 'block' (Kapha/Pitta), the patient never recovers. This deep pathological understanding is what makes Ayurveda superior in chronic care.",
      marathi: {
        intro: "**विकृती विज्ञान** म्हणजे त्रिदोषांमधील बिघाडाचा अभ्यास. संतुलित दोष आजारात कसे रूपांतरित होतात हे हे शास्त्र स्पष्ट करते.",
        core: "हे **वृद्धी** (वाढ), **क्षय** (कमी होणे) आणि **आवरण** (अडथळा) याचा अभ्यास करते. 'आवरण' ही सर्वात कठीण संकल्पना आहे जिथे एक दोष दुसऱ्या दोषाची हालचाल रोखतो (उदा. कफ वात रोखतो).",
        clinical: "जुनाट वेदनांमध्ये यश मिळवण्यासाठी 'प्राण-वायू आवरण' ओळखणे गरजेचे आहे. जर आपण केवळ 'वेदना' (वात) वर उपचार केले आणि अडथळा (कफ) दूर केला नाही, तर रुग्ण कधीही बरा होत नाही."
      }
    },
    't010': {
      intro: "**Diagnosis of Jwara** (Fevers) in Ayurveda is more than checking temperature; it is an analysis of the 'Agni' and 'Ama' interaction within the blood.",
      core: "Pathology involves the aggravated Doshas displacing the digestive fire (Agni) from the stomach into the external tissues. Diagnosis involves checking for 'Aama-lakshana' like heaviness and loss of taste, and classifying Jwara into **Nija** (internal) or **Agantuja** (external/viral).",
      clinical: "We differentiate between **Navajwara** (Acute) and **Jirnajwara** (Chronic). In Navajwara, we never give heavy food as it acts as 'fuel for the fire'. Identifying the type (Vataj, Pittaj, etc.) guides the specific cooling or warming decoctions required.",
      marathi: {
        intro: "**ज्वर निदान** (ताप) केवळ तापमान तपासण्यापेक्षा जास्त आहे; हे रक्तातील 'अग्नी' आणि 'आम' यांच्या परस्परसंवादाचे विश्लेषण आहे.",
        core: "बिघडलेले दोष पोटातील अग्नी बाहेरच्या ऊतींमध्ये ढकलतात. आहार जड वाटणे आणि तोंडाला चव नसणे ही 'साम-लक्षणे' तपासावी लागतात. तापाचे **निज** (अंतर्गत) किंवा **आगंतुक** (बाहेरून - व्हायरल) असे वर्गीकरण केले जाते.",
        clinical: "आम्ही **नवज्वर** (तीव्र) आणि **जीर्णज्वर** (जुनाट) यातील फरक ओळखतो. नवज्वरात कधीही जड अन्न दिले जात नाही कारण ते आगीत तेल घालण्यासारखे काम करते."
      }
    },
    't011': {
      intro: "**Diagnosis of Prameha** covers metabolic disorders, including Diabetes Mellitus. Ayurveda describes 20 types of Prameha based on the quality of urine and the dominant Dosha.",
      core: "The pathology is primarily an imbalance of **Kleda** (excessive moisture) and Kapha affecting the Meda (Fat) and Mutra (Urine) systems. Early signs involve 'Prabhuta-avila-mutrata' (excessive, turbid urine) and sweet-smelling sweat.",
      clinical: "Prameha is classified into **Sahaja** (Genetic/Type 1) and **Apathyanimittaja** (Lifestyle-driven/Type 2). Diagnosis early in the 'Prameha-purvaroopa' stage can prevent permanent kidney damage through 'Tikta-rasa' therapies and rigorous exercise (Vyayama).",
      marathi: {
        intro: "**प्रमेह निदान** चयापचय विकारांचे (मधुमेहासह) वर्णन करते. लघवीचा दर्जा आणि दोषांच्या प्रभावीपणावरून आयुर्वेदात प्रमेहाचे २० प्रकार सांगितले आहेत.",
        core: "प्रामुख्याने शरीरातील **क्लेद** (जास्तीचा ओलावा) आणि कफ वाढून मेद (चरबी) आणि लघवीच्या यंत्रणेवर परिणाम होतो. सुरुवातीची लक्षणे म्हणजे जास्तीची आणि गढूळ लघवी होणे.",
        clinical: "प्रमेहाचे **सहज** (अनुवांशिक - प्रकार १) आणि **अपथ्य-निमित्तज** (चुकीच्या जीवनशैलीमुळे - प्रकार २) असे प्रकार आहेत. वेळेवर निदान झाल्यास व्यायाम आणि कडू औषधांनी मूत्रपिंडाचे नुकसान टाळता येते."
      }
    },
    't012': {
      intro: "**Diagnosis of Raktapitta** involves bleeding disorders where Pitta corrupts the Rakta (Blood) Dhatu, leading to hemorrhages from various orifices.",
      core: "It is classified as **Urdhwaga** (Upper-way bleeding - easier to treat) and **Adhoga** (Lower-way bleeding - difficult). The color and smell of the blood help in identifying the involved Dosha. It is the ultimate manifestation of high 'Vidahi' (acidic) Pitta.",
      clinical: "Diagnosis is critical to decide whether to stop the bleeding immediately or let it out (if it's toxic blood). 'Sheetala' (cooling) and 'Stambhana' (astringent) therapies are chosen based on the site and volume of the Rakta-pitta.",
      marathi: {
        intro: "**रक्तपित्त निदान** म्हणजे रक्तस्त्रावाचे विकार जिथे पित्त रक्ताला (रक्त धातू) दूषित करते, ज्यामुळे शरीराच्या विविध छिद्रांतून रक्तस्त्राव होतो.",
        core: "याचे **ऊर्ध्वग** (वरच्या मार्गातून - बरे व्हायला सोपे) आणि **अधोग** (खालच्या मार्गाने - कफ) असे वर्गीकरण केले जाते. रक्ताचा रंग आणि वास यावरून बिघडलेला दोष ओळखला जातो.",
        clinical: "निदान करताना रक्तस्त्राव लगेच थांबवायचा की दूषित रक्त बाहेर पडू द्यायचे (जर ते विषारी असेल) हे ठरवणे महत्त्वाचे असते. ठिकाण आणि रक्ताच्या प्रमाणानुसार उपचार ठरतात."
      }
    },
    't013': {
      intro: "**Diagnosis of Kushtha** covers the entire spectrum of skin pathologies, from minor eczema to leprosy, classified into 7 Maha-kushtha and 11 Kshudra-kushtha.",
      core: "Skin diseases in Ayurveda are never just 'skin deep'. They involve the corruption of **Dooshya-Sapthaka**: Vata, Pitta, Kapha, Twak (Skin), Rakta (Blood), Mamsa (Muscle), and Lasika (Lymph). Diagnosis depends on the pattern, itching, and scaling of the lesions.",
      clinical: "We differentiate **Vicharchika** (Eczema) from **Kitibha** (Psoriasis). If the lesion is red and burning, it is Pitta-dominant; if black and dry, it is Vata. Identifying the Dhatu depth tells us how long the treatment will take (prognosis).",
      marathi: {
        intro: "**कुष्ठ निदान** म्हणजे त्वचेच्या सर्व प्रकारच्या आजारांचे निदान, किरकोळ एक्झिमापासून ते सोरायसिसपर्यंत. याचे १८ प्रकारात वर्गीकरण केले आहे.",
        core: "त्वचेचे आजार केवळ वरवरचे नसतात. यामध्ये वात, पित्त, कफ, त्वचा, रक्त, मांस आणि लसीका अशा सात घटकांचा बिघाड समाविष्ट असतो. खाज, जखमेचा रंग आणि पापुद्रे यावरून निदान केले जाते.",
        clinical: "आम्ही 'विचर्चिका' (Eczema) आणि 'किटिभ' (Psoriasis) यातील फरक ओळखतो. जर जखम लाल आणि जळजळणारी असेल तर पित्त प्रभावी आहे; जर काळी आणि कोरडी असेल तर वात. यावरून उपचाराचा कालावधी ठरतो."
      }
    },
    't014': {
      intro: "**Ama Nidan** is the diagnostic study of metabolic toxins. 'Ama' is the root cause of almost all chronic inflammatory and autoimmune diseases in Ayurveda.",
      core: "Clinical signs of 'Saama' (with Ama) state: **Srotorodha** (clogs), **Balabhramsha** (loss of strength), **Gaurava** (heaviness), **Anila-mudhatva** (gas/bloating), **Alasya** (laziness), and **Apakti** (indigestion). Ama is the sticky, undigested byproduct of 'Mandagni'.",
      clinical: "In clinical practice, giving heavy medicine to a patient with 'Ama' is like adding trash to a clogged sink. We first do **Amapachana** (using ginger/bitters) until the symptoms of Ama clear, only then we start the main curative drugs.",
      marathi: {
        intro: "**आम निदान** हे चयापचयातील विषारी पदार्थांचा अभ्यास आहे. आयुर्वेदामध्ये 'आम' हे जवळजवळ सर्व जुनाट आणि ऑटोइम्यून आजारांचे मूळ मानले जाते.",
        core: "साम (आमासहित) अवस्थेची क्लिनिकल लक्षणे: **स्त्रोतोरोध** (मार्ग ब्लॉक होणे), **बलभ्रंश** (ताकद कमी होणे), **गौरव** (जडपणा), **आळस** आणि **अपचन**. आम हा अर्धवट पचलेला चिकट पदार्थ आहे.",
        clinical: "आम असलेल्या रुग्णाला जड औषध देणे म्हणजे अडकलेल्या सिंकमध्ये कचरा टाकण्यासारखे है. आम्ही आधी सुंठ किंवा कडू औषधांनी 'आम-पाचन' करतो, त्यानंतरच मूळ औषधे सुरू करतो."
      }
    },
    't015': {
      intro: "**Modern Lab Correlations** involve using blood tests, biochemistry, and pathological reports to supplement Ayurvedic 'Dosha-Dushya' diagnosis.",
      core: "We correlate high **ESR/CRP** with 'Saama' conditions. High **Blood Sugar** is correlated with 'Madhumeha/Kapha'. Low **Hemoglobin** is 'Pandu'. This bridging allows the Vaidya to communicate effectively with the modern medical system while maintaining Ayurvedic logic.",
      clinical: "A patient with a 'Fatty Liver' on Ultrasound is diagnosed as 'Meda-vridhdhi' in the Yakrut. We combine the Ultrasound evidence with our 'Nadi' check to create a highly specific treatment plan that modern medicine might lack.",
      marathi: {
        intro: "**आधुनिक लॅब सहसंबंध** आयुर्वेदिक 'दोष-दूष्य' निदानाला पाठबळ देण्यासाठी रक्त चाचण्या आणि बायोकेमिस्ट्रीचा वापर करतात.",
        core: "आम्ही उच्च **ESR/CRP** ला 'साम' अवस्थेशी जोडतो. उच्च रक्तातील साखरेला प्रमेह/कफ मानले जाते. यामुळे वैद्याला आधुनिक वैद्यकीय प्रणालीशी संवाद साधणे आणि रुग्णाचे समाधान करणे सोपे जाते.",
        clinical: "अल्ट्रासाऊंडमध्ये 'फॅटी लिव्हर' आढळल्यास आम्ही त्याचे यकृतातील 'मेद-वृद्धी' असे निदान करतो. आम्ही आधुनिक पुराव्यांसह आमची नाडी परीक्षा जोडून एक विशिष्ट उपचार योजना तयार करतो."
      }
    },
    't016': {
      intro: "**Arishta Lakshana** covers the prognostic indicators—signs that tell the doctor about the approaching death or the incurability of a disease.",
      core: "Signs include sudden loss of smell, shadow changes, or specific dreams. While some sound mystical, many are clinical signs of end-stage multi-organ failure. They serve as an ethical guideline for the doctor to manage expectations and palliative care.",
      clinical: "Identifying an 'Asadhya' (incurable) state early prevents unnecessary, painful treatments for the patient and protects the doctor from failure. It is the Ayurvedic version of 'End-of-life' prognosticating.",
      marathi: {
        intro: "**अरिष्ट लक्षणे** भविष्यातील आजाराचा अंदाज (Prognosis) देतात—ही अशी चिन्हे आहेत जी डॉक्टरला आजाराची असाध्यता किंवा मृत्यूची शक्यता दर्शवतात.",
        core: "गंधाची जाणीव नसणे, सावलीत बदल किंवा विशिष्ट स्वप्ने यांचा यात समावेश होतो. ही प्रत्यक्षात मल्टी-ऑर्गन फेल्युअरची क्लिनिकल चिन्हे आहेत. यामुळे वैद्याला रुग्णाच्या नातेवाईकांशी स्पष्ट संवाद साधण्यास मदत होते.",
        clinical: "'असाध्य' अवस्था वेळीच ओळखून रुग्णावर अनावश्यक आणि त्रासदायक उपचार टाळले जातात. हे प्रगत 'एण्ड-ऑफ-लाईफ' काळजी घेण्यासाठी महत्त्वाचे आहे."
      }
    },
    't017': {
      intro: "**Differential Diagnosis (Vyavacchedaka Nidan)** is the skill of distinguishing between two similar-looking diseases by comparing their specific symptoms.",
      core: "Example: Differentiating **Vatarakta** (Gout) from **Amavata** (Rheumatoid Arthritis). In Amavata, pain increases with oil application, while in Vatarakta, oil might relieve it. This 'Upashaya-Anupashaya' test is the backbone of Ayurvedic differentiation.",
      clinical: "In our OPD, we often have to differentiate between **Kasa** (Cough) and **Shwasa** (Asthma). The patient's response to breathing patterns and the time of aggravation (Vata-kaal vs Kapha-kaal) are our key differentiators.",
      marathi: {
        intro: "**तुलनात्मक निदान (व्यच्छेदक निदान)** म्हणजे दोन सारख्या दिसणाऱ्या आजारांमधील सूक्ष्म लक्षणे शोधून त्यातील फरक ओळखण्याचे कौशल्य.",
        core: "उदाहरणार्थ: **वात-रक्त** (Gout) आणि **आम-वात** (Rheumatoid Arthritis) यातील फरक. आम-वातात तेल लावल्याने वेदना वाढतात, तर वात-रक्तात तेलाने आराम मिळू शकतो. ही 'उपशय-अनुपशय' चाचणी निदानाचा कणा आहे.",
        clinical: "आम्ही वारंवार **कास** (खोकला) आणि **श्वास** (दमा) यातील फरक ओळखतो. रुग्णाच्या श्वास घेण्याच्या पद्धतीवरून आणि वाढण्याच्या वेळेवरून आम्ही फरक करतो."
      }
    },
    't018': {
      intro: "**Imaging and Scanning** (X-ray, USG, MRI) are used in modern Rog Nidan to visualize Srotorodha (obstructions) and Granthis (growths).",
      core: "We use an MRI to locate a 'Gridhrasi' (Sciatica) nerve compression, then treat it using Ayurvedic 'Vata-hara' Bastis. X-rays help in confirming the 'Sandhi-gata-vata' (Osteoarthritis) bone changes, providing a visual 'Sara-Pariksha' of the bones.",
      clinical: "Imaging doesn't change our Ayurvedic diagnosis, but it helps in 'Sthana-Nirdharana' (Locating the site of disease). It also helps in showing 'Before and After' improvement to the patient, building trust in Ayurvedic efficacy.",
      marathi: {
        intro: "**इमेजिंग आणि स्कॅनिंग** (क्ष-किरण, USG, MRI) चा वापर आधुनिक रोग निदानामध्ये स्त्रोतोरोध (अडथळे) आणि ग्रंथी (गाठी) पाहण्यासाठी केला जातो.",
        core: "साइटिका (गृध्रसी) मधील नसेवरील दाब तपासण्यासाठी आम्ही **MRI** वापरतो. क्ष-किरण (X-ray) हाडांमधील बदल (संधिगत वात) तपासण्यास मदत करतो, ज्यामुळे हाडांच्या 'साराची' खात्री पटते.",
        clinical: "इमेजिंग आमचे आयुर्वेदिक निदान बदलत नाही, तर ते आजाराचे नक्की ठिकाण (स्थान-नर्धारण) शोधण्यास मदत करते. यामुळे उपचारापूर्वीचा आणि नंतरचा बदल रुग्णाला दाखवणे सोपे जाते."
      }
    },
    't019': {
      intro: "**Psychological Assessment (Manas Pariksha)** involves evaluating the 'Sattvic', 'Rajasic', and 'Tamasic' qualities of the patient's mind.",
      core: "A diseased body cannot be cured without a balanced mind. We check for 'Dhee' (Intellect), 'Dhairya' (Courage), and 'Smriti' (Memory). Diagnosis involves identifying 'Manas-Doshas' (Rajas/Tamas) involved in physical ailments like Hypertension or Psoriasis.",
      clinical: "For patients with insomnia or anxiety, we assess their 'Satva-shakti'. If the patient has 'Avara Satva' (low mental strength), we avoid aggressive purgatives and focus on 'Shirodhara' and counseling (Ashwasana) first.",
      marathi: {
        intro: "**मानस परीक्षा** रुग्णाच्या मनातील 'सात्त्विक', 'राजसिक' आणि 'तामसिक' गुणांचे मूल्यमापन करते.",
        core: "संतुलित मनाशिवाय आजारी शरीर बरे होऊ शकत नाही. आम्ही 'धी' (बुद्धी), 'धैर्य' आणि 'स्मृती' तपासतो. उच्च रक्तदाब किंवा सोरायसिस सारख्या शारीरिक आजारांमध्ये 'मानसिक दोषांचा' (रज/तम) विचार करणे आवश्यक असते.",
        clinical: "निद्रानाश किंवा चिंतेच्या रुग्णांसाठी आम्ही 'सत्त्व-शक्ती' तपासतो. जर मानसिक शक्ती (सत्त्व) कमी असेल, तर आम्ही तीव्र औषधे टाळून आधी 'शिरोधारा' आणि समुपदेशन (सांत्वन) यावर भर देतो."
      }
    },
    't020': {
      intro: "**Standardization of Diagnostic Protocols** ensures that Ayurvedic diagnosis is reproducible and scientifically valid across the globe.",
      core: "It involves the use of 'Standard Case Sheets', 'Digital Nadi Analysis', and grading scales for symptoms. This moves Ayurveda from being purely 'intuitive' to being an 'evidence-based' diagnostic science.",
      clinical: "We teach students to use 'Pain Scales' and 'Quality of Life' indices. When an Ayurvedic doctor in Canada and one in India use the same 'Proforma' (checklist), Ayurveda gains international credibility as a serious medical science.",
      marathi: {
        intro: "**निदान प्रोटोकॉलचे प्रमाणीकरण** जगभरातील आयुर्वेदिक निदान पद्धतींमध्ये सुसूत्रता आणि शास्त्रीय वैधता आणते.",
        core: "यामध्ये 'डिजिटल नाडी विश्लेषण' आणि लक्षणांच्या श्रेणींचा (Scales) वापर समाविष्ट आहे. यामुळे आयुर्वेद केवळ 'अंतर्ज्ञानावर' आधारित न राहता 'पुराव्यावर' आधारित निदान शास्त्र बनते.",
        clinical: "जेव्हा भारत आणि काळातील एखादा डॉक्टर सारखीच 'केस-शीट' वापरतो, तेव्हा आयुर्वेदाला जागतिक स्तरावर एक गंभीर वैद्यकीय शास्त्र म्हणून मान्यता मिळते."
      }
    }
  },
  'panchakarma': {
    't001': {
      intro: "**Panchakarma** is the 'Five-Fold' detoxification and bio-cleansing therapy of Ayurveda. It is the most effective method for harvesting accumulated toxins (Doshas) from the deep tissues.",
      core: "The five actions are: **Vamana** (Emesis), **Virechana** (Purgation), **Basti** (Enema), **Nasya** (Nasal therapy), and **Raktamokshana** (Bloodletting). It is not just about cleaning; it is about 'Re-setting' the body's biological clock and metabolic intelligence.",
      clinical: "Clinically, we use Panchakarma when the disease is 'Bahudosha' (excessively aggravated). Just as a dirty cloth cannot be dyed properly, a toxic body cannot be healed by medicine alone. Panchakarma prepares the 'soil' of the body for the seeds of 'Rasayana' (rejuvenation).",
      marathi: {
        intro: "पंचकर्म म्हणजे शरीरातून विषारी घटक (आम) बाहेर काढण्याची ५ मुख्य क्रिया आहे.",
        core: "वमन, विरेचन, बस्ती, नस्य आणि रक्तमोक्षण हे याचे ५ भाग आहेत.",
        clinical: "यामुळे शरीर पूर्णपणे स्वच्छ होऊन नव-चैतन्य मिळते।"
      }
    },
    't002': {
      intro: "**Snehana** (Oleation) is the preparatory process of saturating the body with medicated fats (Ghee or Oil) to loosen the 'Ama' (toxins) from the cells.",
      core: "It is classified as **Abhyantara Snehana** (Internal - drinking ghee) and **Bahya Snehana** (External - massage). Snehana makes the body soft (**Mridutva**) and allows the toxins to flow towards the gut (Koshta) for easy elimination. It lubricates the Srotas (channels).",
      clinical: "We start internal oleation with 30ml of Cow's Ghee, doubling it daily until 'Samyak Snigdha' signs (oily skin, loose stools) appear. This is vital before any major purification to prevent tissue damage during the 'flushing' process.",
      marathi: {
        intro: "**स्नेहन** (Oleation) म्हणजे औषधी तेलाने किंवा तुपाने ऊतींना स्निग्ध करण्याची प्रक्रिया आहे. हे पेशींमधील 'आम' (विषारी घटक) मोकळे करते.",
        core: "याचे **अभ्यंतर स्नेहन** (तूप पिणे) आणि **बाह्य स्नेहन** (मसाज) असे भाग आहेत. स्नेहन शरीराला मऊ (**मृदुत्व**) बनवते आणि विषारी घटक पचनमार्गाकडे वळवते.",
        clinical: "आम्ही ३० मिली गाईच्या तुपाने सुरुवात करतो आणि शरीरात 'स्निग्ध' लक्षणे (चमकदार त्वचा, मऊ शौचास) दिसेपर्यंत ते वाढवतो. कोणत्याही मोठ्या शुद्धीकरणापूर्वी हे करणे अनिवार्य आहे."
      }
    },
    't003': {
      intro: "**Swedana** (Sudation) is the process of inducing sweat to further liquefy the loosened toxins and move them into the gastrointestinal tract.",
      core: "It follows Snehana. Types include **Bashpa Sweda** (Steam box), **Nadi Sweda** (Localized steam), and **Patra-potala Sweda** (Leaf bolus). Swedana dilates the channels (Srotovishodhana) and reduces 'Stambha' (stiffness) and 'Gaurava' (heaviness).",
      clinical: "For respiratory congestion, we use Nadi Sweda on the chest. For generalized toxicity, Bashpa Sweda is best. It is done until the patient feels light and has sweat on the forehead and nose, indicating the toxins are ready for 'Shodhana'.",
      marathi: {
        intro: "**स्वेदन** (Sudation) म्हणजे वाफ देऊन घाम आणण्याची प्रक्रिया. यामुळे स्नेहन प्रक्रियेत सुटे झालेले विषारी घटक वितळतात आणि पचनमार्गात येतात.",
        core: "प्रकारांमध्ये **बाष्प स्वेद** (स्टीम बॉक्स), **नाडी स्वेद** आणि **पत्र-पोटली स्वेद** यांचा समावेश होतो. स्वेदन शरीरातील जडपणा आणि ताठरपणा (Stiffness) कमी करते.",
        clinical: "दम्यासाठी आम्ही छातीवर नाडी स्वेद देतो. पूर्ण शरीर शुद्धीकरणासाठी बाष्प स्वेद उत्तम आहे. रुग्णाचे डोके आणि नाक यावर घाम दिसेपर्यंत हे केले जाते."
      }
    },
    't004': {
      intro: "**Vamana** is the therapeutic induction of emesis (vomiting) to eliminate aggravated **Kapha Dosha** and associated toxins from the upper body.",
      core: "It is the king of therapies for Kapha. The procedure involves drinking specific decoctions (like Madanaphala) under strict medical supervision. It clears the chest, head, and stomach, restoring 'Urdhwa-shila' (upper body) health.",
      clinical: "We use Vamana for Asthma, Psoriasis, Chronic Sinusitis, and Obesity. A successful Vamana is marked by 'Antiki' (clearing up to the bile), leaving the patient feeling mentally clear and physically light. It must be followed by a strict diet (Samsarjana).",
      marathi: {
        intro: "**वमन** (Vamana) म्हणजे शरीरातील अतिरिक्त **कफ दोष** आणि विषारी घटक तोंडावाटे बाहेर काढण्याची शोधन प्रक्रिया आहे.",
        core: "हे कफ रोगांवरचे सर्वोत्तम औषध आहे. ही प्रक्रिया तज्ञ वैद्यांच्या देखरेखीखाली विशिष्ट औषधी काढ्यांच्या सहाय्याने केली जाते. हे छाती, डोके आणि पोटातील मार्ग मोकळे करते.",
        clinical: "आम्ही दमा (Asthma), सोरायसिस, सायनुसायटिस आणि लठ्ठपणासाठी वमन वापरतो. यशस्वी वमनानंतर रुग्णाला मानसिक स्पष्टता आणि शारीरिक हलकेपणा जाणवतो."
      }
    },
    't005': {
      intro: "**Virechana** is the therapeutic purgation process used primarily to eliminate **Pitta Dosha** and toxins from the liver, gallbladder, and small intestine.",
      core: "Specific purgative herbs like **Trivrit** or **Aragwadha** are given based on the patient's 'Koshta' (bowel habit). It cleanses the 'Rakta' (Blood) and 'Pitta-vaha Srotas' by flushing out 'Acidity' and 'Heat' from the core.",
      clinical: "Virechana is the first line of treatment for Skin Allergies, Jaundice, Acid Peptic Disorders, and chronic fevers. It is much safer and easier than Vamana for most patients and provides instant relief from 'Daha' (burning sensation) and itching.",
      marathi: {
        intro: "**विरेचन** (Virechana) म्हणजे औषधांद्वारे जुलाब घडवून आणून शरीरातील **पित्त दोष** आणि यकृत, स्वादुपिंडातील विषारी घटक बाहेर काढण्याची प्रक्रिया आहे.",
        core: "रुग्णाच्या कोठ्यानुसार **निशोत्तर** किंवा **आरग्वध** सारखी औषधे दिली जातात. हे रक्त आणि पित्तवह स्त्रोतस शुद्ध करते आणि शरीरातील 'उष्णता' बाहेर काढते.",
        clinical: "त्वचेच्या ॲलर्जी, काविळ, ॲसिडिटी आणि जुनाट तापासाठी विरेचन हा पहिला उपचार आहे. याने त्वचेची खाज आणि अंगातील दाह (जळजळ) त्वरित कमी होतो."
      }
    },
    't006': {
      intro: "**Basti** is the medicated enema therapy, hailed as 'Ardha-Chikitsa' (Half of all medical treatments) because of its unmatched power to control **Vata Dosha**.",
      core: "Unlike modern enemas for constipation, Basti is a 'Tissue-Nutrition' system. It uses **Niruha** (decoction-based) and **Anuvasana** (oil-based) fluids. It acts on the colon, which is the 'Headquarters of Vata', thereby influencing the entire nervous system.",
      clinical: "We use Basti for Sciatica, Infertility, Neuralgia, and Degenerative Arthritis. **Matra Basti** (small daily oil dose) is a miraculous anti-aging tool. It nourishes the 'Asthi' (Bone) and 'Majja' (Marrow) Dhatus directly through the rectal mucosa.",
      marathi: {
        intro: "बस्ती म्हणजे आयुर्वेदिक 'एनिमा' (Enema), जो वात-रोगांसाठी सर्वोत्तम उपचार आहे.",
        core: "हे शरीराच्या सर्व आजारांवर प्रभावी ठरू शकते, म्हणून याला 'अर्ध-चिकित्सा' म्हणतात.",
        clinical: "संधि-वात, वंध्यत्व (Infertility) आणि साइटिका (Sciatica) मध्ये बस्ती खूप गुणकारी ठरते।"
      }
    },
    't007': {
      intro: "**Nasya** is the administration of medicated oils or powders through the nose. It is defined as the 'Gateway to the Head' (**Nasa hi shiraso dwaram**).",
      core: "It eliminates Kapha-Vata blockages from the sinuses and brain tissues. Types include **Pratimarsha Nasya** (daily minor drops) and **Shodhana Nasya** (strong purification). It directly influences the Pittuitaly and Pineal glands through the olfactory pathway.",
      clinical: "Nasya is used for Hair fall, Graying, Migraines, Neck stiffness (Cervical Spondylosis), and improving memory. In clinical practice, **Anu Taila** Nasya is a standard recommendation for preventing seasonal allergies and strengthening the sense organs.",
      marathi: {
        intro: "**नस्य** (Nasya) म्हणजे नाकाद्वारे औषधी तेल किंवा चूर्ण देणे. नाकाला 'शिरोभागाचे प्रवेशद्वार' (**नासा हि शिरसो द्वारम**) मानले जाते.",
        core: "हे सायनस आणि मेंदूच्या पेशींमधील कफ-वात अडथळे दूर करते. याचे **प्रतिमर्श नस्य** (दैनंदिन) आणि **शोधन नस्य** (तीव्र शुद्धी) असे प्रकार आहेत.",
        clinical: "केस गळणे, अकाली पांढरे होणे, अर्धशिशी (Migraine) आणि मणक्यांच्या त्रासासाठी नस्य वापरले जाते. दैनंदिन **अणू तेल** नस्य केल्याने इंद्रियांची शक्ती वाढते."
      }
    },
    't008': {
      intro: "**Raktamokshana** (Bloodletting) is the process of removing morbid blood from the body, primarily to treat Pitta-corrupted skin and vascular disorders.",
      core: "Methods include **Jalaukavacharana** (Leech therapy), **Siravyadha** (Venous puncture), and **Prachana** (Scraping). Leech therapy is particularly famous because leeches inject anti-inflammatory and anti-coagulant enzymes while sucking only the 'impure' blood.",
      clinical: "We use Leeches for non-healing ulcers, varicose veins, and acute Alopecia areata. For generalized skin diseases like Psoriasis, **Siravyadha** (bloodletting from a specific vein) provides a rapid 'reset' of the blood's pH and toxic load.",
      marathi: {
        intro: "**रक्तमोक्षण** (Raktamokshana) म्हणजे शरीरातील दूषित रक्त बाहेर काढण्याची प्रक्रिया आहे, प्रामुख्याने पित्तज आणि त्वचारोगांसाठी.",
        core: "यामध्ये **जलौकावचारण** (जळू लावणे), **सिराव्यध** (शीरेतून रक्त काढणे) आणि **प्रच्छान** यांचा समावेश होतो. जळू रक्त शोषताना दाहशामक एन्झाईम्स सोडते.",
        clinical: "न भरणाऱ्या जखमा, व्हेरिकोज व्हेन्स (Varicose veins) आणि टाळूवरील चाई (Alopecia) साठी जळू उपचार सर्वोत्तम ठरतात. सोरायसिस सारख्या आजारात सिराव्यध त्वरित आराम देते."
      }
    },
    't009': {
      intro: "**Poorva Karma** are the preparatory steps (Snehana/Swedana) that must be performed before the 'Pradhana' (Main) Panchakarma procedures.",
      core: "Without Poorva Karma, toxins are like 'dry clay' that won't leave the tissues. Snehana 'oils' the body and Swedana 'melts' the toxins. This ensures that the purification is 'Niru-padrava' (without complications).",
      clinical: "A doctor who skips Poorva Karma risks causing 'Srotas-damage'. We ensure the patient follows 'Deepana-Pachana' (digestive preparation) for 3-5 days before even starting the oil massage.",
      marathi: {
        intro: "**पूर्व कर्म** म्हणजे मुख्य पंचकर्मापूर्वी केली जाणारी पूर्वतयारी, जसे की स्नेहन आणि स्वेदन.",
        core: "पूर्व कर्माशिवाय विषारी घटक 'कोरड्या माती'सारखे ऊतींना चिकटून राहतात. स्नेहन शरीराला 'ओंगण' देते तर स्वेदन विषाला 'वितळवते'. यामुळे मूळ प्रक्रिया त्रासहीन होते.",
        clinical: "आम्ही कधीही पूर्व कर्माशिवाय पंचकर्म करत नाही. मुख्य प्रक्रिया सुरू करण्यापूर्वी ३-५ दिवस 'दीपन-पाचन' औषधे देऊन पचनशक्ती सुधारली जाते."
      }
    },
    't010': {
      intro: "**Paschat Karma** refers to the post-therapy care and dietary recovery period required after deep detoxification.",
      core: "It includes **Samsarjana Krama** (Dietary transition), **Parihara Vishaya** (Forbidden activities), and **Rasayana** (Rejuvenation). After Shodhana, the body's Agni is very weak (like a tiny flame), requiring slow rekindling through specific liquid diets.",
      clinical: "Violating Paschat Karma (like eating heavy food immediately after Vamana) can lead to 'Agnimandya' and recurring illness. We monitor the patient for 7 to 14 days post-procedure to ensure the newly cleaned 'Srotas' stay open.",
      marathi: {
        intro: "**पश्चात कर्म** म्हणजे पंचकर्मानंतरची काळजी आणि आहार विहार पाळण्याचा काळ.",
        core: "यात **संसर्जन क्रम** (आहार बदल), विश्रांती आणि **रसायन** उपचारांचा समावेश होतो. शुद्धीकरणानंतर अग्नी अतिशय मंद असतो, त्याला हळहळू प्रज्वलित करणे आवश्यक असते.",
        clinical: "पंचकर्मानंतर लगेच जड अन्न खाल्यास उलट त्रास होऊ शकतो. आम्ही रुग्णाला ७ ते १४ दिवस विशेष देखरेखीखाली ठेवतो जेणेकरून शरीराचे मार्ग मोकळे राहतील."
      }
    },
    't011': {
      intro: "**Samsarjana Krama** is the sequential dietary protocol—moving from thin liquids to semi-solids to regular meals—after purification.",
      core: "The sequence is: **Peja** (Thin rice water), **Vilepi** (Thick gruel), **Akrita Yusha** (Plain soup), **Krita Yusha** (Spiced soup), and finally **Mamsa Rasa** or Regular grain. This gradually re-stimulates the enzymes (Agni) without shocking the gut.",
      clinical: "In our center, we prescribe 3 to 7 days of Samsarjana based on whether the purification was 'Pravara' (high), 'Madhya' (medium), or 'Avara' (mild). This is what converts a 'Detox' into a 'Permanent Cure'.",
      marathi: {
        intro: "**संसर्जन क्रम** म्हणजे शुद्धीकरणानंतर पातळ पेजेपासून हळूहळू घट्ट अन्नाकडे जाण्याचा आहार नियम.",
        core: "क्रम: **पेया** (तांदळाची पेच), **विलेपी**, **अकृत युष** (कण्हण), **कृत युष** आणि शेवटी नियमित आहार. यामुळे पोटातील एन्झाईम्सना धक्का न लागता पचन सुधारते.",
        clinical: "शुद्धीकरणाच्या तीव्रतेनुसार आम्ही ३ ते ७ दिवसांचा संसर्जन क्रम ठरवतो. यामुळे पंचकर्माचा परिणाम कायमस्वरूपी टिकण्यास मदत होते."
      }
    },
    't012': {
      intro: "**Indications and Contraindications** are the safety guidelines that determine who is fit for Panchakarma and who is not.",
      core: "**Indications** include chronic lifestyle diseases, seasonal detox, and pre-conception care. **Contraindications** include extreme old age, pregnancy, acute trauma, and very weakened patients (Kshina). 'Incorrectly performed' Panchakarma is considered worse than the disease itself.",
      clinical: "We perform a thorough 'Dashavidha Pariksha' to filter candidates. A patient with high cardiac risk or uncontrolled BP is not given Vamana. Safety first is the hallmark of a professional Panchakarma clinic.",
      marathi: {
        intro: "**नियम आणि अटी** (Indications/Contraindications) म्हणजे पंचकर्म कोणासाठी योग्य आहे आणि कोणासाठी नाही याचे निकष.",
        core: "जुनाट आजार आणि ऋतुबदलानुसार शुद्धीकरणासाठी हे आवश्यक आहे. पण अतिवृद्ध, गर्भवती महिला, लहान मुले आणि अत्यंत अशक्त लोकांमध्ये काही तीव्र प्रक्रिया टाळल्या जातात.",
        clinical: "आम्ही 'दशविध परीक्षा' करूनच रुग्णाची निवड करतो. हृदयविकार किंवा उच्च रक्तदाब असलेल्या रुग्णांना तीव्र वमन दिले जात नाही."
      }
    },
    't013': {
      intro: "**Complications (Vyapat)** occur due to improper medicine, lack of preparation, or patient negligence during Panchakarma.",
      core: "Common Vyapats include **Atiyoga** (excessive evacuation), **Ayoga** (insufficient evacuation), and **Mithyayoga** (perverted action). For example, excessive Virechana can lead to dehydration and 'Vata-prakopa' (fainting/cramps).",
      clinical: "Management involves 'Stambhana' (stopping) drugs for Atiyoga and corrective Poorva-karma for Ayoga. Every Vaidya must be trained in managing these emergencies with Ayurvedic first-aid protocols.",
      marathi: {
        intro: "**व्यापत** (Complications) म्हणजे चुकीच्या पद्धतीने किंवा अपुरी तयारी करून पंचकर्म केल्यामुळे होणारे दुष्परिणाम.",
        core: "यात **अतियोग** (अति शुद्धी), **अयोग** (अपुरी शुद्धी) आणि **मिथ्यायोग** यांचा समावेश होतो. उदाहरणार्थ, अति विरेचनामुळे थकवा किंवा निर्जलीकरण (Dehydration) होऊ शकते.",
        clinical: "अनुभवी वैद्याला या 'व्यापतांचे' ज्ञान असणे गरजेचे आहे जेणेकरून आपत्कालीन परिस्थितीत त्वरित उपचार करता येतील."
      }
    },
    't014': {
      intro: "**Panchakarma in Pediatric Care** (Kaumarbhritya) focuses on mild, non-invasive procedures tailored for the sensitive physiology of children.",
      core: "Classical purification is generally avoided before age 10 unless critical. Instead, 'Mridu' (mild) versions like **Matra Basti** or **Bala-Abhyanga** are used to boost immunity and fix developmental delays. Nasya is limited to few drops of plain oil.",
      clinical: "We use Matra Basti for children with ADHD or motor coordination issues. External procedures like **Shasti-shali-pinda Sweda** are miraculous for pediatric muscular dystrophy and general growth support without any systemic trauma.",
      marathi: {
        intro: "**बाल पंचकर्म** (Pediatric Care) म्हणजे मुलांच्या नाजूक प्रकृतीनुसार डिझाइन केलेले सौम्य उपचार.",
        core: "मुलांमध्ये सामान्यतः १० वर्षांपर्यंत तीव्र शुद्धी टाळली जाते. त्याऐवजी **मात्रा बस्ती** किंवा **बाला-अभ्यंग** सारखे पोषण देणारे उपचार केले जातात.",
        clinical: "एडीएचडी (ADHD) किंवा गतिमंद मुलांमध्ये मात्रा बस्ती आणि **षष्टी-शाली-पिंड स्वेद** मुळे स्नायूंची ताकद आणि बुद्धी वाढण्यास मोठी मदत होते."
      }
    },
    't015': {
      intro: "**Panchakarma in Geriatric Care** focuses on 'Rasayana' (rejuvenation) and managing degenerative Vata disorders in the elderly.",
      core: "Aggressive Vamana/Virechana are avoided in the elderly. The focus shifts to **Basti** and **Shirodhara** to preserve bone density and mental calm. It is used as a tool for 'Healthy Aging' (Vaya-sthapana).",
      clinical: "For Parkinson's or Alzheimer's, we use **Kshiroadhara** and **Sneha Basti**. It prevents the 'drying' of the brain tissues (Majja) and reduces joint stiffness, allowing the elderly to maintain mobility and independence.",
      marathi: {
        intro: "**वृद्ध पंचकर्म** (Geriatric Care) म्हणजे वृद्धांमधील वात रोखण्यासाठी आणि ऊतींची झीज भरून काढण्यासाठी केलेले उपचार.",
        core: "वृद्धांमध्ये तीव्र वमन-विरेचन टाळून **बस्ती** आणि **शिरोधारा** वर भर दिला जातो. हे मज्जासंस्थेचे रक्षण करण्यासाठी आणि हाडांची मजबुती टिकवण्यासाठी वापरले जाते.",
        clinical: "पार्किन्सन किंवा विसरभोळेपणावर (Alzheimer) आम्ही **क्षीर-धारा** आणि **स्नेह बस्ती** वापरतो. यामुळे वृद्धांची हालचाल आणि स्वावलंबन टिकून राहते."
      }
    },
    't016': {
      intro: "**Physiological Effects of Vamana** involve a massive stimulation of the Vagus nerve and clearing of the gastric mucosal congestion.",
      core: "It stimulates the respiratory center and expels thick, stagnant mucus. It also triggers an impulse in the autonomic nervous system that 'resets' the metabolic rate. Research shows an immediate rise in IgA levels post-Vamana, indicating boosted mucosal immunity.",
      clinical: "Patients with 'Leaky Gut' or chronic skin allergies often see a permanent shift after Vamana because it removes the 'Moola-Dosha' (root toxins) stored in the stomach lining, which herbs alone can't reach.",
      marathi: {
        intro: "**वमनाचे शारीरिक परिणाम** म्हणजे या प्रक्रियेमुळे मेंदूतील वॅगस नर्व्हला मिळणारी उत्तेजना आणि छातीतील कफ बाहेर पडण्याची प्रक्रिया.",
        core: "हे श्वसन केंद्र उत्तेजित करते आणि साठलेला जुना कफ बाहेर काढते. संशोधनानुसार वमनानंतर शरीरातील इम्युनोग्लोब्युलिन (IgA) वाढते, ज्यामुळे रोगप्रतिकारशक्ती सुधारते.",
        clinical: "ज्या रुग्णांना वारंवार ॲलर्जी किंवा त्वचेचे आजार होतात, त्यांना वमनामुळे मुळापासून आराम मिळतो कारण ते पोटातील साठलेले दोष बाहेर काढते।"
      }
    },
    't017': {
      intro: "**Physiological Effects of Virechana** focus on the hepatic-biliary system and the inflammation markers in the blood.",
      core: "It causes the gallbladder to flush out stagnant bile and the small intestine to release deep-seated Pitta heat. This reduces systemic inflammation (Cytokine levels). It also improves liver enzyme profiles and clears the skin through blood purification.",
      clinical: "In cases of 'Fatty Liver' or 'High Cholesterol', Virechana acts as a biological drain, removing surplus Meda (fat) and Kleda (moisture). Patients report improved digestion and a massive 'cooling' effect on their entire psychology.",
      marathi: {
        intro: "**विरेचनाचे शारीरिक परिणाम** प्रामुख्याने यकृत आणि पित्ताशयातील दोषांवर आणि रक्तातील दाहशामक घटकांवर लक्ष केंद्रित करतात.",
        core: "यामुळे पित्ताशयातील साठलेले पित्त बाहेर पडते आणि रक्तातील उष्णता कमी होते. हे शरीरातील जळजळ (Inflammation) कमी करणारे घटक (Cytokines) नियंत्रित करते.",
        clinical: "'फॅटी लिव्हर' किंवा 'हाय कोलेस्ट्रॉल' मध्ये विरेचन एका नैसर्गिक फिल्टरप्रमाणे काम करते. यामुळे पचन सुधारते आणि रुग्णाला मानसिक शांतता वाटते."
      }
    },
    't018': {
      intro: "**Basti: The Half of All Treatments**—this module dives deep into why Basti is considered the commander-in-chief of all Ayurvedic therapies.",
      core: "Vata is the only 'active' Dosha; it moves Pitta and Kapha. By controlling Vata through the colon, Basti controls all systemic movements. It reached the 'Deep Tissues' (Marrow and Bone) which other routes like 'Oral' often fail to nourish adequately.",
      clinical: "Whether it is a chronic backache or a hormonal imbalance (PCOS), Basti is our primary choice. It changes the gut microbiome and influences the 'Enteric Nervous System', making it a powerful psycho-somatic treatment tool.",
      marathi: {
        intro: "**बस्ती: अर्धी चिकित्सा**—हा विभाग बस्तीला सर्व आयुर्वेदिक उपचारांचा सेनापती का मानले जाते, हे स्पष्ट करतो.",
        core: "वात हा एकमेव सक्रिय दोष आहे जो पित्त आणि कफाला हलवतो. बस्तीद्वारे मोठ्या आतड्यावर नियंत्रण मिळवून संपूर्ण मज्जासंस्थेवर परिणाम साधला जातो.",
        clinical: "पाठदुखी असो किंवा पीसीओडी (PCOS), बस्ती हा आमचा मुख्य उपचार असतो. हे आतड्यांतील जीवाणूंचा समतोल राखते, ज्यामुळे शारीरिक आणि मानसिक आरोग्य सुधारते."
      }
    },
    't019': {
      intro: "**Shirodhara and Allied Therapies** are external procedures designed to stabilize the mind and the nervous system.",
      core: "**Shirodhara** (continuous pouring of oil on forehead) induces a 'Alpha-wave' state in the brain. Allied therapies include **Shirovasti** (oil cap), **Akshi Tarpana** (eye bath), and **Hrid-Basti** (heart pool). They work by local 'Snehana' and pressure-point stimulation.",
      clinical: "We use Shirodhara for Insomnia, Anxiety, and Hypertension. It is the best 'unplug' therapy in the modern digital age. Akshi Tarpana is used to treat 'Computer Vision Syndrome' and early-stage cataracts.",
      marathi: {
        intro: "**शिरोधारा आणि अन्य उपचार** मनाला स्थिर करण्यासाठी आणि मज्जासंस्था शांत करण्यासाठी वापरले जाणारे बाह्य उपचार आहेत.",
        core: "**शिरोधारा** (कपाळावर तेलाची संतत धार) मेंदूतील 'अल्फा लहरी' वाढवते. यामध्ये **अक्षितर्पण** (डोळ्यांचे स्नान) आणि **हृद-बस्ती** यांचाही समावेश होतो.",
        clinical: "निद्रानाश, चिंता आणि उच्च रक्तदाबासाठी शिरोधारा सर्वोत्तम आहे. 'कॉम्प्युटर व्हिजन सिंड्रोम' साठी अक्षितर्पण उत्तम उपचार ठरतो."
      }
    },
    't020': {
      intro: "**Abhyanga and External Procedures** cover the science of 'Bahya Snehana' and localized healing through massage and pools.",
      core: "**Abhyanga** (Self-massage) is recommended as a 'Dinacharya'. Procedures like **Kati Basti** (Lower back pool) and **Janu Basti** (Knee pool) provide deep localized nourishment to the spinal discs and knee cartilage, respectively.",
      clinical: "In our Spine clinics, **Kati Basti** is used to treat Disc Herniation. The heat and oil penetrate the skin to reach the deep ligaments, reducing nerve inflammation and avoiding the need for surgery in many early-to-mid stage cases.",
      marathi: {
        intro: "**अभ्यंग आणि बाह्य उपचार** यामध्ये 'बाह्य स्नेहन' आणि मसाजद्वारे शरीराचे पोषण करण्याचे शास्त्र सांगितले आहे.",
        core: "**अभ्यंग** (मसाज) हा दिनचर्येचा भाग मानला जातो. **कटि-बस्ती** (कमरेवर तेलाचा तलाव) मणक्यांच्या गादीला आणि सांध्यांना थेट पोषण देते.",
        clinical: "मणक्यांच्या त्रासात (Disc Herniation) कटि-बस्तीमुळे नसेची सूज कमी होते. यामुळे अनेक रुग्णांना शस्त्रक्रिया न करता आराम मिळतो."
      }
    },
    't021': {
      intro: "**Modern Scientific View on Detox** provides an evidence-based perspective on Panchakarma as a system of 'Biological Cleansing'.",
      core: "Studies on **Snehapana** (internal ghee) prove it binds with fat-soluble pollutants (like Pesticides/PCBs) and flushes them out of the tissue. Panchakarma is now recognized as one of the few medical ways to reduce 'Bio-accumulation' of modern industrial toxins.",
      clinical: "When explaining to modern patients, we use the term 'Systemic Inflammation Reduction'. We show them how their C-Reactive Protein (CRP) levels drop after a 14-day Panchakarma cycle, bridging ancient wisdom with lab data.",
      marathi: {
        intro: "**डिटॉक्सचे आधुनिक वैज्ञानिक दृष्टिकोन** पंचकर्माला 'बायोलॉजिकल क्लींजिंग' ची एक पुरावा-आधारित पद्धत म्हणून मांडतात.",
        core: "संशोधनानुसार स्नेहन प्रक्रियेतील तूप शरीरातील कीटकनाशके आणि विषारी घटकांशी बांधले जाते आणि त्यांना बाहेर काढते. हे औद्योगिक विषांचे परिणाम कमी करण्यास मदत करते.",
        clinical: "आम्ही रुग्णाला प्रयोगशाळेतील अहवालांद्वारे (सी-रिॲक्टिव्ह प्रोटीन - CRP) शरीरातील दाह कमी झाल्याचे दाखवून देतो, जे पंचकर्माची शास्त्रीयता सिद्ध करते."
      }
    },
    't022': {
      intro: "**Equipment and Infrastructure (Atura-shala)** outlines the design of a professional Panchakarma center.",
      core: "It includes requirements for the **Droni** (Massage table), **Valuka-Yantra** (Puta area), and the separate 'Shodhana' rooms. A proper center must have a peaceful 'Sattvic' atmosphere and a specialized Panchakarma diet kitchen.",
      clinical: "The environment is part of the cure. We teach that the 'Droni' must be of a specific wood (like Neem or Teak) to add additional therapeutic value. Hygiene and 'Vastu' in a Panchakarma lab are non-negotiable for patient recovery.",
      marathi: {
        intro: "**उपकरणे आणि पायाभूत सुविधा** (Atura-shala) व्यावसायिक पंचकर्म केंद्र चालवण्यासाठी लागणाऱ्या तांत्रिक गरजांचे वर्णन करतात.",
        core: "यामध्ये **द्रोणी** (मसाज टेबल), वाफ घेण्याची यंत्रे आणि शुद्धीकरणासाठी स्वतंत्र खोल्यांचे नियोजन असते. केंद्रातील वातावरण 'सात्त्विक' आणि शांत असणे महत्त्वाचे आहे.",
        clinical: "वातावरण स्वतःच निमूटपणे उपचार करत असते. द्रोणीसाठी कडुनिंब किंवा सागाच्या लाकडाचा वापर केल्यास अधिक औषधी लाभ मिळतात."
      }
    },
    't023': {
      intro: "**Role of Panchakarma in Lifestyle Disorders** focuses on how this ancient system tackles modern epidemics like PCOS, Obesity, and Burnout.",
      core: "Lifestyle disorders are basically 'Agnimandya' and 'Srotasangha'. Panchakarma breaks this cycle. For PCOS, Vamana/Basti resets the hormonal axis. For Obesity, Virechana and specialized 'Udwarthana' (dry powder massage) stimulate fat metabolism.",
      clinical: "We have a 90% success rate in managing borderline Hypertension and Diabetes using seasonal cleanse protocols. It moves the patient from being 'pill-dependent' to 'health-independent' by fixing the core metabolic architecture.",
      marathi: {
        intro: "**जीवनशैली विकारांमध्ये पंचकर्माची भूमिका** पीसीओडी (PCOD), लठ्ठपणा आणि बर्नआउट सारख्या आधुनिक समस्यांवर कशी मात करावी, हे शिकवते.",
        core: "आधुनिक आजार हे मुळात पचन बिघडल्यामुळे (मंदाग्नी) होतात. पंचकर्म हे रक्तातील साखरेचे आणि हार्मोन्सचे व्यवस्थापन करण्यास मदत करते.",
        clinical: "आम्ही पीसीओडी आणि लठ्ठपणामध्ये ९०% यशाचा दर मिळवला आहे. हे रुग्णाला केवळ गोळ्यांवर अवलंबून न ठेवता आरोग्यासाठी सक्षम बनवते."
      }
    },
    't024': {
      intro: "**Research in Panchakarma** involves the study of clinical trials, meta-analysis of 'Basti' therapy, and experimental evidence of detoxification.",
      core: "Research highlights include the 'Intestinal Microbiome' change post-Basti and the 'Neuro-protective' effects of Nasya. Digital tools are now used to map the 'Samyak-yoga' signs to create objective grading systems for purification.",
      clinical: "Understanding recent research allows the modern doctor to customize Panchakarma periods—some might need 7 days, others 21—based on 'Evidence' and 'Bio-markers', ensuring maximum results for the patient.",
      marathi: {
        intro: "**पंचकर्म संशोधन** बस्ती थिरपीचा आतड्यांतील जीवाणूंवर (Microbiome) होणारा परिणाम आणि नस्याचे मज्जासंस्थेवरील फायदे दर्शवते.",
        core: "बस्तीनंतर आतड्यांतील चांगले जीवाणू वाढतात, असे संशोधनातून सिद्ध झाले आहे. नस्याचा थेट मेंदूवर होणारा परिणाम आता डिजिटल मॅपिंगद्वारे तपासला जातो.",
        clinical: "संशोधनामुळे आम्ही पंचकर्माचा कालावधी (७, १४ किंवा २१ दिवस) रुग्णाच्या गरजेनुसार शास्त्रीय पुराव्यांसह ठरवू शकतो."
      }
    },
    't025': {
      intro: "**Global Practice Standards** cover the ethics, documentation, and international guidelines for running a Panchakarma practice across different countries.",
      core: "It covers the 'WHO Benchmarks for Training in Ayurveda'. It emphasizes informed consent, patient safety, and the documentation of 'Purva, Pradhana, Paschat' karmas. Standardization across borders is the goal for 21st-century Ayurveda.",
      clinical: "As global practitioners, we follow the NABH (National Accreditation Board for Hospitals) standards. This ensures that a patient receives the same quality of 'Vamana' in Delhi as they would in a certified center in Switzerland or California.",
      marathi: {
        intro: "**जागतिक सराव मानके** विविध देशांमध्ये पंचकर्म क्लिनिक चालवण्यासाठी लागणारे नैतिक नियम आणि डॉक्युमेंटेशन बद्दल मार्गदर्शन करतात.",
        core: "यामध्ये जागतिक आरोग्य संघटनेचे (WHO) निकष पाळणे आवश्यक असते. रुग्णाची संमती (Informed Consent) आणि प्रक्रियेच्या नोंदी ठेवणे महत्त्वाचे आहे.",
        clinical: "आम्ही NABH मानकांचे पालन करतो, ज्यामुळे रुग्णाला कोणत्याही जागतिक दर्जाच्या हॉस्पिटलमध्ये मिळणारी सुरक्षितता आणि पारदर्शकता मिळते."
      }
    }
  },
  'kayachikitsa': {
    't001': {
      intro: "**Kayachikitsa** is the core branch of Ayurvedic internal medicine. 'Kaya' refers to the metabolic fire (Agni) and the entire body, while 'Chikitsa' means the treatment or restoration of balance.",
      core: "It is built on the foundation of **Agni-Meemamsa**. Life, complexion, strength, and vitality depend on the Agni. If Agni is destroyed, the individual dies. Kayachikitsa focuses on treating the 'Mula' (root) by correcting the digestive fire and clearing the channels (Srotas).",
      clinical: "In clinical practice, every case—from a simple fever to complex cancer—starts with an assessment of the patient's 'Agni' and 'Koshta'. Our goal is **Samprapti Vighatana**—breaking the pathogenesis—through a combination of diet, lifestyle, and herbal minerals.",
      marathi: {
        intro: "**कायचिकित्सा** हे आयुर्वेदिक औषधशास्त्राचा (Internal Medicine) मुख्य भाग आहे. 'काय' म्हणजे अग्नी आणि संपूर्ण शरीर, तर 'चिकित्सा' म्हणजे संतुलन राखणे.",
        core: "हे **अग्नी-मीमांसा** वर आधारित आहे. जीवन, वर्ण, शक्ती आणि चैतन्य अग्नीवर अवलंबून असते. जर अग्नी नष्ट झाला, तर मनुष्य मृत होतो. कायचिकित्सा पचनशक्ती सुधारण्यावर आणि मार्ग (स्त्रोतस) मोकळे करण्यावर लक्ष केंद्रित करते.",
        clinical: "प्रत्येक रुग्णाचे - साध्या तापापासून ते कर्करोगापर्यंत - आधी 'अग्नी' आणि 'कोष्ठ' तपासले जातात. आहार, जीवनशैली आणि औषधांच्या सहाय्याने आजार तयार होण्याची प्रक्रिया (संप्राप्ती-विघटन) मोडणे हे आमचे उद्दिष्ट असते."
      }
    },
    't002': {
      intro: "**Jwara** (Fever) is the 'King of Diseases' in Ayurveda. It marks a state where Agni is displaced from the gut into the tissues by the aggravated Doshas.",
      core: "It is characterized by **Santapa** (increased temperature) of body and mind. The pathology involves **Srotorodha** (obstruction of channels) and **Sweda-avaroda** (obstruction of sweat). The cardinal rule is: Do not give 'Sheetala' (cooling) drugs in the acute stage, as it will lock the toxins inside.",
      clinical: "In our clinic, the first treatment for acute fever is **Langhana** (Light diet/Fasting). We use **Mahasudarshan Churna** or **Tribhuvana Kirti** to release the sweat. Once the 'Aama' is digested (Nirama stage), then only nourishing tonics are given to restore strength.",
      marathi: {
        intro: "**ज्वर** (ताप) हा आयुर्वेदातील 'रोगांचा राजा' आहे. यामध्ये अग्नी पोटाबाहेर पडून पेशींमध्ये पसरतो.",
        core: "याचे वैशिष्ट्य म्हणजे शरीर आणि मनाचा ताप (**संताप**). यामध्ये घाम येण्याचे मार्ग बंद (स्वेदावरोध) होतात. नियम असा आहे की: तीव्र अवस्थेत 'शीतल' (थंड) औषधे देऊ नका, कारण ती आमास शरीरात अडकवून ठेवतात.",
        clinical: "तीव्र तापासाठी पहिला उपचार म्हणजे **लङ्घन** (हलका आहार/उपवास). आम्ही घाम येण्यासाठी 'त्रिभुवन कीर्ती' सारखी औषधे वापरतो. एकदा 'आम' पचला की (निराम अवस्था), ताकद वाढवण्यासाठी पोषक औषधे दिली जातात."
      }
    },
    't003': {
      intro: "**Raktapitta** refers to bleeding disorders caused by aggravated Pitta Dosha corrupting the Rakta Dhatu (Blood).",
      core: "It is classified as **Urdhwaga** (bleeding from mouth/nose) or **Adhoga** (bleeding from rectum/urethra). The treatment depends on the direction of flow. Ayurveda suggests 'Pratimarga-harana'—if it flows up, clear the gut downward through purgation (**Virechana**).",
      clinical: "Clinical success in cases like epistaxis (nosebleed) or menorrhagia depends on cooling the blood using **Vasa** (Adhatoda vasica). We avoid heating foods like garlic or ginger and focus on 'Stambhana' (astringents) only after the initial toxic blood has passed.",
      marathi: {
        intro: "**रक्तपित्त** म्हणजे वाढलेल्या पित्तामुळे रक्ताचे दूषित होणे आणि शरीराच्या छिद्रांतून रक्त पडणे.",
        core: "याचे **ऊर्ध्वग** (तोंड/नाकातून) किंवा **अधोग** (गुदद्वार/लघवीतून) असे प्रकार आहेत. आयुर्वेद 'प्रतिमार्ग-हरण' सुचवतो - जर रक्त वरून वाहत असेल, तर पोटातील पित्त विरेचनाद्वारे खालून बाहेर काढा.",
        clinical: "नाकातून रक्त येणे किंवा अति-मासिक पाळी येणे यावर उपचार करताना आम्ही **अडुळसा** (वासा) सारखी थंड औषधे वापरतो. सुरुवातीचे दूषित रक्त वाहून गेल्याशिवाय लगेच रक्त थांबवणारी औषधे दिली जात नाहीत."
      }
    },
    't004': {
      intro: "**Prameha and Madhumeha** cover the spectrum of metabolic disorders, specifically Diabetes Mellitus. Ayurveda describes 20 types based on clinical signs and urine quality.",
      core: "The pathology involves excessive **Kleda** (moisture) and **Meda** (fat) affecting the urinary system. **Madhumeha** is the terminal stage where the person passes 'Honey-like' urine. It is classified as **Sthoola** (Obese) or **Krisha** (Thin/Wasting) Diabetes.",
      clinical: "For obese diabetics, we use **Shodhana** (Purification) and dry powders. For thin diabetics, only **Shamana** (Palliation) and nutrition are advised. **Nisha-Amalaki** (Turmeric + Gooseberry) is our clinical standard for long-term blood sugar regulation.",
      marathi: {
        intro: "**प्रमेह आणि मधुमेह** हे चयापचय विकारांचे विशेषतः मधुमेहाचे (Diabetes) गट आहेत. आयुर्वेदात रंगावरून आणि लघवीच्या दर्जावरून याचे २० प्रकार सांगितले आहेत.",
        core: "यामध्ये शरीरातील जास्तीचा ओलावा (**क्लेद**) आणि चरबी (मेद) लघवीच्या यंत्रणेला बाधित करतात. **मधुमेह** ही शेवटची पायरी आहे जिथा प लघवी मधासारखी गोड होते.",
        clinical: "लठ्ठ मधुमेही रुग्णांसाठी आम्ही **शोधन** (शुद्धीकरण) वापरतो. सडपातळ रुग्णांसाठी केवळ पोषण आणि औषधे दिली जातात. **निशा-आमलकी** (हळद-आवळा) हे रक्तातील साखर नियंत्रित करण्यासाठी आमचे प्रमाणित औषध आहे."
      }
    },
    't005': {
      intro: "**Kushtha** covers all types of skin diseases, from minor Eczema to Psoriasis. It involves the corruption of seven deep tissues (**Sapta Dooshya**).",
      core: "Skin diseases are systemic, not local. Classification includes 7 Maha-kushtha (major) and 11 Kshudra-kushtha (minor). Key symptoms involve discharge (Kapha), burning (Pitta), and dryness/clogging (Vata). Recovery depends on the depth of the affected tissue (Dhatu).",
      clinical: "Treatment follows a cycle of repeated mild Shodhana (Cleansing) every month. We use **Khadira** (Acacia catechu) as the primary herb. Managing the patient's stress and diet is mandatory for permanent remission in Psoriasis cases.",
      marathi: {
        intro: "**कुष्ठ** मध्ये त्वचेच्या सर्व आजारांचा समावेश होतो, एक्झिमापासून ते सोरायसिसपर्यंत. यामध्ये सात सखोल ऊतींचा (सप्त दूष्य) बिघाड असतो.",
        core: "त्वचेचे आजार स्थानिक नसून संपूर्ण शरीराशी निगडित असतात. जळजळ (पित्त), खाज (कफ) आणि कोरडेपणा (वात) ही मुख्य लक्षणे आहेत. ऊती किती खोलवर बाधित झाल्या आहेत यावर बरे होण्याची शक्यता अवलंबून असते.",
        clinical: "दर महिन्याला सौम्य शुद्धीकरण करणे हा उपचाराचा भाग आहे. आम्ही **खदिर** (खैर) हे मुख्य औषध म्हणून वापरतो. सोरायसिसमध्ये रुग्णाचा ताण आणि आहार नियंत्रित करणे अनिवार्य आहे."
      }
    },
    't006': {
      intro: "**Shwasa and Kasa** cover respiratory disorders like Asthma, Bronchitis, and chronic Cough.",
      core: "**Shwasa** (Dyspnea) is caused by Vata and Kapha blocking the 'Prana-vaha Srotas'. In Asthma (**Tamaka Shwasa**), the patient feels better in a sitting position. **Kasa** (Cough) can be dry (Vata) or productive (Kapha). The goal is to clear the mucus and relax the bronchial channels.",
      clinical: "During an acute attack, we use **Agni-karma** or hot herbal compresses. For long-term management, 'Virechana' is surprisingly effective as it pulls the 'Pitta-Aama' out, which is often the hidden trigger for respiratory inflammation.",
      marathi: {
        intro: "**श्वास आणि कास** श्वसनाच्या विकारांचे जसे की दमा, ब्रॉन्कायटिस आणि खोकला यांचे व्यवस्थापन करतात.",
        core: "**श्वास** (दमा) वात आणि कफ यांनी प्राणाचे मार्ग अडवल्यामुळे होतो. दमा असलेल्या रुग्णाला बसून राहिल्यावर आराम वाटतो. खोकला (**कास**) कोरडा (वात) किंवा कफ असलेला असू शकतो.",
        clinical: "तीव्र अटॅक प्रसंगी आम्ही गरम औषधी लेप किंवा वाफ वापरतो. दीर्घकालीन व्यवस्थापनासाठी 'विरेचन' अत्यंत प्रभावी ठरते कारण ते सूज निर्माण करणारे 'पित्त' काढून टाकते."
      }
    },
    't007': {
      intro: "**Pandu and Kamala** represent Anemia and Liver disorders (including Jaundice). Pandu literally means 'pale' or 'yellowish-white'.",
      core: "**Pandu** is a disorder of the 'Rakta-vaha Srotas' (blood vessels) caused by high Pitta. **Kamala** (Jaundice) is the further advancement affecting the Liver (Yakrut). It is classified as **Koshthashrita** (obstructive) or **Shakhashrita** (hemolytic).",
      clinical: "We avoid iron supplements in Akut (Pittaj) stage. Instead, we give herbs like **Bhumi-amla** and **Katuki** to clear the liver path. Once the liver improves, then **Lauha Bhasma** (Processed Iron) is added to rebuild the hemoglobin.",
      marathi: {
        intro: "**पांडू आणि कामला** ॲनिमिया आणि यकृताचे विकार (काविळसह) दर्शवतात. पांडू म्हणजे फिकटपणा.",
        core: "**पांडू** हा उच्च पित्तामुळे रक्ताचा बिघाड आहे. **कामला** (काविळ) ही त्याची पुढची पायरी आहे जिथे यकृत (यकृत) बाधित होते. यामध्ये डोळे आणि नखे पिवळी पडतात.",
        clinical: "तीव्र अवस्थेत आम्ही लोहभस्म (Iron) देत नाही. त्याऐवजी आधी **भुई-आवळा** आणि **कुटकी** देऊन यकृताचा मार्ग मोकळा करतो. एकदा यकृत सुधारले की मगच लोहभस्म शक्ती वाढवण्यासाठी दिले जाते."
      }
    },
    't008': {
      intro: "**Grahani and Atisara** cover chronic Digestive disorders like IBS, Malabsorption, and Diarrhea.",
      core: "**Atisara** (Diarrhea) is an acute overflow of moisture (Kleda). **Grahani** (IBS) is a functional failure of the 'Grahani' (duodenum area) to hold and digest food. It alternates between loose and hard stools.",
      clinical: "The 'Agni' is the key here. We use **Panchamrita Parpati** for Grahani. Drinking **Buttermilk (Takra)** is considered the best medicine for these disorders as it stimulates Agni without increasing Pitta.",
      marathi: {
        intro: "**ग्रहणी आणि अतिसार** पचनक्रियेचे जुनाट विकार जसे की IBS आणि वारंवार होणारे जुलाब यांचा समावेश करतात.",
        core: "**अतिसार** (जुलाब) ओलावा अति वाढल्यामुळे होतो. **ग्रहणी** (IBS) मध्ये अन्नाचे योग्य पचन न होता ते तसेच बाहेर पडते. यामध्ये कधी पातळ तर कधी घट्ट शौचास होते.",
        clinical: "येथे 'अग्नी' ही मुख्य गुरुकिल्ली आहे. या आजारांसाठी **ताक (तक्र)** हे अमृतासारखे मानले जाते कारण ते अग्नी वाढवते पण पित्त वाढवत नाही. आम्ही 'पंचामृत पर्पटी' सारखी औषधे वापरतो."
      }
    },
    't009': {
      intro: "**Arsha** (Hemorrhoids/Piles) is defined as a disease that 'kills the life like an enemy'. It is a disorder of the anal canal.",
      core: "It is directly linked to **Mandagni** (Weak digestion) and **Constipation**. There are six types based on Dosha dominance. It involves the dilatation of the 'Dhamanis' in the rectum. 'Dry' piles are Vata/Kapha, while 'Bleeding' piles are Pitta-dominant.",
      clinical: "Management involves correcting the bowel habit first. We use **Abhayarishta** to soften stools and **Sooran** (Elephant foot yam) as a dietary staple. In advanced cases, para-surgical 'Kshara-Sutra' is recommended.",
      marathi: {
        intro: "**अर्श** (मूळव्याध) ला शत्रूंसारखा जीव घेणार आजार म्हटले जाते. हा गुदद्वाराचा विकार आहे.",
        core: "याचा थेट संबंध कमी पचनशक्ती (**मंदाग्नी**) आणि मलावरोधाशी आहे. रक्ताची पडणारी मूळव्याध पित्तामुळे असते, तर कोरडी मूळव्याध वात-कफामुळे असते.",
        clinical: "आदि पोट साफ होण्याची सवय लावणे महत्त्वाचे आहे. आम्ही **अभयारिष्ट** वापरतो आणि आहारात **सुरणाचा** समावेश सांगतो. प्रगत अवस्थेत 'क्षार-सूत्र' उपचाराचा सल्ला दिला जातो."
      }
    },
    't010': {
      intro: "**Amavata** (Rheumatoid Arthritis) is a complex autoimmune condition where 'Ama' (toxins) and 'Vata' combine and settle in the joints.",
      core: "It is characterized by **Angamarda** (body ache), **Aruchi** (loss of taste), and **Sandhi-shoola** (joint pain with swelling). Unlike routine arthritis, the pain increases with oil massage because it 'spreads' the sticky Ama.",
      clinical: "Treatment starts with 'Ruksha Sweda' (Dry heat using sand bags) and deepana-pachana herbs. Only after Ama is cleared, we use medicated fats. **Simhanad Guggulu** is our specific formulation for Amavata management.",
      marathi: {
        intro: "**आमवात** (Rheumatoid Arthritis) हा एक ऑटोइम्यून आजार आहे जिथे 'आम' (विषारी पदार्थ) आणि 'वात' एकत्र येऊन सांध्यांमध्ये स्थिरावतात.",
        core: "यामध्ये अंगदुखी, तोंडाला चव नसणे आणि सांधेदुखीसह सूज असते. इतर सांधेदुखीच्या उलट, यात तेल लावल्याने वेदना वाढतात, तर वात-रक्तात तेलाने आराम मिळू शकतो.",
        clinical: "उपचारांची सुरुवात वाळूच्या शेकाने (Ruksha Sweda) आणि अग्नी वाढवणाऱ्या औषधांनी होते. आम पूर्णपणे गेल्यावरच तेलाचा वापर केला जातो. **सिंहनाद गुग्गुळू** हे यावर खास औषध आहे।"
      }
    },
    't011': {
      intro: "**Sandhigatavata** (Osteoarthritis) is a degenerative joint disease caused by aggravated Vata depleting the natural lubrication (Sleshaka Kapha).",
      core: "Symptoms include 'Hanti Sandhin' (destruction of joints), pain during movement, and crepitus (cracking sounds). It is purely a Vata-dominant wasting disorder associated with aging (**Dhatu-kshaya**).",
      clinical: "Management focus is on **Brimhana** (Nourishment). We use **Janu-Basti** (Knee-oil pool) and internal consumption of medicated Ghee or oils like **Ksheera-bala**. This replenishes the joint space and provides a cushion against friction.",
      marathi: {
        intro: "**संधिगतवात** (Osteoarthritis) हा वाढत्या वयानुसार सांध्यांमधील वंगण (श्लेषक कफ) कमी झाल्यामुळे होणारा वात विकार आहे.",
        core: "लक्षणे म्हणजे हालचाल करताना वेदना होणे आणि सांध्यांमधून आवाज येणे. हा पूर्णपणे 'वात' प्रभावी आणि ऊतींची झीज होणारा आजार आहे.",
        clinical: "यामध्ये आम्ही 'बृंहण' (पोषण) वर भर देतो. आम्ही गुडघ्यांसाठी **जानु-बस्ती** (तेलाचा तलाव) आणि अंतर्गत तुपाचा वापर सुचवतो. यामुळे सांध्यांमधील घर्षण कमी होऊन हालचाल सुधारते."
      }
    },
    't012': {
      intro: "**Neurological Disorders** (Vata-Vyadhi) cover a wide range of conditions like Paralysis (Pakshaghata), Sciatica (Gridhrasi), and Parkinson's (Kampa-vata).",
      core: "Vata is the only Dosha responsible for mobility and sensory transmission. All neurological illnesses involver **Srotorodha** (blockage) or **Dhatu-kshaya** (degeneration). Diagnosis involves checking the specific 'Marma' points and 'Nadi'.",
      clinical: "We treat Stroke (Pakshaghata) using **Sneha-Basti** and **Nasya**. For Sciatica, **Agni-karma** at specific points on the leg provides instant relief. Herbal supplements like **Maharasnadi Kwatha** are used to repair nerve conduction.",
      marathi: {
        intro: "**वातव्याधी** म्हणजे केवळ वात दोष बिघडल्यामुळे निर्माण होणारे ८० प्रकारचे विविध आजार, ज्यात अर्धांगवायू आणि साइटिकाचा समावेश होतो.",
        core: "वाताचा मूळ स्वभाव कोरडेपणा आणि हालचाल आहे. जेव्हा वाढलेला उपवासाने किंवा ताणाने वात वाढतो, तेव्हा तो मज्जासंस्थेला बाधित करतो. **गृध्रसी** (साइटिका) आणि **पक्षाघात** (लकवा) ही मुख्य उदाहरणे आहेत.",
        clinical: "भरपूर तेलाचा वापर (बाह्य आणि अंतर्गत) आणि **बस्ती** ही यावरची मुख्य चिकित्सा आहे. मज्जासंस्थेच्या मजबुतीसाठी आम्ही 'महानारायण तेल' वापरतो."
      }
    },
    't013': {
      intro: "**Endocrine Disorders** in Ayurveda focus on the imbalance of 'Agni' and 'Dhatu-metabolism', covering Thyroid issues and Adrenal fatigue.",
      core: "**Galaganda** (Goiter/Thyroid) is described as a Kapha-Meda imbalance in the neck. Thyroid dysfunction is viewed as a failure of 'Dhatwagni' (tissue enzymes). Management involves clearing the lymphatics and stimulating the glandular Agni.",
      clinical: "For Hypothyroidism, we use **Kanchanar Guggulu** and specific Pranayamas like 'Ujjayi'. For PCOD (Hormonal imbalance), we use **Virechana** and **Uttar-Basti** to reset the hypothalamic-pituitary-ovarian axis.",
      marathi: {
        intro: "**अंतःस्त्रावी विकार** (Endocrine Disorders) म्हणजे थायरॉईड आणि हार्मोन्सच्या समस्यांवर आयुर्वेदाचा दृष्टिकोन.",
        core: "**गलगंड** (Thyroid) हा मानेतील कफ-मेद बिघाड मानला जातो. हार्मोन्सचे संतुलन हे 'धात्वाग्नी' (Tissue enzymes) वर अवलंबून असते. यामध्ये लिम्फॅटिक शुद्धी आणि अग्नी सुधारणे आवश्यक असते.",
        clinical: "थायरॉईडसाठी आम्ही **कांचनार गुग्गुळू** आणि 'उज्जायी' प्राणायाम वापरतो. पीसीओडी (PCOS) साठी 'विरेचन' आणि 'उत्तर-बस्ती' द्वारे हार्मोन्सचे संतुलन साधले जाते."
      }
    },
    't014': {
      intro: "**Rasayana** (Rejuvenation Therapy) is a specialized branch aimed at delaying aging, improving memory, and strengthening the immune system.",
      core: "Rasayana means 'the path of Rasa' (nutrition). It improves the quality of every 'Dhatu' (tissue) from the beginning. It is classified as **Kamya** (for health), **Naimittika** (for specific disease), and **Ajasrika** (daily rejuvenation through diet).",
      clinical: "In clinical practice, we use **Shilajatu** for metabolic strength and **Brahmi** for brain health. Rasayana should ideally be given after **Shodhana** (Cleansing) to ensure that the clean body channels can fully absorb the potent nutrients.",
      marathi: {
        intro: "**रसायन चिकित्सा** म्हणजे केवळ औषध नसून आयुष्य वाढवणारी आणि पेशींचे पुनरुज्जीवन करणारी एक विशेष शाखा आहे.",
        core: "रसायन म्हणजे 'रसाचा मार्ग' (पोषण). हे सुरुवातीपासूनच प्रत्येक सात ऊतींचा (धातू) दर्जा सुधारते. याचे **काम्य** (आरोग्यासाठी) आणि **नैमित्तिक** (विशिष्ट आजारासाठी) असे प्रकार आहेत.",
        clinical: "आम्ही स्मृती आणि प्रतिकारशक्ती वाढवण्यासाठी **शिल्पाजित** आणि **ब्राह्मी** वापरतो. रसायन देण्यापूर्वी शरीर 'शोधन' (शुद्धी) करून स्वच्छ केलेले असावे जेणेकरून पोषक घटक पूर्ण शोषले जातात."
      }
    },
    't015': {
      intro: "**Vajikarana** (Aphrodisiac and Virility) focuses on sexual health, fertility, and the production of a healthy progeny.",
      core: "It aims to improve the quality and quantity of **Shukra Dhatu**. It covers erectile dysfunction, low sperm count, and psychological stress related to sexual performance. It emphasizes that sexual health is a sign of overall systemic vitality.",
      clinical: "We use herbs like **Ashwagandha**, **Safed Musli**, and **Kapikachhu**. Vajikarana is not just for pleasure; it is a clinical tool for treating infertility and boosting the 'Ojas' (Vital Essence) of the patient, which prevents early aging.",
      marathi: {
        intro: "**वाजीकरण** म्हणजे लैंगिक आरोग्य, प्रजनन क्षमता और उत्तम संतती निर्माण करण्याचे शास्त्र.",
        core: "याचे ध्येय **शुक्र धातूचा** दर्जा आणि प्रमाण सुधारणे हे आहे. हे केवळ आनंदासाठी नसून शरीरातील ओज (Vitality) टिकवून ठेवण्यासाठी आणि वंध्यत्व घालवण्यासाठी महत्त्वाचे आहे.",
        clinical: "आम्ही **अश्वगंधा**, **सफेद मुसळी** आणि **कवच बी** वापरतो. हे मज्जासंस्थेला बळ देऊन अकाली वृद्धत्व रोखण्यास मदत करते."
      }
    },
    't016': {
      intro: "**Management of Chronic Kidney Diseases** (Mutraghata/Vrukka-Roga) focuses on restorative therapies for the renal tissues.",
      core: "Ayurveda describes 13 types of **Mutraghata** (Urinary obstruction). Pathogenesis involves Vata and Kapha affecting the 'Mutravaha Srotas'. Modern CKD is correlated with 'Vrukka-dushti' and 'Meda-vaha Srotas' failure.",
      clinical: "We use herbs like **Gokshura**, **Punarnava**, and **Varun** to improve filtration. Special protocols like 'Basti' (Rectal enema) using 'Sheetala' fluids can sometimes reduce Creatinine levels and delay the need for dialysis in early-to-mid stage patients.",
      marathi: {
        intro: "**मूत्रवह स्त्रोतस विकार** (Kidney Diseases) यामध्ये मूत्रखडा, मूत्रमार्गाचे संसर्ग आणि मूत्रपिंडाच्या कार्याचे व्यवस्थापन केले जाते.",
        core: "यामध्ये वात आणि कफ दोष मूत्रमार्गाला बाधित करतात. आधुनिक भाषेत याला CKD किंवा मूत्रपिंडाचे फेल्युअर म्हणतात. यात शरीरातील मेद आणि रक्ताचा खोलवर विचार केला जातो.",
        clinical: "आम्ही **गोक्षुर**, **पुनर्नवा** आणि **वरुण** सारख्या औषधांनी गाळण्याची प्रक्रिया सुधारतो. विशिष्ट 'बस्ती' मुळे क्रिएटिनाइन कमी होण्यास आणि डायलिसिस पुढे ढकलण्यास मदत होते."
      }
    },
    't017': {
      intro: "**Ayurvedic Oncology (Arbuda Chikitsa)** offers a holistic approach to cancer care, focusing on immune-modulation and reducing side effects.",
      core: "**Arbuda** is defined as an un-coordinated, deep-rooted fleshy growth. It involves all three Doshas (Sannipataja). The focus is on **Lekhana** (Scraping the tumor) and **Vyadhi-kshamatva** (Boosting the patient's internal surveillance against cells).",
      clinical: "While we don't 'cure' late-stage cancer alone, we provide integration with Chemo/Radiation. Using **Gold Bhasma** and **Shatavari** helps the patient tolerate harsh modern treatments while improving their Quality of Life and reducing tumor fatigue.",
      marathi: {
        intro: "**अर्बुद चिकित्सा** (Ayurvedic Oncology) कर्करोगाच्या रुग्णांमध्ये प्रतिकारशक्ती वाढवण्यासाठी आणि दुष्परिणाम कमी करण्यासाठी वापरली जाते.",
        core: "**अर्बुद** म्हणजे अनियंत्रित वाढणारी गाठ. यामध्ये त्रिदोषांचा मोठा बिघाड असतो. रक्ताचे शुद्धीकरण आणि शरीरातील पेशींची संरक्षक यंत्रणा बळकट करण्यावर भर दिला जातो.",
        clinical: "आम्ही केमोथेरपीचे दुष्परिणाम कमी करण्यासाठी **सुवर्ण भस्म** आणि **शतावरी** वापरतो. यामुळे रुग्णाची जगण्याची इच्छा आणि शारीरिक ताकद वाढते."
      }
    },
    't018': {
      intro: "**Cardiac Care (Hrid-Roga)** in Kayachikitsa focuses on strengthening the 'Hridaya' (Heart) as the seat of 'Ojas' and consciousness.",
      core: "Heart disease involves Vata (irregular rhythm), Pitta (inflammation), or Kapha (blockage/atherosclerosis). Ayurveda emphasizes that mental stress (**Manas-Tan**) is the primary driver of physical heart damage.",
      clinical: "We use **Arjuna** (Terminalia arjuna) as the master herb. For high BP and palpitations, **Hriday-Basti** (Oil pool over the heart) is miraculous. It calms the 'Vyana Vayu' and improves the contractility of the heart muscles naturally.",
      marathi: {
        intro: "**हृद-रोग** (Cardiac Care) मध्ये हृदयाचे आरोग्य टिकवण्यासाठी आणि 'ओज' वाढवण्यासाठी 'अर्जुना' सारख्या औषधांचा वापर केला जातो.",
        core: "हृदयात वात (वेग बिघडणे), पित्त (दाह) किंवा कफ (अडथळे) असू शकतात. मानसिक ताण हे हृदयाच्या आजाराचे मुख्य कारण मानले जाते.",
        clinical: "आम्ही **हृदय-बस्ती** (हृदयावर तेलाचा तलाव) वापरून 'व्यान वायू' शांत करतो. यामुळे रक्तदाब (BP) नियंत्रित होतो आणि हृदयाचे स्नायू बळकट होतात."
      }
    },
    't019': {
      intro: "**Psychiatric Disorders (Unmada & Apasmara)** cover the spectrum of mental illnesses, including Psychosis, Epilepsy, and Anxiety.",
      core: "**Unmada** (Insanity) is a total loss of 'Dhee' (intellect) and 'Smriti' (memory). **Apasmara** (Epilepsy) involves sudden loss of consciousness due to clouding of the 'Sattwa'. The role of the gut-brain axis is central to treatment.",
      clinical: "We use **Panchagavya Ghrita** (Medicated ghee) and **Shirodhara** (Oil pouring on forehead). Medicated fumes (**Dhupana**) are used to treat the 'Grahodosha' (subtle infectious or environmental triggers) that affect mental health.",
      marathi: {
        intro: "**उन्माद आणि अपस्मार** (Psychiatric Disorders) म्हणजे मानसिक आजार जसे की भ्रम, फेफरे येणे आणि प्रचंड चिंता.",
        core: "**उन्माद** म्हणजे बुद्धी आणि स्मृतीतील बिघाड. **अपस्मार** म्हणजे मन झाकाळून गेल्यामुळे येणारे फेफरे. पचनमार्ग आणि मेंदू यांचा जवळचा संबंध येथे विचारात घेतला जातो.",
        clinical: "आम्ही **ब्राह्मी घृत** आणि **शिरोधारा** वापरतो. वाफ देण्याच्या प्रक्रियेने (धूपन) मनावर झालेले सूक्ष्म परिणाम दूर केले जातात."
      }
    },
    't020': {
      intro: "**Geriatric Care (Jara-Chikitsa)** focuses on managing the natural 'Vata-dominance' that occurs after age 60.",
      core: "Aging involves the depletion of 'Dhatus' and the 'drying' of the body. The goal is 'Vayasthapana' (Maintaining youthfulness). It addresses memory loss, bone density (Osteoporosis), and sensory decline.",
      clinical: "We prescribe daily **Abhyanga** (Oil massage) and **Sneha Basti**. Giving **Guduchi** and **Ashwagandha** daily prevents 'Immunosenescence' (aging of the immune system), allowing the elderly to lead an active, disease-free life.",
      marathi: {
        intro: "**जरा चिकित्सा** (Geriatric Care) म्हणजे ६० वर्षांनंतर उद्भवणाऱ्या वाढलेल्या वाताचे आणि ऊतींची झीजेचे व्यवस्थापन.",
        core: "वृद्धत्व म्हणजे शरीरातील ओलावा कमी होणे आणि वात वाढणे. स्मृतीभ्रंश, हाडांची ठिसूळता आणि इंद्रियांची शक्ती कमी होणे यावर येथे उपचार केले जातात.",
        clinical: "आम्ही दैनंदिन **अभ्यंग** आणि **बस्ती** सुचवतो. **अश्वगंधा** आणि **गडुची** मुळे वृद्ध लोकां मधील प्रतिकारशक्ती टिकून राहते."
      }
    },
    't021': {
      intro: "**Principles of Aushadha Matra (Dosage)** covers the science behind determining the right amount of medicine for each individual.",
      core: "Dosage depends on **Vayas** (Age), **Bala** (Strength), **Agni** (Digestion), and **Vyadhi** (Severity). 'Amrita' (Nectar) in excess acts as poison, and 'Visha' (Poison) in right dose acts as medicine.",
      clinical: "We teach that a 'Bhasma' dose is only 125mg, while a 'Churn' (Powder) dose can be 3-5 grams. Giving a high dose to a person with 'Mandagni' (Weak digestion) will only create more 'Ama' instead of healing.",
      marathi: {
        intro: "**औषध मात्रा** (Dosage) म्हणजे रुग्णाचे वय, शक्ती आणि अग्नीनुसार औषधाचे प्रमाण ठरवण्याचे शास्त्र.",
        core: "योग्य प्रमाणात दिलेले विष सुद्धा औषध म्हणून काम करते आणि चुकीच्या प्रमाणात दिलेले अमृत सुद्धा विष ठरते. पचनशक्ती (अग्नी) ही डोस ठरवण्यासाठी सर्वात महत्त्वाची आहे.",
        clinical: "आम्ही भस्माचा डोस सव्वाशे मिग्रॅ ठेवतो तर चूर्णाचा डोस ३ ते ५ ग्रॅम असतो. मंद अग्नी असलेल्या रुग्णाला जळ डोस दिल्यास अधिक 'आम' तयार होतो."
      }
    },
    't022': {
      intro: "**Anupana: The Importance of Vehicles** is the study of liquids taken along with or after the medicine to enhance its effect.",
      core: "Anupana acts as a 'carrier' (Vahaka) that helps the medicine reach the target site faster. For example, honey is used to carry medicine into the 'Kapha' sites, while warm water is used for 'Vata' disorders.",
      clinical: "In clinical practice, we give **Pippali** with honey for cough, but with warm milk for sexual health. Changing the Anupana changes the pharmacological action (Guna) of the same drug, allowing for high customization.",
      marathi: {
        intro: "**अनुपान** म्हणजे औषधासोबत किंवा औषधानंतर घेतले जाणारे द्रव (मध, दूध, पाणी), जे औषधाचा परिणाम वाढवते.",
        core: "अनुपान हे औषधाला योग्य जागी पोहोचवण्याचे साधन आहे. कफ रोगात मध आणि वात रोगात कोमट पाण्याचा वापर वाहक म्हणून केला जातो.",
        clinical: "आम्ही खोकल्यासाठी पिंपळी मधासोबत देतो, पण वाजीकरणासाठी ती दुधासोबत दिली जाते. यामुळे एकाच औषधाचा उपयोग विविध कारणांसाठी करता येतो."
      }
    },
    't023': {
      intro: "**Samsarjana Krama** in Kayachikitsa focuses on the graduated diet for patients recovering from chronic illnesses.",
      core: "After a severe disease like Jwara or Kamala, the 'Agni' is like a dying ember. We start with **Manda** (scum), then **Peya** (gruel), and then semi-solids. This ensures the digestive capacity is rebuilt without relapse.",
      clinical: "For hospital patients, we prescribe this protocol to ensure they don't get bloated or constipated during recovery. It is the Ayurvedic version of a 'Step-down Diet' in modern clinical nutrition.",
      marathi: {
        intro: "**संसर्जन क्रम** कायचिकित्सेमध्ये गंभीर आजारातून उठलेल्या रुग्णाची पचनशक्ती सुधारण्यासाठी वापरला जातो.",
        core: "गंभीर आजारानंतर अग्नी विझलेल्या कोळशासारखा असतो. आधी पांढरी पेज, मग ओले भात अशा क्रमाने ५-७ दिवसांत पचनशक्ती पुन्हा प्रज्वलित केली जाते.",
        clinical: "रुग्णालयातील रुग्णांना आम्ही हा आहार नियम पाळायला सांगतो जेणेकरून आजारातून बरे होताना पोट डब्ब होणे किंवा मलावष्टंभाचा त्रास होणार नाही."
      }
    },
    't024': {
      intro: "**Pathya-Apathya** is the science of Wholesome (Pathya) and Unwholesome (Apathya) diets and habits for specific diseases.",
      core: "Ayurveda says: 'If Pathya is followed, medicine is not needed. If Pathya is not followed, medicine is of no use.' It is the most critical part of Kayachikitsa. Every disease has a specific list of forbidden foods (like salt in Kidney disease).",
      clinical: "We provide a 'Food Chart' with every prescription. For Migraine, we forbid fermented foods and late-night screen time. This 'Lifestyle Correction' is what creates a permanent cure in patients who have failed modern medical management.",
      marathi: {
        intro: "**पथ्य-अपथ्य** म्हणजे कोणत्या आजारात काय खावे आणि काय टाळावे याचे सविस्तर मार्गदर्शन.",
        core: "आयुर्वेद म्हणतो: 'जर पथ्य पाळले तर औषधाची गरज नाही, आणि जर पथ्य नाही पाळले तर औषधाचा उपयोग नाही.' हे उपचारांचे सर्वात महत्त्वाचे अंग आहे.",
        clinical: "आम्ही प्रत्येक रुग्णाला 'फूड चार्ट' देतो. अर्धशिशीसाठी लोणची आणि रात्रीचे जागरण टाळणे हे औषधाइतकेच प्रभावी ठरते."
      }
    },
    't025': {
      intro: "**Emergency Management in Kayachikitsa** covers the handling of acute conditions like Heart Attack, Respiratory Distress, and Stroke.",
      core: "Ayurveda uses 'Aatyayika Chikitsa'—immediate measures to stabilize the patient. It includes using 'Kupipakwa' medicines (mercurials) for fast action and 'Marmabhighata' (vital point) protection.",
      clinical: "In emergencies like low BP or shock, we use **Makaradhwaja** with honey. While modern ICU care is necessary for monitoring, these Ayurvedic 'Life-Savers' help in rapid neural and cardiac recovery, reducing the duration of hospital stay.",
      marathi: {
        intro: "**आत्ययिका चिकित्सा** (Emergency Management).",
        core: "हृदयविकार किंवा अर्धांगवायू (Paralysis) मध्ये तातडीने करायचे उपचार.",
        clinical: "रस-सिंदूर आणि मकरध्वज यांसारख्या शक्तिशाली औषधांनी प्राण वाचवता येतात।"
      }
    }
  },
  'rasashastra': {
    't001': {
      intro: "**Rasashastra** is the alchemical branch of Ayurveda that deals with the processing of metals, minerals, and gemstones into potent therapeutic agents. **Bhaishajya Kalpana** is the science of pharmaceutical formulations.",
      core: "The central concept is 'Loha-vedha' (transmutation of metals) evolved into 'Deha-vedha' (transmutation/rejuvenation of the body). It uses 'Parada' (Mercury) as the king of all minerals. The goal is to make these inorganic substances biocompatible through rigorous purification (**Shodhana**).",
      clinical: "Rasaushadhis (mercurial/metallic drugs) are known for their 'Alpa-matra' (small dosage), 'Aruchi-aprashanga' (no bad taste), and 'Kshipra-arogya' (rapid action). They are used in chronic and otherwise incurable diseases because they penetrate deep into the tissues faster than simple herbs.",
      marathi: {
        intro: "**रसशास्त्र** ही आयुर्वेदाची ती शाखा आहे जी धातू, खनिजे आणि रत्नांवर प्रक्रिया करून त्यांना शक्तिशाली औषधांमध्ये रूपांतरित करते. **भैषज्य कल्पना** हे औषध निर्मितीचे शास्त्र आहे.",
        core: "याचा मुख्य उद्देश 'देह-वेध' (शरीराचे पुनरुज्जीवन) हा आहे. यामध्ये **पारा** (Mercury) हा सर्व खनिजांचा राजा मानला जातो. शुद्धीकरण (**शोधन**) क्रियेद्वारे अकार्बनिक पदार्थांना शरीरासाठी अनुकूल बनवले जाते.",
        clinical: "रसौषधी त्यांच्या कमी मात्रेमुळे (Alpa-matra) आणि जलद परिणामामुळे (Kshipra-arogya) ओळखल्या जातात. इतर औषधांनी बरे न होणाऱ्या जुनाट आजारांमध्ये यांचा वापर होतो कारण त्या पेशींमध्ये खोलवर शिरतात."
      }
    },
    't002': {
      intro: "**Yantra** and **Musha** are the classical laboratory equipment used in Rasashastra for processing mercury and minerals. They are the ancient ancestors of modern chemical apparatus.",
      core: "Yantras include **Damaru Yantra** (Sublimation), **Dola Yantra** (Swedana/Steaming), and **Khalva Yantra** (Trituration). **Mushas** (Crucibles) are heat-resistant vessels made of special clay and husk used for melting metals (Marana).",
      clinical: "The quality of a Bhasma depends on the correct use of Yantras. For example, using a glass Khalva Yantra instead of a stone one for grinding can lead to contamination. Precision in lab setup is the first rule of Ayurvedic alchemy.",
      marathi: {
        intro: "**यंत्र** आणि **मुषा** ही औषध तयार करण्यासाठी लागणारी शास्त्रीय उपकरणे आहेत. ही आधुनिक रासायनिक उपकरणांची प्राचीन रूपे आहेत.",
        core: "यंत्रांमध्ये **डमरू यंत्र** (ऊर्ध्वपातन), **दोला यंत्र** (स्वेदन) आणि **खल्व यंत्र** (घोटणे) यांचा समावेश होतो. **मुषा** (Crucibles) म्हणजे धातू वितळवण्यासाठी वापरली जाणारी मातीची उष्णतारोधक भांडी.",
        clinical: "भस्माचा दर्जा योग्य यंत्राच्या वापरावर अवलंबून असतो. प्रयोगशाळेतील ही अचूकता दर्जेदार औषध निर्मितीसाठी पहिली पायरी आहे."
      }
    },
    't003': {
      intro: "**Puta** (Heating System) and **Agni** (Fire intensity) define the amount of energy provided to a mineral during its 'Marana' (incineration). It is a carefully controlled thermal treatment.",
      core: "Different Putas like **Maha Puta**, **Gaja Puta**, and **Varaha Puta** vary by the number of cow-dung cakes used, determining the maximum temperature. Agni is classified as 'Mridu' (Mild), 'Madhya' (Medium), and 'Teekshna' (Intense) based on the requirement of the specific metal.",
      clinical: "If a Bhasma is 'Under-burnt' (Apakva), it is toxic. If 'Over-burnt', it loses potency. Mastery of Puta ensures that the metal reaches its 'Nano' state without losing its biological activity, a hallmark of ancient Indian nanotechnology.",
      marathi: {
        intro: "**पुट** (Heating System) आणि **अग्नी** खनिजांवर उष्णतेचे संस्करण करून त्यांचे भस्म तयार करण्यासाठी वापरले जातात. हे तापमानाचे नियंत्रित व्यवस्थापन आहे.",
        core: "**महा पुट**, **गज पुट** आणि **वराह पुट** हे वापरलेल्या गोवऱ्यांच्या संख्येवरून ठरवले जातात. अग्नीचे 'मृदु', 'मध्य' आणि 'तीक्ष्ण' असे प्रकार गरजेनुसार वापरले जातात.",
        clinical: "जर भस्म कच्चे (अमृतात) राहिले तर ते विषारी ठरू शकते. पुटाच्या अचूक वापरामुळे धातू 'नॅनो' स्थितीत पोहोचतो, जे प्राचीन भारतातील नॅनो-टेक्नॉलॉजीचे उदाहरण आहे."
      }
    },
    't004': {
      intro: "**Parada** (Mercury) is considered the 'Semen of Lord Shiva' in classical texts. It is the most complex substance in Rasashastra, capable of bestowing longevity and health when processed correctly.",
      core: "In its raw state, Mercury has seven 'Doshas' (Visha, Wahni, Mala, etc.). **Shodhana** involves eight sequential steps like 'Svedana' (steaming) and 'Mardana' (grinding) with acidic and alkaline juices to remove these toxicities.",
      clinical: "Processed Mercury (**Shuddha Parada**) acts as a 'Yogavahi'—it carries the properties of the herbs it is mixed with into the cells. It is never used alone clinically but always as a part of a 'Khalviya' or 'Kupipakwa' formulation.",
      marathi: {
        intro: "**पारद** (पारा) हा रसशास्त्रातील सर्वात महत्त्वाचा आणि गुंतागुंतीचा घटक आहे. योग्य प्रक्रिया केल्यास तो दीर्घायुष्य आणि आरोग्य देण्यास सक्षम असतो.",
        core: "अशुद्ध पाऱ्यामध्ये सात प्रकारचे दोष असतात. **शोधन** प्रक्रियेत स्वेदन आणि मर्दन यांसारख्या आठ टप्प्यांनी हे विषारी दोष दूर केले जातात.",
        clinical: "शुद्ध पारद हा **योगवाही** म्हणून काम करतो - म्हणजे तो ज्या औषधी वनस्पतींसोबत वापरला जातो त्याचे गुणधर्म पेशींपर्यंत वेगाने पोहोचवतो."
      }
    },
    't005': {
      intro: "**Ashta-Samskara** are the eight primary pharmaceutical processes that transform raw Mercury into a divine medicine. They are the core of Mercurial alchemy.",
      core: "The steps are: **Svedana** (Steaming), **Mardana** (Grinding), **Murchana** (Swooning), **Utthapana** (Revival), **Patana** (Sublimation), **Rodhana** (Inhibition), **Niyamana** (Restraint), and **Deepana** (Ignition). Each step changes the physical and energetic property of Mercury.",
      clinical: "While eight are mandatory for medicinal use, the higher '18 Samskaras' are meant for 'Rasayana' (rejuvenation/immortality) goals. Completion of these steps ensures that Mercury can no longer cause tremors or neurological damage, becoming 'Amrita'.",
      marathi: {
        intro: "**अष्ट-संस्कार** म्हणजे पाऱ्याला दैवी औषधामध्ये रूपांतरित करण्याच्या आठ मुख्य प्रक्रिया आहेत. हा रसशास्त्राचा कणा आहे.",
        core: "टप्पे: **स्वेदन**, **मर्दन**, **मूर्छन**, **उत्थापन**, **पातन**, **रोधन**, **नियमन** आणि **दीपन**. प्रत्येक संस्कार पाऱ्याचे भौतिक आणि ऊर्जात्मक गुणधर्म बदलतो.",
        clinical: "औषधी वापरासाठी आठ संस्कार पुरेसे असतात, पण 'रसायन' (दीर्घायुष्य) साठी १८ संस्कार सांगितले आहेत. या प्रक्रियेमुळे पारा मज्जासंस्थेसाठी सुरक्षित आणि अमृततुल्य होतो."
      }
    },
    't006': {
      intro: "**Maharasa** and **Uparasa** are the two primary groups of minerals used in Ayurveda. They are ranked based on their alchemical importance and affinity with Mercury.",
      core: "**Maharasa** (8 substances like Abhraka/Mica, Vaikranta, etc.) are the 'Greater Minerals'. **Uparasa** (8 like Gandhaka/Sulphur, Gairika, Shila-jatu) are the 'Secondary Minerals'. **Gandhaka** is the most vital, as it is the 'blood' that binds Mercury into a stable form (**Kajjali**).",
      clinical: "Clinical medicine uses **Shilajatu** (Uparasa) for diabetes and aging, and **Abhraka Bhasma** (Maharasa) for respiratory and nervous system failure. Their classification helps in understanding their therapeutic depth.",
      marathi: {
        intro: "**महारस** आणि **उपरस** हे आयुर्वेदात वापरल्या जाणाऱ्या खनिजांचे दोन मुख्य गट आहेत. त्यांची क्रमवारी पाऱ्यासोबतच्या त्यांच्या संबंधावरून ठरवली जाते.",
        core: "**महारस** मध्ये अभ्रक आणि वैक्रांत यांसारख्या ८ घटकांचा समावेश होतो. **उपरस** मध्ये गंधक, गैरिक आणि शिलाजीत यांचा समावेश होतो. **गंधक** हा पाऱ्याला स्थिर करण्यासाठी (कज्जली बनवण्यासाठी) अतिशय महत्त्वाचा असतो.",
        clinical: "मधुमेहासाठी **शिलाजीत** आणि श्वसनविकारांसाठी **अभ्रक भस्म** मोठ्या प्रमाणावर वापरले जाते. हे वर्गीकरण त्यांच्या उपचारांच्या खोली समजण्यास मदत करते."
      }
    },
    't007': {
      intro: "**Sadharana Rasa** and **Ratna Vijnana** cover the common minerals and the precious gemstones used in Ayurvedic therapeutics.",
      core: "**Sadharana Rasa** reflects minerals like Navasadara and Kaparda (Cowrie). **Ratna** (Gems) include Manikya (Ruby), Mukta (Pearl), and Heera (Diamond). Gemstones are reduced to Bhasma states to treat deep-seated metabolic and psychic disorders.",
      clinical: "Mukta (Pearl) Bhasma is highly celebrated for its cooling effect in high fever and bleeding. Ratnas are also used for 'Grahadosha' (astrological balance) and enhancing the aura, showing the holistic reach of Ayurvedic pharmacology.",
      marathi: {
        intro: "**साधारण रस** आणि **रत्न विज्ञान** यामध्ये सामान्य खनिजे आणि औषधांमध्ये वापरल्या जाणाऱ्या मौलयवान रत्नांचा अभ्यास केला जातो.",
        core: "**साधारण रस** मध्ये नवसादर आणि कपर्द (कवड्या) यांचा समावेश होतो. **रत्नांमध्ये** माणिक, मोती, हिरा आणि प्रवाळ यांचा समावेश होतो. रत्नांचे भस्म करून ते चयापचय आणि मानसिक व्याधींवर वापरले जातात.",
        clinical: "**मोती भस्म** त्याच्या थंड गुणधर्मामुळे ताप आणि उष्णतेच्या विकारांवर अत्यंत प्रभावी आहे. रत्नांचा वापर ग्रहांचे दोष आणि शरीराभोवतीची ऊर्जा (Aura) सुधारण्यासाठीही केला जातो."
      }
    },
    't008': {
      intro: "**Shodhana** (Purification) and **Marana** (Calcination) are the two pillars of mineral processing. They are the bridge between a 'poisonous metal' and a 'healing remedy'.",
      core: "Shodhana removes external impurities and reduces toxicity using substances like Cow's urine or Lemon juice. **Marana** reduces the particle size to a 'Bhasma' (Ash) using herbal juices (Bhavana) and intense heat (Puta).",
      clinical: "A metal that hasn't undergone proper Shodhana/Marana will cause kidney failure or skin lesions. A properly prepared Bhasma, however, is so fine that it can be absorbed through the skin, proving its high bioavailability for chronic systemic healing.",
      marathi: {
        intro: "**शोधन** (शुद्धीकरण) आणि **मारण** (भस्मीकरण) हे खनिज प्रक्रियेचे दोन मुख्य आधारस्तंभ आहेत. हे 'विषारी धातू' आणि 'गुणकारी औषध' यातील दुवा आहेत.",
        core: "**शोधन** क्रियेने गाईचे मूत्र किंवा लिंबाचा रस वापरून धातूतील अशुद्धी दूर केली जाते. **मारण** प्रक्रियेत वनस्पतींच्या रसाची भावना देऊन आणि प्रचंड उष्णता (पुट) देऊन धातूचे भस्मात रूपांतर केले जाते.",
        clinical: "योग्य शोधन न झालेला धातू मूत्रपिंडाला (Kidney) हानी पोहोचवू शकतो. मात्र, योग्य प्रकारे तयार केलेले भस्म इतके सूक्ष्म असते की ते त्वचेतूनही शोषले जाऊ शकते."
      }
    },
    't009': {
      intro: "**Bhasma** is a unique Ayurvedic metallic or mineral preparation that has been subjected to the process of 'Marana' (calcination). This transforms toxic metals into highly bioavailable, therapeutic nano-particles.",
      core: "The preparation involves **Shodhana** (purification) and multiple 'Puta' (incineration cycles). A perfect Bhasma must pass tests like **Varitara** (floating on water), **Rekhapurnatva** (entering skin furrows), and **Nishchandratva** (loss of metallic luster).",
      clinical: "Bhasmas like Suvarna Bhasma (Gold) or Lauha Bhasma (Iron) are used for chronic immune disorders, anemia, and deep tissue rejuvenation. They act faster and at much lower doses than herbal powders (Churnas) because of their minute size.",
      marathi: {
        intro: "**भस्म** हे मारण प्रक्रियेतून तयार केलेले आयुर्वेदिक नॅनो-मेडिसिन आहे. हे विषारी धातूंना शरीरासाठी अत्यंत औषधी आणि जलद गतीने काम करणाऱ्या कणांमध्ये रूपांतरित करते.",
        core: "भस्म तयार झाल्यावर त्याच्या **वारितर** (पाण्यावर तरंगणे), **रेखापूर्णत्व** (हाताच्या रेषांमध्ये भसावे इतके सूक्ष्म) आणि **निश्चंद्रत्व** (चकाकी नसणे) या चाचण्या घेतल्या जातात.",
        clinical: "**सुवर्ण भस्म** (सोने) किंवा **लोह भस्म** (लोखंड) प्रतिकारशक्ती वाढवण्यासाठी आणि रक्ताची कमतरता (ॲनिमिया) दूर करण्यासाठी वापरले जाते. ते चूर्णांपेक्षा वेगाने आणि कमी मात्रेत काम करतात."
      }
    },
    't010': {
      intro: "**Satwa Patana** is the ancient method of 'Metallic Extraction' from mineral ores. It is a proto-metallurgical process described in medieval Ayurvedic texts.",
      core: "The mineral is mixed with 'Dravaka Gana' (melting agents like ghee, borax, and honey) and heated in a powerful furnace. The pure 'Satwa' (Metallic Essence) is extracted at the bottom. This Satwa is then used to prepare highly potent Bhasmas.",
      clinical: "Satwa-based medicines like **Makaradhwaja** (prepared with Gold Satwa) are extremely powerful rejuvenators. They carry the 'Subtle Strength' of the metal without its gross heaviness, making them ideal for treating severe neuro-muscular wasting.",
      marathi: {
        intro: "**सत्त्व पातन** ही खनिजांच्या धातूपासून शुद्ध आणि शक्तिशाली 'सत्त्व' (Essence) काढण्याची प्राचीन पद्धत आहे.",
        core: "खनिजाला घी, चिक्कण माती आणि बोराक्स (टांकणखार) यांसारख्या वितळवणाऱ्या घटकांसोबत भट्टीत तापवले जाते. यामुळे तळाशी शुद्ध सत्त्व जमा होते, ज्याचा वापर औषधात केला जातो.",
        clinical: "**मकरध्वज** सारखी अत्यंत शक्तिशाली औषधे या सत्त्वापासून तयार केली जातात. हे मज्जासंस्थेची झीज भरून काढण्यासाठी आणि रुग्णाला ताकद देण्यासाठी वापरले जातात."
      }
    },
    't011': {
      intro: "**Kupipakwa Kalpana** refers to medicines prepared in a glass bottle (Kupi) under gradually increasing heat (Valuka Yantra). These are the most shelf-stable Ayurvedic drugs.",
      core: "Formulations like **Rasa-Sindoor** are made by heating Parada and Gandhaka in a bottle for several days. We monitor the 'flame color' and use a 'copper coin test' to check completion. The resulting medicine is scraped from the neck of the bottle.",
      clinical: "These are 'Prana-dayi' (Life-giving) medicines. Due to their complex bonding, they act quickly on the nervous system. A single grain of Rasa-Sindoor can stabilize a patient in critical respiratory distress when everything else fails.",
      marathi: {
        intro: "**कूपीपक्व कल्पना** म्हणजे काचेच्या बाटलीत (कूपी) वाळूच्या भट्टीत (वालुका यंत्र) हळूहळू वाढणाऱ्या तापमानावर तयार केलेले औषध.",
        core: "**रस-सिंदूर** सारखी औषधे तयार करण्यासाठी पारा आणि गंधक बाटलीत अनेक दिवस तापवले जातात. या प्रक्रियेची पूर्णता 'तांब्याच्या नाण्याच्या चाचणीने' आणि ज्योतीच्या रंगावरून ठरवली जाते.",
        clinical: "ही औषधे अत्यंत टिकाऊ असतात. 'प्राण-दायी' औषध म्हणून ओखळले जाणारे रस-सिंदूर आणीबाणीच्या काळात श्वासोच्छवासाचा त्रास असलेल्या रुग्णाला वाचवू शकते."
      }
    },
    't012': {
      intro: "**Parpati Kalpana** are thin, flake-like medicines made by melting Kajjali (mercury-sulphur mix) and flattening it on a leaf. They are primarily used for intestinal disorders.",
      core: "The name 'Parpati' comes from its thin, papery shape. Common types include **Panchamrita Parpati** and **Swarna Parpati**. The processing involves instant cooling, which locks the mineral into a specific crystalline structure targeted for the gut.",
      clinical: "Parpati is the gold standard for **Grahani** (IBS/Malabsorption). It is given in a 'Parpati Kalpa' (gradual dose increase) with buttermilk. It rebuilds the 'Pittadhara Kala' (intestinal lining) and stops chronic diarrhea.",
      marathi: {
        intro: "**पर्पटी कल्पना** म्हणजे पाऱ्याच्या मिश्रणाला वितळवून पानावर पसरवून तयार केलेला पापडासारखा पातळ औषधी प्रकार आहे. हे प्रामुख्याने पचनमार्गासाठी वापरले जाते.",
        core: "पातळ आणि कुरकुरीत आकारामुळे याला 'पर्पटी' म्हणतात. **पंचामृत पर्पटी** आणि **सुवर्ण पर्पटी** हे याचे मुख्य प्रकार आहेत. झटपट थंड केल्यामुळे याचे औषधी गुणधर्म आतड्यांच्या आरोग्यासाठी अत्यंत पोषक होतात.",
        clinical: "IBS किंवा जुनाट जुलाबासाठी पर्पटी हे सर्वोत्तम औषध आहे. हे ताकासोबत दिले जाते, जे आतड्यांतील 'पित्तधरा कला' (Intestinal lining) सुधारण्यास मदत करते."
      }
    },
    't013': {
      intro: "**Pottali Kalpana** represents the most concentrated form of mercurial medicine. It is a compact, bullet-shaped preparation designed for high portability and rapid action.",
      core: "A mixture of minerals is tied in a cloth (Pottali) and boiled in molten Sulphur (Gandhaka). This 'Sulphur-bath' seals the minerals into a extremely hard, glass-like state. It is the pinnacle of the alchemical stable state (**Baddha Parada**).",
      clinical: "To administer, we rub the Pottali on a stone with a little honey. **Hemagarbha Pottali** is used in 'Kshina' (terminal) cases to revive the heart and lungs in emergencies, much like an 'Ayurvedic Defibrillator'.",
      marathi: {
        intro: "**पोट्टली कल्पना** ही पारद औषधींची सर्वात संक्षिप्त आणि शक्तिशाली रूप आहे. हे बुलेटच्या आकाराचे असते आणि आणीबाणीच्या काळात जलद उपचारासाठी वापरले जाते.",
        core: "खनिजांचे मिश्रण कापडात बांधून वितळलेल्या गंधकामध्ये शिजवले जाते (गंधक-पाक). यामुळे ते काचेसारखे कठीण होते. हे रसशास्त्रातील अत्यंत स्थिर रूप मानले जाते.",
        clinical: "वापरताना पोट्टली दगडावर थोड्या मधासोबत घासली जाते. **हेमगर्भ पोट्टली** हृदय आणि फुफ्फुसाचे कार्य अचानक बंद पडल्यास जीवदान देण्यास सक्षम असते."
      }
    },
    't014': {
      intro: "**Khalviya Rasayana** are medicines prepared through intense triturating (Mardana) in a mortar and pestle (Khalva). This is the most common form of Rasaushadhi.",
      core: "Continuous grinding for days with herbal decoctions (Bhavana) reduces the mineral into an ultra-low micron size. Formulas like **Tribhuvana Kirti** or **Arogyavardhini** are prepared this way, combining herbal power with mineral stability.",
      clinical: "Success in Khalviya Rasayana depends on reaching 'Mridutva' (softness). We use **Arogyavardhini** for liver disorders and **Tribhuvana Kirti** for viral fevers. These drugs are efficient because they are pre-digested through the Bhavana process.",
      marathi: {
        intro: "**खल्वीय रसायन** म्हणजे खल्व यंत्रात (आधीचे जाते/खळ) वनस्पतींच्या रसासोबत अनेक दिवस घोटून तयार केलेली औषधे. हे सर्वाधिक वापरले जाणारे औषध रूप आहे.",
        core: "औषधी काढ्याची भावना (Bhavana) देऊन खनिजांचे सूक्ष्म कण तयार केले जातात. **त्रिभुवन कीर्ती** किंवा **आरोग्यवर्धिनी** या पद्धतीतून तयार केल्या जातात, ज्यात वनस्पतींची शक्ती आणि खनिजांची स्थिरता दोन्ही असते.",
        clinical: "या औषधांचे यश त्याच्या 'मृदुतेवर' अवलंबून असते. आरोग्यवर्धिनी यकृताच्या विकारांवर आणि त्रिभुवन कीर्ती तापासाठी अत्यंत प्रभावी आहे कारण ती आधीच पचण्यास हलकी केलेली असते."
      }
    },
    't015': {
      intro: "**Bhaishajya Kalpana** is the Ayurvedic pharmacy that focuses on herbal formulation principles (Pancha-vidha Kashaya Kalpana). It is the art of extracting medicinal value from plants.",
      core: "The five foundational forms are: **Swarasa** (Juice), **Kalka** (Paste), **Kwatha** (Decoction), **Hima** (Cold infusion), and **Phanta** (Hot infusion). Each decreasing in 'Guru' (potency) and 'Agni' requirement, allowing for dosage based on the patient's digestive strength.",
      clinical: "We use Swarasa for strong patients with high Agni, and Phanta for very weak or sensitive patients. This hierarchical pharmacopoeia ensures that the body can actually absorb the medicine without causing further 'Ama'.",
      marathi: {
        intro: "**भैषज्य कल्पना** ही आयुर्वेदिक फार्मसी आहे जी वनस्पतींपासून औषध तयार करण्याच्या पाच मूलभूत पद्धतींवर आधारित आहे.",
        core: "पाच मूलभूत प्रकार: **स्वरस** (रस), **कल्क** (पेस्ट), **क्वाथ** (काढा), **हिम** (थंड हवा दिलेले पाणी) आणि **फांट** (गरम पाण्यात भिजवलेले).",
        clinical: "रुग्णाच्या पचनशक्तीनुसार औषधाचे रूप ठरवले जाते. मजबूत अग्नी असलेल्या रुग्णाला स्वरस आणि अतिशय अशक्त रुग्णाला फांट दिले जाते."
      }
    },
    't016': {
      intro: "**Swarasa, Kalka, and Kwatha** are the 'Pillars of Extraction'. They are used to treat acute conditions and to prepare secondary products like oils and syrups.",
      core: "**Swarasa** is pure juice; **Kalka** is the whole herb ground with water; **Kwatha** is the herbal water reduced to 1/4th. Swarasa is the strongest but has the shortest shelf life (2 hours). Kwatha is the most common form in current clinical practice.",
      clinical: "We prescribe **Nimba Swarasa** for skin cleansing and **Pippali Kwatha** for respiratory infections. Mastery of these basic extracts allows a practitioner to prepare fresh, potent medicine on the fly for their patients.",
      marathi: {
        intro: "**स्वरस, कल्क आणि काढा** हे औषधी अर्क काढण्याचे मुख्य स्तंभ आहेत. यांचा वापर तीव्र आजारात आणि दुय्यम उत्पादने (उदा. तेल) तयार करण्यासाठी होतो.",
        core: "**स्वरस** हा शुद्ध रस असतो; **कल्क** म्हणजे पाणी घालून घोटलेली पेस्ट; **क्वाथ** म्हणजे काढा जो १/४ उरलेला असतो. स्वरस सर्वात शक्तिशाली असतो पण तो फक्त २ तास टिकतो.",
        clinical: "त्वचेच्या शुद्धीसाठी **कडुनिंबाचा स्वरस** आणि श्वसनविकारांसाठी **पिंपळीचा काढा** वापरला जातो. वैद्याला ताजे औषध तयार करण्यासाठी या मूलभूत अर्कांचे ज्ञान असणे आवश्यक आहे."
      }
    },
    't017': {
      intro: "**Sneha Kalpana** involves the preparation of medicated oils (**Taila**) and clarified butter (**Ghrita**). They are used for deep-seated Vata and Pitta balance.",
      core: "The process involves boiling herbs (Kalka) and decoction (Kwatha) with a fat base until all moisture is evaporated (**Sneha Siddhi Lakshana**). This transfers both lipid-soluble and water-soluble herbal values into the fat medium, which can then penetrate cell membranes.",
      clinical: "We use **Brahmi Ghrita** for the brain and **Pinda Taila** for joint inflammation. Medicated fats are preferred for 'Brimhana' (nourishment) and for conditions where Pitta or Vata has 'dried' out the natural lubrication of the body.",
      marathi: {
        intro: "**स्नेह कल्पना** म्हणजे औषधी **तेले** आणि **तूप** तयार करण्याचे शास्त्र. हे प्रामुख्याने वात आणि पित्त दोषांच्या उपचारासाठी वापरले जाते.",
        core: "वनस्पतींचा काढा आणि तेलाचे मिश्रण सर्व ओलावा उडून जाईपर्यंत उकळले जाते. यामुळे वनस्पतींचे गुणधर्म तेलात उतरतात आणि ते पेशींच्या पडद्यापर्यंत खोलवर पोहोचू शकतात.",
        clinical: "मेंदूच्या आरोग्यासाठी **ब्राह्मी घृत** आणि सांधेदुखीसाठी **महानारायण तेल** वापरले जाते. ज्या आजारात शरीरातील वंगण वाढवण्याची गरज असते, तिथे स्नेह कल्पना अत्यंत पोषक ठरते."
      }
    },
    't018': {
      intro: "**Asava** and **Arishta** are fermented liquid preparations. They are self-generated alcoholic extracts that are shelf-stable for decades.",
      core: "**Arishta** starts with a decoction (boiled), while **Asava** starts with fresh juice or herbal water (unboiled). Fermentation occurs naturally using **Dhataki** flowers. This process makes the herbs exceptionally 'Suksma' (fine), allowing them to cross the blood-brain barrier easily.",
      clinical: "We use **Abhayarishta** for constipation and **Ashwagandharishta** for nerves. They are the most patient-friendly form because of their easy dosage and long shelf life. They also act as digestive stimulants due to their fermented nature.",
      marathi: {
        intro: "**आसव** आणि **अरिष्ट** ही नैसर्गिकरित्या आंबवून तयार केलेली औषधी पेये आहेत. ही अनेक दशके टिकणारी सर्वात सोयीस्कर औषधे आहेत.",
        core: "**अरिष्ट** उकळलेल्या काढ्यापासून बनवतात, तर **आसव** ताज्या रसापासून बनवतात. आंबवण्याच्या प्रक्रियेमुळे ही औषधे अत्यंत सूक्ष्म होतात आणि मेंदूपर्यंत सहज पोहोचू शकतात.",
        clinical: "मलावरोधासाठी **अभयारिष्ट** आणि मज्जासंस्थेसाठी **अश्वगंधारिष्ट** वापरले जाते. ही औषधे पचन सुधारणारी आणि डोस घेण्यास अत्यंत सोपी असतात."
      }
    },
    't019': {
      intro: "**Lehya** (Jams/Electuary) and **Guggulu-Kalpana** (Resin-based tablets) are popular solid formulations for long-term respiratory and joint care.",
      core: "**Lehyas** (like Chyavanprash) are made by reducing Kwatha with sugar and fats until a jam-like consistency is reached. **Guggulu tablets** use the scraping resin of Meda-Vata plants, which require specific 'Mardana' to become therapeutic.",
      clinical: "A Lehya is best for children and elders as it acts as a 'Nutriceutical'. **Chyavanprash** is the most famous Lehya used globally for immunity. **Vasavalehya** is specific for chronic cough and asthma.",
      marathi: {
        intro: "**लेह** (चाटण) आणि **गुग्गुळू कल्पना** हे श्वसन आणि सांध्यांच्या दीर्घकालीन आजारांसाठी लोकप्रिय औषध प्रकार आहेत.",
        core: "**लेह** (उदा. च्यवनप्राश) साखर आणि तूप मिसळून काढा आटवून तयार केला जातो. **गुग्गुळू वाट्या** सांधेदुखी कमी करण्यासाठी रसाळ डिंकासारख्या गुणधर्माचा वापर करतात.",
        clinical: "**च्यवनप्राश** हे प्रतिकारशक्तीसाठी जगभर वापरले जाणारे लेह आहे. **वासावलेह** जुनाट खोकला आणि दम्यासाठी खास औषध आहे. मुलांसाठी आणि वृद्धांसाठी लेह हा प्रकार अत्यंत आवडीचा असतो."
      }
    },
    't020': {
      intro: "**Standardization of Rasaushadhi** is the process of ensuring that every batch of mineral medicine is consistent in its chemical and biological profile.",
      core: "Traditional standardization uses the **Bhasma Parikshas** (Rekhapurna, etc.). Modern standardization includes ICP-MS (for heavy metal testing), XRD (to check crystalline structure), and Particle Size Analysis (to prove Nano-state).",
      clinical: "Without standardization, Ayurvedic minerals can be unsafe. We follow the 'Ayurvedic Pharmacopoeia of India' (API) standards. A standardized Bhasma ensures that the doctor can prescribe with 100% confidence even in pediatric cases.",
      marathi: {
        intro: "**रसौषधींचे प्रमाणीकरण** म्हणजे खनिज औषधांच्या प्रत्येक बॅचची शुद्धता आणि गुणवत्ता टिकवून ठेवण्याची प्रक्रिया.",
        core: "पारंपारिक वारितर चाचणीसोबतच आता आधुनिक प्रयोगशाळेतील चाचण्या (ICP-MS, XRD) वापरल्या जातात, जेणेकरून औषधातील धातूंचे प्रमाण आणि सूक्ष्मता सिद्ध करता येते.",
        clinical: "प्रमाणीकरणाशिवाय औषध असुरक्षित ठरू शकते. आयुर्वेदिक डॉक्युमेंटेशन आणि फार्माकोपिआ (API) चे पालन केल्यामुळे वैद्याला आणि रुग्णाला औषधाच्या सुरक्षिततेची खात्री मिळते."
      }
    },
    't021': {
      intro: "**Safety and Toxicity** of heavy metals in Rasashastra is a major topic of global discourse. Ayurveda posits that toxicity is a result of 'Ashuddha' (impure) processing.",
      core: "Raw Lead is a poison, but **Naga Bhasma** (processed lead) is a medicine. The 'Marana' process coats the metal in herbal molecules, changing its chemical identity. Research shows that Ayurvedic nanomedicines do not follow the same toxicological path as raw industrial metals.",
      clinical: "We emphasize observing 'Apunarbhava' (incapability of returning to metallic state). If a Bhasma can be turned back into a metal bead, it is unsafe. Proper education on safety prevents 'Kuhu-baidya' (fake doctors) from harming patients.",
      marathi: {
        intro: "**सुरक्षा आणि विषारीपणा** हा जागतिक वादाचा विषय आहे. आयुर्वेद म्हणतो की विषारीपणा हा अयोग्य प्रक्रियेचा परिणाम असतो.",
        core: "अशुद्ध शिसे (Lead) विष आहे, पण शोधन झालेले **नाग भस्म** औषध आहे. मारण प्रक्रियेमुळे धातूचे रासायनिक रूप बदलून ते औषधी नॅनो-पार्टिकल बनते, जे साध्या धातूंप्रमाणे विषारी नसते.",
        clinical: "आम्ही भस्माची 'अपुनर्भव' चाचणी पाहतो - म्हणजे भस्माचे पुन्हा धातूमध्ये रूपांतर होऊ नये. योग्य शिक्षणामुळे अज्ञानी उपचारांपासून रुग्णांचे रक्षण करता येते."
      }
    },
    't022': {
      intro: "The **Drugs and Cosmetics Act (1940)** and its subsequent amendments cover the legal manufacturing and licensing of Ayurvedic medicines in India.",
      core: "Schedule T outlines the **Good Manufacturing Practices (GMP)** for Ayurvedic pharmacies. It covers everything from factory layout to quality control and raw material storage. Compliance ensures the integrity of the 'Ayurvedic Brand' globally.",
      clinical: "As doctors, we only prescribe ISO/GMP certified Rasashastra products. Understanding these laws protects the practitioner from liability and ensures the patient receives medicine made in a hygienic, scientifically monitored environment.",
      marathi: {
        intro: "**ड्रग्ज अँड कॉस्मेटिक्स ॲक्ट (१९४०)** आणि त्यातील दुरुस्त्या भारतातील आयुर्वेदिक औषधांचे नियमन आणि परवाने सांभाळतात.",
        core: "शेड्यूल-T मध्ये औषध निर्मितीच्या चांगल्या पद्धती (**GMP**) सांगितल्या आहेत. फॅक्टरीची रचना, शुद्धता चाचण्या आणि कच्चा माल साठवणे यांचे नियम यामुळे आयुर्वेदिक ब्रँडची विश्वासार्हता जागतिक स्तरावर टिकते.",
        clinical: "वैद्य म्हणून आम्ही फक्त परवानाप्राप्त आणि गुणवत्तापूर्ण उत्पादने वापरतो. या कायद्यांचे ज्ञान वैद्याला कायदेशीर संरक्षण देते आणि रुग्णाला शुचिर्भूत औषध मिळते."
      }
    },
    't023': {
      intro: "**Modern QC Methods** like UV-Spectroscopy, HPLC, and HPTLC provide a modern 'fingerprint' for Ayurvedic poly-herbal and mineral drugs.",
      core: "These methods identify the presence of 'Active Markers' (like Curcumin in Turmeric or Withanolides in Ashwagandha). It ensures that the herb extracted is actually the one claimed on the label, preventing adulteration in the herbal marketplace.",
      clinical: "QC methods build trust in the global market. When a patient in Europe sees an HPTLC report of their 'Guduchi', they are more likely to comply with the treatment. It bridges the gap between ancient tradition and modern evidence-based medicine.",
      marathi: {
        intro: "**आधुनिक गुणवत्ता नियंत्रण (QC)** पद्धती जसे की UV-स्पेक्ट्रोस्कोपी आणि HPLC औषधांची अचूक ओळख पटवण्यासाठी वापरल्या जातात.",
        core: "या पद्धती औषधातील मुख्य घटकांचे (उदा. हळदीतील कर्क्युमिन) अस्तित्व आणि प्रमाण सिद्ध करतात. यामुळे औषधात बनावट वनस्पती मिसळल्या जाण्यास आळा बसतो.",
        clinical: "यूरोप किंवा अमेरिकेतील रुग्णांना जेव्हा त्यांच्या औषधाचा आधुनिक प्रयोगशाळेचा अहवाल दिसतो, तेव्हा त्यांचा आयुर्वेदावरील विश्वास वाढतो. हे प्राचीन ज्ञान आणि आधुनिक विज्ञान यातील दुवा आहे."
      }
    }
  },
  'agadtantra': {
    't001': {
      intro: "**Agadtantra** is the specialized branch of Ayurveda that deals with the study of poisons (**Visha**) and their management. It covers everything from snake bites to environmental pollutants.",
      core: "The word 'Agada' means that which removes 'Gada' (disease/poison). It is one of the eight branches (Ashtanga) of Ayurveda. It focuses on the properties of poisons, which are exactly opposite to the properties of life-force (**Ojas**).",
      clinical: "In clinical practice, Agadtantra is not just for emergencies. It is used to treat chronic 'Dushi Visha' (latent toxins) that cause modern allergies and autoimmune diseases. Understanding the 'Ten Properties' of Visha helps in choosing the right 'Antidote' (Prativisha).",
      marathi: {
        intro: "**आगादतंत्र** हे विष (Poison) आणि त्याच्या उपचारांचे शास्त्र आहे.",
        core: "हे आयुर्वेदाच्या ८ अंगांपैकी एक महत्त्वाचा भाग आहे.",
        clinical: "सापाच्या विषबाधेपासून ते आधुनिक प्रदूषणापर्यंत सर्व गोष्टींचा अभ्यास यात केला जातो।"
      }
    },
    't002': {
      intro: "**Sthavara Visha** refers to inanimate poisons derived from plants (**Vanaspati**) and minerals (**Khanija**).",
      core: "Examples include **Vatsanabha** (Aconite), **Bhang** (Cannabis), and **Gunja** (Abrus). There are 55 types of Sthavara Visha classified by their source (roots, leaves, fruits, etc.). They cause symptoms like burning, numbness, and cardiac arrest if used improperly.",
      clinical: "Interestingly, many Sthavara Vishas are used as 'potent medicines' after careful Shodhana (purification). Vatsanabha, the deadliest plant poison, becomes a life-saving drug for heart failure when processed in cow's urine for three days.",
      marathi: {
        intro: "**स्थावर विष** म्हणजे वनस्पती आणि खनिजांपासून मिळणारे विष.",
        core: "**वत्सनाभ** आणि **भांग** हे याचे मुख्य प्रकार आहेत.",
        clinical: "योग्य शुद्धी केल्यावर यांचाच उपयोग गुणकारी औषध म्हणून केला जातो।"
      }
    },
    't003': {
      intro: "**Jangama Visha** refers to animate poisons derived from animals like snakes, insects, spiders, and rats.",
      core: "They are classified based on their 'Dosha' dominance. Snake venom is the most potent Jangama Visha. The poison usually enters the body through a bite (**Dash**) or sting (**Damsha**). It spreads rapidly through the 'Rakta' (Blood) and 'Rasa' (Lymph).",
      clinical: "The site of the bite often tells the story—edema indicates Pitta/Kapha involvement, while coldness and blackening indicate Vata. We use local **Lepa** (anti-toxic pastes) and **Hridayavarana** (heart protection) as immediate measures.",
      marathi: {
        intro: "**जांगम विष** म्हणजे प्राणी, कीटक आणि सापांपासून होणारे विष.",
        core: "**सर्पविष** (Snake venom) हे यामध्ये सर्वात धोकादायक मानले जाते.",
        clinical: "प्रथम उपचारात 'हृदयावरण' (Heart protection) करणे अत्यंत महत्त्वाचे असते।"
      }
    },
    't004': {
      intro: "**Visha Vega** describes the sequential stages through which poison spreads in the body, affecting different 'Dhatus' (tissues) over time.",
      core: "There are 7 or 8 'Vegas' depending on the text. In the first Vega, it affects the Blood (Rakta), causing thirst and fainting. By the fourth Vega, it reaches the Bone/Marrow, causing severe convulsions. Identifying the Vega is critical for prognosis.",
      clinical: "In a clinical emergency, if the patient is in the 5th Vega (affecting the senses/mind), the treatment must be most aggressive. Ayurvedic 'Sanjeevani' drugs are used to 'reverse' the Vegas by flushing the toxins out through specific routes.",
      marathi: {
        intro: "**विष वेग** म्हणजे विषाचा शरीरात वाढण्याचा वेग (Stages).",
        core: "विषाच्या ७-८ पायऱ्या (Stages) असतात, ज्यामुळे शारीरिक क्षमता हळूहळू कमी होते.",
        clinical: "रुग्णाला 'विष-वेगा' प्रमाणे तातडीने उपचार देणे गरजेचे असते।"
      }
    },
    't005': {
      intro: "**Sarpavisha** (Snake Venom) management is a critical part of Agadtantra. Ayurveda classifies snakes into three main groups: Rajimanta (Krait), Darvikara (Cobra), and Mandalina (Viper).",
      core: "Cobra venom primarily affects **Vata**, causing neurological failure and respiratory arrest. Viper venom affects **Pitta**, causing tissue necrosis and massive bleeding. Krait venom affects **Kapha**, causing coldness and coma. Treatment involves a mix of internal drugs and external 'Blood-letting'.",
      clinical: "Modern management includes 'Anti-venom'. Ayurveda adds 'Dashanga Agada' and 'Bilwadi Vati' to neutralize 'Dushi-visha' (residual toxins) that anti-venom might leave behind, preventing long-term kidney or neurological issues.",
      marathi: {
        intro: "**सर्पविष** (Snake Bite) व्यवस्थापन, त्याचे आयुर्वेदिक निदान आणि चिकित्सा.",
        core: "सापाच्या प्रकारानुसार (वात, पित्त, कफ) विषाचा शरीरावर होणारा परिणाम ठरतो.",
        clinical: "अँटी-व्हेनम (Anti-venom) सोबतच आयुर्वेदिक औषधी अंतर्गत उपचारांसाठी वापरल्या जातात।"
      }
    },
    't006': {
      intro: "**Management of Insect Bites** covers the toxicology of bees, wasps, scorpions, and other common stinging creatures.",
      core: "Scorpion sting (**Vrishchika**) is the most common emergency. Its venom is 'Ushna' (Hot) and 'Teekshna', causing excruciating pain. Management involves 'Lepa' (cold pastes) and 'Dhupana' (medicated smoke) to neutralize the acid in the venom.",
      clinical: "In clinical practice, we use a paste of **Tulsi** and **Haridra** for bee stings. For severe scorpion pain, a mixture of Ghee and Rock salt applied locally provides near-instant relief by neutralizing the Vata-Pitta aggravation at the site.",
      marathi: {
        intro: "**कीटक-विष** (Insect bites) म्हणजे विंचू, मधमाशी इत्यादींचे विष.",
        core: "विंचू चावल्यावर होणाऱ्या वेदना कमी करण्यासाठी **लेप** वापरले जातात.",
        clinical: "हळद (**Haridra**) आणि **तुळशी** यांचा वापर कीटक दंशावर अत्यंत फायदेशीर ठरतो।"
      }
    },
    't007': {
      intro: "**Garavisha and Dushi Visha** cover the concepts of 'Artificial/Composite' poisoning and 'Latent' toxins that remain in the body for years.",
      core: "**Garavisha** is formed by combining non-poisonous substances (like modern preservatives or heavy metals in cosmetics). **Dushi Visha** is a poison that has lost its potency but lingers in the body's 'Kapha' sites, waiting for a trigger (like seasonal change).",
      clinical: "Most autoimmune diseases (like SLE or RA) are diagnosed as 'Dushi Visha' in Ayurveda. The treatment involves **Shodhana** (Panchakarma) to flush out these deep-rooted 'Bio-accumulated' toxins that modern medicine often labels as 'idiopathic'.",
      marathi: {
        intro: "**गरविष** (Artificial poison) आणि **दुषी-विष** (Latent/Old toxins).",
        core: "ही विषे शरीरात खूप दिवस सुप्तावस्थेत (Hidden) राहू शकतात.",
        clinical: "अनेक ॲलर्जी आणि जुनाट गुंतागुंतीच्या रोगांसाठी ही विषे कारणीभूत असू शकतात।"
      }
    },
    't008': {
      intro: "**Drug and Alcohol Addictions** cover the management of substance abuse (Madatyaya) and its toxic effects on the 'Ojas' and 'Hriday'.",
      core: "Alcohol (**Madya**) has properties exactly opposite to Ojas (Life Essence). Chronic abuse leads to 'Ojo-kshaya'. Ayurveda treats addiction by addressing the underlying 'Tridosha' imbalance and using 'Sattvavajaya' (psychotherapy).",
      clinical: "We use 'Krama-vihara' (gradual reduction) for de-addiction. Herbs like **Brahmi** and **Shankhapushpi** are used to repair the neuro-toxicity, while 'Punarnava' treats the liver damage caused by the 'Visha-like' properties of alcohol.",
      marathi: {
        intro: "**व्यसनाधीनता** (Addiction) आणि त्याचे विषारी परिणाम.",
        core: "**मदात्यय** (Alcoholism) मुळे शरीरातील 'ओज' कमी होते.",
        clinical: "**ब्राह्मी** आणि **पुनर्नवा** यांसारख्या औषधांनी व्यसनामुळे झालेले नुकसान भरून काढता येते।"
      }
    },
    't009': {
      intro: "**Environmental Toxicology (Dushi Desha)** focuses on the toxicity of the air, water, and soil, and its impact on large populations (Janapadodhvansa).",
      core: "It covers concepts of 'Poisoned Air' (**Vayu-visha**) and 'Poisoned Water'. Ayurveda suggests burning specific herbs like **Guggulu** and **Aguru** (Dhupana) to purify the surroundings and prevent the spread of toxic epidemics.",
      clinical: "In the context of modern 'Smog' and 'Water Pollution', we use 'Hridya' (Heart-protecting) and 'Rasayana' herbs to build systemic resilience. It is an ancient approach to 'One Health' and 'Environmental Medicine'.",
      marathi: {
        intro: "**पर्यावरणीय विषशास्त्र** (Environmental Toxicology) म्हणजे प्रदूषण आणि पर्यावरणातील विष.",
        core: "हवा, पाणी आणि मातीमधील विषारी घटकांचा शरीरावर खोलवर परिणाम होतो.",
        clinical: "**गुग्गुळूचा** धूप केल्यामुळे परिसराचे शुद्धीकरण होण्यास मदत होते।"
      }
    },
    't010': {
      intro: "**Forensic Medicine (Vyavahara Ayurveda)** deals with the legal aspects of medical practice and the investigation of crimes using Ayurvedic principles.",
      core: "It covers the identification of the living and the dead, biological evidence, and the 'Vaidya-vritti' (ethics of a doctor). It is the bridge between the clinic and the court of law.",
      clinical: "Identification of a person using 'Prakriti' and 'Anguli-pramana' (fingerprints/measurements) is an ancient forensic tool. Understanding 'Sadhyo-marana' (sudden death) vs slow poisoning is vital for legal testimony.",
      marathi: {
        intro: "**न्यायवैद्यक शास्त्र** (Forensic Medicine) म्हणजे वैद्यकीय कायदा आणि गुन्हे-तपास.",
        core: "कायद्याच्या दृष्टिकोनातून रुग्णाची तपासणी आणि अहवाल (Reports) बनवणे यात येते.",
        clinical: "वैद्याला न्यायालयात साक्षीदार (Witness) म्हणून काय नियम पाळावे लागतात, याचा हा अभ्यास आहे।"
      }
    },
    't011': {
      intro: "**Legal Aspects of Medical Practice** covers the rights and duties of an Ayurvedic doctor under the Indian legal system.",
      core: "It includes the 'National Commission for Indian System of Medicine (NCISM) Act', 'Professional Conduct', and 'Medical Negligence'. A doctor must maintain specific records (Case files) to be legally protected.",
      clinical: "Informed consent for Panchakarma is now a legal necessity. As practitioners, knowing about 'Malpractice' and 'Consumer Protection Acts' ensures that the doctor practice safely without fearing legal harassment.",
      marathi: {
        intro: "**वैद्यकीय सराव आणि कायदेशीर बाबी** भारतीय कायदेशीर प्रणालीनुसार आयुर्वेदिक वैद्याचे अधिकार आणि कर्तव्ये स्पष्ट करतात.",
        core: "यात 'व्यावसायिक आचारसंहिता' आणि 'वैद्यकीय निष्काळजीपणा' (Negligence) यांचा समावेश होतो. वैद्याने स्वतःच्या संरक्षणासाठी रुग्णांच्या केस फाईल्स व्यवस्थित ठेवणे आवश्यक आहे.",
        clinical: "पंचकर्मासाठी रुग्णाची लेखी संमती घेणे आता कायदेशीररीत्या सक्तीचे आहे. वैद्याला ग्राहक संरक्षण कायद्याची माहिती असणे प्रॅक्टिस सुरक्षित ठेवण्यासाठी गरजेचे आहे."
      }
    },
    't012': {
      intro: "**Asphyxia and Death Investigation** covers the Ayurvedic understanding of death due to drowning, hanging, and strangulation.",
      core: "It studies the 'Vayu' and 'Prana' blockage in these conditions. The signs on the neck (**Kantha**) and the state of the eyes (**Druk**) help in determining whether the death was suicidal or homicidal.",
      clinical: "While we use modern forensics for DNA and chemicals, the Ayurvedic 'Marma' study provides deep insight into how a strike to a specific 'vital point' leads to instantaneous death, aiding in injury-pattern analysis.",
      marathi: {
        intro: "**दम कोंडणे आणि मृत्यूची चौकशी** (Asphyxia) मध्ये गळफास, बुडणे किंवा गळा दाबल्यामुळे होणाऱ्या मृत्यूचा आयुर्वेदिक दृष्टिकोन दिला आहे.",
        core: "यामध्ये 'वायू' आणि 'प्राण' यांचे मार्ग कसे खुंटले जातात, याचा अभ्यास केला जातो. मानेवरील खुणा आणि डोळ्यांची स्थिती यावरून मृत्यूचे कारण (आत्महत्या की हत्या) शोधण्यास मदत होते.",
        clinical: "मर्मांच्या अभ्यासावरून हे समजते की एका विशिष्ट बिंदूवर झालेला आघात त्वरित मृत्यूला कसा कारणीभूत ठरतो, जे फॉरेन्सिक तपासणीत महत्त्वाचे असते."
      }
    },
    't013': {
      intro: "**Identification Paradigms in Forensics** deal with the methods of establishing a person's identity in the context of legal disputes.",
      core: "Parameters include **Varna** (Skin color), **Lanchana** (Birthmarks), **Tilaka** (Moles), and **Sara** (Tissue quality). These are the 'Ayurvedic Biometrics'. It also includes dental identification as described in Shalakya Tantra.",
      clinical: "We use 'Prakriti' analysis to identify tendencies. For example, a Pitta person might have specific 'pock-marks' or 'tendencies to burn marks' which serve as permanent identifiers in forensic reports.",
      marathi: {
        intro: "**फॉरेन्सिकमधील ओळख पटवण्याची पद्धत** कायदेशीर वादात व्यक्तीची खरी ओळख पटवण्यासाठी वापरली जाते.",
        core: "यामध्ये **वर्ण** (रंग), **लांछन** (जन्माच्या खुणा), **तिलक** (मळभ) आणि **सार** (ऊतींचा दर्जा) यांचा विचार केला जातो. ही 'आयुर्वेदिक बायोमेट्रिक्स' आहेत.",
        clinical: "आम्ही ओळखीसाठी 'प्रकृती' चा वापरही करतो. विशिष्ट खुणा किंवा चट्टे ही न्यायवैद्यक शास्त्रामध्ये महत्त्वाची वैशिष्ट्ये मानली जातात."
      }
    },
    't014': {
      intro: "**Emergency Antidotes in Agadtantra** covers the immediate 'Agadas' (medicinal combinations) used to save a life in poisoning.",
      core: "Famous Agadas include **Mritasanjivani Agada**, **Dashanga Agada**, and **Kalyanaka Ghrita**. These drugs work by improving the 'Ojas' and neutralizing the 'Teekshna' properties of the poison rapidly.",
      clinical: "In clinical practice, **Suvarna (Gold)** is considered the best antidote for 'Gara Visha' (composite toxins). We use 'Suvarna-Bhasma' to treat patients suffering from chronic heavy metal toxicity or side effects of chemotherapy.",
      marathi: {
        intro: "**आगादतंत्रातील आणीबाणीची विषनाशक औषधे** विषबाधा झालेल्या रुग्णाचे प्राण वाचवण्यासाठी त्वरित वापरली जातात.",
        core: "मृतसंजीवनी आगद, दशंग आगद आणि बिल्वादी वटी ही काही महत्त्वाची औषधे आहेत. ही औषधे शरीरातील ओज वाढवून विषाचा प्रभाव जलद गतीने नष्ट करतात.",
        clinical: "**सुवर्ण** (सोने) हे अनेक विषबाधांवर सर्वोत्तम उतारा मानले जाते. आम्ही क्रॉनिक हेवी मेटल टॉक्सिसिटी किंवा केमोथेरपीच्या दुष्परिणामांवर सुवर्ण भस्म वापरतो."
      }
    },
    't015': {
      intro: "**Occupational Hazards and Ayurveda** deals with the toxic exposure levels in different professions like weavers, smiths, and modern industry workers.",
      core: "It covers 'Upavishas' (secondary toxins) like Lead (Naga) and Arsenic (Tala) exposure in goldsmiths. Ayurveda suggests specific 'Dhumapan' (medicated smoking) and 'Nasya' to prevent these workplace toxins from settling in the lungs.",
      clinical: "For modern IT workers face 'Eyesight Toxicity' (Computer Vision Syndrome), while factory workers face 'Respiratory Toxicity'. We design 'Occupational Dinacharya'—specific daily habits—to neutralize these job-specific toxins.",
      marathi: {
        intro: "**व्यवसाय आणि आरोग्य धोके** (Occupational Hazards) विविध व्यवसायांमध्ये होणाऱ्या विषारी संपर्काचा आणि त्यावरच्या उपायांचा अभ्यास करतात.",
        core: "गलाई कामगार असोत किंवा फॅक्टरी कामगार, त्यांना शिशाच्या (Lead) धुराचा त्रास होतो. आयुर्वेद फुफ्फुसात साठलेले विष दूर करण्यासाठी 'धूमपान' आणि 'नस्य' सुचवतो.",
        clinical: "आजच्या IT कामगारांना 'स्क्रीन टॉक्सिसिटी'चा त्रास होतो. आम्ही अशा व्यक्तींच्या जीवनशैलीत बदल (दिनचर्या) करून कामाच्या ठिकाणच्या विषाचे परिणाम कमी करतो."
      }
    }
  },
  'shalya-tantra': {
    't001': {
      intro: "Acharya Sushruta is the 'Father of Surgery' (Shalya Tantra). His monumental work, the Sushruta Samhita, is the first text to describe complex surgical procedures including rhinoplasty, cataract removal, and lithotomy. Shalya Tantra is defined as the branch that removes foreign bodies and addresses surgical diseases.",
      core: "The core of Ayurvedic surgery is built on **Yantra** (Instruments), **Shastra** (Hand tools), and **Trividha Karma** (Poorva, Pradhana, Paschat). Sushruta emphasizes that a surgeon must be both theoretically sound and practically skilled, famously saying that one who knows only theory is like a 'blind person with eyes'.",
      clinical: "In modern BAMS practice, Shalya Tantra focuses on para-surgical procedures like Kshara Sutra and Agni Karma. These offer bloodless, minimally invasive alternatives for chronic anorectal conditions and neuralgia, often outperforming modern conventional methods.",
      marathi: {
        intro: "आचार्य सुश्रुत हे **शल्य तंत्राचे** (Surgery) जनक मानले जातात. त्यांचे 'सुश्रुत संहिता' हे कार्य जगातील पहिले शल्यचिकित्सा शास्त्र आहे.",
        core: "आयुर्वेदिक शस्त्रक्रिया **यंत्र**, **शास्त्र** आणि **त्रिविध कर्म** (पूर्व, प्रधान, पश्चात) यावर आधारलेली आहे. सुश्रुत म्हणतात की, केवळ पुस्तकी ज्ञान असलेला वैद्य हा डोळे असूनही आंधळ्यासारखा असतो.",
        clinical: "आधुनिक काळात **क्षार सूत्र** आणि **अग्निकर्म** यांसारख्या पद्धती मूळव्याध आणि मज्जातंतूंच्या वेदनांवर अत्यंत प्रभावी ठरतात."
      }
    },
    't005': {
      intro: "**Vrana** (Wound) management is the most extensive chapter in Shalya Tantra. Sushruta defines Vrana as 'that which destroys the tissue and leaves a scar (Vrana-vastu)'. He describes 60 diverse procedures (Shashti-upakarma) for wound healing.",
      core: "The classification includes Nija Vrana (internal/endogenous) and Agantuja Vrana (external/traumatic). The healing process is monitored through the 'Lakshnas' of a Shuddha Vrana (clean wound). Management involves cleansing (Shodhana) and healing (Ropana) using specific herbal oils like Jatyadi Taila.",
      clinical: "Clinical treatment of non-healing ulcers (Dustha Vrana) is a specialty of Ayurveda. Using techniques like **Jalaukavacharana** (Leech Therapy) to remove venous congestion and applying medicated honey or oils ensures scar-free healing in diabetic wounds.",
      marathi: {
        intro: "**व्रण** (जखम) व्यवस्थापन हा शल्य तंत्रातील सर्वात मोठा विभाग आहे. सुश्रुतांनी जखमा भरून काढण्याच्या ६० पद्धती (षष्टी-उपक्रम) सांगितल्या आहेत.",
        core: "जखमांचे निज व्रण (अंतर्गत) आणि आगंतुक व्रण (बाह्य/इजा) असे वर्गीकरण केले जाते. जखम शुद्ध झाल्यावर तिचे रोपण (भरून येणे) सुरू होते. यासाठी जात्यादी तेलाचा प्रभावी वापर केला जातो.",
        clinical: "न भरणाऱ्या जखमांवर (उदा. डायबेटिक अल्सर) **जलौकावचारण** (Leech Therapy) करून दूषित रक्त काढले जाते, ज्यामुळे नवीन पेशी लवकर तयार होतात."
      }
    },
    't007': {
      intro: "**Kshara Sutra** is a world-renowned Ayurvedic para-surgical technique for the management of Bhagandara (Fistula-in-ano). It involves a medicated thread coated with Snuhi latex, Apamarga Kshara, and Haridra powder.",
      core: "The thread acts through simultaneous cutting and healing of the fistulous tract. The **Apamarga Kshara** acts as a powerful debriding agent, while **Haridra** prevents infection. The thread is changed weekly until the entire tract is cut through and healed.",
      clinical: "It is the gold standard for fistula management because of its exceptionally low recurrence rate (<1%) compared to modern fistulectomy. The patient remains mobile and can continue daily work during the treatment, making it highly cost-effective.",
      marathi: {
        intro: "**क्षार सूत्र** ही भगंदर (Fistula) वर उपचारासाठी जगभर प्रसिद्ध असलेली आयुर्वेदिक पॅरा-सर्जिकल पद्धत आहे.",
        core: "स्नुही क्षीर, अपामार्ग क्षार आणि हळद यांच्या लेपाने तयार केलेला हा एक विशेष औषधी दोरा असतो. हा दोरा जखम कापण्याचे आणि ती भरून काढण्याचे कार्य एकाच वेळी करतो.",
        clinical: "आधुनिक शस्त्रक्रियेच्या तुलनेत क्षार सूत्रात आजार पुन्हा होण्याचे प्रमाण (Recurrence) १% पेक्षा कमी आहे. रुग्ण उपचार सुरू असताना आपली दैनंदिन कामे करू शकतो।"
      }
    },
    't008': {
      intro: "**Agni Karma** (Thermal Cautery) is the intentional application of heat to a specific part of the body for therapeutic purposes. It is considered superior to all other surgical and para-surgical methods because the disease treated by Agni Karma never recurs.",
      core: "Different tools are used depending on the depth: Suvarna Shalaka (Gold rod), Panchadhatu Shalaka, or even Pippali. It is primarily used for Vata and Kapha disorders where coldness and stiffness are dominant. It works by improving local blood circulation and metabolic activity.",
      clinical: "Common clinical applications include Calcaneal Spur (Vatkantaka), Sciatica (Gridhrasi), and various joint pains. It provides instant pain relief without any side effects of oral pain-killers. The procedure is quick, effective, and minimally invasive.",
      marathi: {
        intro: "**अग्निकर्म** म्हणजे शरीराच्या विशिष्ट भागाला उष्णता देऊन केले जाणारे उपचार. हे शस्त्रक्रियेपेक्षाही श्रेष्ठ मानले जाते कारण यामुळे आजार पुन्हा उद्भवत नाही.",
        core: "सुवर्ण शलाका किंवा पंचधातू शलाका वापरून हे केले जाते. हे प्रामुख्याने वात आणि कफ रोगांवर वापरले जाते, जिथे वेदना आणि जखडणे जास्त असते.",
        clinical: "**सायटिका** किंवा टाचदुखीमध्ये अग्निकर्मामुळे तत्काळ आराम मिळतो. गोळ्या न घेता वेदना कमी करण्याचा हा सर्वात जलद मार्ग आहे."
      }
    },
    't002': {
      intro: "**Surgical Instruments (Yantra and Shastra)** are the precision tools developed by Acharya Sushruta. He describes 101 types of Yantras (blunt instruments) and 20 types of Shastras (sharp instruments).",
      core: "Yantras are categorized into six groups like Swastika (hand-held) and Sandamsha (forceps). Shastras are used for eight operations: Chhedana (excision), Bhedana (incision), etc. The 'Lion's Mouth' (Simha-mukha) Yantra is the ancestor of the modern forceps.",
      clinical: "In modern practice, we maintain classical Shastras for specific procedures like Agni Karma. Correct sterilization and 'Dhara' (sharpening) are vital. Sushruta mentions that the doctor's hand is the 'prime instrument' (Pradhana Yantra).",
      marathi: {
        intro: "**यंत्र** आणि **शस्त्र** ही आचार्य सुश्रुतांनी विकसित केलेली शस्त्रक्रियेची अचूक उपकरणे आहेत. त्यांनी १०१ यंत्रे आणि २० शस्त्रांचे वर्णन केले आहे.",
        core: "यंत्रांचे सहा गटांत वर्गीकरण केले आहे (उदा. स्वस्तिक, संदंश). 'सिंह-मुख' यंत्र हे आधुनिक फोरसेप्सचे प्राचीन रूप आहे. शस्त्रांचा वापर छेदनादि आठ कर्मांसाठी केला जातो.",
        clinical: "शस्त्रक्रियेच्या यशस्वीतेसाठी शस्त्रांची शुद्धता आणि त्याची धार (धारा) महत्त्वाची असते. सुश्रुतांच्या मते, वैद्याचा 'हात' हेच सर्वात महत्त्वाचे यंत्र आहे."
      }
    },
    't003': {
      intro: "**Trividha Karma** encompasses the Pre-operative (Poorva), Intra-operative (Pradhana), and Post-operative (Paschat) management of a surgical patient.",
      core: "Poorva Karma involves collecting materials and preparing the patient. Pradhana Karma is the actual surgery. Paschat Karma includes dressing, specific diet, and monitoring for complications (Vyapat). This ensures a holistic recovery.",
      clinical: "We emphasize Paschat Karma for preventing infection. Using 'Dhupana' (medicated smoke) and 'Raksha-Vidhi' (protective measures) ensures that the wound heals without keloids or chronic inflammation.",
      marathi: {
        intro: "**त्रिविध कर्म** म्हणजे शस्त्रक्रिया करण्यापूर्वीची (पूर्व), प्रत्यक्ष शस्त्रक्रिया (प्रधान) आणि त्यानंतरची (पश्चात) व्यवस्थापनाची प्रक्रिया.",
        core: "पूर्व कर्मात साधने गोळा करणे आणि रुग्णाला तयार करणे समाविष्ट आहे. पश्चात कर्मात जखमेची पट्टी बांधणे, उपचारात्मक आहार आणि गुंतागुंत टाळण्यासाठी देखरेख करणे येते.",
        clinical: "संसर्ग टाळण्यासाठी आम्ही पश्चात कर्मावर भर देतो. 'धूपन' आणि 'रक्षा-विधी' मुळे जखम लवकर भरून येते आणि वण (Scar) राहत नाही."
      }
    },
    't004': {
      intro: "**Ashtavidha Shastra Karma** refers to the eight types of basic surgical procedures described by Sushruta, covering almost every surgical necessity known to man.",
      core: "The procedures are: **Chhedana** (Excision), **Bhedana** (Incision), **Lekhana** (Scraping), **Vyadhana** (Puncturing), **Eshana** (Probing), **Aharana** (Extraction), **Visravana** (Drainage), and **Seevana** (Suturing).",
      clinical: "Identifying which karma to use for which pathology is the hallmark of a surgeon. For a localized abscess, we use 'Bhedana' and 'Visravana'. For an embedded foreign body, we use 'Aharana'. Mastery of these eight actions is mandatory for a BAMS surgeon.",
      marathi: {
        intro: "**अष्टविध शस्त्र कर्म** म्हणजे सुश्रुतांनी सांगितलेले शस्त्रक्रियेचे आठ मूलभूत प्रकार, जे सर्व प्रकारच्या शस्त्रक्रिया गरजा पूर्ण करतात.",
        core: "यामध्ये **छेदन** (Excision), **भेदन** (Incision), **लेखन** (Scraping), **व्यधन** (Puncturing), **एषण** (Probing), **आहरण** (Extraction), **विस्रवण** (Drainage) आणि **सीवन** (Suturing) यांचा समावेश होतो.",
        clinical: "आधुनिक वैद्यकातही या आठ कर्मांचा पाया वापरला जातो. गळू असेल तर 'भेदन' आणि 'विस्रवण' केले जाते, तर एखादा बाहेरचा पदार्थ काढण्यासाठी 'आहरण' वापरले जाते."
      }
    },
    't006': {
      intro: "**Bandhana** (Ayurvedic Bandaging Techniques) is the science of stabilizing wounds and fractures using specific materials and patterns.",
      core: "There are 14 types of bandages like Kosa (for joints) and Chinna (for broad areas). Materials used include silk, linen, and bark. Correct tension is vital; neither too tight, which cuts circulation, nor too loose, which fails to support.",
      clinical: "For orthopedic cases (Fractures), we use 'Alepa' followed by 'Kusha' (splints). A well-applied bandage reduces 'Shopha' (swelling) and accelerates the 'Ropana' (healing) phase of the wound.",
      marathi: {
        intro: "**बंधन** (पट्टी बांधणे) हे जखमा आणि फ्रॅक्चरना आधार देण्यासाठी वापरले जाणारे आयुर्वेदिक शास्त्र आहे.",
        core: "परिस्थितीनुसार १४ प्रकारच्या पट्ट्या (उदा. कोश, चीन) सांगितल्या आहेत. पट्टी बांधताना ती जास्त घट्ट किंवा जास्त सैल नसावी, जेणेकरून रक्ताभिसरण आणि आधार दोन्ही योग्य राहतील.",
        clinical: "हाड मोडले असल्यास आम्ही औषधी लेप आणि 'कुश' (Splints) वापरून आधार देतो. योग्य पट्टीमुळे सूज कमी होते आणि वेदना लवकर थांबतात।"
      }
    },
    't009': {
      intro: "**Raktamokshana in Shalya Surgery** involves the systematic removal of morbid blood to treat surgical inflammation and vascular congestion.",
      core: "Techniques include **Siravyadha** (venous puncture) and **Prachana** (scarification). It is used as a 'Para-surgical' tool to reduce 'Daha' (burning) and 'Paka' (suppuration) in an area before or after surgery.",
      clinical: "In surgical OPDs, we use Leech therapy (**Jalauka**) for stagnant ulcers and post-operative bruises. It clears the toxins from the micro-circulation, ensuring that the fresh blood can reach the healing tissue effectively.",
      marathi: {
        intro: "**रक्तमोक्षण** म्हणजे शल्य प्रक्रियेमध्ये शरीरातील दूषित रक्त बाहेर काढून जळजळ आणि सूज कमी करण्याची पद्धत.",
        core: "**सिराव्यध** (वाहिनीला टोचणे) आणि **प्रच्छान** (ओरखडे काढणे) ही याची मुख्य तंत्रे आहेत. शस्त्रक्रियेपूर्वी किंवा नंतर होणारी जळजळ कमी करण्यासाठी याचा वापर होतो.",
        clinical: "आम्ही प्रामुख्याने 'जलौका' (Leech) वापरतो. हे सूक्ष्म रक्तवाहिन्यांमधील अडथळे दूर करते, ज्यामुळे ताजे रक्त जखमेपर्यंत पोहोचते आणि जखम लवकर बरी होते."
      }
    },
    't010': {
      intro: "**Fractures and Dislocations (Bhagna)** focuses on the management of skeletal injuries through alignment, stabilization, and herbal nourishment.",
      core: "Sushruta classifies fractures into **Sandhi-mukta** (dislocations) and **Kanda-bhagna** (bone fractures). Management involves four steps: **Anchana** (Traction), **Peedana** (Manipulation), **Sankshepa** (Reduction), and **Bandhana** (Fixation).",
      clinical: "We use medicated oils like **Gandha Taila** to nourish the 'Asthi' (Bone) Dhatu. Plaster of Paris from modern medicine is combined with our 'Ashvagandha' and 'Arjuna' supplements for rapid bone mineral density (BMD) improvement.",
      marathi: {
        intro: "**भग्न** (Fractures) म्हणजे हाडे मोडणे आणि सांधे निखळणे (Dislocations) यांचे व्यवस्थापन.",
        core: "हाड जोडण्याचे चार टप्पे सुश्रुतांनी सांगितले आहेत: **आंचन** (ओढणे), **पीडन** (दाबणे), **संक्षेप** (जागेवर आणणे) आणि **बंधन** (स्थिर करणे).",
        clinical: "हाडे लवकर जोडण्यासाठी आम्ही **गंध तैल** आणि **लाक्षादी गुग्गुळ** वापरतो. अश्वगंधा आणि अर्जुन या वनस्पती हाडांची ताकद वाढवण्यासाठी सर्वोत्तम आहेत."
      }
    },
    't011': {
      intro: "**Management of Head Injuries** in Ayurveda covers the understanding of 'Shiras' as the most vital 'Marma' (vital point).",
      core: "Injuries to the head can lead to Vata-imbalance affecting the entire body. Management focuses on 'Nasya' (nasal drops) and 'Dharas' to stabilize the brain tissues. Specific points on the scalp are protected to prevent intracranial pressure.",
      clinical: "For trauma cases, we use **Brahmi** and **Guduchi** for their neuro-protective effects. We coordinate with modern neuro-surgeons to provide 'Integrated' care that focuses on rapid neural recovery post-stabilization.",
      marathi: {
        intro: "डोक्याच्या जखमांची (**Head injuries**) काळजी आणि व्यवस्थापन.",
        core: "डोकं हे 'उत्तमांग' (सर्वात महत्त्वाचे) असल्याने त्याची काळजी घेणे गरजेचे आहे.",
        clinical: "मज्जासंस्थेचे कार्य टिकवून ठेवण्यासाठी **नस्य** आणि **शिरोधारा** वापरले जातात।"
      }
    },
    't012': {
      intro: "**Abdominal Surgery** in the classics describes procedures for intestinal obstruction (Baddha Gudodara) and perforations (Chidrodhara).",
      core: "Sushruta describes the use of **Large Ants** as biological sutures to close intestinal perforations. It also describes 'Udar-ashraya' procedures for stone removal and liquid drainage (Ascites).",
      clinical: "While major abdominal surgeries are now done in modern theaters, the Ayurvedic 'Paschat-karma' (dietary protocols) for such patients prevents 'Adhesions' and chronic constipation post-surgery. We focus on restoring the 'Agni' of the gut.",
      marathi: {
        intro: "**पोटाच्या शस्त्रक्रिया** (Abdominal Surgery) प्राचीन ग्रंथांमध्ये आतड्यांतील अडथळे आणि जखमा भरून काढण्यासाठी वर्णन केल्या आहेत.",
        core: "सुश्रुतांनी आतड्यांच्या जखमा शिवण्यासाठी **मोठ्या मुंग्यांचा** वापर करण्याचे धाडसी तंत्र सांगितले आहे. याव्यतिरिक्त मूत्रखडा काढण्यासाठी आणि पोटातील पाणी (Ascites) काढण्यासाठी शस्त्रक्रिया वर्णन केल्या आहेत.",
        clinical: "ऑपरेशननंतरचे पचन सुधारण्यासाठी आयुर्वेदिक पथ्य आणि आहार अत्यंत महत्त्वाचे असतात, जेणेकरून पोट दुबले राहण्याचा किंवा बद्धकोष्ठतेचा त्रास होणार नाही."
      }
    },
    't013': {
      intro: "**Urinary Calculi (Ashmari)** management covers the medical and surgical removal of kidney and bladder stones.",
      core: "Pathology involves Vata-Kapha creating a 'stone-like' structure in the 'Basti' (Bladder). Sushruta describes **Laparotomy** for stone extraction when medical management using 'Kshara' (alkalines) fails to dissolve the stone.",
      clinical: "We use **Varun** and **Gokshura** as 'Ashmari-ghna' drugs. For stones smaller than 5mm, these herbs effectively flush them out. In larger cases, we prepare the patient for 'Lithotripsy' while providing 'Mutravaha-shodhana' support.",
      marathi: {
        intro: "**अश्मरी** (मुतखडा) व्यवस्थापन म्हणजे मूत्रपिंड आणि मूत्राशयातील खडे औषध किंवा शस्त्रक्रियेने काढण्याचे शास्त्र.",
        core: "वात आणि कफ दोषांमुळे 'बस्ती' (Bladder) मध्ये खडा तयार होतो. औषधांनी खडा विरघळला नाही तर सुश्रुतांनी तो शस्त्रक्रियेने काढण्याची पद्धत सांगितली आहे.",
        clinical: "आम्ही **वरुण** आणि **गोक्षुर** यांसारखी अश्मरी-घ्न औषधे वापरतो. ५ मिमी पेक्षा लहान खडे औषधांनी सहज बाहेर पडतात."
      }
    },
    't014': {
      intro: "**Anorectal Disorders** (Arsha/Bhagandara) is the most successful clinical area of Shalya Tantra in the current era.",
      core: "Focuses on Hemorrhoids (Arsha), Fistula (Bhagandara), and Fissure (Parikartika). The primary tools are **Kshara Karma** (chemical cautery) and **Kshara Sutra** (medicated thread).",
      clinical: "Our clinical standard is the weekly change of Kshara Sutra in Fistula cases. It has the world's lowest recurrence rate. For piles, internal 'Bheshaja' (Sooran/Abhayarishta) is combined with local 'Kshara' ligation for a complete cure.",
      marathi: {
        intro: "**गुद-रोग** (Anorectal Disorders) म्हणजे मूळव्याध (Arsha), भगंदर (Fistula) आणि फिशर यांचे आधुनिक काळातील यशस्वी व्यवस्थापन.",
        core: "यामध्ये **क्षार कर्म** आणि **क्षार सूत्र** ही मुख्य साधने आहेत. मूळव्याधीमध्ये 'सूरण' आणि 'अभयारिष्ट' सारखी औषधे अंतर्गत रित्या दिली जातात.",
        clinical: "आमच्या क्लिनिकमध्ये भगदरासाठी क्षार सूत्राचा वापर केला जातो, ज्याचा यशाचा दर सर्वाधिक आहे आणि शस्त्रक्रियेनंतर पुन्हा त्रास होण्याची शक्यता नगण्य आहे."
      }
    },
    't015': {
      intro: "**Blood Transfusion and Fluid Balance** in Ayurveda are described through the concepts of 'Sira-vyadha' and managing 'Rakta' as a vital tissue.",
      core: "Sushruta notes that 'Rakta' is the fourth Dosha. Depletion of blood leads to loss of 'Ojas'. Fluid replacement is managed through specific decoctions and milk-based preparations to restore volume and vitality.",
      clinical: "Before major surgery, we check for 'Rakta-sara' (Blood quality). Post-operatively, we use herbs like **Giloy** and **Sariva** to purify and rebuild the blood cells, ensuring the patient's 'Bala' (strength) is restored.",
      marathi: {
        intro: "**रक्तदान आणि शरीरातील द्राव्य समतोल** (Fluid Balance) यामध्ये रक्ताला शरीराचा चौथा दोष आणि जीवनाचा आधार मानले आहे.",
        core: "रक्त कमी झाल्यास ओज कमी होते. याची कमतरता भरून काढण्यासाठी विशिष्ट औषधी काढ्यांचा आणि दुधाचा वापर केला जातो.",
        clinical: "शस्त्रक्रियेनंतर ताकद मिळवण्यासाठी आम्ही **गिलोय** आणि **सारिवा** वापरतो, जे रक्ताचे शुद्धीकरण करून नवीन पेशी तयार करण्यास मदत करतात।"
      }
    },
    't016': {
      intro: "**Pain Management and Anesthesia** in Shalya focuses on 'Madya' (alcohol) and 'Dhumapana' (medicated smoke) to induce sleep and numbness.",
      core: "While modern General Anesthesia exists, Ayurveda uses localized **Agni Karma** to block nerve pain (Neuralgia). **Vata-hara** oils are used as 'Poorva Karma' to reduce the patient's sensitivity to pain.",
      clinical: "For acute pain like Sciatcia, we use **Agni Karma** on specific 'Basti' points. This provides instant, drug-free pain relief. We also use **Yoga** and **Pranayama** as 'Manas' (psychological) anesthesia to reduce surgical anxiety.",
      marathi: {
        intro: "**वेदना व्यवस्थापन आणि भूल** (Anesthesia) यामध्ये प्राचीन काळी 'मद्य' (Alcohol) आणि औषधी धुराचा वापर रुग्णाला भूल देण्यासाठी केला जात असे.",
        core: "स्थानिक वेदना कमी करण्यासाठी **अग्निकर्म** सर्वोत्तम आहे. वात-शामक तेले शस्त्रक्रियेपूर्वी वापरल्यास रुग्णाची वेदना सहन करण्याची शक्ती वाढते.",
        clinical: "**सायटिका** सारख्या तीव्र वेदनांमध्ये 'मर्म' बिंदूंवर अग्निकर्म केल्यास तत्काळ आराम मिळतो. योगासन आणि प्राणायामाचा वापर मानसिक ताण कमी करण्यासाठी केला जातो."
      }
    },
    't017': {
      intro: "**Ophthalmic Surgery** (Shalakya Intro) covers the various 'Shastra-kritas' for eye diseases like cataracts and ptosis.",
      core: "Sushruta's 'Couching' technique for cataracts (**Linga-nasha**) is the ancestor of modern intraocular lens surgery. It also covers the management of 'Pakshmapata' (eyelid disorders) through surgical excision.",
      clinical: "While we refer complex surgeries to modern ophthalmologists, we provide 'Kriyakalpa' (Ayurvedic Eye Therapies) like **Tarpana** to strengthen the eyes pre and post-surgery, improving the visual outcome.",
      marathi: {
        intro: "**नेत्र-शस्त्रक्रिया** (Shalakya Intro) मध्ये मोतीबिंदू आणि डोळ्यांच्या इतर शस्त्रक्रियांचे वर्णन येते.",
        core: "सुश्रुतांनी मोतिबिंदू काढण्याची 'कौचिंग' (Couching) पद्धत सांगितली आहे, जी आधुनिक आयओएल (IOL) शस्त्रक्रियेची पाया मानली जाते.",
        clinical: "शस्त्रक्रियेपूर्वी आणि नंतर डोळ्यांची ताकद वाढवण्यासाठी आम्ही **नेत्र तर्पण** करतो, ज्यामुळे दृष्टी अधिक स्पष्ट होते."
      }
    },
    't018': {
      intro: "**Plastic Surgery and Reconstruction** is the reason Sushruta is globally honored. He pioneered **Karna-sandhana** (Ear repair) and **Nasa-sandhana** (Rhinoplasty).",
      core: "The technique involved taking a 'pedicled flap' of skin from the cheek or forehead to reconstruct a severed nose. This 'Indian Flap' technique remained unchanged for 2,000 years and is still the basis of plastic surgery.",
      clinical: "In clinical Shalya training, students learn the geometry of skin grafts. While modern plastic surgery adds microsurgery, the 'Principle of Symmetry' and 'Donor-Site' management remain fundamentally Ayurvedic.",
      marathi: {
        intro: "**प्लॅस्टिक सर्जरी** (Plastic Surgery) आणि पुनर्रचना यासाठी आचार्य सुश्रुतांना जगभरात सन्मान दिला जातो. त्यांनी नाक आणि कान जोडण्याचे तंत्र विकसित केले.",
        core: "नाक कापले गेले असल्यास गालावरची किंवा कपाळावरची त्वचा घेऊन नाक पुन्हा तयार करण्याची पद्धत सुश्रुतांनी सांगितली, जी आजही 'इंडियन फ्लॅप' म्हणून ओळखली जाते.",
        clinical: "आजची आधुनिक प्लॅस्टिक सर्जरी याच प्राचीन सिद्धांतावर आधारित आहे. जखम कशी शिवली पाहिजे आणि नैसर्गिक रूप कसे दिले पाहिजे, याचे सखोल ज्ञान सुश्रुत संहितेत मिळते."
      }
    },
    't019': {
      intro: "**Modern Surgical Correlations** bring together ancient techniques and modern technologies like Laparoscopy, Lasers, and Robotis.",
      core: "Correlating 'Yantras' with modern Forceps and 'Kshara' with laser ablation. This module helps students translate classical terms into modern surgical vocabulary.",
      clinical: "An 'Integrated Surgeon' uses **Kshara-Sutra** for Fistula (as it is better than modern surgery) but uses **Laparoscopy** for Gallbladder removal (as it is better than open surgery). This 'Best of Both' is our objective.",
      marathi: {
        intro: "**आधुनिक शस्त्रक्रिया समन्वय** प्राचीन तंत्रे आणि आधुनिक तंत्रज्ञान (Laparoscopy, Lasers) यांचा योग्य मेळ घालण्यास शिकवते.",
        core: "जुन्या काळातील 'यंत्रांची' तुलना आधुनिक फोरसेप्सशी करून दोन्ही शास्त्रांमधील साम्य समजले जाते. यामुळे विद्यार्थ्यांचा आत्मविश्वास वाढतो.",
        clinical: "एक प्रगत वैद्य **भगदरासाठी क्षार सूत्र** वापरतो आणि **पित्ताशयातील खड्यांसाठी लॅपरोस्कोपी** सुचवतो. दोन्ही शास्त्रांमधील सर्वोत्तम गोष्टी निवडणे हाच आमचा उद्देश आहे."
      }
    },
    't020': {
      intro: "**Emergency Trauma Care (Sadhyo-Vrana)** covers the 'Golden Hour' management of accidents and bleeding.",
      core: "Protocol includes **Sandhaniya** (healing) drugs and rapid **Bandhana** (fixation). Managing shock and stabilizing the 'Vital Breath' (Prana) are the priorities.",
      clinical: "In any trauma center, the Ayurvedic doctor uses **Sanjeevani Churna** and **Lakshadi Guggulu** to prevent fat embolism and accelerate tissue union, supplementing modern orthopedic stabilisation.",
      marathi: {
        intro: "**आणीबाणीचे जखम व्यवस्थापन** (Sadhyo-Vrana) अपघातात होणारी जखम आणि रक्तस्राव तातडीने थांबवण्याचे मार्गदर्शन करते.",
        core: "**संधानीय** औषधे (जखम जोडणारी) आणि झटपट पट्टी बांधणे यामध्ये प्राथमिक असते. रुग्णाला धक्क्यातून (Shock) बाहेर काढणे आणि त्याचा श्वास स्थिर करणे हे पहिले कर्तव्य आहे.",
        clinical: "अपघाताच्या ठिकाणी तातडीने **लाक्षादी गुग्गुळ** आणि **संजीवनी चूर्ण** दिल्यास अंतर्गत जखमा लवकर भरून येण्यास मदत होते."
      }
    }
  },
  'shalakya-tantra': {
    't001': {
      intro: "**Shalakya Tantra** is the branch of Ayurveda that deals with the diseases of the supraclavicular region (Urdhwajatru-gata), including the Eyes, Ears, Nose, Throat, and Head.",
      core: "The name 'Shalakya' comes from the 'Shalaka' (probe) used in surgical and para-surgical treatments of these sensitive organs. It was pioneered by **Maharshi Nimi**. The organs here are the seats of the 'Indriyas' (Senses), and the treatment focus is on protecting the nervous coordination and 'Sadhaka Pitta'.",
      clinical: "In clinical practice, Shalakya disorders are primarily managed through 'Kriyakalpas' (specialized local applications) and 'Nasya'. Since the head is the 'root' of the human body (**Urdhvamula**), a doctor must address both systemic Vata and local Kapha-Pitta imbalances to treat eye or ENT issues.",
      marathi: {
        intro: "**शालाक्य तंत्र** म्हणजे गळ्याच्या वरील (ऊर्ध्वजत्रू-गत) अवयवांचे आजार, ज्यात डोळे, कान, नाक, घसा आणि डोके यांचा समावेश होतो.",
        core: "या शाखेला 'शालाक्य' नाव पडले कारण यामध्ये उपचारांसाठी 'शलाका' (Probes) वापरली जाते. याचे प्रणेते **महर्षी निमी** आहेत. हे अवयव आपल्या ज्ञानेंद्रियांचे स्थान आहेत.",
        clinical: "प्रॅक्टिसमध्ये शालाक्य आजारांसाठी 'क्रियाकल्प' आणि 'नस्य' हे मुख्य उपचार आहेत. डोके हे शरीराचे मूळ आहे (Urdhvamula), म्हणून येथील उपचारांचा परिणाम संपूर्ण शरीरावर होतो."
      }
    },
    't002': {
      intro: "**Eye Anatomy (Netra Rachana)** describes the five circles (Mandala), six junctions (Sandhi), and five layers (Patala) of the eye, showing an advanced understanding of ocular structure.",
      core: "The Mandalas include the **Pakshma** (eyelashes), **Vartma** (eyelids), **Shweta** (sclera), **Krishna** (cornea/iris), and **Drishti** (pupil). The Patalas are the different tissue depths where pathological doshas settle to cause vision loss.",
      clinical: "Understanding the Patalas is critical for prognosis. If a disease is in the 1st or 2nd Patala, it is treatable. If it reaches the 4th Patala, complete blindness occurs. We correlate 'Krishna Mandala' with the cornea and 'Drishti Mandala' with the lens and retina for diagnostic purposes.",
      marathi: {
        intro: "**नेत्र रचना** (Eye Anatomy) मध्ये डोळ्यांचे पाच मंडळ, सहा संधी आणि पाच पटल यांचे वर्णन केले आहे, जे प्राचीन काळातील प्रगत शारीर विज्ञानाचा पुरावा आहे.",
        core: "मंडळांमध्ये **पक्ष्म** (पापण्या), **वर्त्म**, **श्वेत** (पांढरा भाग), **कृष्ण** (काळी बाहुली) आणि **दृष्टी** यांचा समावेश होतो. पटल हे डोळ्यांचे वेगवेगळे पापुद्रे आहेत.",
        clinical: "डोळ्यांची दृष्टी कितपत बाधीत झाली आहे, हे 'पटल' अभ्यासावरून समजते. जर दोष तिसऱ्या किंवा चौथ्या पटलात पोहोचले तर अंधत्व येऊ शकते."
      }
    },
    't003': {
      intro: "**Eye Physiology (Netra Kriya)** explains how the five Mahabhutas and three Doshas coordinate to facilitate vision (Drishti).",
      core: "The eye is primarily a site of **Tejas** (Light/Fire). **Alocaka Pitta** facilitates vision, **Tarpaka Kapha** provides lubrication, and **Prana Vayu** controls movement. Vision is a result of the 'Indriya' contacting the 'Artha' (Object) through the mind (**Manas**).",
      clinical: "Clinically, dryness of eyes is treated by nourishing Tarpaka Kapha using **Netra Tarpana** (medicated ghee bath). Redness and burning are signs of Alocaka Pitta aggravation, managed by 'Seka' (pouring) of cooling herbal decoctions over the closed lids.",
      marathi: {
        intro: "**नेत्र क्रिया** (Eye Physiology) डोळ्यांमधील पंचमहाभूते आणि त्रिदोष दृष्टी कशी निर्माण करतात, हे स्पष्ट करते.",
        core: "डोळा हे प्रामुख्याने **तेज** (Light) तत्त्वाचे स्थान आहे. **आलोचक पित्त** पाहण्यास मदत करते, **तर्पक कफ** ओलावा देतो आणि **प्राण वायू** हालचाल नियंत्रित करतो.",
        clinical: "डोळे कोरडे पडणे (Dry eyes) म्हणजे तर्पक कफ कमी होणे. यासाठी आम्ही **नेत्र तर्पण** (तूप घालणे) करतो. डोळ्यांची आग होणे हे पित्त वाढल्याचे लक्षण आहे।"
      }
    },
    't004': {
      intro: "**Classification of Eye Diseases (Netra Roga)** follows a systematic map of 76 diseases categorized by their location—Vartma (Eyelids), Sandhi (Junctions), Shweta (Sclera), Krishna (Cornea), and Sarvagata (Generalized).",
      core: "Disease logic is based on **Samprapti** (pathogenesis) starting from the feet (foot-massage affects eyes) and reaching the head through the 'Sirah'. It also classifies diseases based on their surgical necessity: Chhedya (excisable), Lekhya (scrappable), or Bhedya (incisable).",
      clinical: "A clinical diagnosis starts with identifying the 'Mandala' affected. For instance, **Abhishyanda** (Conjunctivitis) is a 'Sarvagata' disease affecting the whole eye. This classification helps a Vaidya decide whether to use 'Kriyakalpa' or 'Shastra-karma' (surgery).",
      marathi: {
        intro: "**नेत्र रोगांचे वर्गीकरण** डोळ्यांच्या ७६ आजारांचा नकाशा असून ते त्यांच्या स्थानानुसार विभागले आहेत - वर्त्म, संधी, श्वेत, कृष्ण आणि सर्वगत.",
        core: "आजाराचे कारण पायांच्या मसाजपासून डोक्यापर्यंत पोहोचणाऱ्या शिरांशी संबंधित असते. काही आजार शस्त्रक्रियेने बरे होणारे (छेद्य, भेद्य) असतात, तर काही औषधांनी.",
        clinical: "निदान करताना नेमके कोणते 'मंडळ' बाधीत झाले आहे, हे पाहिले जाते. उदाहरणार्थ, **अभिष्यंद** हा सर्वगत रोग आहे जो संपूर्ण डोळ्यावर परिणाम करतो."
      }
    },
    't005': {
      intro: "**Abhishyanda** (Conjunctivitis) is the root cause of almost all other eye diseases in Ayurveda. It involves excessive secretion (discharge) from the eyes.",
      core: "It is classified into four types: Vataj, Pittaj, Kaphaj, and Sannipataj. Pathology involves the congestion of 'Srotas' (channels) in the eye by accumulated Doshas. If not treated early, it progresses into **Adhimantha** (Glaucoma), which can destroy vision.",
      clinical: "Management focuses on **Langhana** (fasting) and **Aschyotana** (eye drops). We use **Triphala Kwatha** for washing and **Rose water** for cooling. Patients are advised to avoid 'Vidahi' (acidic) food and harsh sunlight during the acute phase.",
      marathi: {
        intro: "**अभिष्यंद** (Conjunctivitis) हा आयुर्वेदानुसार डोळ्यांच्या बहुतांश आजारांचे मूळ आहे. यामध्ये डोळ्यातून पाणी किंवा चिकट द्राव्य येणे (Shedding) मुख्य असते.",
        core: "याचे वातज, पित्तज, कफज असे चार प्रकार आहेत. वेळेवर उपचार न केल्यास याचे रूपांतर **अधिमंथ** (Glaucoma) मध्ये होऊ शकते, ज्यामुळे दृष्टी जाऊ शकते.",
        clinical: "उपचारांमध्ये **लंगण** (उपवास) आणि **आश्च्योतन** (थेंब टाकणे) महत्त्वाचे आहे. **त्रिफळा काढा** डोळे धुण्यासाठी आणि **गुलाब पाणी** थंडाव्यासाठी वापरले जाते."
      }
    },
    't006': {
      intro: "**Linga-nasha** is the Ayurvedic term for Cataract, where a membrane or opacity develops in the 'Drishti Mandala', obstructing light similar to a fog.",
      core: "It is considered a 'Kaphaja' dominant disorder affecting the deeper Patalas. Initial stages are called **Timira** (Blurring). When the opacity becomes total and fixed, it is called Linga-nasha. This is where Sushruta's 'Couching' (Shastra-karma) was traditionally applied.",
      clinical: "We manage early 'Timira' using **Saptamrit Lauha** and **Netra Tarpana** to slow down the opacification. For mature cataracts, modern IOL (Intraocular Lens) surgery is now the gold standard, but Ayurvedic post-op care ensures faster recovery of retinal sensitivity.",
      marathi: {
        intro: "**लिंगनाश** म्हणजे मोतिबिंदू (Cataract), जिथे दृष्टी मंडळात धुक्यासारखा पडदा येतो आणि प्रकाश अडवला जातो.",
        core: "हा कफ दोष वाढल्यामुळे होणारा खोलवरचा आजार आहे. सुरुवातीच्या अस्पष्ट दिसण्यास **तिमिर** म्हणतात. तो पूर्ण दाट झाला की त्याला लिंगनाश म्हणतात.",
        clinical: "तिमिर अवस्थेत आम्ही **सप्तमृत लोह** आणि **नेत्र तर्पण** वापरून मोतिबिंदू वाढण्याची प्रक्रिया थांबवतो. पिकलेल्या मोतिबिंदूसाठी शस्त्रक्रिया हाच उत्तम मार्ग आहे."
      }
    },
    't007': {
      intro: "**Glaucoma (Adhimantha)** is a severe, painful condition of the eye characterized by increased pressure and the sensation of the eye being 'uprooted'.",
      core: "It follows untreated Abhishyanda. The pain is described as 'exruciating head-splitting'. In Vataja Adhimantha, there is sudden loss of vision (Optic atrophy correlation). It is one of the most critical ophthalmic emergencies in Shalakya Tantra.",
      clinical: "Medical management involves **Virechana** (Purgation) to pull the Pitta-Vata pressure downward. Local treatments like **Bidalaka** (eye paste) using cooling herbs help reduce the ocular tension. Timely intervention is mandatory to prevent permanent nerve damage.",
      marathi: {
        intro: "**अधिमंथ** (Glaucoma) हा डोळ्यांचा अत्यंत वेदनादायक आजार असून यामध्ये डोळ्यातील दाब वाढतो आणि डोळा बाहेर पडल्यासारखे वाटते.",
        core: "यामधील वेदना 'डोके फुटण्याइतपत' तीव्र असतात. वातज अधिमंथमध्ये दृष्टी अचानक जाऊ शकते. ही शालाक्य तंत्रातील एक आपत्कालीन स्थिती आहे.",
        clinical: "दाब कमी करण्यासाठी आम्ही **विरेचन** (पोट साफ करणे) करतो. स्थानिक रित्या थंड लेप लावून डोळ्यातील पित्त कमी केले जाते, ज्यामुळे मज्जातंतूंचे नुकसान टळते."
      }
    },
    't008': {
      intro: "**Karna Roga** (Diseases of the Ear) covers conditions like Deafness (Badhirya), Tinnitus (Karna-nada), and Ear discharge (Karna-srava).",
      core: "The ear is the seat of **Akasha** (Space) mahabhuta and **Vata Dosha**. Pathology usually involves Vata blocking the 'Shabdavaha Srota' (auditory nerve/channel) or Kapha leading to fungal/bacterial infections in the canal.",
      clinical: "The master therapy for ear diseases is **Karna-purana** (filling the ear with warm medicated oil). For Tinnitus, we use **Bilva Taila**. For infections, we use oils processed with garlic and turmeric for their 'Krimighna' (anti-microbial) action.",
      marathi: {
        intro: "**कर्ण रोग** (Ear Diseases) मध्ये बहिरेपणा (बाधिर्य), कानात आवाज येणे (कर्ण-नाद) आणि कानातून पाणी येणे (कर्ण-स्राव) यांचा अभ्यास केला जातो.",
        core: "कान हे **आकाश** महाभूताचे स्थान असून **वात दोष** येथे मुख्य असतो. वात वाढून शब्दवह स्त्रोतसाला अडथळा निर्माण करतो.",
        clinical: "कानाच्या आजारांसाठी **कर्ण-पूरण** (कानात कोमट तेल टाकणे) हा सर्वश्रेष्ठ उपचार आहे. आवाजासाठी **बिल्व तैल** वापरले जाते, ज्याने जळजळ आणि आवाज दोन्ही कमी होतात."
      }
    },
    't009': {
      intro: "**Nasa Roga** (Nasal Disorders) covers chronic sinusitis (Pratishyaya), nasal polyps (Nasa-arsha), and anosmia (loss of smell).",
      core: "The nose is the 'Gateway to the Head'. **Pratishyaya** is the ancestor of almost all supraclavicular diseases. Pathology involves Kapha-Vata instability in the 'Nasa-srotas', often leading to 'Dusti' (vitiation) of the brain and eyes.",
      clinical: "The definitive therapy is **Nasya**. For chronic sinusitis, we use **Anu Taila** or **Shadbindu Taila**. Daily practice of 'Neti' (nasal rinsing) is recommended in Swasthavritta as a preventive measure for those prone to respiratory allergies.",
      marathi: {
        intro: "**नासा रोग** (Nasal Disorders) मध्ये जुनाट सर्दी (प्रतिश्याय), नाकातील कोंब (Nasal polyps) आणि वास न येणे यांचा समावेश होतो.",
        core: "नाक हे 'मेंदूचे द्वार' मानले जाते. **प्रतिश्याय** हा सर्व ऊर्ध्वजत्रुगत आजारांचे मूळ आहे. कफ-वात प्रकोपाने नाकातील मार्ग अरुंद होतात.",
        clinical: "नाकाच्या आजारावर **नस्य** हा रामबाण उपाय आहे. जुनाट सर्दीसाठी **अणू तैल** किंवा **षडबिंदू तैल** वापरले जाते. दररोज 'नेती' करणे आरोग्यासाठी हिताचे आहे."
      }
    },
    't010': {
      intro: "**Mukha Roga** (Oral Cavity Diseases) covers oral hygiene and 65 types of diseases affecting the Lips, Gums, Tongue, and Palate.",
      core: "Focus areas include Gingivitis (Sheetada), Stomatitis (Mukha-paka), and Dental decay (Danta-harsha). Pathology is often linked to **Rakta** (Blood) and **Pitta** aggravation. Ayurveda describes the first detailed 'Tooth-brushing' protocol using herbal twigs.",
      clinical: "We use **Kavala** and **Gandusha** (Oil pulling/Rinsing) as the primary clinical actions. **Irimedadi Taila** is used for gum strengthening. Chewing of 'Tambula' (betel leaf) with specific herbs is recommended post-meals to maintain oral pH.",
      marathi: {
        intro: "**मुख रोग** (Oral Diseases) मध्ये तोंड, दात, जीभ आणि हिरड्यांच्या ६५ प्रकारच्या आजारांचा अभ्यास केला जातो.",
        core: "यात हिरड्यांमधून रक्त येणे (शीताद), तोंड येणे (मुखपाक) आणि दात किडणे यांचा समावेश होतो. आयुर्वेदात दात घासण्यासाठी कडू आणि तुरट वनस्पतींच्या काड्यांचा वापर सुचवला आहे.",
        clinical: "हिरड्यांच्या ताकदीसाठी **कवल** आणि **गंडूष** (तेल तोंडात धरणे) उत्तम आहेत. **इरिमेदादि तैल** तोंडाच्या आरोग्यासाठी सर्वश्रेष्ठ तेल मानले जाते."
      }
    },
    't011': {
      intro: "**Kantha Roga** (Throat Disorders) focuses on Tonsillitis (Tundikeri), Pharyngitis (Kantha-shaloka), and Laryngeal problems.",
      core: "Pathology primarily involves **Kapha** and **Rakta**. The throat is the crossroads of 'Prana' and 'Anna' (respiration and nutrition). Obstructions here can lead to 'Rohini' (Diphtheria-like conditions) which are considered surgical emergencies.",
      clinical: "Management involves **Kavala** (Gargling) with **Triphala** or **Haridra**. For voice disorders (**Swara-bheda**), we use **Yashthimadhu** (Liquorice) and **Kanthasudharaka Vati**. Avoiding cold drinks and curd in the winter is part of the 'Pathya'.",
      marathi: {
        intro: "**कंठ रोग** (Throat Disorders) प्रामुख्याने टॉन्सिल्स (तुंडीकेरी), घसा बसणे आणि आवाजाच्या समस्यांवर लक्ष केंद्रित करते.",
        core: "घसा हा 'प्राण' आणि 'अन्न' या दोन्ही मार्गांचे प्रवेशद्वार आहे. येथे कफ आणि रक्त बिघडल्यामुळे वेदना आणि गिळण्यास त्रास होतो.",
        clinical: "**त्रिफळा** किंवा **हळद** घातलेल्या कोमट पाण्याने गुळण्या (Gargle) करणे हा प्राथमिक उपचार आहे. आवाजासाठी **ज्येष्ठमध** आणि **कंठसुधारका वटी** आम्ही सुचवतो."
      }
    },
    't012': {
      intro: "**Shiroroga** (Headaches) in Shalakya analysis covers 11 types of headaches including Migraine (Ardhavabhedaka) and Tension headache (Suryavarta).",
      core: "Ayurveda links headaches to the 'vitiation of the head tissues' due to Vata, Pitta, or Kapha. **Ardhavabhedaka** is an episodic pain on half of the head. **Suryavarta** is pain that follows the intensity of the sun (sinusitis-related).",
      clinical: "Post-assessment, we use **Shirobasti** or **Shirodhara** for Vataja cases and **Nasya** for Kaphaja/Pitta cases. **Pathyadi Kwatha** is our clinical gold standard for managing chronic migraines without the side-effects of modern painkillers.",
      marathi: {
        intro: "**शिरोरोग** (Headaches) मध्ये अर्धशिशी (अर्धावभेदक) आणि डोके जड होणे यांसारख्या ११ प्रकारच्या डोकेदुखीचे विवेचन केले आहे.",
        core: "वात, पित्त किंवा कफामुळे डोक्यातील ऊतींना इजा पोहोचते. वेळेनुसार वाढणाऱ्या डोकेदुखीला **सूर्यावर्त** म्हणतात (पिनास/सायनस संबंधित).",
        clinical: "आम्ही तीव्र डोकेदुखीसाठी **शिरोबस्ती** किंवा **शिरोधारा** करतो. **पथ्यादि काढा** जुन्या डोकेदुखीसाठी अत्यंत प्रभावी औषध आहे."
      }
    },
    't013': {
      intro: "**Kriyakalpa** refers to the specialized local therapeutic procedures of Shalakya Tantra designed for the eyes and head.",
      core: "The seven procedures are: **Aschyotana** (Drops), **Seka** (Streaming), **Bidalaka** (Paste), **Pindi** (Poultice), **Tarpana** (Ghee pooling), **Putapaka** (Advanced pooling), and **Anjana** (Collyrium/Kajal).",
      clinical: "Each procedure has a specific duration and temperature. **Aschyotana** is the first line of defense for acute infections. **Tarpana** is used for degenerative conditions like Macular Degeneration. Mastering Kriyakalpa is what differentiates a Shalakya expert from a general physician.",
      marathi: {
        intro: "**क्रियाकल्प** हे शालाक्य तंत्रातील डोळे आणि डोक्यासाठी वापरले जाणारे विशेष स्थानिक उपचार आहेत.",
        core: "सात मुख्य क्रिया आहेत: **आश्च्योतन** (थेंब), **सेक**, **बिडालक** (लेप), **पिंडी**, **तर्पण**, **पुटपाक** आणि **अंजन** (काजळ).",
        clinical: "प्रत्येक क्रियेचा वेळ आजाराच्या तीव्रतेनुसार ठरतो. **आश्च्योतन** संसर्गासाठी आणि **तर्पण** डोळ्यांच्या ताकदीसाठी वापरले जाते."
      }
    },
    't014': {
      intro: "**Netra Tarpana and Putapaka** are the most sophisticated ocular rejuvenation therapies in Ayurveda.",
      core: "**Tarpana** involves making a 'wall' around the eye using black-gram paste and filling it with **Triphala Ghrita**. The eyes are then kept open under the ghee. **Putapaka** is a similar but more intense treatment using plant juices (Swarasa) instead of ghee.",
      clinical: "We use Tarpana for Computer Vision Syndrome, Progressive Myopia, and Dry Eyes. It provides structural nourishment to the Optic nerve and the Retina. It is considered 'Ayurvedic LASIK' in terms of its ability to stabilize refractive errors over time.",
      marathi: {
        intro: "**नेत्र तर्पण आणि पुटपाक** हे आयुर्वेदातील डोळ्यांचे पुनरुज्जीवनाचे प्रगत उपचार आहेत.",
        core: "तर्पणामध्ये उडदाच्या पिठाचे रिंगण करून त्यात **त्रिफळा घृत** साठवले जाते. पुटपकमध्ये वनस्पतींच्या रसाची भावना देऊन उपचार केले जातात.",
        clinical: "कॉम्प्युटर वापरणाऱ्यांसाठी आणि चष्म्याचा नंबर कमी करण्यासाठी तर्पण खूप प्रभावी आहे. यामुळे डोळ्यांच्या नसांना थेट पोषण मिळते."
      }
    },
    't015': {
      intro: "**Shiro-basti and Nasya in Shalakya** are systemic treatments that work on the supraclavicular diseases through the 'olfactory' and 'cranial' pathways.",
      core: "**Shirobasti** (medicated oil pooled in a leather cap on the head) is the strongest Vata-hara treatment for the brain. **Nasya** (nasal administration) reaches the 'Shringataka Marma', which is the collection of all supraclavicular senses.",
      clinical: "In our Shalakya OPD, we use **Nasya** for everything from hair-fall to thyroid issues and migraines. **Shirobasti** is reserved for severe conditions like Sensory-neural deafness or Facial Paralysis (Ardita), restoring the neural integrity of the sense organs.",
      marathi: {
        intro: "**शिरोबस्ती आणि नस्य** हे संपूर्ण मज्जासंस्थेवर आणि गळ्याच्या वरील भागात काम करणारे सिस्टिमिक उपचार आहेत.",
        core: "**शिरोबस्ती** म्हणजे डोक्यावर चामड्याची टोपी बसवून त्यात तेल साठवणे. **नस्य** म्हणजे नाकात थेंब सोडणे, जे औषध 'शृंगाटक मर्मा'पर्यंत पोहोचवते.",
        clinical: "केस गळणे असो किंवा थायरॉईडच्या समस्या, आम्ही **नस्य** नक्की सुचवतो. चेहऱ्याचा अर्धांगवायू (Facial Paralysis) झाल्यास शिरोबस्ती संजीवनीप्रमाणे काम करते।"
      }
    }
  },
  'prasuti-tantra': {
    't001': {
      intro: "**Stri-Sharira** covers the unique anatomy and physiological architecture of the female reproductive system from an Ayurvedic perspective.",
      core: "Includes the study of 'Artavaha Srotas' (menstrual channels) and 'Garbhashaya' (Uterus). It describes the **Shukra** (sperm) and **Artava** (ovum) interaction which is the base of life. The Uterus is likened to a 'lotus' that opens for conception.",
      clinical: "Anatomy knowledge is vital for procedures like **Uttar-Basti** (intra-uterine oil admin). We teach students about the 'Yoni' junctions and how 'Vata' governs the movement of the ovum and its implantation in the Garbhashaya.",
      marathi: {
        intro: "स्त्री-शरीर (Stri-Sharira) मध्ये आयुर्वेदिक दृष्टिकोनातून स्त्री प्रजनन संस्थेची शरीररचना आणि कार्याचा अभ्यास केला जातो.",
        core: "यामध्ये 'आर्तववह स्रोतस' (रजस्राव वाहिन्या) आणि गर्भाशयाचा सखोल अभ्यास केला जातो. जीवन निर्मितीचा पाया असलेल्या शुक्र आणि आर्तव (स्त्री बीज) यांच्या संयोगाचे यात वर्णन आहे.",
        clinical: "उत्तर-बस्ती सारख्या उपचारांसाठी शरीररचनेचे ज्ञान आवश्यक आहे. गर्भाशयात बीजाचे रोपण करण्यासाठी 'व्यान वायू' आणि 'अपान वायू' यांचे कार्य महत्त्वाचे असते."
      }
    },
    't002': {
      intro: "**Artava Chakra** (Menstrual Cycle) is a 28-day cycle divided into three phases: Rajakala (Bleeding), Ritukala (Proliferative), and Ritumatikala (Secretory).",
      core: "Governed by the interplay of Doshas: **Vata** causes flow, **Pitta** promotes the build-up, and **Kapha** provides stability. Normal Artava is 'Laksha-rasa' (deep red) and shouldn't stain the cloth permanently.",
      clinical: "In clinical practice, any deviation in the Artava Chakra (e.g., pain, heavy flow) is treated by balancing Vata-Pitta. We use **Ashokarishta** and **Kumaryasava** to regulate the rhythm and quality of the cycle, preventing PCOS and endometriosis.",
      marathi: {
        intro: "आर्तव चक्र (Menstrual Cycle) हे २८ दिवसांचे चक्र असून ते रजकाल, ऋतुकाल आणि ऋतुमतीकाल अशा तीन भागात विभागलेले असते.",
        core: "वात प्रवाहाचे कार्य पाहतो, पित्त गर्भाशय तयार करण्यास मदत करते आणि कफ स्थैर्य देतो. सामान्य आर्तव हे रंगाने गडद लाल (लाक्षा-रस) असते आणि त्यावर डाग राहत नाहीत.",
        clinical: "आर्तव चक्रातील कोणताही दोष (उदा. तीव्र वेदना, जास्त रक्तस्राव) वात-पित्त संतुलनाने बरा केला जातो. यासाठी **अशोकारिष्ट** आणि **कुमार्यासव** वापरले जातात."
      }
    },
    't003': {
      intro: "**Yoni-vyapad** encompasses the 20 types of gynaecological disorders described by Acharya Charaka, ranging from infections to structural anomalies.",
      core: "Most disorders are linked to 'Mithya-Ahara' (wrong diet) and 'Vata-Prakopa'. Pathology involves the vitiation of the vaginal and uterine environment, leading to infertility or chronic pain (**Kashtartava**).",
      clinical: "Success in treating Yoni-vyapad depends on local **Yoni-Prakshalana** (vaginal wash) and **Sthanika-Chikitsa**. We use medicated oils like **Phala Ghrita** to 'nourish' the uterine lining and restore the pH balance naturally.",
      marathi: {
        intro: "योनि-व्यापदामध्ये आचार्य चरकांनी सांगितलेल्या २० प्रकारच्या स्त्री-रोगांचा समावेश होतो, ज्यात संसर्गापासून ते शारीरिक विकृतींपर्यंत सर्व काही येते.",
        core: "बहुतेक आजार 'मिथ्या-आहार' (चुकीचा आहार) आणि वात-प्रकोपामुळे होतात. यामुळे वंध्यत्व किंवा तीव्र वेदना (कष्टार्तव) होऊ शकतात.",
        clinical: "या उपचारांमध्ये **योनि-प्रक्षालन** (धुणे) आणि स्थानिक चिकित्सा महत्त्वाची आहे. गर्भाशयाचे पोषण करण्यासाठी आणि पीएच (pH) संतुलन राखण्यासाठी आम्ही **फल घृत** वापरतो."
      }
    },
    't004': {
      intro: "**Pradara** covers abnormal vaginal discharge and hemorrhages, primarily categorized into Shweta (Leucorrhoea) and Rakta (Menorrhagia).",
      core: "**Raktapradara** is a state of high Pitta corrupting the blood. **Shwetapradara** is a Kaphaja disorder of the 'Artavaha Srotas'. Both reflect a deep systemic imbalance and low 'Ojas'.",
      clinical: "For white discharge, we use **Lodhrasava** and **Pushyanuga Churna**. For excessive bleeding, we focus on 'Stambhana' (astringents) and cooling using **Shatavari**. Diet must be strictly non-spicy and 'Sheetala'.",
      marathi: {
        intro: "प्रदर म्हणजे योनीतून होणारा पांढरा (श्वेतप्रदर) किंवा लाल (रक्तप्रदर) स्त्राव, जो शरीराच्या अंतर्गत असंतुलनाचा संकेत देतो.",
        core: "रक्तप्रदर हा पित्त-रक्त बिघडल्यामुळे होतो, तर श्वेतप्रदर हा कफ दोषाचा विकार आहे. दोन्ही स्थितींमध्ये शरीरातील 'ओज' आणि ताकद कमी होते.",
        clinical: "पांढऱ्या स्त्रावासाठी **लोध्रासव** आणि **पुष्यानुग चूर्ण** वापरले जाते. जास्त रक्तस्राव थांबवण्यासाठी **शतावरी** आणि शीत चिकित्सा दिली जाते."
      }
    },
    't005': {
      intro: "**Vandhyatva** (Infertility) in Ayurveda is the failure of the four factors of conception: Rutu (Season), Kshetra (Field), Ambu (Nutrition), and Beeja (Seed).",
      core: "**Kshetra** (Uterus) or **Beeja** (Ovum/Sperm) deficiency is the primary cause. Pathology involves 'Srotorodha' (blockage) in the Fallopian tubes or hormonal deficiency. Emotional stress is also recognized as a minor factor.",
      clinical: "We treat infertility using a detox-first approach (**Virechana**), followed by **Uttar-Basti**. This clears the tubes and 'seeds' the uterus with healthy oils. **Phala Ghrita** is given to both partners to improve 'Beeja-guna' (egg and sperm quality).",
      marathi: {
        intro: "वंध्यत्व (Infertility) म्हणजे गर्भधारणेसाठी आवश्यक असलेल्या चार घटकांपैकी (ऋतू, क्षेत्र, अंबू, बीज) एकाची कमतरता असणे.",
        core: "क्षेत्र (गर्भाशय) किंवा बीज (स्त्री-पुरुष बीज) दोष हे मुख्य कारण असते. फॅलोपियन ट्यूबमध्ये अडथळा (स्त्रोतोरोध) असणे हे देखील एक कारण आहे.",
        clinical: "आम्ही प्रथम शरीर शुद्धी करतो (**विरेचन**) आणि त्यानंतर **उत्तर-बस्ती** देतो. यामुळे बंद नलिका उघडण्यास आणि बीजाचा दर्जा सुधारण्यास मदत होते."
      }
    },
    't006': {
      intro: "**Garbhini Paricharya** is the comprehensive antenatal care protocol including monthly diet (Masanumasika Pathya) and lifestyle to ensure a healthy baby.",
      core: "Includes using medicated milk, ghee, and herbs like **Guduchi** and **Shatavari**. It emphasizes 'Manas-Arogya' (Mental health) of the mother, as her thoughts influence the 'Garbha's' character.",
      clinical: "In our pregnancy clinic, we advise a specific herb for each month. In the 9th month, we use **Anuvasana Basti** and oil-soaked tampons to 'lubricate' the birth canal for an easy, normal delivery.",
      marathi: {
        intro: "गर्भिणी परिचर्या म्हणजे गरोदरपणात आईची आणि बाळाची घेतलेली संपूर्ण काळजी, ज्यात नऊ महिन्यांचा विशेष आहार समाविष्ट आहे.",
        core: "यामध्ये औषधी दूध, तूप आणि **गुडुची**, **शतावरी** सारख्या वनस्पतींचा वापर केला जातो. आईच्या मानसिक आरोग्याचा बाळाच्या चरित्रावर परिणाम होतो, म्हणून मन प्रसन्न ठेवले जाते.",
        clinical: "नऊ महिन्यांच्या अखेरीस आम्ही **अनुवासन बस्ती** आणि औषधी पिचू सुचवतो, ज्यामुळे बाळंतपण सुलभ आणि नैसर्गिक (Normal Delivery) होते."
      }
    },
    't007': {
      intro: "**Garbha Vriddhi** describes the monthly embryonic development as visualised by the ancient Seers without modern ultrasound.",
      core: "The heart starts beating in the 4th month. In the 5th month, the mind (Manas) develops. In the 6th month, intelligence (Buddhi) is formed. This timeline is used to introduce specific foods that support these 'Organ-systems' as they form.",
      clinical: "For example, giving **Medhya** (brain-boosting) herbs in the 5th month supports neural development. We correlate modern 'Milestones' of pregnancy with these classical stages for patient counseling.",
      marathi: {
        intro: "गर्भ वृद्धी म्हणजे प्राचीन ऋषींनी सांगितलेली बाळाची पोटातील वाढ, जी आजच्या अल्ट्रासाऊंडसारखीच अचूक आहे.",
        core: "चौथ्या महिन्यात बाळाचे हृदय धडधडू लागते, पाचव्या महिन्यात मन विकसित होते आणि सहाव्या महिन्यात बुद्धी तयार होते. यानुसार त्या-त्या महिन्यात विशिष्ट आहार सुचवला जातो.",
        clinical: "बाळाच्या मेंदूच्या वाढीसाठी आम्ही पाचव्या महिन्यात **मेध्य** औषधे देतो. यामुळे बाळाची बुद्धिमत्ता आणि स्मरणशक्ती सुधारते."
      }
    },
    't008': {
      intro: "**Garbha Vyapad** covers complications of pregnancy like miscarriage (Garbhasrava), Intrauterine growth retardation (Garbha-kshaya), and Toxemia.",
      core: "Vata-imbalance is the primary culprit. If the mother's Agni is weak, the 'Ambu' (nutrients) don't reach the baby, leading to low birth weight. Hemorrhage during pregnancy is a Pitta-emergency.",
      clinical: "For preventing miscarriage, we use **Garbhapala Rasa**. In cases of placental insufficiency, we use 'Ksheera-paka' (herbal milk decoctions) to bypass the poor digestion and nourish the baby directly through the blood.",
      marathi: {
        intro: "गर्भ व्यापद म्हणजे गरोदरपणातील गुंतागुंत, जसे की गर्भस्त्राव (Miscarriage), बाळाची वाढ खुंटणे किंवा उच्च रक्तदाब.",
        core: "वात दोषाचे असंतुलन हे मुख्य कारण आहे. आईचे पचन (अग्नी) कमकुवत असेल तर पोषक तत्वे बाळापर्यंत पोहोचत नाहीत. गरोदरपणातील रक्तस्राव ही पित्त-आणीबाणी मानली जाते.",
        clinical: "गर्भपात रोखण्यासाठी आम्ही **गर्भपाल रस** वापरतो. बाळाचे पोषण सुधारण्यासाठी 'क्षीर-पाक' (औषधी दूध) दिले जाते."
      }
    },
    't009': {
      intro: "**Prasava** covers the management of normal labour and delivery, classified into three stages of birth.",
      core: "The role of **Apana Vayu** is central to downward movement. **Sutika-griha** (delivery room) should be warm and hygienic. It also describes the management of 'Mudha-garbha' (malpresentations like Breech) using manual manipulation.",
      clinical: "During labor, we use herbal fumes and localized heat to help in cervical dilation. For stalled labor, we use specific 'Oushadhi' to stimulate the Apana Vayu. Ayurveda prioritized the mother's strength to ensure a safe transition for the baby.",
      marathi: {
        intro: "प्रसव म्हणजे नैसर्गिक प्रसूती आणि त्यातील तीन टप्प्यांचे व्यवस्थापन.",
        core: "बाळाला बाहेर ढकलण्यासाठी 'अपान वायू' महत्त्वाची भूमिका बजावतो. वेळेवर प्रसूती न झाल्यास विशिष्ट औषधी धूर आणि लेपांचा वापर केला जातो.",
        clinical: "कठीण प्रसूतीमध्ये बाळाची स्थिती योग्य करण्यासाठी कुशल हातांनी 'मॅन्युअल मॅन्युपुलेशन' केले जाते. आईची ताकद टिकवून ठेवणे हे प्रथम कर्तव्य असते."
      }
    },
    't010': {
      intro: "**Sutika Paricharya** is the critical postnatal care for the mother for a period of 45 days (Sutika-kaal) after delivery.",
      core: "The mother's body has extreme 'Dhatu-kshaya' (empty tissues) and high Vata after birth. Focus is on **Abhyanga** (Massage), **Veshthana** (Abdominal binding), and specific 'Peekas' (medicated decoctions) to shrink the uterus.",
      clinical: "We use **Dashmoolarishta** to prevent postnatal infections and 'Sutika-jwara'. Tying the abdomen with a cotton cloth prevents Vata from occupying the empty uterine space, preventing chronic backaches and organ prolapse later in life.",
      marathi: {
        intro: "सूतिका परिचर्या म्हणजे बाळंतपणानंतरचे ४५ दिवसांचे अत्यंत महत्त्वाचे व्यवस्थापन (सूतिका-काल).",
        core: "बाळंतपणानंतर आईच्या शरीरात वात वाढतो आणि ताकद कमी होते. यामुळे संपूर्ण अंगाला मालीश (**अभ्यंग**), पोट बांधणे आणि विशिष्ट आहारावर भर दिला जातो.",
        clinical: "बा बाळंतपणानंतरचा ताप आणि जंतुसंसर्ग टाळण्यासाठी आम्ही **दशमलारिष्ट** सुचवतो. पोट बांधल्यामुळे गर्भाशय पुन्हा आपल्या जागेवर येण्यास मदत होते."
      }
    },
    't011': {
      intro: "**Stanya** (Breast Milk) is considered the 'Upadhatu' of Rasa Dhatu. Its quality determines the health and immunity of the newborn child.",
      core: "Classified into **Stanya-vriddhi** (excess) and **Stanya-kshaya** (deficiency). It can be 'vitiated' by mother's diet, appearing oily, frothy, or salty, which causes digestive issues in the baby. Ayurveda describes 'Stanya-shodhana' (purification of milk).",
      clinical: "To increase milk, we use **Shatavari** and **Anethum sowa**. If the baby has colic due to mother's milk, we treat the mother with 'Deepana' herbs like **Ginger**, which then reaches the baby through the milk to fix the baby's gut.",
      marathi: {
        intro: "स्तन्य (Breast Milk) हे रस धातूचा उपधातू मानले जाते, ज्याची गुणवत्ता बाळाच्या आरोग्यावर आणि रोगप्रतिकारशक्तीवर परिणाम करते.",
        core: "आईच्या आहारामुळे दूध बिघडू शकते, ज्यामुळे बाळाला पचनाचे त्रास होतात. आयुर्वेदात 'स्तन्य-शोधन' (दुधाची शुद्धी) करण्याची पद्धत सांगितली आहे.",
        clinical: "दूध वाढवण्यासाठी आम्ही **शतावरी** वापरतो. जर बाळाला पोटदुखीचा त्रास असेल, तर आईला पाचक औषधे दिली जातात, जी दुधावाटे बाळापर्यंत पोहोचतात."
      }
    },
    't012': {
      intro: "**Rajonivritti** (Menopause) is the natural transition out of the reproductive phase, viewed as a 'Vata' dominant stage of life.",
      core: "Symptoms like hot flashes are 'Pitta-vridhhi' in the 'Vata' background. It is not a disease but a phase where 'Dhatu-kshaya' accelerates. Bone density loss (Asthi-shosha) is a primary concern.",
      clinical: "We manage menopause using **Saraswatarishta** for mental calm and **Ashokarishta** for hormonal balance. Daily **Abhyanga** is mandatory to prevent the skin and bone dryness associated with the depletion of estrogen levels.",
      marathi: {
        intro: "रजोनिवृत्ती (Menopause) ही आयुष्यातील एक नैसर्गिक पायरी असून या काळात शरीरातील वात दोष वाढतो.",
        core: "अंगाची आग होणे (Hot flashes) आणि हाडे ठिसूळ होणे (Asthi-kshaya) ही मुख्य लक्षणे आहेत. हा आजार नसून शरीरातील बदलांचा एक काळ आहे.",
        clinical: "मानसिक शांततेसाठी **सारस्वतारिष्ट** आणि संप्रेरकांसाठी (Hormones) **अशोकारिष्ट** वापरले जाते. हाडांच्या ताकदीसाठी नित्य **अभ्यंग** आवश्यक आहे."
      }
    },
    't013': {
      intro: "**Ayurvedic Contraception** and Family Planning focus on 'Rutu-vyatita' (non-fertile period) and medicinal ways to prevent conception without hormonal side effects.",
      core: "Classical texts mention herbs like **Vidanga** and **Pippali** that have 'Garbha-nirodhaka' (anti-fertility) properties. It emphasizes that a child should be 'Invited' through mental and physical purity, not just conceived by chance.",
      clinical: "We guide couples on the 'Ayurvedic Calendar' (Fertile window). For natural spacing, we use herbal preparations that temporarily alter the 'Ambu' (cervical mucus) to prevent sperm entry, maintaining the mother's hormonal health.",
      marathi: {
        intro: "आयुर्वेदिक कुटुंब नियोजन पद्धतींमध्ये संप्रेरकांचा वापर न करता नैसर्गिक रित्या गर्भधारणा टाळण्याचे उपाय सांगितले आहेत.",
        core: "ग्रंथांमध्ये **विडंग** आणि **पिप्पली** सारख्या वनस्पतींचे वर्णन आहे, यात गर्भ-निरोधक गुणधर्म आहेत. बाळ हे योगायोगाने नसून नियोजित असायला हवे, यावर येथे भर दिला जातो.",
        clinical: "आम्ही जोडप्यांना 'फर्टाईल विंडो' ओळखण्यास मदत करतो. औषधी काढे आणि योग्य आहारामुळे आईच्या आरोग्यावर परिणाम न होता अंतर राखता येते."
      }
    },
    't014': {
      intro: "**Gynaecological Procedures** cover the 'Sthanika Chikitsa'—local uterine and vaginal therapies for infections and structural issues.",
      core: "Procedures include **Yoni-dhavana** (vaginal wash), **Yoni-dhupana** (fumigation), **Yoni-pichu** (oil swabs), and **Uttar-Basti**. These provide high local drug concentration without systemic toxicity.",
      clinical: "For recurring infections (Vaginitis), **Triphala dhavana** is miraculous. For infertility and Uterine Fibroids, **Uttar-Basti** remains our most powerful tool to deliver herbal healing directly to the Garbhashaya.",
      marathi: {
        intro: "स्थानिक चिकित्सा म्हणजे स्त्री-रोगांवर केल्या जाणाऱ्या स्थानिक स्वरूपाच्या प्रक्रिया, जसे की संसर्ग आणि इतर तक्रारींवरील उपचार.",
        core: "यामध्ये **योनि-धावन** (धुणे), **योनि-धूपन**, **योनि-पिचू** आणि **उत्तर-बस्ती** यांचा समावेश होतो. यामुळे औषध थेट बाधित भागापर्यंत पोहोचते.",
        clinical: "वारंवार होणाऱ्या इन्फेक्शनसाठी **त्रिफळा धावन** अत्यंत प्रभावी आहे. वंध्यत्व आणि सिस्ट (Cyst) वर उत्तर-बस्ती हा आमचा सर्वात प्रगत उपचार आहे."
      }
    },
    't015': {
      intro: "**Surgical Interventions in Prasuti** covers the classical descriptions of handling difficult deliveries, including version, extraction, and embryotomy.",
      core: "Sushruta's manual manipulation of the fetus in 'Mudha-garbha' is the foundation of obstetric surgery. When life is at risk, he describes 'Shastra-karma' to save the mother, detailing the required instruments and ethical considerations.",
      clinical: "While C-sections are modern, the Ayurvedic 'Pre and Post-op' protocols using **Gandharva-hasthadi Taila** and specific 'Paschat' diet ensure that the mother's gut health and tissue repair are 2x faster than normal post-surgical recovery.",
      marathi: {
        intro: "प्रसूतीमधील शस्त्रक्रिया म्हणजे कठीण प्रसूती प्रसंगी आई आणि बाळाचे प्राण वाचवण्यासाठी केल्या जाणाऱ्या विशेष क्रिया.",
        core: "सुश्रुतांनी 'मूढ-गर्भ' (चुकीच्या स्थितीतील बाळ) काढण्याची कला जगाला शिकवली. जेव्हा नैसर्गिक प्रसूती अशक्य असते, तेव्हा शस्त्रक्रिया करून जीव वाचवण्याचे निर्देश ग्रंथात आहेत.",
        clinical: "आधुनिक काळात सी-सेक्शन (C-section) सोपे झाले असले तरी, ऑपरेशननंतर रिकव्हरी २ पट जलद करण्यासाठी आयुर्वेदिक आहार आणि **गंधर्वहस्तादि तैल** खूप मदत करतात."
      }
    }
  },
  'kaumarbhritya': {
    't001': {
      intro: "**Kaumarbhritya** is the Ayurvedic branch of Pediatrics, dealing with the care of children from conception until the age of 16.",
      core: "The term comes from 'Kumara' (child) and 'Bhritya' (nurturing/supporting). It covers the management of neonatal health, growth milestones, and childhood diseases. Children are considered delicate (**Sukumara**) and their Doshas are in a'Kshira-pada' (milk-fed) state, requiring mild and specific treatments.",
      clinical: "In clinical practice, we focus on 'Dhatri' (wet-nurse) health and the 'Bala-grahas' (pediatric infections). The primary goal is to ensure the **Vyadhikshamatva** (immunity) of the child is built early through proper diet and 'Lehana' (medicated licking) therapies.",
      marathi: {
        intro: "**कौमारभृत्य** ही आयुर्वेदाची बालरोग चिकित्सा (Pediatrics) शाखा असून, यात गर्भधारणेपासून ते १६ वर्षांच्या मुलांच्या आरोग्याचा विचार केला जातो.",
        core: "'कुमार' म्हणजे बालक आणि 'भृत्य' म्हणजे पोषण करणे. मुलांचे शरीर अत्यंत कोमल (सुकुमार) असते, म्हणून त्यांचे उपचार सौम्य आणि विशिष्ट असतात.",
        clinical: "आमचा मुख्य भर मुलांची **व्याधिक्षमत्व** (रोगप्रतिकारशक्ती) वाढवण्यावर असतो. यासाठी योग्य आहार आणि 'लेहन' चिकित्सा (चाटण) महत्त्वाची ठरते."
      }
    },
    't002': {
      intro: "**Care of the Newborn (Navajata Shishu)** focuses on the immediate post-birth resuscitation and protection of the infant.",
      core: "Procedures include **Prana-pratyagamana** (resuscitation), cleaning the mouth with ghee/salt, and **Raksha-karma** (protective rituals using herbs like Vacha). It also describes the first feed, starting with honey and ghee to initiate the gut.",
      clinical: "We emphasize the 'Bath' using herbal decoctions like **Nirgundi** to prevent skin infections. Proper umbilical cord care (**Nabhi-vardhana**) using medicated oils prevents neonatal sepsis. For BAMS students, mastering these 'Immediate Care' steps is non-negotiable for safe practice.",
      marathi: {
        intro: "**नवजात शिशूची काळजी** (Navajata Shishu) जन्मानंतर लगेचच केल्या जाणाऱ्या पाच पायऱ्यांवर आधारित आहे.",
        core: "यामध्ये बाळाचा श्वास सुरू करणे, शरीर स्वच्छ करणे आणि **रक्षा-कर्म** (जंतुसंसर्गापासून संरक्षण) यांचा समावेश होतो. पहिल्यांदा बाळाला मध आणि तूप चाटवले जाते.",
        clinical: "नाभीची (Umbilical cord) काळजी घेण्यासाठी आम्ही औषधी तेले वापरतो. बाळाला जंतुसंसर्गापासून वाचवण्यासाठी **वचा** आणि **निगुर्ंडी** युक्त पाण्याच्या वाफेचा वापर केला जातो."
      }
    },
    't003': {
      intro: "**Breastfeeding and Wet-nursing (Dhatri)** emphasizes the vital role of breast milk as the only source of nutrition and immunity for the infant.",
      core: "Ayurveda describes the qualities of a good 'Dhatri' (if the mother cannot feed). Milk is classified as 'Shuddha' (pure) or 'Dushta' (vitiated). **Stanyashodhana** herbs like **Patha** and **Musta** are used to purify the milk if the baby shows signs of indigestion.",
      clinical: "Clinically, we treat the baby through the mother. If a baby has constipation, we give the mother a mild laxative. We also recommend **Shatavari** for mothers with low milk supply, ensuring the baby gets optimal Ojas-building nutrition.",
      marathi: {
        intro: "**स्तनपान आणि धात्री** (Breastfeeding) यामध्ये आईच्या दुधाला बाळासाठी एकमेव 'अमृत' मानले गेले आहे.",
        core: "आईचे दूध शुद्ध असावे. जर दुधात दोष असतील, तर आईला **पाठा** आणि **मुस्ता** सारखी औषधे देऊन दूध शुद्ध केले जाते.",
        clinical: "आम्ही बाळावर उपचार करण्यासाठी अनेकदा आईला औषधे देतो. आईचा आहार सुधारल्यामुळे बाळाचे पचन आपोआप सुधारते."
      }
    },
    't004': {
      intro: "**Growth and Development (Vardhamana)** covers the physical and mental milestones from rolling over to walking and speaking.",
      core: "Includes the study of 'Phala-prashana' (introducing fruits) at 6 months and 'Anna-prashana' (introducing solids). Ayurveda correlates the development of 'Dhatus' with the child's ability to support their own weight and interact with the environment.",
      clinical: "We look for **Pratyagra-shiras** (head control) and **Dantotpatti** (teething). For children with delayed milestones, we use **Abhyanga** with **Lakshadi Taila** to strengthen the bones and **Brahmi** to accelerate neural development.",
      marathi: {
        intro: "**वाढ आणि विकास** (Growth & Development) मध्ये बाळाचे शारीरिक आणि मानसिक टप्पे (Milestones) अभ्यासले जातात.",
        core: "सहाव्या महिन्यात फळांचा रस (फलप्राशन) आणि अन्नाची सुरुवात (अन्नप्राशन) केली जाते. बाळाच्या नसांच्या वाढीनुसार त्याचे हालचालींचे टप्पे ठरतात.",
        clinical: "जर बाळाची वाढ खुंटली असेल, तर आम्ही **लाक्षादी तैल** मालीश करण्यासाठी आणि **ब्राह्मी** बुद्धी वाढवण्यासाठी देतो."
      }
    },
    't005': {
      intro: "**Dentition (Dantotpatti)** is viewed as a period of physiological stress where all three Doshas are naturally aggravated.",
      core: "Teething usually occurs between 6-8 months. It is said that 'every disease a child gets during teething should be treated with care but not over-medicated', as they are often self-limiting. Common signs include fever, diarrhea, and irritability.",
      clinical: "We use **Danta-rakshaka** powders and mild cleaning of the gums. For severe irritability, we use **Kumaryasava** in very small doses. Proper nutrition during this phase is vital to ensure 'Danta-sampat' (perfect tooth structure).",
      marathi: {
        intro: "**दंतोत्पत्ती** म्हणजे बाळाला दात येण्याचा काळ, जो शरीरासाठी एक नैसर्गिक ताणाचा काळ असतो.",
        core: "दात येताना कफ आणि वात दोष वाढतात, ज्यामुळे ताप, जुलाब आणि चिडचिड होणे अशी लक्षणे दिसतात. हे आजार अनेकदा आपोआप बरे असतात.",
        clinical: "हिरड्यांच्या दुखण्यावर आम्ही विशिष्ट औषधी चूर्ण घासण्यासाठी देतो. चिडचिड कमी करण्यासाठी **कुमार्यासव** अत्यंत कमी प्रमाणात दिला जातो."
      }
    },
    't006': {
      intro: "**Pediatric Nutrition (Ahara)** follows the transition from 'Ksheerada' (only milk) to 'Ksheerannada' (milk + solids) and finally 'Annada' (only solids).",
      core: "Emphasizes the use of 'Laghu' (light) and 'Deepana' (digestive) foods. Introducting **Mudga-yusha** (moong soup) and **Shashtika Shali** (rice) provides the necessary carbohydrates without taxing the small child's Agni.",
      clinical: "Avoidance of 'Guru' (heavy) foods like excess sweets and cold curd is emphasized to prevent 'Krimis' (worms) and respiratory congestion. We use **Vacha-Lashuna** oils in cooking to keep the child's digestion robust.",
      marathi: {
        intro: "**बाल-आहार** (Pediatric Nutrition) मध्ये केवळ दूध (क्षीरप), दूध आणि अन्न (क्षीरान्नद) आणि केवळ अन्न (अन्नद) असे तीन टप्पे असतात.",
        core: "बाळाच्या पचनाला हलके (लघू) असे मुगाचे वरण आणि भात देण्यास प्राधान्य दिले जाते. गोड आणि थंड पदार्थ टाळण्यावर भर असतो.",
        clinical: "बाळाचे पचन सुधारण्यासाठी आम्ही अन्नामध्ये **वचा** आणि **लसूण** युक्त तेलाचा वापर सुचवतो, ज्यामुळे जंत (Krimis) होत नाहीत."
      }
    },
    't007': {
      intro: "**Common Pediatric Ailments** include infections, digestive upsets, and specifically **Balagraha** (complex infectious syndromes).",
      core: "Includes **Ahiputana** (napkin rash), **Parigarbhika** (malnutrition due to back-to-back pregnancies), and **Talukantaka** (palatal conditions). Pathology is often a mix of internal Dosha imbalance and external environmental factors.",
      clinical: "Treating 'Ahiputana' involves maintaining dryness and using **Jatyadi Taila**. For 'Parigarbhika', we focus on supplementing the child with extra high-protein Ayurvedic foods while treating the mother's nutritional status.",
      marathi: {
        intro: "**मुलांचे सामान्य आजार** यामध्ये संसर्ग, पचनाच्या तक्रारी आणि 'बालग्रह' (विशिष्ट संसर्गजन्य आजार) यांचा समावेश होतो.",
        core: "अहिपूतना (नॅपकिन रॅश) आणि कुपोषण (परिगर्भिक) यांसारख्या आजारांचे मूळ आईचा आहार किंवा बाह्य वातावरण यात असते.",
        clinical: "रॅश कमी करण्यासाठी आम्ही **जात्यादी तैल** वापरतो. कुपोषित बालकांचे वजन वाढवण्यासाठी 'बृंहण' काढे आणि लेह दिले जातात."
      }
    },
    't008': {
      intro: "**Management of Diarrhoea and Fever** (Atisara and Jwara) are the leading causes of pediatric morbidity and mortality.",
      core: "In children, dehydration happens very fast. Pathology involves 'Ama' obstructing the gut. Fever (**Jwara**) in children is often a sign of 'Koshtha-shakha' movement of Doshas due to improper food or teething.",
      clinical: "We use **Musta** and **Ativisha** as the core drugs for pediatric diarrhea. For fever, **Amritarishta** is given in small, diluted doses. Maintaining hydration using 'Laja-peya' (puffed rice water) is more effective than modern ORS in many cases.",
      marathi: {
        intro: "**ताप आणि जुलाब** (Jwara & Atisara) हे मुलांमध्ये आढळणारे सर्वात मोठे आजार असून योग्य व्यवस्थापन न केल्यास ते घातक ठरू शकतात.",
        core: "मुलांच्या शरीरातील पाण्याचे प्रमाण (Dehydration) लगेच कमी होते. पचनातील विकृती (आम) मुळे हे आजार उद्भवतात.",
        clinical: "जुलाब थांबवण्यासाठी **मुस्ता** आणि **अतिविषा** ही मुख्य औषधे आहेत. पाण्याची पातळी राखण्यासाठी साळीच्या लाह्यांचे पाणी (लाजा-पेय) दिले जाते."
      }
    },
    't009': {
      intro: "**Respiratory Disorders in Pediatrics** cover cough (Kasa), asthma (Tamaka Shwasa), and chronic congestion.",
      core: "Children are in the **Kapha-Kaala** of life, making them'Kapha-dominant'. This leads to frequent mucus buildup in the throat and lungs. Untreated cough often leads to **Rajayakshma** (depletion syndromes).",
      clinical: "We use **Sitopaladi Churna** mixed with honey as the first line of defense. For severe congestion, local **Abhyanga** with warm Salted Sesame oil followed by mild heating (**Nadi Sweda**) helps expectorate the mucus safely.",
      marathi: {
        intro: "**श्वसन संस्थेचे विकार** यामध्ये खोकला (कास), दमा आणि वारंवार होणारी सर्दी यांचा अभ्यास केला जातो.",
        core: "मुलांचे वय हे 'कफ-प्रधान' असल्याने त्यांना छातीत कफ जमा होण्याचा त्रास जास्त होतो. याकडे दुर्लक्ष केल्यास बाल-राजक्ष्मेचा धोका असू शकतो.",
        clinical: "खोकल्यासाठी **सितोपलादी चूर्ण** आणि मध हे सर्वोत्तम आहे. छातीतील कफ काढण्यासाठी कोमट तेलाने मालीश आणि नाडी-स्वेद (वाफ) दिली जाते."
      }
    },
    't010': {
      intro: "**Skin Diseases in Children** focuses on Psoriasis-like conditions (Sidhma), Eczema (Vicharchika), and various rashes.",
      core: "Linked to the 'vitiation of Rakta' and often the quality of the mother's milk. Since children have very thin skin, using harsh chemical steroids is avoided. Pathology involves 'Krimis' (microbes) and 'Ama'.",
      clinical: "We use **Nimbadi Kwatha** for washing and **Coconut oil** based medicated ointments. For itching, **Eladi Taila** is excellent. Dietary triggers like sour curd or stored fruits are removed from the child's (and mother's) diet.",
      marathi: {
        intro: "**मुलांचे त्वचा रोग** शरीरातील रक्त बिघडल्यामुळे आणि अनेकदा आईच्या दूषित दुधामुळे होतात.",
        core: "मुलांची त्वचा अत्यंत पातळ असल्याने कडक औषधे टाळली जातात. खाज सुटणे आणि फोड येणे यासाठी अंतर्गत आणि बाह्य दोन्ही उपचार आवश्यक असतात.",
        clinical: "त्वचा धुण्यासाठी **लिंबाचा काढा** आणि मलम म्हणून **नारळ तेल** आधारित औषधे वापरली जातात. आहारात दही आणि आंबट पदार्थ टाळले जातात."
      }
    },
    't011': {
      intro: "**Developmental Delays and Disabilities** cover ADHD, Autism, and Cerebral Palsy under the Ayurvedic lens of 'Jada' or 'Unmada'.",
      core: "Viewed as a deficiency in **Vata-Sannikarsha** (neural coordination) or 'Bija-dosha' (genetic factors). The goal is not just 'curing' but improving the 'Quality of Life' through sensory stimulation and herbal support.",
      clinical: "We use **Pancha-gavya Ghrita** for its ability to cross the blood-brain barrier. **Suvarna-prashana** (Gold-processed drops) is used as a neuro-modulator. Many children show significant improvement in 'Eye-contact' and 'Speech' with consistent therapy.",
      marathi: {
        intro: "**विकासात्मक अडथळे** यामध्ये ऑटिझम (Autism), एडीएचडी (ADHD) आणि मेंदूच्या विकासातील समस्यांचा विचार केला जातो.",
        core: "हे मेंदूच्या समन्वयातील (Vata-Sannikarsha) दोषांमुळे होतात. केवळ बरे करणे हा उद्देश नसून मुलाचे आयुष्य सुसह्य करणे हे आमचे ध्येय असते.",
        clinical: "मेंदूच्या नसांच्या वाढीसाठी आम्ही **पंचगव्य घृत** वापरतो. **सुवर्णप्राशन** मुळे मुलांच्या संवाद साधण्याच्या आणि बोलण्याच्या क्षमतेत सुधारणा दिसते."
      }
    },
    't012': {
      intro: "**Panchakarma for Children** is a specialized, gentle version of the five detoxification procedures called 'Bal-Panchakarma'.",
      core: "Vamana and Virechana are rarely used in children under 10. Instead, **Basti** (medicated enemas) is the preferred method for almost all chronic pediatric conditions. It is called 'Half of All Medicine' for children too.",
      clinical: "For chronic asthma, we use **Matra Basti** (small oil enema). For neurological delays, **Shirodhara** using milk (Ksheera-dhara) is very soothing. The focus is always on 'Brimhana' (nourishing) rather than 'Karshana' (depleting) the child's tissues.",
      marathi: {
        intro: "**बाल-पंचकर्म** म्हणजे मुलांसाठी केलेली अत्यंत सौम्य आणि सुरक्षित शोधन प्रक्रिया.",
        core: "लहान मुलांसाठी वमन आणि विरेचन शक्यतो टाळले जाते. त्याऐवजी **बस्ती** (एनिमा) हा सर्वात प्रभावी आणि सुरक्षित उपचार मानला जातो.",
        clinical: "दम्यासाठी आम्ही **मात्रा बस्ती** देतो आणि एकाग्रता वाढवण्यासाठी दुधाची **शिरोधारा** (क्षीर-धारा) करतो."
      }
    },
    't013': {
      intro: "**Samskaras** are the 16 rites of passage that provide a framework for the child's health, social identity, and psychological stability.",
      core: "Key Samskaras include **Jatakarma** (at birth), **Namakarana** (naming), **Nishkramana** (first outing), and **Chudakarana** (head-shaving). Each has a physical health component (e.g., exposing the baby to sunlight for vitamin D).",
      clinical: "We encourage parents to follow these as 'Health-Checkup' milestones. Head-shaving (**Chudakarana**) helps in managing scalp heat and promoting thick hair growth. It also marks the child's entry into the 'Social World'.",
      marathi: {
        intro: "**संस्कार** हे मुलाच्या शारीरिक, सामाजिक आणि मानसिक आरोग्यासाठी आखलेले १६ महत्त्वाचे टप्पे आहेत.",
        core: "जात-कर्म (जन्म), नामकरण (नाव ठेवणे), निष्क्रमण (बाहेर काढणे) आणि चूडा-कर्म (जावळ काढणे) हे मुख्य संस्कार आहेत. प्रत्येक संस्कारामागे आरोग्याचे कारण दडलेले आहे.",
        clinical: "जावळ काढल्यामुळे डोक्याचे तापमान नियंत्रित राहते आणि केस दाट होतात. निष्क्रमण संस्कारामुळे बाळाला शुद्ध हवा आणि सूर्यप्रकाश मिळतो."
      }
    },
    't014': {
      intro: "**Suvarna-prashana** (Ayurvedic Vaccination) is the practice of administering gold particles mixed with herbs and honey to build lifelong immunity.",
      core: "Administered on **Pushya Nakshatra** days. Gold is a powerful 'Medhya' (brain-booster) and 'Rasayana' (rejuvenator). It stimulates the 'Ojas' of the child and prevents frequent respiratory and digestive infections.",
      clinical: "Studies show that children on Suvarna-prashana have 50% fewer hospital visits for common colds. Clinically, we use a mixture of Gold, **Vacha**, **Brahmi**, and **Ginger** in a honey-ghee base. It is the cheapest and most effective 'Immunological support'.",
      marathi: {
        intro: "**सुवर्णप्राशन** ही आयुर्वेदातील प्रतिकारशक्ती वाढवणारी (Vaccination) अत्यंत प्राचीन पद्धत आहे.",
        core: "पुष्य नक्षत्राच्या दिवशी सोन्याचे कण, मध आणि औषधी वनस्पतींचे मिश्रण बाळाला दिले जाते. यामुळे बुद्धी आणि ताकद दोन्ही वाढतात.",
        clinical: "सुवर्णप्राशन घेणाऱ्या मुलांमध्ये सर्दी, खोकला आणि पचनाचे आजार ५०% कमी आढळतात. हे मुलांच्या संपूर्ण विकासासाठी एक 'सुरक्षा कवच' आहे."
      }
    },
    't015': {
      intro: "**Emergency Pediatric Care** covers handling acute poisoning, dehydration, and high fever (Hyperpyrexia) in children.",
      core: "Priorities are preserving the 'Prana' (life force). Using 'Sheetala' (cooling) measures for high fever and rapid 'Srotas-cleaning' for poisoning. Children's dosage is calculated using 'Anguli-pramana' or age-based rules.",
      clinical: "In a pediatric emergency, we use **Mrityunjaya Rasa** for severe fevers. Stabilizing the heart and brain is first. We always advise parents to have a 'Bala-Koshtha' (Ayurvedic first aid kit) at home for immediate intervention before reaching a hospital.",
      marathi: {
        intro: "**आणीबाणीची बालचिकित्सा** यामध्ये विषबाधा, पाण्याची तीव्र कमतरता आणि खूप ताप (Hyperpyrexia) अशा स्थितींचा समावेश होतो.",
        core: "अशा वेळी बाळाचा जीव वाचवणे हे प्रथम कर्तव्य असते. तापासाठी 'शीतल' पाचरणा केली जाते आणि औषधांचा डोस वयानुसार ठरवला जातो.",
        clinical: "तीव्र तापात मेंदूचे संरक्षण करण्यासाठी डोक्यावर थंड पाण्याच्या पट्ट्या ठेवणे आवश्यक आहे. पालकांनी घरात अशा वेळी प्राथमिक आयुर्वेदिक औषधे ठेवणे आवश्यक आहे."
      }
    }
  },
  'swasthavritta': {
    't001': {
      intro: "**Swasthavritta** is the 'Science of Healthy Living', focusing on staying healthy through lifestyle and diet rather than curing disease.",
      core: "The definition of health (Swastha) is: **Sama Dosha, Sama Agni, Sama Dhatu, Mala Kriya, Prasanna Atma-Indriya-Manas**. It's a holistic state of balanced biology, balanced digestion, efficient elimination, and a joyful soul/mind.",
      clinical: "In our clinic, the first session with any patient is a 'Swasthavritta Assessment'. We identify their 'Prakriti' and show them how their current lifestyle deviates from the natural rhythm. This is 'Preventive Medicine' at its finest.",
      marathi: {
        intro: "**स्वस्थवृत्त** म्हणजे निरोगी राहण्याचे शास्त्र. आजार झाल्यावर उपचार करण्यापेक्षा आजार होऊच नये, यावर येथे भर दिला जातो.",
        core: "आरोग्य म्हणजे केवळ आजार नसणे नव्हे, तर दोष, अग्नी आणि धातूंचे संतुलन असणे आणि मन प्रसन्न असणे होय.",
        clinical: "आमच्याकडे येणाऱ्या प्रत्येक वैद्याला आम्ही त्याच्या 'प्रकृती' नुसार जीवनशैली सुचवतो, ज्यामुळे त्याला भविष्यकाळात आजार होणार नाहीत."
      }
    },
    't002': {
      intro: "**Dinacharya** (Daily Regimen) outlines the optimal schedule for a human being from waking up before sunrise to sleeping at night.",
      core: "Includes: **Brahmi Muhurta** waking, **Anjana** (eye care), **Nasya** (nose care), **Gandusha** (oil pulling), **Abhyanga** (massage), and **Vyayama** (exercise). These align the biological clock with the Earth's circadian rhythm.",
      clinical: "We find that 90% of chronic acidity and sleep issues are cured just by implementing the first 3 hours of Dinacharya. For example, 'Gandusha' not only helps teeth but prevents throat infections and improves facial glow.",
      marathi: {
        intro: "**दिनचर्या** म्हणजे सूर्योदयापासून ते रात्री झोपेपर्यंत पाळायचा आदर्श दिनक्रम.",
        core: "ब्रह्ममुहूर्तावर उठणे, डोळ्यांत अंजन घालणे, अभ्यंग (मालीश) आणि व्यायाम यांचा यात समावेश होतो. यामुळे शरीर निसर्गाच्या चक्राशी जुळवून घेते.",
        clinical: "अनेक जुनाट आजार केवळ दिनचर्या बदलल्यामुळे बरे होतात. दात घासण्यासाठी कडू काष्ठे वापरल्यामुळे तोंडाचे आरोग्य सुधारते."
      }
    },
    't003': {
      intro: "**Ritucharya** (Seasonal Regimen) adjusts our health practices based on the six Indian seasons—Vasanta, Grishma, Varsha, Sharad, Hemanta, and Shishira.",
      core: "Doshas naturally accumulate (Chaya) and aggravate (Prakopa) with seasons. For example, Pitta aggravates in **Sharad** (Autumn), requiring cooling foods. Vata aggravates in **Varsha** (Monsoon), requiring warm, oily foods.",
      clinical: "We provide seasonal 'Detox' plans. Performing **Virechana** in Sharad Ritu prevents skin diseases and allergies for the rest of the year. This 'Proactive Maintenance' prevents'Janapadodhwansa' (epidemic-like seasonal outbreaks).",
      marathi: {
        intro: "**ऋतुचर्या** म्हणजे सहा ऋतूंनुसार आहारात आणि विहारात करायचे बदल.",
        core: "ऋतूंनुसार शरीरातील दोष कमी-जास्त होतात. पावसाळ्यात वात वाढतो, तर शरद ऋतूत पित्त वाढते. त्यानुसार आहार बदलणे गरजेचे असते.",
        clinical: "शरद ऋतूत आम्ही आवर्जून **विरेचन** (पोट साफ करणे) सुचवतो, ज्यामुळे वर्षभर त्वचेचे आजार होत नाहीत."
      }
    },
    't004': {
      intro: "**Dietetics (Ahara-vidhi)** is the most important 'Upasthambha' (pillar) of life. It’s not just *what* you eat, but *how* and *when* you eat.",
      core: "Rules include: Eat only when hungry, eat warm food, avoid incompatible foods (**Viruddha Ahara** like milk and fish), and leave 1/4th of the stomach empty for air. The mind should be calm and focused on the food.",
      clinical: "We treat 'Incompatible Food' as a major toxin. Many chronic skin and autoimmune diseases are traced back to daily consumption of Viruddha Ahara (like fruit milkshakes). Correcting the 'Eating Method' is the first step in any chikitsa.",
      marathi: {
        intro: "**आहार-विधी** म्हणजे केवळ काय खावे हे नव्हे, तर कसे आणि केव्हा खावे, याचे मार्गदर्शन.",
        core: "भूक लागल्यावरच जेवणे, ताजे आणि गरम अन्न खाणे आणि विरुद्ध-आहार (उदा. दूध आणि फळे एकत्र खाणे) टाळणे हे नियम पाळले जातात.",
        clinical: "आजचे बहुतेक त्वचा रोग आणि ॲलर्जी हे विरुद्ध-आहारामुळे होतात. जेवताना मन शांत असणे पचनासाठी अत्यंत महत्त्वाचे आहे."
      }
    },
    't005': {
      intro: "**Sleep and Celibacy** (Nidra and Brahmacharya) are the two other pillars supporting health. Sleep is the 'Nurse' of the world, providing repair.",
      core: "Optimal sleep is 6-8 hours at night. Day sleep (**Diva-swapna**) aggravates Kapha and is only allowed in summer. **Brahmacharya** (controlled sexual energy) preserves **Ojas** and mental clarity.",
      clinical: "For patients with 'Burnout', we prescribe 'Early Sleep and No Digital Screen' post-8 PM. Preserving Ojas through Brahmacharya is recommended for students to improve memory and students of BAMS are encouraged to practice this for academic excellence.",
      marathi: {
        intro: "**निद्रा आणि ब्रह्मचर्य** हे आरोग्याचे दोन मुख्य आधारस्तंभ आहेत. झोप ही शरीराची जणू काही 'धात्री' (नर्स) आहे.",
        core: "रात्री ६ ते ८ तासांची शांत झोप ऊतींच्या दुरुस्तीसाठी आवश्यक आहे. दिवसा झोपल्याने कफ वाढतो. ब्रह्मचर्य पाळल्यामुळे मानसिक शक्ती आणि ओज वाढते.",
        clinical: "ज्यांना खूप थकवा जाणवतो, त्यांना आम्ही रात्री लवकर झोपण्याचा सल्ला देतो. अभ्यासात प्रगती करण्यासाठी विद्यार्थ्यांनी ब्रह्मचर्याचे पालन करणे हिताचे आहे."
      }
    },
    't006': {
      intro: "**Concept of Vega** (Urges) covers the 13 non-suppressible natural urges like hunger, thirst, sleep, and waste elimination.",
      core: "The root of all disease is **Vegadharana** (suppressing these urges). For example, suppressing the urge to sneeze leads to headaches; suppressing the urge to pass urine leads to kidney stones and Vata-imbalance.",
      clinical: "During history-taking, we ask about 'Urge Suppression'. We educate patients that 'Urgency is Priority'. No amount of medicine can fix a headache if the patient continues to suppress their bowel movements or natural sleep drive.",
      marathi: {
        intro: "**वेगांचे महत्त्व** यामध्ये भूक, तहान, झोप आणि नैसर्गिक विधी (लघवी, शौच) या १३ वेगांचा समावेश होतो.",
        core: "हे नैसर्गिक वेग रोखून धरल्यामुळे (वेगावरोध) आजारांची निर्मिती होते. उदाहरणार्थ, शौचाचा वेग रोखल्यामुळे डोकेदुखी आणि पाठदुखी होऊ शकते.",
        clinical: "आम्ही रुग्णाला 'निसर्गाची हाक' प्रथम पाळण्यास सांगतो. वेग रोखल्यामुळे होणारे आजार औषधांनी कायमचे बरे होत नाहीत."
      }
    },
    't007': {
      intro: "**Social Health (Janapadodhvansa)** focuses on the health of the community, influenced by the air, water, land, and time.",
      core: "Large-scale diseases happen when people collectively engage in 'Adharma' (unethical living) and environmental destruction. It describes 'Purification of Earth' and 'Water' as community responsibilities.",
      clinical: "During pandemics, we focus on **Dhupana** (fumigation of public spaces) and **Naso-protectives**. Community health in Ayurveda is about maintaining the 'Ethical Ecology' to prevent the group-vitiation of the elements.",
      marathi: {
        intro: "**सामाजिक स्वास्थ्य** (Janapadodhvansa) म्हणजे संपूर्ण समाजाचे आणि पर्यावरणाचे आरोग्य.",
        core: "जेव्हा हवा, पाणी आणि जमीन एकत्रितपणे दूषित होते, तेव्हा महामाऱ्या पसरतात. निसर्गाचे संरक्षण करणे ही प्रत्येकाची जबाबदारी आहे.",
        clinical: "महामारीच्या काळात परिसर स्वच्छ ठेवणे आणि औषधी धूर (धूपन) करणे यावर आम्ही भर देतो. सामाजिक आरोग्य हे व्यक्तिगत आरोग्याचा पाया आहे."
      }
    },
    't008': {
      intro: "**Occupational Health** in Ayurveda addresses the specific diseases caused by one's trade, from manual labor to desk-jobs.",
      core: "Sedentary work causes **Kapha-Medas** buildup. Fieldwork causes **Vata-Pitta** depletion. Includes 'Vihara' (exercise) tailored to counter the daily physical stress of one's profession.",
      clinical: "For IT professionals, we prescribe **Netra-Tarpana** and 'Neck-stretching'. For construction workers, we suggest 'Nourishing Lepas'. This ensures that a person's livelihood doesn't become the cause of their death.",
      marathi: {
        intro: "**व्यावसायिक स्वास्थ्य** (Occupational Health) म्हणजे तुम्ही करत असलेल्या कामामुळे होणारे आजार टाळण्याचे शास्त्र.",
        core: "बैठे काम करणाऱ्यांचा कफ वाढतो, तर कष्टाचे काम करणाऱ्यांचा वात वाढतो. त्यानुसार व्यायाम आणि आहाराचे नियोजन केले जाते.",
        clinical: "कॉम्प्युटरवर काम करणाऱ्यांनी नियमितपणे **नेत्र-तर्पण** करावे आणि मानेची हालचाल करावी, जेणेकरून स्पाँडिलायटीस टाळता येईल."
      }
    },
    't009': {
      intro: "**Principles of Yoga and Pranayama** are the 'Mental Swasthavritta', providing control over the mind and the vital breath.",
      core: "Yoga is **Chitta-vritti-nirodha** (control of mind fluctuations). **Pranayama** (breath control) purifies the 'Pranavaha Srotas'. Breath is the bridge between the physical 'Annamaya Kosha' and the mental 'Manomaya Kosha'.",
      clinical: "For anxiety and hypertension, we use **Nadi Shodhana** (alternate nostril breathing). It balances the sympathetic and parasympathetic nervous systems without drugs. We integrate 15 mins of Yoga as a standard 'Prescription' for metabolic health.",
      marathi: {
        intro: "**योग आणि प्राणायाम** हे मनाच्या स्वास्थ्यासाठी आणि श्वासाच्या शुद्धीसाठी महत्त्वाचे आहेत.",
        core: "योगामुळे मनावर नियंत्रण येते, तर प्राणायामामुळे फुफ्फुसांची क्षमता वाढते. श्वास हा शरीर आणि मनाला जोडणारा दुवा आहे.",
        clinical: "रक्तदाब आणि तणावासाठी आम्ही **नाडी-शोधन** प्राणायाम सुचवतो. दिवसातून १५ मिनिटे योगासने केल्याने चयापचय क्रिया सुधारते."
      }
    },
    't010': {
      intro: "**Shat-karma** (Yogic Cleansing) are the six purification techniques: Neti, Dhauti, Basti, Nauli, Kapalabhati, and Trataka.",
      core: "**Neti** cleans the nose. **Trataka** improves vision and focus. **Kapalabhati** cleans the lungs and burns fat. Unlike Panchakarma (clinical), Shat-karma is for daily/weekly maintenance for a healthy person.",
      clinical: "We teach 'Jala Neti' for chronic sardi and sinus issues. 'Vamana Dhauti' (vomiting warm water) is excellent for clearing morning 'Kapha' and acid from the stomach. This 'Inner Hygiene' prevents the need for major hospital visits.",
      marathi: {
        intro: "**षट्कर्म** म्हणजे योगातील शरीर शुद्धीच्या सहा प्रक्रिया: नेती, धौती, बस्ती, नौली, कपालभाती आणि त्राटक.",
        core: "**नेती** नाकाची स्वच्छता करते, **त्राटक** दृष्टी सुधारते und **कपालभाती** शरीरातील अतिरिक्त चरबी कमी करण्यास मदत करते.",
        clinical: "जुनाट सर्दीसाठी 'जल-नेती' हा उत्तम पर्याय आहे. एसिडिटी कमी करण्यासाठी आम्ही 'वमन-धौती' (कोमट पाणी पिऊन उलटी करणे) सुचवतो."
      }
    },
    't011': {
      intro: "**Asanas** are physical postures that provide 'Sthiram Sukham' (stability and ease) to the physical body.",
      core: "Targeted Asanas like **Surya Namaskar** provide a full-body workout. **Paschimottanasana** improves digestion. **Vajrasana** is the only asana allowed after meals to help the Agni. Each posture affects specific 'Marmas' and 'Srotas'.",
      clinical: "For back pain, we prescribe 'Bhujangasana'. For diabetes, 'Mandukasana'. Asanas are not just for flexibility but for 'Internal Massage' of the organs to maintain their anatomical and functional integrity.",
      marathi: {
        intro: "**आसने** म्हणजे शरीराला स्थिरता आणि सुख देणाऱ्या शारीरिक स्थिती.",
        core: "**सूर्यनमस्कार** हा सर्वांगीण व्यायामाचा प्रकार आहे. **वज्रासन** हे जेवणानंतर लगेच केले जाणारे एकमेव आसन आहे, जे पचन सुधारते.",
        clinical: "पाठदुखीसाठी **भुजंगासन** आणि मधुमेहासाठी (Diabetes) **मंडुकासन** आम्ही व्यायामात सुचवतो. यामुळे संबंधित अवयवांना मालीश मिळते."
      }
    },
    't012': {
      intro: "**Meditation (Dhyana)** is the highest form of mental preventive care, ensuring 'Prasanna Atma-Indriya-Manas'.",
      core: "It's the process of sustained internal focus. It reduces 'Rajas' (restlessness) and 'Tamas' (dullness) of the mind, increasing 'Sattva' (clarity). Scientifically, it lowers cortisol and improves cellular repair.",
      clinical: "In our 'Wellness Clinic', we teach **Vipassana** or simple Breath-awareness. For chronic stress-related eczema, Dhyana is more effective than any topical cream. It addresses the 'root' of psychological inflammation.",
      marathi: {
        intro: "**ध्यान (Meditation)** हा मनाच्या आरामासाठी आणि एकाग्रतेसाठी सर्वोत्तम मार्ग आहे.",
        core: "ध्यानामुळे मनातील अनावश्यक विचार कमी होतात आणि बुद्धी स्थिर होते. यामुळे रक्तातील तणावाची संप्रेरके (Cortisol) कमी होतात.",
        clinical: "तणावामुळे होणाऱ्या आजारांवर औषधांपेक्षा ध्यानधारणा जास्त प्रभावी ठरते. आम्ही रुग्णांना दररोज १० मिनिटे श्वसनावर लक्ष केंद्रित करण्यास सांगतो."
      }
    },
    't013': {
      intro: "**Naturopathy and Ayurveda** share the concept of healing through the five elements (**Pancha-Mahabhuta**), using mud, sun, water, and air.",
      core: "Includes **Mrittika Chikitsa** (Mud therapy) for heat reduction and **Suryakirana-chikitsa** (Chromotherapy). It is based on the idea that the body has an 'Inherent Intelligence' to heal itself if provided with an elemental balance.",
      clinical: "We use 'Mud packs' for severe skin inflammation and 'Sun-bath' for Vitamin D and Kapha-reduction. It is a cost-effective way to supplement Ayurvedic medicine, especially in rural settings.",
      marathi: {
        intro: "**निसर्गोपचार आणि आयुर्वेद** पंचमहाभूतांच्या (हवा, पाणी, जमीन, अग्नी, आकाश) सहाय्याने उपचारांवर भर देतात.",
        core: "यामध्ये **मृत्तिका चिकित्सा** (माती चिखलाचे लेप) आणि सूर्यप्रकाशाचा वापर केला जातो. शरीरात स्वतःहून बरे होण्याची शक्ती असते, हे याचे मूळ तत्व आहे.",
        clinical: "त्वचेच्या जळजळीवर आम्ही मातीचे लेप सुचवतो आणि व्हिटॅमिन-डी च्या कमतरतेवर सूर्यस्नान (Sunbath) करायला सांगतो."
      }
    },
    't014': {
      intro: "**Global Health and Ayurveda** looks at the application of Swasthavritta in managing global lifestyle pandemics like Obesity, Diabetes, and Heart Disease.",
      core: "The world is shifting from 'Curative' to 'Preventive'. Ayurveda's 'Personalized Lifestyle' (Prakriti-based) is the answer to the failed 'One size fits all' modern public health model.",
      clinical: "We present case studies of 'Reversing Lifestyle Diseases' through just Dinacharya and Yoga. Global organizations like WHO are now recognizing the 'Swasthavritta' principles as the best template for healthy aging.",
      marathi: {
        intro: "**जागतिक आरोग्य आणि आयुर्वेद** आजच्या जीवनशैलीतील आजारांवर (Obesity, Heart Disease) आयुर्वेदाचे उपाय अधोरेखित करतात.",
        core: "आज जग 'उपचारांपेक्षा प्रतिबंधा' कडे वळत आहे. प्रत्येकाची प्रकृती वेगळी असते, या आयुर्वेदिक सिद्धांताचे जागतिक स्तरावर स्वागत होत आहे.",
        clinical: "जागतिक आरोग्य संघटना (WHO) देखील आता आयुर्वेदातील स्वस्थवृत्ताचे नियम मान्य करत आहे. निरामय वृद्धत्वासाठी हे नियम महत्त्वाचे आहेत."
      }
    },
    't015': {
      intro: "**Geriatric Preventive Care** (Jara-Swasthavritta) focuses on maintaining life quality in the elderly (above 60).",
      core: "Focuses on **Rasayana** and preventing 'Vata' from causing bones to become brittle. It emphasizes 'Sushupti' (quality sleep) and 'Mridu Sahasa' (gentle movement) to keep the joints mobile.",
      clinical: "Daily **Pada-abhyanga** (foot massage with ghee) for the elderly prevents cataract and insomnia. We use **Chyavanprash** as a daily immunity shield for our senior patients, ensuring they stay active and independent.",
      marathi: {
        intro: "**वृद्धावस्थेतील काळजी (Geriatrics)** यामध्ये ६० वर्षांवरील व्यक्तींचे आरोग्य टिकवून ठेवण्यावर लक्ष दिले जाते.",
        core: "या वयात वात दोष वाढल्याने हाडे ठिसूळ होतात. यामुळे **रसायन चिकित्सा** आणि हलका व्यायाम आवश्यक असतो.",
        clinical: "**च्यवनप्राश** हे वृद्धांसाठी उत्तम प्रतिकारशक्ती वाढवणारे औषध आहे. रात्री पायांच्या तळव्यांना तूप लावल्यामुळे चांगली झोप लागते आणि दृष्टी सुधारते."
      }
    }
  }
};

module.exports = { SUBJECT_CONTENT_DATA };
