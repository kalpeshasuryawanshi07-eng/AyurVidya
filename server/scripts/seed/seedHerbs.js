const Herb = require('../../models/Herb');
const { connect, disconnect } = require('./db');
const HERBS = [
  {
    "slug": "ashwagandha",
    "commonName": "Ashwagandha",
    "commonNameMr": "अश्वगंधा",
    "botanicalName": "Withania somnifera (L.) Dunal",
    "family": "Solanaceae",
    "about": {
      "en": "Adaptogenic powerhouse for stress and strength.",
      "mr": "तणाव आणि शक्तीसाठी औषधांचा राजा."
    },
    "rasa": [
      "tikta",
      "kashaya",
      "madhura"
    ],
    "guna": [
      "laghu",
      "snigdha"
    ],
    "virya": "hot",
    "vipaka": "madhura",
    "doshaEffect": {
      "vata": "balances",
      "pitta": "increases",
      "kapha": "balances"
    },
    "classicalKarmas": [
      {
        "name": {
          "en": "Balya",
          "mr": "बल्य"
        },
        "details": {
          "en": "Increases strength",
          "mr": "शक्ती वाढवणारे"
        }
      },
      {
        "name": {
          "en": "Vajikarana",
          "mr": "वाजीकरण"
        },
        "details": {
          "en": "Aphrodisiac",
          "mr": "कामोत्तेजक"
        }
      }
    ],
    "formulations": [
      {
        "name": {
          "en": "Ashwagandhadi Churna",
          "mr": "अश्वगंधादी चूर्ण"
        },
        "details": {
          "en": "3-6g with milk",
          "mr": "३-६ ग्रॅम दुधासोबत"
        }
      },
      {
        "name": {
          "en": "Ashwagandharishta",
          "mr": "अश्वगंधारिष्ट"
        },
        "details": {
          "en": "20ml after meals",
          "mr": "२० मिली जेवणानंतर"
        }
      }
    ],
    "phytochemistry": [
      {
        "name": {
          "en": "Withanolides",
          "mr": "विथानोलाइट्स"
        },
        "details": {
          "en": "Primary markers",
          "mr": "मुख्य घटक"
        }
      }
    ],
    "medicinalUses": "Used for stress, fatigue, and muscle building.",
    "category": "Balya"
  },
  {
    "slug": "guduchi",
    "commonName": "Guduchi",
    "commonNameMr": "गुळवेल",
    "botanicalName": "Tinospora cordifolia (Willd.) Hook. f. & Thoms.",
    "family": "Menispermaceae",
    "about": {
      "en": "Celebrated as Amrita (Nectar) for its exceptional immunomodulatory actions.",
      "mr": "अमृता - श्रेष्ठ रोगप्रतिकारक शक्तीवर्धक."
    },
    "rasa": [
      "tikta",
      "kashaya"
    ],
    "guna": [
      "laghu",
      "snigdha"
    ],
    "virya": "hot",
    "vipaka": "madhura",
    "doshaEffect": {
      "vata": "balances",
      "pitta": "balances",
      "kapha": "balances"
    },
    "classicalKarmas": [
      {
        "name": {
          "en": "Jwaraghna",
          "mr": "ज्वरघ्न"
        },
        "details": {
          "en": "Alleviates fever",
          "mr": "ताप कमी करणारे"
        }
      },
      {
        "name": {
          "en": "Hridya",
          "mr": "हृद्य"
        },
        "details": {
          "en": "Cardio-tonic",
          "mr": "हृदयासाठी हितकर"
        }
      }
    ],
    "formulations": [
      {
        "name": {
          "en": "Sanshamani Vati",
          "mr": "संशमनी वटी"
        },
        "details": {
          "en": "2 tabs for fever",
          "mr": "तापासाठी २ गोळ्या"
        }
      },
      {
        "name": {
          "en": "Guduchi Ghanavati",
          "mr": "गुळवेल घनवटी"
        },
        "details": {
          "en": "Vati for immunity",
          "mr": "रोगप्रतिकारक शक्ती"
        }
      }
    ],
    "phytochemistry": [
      {
        "name": {
          "en": "Tinosporine",
          "mr": "टिनोस्पोरिन"
        },
        "details": {
          "en": "Alkaloid",
          "mr": "अल्कलॉइड"
        }
      }
    ],
    "medicinalUses": "Immunity booster, fever, gout, and skin diseases.",
    "category": "Rasayana"
  },
  {
    "slug": "amalaki",
    "commonName": "Amalaki",
    "commonNameMr": "आवळा",
    "botanicalName": "Phyllanthus emblica L.",
    "family": "Euphorbiaceae",
    "about": {
      "en": "Richest source of Vitamin C and the ultimate anti-aging superfruit.",
      "mr": "व्हिटॅमिन सी चा समृद्ध नैसर्गिक स्रोत."
    },
    "rasa": [
      "pancharasa"
    ],
    "guna": [
      "guru",
      "sheeta"
    ],
    "virya": "cold",
    "vipaka": "madhura",
    "doshaEffect": {
      "vata": "balances",
      "pitta": "balances",
      "kapha": "balances"
    },
    "classicalKarmas": [
      {
        "name": {
          "en": "Chakshushya",
          "mr": "चक्षुष्य"
        },
        "details": {
          "en": "Good for eyes",
          "mr": "डोळ्यांसाठी उपयुक्त"
        }
      },
      {
        "name": {
          "en": "Vrishya",
          "mr": "वृष्य"
        },
        "details": {
          "en": "Aphrodisiac",
          "mr": "कामोत्तेजक"
        }
      }
    ],
    "formulations": [
      {
        "name": {
          "en": "Chyawanprash",
          "mr": "च्यवनप्राश"
        },
        "details": {
          "en": "Nutritional tonic",
          "mr": "पोषण टॉनिक"
        }
      },
      {
        "name": {
          "en": "Amalaki Churna",
          "mr": "आमलाकी चूर्ण"
        },
        "details": {
          "en": "For digestion",
          "mr": "पचनासाठी"
        }
      }
    ],
    "phytochemistry": [
      {
        "name": {
          "en": "Ascorbic Acid",
          "mr": "एस्कॉर्बिक ॲसिड"
        },
        "details": {
          "en": "Vitamin C",
          "mr": "व्हिटॅमिन सी"
        }
      }
    ],
    "medicinalUses": "Hair health, digestion, immunity, and skin care.",
    "category": "Rasayana"
  },
  {
    "slug": "brahmi",
    "commonName": "Brahmi",
    "commonNameMr": "ब्राह्मी",
    "botanicalName": "Bacopa monnieri (L.) Pennell",
    "family": "Plantaginaceae",
    "about": {
      "en": "Premier brain health tonic (Medhya Rasayana).",
      "mr": "मेंदूच्या आरोग्यासाठी श्रेष्ठ रसायन."
    },
    "rasa": [
      "tikta"
    ],
    "guna": [
      "laghu"
    ],
    "virya": "cold",
    "vipaka": "madhura",
    "doshaEffect": {
      "vata": "balances",
      "pitta": "balances",
      "kapha": "balances"
    },
    "classicalKarmas": [
      {
        "name": {
          "en": "Medhya",
          "mr": "मेध्य"
        },
        "details": {
          "en": "Cognitive enhancer",
          "mr": "स्मरणशक्ती वाढवणारे"
        }
      },
      {
        "name": {
          "en": "Shothahara",
          "mr": "शोथहर"
        },
        "details": {
          "en": "Anti-inflammatory",
          "mr": "सूज कमी करणारे"
        }
      }
    ],
    "formulations": [
      {
        "name": {
          "en": "Brahmi Ghrita",
          "mr": "ब्राह्मी घृत"
        },
        "details": {
          "en": "Brain tonic ghee",
          "mr": "स्मरणशक्तीसाठी तूप"
        }
      },
      {
        "name": {
          "en": "Brahmi Vati",
          "mr": "ब्राह्मी वटी"
        },
        "details": {
          "en": "Stress relief tab",
          "mr": "तणावमुक्ती गोळी"
        }
      }
    ],
    "phytochemistry": [
      {
        "name": {
          "en": "Bacosides A & B",
          "mr": "बॅकोसाइड्स ए आणि बी"
        },
        "details": {
          "en": "Memory boosters",
          "mr": "स्मरणशक्ती वाढवणारे"
        }
      }
    ],
    "medicinalUses": "Memory loss, anxiety, concentration, and ADHD.",
    "category": "Medhya"
  },
  {
    "slug": "shatavari",
    "commonName": "Shatavari",
    "commonNameMr": "शतावरी",
    "botanicalName": "Asparagus racemosus Willd.",
    "family": "Asparagaceae",
    "about": {
      "en": "Known as the \"Queen of Herbs\" for female hormonal balance.",
      "mr": "स्त्री आरोग्यासाठी \"वनस्पतींची राणी\"."
    },
    "rasa": [
      "madhura",
      "tikta"
    ],
    "guna": [
      "guru",
      "snigdha"
    ],
    "virya": "cold",
    "vipaka": "madhura",
    "doshaEffect": {
      "vata": "balances",
      "pitta": "balances",
      "kapha": "increases"
    },
    "classicalKarmas": [
      {
        "name": {
          "en": "Stanyajanana",
          "mr": "स्तन्यजनन"
        },
        "details": {
          "en": "Galactagogue",
          "mr": "दूध वाढवणारे"
        }
      },
      {
        "name": {
          "en": "Jeevalya",
          "mr": "जीवल्य"
        },
        "details": {
          "en": "Vitalizer",
          "mr": "शक्ती वाढवणारे"
        }
      }
    ],
    "formulations": [
      {
        "name": {
          "en": "Shatavari Gulam",
          "mr": "शतावरी गुलम"
        },
        "details": {
          "en": "Hormonal tonic",
          "mr": "हार्मोनल टॉनिक"
        }
      },
      {
        "name": {
          "en": "Shatavari Kalpa",
          "mr": "शतावरी कल्प"
        },
        "details": {
          "en": "Daily health powder",
          "mr": "दैनिक आरोग्य पावडर"
        }
      }
    ],
    "phytochemistry": [
      {
        "name": {
          "en": "Shatavarins",
          "mr": "शतावरिन्स"
        },
        "details": {
          "en": "Steroidal saponins",
          "mr": "सॅपोनिन"
        }
      }
    ],
    "medicinalUses": "Female vitality, lactation, ulcers, and acid reflux.",
    "category": "Jeevalya"
  },
  {
    "slug": "haritaki",
    "commonName": "Haritaki",
    "commonNameMr": "हिरडा",
    "botanicalName": "Terminalia chebula Retz.",
    "family": "Combretaceae",
    "about": {
      "en": "Venerated as the \"Mother of Herbs\" for universal healing.",
      "mr": "आरोग्यासाठी \"औषधांची माता\"."
    },
    "rasa": [
      "pancharasa"
    ],
    "guna": [
      "laghu",
      "ruksha"
    ],
    "virya": "hot",
    "vipaka": "madhura",
    "doshaEffect": {
      "vata": "balances",
      "pitta": "balances",
      "kapha": "balances"
    },
    "classicalKarmas": [
      {
        "name": {
          "en": "Anulomana",
          "mr": "अनुलोमन"
        },
        "details": {
          "en": "Mild laxative",
          "mr": "मृदु रेचक"
        }
      },
      {
        "name": {
          "en": "Dipana",
          "mr": "दीपन"
        },
        "details": {
          "en": "Appetizer",
          "mr": "भूक वाढवणारे"
        }
      }
    ],
    "formulations": [
      {
        "name": {
          "en": "Triphala Churna",
          "mr": "त्रिफळा चूर्ण"
        },
        "details": {
          "en": "Detox powder",
          "mr": "विषहारक चूर्ण"
        }
      },
      {
        "name": {
          "en": "Abhayarishta",
          "mr": "अभयारिष्ट"
        },
        "details": {
          "en": "For digestion",
          "mr": "पचनासाठी"
        }
      }
    ],
    "phytochemistry": [
      {
        "name": {
          "en": "Chebulagic Acid",
          "mr": "चेबुलॅजिक ॲसिड"
        },
        "details": {
          "en": "Tannins",
          "mr": "टॅनिन्स"
        }
      }
    ],
    "medicinalUses": "Constipation, detox, vision, and metabolic health.",
    "category": "Anulomana"
  },
  {
    "slug": "bibhitaki",
    "commonName": "Bibhitaki",
    "commonNameMr": "बेहडा",
    "botanicalName": "Terminalia bellirica (Gaertn.) Roxb.",
    "family": "Combretaceae",
    "about": {
      "en": "Primary herb for respiratory and throat conditions.",
      "mr": "श्वसन संस्था आणि घशासाठी उपयुक्त."
    },
    "rasa": [
      "kashaya"
    ],
    "guna": [
      "laghu",
      "ruksha"
    ],
    "virya": "hot",
    "vipaka": "madhura",
    "doshaEffect": {
      "vata": "balances",
      "pitta": "balances",
      "kapha": "decreases"
    },
    "classicalKarmas": [
      {
        "name": {
          "en": "Bhedana",
          "mr": "भेदन"
        },
        "details": {
          "en": "Purgative",
          "mr": "रेचक"
        }
      },
      {
        "name": {
          "en": "Kasaghna",
          "mr": "कासघ्न"
        },
        "details": {
          "en": "Cough reliever",
          "mr": "खोकला कमी करणारे"
        }
      }
    ],
    "formulations": [
      {
        "name": {
          "en": "Bibhitaki Churna",
          "mr": "बेहडा चूर्ण"
        },
        "details": {
          "en": "Daily dose",
          "mr": "दैनिक चूर्ण"
        }
      }
    ],
    "phytochemistry": [
      {
        "name": {
          "en": "Gallagic Acid",
          "mr": "गॅलॅजिक ॲसिड"
        },
        "details": {
          "en": "Antioxidant",
          "mr": "अँटिऑक्सिडंट"
        }
      }
    ],
    "medicinalUses": "Cough, asthma, hair health, and metabolic balance.",
    "category": "Bhedana"
  },
  {
    "slug": "gokshura",
    "commonName": "Gokshura",
    "commonNameMr": "गोखरु",
    "botanicalName": "Tribulus terrestris L.",
    "family": "Zygophyllaceae",
    "about": {
      "en": "Premier herb for urinary and reproductive health.",
      "mr": "मूत्र आणि प्रजनन आरोग्यासाठी श्रेष्ठ."
    },
    "rasa": [
      "madhura"
    ],
    "guna": [
      "guru",
      "snigdha"
    ],
    "virya": "cold",
    "vipaka": "madhura",
    "doshaEffect": {
      "vata": "balances",
      "pitta": "balances",
      "kapha": "balances"
    },
    "classicalKarmas": [
      {
        "name": {
          "en": "Mootrala",
          "mr": "मूत्रल"
        },
        "details": {
          "en": "Diuretic",
          "mr": "लघवी साफ करणारे"
        }
      },
      {
        "name": {
          "en": "Vrishya",
          "mr": "वृष्य"
        },
        "details": {
          "en": "Vitalizer",
          "mr": "शक्तीवर्धक"
        }
      }
    ],
    "formulations": [
      {
        "name": {
          "en": "Gokshuradi Guggulu",
          "mr": "गोक्षुरादी गुग्गुळ"
        },
        "details": {
          "en": "Kidney health",
          "mr": "मूत्र आरोग्यासाठी"
        }
      },
      {
        "name": {
          "en": "Gokshuradi Kwatha",
          "mr": "गोक्षुरादी काढा"
        },
        "details": {
          "en": "Diuretic decoction",
          "mr": "मूत्रल काढा"
        }
      }
    ],
    "phytochemistry": [
      {
        "name": {
          "en": "Saponins",
          "mr": "सॅपोनिन"
        },
        "details": {
          "en": "Active markers",
          "mr": "सक्रिय घटक"
        }
      }
    ],
    "medicinalUses": "Kidney stones, UTI, stamina, and body building.",
    "category": "Mootrala"
  },
  {
    "slug": "vasa",
    "commonName": "Vasa",
    "commonNameMr": "अडुळसा",
    "botanicalName": "Adhatoda vasica Nees",
    "family": "Acanthaceae",
    "about": {
      "en": "Traditional expectorant for chronic cough and asthma.",
      "mr": "खोकला आणि दमा यावर पारंपरिक औषध."
    },
    "rasa": [
      "tikta",
      "kashaya"
    ],
    "guna": [
      "laghu",
      "ruksha"
    ],
    "virya": "cold",
    "vipaka": "katu",
    "doshaEffect": {
      "vata": "increases",
      "pitta": "decreases",
      "kapha": "decreases"
    },
    "classicalKarmas": [
      {
        "name": {
          "en": "Kasaghna",
          "mr": "कासघ्न"
        },
        "details": {
          "en": "Cough reliever",
          "mr": "खोकला निवारक"
        }
      },
      {
        "name": {
          "en": "Raktapittahara",
          "mr": "रक्तपित्तहर"
        },
        "details": {
          "en": "Anti-hemorrhagic",
          "mr": "रक्तशामक"
        }
      }
    ],
    "formulations": [
      {
        "name": {
          "en": "Vasasava",
          "mr": "वासार्स्व"
        },
        "details": {
          "en": "Lungs health syrup",
          "mr": "फुफ्फुसांसाठी सिरप"
        }
      },
      {
        "name": {
          "en": "Vasa Avaleha",
          "mr": "वासा अवलेह"
        },
        "details": {
          "en": "Cough jam",
          "mr": "खोकल्यासाठी अवलेह"
        }
      }
    ],
    "phytochemistry": [
      {
        "name": {
          "en": "Vasicine",
          "mr": "वॅसिसिन"
        },
        "details": {
          "en": "Expectorant alkaloid",
          "mr": "कफनाशक घटक"
        }
      }
    ],
    "medicinalUses": "Bronchitis, tuberculosis, bleeding disorders, and fever.",
    "category": "Kasaghna"
  },
  {
    "slug": "tulsi",
    "commonName": "Tulsi",
    "commonNameMr": "तुळस",
    "botanicalName": "Ocimum sanctum L.",
    "family": "Lamiaceae",
    "about": {
      "en": "Holy Basil for immunity and spiritual wellness.",
      "mr": "रोगप्रतिकारक शक्ती आणि आरोग्यासाठी सुगंधी तुळस."
    },
    "rasa": [
      "katu",
      "tikta"
    ],
    "guna": [
      "laghu",
      "ruksha",
      "teekshna"
    ],
    "virya": "hot",
    "vipaka": "katu",
    "doshaEffect": {
      "vata": "balances",
      "pitta": "increases",
      "kapha": "decreases"
    },
    "classicalKarmas": [
      {
        "name": {
          "en": "Krimighna",
          "mr": "कृमिघ्न"
        },
        "details": {
          "en": "Antimicrobial",
          "mr": "जंतूनाशक"
        }
      },
      {
        "name": {
          "en": "Kasaghna",
          "mr": "कासघ्न"
        },
        "details": {
          "en": "Bronchodilator",
          "mr": "श्वासमार्ग मोकळा करणारे"
        }
      }
    ],
    "formulations": [
      {
        "name": {
          "en": "Tulsi Churna",
          "mr": "तुळस चूर्ण"
        },
        "details": {
          "en": "For common cold",
          "mr": "सर्दीसाठी"
        }
      },
      {
        "name": {
          "en": "Tulsi Ghanvati",
          "mr": "तुळस घनवटी"
        },
        "details": {
          "en": "Immunity tab",
          "mr": "इम्युनिटी टॅब"
        }
      }
    ],
    "phytochemistry": [
      {
        "name": {
          "en": "Eugenol",
          "mr": "युजेनॉल"
        },
        "details": {
          "en": "Volatile oil",
          "mr": "उडून जाणारे तेल"
        }
      }
    ],
    "medicinalUses": "Respiratory health, fever, stress, and detox.",
    "category": "Jwaraghna"
  },
  {
    "slug": "ginger",
    "commonName": "Shunthi",
    "commonNameMr": "सुंठ",
    "botanicalName": "Zingiber officinale Roscoe",
    "family": "Zingiberaceae",
    "about": {
      "en": "Universal medicine for overall digestive health.",
      "mr": "पचनासाठी \"विश्वभेषज\"."
    },
    "rasa": [
      "katu"
    ],
    "guna": [
      "laghu",
      "snigdha",
      "teekshna"
    ],
    "virya": "hot",
    "vipaka": "madhura",
    "doshaEffect": {
      "vata": "balances",
      "pitta": "increases",
      "kapha": "balances"
    },
    "classicalKarmas": [
      {
        "name": {
          "en": "Dipana",
          "mr": "दीपन"
        },
        "details": {
          "en": "Appetizer",
          "mr": "भूक वाढवणारे"
        }
      },
      {
        "name": {
          "en": "Pachana",
          "mr": "पाचन"
        },
        "details": {
          "en": "Digestive",
          "mr": "पाचक"
        }
      }
    ],
    "formulations": [
      {
        "name": {
          "en": "Saubhagya Sunthi",
          "mr": "सौभाग्य सुंठ"
        },
        "details": {
          "en": "Post-natal care",
          "mr": "बाळंतपणानंतर"
        }
      },
      {
        "name": {
          "en": "Trikatu Churna",
          "mr": "त्रिकटू चूर्ण"
        },
        "details": {
          "en": "Metabolic boost",
          "mr": "मेटाबॉलिजम"
        }
      }
    ],
    "phytochemistry": [
      {
        "name": {
          "en": "Gingerols",
          "mr": "जिंजरॉल"
        },
        "details": {
          "en": "Pungent principles",
          "mr": "तिखट घटक"
        }
      }
    ],
    "medicinalUses": "Indigestion, joint pain, common cold, and nausea.",
    "category": "Deepana"
  },
  {
    "slug": "pippali",
    "commonName": "Pippali",
    "commonNameMr": "पिंपळी",
    "botanicalName": "Piper longum L.",
    "family": "Piperaceae",
    "about": {
      "en": "Deeply rejuvenating for the respiratory system.",
      "mr": "श्वसनसंस्थेसाठी शक्तिशाली रसायन."
    },
    "rasa": [
      "katu"
    ],
    "guna": [
      "laghu",
      "snigdha",
      "teekshna"
    ],
    "virya": "anushna-sheeta",
    "vipaka": "madhura",
    "doshaEffect": {
      "vata": "balances",
      "pitta": "balances",
      "kapha": "balances"
    },
    "classicalKarmas": [
      {
        "name": {
          "en": "Rasayana",
          "mr": "रसायन"
        },
        "details": {
          "en": "Rejuvenator",
          "mr": "पुनरुज्जीवन करणारे"
        }
      },
      {
        "name": {
          "en": "Plihaghna",
          "mr": "प्लीहाघ्न"
        },
        "details": {
          "en": "Liver/Spleen support",
          "mr": "यकृत आरोग्य"
        }
      }
    ],
    "formulations": [
      {
        "name": {
          "en": "Pippali Asava",
          "mr": "पिंपळी आसव"
        },
        "details": {
          "en": "Digestive tonic",
          "mr": "पाचक टॉनिक"
        }
      },
      {
        "name": {
          "en": "Pippali Rasayana",
          "mr": "पिंपळी रसायन"
        },
        "details": {
          "en": "Lung tonic",
          "mr": "फुफ्फुसांसाठी रसायन"
        }
      }
    ],
    "phytochemistry": [
      {
        "name": {
          "en": "Piperine",
          "mr": "पिपेरिन"
        },
        "details": {
          "en": "Bio-enhancer",
          "mr": "शोषकता वाढवणारे"
        }
      }
    ],
    "medicinalUses": "Asthma, chronic bronchitis, obesity, and liver issues.",
    "category": "Rasayana"
  },
  {
    "slug": "maricha",
    "commonName": "Maricha",
    "commonNameMr": "काळे मिरे",
    "botanicalName": "Piper nigrum L.",
    "family": "Piperaceae",
    "about": {
      "en": "The logic-clearing bio-enhancer that detoxifies the heart and systems.",
      "mr": "शरीरातील विषारी घटक बाहेर काढणारे मिरे."
    },
    "rasa": [
      "katu"
    ],
    "guna": [
      "laghu",
      "ruksha",
      "teekshna"
    ],
    "virya": "hot",
    "vipaka": "katu",
    "doshaEffect": {
      "vata": "balances",
      "pitta": "increases",
      "kapha": "balances"
    },
    "classicalKarmas": [
      {
        "name": {
          "en": "Pramathi",
          "mr": "प्रमाथी"
        },
        "details": {
          "en": "Toxin remover",
          "mr": "विषहारक"
        }
      },
      {
        "name": {
          "en": "Chedana",
          "mr": "छेदन"
        },
        "details": {
          "en": "Congestion reliever",
          "mr": "कफ निवारक"
        }
      }
    ],
    "formulations": [
      {
        "name": {
          "en": "Marichadi Churna",
          "mr": "मरिचादी चूर्ण"
        },
        "details": {
          "en": "Sinus/Cold powder",
          "mr": "सर्दीसाठी चूर्ण"
        }
      }
    ],
    "phytochemistry": [
      {
        "name": {
          "en": "Piperamides",
          "mr": "पिपेरॅमाईड्स"
        },
        "details": {
          "en": "Metabolic markers",
          "mr": "मेटाबॉलिक घटक"
        }
      }
    ],
    "category": "Pramathi",
    "medicinalUses": "Cold, cough, obesity, and sinus congestion."
  },
  {
    "slug": "twak",
    "commonName": "Twak",
    "commonNameMr": "दालचिनी",
    "botanicalName": "Cinnamomum zeylanicum Blume",
    "family": "Lauraceae",
    "about": {
      "en": "Heart-warming bark used for flavor and metabolic control.",
      "mr": "हृदयासाठी आणि चयापचय क्रियेसाठी उपयुक्त सुगंधी साल."
    },
    "rasa": [
      "katu",
      "tikta",
      "madhura"
    ],
    "guna": [
      "laghu",
      "ruksha",
      "teekshna"
    ],
    "virya": "hot",
    "vipaka": "katu",
    "doshaEffect": {
      "vata": "balances",
      "pitta": "increases",
      "kapha": "balances"
    },
    "classicalKarmas": [
      {
        "name": {
          "en": "Hridya",
          "mr": "हृद्य"
        },
        "details": {
          "en": "Cardiac tonic",
          "mr": "हृदय बल्य"
        }
      },
      {
        "name": {
          "en": "Dipana",
          "mr": "दीपन"
        },
        "details": {
          "en": "Appetizer",
          "mr": "भूक वाढवणारे"
        }
      }
    ],
    "formulations": [
      {
        "name": {
          "en": "Twak Churna",
          "mr": "दालचिनी चूर्ण"
        },
        "details": {
          "en": "Sugar control",
          "mr": "साखर नियंत्रण"
        }
      }
    ],
    "phytochemistry": [
      {
        "name": {
          "en": "Cinnamaldehyde",
          "mr": "सिनामाल्डिहाइड"
        },
        "details": {
          "en": "Active oil",
          "mr": "सक्रिय तेल"
        }
      }
    ],
    "category": "Hridya",
    "medicinalUses": "Diabetes, heart health, bacterial infections, and common cold."
  },
  {
    "slug": "ela",
    "commonName": "Ela",
    "commonNameMr": "वेलची",
    "botanicalName": "Elettaria cardamomum (L.) Maton",
    "family": "Zingiberaceae",
    "about": {
      "en": "Cardamom is a premium aromatic digestant and cooling herb.",
      "mr": "अत्यंत सुगंधी, पाचक आणि शरीर थंड ठेवणारी वेलची."
    },
    "rasa": [
      "katu",
      "madhura"
    ],
    "guna": [
      "laghu",
      "ruksha"
    ],
    "virya": "sheeta",
    "vipaka": "madhura",
    "doshaEffect": {
      "vata": "balances",
      "pitta": "balances",
      "kapha": "balances"
    },
    "classicalKarmas": [
      {
        "name": {
          "en": "Chardinigrahana",
          "mr": "छर्दीनिग्रहण"
        },
        "details": {
          "en": "Anti-emetic",
          "mr": "उलटी थांबवणारे"
        }
      },
      {
        "name": {
          "en": "Kashara",
          "mr": "कासहर"
        },
        "details": {
          "en": "Cough reliever",
          "mr": "खोकला निवारक"
        }
      }
    ],
    "formulations": [
      {
        "name": {
          "en": "Eladi Vati",
          "mr": "एलादी वटी"
        },
        "details": {
          "en": "Anti-cough tab",
          "mr": "खोकल्याची गोळी"
        }
      }
    ],
    "phytochemistry": [
      {
        "name": {
          "en": "Terpineol",
          "mr": "टर्पिनॉल"
        },
        "details": {
          "en": "Bactericide",
          "mr": "जंतूनाशक"
        }
      }
    ],
    "category": "Chardinigrahana",
    "medicinalUses": "Nausea, vomiting, bad breath, and respiratory congestion."
  }
];
async function seedByOverwrite() {
  try {
    await connect();
    console.log('[Seed] Connected. Wiping and Re-seeding...');
    await Herb.deleteMany({});
    const inserted = await Herb.insertMany(HERBS, { validateBeforeSave: true });
    console.log('[Seed] Successfully seeded ' + inserted.length + ' HIGH-DENSITY herbs.');
    await disconnect();
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
}
seedByOverwrite();
