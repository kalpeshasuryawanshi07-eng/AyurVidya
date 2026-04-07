const Topic = require('../../models/Topic');
const Subject = require('../../models/Subject');
const { connect, disconnect } = require('./db');
const { SUBJECTS } = require('./seedSubjects');
const { TOPIC_LIST, TOPIC_LIST_MR } = require('./topicListData');
const { getSmartSnippet } = require('./knowledgeEngine');
const { SUBJECT_CONTENT_DATA } = require('./subjectContentData');
const { generateQuizForTopic } = require('./quizGenerator');

const DIFFICULTY_SEQUENCE = ['beginner', 'beginner', 'intermediate', 'intermediate', 'advanced'];

const SUBJECT_SHLOKAS = {
  'basic-principles': {
    devanagari: 'हिताहितं सुखं दुःखमायुस्तस्य हिताहितम् । मानं च तच्च यत्रोक्तमायुर्वेदः स उच्यते ॥',
    transliteration: 'Hitahitam sukham duhkham ayustasya hitahitam | Manam ca tacca yatroktam ayurvedah sa ucyate ||',
    translation: 'The science that explains what is wholesome and unwholesome for life is called Ayurveda.',
    translationMr: 'जीवनासाठी हित-अहित, सुख-दुःख सांगणारी विद्या म्हणजे आयुर्वेद होय.',
    source: 'Charaka Samhita, Sutrasthana 1.41'
  },
  'kriya-sharir': {
    devanagari: 'दोषधातुमलमूलं हि शरीरम् ।',
    transliteration: 'Dosha-dhatu-malamoolam hi shariram |',
    translation: 'The body is rooted in Dosha, Dhatu, and Mala.',
    translationMr: 'शरीराचा मूळ आधार दोष, धातू आणि मल आहेत.',
    source: 'Sushruta Samhita, Sutrasthana 15.3'
  },
  'dravyaguna-vigyan': {
    devanagari: 'रसाः पृथिव्यप्प्रत्यया निर्वृत्तौ च विशेषणे ।',
    transliteration: 'Rasah prithivyap-pratyaya nirvrittau cha visheshane |',
    translation: 'Rasas are formed from Prithvi and Ap mahabhutas, with others providing specificity.',
    translationMr: 'रसांची निर्मिती पृथ्वी आणि आप महाभूतांपासून होते, तर इतर भूते त्यांना विशिष्टता प्रदान करतात.',
    source: 'Charaka Samhita, Sutrasthana 26.40'
  },
  'rachana-sharir': {
    devanagari: 'शुक्रार्तवसंयोगे तु खलु कुक्षिगते ... पञ्चमहाभूतविकारसमुदायात्मकः ... स गर्भ इत्युच्यते ।',
    transliteration: 'Shukrartava-samyoge tu khalu kukshigate ... panchamahabhutavikarasamudayatmaka ... sa garbha ityuchyate |',
    translation: 'The union of Shukra and Artava in the womb, along with the soul and five elements, is called Garbha.',
    translationMr: 'गर्भाशयात शुक्र आणि आर्तवाचा संयोग होऊन, त्यासोबत आत्मा आणि पाच महाभूतांच्या विकारांचा समुदाय म्हणजे गर्भ होय.',
    source: 'Charaka Samhita, Sharirasthana 4.5'
  }
};

const DEFAULT_SHLOKA = {
  devanagari: 'स्वस्थस्य स्वास्थ्यरक्षणं आतुरस्य विकारप्रशमनं च ।',
  transliteration: 'Swasthyasya swasthya rakshanam aturasya vikara prashamanam cha |',
  translation: 'To protect the health of the healthy and to alleviate the disease of the afflicted.',
  translationMr: 'निरोगी व्यक्तीच्या आरोग्याचे रक्षण करणे आणि रोग्याच्या व्याधीचे शमन करणे, हे आयुर्वेदाचे प्रयोजन आहे.',
  source: 'Charaka Samhita, Sutrasthana 30.26'
};

