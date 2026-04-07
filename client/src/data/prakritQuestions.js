// 25 Prakriti questions — score 1 (not at all) to 5 (very much)
export const prakritQuestions = [
  { id: 1,  en: "My body frame is thin and lean with prominent joints.", mr: "माझे शरीर पातळ आणि हडकुळे आहे.", vataWeight: 5, pittaWeight: 1, kaphaWeight: 0 },
  { id: 2,  en: "I have a medium build with good muscle definition.", mr: "माझी शरीर रचना मध्यम आहे.", vataWeight: 1, pittaWeight: 5, kaphaWeight: 0 },
  { id: 3,  en: "My body is large, stocky, and well-built.", mr: "माझे शरीर मोठे आणि मजबूत आहे.", vataWeight: 0, pittaWeight: 1, kaphaWeight: 5 },
  { id: 4,  en: "My skin is dry, rough, and tends to crack.", mr: "माझी त्वचा कोरडी आणि खरखरीत आहे.", vataWeight: 5, pittaWeight: 0, kaphaWeight: 0 },
  { id: 5,  en: "My skin is oily, sensitive, and prone to rashes.", mr: "माझी त्वचा तेलकट आणि संवेदनशील आहे.", vataWeight: 0, pittaWeight: 5, kaphaWeight: 1 },
  { id: 6,  en: "My skin is smooth, soft, and well-moisturized.", mr: "माझी त्वचा मऊ आणि चांगली ओलसर आहे.", vataWeight: 0, pittaWeight: 1, kaphaWeight: 5 },
  { id: 7,  en: "My hair is dry, thin, and tends to be frizzy.", mr: "माझे केस कोरडे आणि पातळ आहेत.", vataWeight: 5, pittaWeight: 0, kaphaWeight: 0 },
  { id: 8,  en: "My hair is fine, straight, and tends to go grey early.", mr: "माझे केस बारीक आणि लवकर पांढरे होतात.", vataWeight: 0, pittaWeight: 5, kaphaWeight: 0 },
  { id: 9,  en: "My hair is thick, lustrous, and wavy.", mr: "माझे केस जाड आणि चमकदार आहेत.", vataWeight: 0, pittaWeight: 0, kaphaWeight: 5 },
  { id: 10, en: "My appetite is irregular — sometimes very hungry, sometimes not.", mr: "माझी भूक अनियमित आहे.", vataWeight: 5, pittaWeight: 1, kaphaWeight: 0 },
  { id: 11, en: "I have a strong, sharp appetite and get irritable if I miss meals.", mr: "माझी भूक तीव्र आहे आणि जेवण चुकले तर चिडचिड होते.", vataWeight: 0, pittaWeight: 5, kaphaWeight: 0 },
  { id: 12, en: "My appetite is slow and steady — I can skip meals easily.", mr: "माझी भूक मंद आहे आणि मी जेवण सहज सोडू शकतो.", vataWeight: 0, pittaWeight: 0, kaphaWeight: 5 },
  { id: 13, en: "I tend to have constipation and dry, hard stools.", mr: "मला बद्धकोष्ठता होते आणि मल कठीण असतो.", vataWeight: 5, pittaWeight: 0, kaphaWeight: 0 },
  { id: 14, en: "My digestion is fast and I tend to have loose stools.", mr: "माझे पचन जलद आहे आणि मल सैल असतो.", vataWeight: 0, pittaWeight: 5, kaphaWeight: 0 },
  { id: 15, en: "My digestion is slow and I feel heavy after eating.", mr: "माझे पचन मंद आहे आणि जेवणानंतर जड वाटते.", vataWeight: 0, pittaWeight: 0, kaphaWeight: 5 },
  { id: 16, en: "I am a light sleeper and often have disturbed sleep.", mr: "माझी झोप हलकी आहे आणि अनेकदा विस्कळीत असते.", vataWeight: 5, pittaWeight: 1, kaphaWeight: 0 },
  { id: 17, en: "I sleep moderately and wake up feeling refreshed.", mr: "मी मध्यम झोपतो आणि ताजेतवाने उठतो.", vataWeight: 0, pittaWeight: 5, kaphaWeight: 0 },
  { id: 18, en: "I sleep deeply and for long hours, and feel groggy in the morning.", mr: "मी खोल आणि जास्त वेळ झोपतो.", vataWeight: 0, pittaWeight: 0, kaphaWeight: 5 },
  { id: 19, en: "I tend to be anxious, worried, and fearful.", mr: "मला चिंता, काळजी आणि भीती वाटते.", vataWeight: 5, pittaWeight: 0, kaphaWeight: 0 },
  { id: 20, en: "I tend to be intense, competitive, and easily angered.", mr: "मी तीव्र, स्पर्धात्मक आणि लवकर रागावतो.", vataWeight: 0, pittaWeight: 5, kaphaWeight: 0 },
  { id: 21, en: "I tend to be calm, steady, and slow to anger.", mr: "मी शांत, स्थिर आणि सहजासहजी रागावत नाही.", vataWeight: 0, pittaWeight: 0, kaphaWeight: 5 },
  { id: 22, en: "I learn quickly but forget quickly too.", mr: "मी लवकर शिकतो पण लवकर विसरतो.", vataWeight: 5, pittaWeight: 1, kaphaWeight: 0 },
  { id: 23, en: "I have sharp memory and good concentration.", mr: "माझी स्मरणशक्ती तीक्ष्ण आहे.", vataWeight: 0, pittaWeight: 5, kaphaWeight: 0 },
  { id: 24, en: "I learn slowly but have excellent long-term memory.", mr: "मी हळू शिकतो पण दीर्घकालीन स्मरणशक्ती उत्तम आहे.", vataWeight: 0, pittaWeight: 0, kaphaWeight: 5 },
  { id: 25, en: "I walk quickly, talk fast, and am always on the move.", mr: "मी जलद चालतो, जलद बोलतो.", vataWeight: 5, pittaWeight: 2, kaphaWeight: 0 },
];

export function calculatePrakriti(answers) {
  let vata = 0, pitta = 0, kapha = 0;
  answers.forEach(({ questionId, score }) => {
    const q = prakritQuestions.find(q => q.id === questionId);
    if (!q) return;
    vata  += q.vataWeight  * score;
    pitta += q.pittaWeight * score;
    kapha += q.kaphaWeight * score;
  });
  const total = vata + pitta + kapha || 1;
  return {
    vata:  Math.round((vata  / total) * 100),
    pitta: Math.round((pitta / total) * 100),
    kapha: Math.round((kapha / total) * 100),
    dominant: vata > pitta && vata > kapha ? "Vata" : pitta > kapha ? "Pitta" : "Kapha",
  };
}
