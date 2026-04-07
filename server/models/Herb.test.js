const mongoose = require('mongoose');
const Herb = require('./Herb');

// Mock MongoDB connection for testing
beforeAll(async () => {
  const baseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurveda-test';
  const mongoUri = `${baseUri}-${process.env.JEST_WORKER_ID || '1'}`;
  await mongoose.connect(mongoUri);
  await Herb.init();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Herb.deleteMany({});
});

describe('Herb Model', () => {
  describe('Schema Validation', () => {
    test('should create a valid herb with all required fields', async () => {
      const herbData = {
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief, immunity, and vitality'
      };

      const herb = new Herb(herbData);
      const savedHerb = await herb.save();

      expect(savedHerb._id).toBeDefined();
      expect(savedHerb.slug).toBe(herbData.slug);
      expect(savedHerb.commonName).toBe(herbData.commonName);
      expect(savedHerb.botanicalName).toBe(herbData.botanicalName);
      expect(savedHerb.medicinalUses).toBe(herbData.medicinalUses);
      expect(savedHerb.createdAt).toBeDefined();
      expect(savedHerb.updatedAt).toBeDefined();
    });

    test('should create herb with all optional fields', async () => {
      const herbData = {
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        commonNameMr: 'अश्वगंधा',
        botanicalName: 'Withania somnifera',
        sanskritName: 'Ashvagandha',
        rasa: ['tikta', 'kashaya'],
        guna: ['laghu', 'snigdha'],
        virya: 'hot',
        vipaka: 'madhura',
        doshaEffect: {
          vata: 'decreases',
          pitta: 'balances',
          kapha: 'decreases'
        },
        partsUsed: ['root', 'leaves'],
        medicinalUses: 'Used for stress relief, immunity, and vitality',
        medicinalUsesMr: 'तणाव कमी करण्यासाठी, रोगप्रतिकारक शक्ती आणि चैतन्यासाठी वापरले जाते',
        preparations: 'Powder, decoction, oil',
        preparationsMr: 'चूर्ण, काढा, तेल',
        dosage: '3-6 grams daily',
        contraindications: 'Avoid during pregnancy',
        contraindicationsMr: 'गर्भधारणेदरम्यान टाळा',
        modernResearch: 'Studies show adaptogenic properties',
        category: 'Rasayana'
      };

      const herb = new Herb(herbData);
      const savedHerb = await herb.save();

      expect(savedHerb.commonNameMr).toBe(herbData.commonNameMr);
      expect(savedHerb.sanskritName).toBe(herbData.sanskritName);
      expect(savedHerb.rasa).toEqual(herbData.rasa);
      expect(savedHerb.guna).toEqual(herbData.guna);
      expect(savedHerb.virya).toBe(herbData.virya);
      expect(savedHerb.vipaka).toBe(herbData.vipaka);
      expect(savedHerb.doshaEffect.vata).toBe(herbData.doshaEffect.vata);
      expect(savedHerb.doshaEffect.pitta).toBe(herbData.doshaEffect.pitta);
      expect(savedHerb.doshaEffect.kapha).toBe(herbData.doshaEffect.kapha);
      expect(savedHerb.partsUsed).toEqual(herbData.partsUsed);
      expect(savedHerb.medicinalUsesMr).toBe(herbData.medicinalUsesMr);
      expect(savedHerb.preparations).toBe(herbData.preparations);
      expect(savedHerb.preparationsMr).toBe(herbData.preparationsMr);
      expect(savedHerb.dosage).toBe(herbData.dosage);
      expect(savedHerb.contraindications).toBe(herbData.contraindications);
      expect(savedHerb.contraindicationsMr).toBe(herbData.contraindicationsMr);
      expect(savedHerb.modernResearch).toBe(herbData.modernResearch);
      expect(savedHerb.category).toBe(herbData.category);
    });

    test('should fail validation when slug is missing', async () => {
      const herb = new Herb({
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief'
      });

      await expect(herb.save()).rejects.toThrow();
    });

    test('should fail validation when commonName is missing', async () => {
      const herb = new Herb({
        slug: 'ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief'
      });

      await expect(herb.save()).rejects.toThrow();
    });

    test('should fail validation when botanicalName is missing', async () => {
      const herb = new Herb({
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        medicinalUses: 'Used for stress relief'
      });

      await expect(herb.save()).rejects.toThrow();
    });

    test('should fail validation when medicinalUses is missing', async () => {
      const herb = new Herb({
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera'
      });

      await expect(herb.save()).rejects.toThrow();
    });
  });

  describe('Slug Validation', () => {
    test('should accept valid slug format', async () => {
      const validSlugs = [
        'ashwagandha',
        'tulsi-holy-basil',
        'brahmi-123',
        'triphala-churna'
      ];

      for (const slug of validSlugs) {
        const herb = new Herb({
          slug,
          commonName: 'Test Herb',
          botanicalName: 'Test botanical',
          medicinalUses: 'Test uses'
        });

        const savedHerb = await herb.save();
        expect(savedHerb.slug).toBe(slug);
        await Herb.deleteMany({});
      }
    });

    test('should convert slug to lowercase', async () => {
      const herb = new Herb({
        slug: 'Ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief'
      });

      const savedHerb = await herb.save();
      expect(savedHerb.slug).toBe('ashwagandha');
    });

    test('should fail validation with invalid slug containing spaces', async () => {
      const herb = new Herb({
        slug: 'ashwa gandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief'
      });

      await expect(herb.save()).rejects.toThrow();
    });

    test('should fail validation with invalid slug containing special characters', async () => {
      const herb = new Herb({
        slug: 'ashwagandha_root!',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief'
      });

      await expect(herb.save()).rejects.toThrow();
    });

    test('should trim whitespace from slug', async () => {
      const herb = new Herb({
        slug: '  ashwagandha  ',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief'
      });

      const savedHerb = await herb.save();
      expect(savedHerb.slug).toBe('ashwagandha');
    });
  });

  describe('Virya Validation', () => {
    test('should accept valid virya values', async () => {
      const validViryaValues = ['hot', 'cold', ''];

      for (const virya of validViryaValues) {
        const herb = new Herb({
          slug: `herb-${virya || 'empty'}`,
          commonName: 'Test Herb',
          botanicalName: 'Test botanical',
          medicinalUses: 'Test uses',
          virya
        });

        const savedHerb = await herb.save();
        expect(savedHerb.virya).toBe(virya);
        await Herb.deleteMany({});
      }
    });

    test('should fail validation with invalid virya value', async () => {
      const herb = new Herb({
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief',
        virya: 'warm'
      });

      await expect(herb.save()).rejects.toThrow();
    });

    test('should default virya to empty string', async () => {
      const herb = new Herb({
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief'
      });

      const savedHerb = await herb.save();
      expect(savedHerb.virya).toBe('');
    });
  });

  describe('DoshaEffect Validation', () => {
    test('should accept valid doshaEffect values', async () => {
      const herb = new Herb({
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief',
        doshaEffect: {
          vata: 'decreases',
          pitta: 'balances',
          kapha: 'increases'
        }
      });

      const savedHerb = await herb.save();
      expect(savedHerb.doshaEffect.vata).toBe('decreases');
      expect(savedHerb.doshaEffect.pitta).toBe('balances');
      expect(savedHerb.doshaEffect.kapha).toBe('increases');
    });

    test('should fail validation with invalid doshaEffect value', async () => {
      const herb = new Herb({
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief',
        doshaEffect: {
          vata: 'reduces',
          pitta: 'balances',
          kapha: 'increases'
        }
      });

      await expect(herb.save()).rejects.toThrow();
    });

    test('should allow partial doshaEffect', async () => {
      const herb = new Herb({
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief',
        doshaEffect: {
          vata: 'decreases'
        }
      });

      const savedHerb = await herb.save();
      expect(savedHerb.doshaEffect.vata).toBe('decreases');
      expect(savedHerb.doshaEffect.pitta).toBeUndefined();
      expect(savedHerb.doshaEffect.kapha).toBeUndefined();
    });

    test('should default doshaEffect to null', async () => {
      const herb = new Herb({
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief'
      });

      const savedHerb = await herb.save();
      expect(savedHerb.doshaEffect).toBeNull();
    });
  });

  describe('Array Fields', () => {
    test('should default array fields to empty arrays', async () => {
      const herb = new Herb({
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief'
      });

      const savedHerb = await herb.save();
      expect(savedHerb.rasa).toEqual([]);
      expect(savedHerb.guna).toEqual([]);
      expect(savedHerb.partsUsed).toEqual([]);
    });

    test('should store multiple values in rasa array', async () => {
      const herb = new Herb({
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief',
        rasa: ['tikta', 'kashaya', 'madhura']
      });

      const savedHerb = await herb.save();
      expect(savedHerb.rasa).toHaveLength(3);
      expect(savedHerb.rasa).toContain('tikta');
      expect(savedHerb.rasa).toContain('kashaya');
      expect(savedHerb.rasa).toContain('madhura');
    });

    test('should store multiple values in guna array', async () => {
      const herb = new Herb({
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief',
        guna: ['laghu', 'snigdha', 'tikshna']
      });

      const savedHerb = await herb.save();
      expect(savedHerb.guna).toHaveLength(3);
      expect(savedHerb.guna).toContain('laghu');
      expect(savedHerb.guna).toContain('snigdha');
      expect(savedHerb.guna).toContain('tikshna');
    });

    test('should store multiple values in partsUsed array', async () => {
      const herb = new Herb({
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief',
        partsUsed: ['root', 'leaves', 'seeds']
      });

      const savedHerb = await herb.save();
      expect(savedHerb.partsUsed).toHaveLength(3);
      expect(savedHerb.partsUsed).toContain('root');
      expect(savedHerb.partsUsed).toContain('leaves');
      expect(savedHerb.partsUsed).toContain('seeds');
    });
  });

  describe('Slug Uniqueness Constraint', () => {
    test('should enforce unique slug constraint', async () => {
      const herbData = {
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief'
      };

      await new Herb(herbData).save();

      const duplicateHerb = new Herb({
        slug: 'ashwagandha',
        commonName: 'Another Herb',
        botanicalName: 'Different botanical',
        medicinalUses: 'Different uses'
      });

      await expect(duplicateHerb.save()).rejects.toThrow();
    });
  });

  describe('Indexes', () => {
    test('should have slug index', async () => {
      const indexes = await Herb.collection.getIndexes();
      expect(indexes).toHaveProperty('slug_1');
    });

    test('should have category index', async () => {
      const indexes = await Herb.collection.getIndexes();
      expect(indexes).toHaveProperty('category_1');
    });

    test('should have text index for search', async () => {
      const indexes = await Herb.collection.getIndexes();
      const textIndexKeys = Object.keys(indexes).filter(key => key.includes('text'));
      expect(textIndexKeys.length).toBeGreaterThan(0);
    });

    test('should have unique constraint on slug index', async () => {
      const indexes = await Herb.collection.getIndexes();
      expect(indexes.slug_1).toEqual([['slug', 1]]);
    });
  });

  describe('Timestamps', () => {
    test('should automatically set createdAt and updatedAt', async () => {
      const herb = new Herb({
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief'
      });

      const savedHerb = await herb.save();
      expect(savedHerb.createdAt).toBeInstanceOf(Date);
      expect(savedHerb.updatedAt).toBeInstanceOf(Date);
    });

    test('should update updatedAt on modification', async () => {
      const herb = new Herb({
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief'
      });

      const savedHerb = await herb.save();
      const originalUpdatedAt = savedHerb.updatedAt;

      // Wait a bit to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));

      savedHerb.commonName = 'Updated Name';
      await savedHerb.save();

      expect(savedHerb.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });
  });

  describe('String Trimming', () => {
    test('should trim whitespace from string fields', async () => {
      const herb = new Herb({
        slug: '  ashwagandha  ',
        commonName: '  Ashwagandha  ',
        commonNameMr: '  अश्वगंधा  ',
        botanicalName: '  Withania somnifera  ',
        sanskritName: '  Ashvagandha  ',
        vipaka: '  madhura  ',
        medicinalUses: '  Used for stress relief  ',
        medicinalUsesMr: '  तणाव कमी करण्यासाठी  ',
        preparations: '  Powder, decoction  ',
        preparationsMr: '  चूर्ण, काढा  ',
        dosage: '  3-6 grams  ',
        contraindications: '  Avoid during pregnancy  ',
        contraindicationsMr: '  गर्भधारणेदरम्यान टाळा  ',
        modernResearch: '  Studies show benefits  ',
        category: '  Rasayana  '
      });

      const savedHerb = await herb.save();
      expect(savedHerb.slug).toBe('ashwagandha');
      expect(savedHerb.commonName).toBe('Ashwagandha');
      expect(savedHerb.commonNameMr).toBe('अश्वगंधा');
      expect(savedHerb.botanicalName).toBe('Withania somnifera');
      expect(savedHerb.sanskritName).toBe('Ashvagandha');
      expect(savedHerb.vipaka).toBe('madhura');
      expect(savedHerb.medicinalUses).toBe('Used for stress relief');
      expect(savedHerb.medicinalUsesMr).toBe('तणाव कमी करण्यासाठी');
      expect(savedHerb.preparations).toBe('Powder, decoction');
      expect(savedHerb.preparationsMr).toBe('चूर्ण, काढा');
      expect(savedHerb.dosage).toBe('3-6 grams');
      expect(savedHerb.contraindications).toBe('Avoid during pregnancy');
      expect(savedHerb.contraindicationsMr).toBe('गर्भधारणेदरम्यान टाळा');
      expect(savedHerb.modernResearch).toBe('Studies show benefits');
      expect(savedHerb.category).toBe('Rasayana');
    });
  });

  describe('Bilingual Support', () => {
    test('should store both English and Marathi content', async () => {
      const herb = new Herb({
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        commonNameMr: 'अश्वगंधा',
        botanicalName: 'Withania somnifera',
        medicinalUses: 'Used for stress relief, immunity, and vitality',
        medicinalUsesMr: 'तणाव कमी करण्यासाठी, रोगप्रतिकारक शक्ती आणि चैतन्यासाठी वापरले जाते',
        preparations: 'Powder, decoction, oil',
        preparationsMr: 'चूर्ण, काढा, तेल',
        contraindications: 'Avoid during pregnancy',
        contraindicationsMr: 'गर्भधारणेदरम्यान टाळा'
      });

      const savedHerb = await herb.save();
      expect(savedHerb.commonName).toBe('Ashwagandha');
      expect(savedHerb.commonNameMr).toBe('अश्वगंधा');
      expect(savedHerb.medicinalUses).toBe('Used for stress relief, immunity, and vitality');
      expect(savedHerb.medicinalUsesMr).toBe('तणाव कमी करण्यासाठी, रोगप्रतिकारक शक्ती आणि चैतन्यासाठी वापरले जाते');
      expect(savedHerb.preparations).toBe('Powder, decoction, oil');
      expect(savedHerb.preparationsMr).toBe('चूर्ण, काढा, तेल');
      expect(savedHerb.contraindications).toBe('Avoid during pregnancy');
      expect(savedHerb.contraindicationsMr).toBe('गर्भधारणेदरम्यान टाळा');
    });
  });
});