function getSubjectKnowledge(subjectSlug, topicTitle, topicTitleMr, topicNumber) {
  const tSuffix = `t${String(topicNumber).padStart(3, '0')}`;
  if (SUBJECT_CONTENT_DATA[subjectSlug] && SUBJECT_CONTENT_DATA[subjectSlug][tSuffix]) {
    return SUBJECT_CONTENT_DATA[subjectSlug][tSuffix];
  }

  const smartSnippet = getSmartSnippet(topicTitle);
  if (smartSnippet) {
    return {
      intro: smartSnippet.intro,
      core: smartSnippet.core,
      clinical: smartSnippet.clinical,
      marathi: smartSnippet.marathi
    };
  }

  const knowledge = {
    'basic-principles': {
      intro: `In the study of ${topicTitle}, we explore how the tridosha (Vata, Pitta, Kapha) interact with Prakriti to maintain homeostasis or cause Vikriti. Understanding this is fundamental to all Ayurvedic diagnostics. The concept of Samanya (similarity) and Vishesha (difference) also plays a critical role in determining treatment protocols for ${topicTitle}.`,
      core: `The core of ${topicTitle} revolves around the Panchamahabhuta theory. Each element contributes specific properties (Gunas) that define the physiological behavior observed. For instance, Agni's role in transformation and Vayu's role in movement are pivotal. We must also consider the Srotas (channels) involved and how Ama (toxins) can obstruct the natural flow within these systems.`,
      clinical: `Clinically, ${topicTitle} helps a practitioner decide between Shodhana and Shamana therapy. A deep analysis of the patient's Bala (strength) and the Desha (environment) is required. In the OPD, we use these principles to guide diet (Ahara) and lifestyle (Vihara) recommendations, which are the first line of defense against imbalance.`,
      marathi: {
        intro: `${topicTitleMr} मध्ये त्रिदोष आणि प्रकृती यांचा अभ्यास केला जातो. हे आयुर्वेदाचे मूळ आधार आहेत.`,
        core: `${topicTitleMr} चा मूळ सिद्धांत पंचमहाभूत आणि अग्नीवर आधारित आहे. स्त्रोतस आणि आम यांचा प्रभाव समजून घेणे आवश्यक आहे.`,
        clinical: `निदान आणि चिकित्सा करताना या सिद्धांतांचा वापर होतो. आहार आणि विहार हे मुख्य उपचार आहेत.`
      }
    },
    'kayachikitsa': {
      intro: `${topicTitle} is a major branch of Ashtanga Ayurveda focusing on systemic disorders. It covers the etiology (Nidana), pathology (Samprapti), and management (Chikitsa) of diseases like Jwara, Raktapitta, and Prameha. The goal is to restore the balance of Kayagni (body fire).`,
      core: `The management strategy for ${topicTitle} includes internal medications (Antar Parimarjana) and external therapies (Bahir Parimarjana). We analyze the involvement of Dashavidha Pariksha (ten-fold examination) to tailor the treatment. The use of Rasayanas for rejuvenation is also a key component of this subject's core logic.`,
      clinical: `Practice in Kayachikitsa requires a keen eye for subtle changes in Dhatus and Malas. For ${topicTitle}, we often employ specific Aushadha Kalpas like Ghritas or Tailas. Patient compliance with Pathya-Apathya (wholesome and unwholesome habits) is mandatory for achieving successful clinical outcomes.`,
      marathi: {
        intro: `कायचिकित्सेमध्ये शारीरिक व्याधींचे निदान आणि चिकित्सा केली जाते, विशेषतः ${topicTitleMr} संदर्भात.`,
        core: `दशविध परीक्षा आणि रसायन या मुख्य संकल्पना आहेत ज्या ${topicTitleMr} च्या व्यवस्थापनात महत्त्वाच्या ठरतात.`,
        clinical: `रुग्ण सेवेत (OPD) पथ्य-अपथ्य यावर विशेष भर दिला जातो.`
      }
    }
  };

  return knowledge[subjectSlug] || {
    intro: `${topicTitle} is an essential component of ${subjectSlug}. In this context, we analyze the structural and functional aspects of the human body through classical Ayurvedic principles. This ensures a comprehensive understanding for modern clinical practice.`,
    core: `The core mechanism of ${topicTitle} involves the balance of Doshas and Dhatus. We look at the specific Gunas and Karmas associated with this topic to understand how it influences overall health. The interaction between Agni and Srotas is also explored in depth.`,
    clinical: `Clinical application of ${topicTitle} focuses on patient assessment and individualized therapy. Whether it is preventive care or therapeutic intervention, the goal remains the same: to achieve Dhatu Samya (equilibrium of tissues).`,
    marathi: {
      intro: `${topicTitleMr} हा ${subjectSlug} मधील एक महत्त्वाचा भाग आहे.`,
      core: `${topicTitleMr} मध्ये दोष आणि धातू यांच्या संतुलनाचा विचार केला जातो.`,
      clinical: `क्लिनिकल दृष्ट्या या संकल्पनेचा उपयोग निदानात होतो.`
    }
  };
}

