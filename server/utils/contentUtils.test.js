/**
 * Unit tests for Content Utilities
 */

const { Content_Parser, Content_Printer } = require('./contentUtils');

describe('Content_Parser', () => {
  describe('parse', () => {
    const validContentData = {
      slug: 'vata-dosha',
      subjectSlug: 'basic-principles',
      title: 'Vata Dosha',
      titleMr: 'वात दोष',
      difficulty: 'beginner',
      estimatedMins: 15,
      orderIndex: 1,
      introduction: 'Introduction to Vata Dosha',
      historicalContext: 'Historical context of Vata',
      coreExplanation: 'Core explanation of Vata',
      clinicalApplications: 'Clinical applications',
      modernComparison: 'Modern comparison',
      summary: ['Point 1', 'Point 2', 'Point 3'],
      furtherReading: ['Reference 1', 'Reference 2']
    };

    it('should parse valid content data successfully', () => {
      const result = Content_Parser.parse(validContentData);

      expect(result).toHaveProperty('slug', 'vata-dosha');
      expect(result).toHaveProperty('subjectSlug', 'basic-principles');
      expect(result).toHaveProperty('title', 'Vata Dosha');
      expect(result).toHaveProperty('titleMr', 'वात दोष');
      expect(result).toHaveProperty('difficulty', 'beginner');
      expect(result).toHaveProperty('estimatedMins', 15);
      expect(result).toHaveProperty('orderIndex', 1);
      expect(result).toHaveProperty('introduction');
      expect(result).toHaveProperty('historicalContext');
      expect(result).toHaveProperty('coreExplanation');
      expect(result).toHaveProperty('clinicalApplications');
      expect(result).toHaveProperty('modernComparison');
      expect(result.summary).toEqual(['Point 1', 'Point 2', 'Point 3']);
      expect(result.furtherReading).toEqual(['Reference 1', 'Reference 2']);
    });

    it('should throw ValidationError when content data is null', () => {
      expect(() => Content_Parser.parse(null)).toThrow('Content data must be an object');
    });

    it('should throw ValidationError when content data is not an object', () => {
      expect(() => Content_Parser.parse('invalid')).toThrow('Content data must be an object');
    });

    it('should throw ValidationError when required fields are missing', () => {
      const incompleteData = {
        slug: 'test-slug',
        title: 'Test Title'
      };

      expect(() => Content_Parser.parse(incompleteData)).toThrow(/Missing required fields/);
    });

    it('should throw ValidationError for invalid slug format', () => {
      const invalidSlugData = {
        ...validContentData,
        slug: 'Invalid Slug With Spaces'
      };

      expect(() => Content_Parser.parse(invalidSlugData)).toThrow(/Invalid slug format/);
    });

    it('should normalize slug to lowercase', () => {
      const upperCaseSlugData = {
        ...validContentData,
        slug: 'VATA-DOSHA'
      };

      const result = Content_Parser.parse(upperCaseSlugData);
      expect(result.slug).toBe('vata-dosha');
    });

    it('should throw ValidationError for invalid difficulty level', () => {
      const invalidDifficultyData = {
        ...validContentData,
        difficulty: 'expert'
      };

      expect(() => Content_Parser.parse(invalidDifficultyData)).toThrow(/Invalid difficulty level/);
    });

    it('should accept valid difficulty levels', () => {
      const difficulties = ['beginner', 'intermediate', 'advanced'];

      difficulties.forEach(difficulty => {
        const data = { ...validContentData, difficulty };
        const result = Content_Parser.parse(data);
        expect(result.difficulty).toBe(difficulty);
      });
    });

    it('should throw ValidationError for negative estimatedMins', () => {
      const negativeData = {
        ...validContentData,
        estimatedMins: -5
      };

      expect(() => Content_Parser.parse(negativeData)).toThrow(/must be a non-negative number/);
    });

    it('should throw ValidationError for non-numeric estimatedMins', () => {
      const invalidData = {
        ...validContentData,
        estimatedMins: 'not a number'
      };

      expect(() => Content_Parser.parse(invalidData)).toThrow(/must be a non-negative number/);
    });

    it('should sanitize HTML content to prevent XSS', () => {
      const xssData = {
        ...validContentData,
        introduction: '<script>alert("XSS")</script><p>Safe content</p>'
      };

      const result = Content_Parser.parse(xssData);
      expect(result.introduction).not.toContain('<script>');
      expect(result.introduction).toContain('<p>Safe content</p>');
    });

    it('should allow safe HTML tags', () => {
      const safeHtmlData = {
        ...validContentData,
        coreExplanation: '<p>Paragraph</p><strong>Bold</strong><em>Italic</em><ul><li>List item</li></ul>'
      };

      const result = Content_Parser.parse(safeHtmlData);
      expect(result.coreExplanation).toContain('<p>');
      expect(result.coreExplanation).toContain('<strong>');
      expect(result.coreExplanation).toContain('<em>');
      expect(result.coreExplanation).toContain('<ul>');
      expect(result.coreExplanation).toContain('<li>');
    });

    it('should handle optional Marathi fields', () => {
      const marathiData = {
        ...validContentData,
        introductionMr: 'मराठी परिचय',
        historicalContextMr: 'ऐतिहासिक संदर्भ',
        summaryMr: ['मुद्दा १', 'मुद्दा २']
      };

      const result = Content_Parser.parse(marathiData);
      expect(result.introductionMr).toBe('मराठी परिचय');
      expect(result.historicalContextMr).toBe('ऐतिहासिक संदर्भ');
      expect(result.summaryMr).toEqual(['मुद्दा १', 'मुद्दा २']);
    });

    it('should parse shloka object correctly', () => {
      const shlokaData = {
        ...validContentData,
        shloka: {
          devanagari: 'वातः पित्तं कफश्चेति',
          transliteration: 'vātaḥ pittaṃ kaphaśceti',
          translation: 'Vata, Pitta, and Kapha',
          translationMr: 'वात, पित्त आणि कफ',
          source: 'Charaka Samhita'
        }
      };

      const result = Content_Parser.parse(shlokaData);
      expect(result.shloka).toBeDefined();
      expect(result.shloka.devanagari).toBe('वातः पित्तं कफश्चेति');
      expect(result.shloka.transliteration).toBe('vātaḥ pittaṃ kaphaśceti');
      expect(result.shloka.translation).toBe('Vata, Pitta, and Kapha');
      expect(result.shloka.translationMr).toBe('वात, पित्त आणि कफ');
      expect(result.shloka.source).toBe('Charaka Samhita');
    });

    it('should handle empty arrays for summary and furtherReading', () => {
      const emptyArrayData = {
        ...validContentData,
        summary: [],
        furtherReading: []
      };

      const result = Content_Parser.parse(emptyArrayData);
      expect(result.summary).toEqual([]);
      expect(result.furtherReading).toEqual([]);
    });

    it('should handle missing optional arrays with default empty arrays', () => {
      const noArrayData = {
        ...validContentData,
        summary: undefined,
        furtherReading: undefined
      };

      const result = Content_Parser.parse(noArrayData);
      expect(result.summary).toEqual([]);
      expect(result.furtherReading).toEqual([]);
    });

    it('should filter out empty strings from arrays', () => {
      const arrayWithEmptyData = {
        ...validContentData,
        summary: ['Point 1', '', 'Point 2', '   ', 'Point 3'],
        furtherReading: ['Ref 1', '', 'Ref 2']
      };

      const result = Content_Parser.parse(arrayWithEmptyData);
      expect(result.summary).toEqual(['Point 1', 'Point 2', 'Point 3']);
      expect(result.furtherReading).toEqual(['Ref 1', 'Ref 2']);
    });

    it('should trim whitespace from text fields', () => {
      const whitespaceData = {
        ...validContentData,
        title: '  Vata Dosha  ',
        introduction: '  Introduction with spaces  '
      };

      const result = Content_Parser.parse(whitespaceData);
      expect(result.title).toBe('Vata Dosha');
      expect(result.introduction).not.toMatch(/^\s+|\s+$/);
    });
  });
});

