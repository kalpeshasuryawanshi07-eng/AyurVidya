const fs = require('fs');
const filePath = 'c:\\Users\\KALPESH\\Downloads\\AyurVidya\\Ayurveda Student Website\\server\\scripts\\seed\\seedHerbs.js';

const newHerbs = {
  ashwagandha: {
    slug: 'ashwagandha',
    commonName: 'Ashwagandha',
    commonNameMr: 'अश्वगंधा',
    botanicalName: 'Withania somnifera',
    family: 'Solanaceae',
    sanskritName: 'Ashvagandha',
    vernacularNames: {
      en: ['Winter Cherry', 'Indian Ginseng'],
      mr: ['Ashwagandha', 'Dhorgunj'],
      hi: ['Ashwagandha', 'Asgandh']
    },
    synonymsDetailed: [
      { name: { en: 'Varahakarni', mr: 'वराहकर्णी' }, meaning: { en: 'Leaves resemble a pig\'s ear', mr: 'पाने डुकराच्या कानासारखी दिसतात' } },
      { name: { en: 'Vajigandha', mr: 'वाजिगंधा' }, meaning: { en: 'Smells like a horse / related to vitality', mr: 'घोड्याला येणारा वास / शक्तीशी संबंधित' } },
      { name: { en: 'Balya', mr: 'बल्या' }, meaning: { en: 'Promotes strength', mr: 'शक्ती देणारी' } }
    ],
    about: {
      en: 'Ashwagandha is the premier adaptogen for vitality and stress management. It is a powerful Rasayana and Vajikarana herb.',
      mr: 'अश्वगंधा ही तणाव कमी करण्यासाठी आणि शारीरिक ताकद वाढवण्यासाठी आयुर्वेदातील एक श्रेष्ठ वनस्पती आहे.'
    },
    rasa: ['tikta', 'kashaya', 'madhura'],
    guna: ['laghu', 'snigdha'],
    virya: 'hot',
    vipaka: 'madhura',
    doshaEffect: { vata: 'decreases', pitta: 'balances', kapha: 'decreases' },
    vivaPrep: {
      etymology: { en: '"Ashvavat Gandhah Asya", i.e., smells like a horse.', mr: '"अश्ववत् गन्धः अस्य", म्हणजे ज्याचा वास घोड्यासारखा येतो.' },
      ganas: { charaka: ['Balya', 'Brimhaniya'], sushruta: ['n/a'] }
    },
    indications: {
      en: ['Stress', 'Anxiety', 'Muscle Weakness', 'Insomnia'],
      mr: ['तणाव', 'चिंता', 'अशक्तपणा', 'निद्रानाश']
    },
    preparations: 'Ashwagandharishta, Ashwagandha Churna',
    dosage: '3-6g',
    category: 'Rasayana',
    imageUrl: 'ashwagandha_plant_botanical_illustration_1775197236504.png'
  },
  amalaki: {
    slug: 'amalaki',
    commonName: 'Amalaki',
    commonNameMr: 'आमलकी',
    botanicalName: 'Emblica officinalis',
    family: 'Euphorbiaceae',
    sanskritName: 'Amalaki',
    vernacularNames: {
      en: ['Indian Gooseberry', 'Amla'],
      mr: ['Avala', 'Amalaki'],
      hi: ['Amla', 'Amalaki']
    },
    synonymsDetailed: [
      { name: { en: 'Dhatri', mr: 'धात्री' }, meaning: { en: 'Like a nursing mother', mr: 'आईप्रमाणे पालनपोषण करणारी' } },
      { name: { en: 'Vayastha', mr: 'वयस्था' }, meaning: { en: 'Stops aging', mr: 'तारुण्य टिकवून ठेवणारी' } }
    ],
    about: {
      en: 'Amalaki is the best anti-aging herb in Ayurveda and a powerhouse of Vitamin C.',
      mr: 'आमलकी ही आयुर्वेदातील सर्वोत्तम वय:स्थापनी (Anti-aging) वनस्पती असून व्हिटॅमिन सीचा समृद्ध स्रोत आहे.'
    },
    rasa: ['amla', 'madhura', 'kashaya', 'tikta', 'katu'],
    guna: ['guru', 'sheet', 'ruksha'],
    virya: 'cold',
    vipaka: 'madhura',
    doshaEffect: { vata: 'balances', pitta: 'decreases', kapha: 'balances' },
    vivaPrep: {
      etymology: { en: '"Amalan Kayathi Iti Amalaki" - That which makes the body clean/pure.', mr: '"अमलान कायति इति आमलकी" - जे शरीराला स्वच्छ/निर्मळ करते.' },
      ganas: { charaka: ['Vayasthapana'], sushruta: ['Amalakadi'] }
    },
    indications: {
      en: ['Hyperacidity', 'Immunity Deficiency', 'Hair Fall', 'Vision Issues'],
      mr: ['अम्लपित्त', 'कमी रोगप्रतिकारशक्ती', 'केस गळणे', 'दृष्टी दोष']
    },
    preparations: 'Chyawanprash, Amalaki Churna',
    dosage: '3-6g',
    category: 'Rasayana',
    imageUrl: 'amalaki_plant_botanical_illustration_1775197257398.png'
  },
  brahmi: {
    slug: 'brahmi',
    commonName: 'Brahmi',
    commonNameMr: 'ब्राह्मी',
    botanicalName: 'Bacopa monnieri',
    family: 'Plantaginaceae',
    sanskritName: 'Brahmi',
    vernacularNames: {
      en: ['Water Hyssop'],
      mr: ['Brahmi'],
      hi: ['Brahmi']
    },
    synonymsDetailed: [
      { name: { en: 'Sarasvati', mr: 'सरस्वती' }, meaning: { en: 'Related to wisdom/knowledge', mr: 'बुद्धी आणि ज्ञानाशी संबंधित' } }
    ],
    about: {
      en: 'The premier cognitive enhancer in Ayurveda, Brahmi improves memory and neurological health.',
      mr: 'ब्राह्मी ही बुद्धी आणि स्मृती वाढवण्यासाठी आयुर्वेदातील सर्वोत्तम वनस्पती मानली जाते.'
    },
    rasa: ['tikta', 'kashaya'],
    guna: ['laghu', 'sara'],
    virya: 'cold',
    vipaka: 'madhura',
    doshaEffect: { vata: 'balances', pitta: 'decreases', kapha: 'balances' },
    vivaPrep: {
      etymology: { en: 'Derived from Brahman, the absolute reality or wisdom.', mr: 'ब्रह्मदेवाच्या नावावरून (बुद्धीची देवता).' },
      ganas: { charaka: ['Prajasthapana'], sushruta: ['n/a'] }
    },
    indications: {
      en: ['Memory Loss', 'Concentration Issues', 'Anxiety'],
      mr: ['स्मरणशक्ती कमी होणे', 'एकाग्रतेचा अभाव', 'चिंता']
    },
    preparations: 'Brahmi Ghrita, Saraswatarishta',
    dosage: '10-20ml juice',
    category: 'Medhya',
    imageUrl: 'brahmi_plant_botanical_illustration_1775197274834.png'
  },
  shatavari: {
    slug: 'shatavari',
    commonName: 'Shatavari',
    commonNameMr: 'शतावरी',
    botanicalName: 'Asparagus racemosus',
    family: 'Asparagaceae',
    sanskritName: 'Shatavari',
    vernacularNames: {
      en: ['Wild Asparagus'],
      mr: ['Shatavari'],
      hi: ['Shatavari']
    },
    synonymsDetailed: [
      { name: { en: 'Bahupatra', mr: 'बहुपत्रा' }, meaning: { en: 'Having many leaves', mr: 'अनेक पाने असलेली' } }
    ],
    about: {
      en: 'Shatavari is the primary female reproductive tonic in Ayurveda, known for its rejuvenative power.',
      mr: 'शतावरी ही स्त्रियांच्या प्रजनन आरोग्यासाठी आणि शक्तीसाठी आयुर्वेदातील सर्वोत्तम वनस्पती आहे.'
    },
    rasa: ['madhura', 'tikta'],
    guna: ['guru', 'snigdha'],
    virya: 'cold',
    vipaka: 'madhura',
    doshaEffect: { vata: 'decreases', pitta: 'decreases', kapha: 'increases' },
    vivaPrep: {
      etymology: { en: '"Shatam Varinam Asya Iti" - One who possesses a hundred husbands (metaphor for vitality).', mr: '"शतं वरीणां अस्य इति" - जी शंभर पतींना सांभाळू शकते (शक्तीचे प्रतीक).' },
      ganas: { charaka: ['n/a'], sushruta: ['Vidaryadi'] }
    },
    indications: {
      en: ['Low Lactation', 'Hormonal Imbalance', 'Acid Reflux'],
      mr: ['कमी दूध येणे', 'हार्मोनल असंतुलन', 'अम्लपित्त']
    },
    preparations: 'Shatavari Kalpa, Shatavari Ghrita',
    dosage: '3-6g',
    category: 'Rasayana',
    imageUrl: 'shatavari_plant_botanical_illustration_1775197316524.png'
  }
};

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  for (const slug in newHerbs) {
    const regex = new RegExp(`\\{\\s*slug:\\s*'${slug}',[\\s\\S]*?\\},`, 'g');
    const replacement = JSON.stringify(newHerbs[slug], null, 2) + ',';
    // Stringify doesn't handle the spacing perfectly for JS, but it's valid.
    // Let's refine the replacement to be more like the original formatting.
    const formattedReplacement = replacement.split('\n').map(line => '  ' + line).join('\n');
    content = content.replace(regex, formattedReplacement);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated Batch 1 herbs in seedHerbs.js');
} catch (err) {
  console.error('Error updating file:', err);
}
