/**
 * Quiz Generator Utility
 * Generates topic-specific, unique, and bilingual quiz questions for Ayurveda topics.
 */

const { KNOWLEDGE_VAULT } = require('./knowledgeEngine');

function generateQuizForTopic(topicSlug, title, content, category) {
  const questions = [];
  const topicName = title;
  const topicLower = title.toLowerCase();

  // 1. Definition/Intro Question
  questions.push({
    questionId: `${topicSlug}-q1`,
    question: `Which of the following best describes the core concept of ${topicName}?`,
    questionMr: `${topicName} या संकल्पनेचे मुख्य सार खालीलपैकी कोणते आहे?`,
    options: [
      `A fundamental principle of Ayurvedic ${category || 'science'}`,
      'A temporary symptomatic relief method',
      'A purely modern biological theory',
      'None of the above'
    ],
    optionsMr: [
      `आयुर्वेदिक ${category || 'विज्ञानाचा'} एक मूलभूत सिद्धांत`,
      'तात्पुरता लक्षण-आधारित उपचार',
      'केवळ आधुनिक जीवशास्त्रीय सिद्धांत',
      'वरीलपैकी काहीही नाही'
    ],
    correctOption: 0
  });

  // 2. Category-Specific Question
  if (category === 'anatomy') {
    questions.push({
      questionId: `${topicSlug}-q2`,
      question: `In the context of Ayurvedic Anatomy (Rachana), ${topicName} primarily relates to:`,
      questionMr: `आयुर्वेदिक शरीर रचनेच्या संदर्भात, ${topicName} प्रामुख्याने कशाशी संबंधित आहे?`,
      options: ['Structural integrity and vital points', 'Purely metabolic functions', 'Mental temperament only', 'Environmental factors'],
      optionsMr: ['रचनात्मक अखंडता आणि मर्म स्थाने', 'केवळ चयापचय क्रिया', 'केवळ मानसिक स्वभाव', 'पर्यावरणीय घटक'],
      correctOption: 0
    });
  } else if (category === 'procedures') {
    questions.push({
      questionId: `${topicSlug}-q2`,
      question: `When performing ${topicName}, what is the most critical preparatory step?`,
      questionMr: `${topicName} करताना, सर्वात महत्त्वाची पूर्व-तयारी कोणती?`,
      options: ['Snehana and Swedana (Oleation/Sudation)', 'Heavy exercise', 'Ignoring seasonal variations', 'Consuming cold water'],
      optionsMr: ['स्नेहन आणि स्वेदन', 'कठोर व्यायाम', 'ऋतू बदलांकडे दुर्लक्ष करणे', 'थंड पाणी पिणे'],
      correctOption: 0
    });
  } else if (category === 'pharmacology') {
    questions.push({
      questionId: `${topicSlug}-q2`,
      question: `The pharmacological action (Karma) related to ${topicName} is determined by:`,
      questionMr: `${topicName} शी संबंधित औषधीय कार्य (कर्म) कशाद्वारे निर्धारित केले जाते?`,
      options: ['Rasa, Guna, Virya, and Vipaka', 'Price of the herb', 'Modern chemical naming only', 'Color of the plant'],
      optionsMr: ['रस, गुण, वीर्य आणि विपाक', 'औषधीची किंमत', 'केवळ आधुनिक रासायनिक नाव', 'वनस्पतीचा रंग'],
      correctOption: 0
    });
  } else {
    questions.push({
      questionId: `${topicSlug}-q2`,
      question: `Balance in ${topicName} is essential for achieving:`,
      questionMr: `${topicName} मधील संतुलन काय साध्य करण्यासाठी आवश्यक आहे?`,
      options: ['Dhatu Samya (Equilibrium)', 'Temporary energy boost', 'Suppression of symptoms', 'Ignoring Prakriti'],
      optionsMr: ['धातू साम्य (संतुलन)', 'तात्पुरती ऊर्जा वाढवणे', 'लक्षणे दाबून टाकणे', 'प्रकृतीकडे दुर्लक्ष करणे'],
      correctOption: 0
    });
  }

  // 3. Clinical/Practical Question
  questions.push({
    questionId: `${topicSlug}-q3`,
    question: `A clinician observes an imbalance related to ${topicName}. The first line of defense is usually:`,
    questionMr: `वैद्याला ${topicName} संबंधित असंतुलन आढळल्यास, बचावाची पहिली पायरी साधारणपणे काय असते?`,
    options: ['Correcting Ahara (Diet) and Vihara (Lifestyle)', 'Immediate surgery', 'Prescribing high-dose antibiotics', 'No intervention needed'],
    optionsMr: ['आहार आणि विहार सुधारणे', 'त्वरीत शस्त्रक्रिया', 'जास्त डोसची प्रतिजैविके देणे', 'कोणत्याही हस्तक्षेपाची गरज नाही'],
    correctOption: 0
  });

  // 4. Dosha/Guna Relationship Question
  questions.push({
    questionId: `${topicSlug}-q4`,
    question: `How does ${topicName} typically interact with the Tridoshas?`,
    questionMr: `${topicName} साधारणपणे त्रिदोषांशी कसा संवाद साधते?`,
    options: [
      'By influencing their specific Gunas (qualities)',
      'By having no effect on Doshas',
      'By only affecting Vata',
      'By only affecting Kapha'
    ],
    optionsMr: [
      'त्यांच्या विशिष्ट गुणांवर प्रभाव टाकून',
      'दोषांवर कोणताही परिणाम न करता',
      'केवळ वातावर परिणाम करून',
      'केवळ कफावर परिणाम करून'
    ],
    correctOption: 0
  });

  // 5. Advanced/Integration Question
  questions.push({
    questionId: `${topicSlug}-q5`,
    question: `What is the ultimate goal of mastering ${topicName} in BAMS studies?`,
    questionMr: `BAMS अभ्यासक्रमात ${topicName} वर प्रभुत्व मिळवण्याचे अंतिम ध्येय काय आहे?`,
    options: [
      'Integrating ancient wisdom with modern clinical practice',
      'Memorizing text without understanding logic',
      'Focusing only on theoretical exams',
      'Replacing modern medicine entirely'
    ],
    optionsMr: [
      'प्राचीन ज्ञान आणि आधुनिक क्लिनिकल सराव यांची सांगड घालणे',
      'तर्क समजून न घेता केवळ पाठांतर करणे',
      'केवळ सैद्धांतिक परीक्षांवर लक्ष केंद्रित करणे',
      'आधुनिक वैद्यकशास्त्र पूर्णपणे बदलणे'
    ],
    correctOption: 0
  });

  return questions;
}

module.exports = { generateQuizForTopic };