function makeTopicContent(subject, topicTitle, topicTitleMr, topicNumber) {
  const sk = getSubjectKnowledge(subject.slug, topicTitle, topicTitleMr, topicNumber);
  
  const intro = [
    sk.intro,
    `${topicTitle} provides the framework for understanding complex physiological events in the body. It is not merely a theoretical concept but a living guide to health and disease management. For a BAMS student, mastering this topic involves connecting ancient wisdom with modern research and evidence-based practices. This lesson aims to bridge that gap.`,
    `Furthermore, ${topicTitle} (Topic ${topicNumber} in ${subject.title}) is essential for passing professional university exams and for building a successful clinical practice later. We will look at definitions, classifications, and practical examples to make the learning process intuitive and memorable.`,
    `The historical development of this concept tracks back to the Vedic period, evolving through the Brihat-trayi and Laghu-trayi. Each author added layers of detail based on their clinical experience. Today, we stand at a juncture where we can validate these insights using modern diagnostic tools while preserving the integrity of the original Ayurvedic philosophy.`
  ].join('\n\n');

  const introMr = [
    sk.marathi.intro,
    `${topicTitleMr} शरीरातील गुंतागुंतीच्या शरीरशास्त्रीय घटना समजून घेण्यासाठी फ्रेमवर्क प्रदान करते. ही केवळ सैद्धांतिक संकल्पना नसून आरोग्य आणि रोग व्यवस्थापनासाठी जिवंत मार्गदर्शक आहे. BAMS विद्यार्थ्यासाठी, या विषयावर प्रभुत्व मिळविण्यामध्ये आधुनिक संशोधन आणि पुराव्यावर आधारित पद्धतींशी प्राचीन शहाणपणी जोडणे समाविष्ट आहे. या पाठाचा उद्देश ती दरी भरून काढणे आहे.`,
    `शिवाय, ${topicTitleMr} (${subject.titleMr || subject.title} मधील विषय ${topicNumber}) प्रोफेशनल युनिव्हर्सिटी परीक्षा उत्तीर्ण होण्यासाठी आणि नंतर यशस्वी क्लिनिकल सराव तयार करण्यासाठी आवश्यक आहे. आम्ही शिक्षण प्रक्रिया अधिक सुलभ आणि संस्मरणीय बनवण्यासाठी व्याख्या, वर्गीकरण आणि व्यावहारिक उदाहरणे पाहू.`,
    `या संकल्पनेचा ऐतिहासिक विकास वैदिक काळातून शोधला जातो, जो बृहत्-त्रयी आणि लघु-त्रयीद्वारे विकसित झाला आहे. प्रत्येक लेखकाने त्यांच्या क्लिनिकल अनुभवाच्या आधारावर तपशीलांचे स्तर जोडले. आज, आपण अशा टप्प्यावर उभे आहोत जिथे आपण मूळ आयुर्वेदिक तत्त्वज्ञानाची अखंडता जपताना आधुनिक निदान साधनांचा वापर करून या अंतर्दृष्टी प्रमाणित करू शकतो.`
  ].join('\n\n');

  const hist = [
    `The historical context of ${topicTitle} is rich with scholarly debates and practical observations. Mentions can be found in early texts, where it was often linked to spiritual and cosmic principles. Over time, it became a part of clinical medicine, as documented in the Samhitas.`,
    `Charaka emphasizes the functional aspect, while Sushruta focuses on more structural and procedural details. Vagbhata, the great synthesizer, provides a middle path that is highly practical for learners today. Understanding these varying perspectives gives a student the depth needed for advanced studies.`,
    `During the medieval period, Ayurvedic commentators like Dalhana and Chakrapani expanded on ${topicTitle}, providing clarity on difficult terms and providing regional variations in practice. This continuity of knowledge is a testament to the robustness of our system.`
  ].join('\n\n');

  const histMr = [
    `${topicTitleMr} चा ऐतिहासिक संदर्भ अभ्यासपूर्ण वादविवाद आणि व्यावहारिक निरीक्षणांनी समृद्ध आहे. याचे उल्लेख सुरुवातीच्या ग्रंथांमध्ये आढळतात, जिथे ते सहसा आध्यात्मिक आणि वैश्विक तत्त्वाकांशी जोडलेले होते. काळांतर्गत, संहितेमध्ये नोंदविल्याप्रमाणे ते क्लिनिकल मेडिसिनचा भाग बनले.`,
    `चरक कार्यात्मक पैलूवर भर देतात, तर सुश्रुत अधिक संरचनात्मक आणि प्रक्रियात्मक तपशीलांवर लक्ष केंद्रित करतात. वाग्भट, महान समन्वयक, एक मध्यम मार्ग प्रदान करतात जो आजच्या शिकाऊ उमेदवारांसाठी अत्यंत व्यावहारिक आहे. या विविध दृष्टिकोनांना समजून घेणे विद्यार्थ्याला प्रगत अभ्यासासाठी आवश्यक असलेली खोली देते.`,
    `मध्ययुगीन काळात, डल्हण आणि चक्रपाणी यांसारख्या आयुर्वेदिक टीकाकारांनी ${topicTitleMr} चा विस्तार केला, कठीण शब्दांवर स्पष्टता प्रदान दिली आणि सरावात प्रादेशिक फरक दर्शवले. ज्ञानाची ही सातत्य आपल्या प्रणालीच्या बळकटीचा पुरावा आहे.`
  ].join('\n\n');

  const core = [
    sk.core,
    `<h3>Key Mechanisms</h3> <p>The primary mechanism involves the transformation of Rasa into lower Dhatus, a process governed by Dhatvagni. If this fire is sluggish, toxins (Ama) build up, leading to the clinical manifestations associated with ${topicTitle}.</p>`,
    `<h3>Table of Attributes</h3>
<table class="ayur-table">
  <thead><tr><th>Attribute</th><th>Ayurvedic View</th><th>Modern Correlation</th></tr></thead>
  <tbody>
    <tr><td>Guna (Quality)</td><td>Laghu, Ruksha</td><td>Small molecule, Drying</td></tr>
    <tr><td>Karma (Action)</td><td>Lekhana</td><td>Scraping/Anti-lipid</td></tr>
    <tr><td>Virya (Potency)</td><td>Ushna</td><td>Thermogenic</td></tr>
  </tbody>
</table>`,
    `<p>By analyzing these attributes, we can predict the behavior of any substance or process in the body. This is the beauty of the Guna-based logic in Ayurveda.</p>`
  ].join('\n\n');

  const coreMr = [
    sk.marathi.core,
    `<h3>मुख्य यंत्रणा</h3> <p>प्राथमिक यंत्रणेमध्ये रसाचे कनिष्ठ धातूंमध्ये रूपांतर करणे समाविष्ट आहे, ही प्रक्रिया धात्वाग्नीद्वारे नियंत्रित केली जाते. जर हा अग्नी मंद असेल, तर विष (आम) तयार होते, ज्यामुळे ${topicTitleMr} शी संबंधित क्लिनिकल लक्षणे दिसून येतात.</p>`,
    `<h3>वैशिष्ट्यांचा तक्ता</h3>
<table class="ayur-table">
  <thead><tr><th>वैशिष्ट्य</th><th>आयुर्वेदिक दृष्टिकोन</th><th>आधुनिक सहसंबंध</th></tr></thead>
  <tbody>
    <tr><td>गुण (गुणवत्ता)</td><td>लघु, रुक्ष</td><td>लहान रेणू, कोरडे</td></tr>
    <tr><td>कर्म (क्रिया)</td><td>लेखन</td><td>स्क्रॅपिंग/अँटी-लिपिड</td></tr>
    <tr><td>वीर्य (क्षमता)</td><td>उष्ण</td><td>थर्मोजेनिक</td></tr>
  </tbody>
</table>`,
    `<p>या गुणांचे विश्लेषण करून, आपण शरीरातील कोणत्याही पदार्थाच्या किंवा प्रक्रियेच्या वर्तनाचा अंदाज लावू शकतो. हे आयुर्वेदातील गुण-आधारित तर्काचे सौंदर्य आहे.</p>`
  ].join('\n\n');

  const clinical = [
    sk.clinical,
    `In clinical practice, when dealing with ${topicTitle}, we follow the Dhatu Samya objective. This involves identifying the specific Srotas involved and using Bheshaja (medicine) that can traverse those channels. Anu-shastra-preme (fine channels) require Yukti (intelligent planning) to reach.`,
    `Practical tips for students: When observing a patient, look for the 'Lakshnas' (signs) described in the classics first. Then correlate them with modern pathological findings. This dual approach makes you a much better doctor than simply relying on laboratory reports alone.`,
    `Case Study Example: A patient presenting with imbalances related to ${topicTitle} responded well to a combination of internal administration of Tikta Ghrita and mild Sweadana. This demonstrates the Shodhana-Shamana combination logic.`
  ].join('\n\n');

  const clinicalMr = [
    sk.marathi.clinical,
    `क्लिनिकल प्रॅक्टिसमध्ये, ${topicTitleMr} चा व्यवहार करताना, आपण 'धातू साम्य' उद्दिष्टाचे पालन करतो. यामध्ये समाविष्ट असलेल्या विशिष्ट स्त्रोतसांची ओळख करणे आणि त्या वाहिन्यांतून प्रवास करू शकणारे औषध वापरणे समाविष्ट आहे. अणु-शस्त्र-प्रमे (सूक्ष्म वाहिन्या) पर्यंत पोहोचण्यासाठी युक्ती (बुद्धिमान नियोजन) आवश्यक आहे.`,
    `विद्यार्थ्यांसाठी व्यावहारिक टिप्स: रुग्णाचे निरीक्षण करताना, प्रथम क्लासिक्समध्ये वर्णन केलेले 'लक्षणे' पहा. मग त्यांचा आधुनिक पॅथॉलॉजिकल निष्कर्षांशी परस्पर संबंध जोडा. हा दुहेरी दृष्टिकोन तुम्हाला केवळ प्रयोगशाळेच्या अहवालांवर अवलंबून राहण्यापेक्षा कितीतरी चांगला डॉक्टर बनवतो.`,
    `केस स्टडी उदाहरण: ${topicTitleMr} शी संबंधित असंतुलन असलेल्या रुग्णाने तिक्त घृत आणि सौम्य स्वेदनांच्या संयोजनाला चांगला प्रतिसाद दिला. हे शोधन-शमन संयोजन तर्क प्रदर्शित करते.`
  ].join('\n\n');

  const modern = [
    `Comparing ${topicTitle} with modern science reveals fascinating parallels. What we call Srotodusthi is often seen as microvascular dysfunction or oxidative stress at the cellular level in modern biology. This bridge allows us to communicate with the global medical community without losing our unique identity.`,
    `Research into ${topicTitle} is growing, with studies looking at pharmacological mechanisms, protein expression, and microbiome changes. These findings often support the traditional Ayurvedic claims, providing a solid foundation for 'Integrated Medicine'.`,
    `However, we must be careful not to over-simplify. Ayurvedic concepts are holographic—they contain many layers of meaning. A simple one-to-one correlation with a modern term can sometimes miss the systemic impact that our classics insist upon.`
  ].join('\n\n');

  const modernMr = [
    `${topicTitleMr} ची आधुनिक विज्ञानाशी तुलना केल्यास आश्चर्यकारक साम्य दिसून येते. ज्याला आपण स्त्रोतदुष्टी म्हणतो ते आधुनिक जीवशास्त्रातील पेशींच्या स्तरावरील सूक्ष्मवहिन्यांसंबंधी बिघाड किंवा ऑक्सिडेटिव्ह ताण म्हणून पाहिले जाते. हा पूल आपल्याला आपली आगळीवेगळी ओळख न गमावता जागतिक वैद्यकीय समुदायाशी संवाद साधण्याची परवानगी देतो.`,
    `${topicTitleMr} मधील संशोधन वाढत आहे, ज्यामध्ये फार्माकोलॉजिकल यंत्रणा, प्रथिने अभिव्यक्ती आणि मायक्रोबायोम बदलांचा विचार केला जातो. हे निष्कर्ष बर्‍याचदा पारंपारिक आयुर्वेदिक दाव्यांचे समर्थन करतात, जे 'एकात्मिक औषध' साठी एक भक्कम पाया प्रदान करतात.`,
    `तथापि, आपण अति-सरलीकरण न करण्याबद्दल सावधगिरी बाळगली पाहिजे. आयुर्वेदिक संकल्पना होलोग्राफिक आहेत—त्यांमध्ये अर्थाचे अनेक स्तर आहेत. आधुनिक शब्दाशी साधे एक-एक सहसंबंध कधीकधी आपल्या क्लासिक्सने आग्रह धरलेला पद्धतशीर प्रभाव गमावू शकतात.`
  ].join('\n\n');

  return { 
    en: { intro, hist, core, clinical, modern },
    mr: { intro: introMr, hist: histMr, core: coreMr, clinical: clinicalMr, modern: modernMr }
  };
}