describe('Content_Printer', () => {
  const sampleTopic = {
    _id: '507f1f77bcf86cd799439011',
    slug: 'vata-dosha',
    subjectSlug: 'basic-principles',
    title: 'Vata Dosha',
    titleMr: 'वात दोष',
    difficulty: 'beginner',
    estimatedMins: 15,
    orderIndex: 1,
    introduction: 'Introduction to Vata Dosha',
    introductionMr: 'वात दोषाचा परिचय',
    historicalContext: 'Historical context',
    historicalContextMr: 'ऐतिहासिक संदर्भ',
    coreExplanation: 'Core explanation',
    coreExplanationMr: 'मुख्य स्पष्टीकरण',
    clinicalApplications: 'Clinical applications',
    clinicalApplicationsMr: 'क्लिनिकल अनुप्रयोग',
    modernComparison: 'Modern comparison',
    modernComparisonMr: 'आधुनिक तुलना',
    summary: ['Point 1', 'Point 2', 'Point 3'],
    summaryMr: ['मुद्दा १', 'मुद्दा २', 'मुद्दा ३'],
    furtherReading: ['Reference 1', 'Reference 2'],
    furtherReadingMr: ['संदर्भ १', 'संदर्भ २'],
    shloka: {
      devanagari: 'वातः पित्तं कफश्चेति',
      transliteration: 'vātaḥ pittaṃ kaphaśceti',
      translation: 'Vata, Pitta, and Kapha',
      translationMr: 'वात, पित्त आणि कफ',
      source: 'Charaka Samhita'
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02')
  };

  describe('format', () => {
    it('should return null for null input', () => {
      const result = Content_Printer.format(null);
      expect(result).toBeNull();
    });

    it('should format bilingual content when no language specified', () => {
      const result = Content_Printer.format(sampleTopic);

      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('slug', 'vata-dosha');
      expect(result).toHaveProperty('subjectSlug', 'basic-principles');
      expect(result.title).toEqual({
        en: 'Vata Dosha',
        mr: 'वात दोष'
      });
      expect(result.content).toHaveProperty('en');
      expect(result.content).toHaveProperty('mr');
    });

    it('should format English content when language is "en"', () => {
      const result = Content_Printer.format(sampleTopic, 'en');

      expect(result.title).toBe('Vata Dosha');
      expect(result.content.introduction).toBe('Introduction to Vata Dosha');
      expect(result.content.historicalContext).toBe('Historical context');
      expect(result.content.coreExplanation).toBe('Core explanation');
    });

    it('should format Marathi content when language is "mr"', () => {
      const result = Content_Printer.format(sampleTopic, 'mr');

      expect(result.title).toBe('वात दोष');
      expect(result.content.introduction).toBe('वात दोषाचा परिचय');
      expect(result.content.historicalContext).toBe('ऐतिहासिक संदर्भ');
      expect(result.content.coreExplanation).toBe('मुख्य स्पष्टीकरण');
    });

    it('should fallback to English when Marathi translation is missing', () => {
      const topicWithoutMarathi = {
        ...sampleTopic,
        titleMr: null,
        introductionMr: null
      };

      const result = Content_Printer.format(topicWithoutMarathi, 'mr');

      expect(result.title).toBe('Vata Dosha'); // Fallback to English
      expect(result.content.introduction).toBe('Introduction to Vata Dosha'); // Fallback
    });

    it('should format summary as ordered list', () => {
      const result = Content_Printer.format(sampleTopic, 'en');

      expect(result.content.summary).toEqual([
        { order: 1, text: 'Point 1' },
        { order: 2, text: 'Point 2' },
        { order: 3, text: 'Point 3' }
      ]);
    });

    it('should format furtherReading as reference list', () => {
      const result = Content_Printer.format(sampleTopic, 'en');

      expect(result.content.furtherReading).toEqual([
        { id: 1, reference: 'Reference 1' },
        { id: 2, reference: 'Reference 2' }
      ]);
    });

    it('should format shloka with English translation', () => {
      const result = Content_Printer.format(sampleTopic, 'en');

      expect(result.shloka).toEqual({
        devanagari: 'वातः पित्तं कफश्चेति',
        transliteration: 'vātaḥ pittaṃ kaphaśceti',
        translation: 'Vata, Pitta, and Kapha',
        source: 'Charaka Samhita'
      });
    });

    it('should format shloka with Marathi translation', () => {
      const result = Content_Printer.format(sampleTopic, 'mr');

      expect(result.shloka).toEqual({
        devanagari: 'वातः पित्तं कफश्चेति',
        transliteration: 'vātaḥ pittaṃ kaphaśceti',
        translation: 'वात, पित्त आणि कफ',
        source: 'Charaka Samhita'
      });
    });

    it('should handle missing shloka', () => {
      const topicWithoutShloka = {
        ...sampleTopic,
        shloka: null
      };

      const result = Content_Printer.format(topicWithoutShloka, 'en');
      expect(result.shloka).toBeNull();
    });

    it('should handle empty summary array', () => {
      const topicWithEmptySummary = {
        ...sampleTopic,
        summary: []
      };

      const result = Content_Printer.format(topicWithEmptySummary, 'en');
      expect(result.content.summary).toEqual([]);
    });

    it('should handle empty furtherReading array', () => {
      const topicWithEmptyReading = {
        ...sampleTopic,
        furtherReading: []
      };

      const result = Content_Printer.format(topicWithEmptyReading, 'en');
      expect(result.content.furtherReading).toEqual([]);
    });

    it('should include metadata fields', () => {
      const result = Content_Printer.format(sampleTopic, 'en');

      expect(result).toHaveProperty('difficulty', 'beginner');
      expect(result).toHaveProperty('estimatedMins', 15);
      expect(result).toHaveProperty('orderIndex', 1);
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
    });

    it('should handle Mongoose document with toObject method', () => {
      const mockMongooseDoc = {
        ...sampleTopic,
        toObject: function() {
          return { ...sampleTopic };
        }
      };

      const result = Content_Printer.format(mockMongooseDoc, 'en');
      expect(result).toHaveProperty('slug', 'vata-dosha');
      expect(result).toHaveProperty('title', 'Vata Dosha');
    });

    it('should format bilingual summary correctly', () => {
      const result = Content_Printer.format(sampleTopic);

      expect(result.content.en.summary).toEqual([
        { order: 1, text: 'Point 1' },
        { order: 2, text: 'Point 2' },
        { order: 3, text: 'Point 3' }
      ]);

      expect(result.content.mr.summary).toEqual([
        { order: 1, text: 'मुद्दा १' },
        { order: 2, text: 'मुद्दा २' },
        { order: 3, text: 'मुद्दा ३' }
      ]);
    });

    it('should format bilingual furtherReading correctly', () => {
      const result = Content_Printer.format(sampleTopic);

      expect(result.content.en.furtherReading).toEqual([
        { id: 1, reference: 'Reference 1' },
        { id: 2, reference: 'Reference 2' }
      ]);

      expect(result.content.mr.furtherReading).toEqual([
        { id: 1, reference: 'संदर्भ १' },
        { id: 2, reference: 'संदर्भ २' }
      ]);
    });
  });
});

describe('Integration: Parse and Print', () => {
  it('should maintain data consistency through parse-print cycle', () => {
    const originalData = {
      slug: 'test-topic',
      subjectSlug: 'test-subject',
      title: 'Test Topic',
      difficulty: 'intermediate',
      estimatedMins: 20,
      orderIndex: 5,
      introduction: 'Test introduction',
      historicalContext: 'Test historical context',
      coreExplanation: 'Test core explanation',
      clinicalApplications: 'Test clinical applications',
      modernComparison: 'Test modern comparison',
      summary: ['Summary point 1', 'Summary point 2'],
      furtherReading: ['Reading 1', 'Reading 2'],
      shloka: {
        devanagari: 'देवनागरी',
        transliteration: 'devanāgarī',
        translation: 'Translation',
        source: 'Source'
      }
    };

    // Parse the data
    const parsed = Content_Parser.parse(originalData);

    // Print the parsed data
    const printed = Content_Printer.format(parsed, 'en');

    // Verify key fields are preserved
    expect(printed.slug).toBe(originalData.slug);
    expect(printed.subjectSlug).toBe(originalData.subjectSlug);
    expect(printed.title).toBe(originalData.title);
    expect(printed.difficulty).toBe(originalData.difficulty);
    expect(printed.estimatedMins).toBe(originalData.estimatedMins);
    expect(printed.orderIndex).toBe(originalData.orderIndex);
    expect(printed.content.introduction).toBe(originalData.introduction);
    expect(printed.content.historicalContext).toBe(originalData.historicalContext);
    expect(printed.content.coreExplanation).toBe(originalData.coreExplanation);
  });
});

describe('Property-Based Tests', () => {
  const fc = require('fast-check');

  /**
   * **Validates: Requirements 5.10**
   * 
   * Property 1: Round-trip consistency
   * 
   * For all valid topic content, parsing then printing then parsing
   * produces equivalent data.
   */
  describe('Round-trip consistency', () => {
    // Generator for valid slug strings (lowercase alphanumeric with hyphens)
    const slugArb = fc.stringMatching(/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/).filter(s => s.length >= 2 && s.length < 50);

    // Generator for valid difficulty levels
    const difficultyArb = fc.constantFrom('beginner', 'intermediate', 'advanced');

    // Generator for safe HTML content (no script tags, non-empty)
    const safeHtmlArb = fc.string({ minLength: 1, maxLength: 500 })
      .map(s => s.replace(/<script/gi, '').replace(/<\/script>/gi, ''))
      .filter(s => s.trim().length > 0);

    // Generator for non-empty text
    const textArb = fc.string({ minLength: 1, maxLength: 200 }).filter(s => s.trim().length > 0);

    // Generator for string arrays
    const stringArrayArb = fc.array(textArb, { minLength: 0, maxLength: 10 });

    // Generator for optional shloka
    const shlokaArb = fc.option(
      fc.record({
        devanagari: fc.option(textArb, { nil: undefined }),
        transliteration: fc.option(textArb, { nil: undefined }),
        translation: fc.option(textArb, { nil: undefined }),
        translationMr: fc.option(textArb, { nil: undefined }),
        source: fc.option(textArb, { nil: undefined })
      }),
      { nil: undefined }
    );

    // Generator for valid topic content
    const topicContentArb = fc.record({
      slug: slugArb,
      subjectSlug: slugArb,
      title: textArb,
      titleMr: fc.option(textArb, { nil: undefined }),
      difficulty: fc.option(difficultyArb, { nil: undefined }),
      estimatedMins: fc.integer({ min: 1, max: 300 }),
      orderIndex: fc.integer({ min: 1, max: 1000 }),
      introduction: safeHtmlArb,
      historicalContext: safeHtmlArb,
      coreExplanation: safeHtmlArb,
      clinicalApplications: safeHtmlArb,
      modernComparison: safeHtmlArb,
      summary: stringArrayArb,
      furtherReading: stringArrayArb,
      introductionMr: fc.option(safeHtmlArb, { nil: undefined }),
      historicalContextMr: fc.option(safeHtmlArb, { nil: undefined }),
      coreExplanationMr: fc.option(safeHtmlArb, { nil: undefined }),
      clinicalApplicationsMr: fc.option(safeHtmlArb, { nil: undefined }),
      modernComparisonMr: fc.option(safeHtmlArb, { nil: undefined }),
      summaryMr: fc.option(stringArrayArb, { nil: undefined }),
      furtherReadingMr: fc.option(stringArrayArb, { nil: undefined }),
      shloka: shlokaArb
    });

    it('should preserve data through parse -> print -> parse cycle', () => {
      fc.assert(
        fc.property(topicContentArb, (contentData) => {
          // Step 1: Parse the original content
          const parsed1 = Content_Parser.parse(contentData);

          // Step 2: Format the parsed content (using null to get raw data without language filtering)
          // We need to simulate a database object for the printer
          const dbObject = { ...parsed1 };
          const printed = Content_Printer.format(dbObject, 'en');

          // Step 3: Reconstruct content data from printed format for re-parsing
          const reconstructed = {
            slug: printed.slug,
            subjectSlug: printed.subjectSlug,
            title: printed.title,
            difficulty: printed.difficulty,
            estimatedMins: printed.estimatedMins,
            orderIndex: printed.orderIndex,
            introduction: printed.content.introduction,
            historicalContext: printed.content.historicalContext,
            coreExplanation: printed.content.coreExplanation,
            clinicalApplications: printed.content.clinicalApplications,
            modernComparison: printed.content.modernComparison,
            summary: printed.content.summary.map(item => item.text),
            furtherReading: printed.content.furtherReading.map(item => item.reference),
            shloka: printed.shloka ? {
              devanagari: printed.shloka.devanagari || undefined,
              transliteration: printed.shloka.transliteration || undefined,
              translation: printed.shloka.translation || undefined,
              source: printed.shloka.source || undefined
            } : undefined
          };

          // Step 4: Parse the reconstructed content
          const parsed2 = Content_Parser.parse(reconstructed);

          // Step 5: Compare the two parsed results
          // Core fields must be identical
          expect(parsed2.slug).toBe(parsed1.slug);
          expect(parsed2.subjectSlug).toBe(parsed1.subjectSlug);
          expect(parsed2.title).toBe(parsed1.title);
          expect(parsed2.difficulty).toBe(parsed1.difficulty);
          expect(parsed2.estimatedMins).toBe(parsed1.estimatedMins);
          expect(parsed2.orderIndex).toBe(parsed1.orderIndex);

          // Content fields must be identical (after sanitization)
          expect(parsed2.introduction).toBe(parsed1.introduction);
          expect(parsed2.historicalContext).toBe(parsed1.historicalContext);
          expect(parsed2.coreExplanation).toBe(parsed1.coreExplanation);
          expect(parsed2.clinicalApplications).toBe(parsed1.clinicalApplications);
          expect(parsed2.modernComparison).toBe(parsed1.modernComparison);

          // Arrays must be identical
          expect(parsed2.summary).toEqual(parsed1.summary);
          expect(parsed2.furtherReading).toEqual(parsed1.furtherReading);

          // Shloka must be identical (if present)
          if (parsed1.shloka) {
            expect(parsed2.shloka).toBeDefined();
            expect(parsed2.shloka.devanagari).toBe(parsed1.shloka.devanagari);
            expect(parsed2.shloka.transliteration).toBe(parsed1.shloka.transliteration);
            expect(parsed2.shloka.translation).toBe(parsed1.shloka.translation);
            expect(parsed2.shloka.source).toBe(parsed1.shloka.source);
          }
        }),
        { numRuns: 100 } // Run 100 random test cases
      );
    });
  });
});
