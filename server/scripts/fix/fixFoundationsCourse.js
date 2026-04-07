const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const Course = require('../../models/Course');

// Comprehensive content for each lesson (2000-3500 chars each)
const lessonsContent = {
  'found-1-2': `Dravya-Guna-Karma represents the fundamental triad of Ayurvedic pharmacology. Dravya refers to the substance or material entity, Guna denotes its qualities or attributes, and Karma signifies its actions or therapeutic effects. This triad forms the basis for understanding how medicinal substances work in the body.

Dravya encompasses all material substances including herbs, minerals, and animal products. Each dravya possesses inherent qualities (gunas) that determine its therapeutic potential. The classical texts describe 20 gunas organized in 10 opposite pairs: heavy-light, cold-hot, unctuous-dry, dull-sharp, stable-mobile, soft-hard, non-slimy-slimy, smooth-rough, minute-gross, and viscous-liquid.

Karma refers to the specific actions a substance performs in the body. These actions can be general (samanya karma) affecting the whole body, or specific (vishesha karma) targeting particular tissues or organs. Understanding karma helps predict therapeutic outcomes and potential side effects.

The interrelationship between dravya, guna, and karma is crucial for rational drug selection. A substance's gunas determine its karmas, and both are inherent to the dravya. For example, a dravya with guru (heavy) and snigdha (unctuous) gunas will perform brimhana karma (nourishing action).

Clinical application requires understanding how these three elements interact. When selecting herbs, practitioners consider the patient's dosha imbalance, the required therapeutic action, and the substance's qualities. This systematic approach ensures effective and safe treatment.

The concept extends beyond pharmacology to diet and lifestyle. Foods are also analyzed through this triad, helping create personalized dietary recommendations. Understanding dravya-guna-karma enables practitioners to make informed decisions about any therapeutic intervention.`,

  'found-1-3': `Samanya-Vishesha Siddhanta is one of Ayurveda's fundamental principles, stating that similar substances increase similar qualities while dissimilar substances decrease them. This principle guides all therapeutic interventions and lifestyle recommendations in Ayurvedic practice.

Samanya (similarity) refers to substances, qualities, or actions that share common characteristics. When similar things combine, they increase each other's effects. For example, consuming hot, spicy foods increases pitta dosha, which is also hot in nature. This principle explains how imbalances develop and progress.

Vishesha (dissimilarity) represents the opposite principle. Dissimilar substances, qualities, or actions counteract each other. Cold substances reduce heat, heavy foods balance lightness, and dry substances counteract moisture. This principle forms the basis of Ayurvedic treatment strategies.

The application of this principle is universal in Ayurveda. In disease management, practitioners identify the predominant dosha or quality causing imbalance, then prescribe opposite qualities to restore equilibrium. For vata disorders characterized by dryness and coldness, warm and oily treatments are recommended.

Dietary recommendations follow this principle strictly. If a person has excess kapha (heavy, cold, moist), they should consume light, warm, dry foods. Conversely, someone with vata imbalance (light, dry, cold) benefits from heavy, oily, warm foods. This creates a natural balance.

Seasonal regimens (ritucharya) also apply this principle. During summer's heat, cooling foods and activities are recommended. In winter's cold, warming substances and practices are advised. This prevents seasonal imbalances and maintains health throughout the year.

Understanding samanya-vishesha enables practitioners to predict outcomes of any intervention. It provides a logical framework for treatment selection, dietary planning, and lifestyle modifications. This principle demonstrates Ayurveda's systematic and scientific approach to health management.`,

  'found-1-4': `Samsaraya and Karma-Kaarya relations describe the fundamental cause-effect relationships in Ayurveda. These concepts explain how substances interact with the body and how therapeutic effects manifest through specific mechanisms.

Samsaraya literally means "coming together" or "combination." It describes how substances with similar qualities naturally combine and strengthen each other, while dissimilar substances separate or counteract. This principle operates at molecular, cellular, and systemic levels, governing all physiological and pathological processes.

In disease pathogenesis, samsaraya explains how vitiated doshas combine with specific tissues (dhatus) to create disease. Vata naturally combines with asthi (bone), pitta with rakta (blood), and kapha with rasa (plasma). Understanding these natural affinities helps predict disease manifestation patterns and target treatments effectively.

Karma-Kaarya (action-effect) relationship establishes that every action produces a specific effect. Karma represents the therapeutic action of a substance, while kaarya is the resulting effect in the body. This relationship is predictable and forms the basis of rational therapeutics in Ayurveda.

The relationship between karma and kaarya is not always direct. Some substances produce immediate effects (tatkal), while others work gradually (chirakari). Some effects are primary (pradhana), while others are secondary (anupradhana). Understanding these variations helps set realistic treatment expectations.

Clinical application requires identifying the desired kaarya (effect) first, then selecting appropriate karma (action) to achieve it. For example, to reduce inflammation (kaarya), anti-inflammatory action (shothahara karma) is needed. The practitioner then selects substances known for this specific karma.

These concepts also explain drug interactions and synergistic effects. When multiple substances with similar karmas are combined, their kaarya intensifies. Conversely, substances with opposite karmas may neutralize each other's effects. This knowledge guides formulation design and combination therapy.

Understanding samsaraya and karma-kaarya relationships enables practitioners to predict therapeutic outcomes, explain treatment mechanisms, and design effective interventions. These principles demonstrate Ayurveda's logical and systematic approach to pharmacology and therapeutics.`,

  'found-1-5': `Panchamahabhuta Theory forms the cornerstone of Ayurvedic philosophy, proposing that all matter in the universe, including the human body, is composed of five fundamental elements: Akasha (space), Vayu (air), Agni (fire), Jala (water), and Prithvi (earth). This theory provides a framework for understanding physiology, pathology, and therapeutics.

The five elements exist in a hierarchical order, each evolving from the previous one. Akasha is the most subtle, followed by Vayu, Agni, Jala, and Prithvi being the grossest. Each element possesses specific qualities that determine its characteristics and functions in the body.

In the human body, these elements combine to form the three doshas (Vata, Pitta, Kapha), seven tissues (sapta dhatus), and three waste products (malas). Vata is composed of Akasha and Vayu, Pitta of Agni and Jala, and Kapha of Jala and Prithvi. This elemental composition determines each dosha's qualities and functions.

The theory extends to understanding disease causation. Imbalances in the five elements lead to dosha vitiation, which manifests as disease. For example, excess Agni element causes inflammatory conditions, while deficient Jala leads to dryness and degeneration. Treatment aims to restore elemental balance.

Dietary substances are also analyzed through their elemental composition. Foods rich in Prithvi and Jala elements are heavy and nourishing, while those high in Agni and Vayu are light and stimulating. This understanding guides dietary recommendations for different constitutions and conditions.

Therapeutic interventions work by modifying elemental balance. Herbs, treatments, and lifestyle practices are selected based on their elemental composition to counteract imbalances. For instance, cooling therapies (increasing Jala element) treat conditions of excess heat (Agni element).

The Panchamahabhuta theory also explains sensory perception. Each element corresponds to a specific sense organ and sensory quality: Akasha to sound and ears, Vayu to touch and skin, Agni to sight and eyes, Jala to taste and tongue, and Prithvi to smell and nose.

Understanding this theory is essential for grasping all Ayurvedic concepts. It provides a unified framework for understanding the body, disease, and treatment. This holistic perspective distinguishes Ayurveda from other medical systems and enables its comprehensive approach to health.`,

  'found-1-6': `Akasha Mahabhuta, the space element, is the most subtle of the five elements and provides the medium for all other elements to exist and function. It represents emptiness, porosity, and the potential for manifestation. Understanding Akasha is crucial for comprehending Ayurvedic physiology and pathology.

Akasha possesses unique qualities: it is subtle (sukshma), light (laghu), soft (mridu), and smooth (shlakshna). These qualities make it the most ethereal element, providing space for all bodily structures and functions. Without Akasha, no movement, growth, or transformation would be possible.

In the human body, Akasha manifests as all hollow spaces and cavities. The mouth, nostrils, ears, thoracic cavity, abdominal cavity, blood vessels, and cellular spaces all represent Akasha element. These spaces allow for the movement of nutrients, waste products, and vital energies.

Akasha is the primary component of Vata dosha, combining with Vayu to create the principle of movement and communication in the body. This explains why Vata governs all transportation, circulation, and nervous system functions. Imbalances in Akasha element directly affect Vata dosha.

The sensory quality associated with Akasha is sound (shabda), and its sense organ is the ear (shrotra). This connection explains why sound therapy and mantra chanting have therapeutic effects in Ayurveda. Vibrational healing works through the Akasha element.

Clinically, excess Akasha manifests as increased porosity, emptiness, and depletion. Symptoms include weight loss, tissue wasting, feeling of emptiness, and increased body spaces. Deficient Akasha causes congestion, blockages, and reduced space for normal functions.

Treatment of Akasha imbalances requires understanding its relationship with other elements. Excess Akasha is balanced by increasing Prithvi (earth) element through nourishing, grounding therapies. Deficient Akasha is addressed by reducing congestion and creating space through cleansing therapies.

Foods and herbs affecting Akasha element include those that are light, subtle, and create space in the body. Bitter and astringent tastes increase Akasha, while sweet and salty tastes decrease it. This knowledge guides dietary recommendations for Akasha-related imbalances.

Understanding Akasha mahabhuta provides insight into the subtle aspects of physiology and consciousness. It bridges the gap between physical and metaphysical aspects of health, enabling a truly holistic approach to healing.`,

  'found-1-7': `Vayu Mahabhuta, the air element, represents movement, dynamism, and transformation in the universe and human body. It is the second most subtle element after Akasha and is responsible for all kinetic processes. Understanding Vayu is essential for comprehending Vata dosha and movement-related functions.

Vayu possesses distinct qualities: it is light (laghu), cold (sheeta), dry (ruksha), rough (khara), subtle (sukshma), and mobile (chala). These qualities determine its functions and effects in the body. The mobile nature of Vayu makes it the primary force behind all physiological movements.

In the human body, Vayu manifests as all forms of movement and transportation. Respiration, circulation, nerve impulses, muscle movements, cellular transport, and elimination all depend on Vayu element. Without Vayu, the body would be static and lifeless.

Vayu combines with Akasha to form Vata dosha, the biological principle governing movement and communication. This explains why Vata controls the nervous system, respiratory system, and all eliminatory functions. Vata's qualities directly reflect Vayu's characteristics.

The sensory quality associated with Vayu is touch (sparsha), and its sense organ is the skin (tvak). This connection explains why touch therapy, massage, and tactile stimulation have profound effects on Vata dosha and nervous system function.

Clinically, excess Vayu manifests as increased movement, dryness, and instability. Symptoms include tremors, twitching, dry skin, constipation, anxiety, and restlessness. The mind becomes overactive, and sleep disturbances occur. These are classic Vata imbalance symptoms.

Deficient Vayu causes reduced movement, stagnation, and accumulation. Symptoms include sluggishness, poor circulation, constipation, and mental dullness. While less common than excess Vayu, this condition requires stimulating and mobilizing therapies.

Treatment of Vayu imbalances follows the principle of opposites. Excess Vayu is balanced by warm, heavy, oily, and stable qualities. Oil massage (abhyanga), warm foods, and grounding practices are recommended. Deficient Vayu is addressed through stimulating and mobilizing interventions.

Foods and herbs affecting Vayu element include those that are light, dry, and mobile. Bitter, pungent, and astringent tastes increase Vayu, while sweet, sour, and salty tastes decrease it. Understanding these relationships guides dietary management of Vata disorders.

Vayu's role extends beyond physical movement to mental and emotional dynamics. It governs creativity, enthusiasm, and adaptability. Balanced Vayu creates mental clarity and emotional flexibility, while imbalanced Vayu causes anxiety, fear, and instability.

Understanding Vayu mahabhuta provides deep insight into the dynamic aspects of life and health. It explains how movement and change occur at all levels, from cellular processes to mental activities, enabling comprehensive management of movement-related disorders.`
};

// Add content for remaining lessons (found-2-1 through found-4-7)
// I'll create comprehensive content for each

async function fixFoundationsCourse() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const course = await Course.findOne({ slug: 'foundations-of-ayurveda' });
    
    if (!course) {
      console.log('❌ Course not found');
      return;
    }

    console.log('Found course:', course.title);
    console.log('Current lessons:', course.lessons.length);
    console.log('\nUpdating course...\n');

    // Update isPublished field
    course.isPublished = true;

    // Update lesson content
    let updatedCount = 0;
    course.lessons.forEach(lesson => {
      if (lessonsContent[lesson.lessonId]) {
        lesson.content = lessonsContent[lesson.lessonId];
        updatedCount++;
        console.log(`✅ Updated: ${lesson.title} (${lesson.content.length} chars)`);
      }
    });

    await course.save();

    console.log(`\n✅ Course updated successfully!`);
    console.log(`Published: ${course.isPublished}`);
    console.log(`Updated ${updatedCount} lessons with content`);
    console.log(`\nNote: ${course.lessons.length - updatedCount} lessons still need content generation`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

fixFoundationsCourse();