function buildTopicDocument(subject, topicNumber, globalIndex) {
  const topicTitleBase = (TOPIC_LIST[subject.slug] && TOPIC_LIST[subject.slug][topicNumber - 1]) 
    ? TOPIC_LIST[subject.slug][topicNumber - 1] 
    : `Lesson ${topicNumber}`;
    
  const topicTitleMr = (TOPIC_LIST_MR[subject.slug] && TOPIC_LIST_MR[subject.slug][topicNumber - 1])
    ? TOPIC_LIST_MR[subject.slug][topicNumber - 1]
    : `${topicTitleBase} (मराठी संस्करत)`;

  const title = topicTitleBase;
  const titleMr = topicTitleMr;
  const slug = `${subject.slug}-t${String(topicNumber).padStart(3, '0')}`;
  
  const allContent = makeTopicContent(subject, title, titleMr, topicNumber);
  const contentEn = allContent.en;
  const contentMr = allContent.mr;

  const summaryEn = [
    `Comprehensive understanding of ${title} through Tridosha and Dhatu logic.`,
    'Historical evolution from classical Samhitas to modern academic study.',
    'Core mechanisms involving Agni, Srotas, and Guna-Karma analysis.',
    'Clinical application strategies including Shodhana, Shamana, and Pathya-Apathya.',
    'Modern correlation with systems biology and evidence-based medicine.',
    'Exam-oriented key points for high-scoring university performance.'
  ];

  const summaryMr = [
    `त्रिदोष आणि धातू तर्काद्वारे ${titleMr} ची सर्वसमावेशक समज.`,
    'शास्त्रीय संहितेपासून आधुनिक शैक्षणिक अभ्यासापर्यंतचा ऐतिहासिक विकास.',
    'अग्नी, स्त्रोतस आणि गुण-कर्म विश्लेषणाशी संबंधित मुख्य यंत्रणा.',
    'शोधन, शमन आणि पथ्य-अपथ्य यासह क्लिनिकल अनुप्रयोग धोरणे.',
    'सिस्टम्स बायोलॉजी आणि पुराव्यावर आधारित मेडिसिनसह आधुनिक सहसंबंध.',
    'विद्यापीठ परीक्षेत उच्च गुण मिळवण्यासाठी परीक्षाभिमुख मुख्य मुद्दे.'
  ];

  const furtherReadingEn = [
    `Charaka Samhita: Detailed sections on ${subject.title}`,
    `Sushruta Samhita: Anatomical and surgical perspectives`,
    `Ashtanga Hridayam: Practical clinical guidelines`,
    `Modern Ayurvedic Research Journals (various issues)`,
    `Advanced Textbook of ${subject.title} for BAMS Students`
  ];

  const furtherReadingMr = [
    `चरक संहिता: ${subject.titleMr || subject.title} वर सविस्तर विभाग`,
    `सुश्रुत संहिता: शारीरिक आणि शस्त्रक्रियाविषयक दृष्टिकोन`,
    `अष्टांग हृदयम: व्यावहारिक क्लिनिकल मार्गदर्शक तत्त्वे`,
    `आधुनिक आयुर्वेदिक संशोधन जर्नल्स (विविध अंक)`,
    `BAMS विद्यार्थ्यांसाठी ${subject.titleMr || subject.title} चे प्रगत पाठ्यपुस्तक`
  ];

  const shloka = SUBJECT_SHLOKAS[subject.slug] || DEFAULT_SHLOKA;

  return {
    slug,
    subjectSlug: subject.slug,
    title,
    titleMr,
    difficulty: DIFFICULTY_SEQUENCE[globalIndex % DIFFICULTY_SEQUENCE.length],
    estimatedMins: 15 + (topicNumber % 5),
    orderIndex: topicNumber,
    introduction: contentEn.intro,
    historicalContext: contentEn.hist,
    coreExplanation: contentEn.core,
    clinicalApplications: contentEn.clinical,
    modernComparison: contentEn.modern,
    summary: summaryEn,
    furtherReading: furtherReadingEn,
    introductionMr: contentMr.intro,
    historicalContextMr: contentMr.hist,
    coreExplanationMr: contentMr.core,
    clinicalApplicationsMr: contentMr.clinical,
    modernComparisonMr: contentMr.modern,
    summaryMr: summaryMr,
    furtherReadingMr: furtherReadingMr,
    shloka,
    quizQuestions: makeQuizQuestions(slug, title, subject.slug),
    flashcards: makeFlashcards(slug, title, titleMr)
  };
}

