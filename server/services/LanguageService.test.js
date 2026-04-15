const LanguageService = require('./LanguageService');

describe('LanguageService', () => {
  describe('validateLanguage', () => {
    it('should return "en" for English language code', () => {
      const result = LanguageService.validateLanguage('en');
      expect(result).toBe('en');
    });

    it('should return "mr" for Marathi language code', () => {
      const result = LanguageService.validateLanguage('mr');
      expect(result).toBe('mr');
    });

    it('should default to "en" for invalid language code', () => {
      const result = LanguageService.validateLanguage('fr');
      expect(result).toBe('en');
    });

    it('should default to "en" for null input', () => {
      const result = LanguageService.validateLanguage(null);
      expect(result).toBe('en');
    });

    it('should default to "en" for undefined input', () => {
      const result = LanguageService.validateLanguage(undefined);
      expect(result).toBe('en');
    });

    it('should default to "en" for empty string', () => {
      const result = LanguageService.validateLanguage('');
      expect(result).toBe('en');
    });

    it('should default to "en" for numeric input', () => {
      const result = LanguageService.validateLanguage(123);
      expect(result).toBe('en');
    });

    it('should default to "en" for uppercase language codes', () => {
      const result = LanguageService.validateLanguage('EN');
      expect(result).toBe('en');
    });
  });

  describe('selectContent', () => {
    describe('with English language', () => {
      it('should return English content for topic object', () => {
        const contentObject = {
          title: 'Vata Dosha',
          titleMr: 'वात दोष',
          introduction: 'Vata is one of the three doshas',
          introductionMr: 'वात तीन दोषांपैकी एक आहे',
          slug: 'vata-dosha',
          difficulty: 'beginner'
        };

        const result = LanguageService.selectContent(contentObject, 'en');

        expect(result.title).toBe('Vata Dosha');
        expect(result.introduction).toBe('Vata is one of the three doshas');
        expect(result.slug).toBe('vata-dosha');
        expect(result.difficulty).toBe('beginner');
        expect(result.titleMr).toBe('वात दोष');
        expect(result.introductionMr).toBe('वात तीन दोषांपैकी एक आहे');
      });

      it('should return English content for all translatable fields', () => {
        const contentObject = {
          title: 'Test Title',
          titleMr: 'चाचणी शीर्षक',
          description: 'Test Description',
          descriptionMr: 'चाचणी वर्णन',
          introduction: 'Test Introduction',
          introductionMr: 'चाचणी परिचय',
          historicalContext: 'Test Historical Context',
          historicalContextMr: 'चाचणी ऐतिहासिक संदर्भ',
          coreExplanation: 'Test Core Explanation',
          coreExplanationMr: 'चाचणी मुख्य स्पष्टीकरण',
          clinicalApplications: 'Test Clinical Applications',
          clinicalApplicationsMr: 'चाचणी क्लिनिकल अनुप्रयोग',
          modernComparison: 'Test Modern Comparison',
          modernComparisonMr: 'चाचणी आधुनिक तुलना',
          summary: ['Point 1', 'Point 2'],
          summaryMr: ['मुद्दा १', 'मुद्दा २'],
          furtherReading: ['Reference 1', 'Reference 2'],
          furtherReadingMr: ['संदर्भ १', 'संदर्भ २']
        };

        const result = LanguageService.selectContent(contentObject, 'en');

        expect(result.title).toBe('Test Title');
        expect(result.description).toBe('Test Description');
        expect(result.introduction).toBe('Test Introduction');
        expect(result.historicalContext).toBe('Test Historical Context');
        expect(result.coreExplanation).toBe('Test Core Explanation');
        expect(result.clinicalApplications).toBe('Test Clinical Applications');
        expect(result.modernComparison).toBe('Test Modern Comparison');
        expect(result.summary).toEqual(['Point 1', 'Point 2']);
        expect(result.furtherReading).toEqual(['Reference 1', 'Reference 2']);
      });

      it('should copy non-translatable fields directly', () => {
        const contentObject = {
          _id: 'topic123',
          slug: 'test-topic',
          subjectSlug: 'test-subject',
          difficulty: 'intermediate',
          estimatedMins: 30,
          orderIndex: 5,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-02'),
          title: 'Test Title',
          titleMr: 'चाचणी शीर्षक'
        };

        const result = LanguageService.selectContent(contentObject, 'en');

        expect(result._id).toBe('topic123');
        expect(result.slug).toBe('test-topic');
        expect(result.subjectSlug).toBe('test-subject');
        expect(result.difficulty).toBe('intermediate');
        expect(result.estimatedMins).toBe(30);
        expect(result.orderIndex).toBe(5);
        expect(result.createdAt).toEqual(new Date('2024-01-01'));
        expect(result.updatedAt).toEqual(new Date('2024-01-02'));
      });
    });

    describe('with Marathi language', () => {
      it('should return Marathi content when available', () => {
        const contentObject = {
          title: 'Vata Dosha',
          titleMr: 'वात दोष',
          introduction: 'Vata is one of the three doshas',
          introductionMr: 'वात तीन दोषांपैकी एक आहे',
          slug: 'vata-dosha'
        };

        const result = LanguageService.selectContent(contentObject, 'mr');

        expect(result.title).toBe('वात दोष');
        expect(result.introduction).toBe('वात तीन दोषांपैकी एक आहे');
        expect(result.slug).toBe('vata-dosha');
      });

      it('should fallback to English when Marathi translation is missing', () => {
        const contentObject = {
          title: 'Vata Dosha',
          titleMr: 'वात दोष',
          introduction: 'Vata is one of the three doshas',
          // introductionMr is missing
          description: 'Test Description'
          // descriptionMr is missing
        };

        const result = LanguageService.selectContent(contentObject, 'mr');

        expect(result.title).toBe('वात दोष');
        expect(result.introduction).toBe('Vata is one of the three doshas'); // Fallback
        expect(result.description).toBe('Test Description'); // Fallback
      });

      it('should fallback to English when Marathi field is empty string', () => {
        const contentObject = {
          title: 'Vata Dosha',
          titleMr: '',
          introduction: 'Vata is one of the three doshas',
          introductionMr: ''
        };

        const result = LanguageService.selectContent(contentObject, 'mr');

        expect(result.title).toBe('Vata Dosha');
        expect(result.introduction).toBe('Vata is one of the three doshas');
      });

      it('should fallback to English when Marathi field is null', () => {
        const contentObject = {
          title: 'Vata Dosha',
          titleMr: null,
          introduction: 'Vata is one of the three doshas',
          introductionMr: null
        };

        const result = LanguageService.selectContent(contentObject, 'mr');

        expect(result.title).toBe('Vata Dosha');
        expect(result.introduction).toBe('Vata is one of the three doshas');
      });
    });

    describe('with shloka object', () => {
      it('should return English translation for shloka in English mode', () => {
        const contentObject = {
          title: 'Test Topic',
          shloka: {
            devanagari: 'वातः पित्तं कफश्चेति',
            transliteration: 'vātaḥ pittaṃ kaphaśceti',
            translation: 'Vata, Pitta and Kapha are the three doshas',
            translationMr: 'वात, पित्त आणि कफ हे तीन दोष आहेत',
            source: 'Charaka Samhita'
          }
        };

        const result = LanguageService.selectContent(contentObject, 'en');

        expect(result.shloka).toBeDefined();
        expect(result.shloka.devanagari).toBe('वातः पित्तं कफश्चेति');
        expect(result.shloka.transliteration).toBe('vātaḥ pittaṃ kaphaśceti');
        expect(result.shloka.translation).toBe('Vata, Pitta and Kapha are the three doshas');
        expect(result.shloka.source).toBe('Charaka Samhita');
        expect(result.shloka.translationMr).toBe('वात, पित्त आणि कफ हे तीन दोष आहेत');
      });

      it('should return Marathi translation for shloka in Marathi mode', () => {
        const contentObject = {
          title: 'Test Topic',
          shloka: {
            devanagari: 'वातः पित्तं कफश्चेति',
            transliteration: 'vātaḥ pittaṃ kaphaśceti',
            translation: 'Vata, Pitta and Kapha are the three doshas',
            translationMr: 'वात, पित्त आणि कफ हे तीन दोष आहेत',
            source: 'Charaka Samhita'
          }
        };

        const result = LanguageService.selectContent(contentObject, 'mr');

        expect(result.shloka).toBeDefined();
        expect(result.shloka.translation).toBe('वात, पित्त आणि कफ हे तीन दोष आहेत');
      });

      it('should fallback to English translation when Marathi translation is missing', () => {
        const contentObject = {
          title: 'Test Topic',
          shloka: {
            devanagari: 'वातः पित्तं कफश्चेति',
            transliteration: 'vātaḥ pittaṃ kaphaśceti',
            translation: 'Vata, Pitta and Kapha are the three doshas',
            source: 'Charaka Samhita'
            // translationMr is missing
          }
        };

        const result = LanguageService.selectContent(contentObject, 'mr');

        expect(result.shloka.translation).toBe('Vata, Pitta and Kapha are the three doshas');
      });
    });

    describe('with herb content', () => {
      it('should handle herb-specific fields in English', () => {
        const contentObject = {
          commonName: 'Turmeric',
          commonNameMr: 'हळद',
          botanicalName: 'Curcuma longa',
          sanskritName: 'Haridra',
          medicinalUses: 'Anti-inflammatory properties',
          medicinalUsesMr: 'दाहक-विरोधी गुणधर्म',
          preparations: 'Powder, paste, decoction',
          preparationsMr: 'पावडर, पेस्ट, काढा',
          contraindications: 'Avoid in pregnancy',
          contraindicationsMr: 'गर्भधारणेत टाळा'
        };

        const result = LanguageService.selectContent(contentObject, 'en');

        expect(result.commonName).toBe('Turmeric');
        expect(result.botanicalName).toBe('Curcuma longa');
        expect(result.sanskritName).toBe('Haridra');
        expect(result.medicinalUses).toBe('Anti-inflammatory properties');
        expect(result.preparations).toBe('Powder, paste, decoction');
        expect(result.contraindications).toBe('Avoid in pregnancy');
      });

      it('should handle herb-specific fields in Marathi with fallback', () => {
        const contentObject = {
          commonName: 'Turmeric',
          commonNameMr: 'हळद',
          botanicalName: 'Curcuma longa',
          medicinalUses: 'Anti-inflammatory properties',
          medicinalUsesMr: 'दाहक-विरोधी गुणधर्म',
          preparations: 'Powder, paste, decoction',
          // preparationsMr is missing
          contraindications: 'Avoid in pregnancy'
          // contraindicationsMr is missing
        };

        const result = LanguageService.selectContent(contentObject, 'mr');

        expect(result.commonName).toBe('हळद');
        expect(result.botanicalName).toBe('Curcuma longa');
        expect(result.medicinalUses).toBe('दाहक-विरोधी गुणधर्म');
        expect(result.preparations).toBe('Powder, paste, decoction'); // Fallback
        expect(result.contraindications).toBe('Avoid in pregnancy'); // Fallback
      });
    });

    describe('edge cases', () => {
      it('should return empty object for null input', () => {
        const result = LanguageService.selectContent(null, 'en');
        expect(result).toEqual({});
      });

      it('should return empty object for undefined input', () => {
        const result = LanguageService.selectContent(undefined, 'en');
        expect(result).toEqual({});
      });

      it('should handle empty object', () => {
        const result = LanguageService.selectContent({}, 'en');
        expect(result).toEqual({});
      });

      it('should handle object with only non-translatable fields', () => {
        const contentObject = {
          _id: 'test123',
          slug: 'test-slug',
          difficulty: 'beginner'
        };

        const result = LanguageService.selectContent(contentObject, 'en');

        expect(result._id).toBe('test123');
        expect(result.slug).toBe('test-slug');
        expect(result.difficulty).toBe('beginner');
      });

      it('should handle invalid language code by defaulting to English', () => {
        const contentObject = {
          title: 'Test Title',
          titleMr: 'चाचणी शीर्षक'
        };

        const result = LanguageService.selectContent(contentObject, 'invalid');

        expect(result.title).toBe('Test Title');
      });
    });
  });

  describe('formatBilingualResponse', () => {
    it('should return object with both en and mr fields', () => {
      const contentObject = {
        title: 'Vata Dosha',
        titleMr: 'वात दोष',
        introduction: 'Vata is one of the three doshas',
        introductionMr: 'वात तीन दोषांपैकी एक आहे',
        slug: 'vata-dosha'
      };

      const result = LanguageService.formatBilingualResponse(contentObject);

      expect(result).toHaveProperty('en');
      expect(result).toHaveProperty('mr');
      expect(result.en.title).toBe('Vata Dosha');
      expect(result.en.introduction).toBe('Vata is one of the three doshas');
      expect(result.mr.title).toBe('वात दोष');
      expect(result.mr.introduction).toBe('वात तीन दोषांपैकी एक आहे');
    });

    it('should include non-translatable fields in both en and mr', () => {
      const contentObject = {
        _id: 'topic123',
        slug: 'test-topic',
        title: 'Test Title',
        titleMr: 'चाचणी शीर्षक',
        difficulty: 'beginner'
      };

      const result = LanguageService.formatBilingualResponse(contentObject);

      expect(result.en._id).toBe('topic123');
      expect(result.en.slug).toBe('test-topic');
      expect(result.en.difficulty).toBe('beginner');
      expect(result.mr._id).toBe('topic123');
      expect(result.mr.slug).toBe('test-topic');
      expect(result.mr.difficulty).toBe('beginner');
    });

    it('should handle Marathi fallback in mr field', () => {
      const contentObject = {
        title: 'Test Title',
        titleMr: 'चाचणी शीर्षक',
        description: 'Test Description'
        // descriptionMr is missing
      };

      const result = LanguageService.formatBilingualResponse(contentObject);

      expect(result.en.title).toBe('Test Title');
      expect(result.en.description).toBe('Test Description');
      expect(result.mr.title).toBe('चाचणी शीर्षक');
      expect(result.mr.description).toBe('Test Description'); // Fallback
    });

    it('should return empty en and mr objects for null input', () => {
      const result = LanguageService.formatBilingualResponse(null);

      expect(result).toEqual({ en: {}, mr: {} });
    });

    it('should return empty en and mr objects for undefined input', () => {
      const result = LanguageService.formatBilingualResponse(undefined);

      expect(result).toEqual({ en: {}, mr: {} });
    });

    it('should handle complex content with all field types', () => {
      const contentObject = {
        _id: 'topic123',
        slug: 'vata-dosha',
        title: 'Vata Dosha',
        titleMr: 'वात दोष',
        introduction: 'Introduction text',
        introductionMr: 'परिचय मजकूर',
        difficulty: 'beginner',
        estimatedMins: 30,
        shloka: {
          devanagari: 'वातः पित्तं कफश्चेति',
          transliteration: 'vātaḥ pittaṃ kaphaśceti',
          translation: 'English translation',
          translationMr: 'मराठी भाषांतर',
          source: 'Charaka Samhita'
        }
      };

      const result = LanguageService.formatBilingualResponse(contentObject);

      expect(result.en.title).toBe('Vata Dosha');
      expect(result.en.shloka.translation).toBe('English translation');
      expect(result.mr.title).toBe('वात दोष');
      expect(result.mr.shloka.translation).toBe('मराठी भाषांतर');
      expect(result.en.difficulty).toBe('beginner');
      expect(result.mr.difficulty).toBe('beginner');
    });
  });
});
