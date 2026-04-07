const Subject = require('../../models/Subject');
const { connect, disconnect } = require('./db');

const SUBJECTS = [
  {
    slug: 'basic-principles',
    title: 'Basic Principles of Ayurveda',
    titleMr: 'आयुर्वेदाची मूलभूत तत्त्वे',
    description: 'Core principles including tridosha, agni, ama, dhatu, and daily regimens.',
    descriptionMr: 'त्रिदोष, अग्नी, आम, धातू आणि दिनचर्या यावर आधारित मूलभूत अध्ययन.',
    icon: 'BP',
    colorHex: '#4CAF50',
    year: 1,
    orderIndex: 1,
    topicCount: 25
  },
  {
    slug: 'dravyaguna-vigyan',
    title: 'Dravyaguna Vigyan',
    titleMr: 'द्रव्यगुण विज्ञान',
    description: 'Ayurvedic pharmacology covering rasa, guna, virya, vipaka, and prabhava.',
    descriptionMr: 'रस, गुण, वीर्य, विपाक आणि प्रभाव यांच्या आधारावर द्रव्यगुण अध्ययन.',
    icon: 'DG',
    colorHex: '#8BC34A',
    year: 2,
    orderIndex: 2,
    topicCount: 25
  },
  {
    slug: 'rachana-sharir',
    title: 'Rachana Sharir',
    titleMr: 'रचना शरीर',
    description: 'Ayurvedic anatomy including marma, asthi, snayu, and garbha vijnana.',
    descriptionMr: 'मर्म, अस्धी, स्नायू आणि गर्भ विज्ञान यावर आधारित शरीर रचना.',
    icon: 'RS',
    colorHex: '#FF9800',
    year: 1,
    orderIndex: 3,
    topicCount: 20
  },
  {
    slug: 'kriya-sharir',
    title: 'Kriya Sharir',
    titleMr: 'क्रिया शरीर',
    description: 'Ayurvedic physiology including dosha functions, dhatu poshana, and mala.',
    descriptionMr: 'दोष कार्य, धातू पोषण आणि मल सिद्धांत यावर आधारित क्रिया शरीर.',
    icon: 'KS',
    colorHex: '#2196F3',
    year: 1,
    orderIndex: 4,
    topicCount: 23
  },
  {
    slug: 'rog-nidan',
    title: 'Rog Nidan',
    titleMr: 'रोग निदान',
    description: 'Ayurvedic pathology and diagnosis with nidana panchaka and pariksha.',
    descriptionMr: 'निदान पंचक आणि परीक्षा आधारित रोग निदान पद्धती.',
    icon: 'RN',
    colorHex: '#9C27B0',
    year: 2,
    orderIndex: 5,
    topicCount: 20
  },
  {
    slug: 'kayachikitsa',
    title: 'Kayachikitsa',
    titleMr: 'कायचिकित्सा',
    description: 'Internal medicine in Ayurveda for major systemic disorders.',
    descriptionMr: 'आयुर्वेदातील आंतरिक चिकित्सा पद्धती आणि मुख्य व्याधी व्यवस्थापन.',
    icon: 'KC',
    colorHex: '#E91E63',
    year: 3,
    orderIndex: 6,
    topicCount: 25
  },
  {
    slug: 'panchakarma',
    title: 'Panchakarma',
    titleMr: 'पंचकर्म',
    description: 'Shodhana therapies including vamana, virechana, basti, nasya, and raktamokshana.',
    descriptionMr: 'वमन, विरेचन, बस्ती, नस्य आणि रक्तमोक्षण यांच्या शोधन पद्धती.',
    icon: 'PK',
    colorHex: '#00BCD4',
    year: 3,
    orderIndex: 7,
    topicCount: 25
  },
  {
    slug: 'rasashastra',
    title: 'Rasashastra',
    titleMr: 'रसशास्त्र',
    description: 'Ayurvedic pharmaceutics and herbo-mineral formulation science.',
    descriptionMr: 'रसौषधी, भस्म तयारी आणि भैषज्य कल्पना यावर आधारित अध्ययन.',
    icon: 'RA',
    colorHex: '#795548',
    year: 2,
    orderIndex: 8,
    topicCount: 23
  },
  {
    slug: 'agadtantra',
    title: 'Agadtantra',
    titleMr: 'अगदतंत्र',
    description: 'Toxicology and emergency management in Ayurvedic framework.',
    descriptionMr: 'विष चिकित्सा, विषव्यवस्थापन आणि अगदतंत्र आधारित विश्लेषण.',
    icon: 'AG',
    colorHex: '#607D8B',
    year: 4,
    orderIndex: 9,
    topicCount: 15
  },
  {
    slug: 'shalya-tantra',
    title: 'Shalya Tantra',
    titleMr: 'शल्य तंत्र',
    description: 'Surgical principles from Sushruta tradition with practical procedures.',
    descriptionMr: 'सुश्रुत परंपरा आधारित शल्य सिद्धांत आणि प्रायोगिक पद्धती.',
    icon: 'ST',
    colorHex: '#F44336',
    year: 3,
    orderIndex: 10,
    topicCount: 20
  },
  {
    slug: 'shalakya-tantra',
    title: 'Shalakya Tantra',
    titleMr: 'शाालक्य तंत्र',
    description: 'Ophthalmology, ENT, and dental health in Ayurveda.',
    descriptionMr: 'नेत्र-चिकित्सा, कर्ण, नासा आणि मुख रोगांचे आयुर्वेदिक व्यवस्थापन.',
    icon: 'ST',
    colorHex: '#3F51B5',
    year: 4,
    orderIndex: 11,
    topicCount: 15
  },
  {
    slug: 'prasuti-tantra',
    title: 'Prasuti Tantra & Stri Roga',
    titleMr: 'प्रसूती तंत्र आणि स्त्री-रोग',
    description: 'Obstetrics and gynecology focusing on maternal and fetal health.',
    descriptionMr: 'स्त्री-आरोग्य, गर्भ-संस्कार आणि प्रसूती-विज्ञान यावर आधारित अध्ययन.',
    icon: 'PT',
    colorHex: '#E91E63',
    year: 4,
    orderIndex: 12,
    topicCount: 15
  },
  {
    slug: 'kaumarbhritya',
    title: 'Kaumarbhritya',
    titleMr: 'कौमारभृत्य',
    description: 'Ayurvedic pediatrics, neonatal care, and developmental health.',
    descriptionMr: 'बाल-आरोग्य, नवजात शिशू काळजी आणि विकासात्मक आरोग्य.',
    icon: 'KB',
    colorHex: '#009688',
    year: 3,
    orderIndex: 13,
    topicCount: 15
  },
  {
    slug: 'swasthavritta',
    title: 'Swasthavritta & Yoga',
    titleMr: 'स्वस्थवृत्त आणि योग',
    description: 'Preventive medicine, social health, and yogic sciences.',
    descriptionMr: 'प्रतिबंधात्मक चिकित्सा, सामाजिक स्वास्थ्य आणि योग विज्ञान.',
    icon: 'SY',
    colorHex: '#FF5722',
    year: 3,
    orderIndex: 14,
    topicCount: 15
  }
];

async function seedSubjects() {
  await connect();

  try {
    for (const subject of SUBJECTS) {
      await Subject.findOneAndUpdate(
        { slug: subject.slug },
        subject,
        { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
      );
    }

    console.log(`[seed] Upserted ${SUBJECTS.length} subjects`);
  } finally {
    await disconnect();
  }
}

if (require.main === module) {
  seedSubjects()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('[seed] Failed to seed subjects:', error);
      process.exit(1);
    });
}

module.exports = {
  seedSubjects,
  SUBJECTS
};