function makeQuizQuestions(topicSlug, title, subjectSlug) {
  let category = 'general';
  if (['basic-principles', 'kayachikitsa'].includes(subjectSlug)) category = 'theory';
  if (['kriya-sharir', 'rachana-sharir'].includes(subjectSlug)) category = 'anatomy';
  if (['dravyaguna-vigyan'].includes(subjectSlug)) category = 'pharmacology';
  if (['panchakarma'].includes(subjectSlug)) category = 'procedures';
  
  return generateQuizForTopic(topicSlug, title, null, category);
}

function makeFlashcards(topicSlug, title, titleMr) {
  return [
    {
      front: `What is the significance of ${title} in Ayurvedic pathology?`,
      frontMr: `आयुर्वेदिक विकृतीशास्त्रामध्ये ${titleMr} चे काय महत्त्व आहे?`,
      back: `It helps identify the root cause (Nidana) and the progression (Samprapti) of imbalances.`,
      backMr: `हे असंतुलनाचे मूळ कारण (निदान) आणि प्रगती (संप्राप्ती) ओळखण्यास मदत करते.`
    },
    {
      front: `How does Agni relate to ${title}?`,
      frontMr: `अग्नीचा ${titleMr} शी काय संबंध आहे?`,
      back: `Proper Agni ensures correct metabolism while Mandagni leads to Ama and dysfunction.`,
      backMr: `योग्य अग्नी योग्य चयापचय सुनिश्चित करतो, तर मंदाग्नीमुळे आम आणि बिघाड होतो.`
    }
  ];
}

function generateAllTopics() {
  const topics = [];
  let globalIndex = 0;
  for (const subject of SUBJECTS) {
    for (let i = 1; i <= subject.topicCount; i += 1) {
      topics.push(buildTopicDocument(subject, i, globalIndex));
      globalIndex += 1;
    }
  }
  return topics;
}

async function seedTopics() {
  await connect();
  try {
    const topics = generateAllTopics();
    console.log(`[seed] Starting upsert of ${topics.length} topics...`);
    for (const topic of topics) {
      await Topic.findOneAndUpdate(
        { slug: topic.slug },
        topic,
        { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
      );
    }
    for (const subject of SUBJECTS) {
      await Subject.findOneAndUpdate(
        { slug: subject.slug },
        { topicCount: subject.topicCount }
      );
    }
    console.log(`[seed] Succesfully upserted ${topics.length} topics`);
  } catch (err) {
    console.error('[seed] Error seeding topics:', err);
    throw err;
  } finally {
    await disconnect();
  }
}

if (require.main === module) {
  seedTopics()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('[seed] Failed to seed topics:', error);
      process.exit(1);
    });
}

module.exports = {
  seedTopics,
  generateAllTopics
};
