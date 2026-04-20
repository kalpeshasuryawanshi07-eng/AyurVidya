/**
 * LanguageService
 * 
 * Provides bilingual content management for English and Marathi languages.
 * Handles language validation, content selection, and fallback logic.
 */

class LanguageService {
  /**
   * Validates and normalizes language code
   * @param {string} lang - Language code to validate
   * @returns {string} - Normalized language code ("en" or "mr")
   */
  static validateLanguage(lang) {
    // Only accept "en" or "mr", default to "en" for invalid input
    if (lang === 'mr') {
      return 'mr';
    }
    return 'en';
  }

  /**
   * Selects language-specific content from a content object
   * @param {Object} contentObject - Object containing bilingual content
   * @param {string} language - Language code ("en" or "mr")
   * @returns {Object} - Content object with language-specific fields
   */
  static selectContent(contentObject, language) {
    if (!contentObject) {
      return {};
    }

    const validLang = this.validateLanguage(language);
    const result = { ...contentObject }; // Start with a shallow copy to preserve non-translatable fields

    // 1. Classical Flattened Field Mappings (e.g., desc vs descMr)
    const fieldMappings = {
      title: 'titleMr',
      description: 'descriptionMr',
      introduction: 'introductionMr',
      historicalContext: 'historicalContextMr',
      coreExplanation: 'coreExplanationMr',
      clinicalApplications: 'clinicalApplicationsMr',
      modernComparison: 'modernComparisonMr',
      summary: 'summaryMr',
      furtherReading: 'furtherReadingMr',
      commonName: 'commonNameMr',
      medicinalUses: 'medicinalUsesMr',
      preparations: 'preparationsMr',
      contraindications: 'contraindicationsMr',
      dosage: 'dosageMr',
      ayurvedicProperties: 'ayurvedicPropertiesMr'
    };

    for (const [enField, mrField] of Object.entries(fieldMappings)) {
      if (contentObject.hasOwnProperty(enField)) {
        if (validLang === 'mr') {
          const mrValue = contentObject[mrField];
          const enValue = contentObject[enField];
          const isMrValueProvided = Array.isArray(mrValue) 
            ? mrValue.length > 0 
            : (mrValue !== null && mrValue !== undefined && mrValue !== '');
          result[enField] = isMrValueProvided ? mrValue : enValue;
        } else {
          result[enField] = contentObject[enField];
        }
      }
    }

    // 2. NEW: Nested Bilingual Objects { en: string, mr: string }
    const nestedBilingualFields = [
      'about', 'pharmacodynamicsExplanation', 'doshaEffectExplanation',
      'chemicalProfile', 'drugInteractions'
    ];

    for (const field of nestedBilingualFields) {
      if (contentObject[field] && typeof contentObject[field] === 'object') {
        const fieldObj = contentObject[field];
        if (fieldObj.en !== undefined || fieldObj.mr !== undefined) {
          result[field] = validLang === 'mr' ? (fieldObj.mr || fieldObj.en) : fieldObj.en;
        }
      }
    }

    // 3. NEW: Complex Academic Sections (vivaPrep, morphology, etc.)
    // These require deep localization or structured preservation
    
    // Handle vivaPrep
    if (contentObject.vivaPrep && typeof contentObject.vivaPrep === 'object') {
      const v = contentObject.vivaPrep || {};
      result.vivaPrep = {
        ...v,
        etymology: (v.etymology && typeof v.etymology === 'object') 
          ? (validLang === 'mr' ? (v.etymology.mr || v.etymology.en) : v.etymology.en) 
          : undefined,
        rasaPanchakaSummary: (v.rasaPanchakaSummary && typeof v.rasaPanchakaSummary === 'object') 
          ? (validLang === 'mr' ? (v.rasaPanchakaSummary.mr || v.rasaPanchakaSummary.en) : v.rasaPanchakaSummary.en) 
          : undefined,
        vivaQuestions: Array.isArray(v.vivaQuestions) ? v.vivaQuestions.map(q => {
          if (!q || typeof q !== 'object') return {};
          return {
            question: (q.question && typeof q.question === 'object') 
              ? (validLang === 'mr' ? (q.question.mr || q.question.en) : q.question.en) 
              : (q.question || ''),
            answer: (q.answer && typeof q.answer === 'object') 
              ? (validLang === 'mr' ? (q.answer.mr || q.answer.en) : q.answer.en) 
              : (q.answer || '')
          };
        }) : []
      };
    }

    // Handle modernResearchDetailed
    if (Array.isArray(contentObject.modernResearchDetailed)) {
      result.modernResearchDetailed = contentObject.modernResearchDetailed.map(r => {
        if (!r || typeof r !== 'object') return r;
        return {
          ...r,
          action: (r.action && typeof r.action === 'object') 
            ? (validLang === 'mr' ? (r.action.mr || r.action.en) : r.action.en) 
            : (r.action || ''),
          mechanism: (r.mechanism && typeof r.mechanism === 'object') 
            ? (validLang === 'mr' ? (r.mechanism.mr || r.mechanism.en) : r.mechanism.en) 
            : (r.mechanism || '')
        };
      });
    }

    // Handle synonymsDetailed
    if (Array.isArray(contentObject.synonymsDetailed)) {
      result.synonymsDetailed = contentObject.synonymsDetailed.map(s => {
        if (!s || typeof s !== 'object') return s;
        return {
          ...s,
          name: (s.name && typeof s.name === 'object') 
            ? (validLang === 'mr' ? (s.name.mr || s.name.en) : s.name.en) 
            : (s.name || ''),
          meaning: (s.meaning && typeof s.meaning === 'object') 
            ? (validLang === 'mr' ? (s.meaning.mr || s.meaning.en) : s.meaning.en) 
            : (s.meaning || '')
        };
      });
    }

    // Handle therapeuticActions
    if (contentObject.therapeuticActions && typeof contentObject.therapeuticActions === 'object') {
      const ta = contentObject.therapeuticActions;
      result.therapeuticActions = {
        doshaKarma: (ta.doshaKarma && typeof ta.doshaKarma === 'object') 
          ? (validLang === 'mr' ? (ta.doshaKarma.mr || ta.doshaKarma.en) : ta.doshaKarma.en) 
          : undefined,
        dhatuKarma: (ta.dhatuKarma && typeof ta.dhatuKarma === 'object') 
          ? (validLang === 'mr' ? (ta.dhatuKarma.mr || ta.dhatuKarma.en) : ta.dhatuKarma.en) 
          : undefined,
        generalActions: (ta.generalActions && typeof ta.generalActions === 'object') 
          ? (validLang === 'mr' ? (ta.generalActions.mr || ta.generalActions.en) : ta.generalActions.en) 
          : undefined
      };
    }

    // Handle shloka
    if (contentObject.shloka) {
      result.shloka = {
        ...contentObject.shloka,
        translation: validLang === 'mr' 
          ? (contentObject.shloka.translationMr || contentObject.shloka.translation)
          : contentObject.shloka.translation
      };
    }

    // NEW: Handle High-Density Academic Fields
    
    // Handle classicalKarmas
    if (Array.isArray(contentObject.classicalKarmas)) {
      result.classicalKarmas = contentObject.classicalKarmas.map(k => ({
        name: validLang === 'mr' ? (k.name.mr || k.name.en) : k.name.en,
        details: validLang === 'mr' ? (k.details.mr || k.details.en) : k.details.en
      }));
    }

    // Handle formulations
    if (Array.isArray(contentObject.formulations)) {
      result.formulations = contentObject.formulations.map(f => ({
        name: validLang === 'mr' ? (f.name.mr || f.name.en) : f.name.en,
        details: validLang === 'mr' ? (f.details.mr || f.details.en) : f.details.en
      }));
    }

    // Handle phytochemistry
    if (Array.isArray(contentObject.phytochemistry)) {
      result.phytochemistry = contentObject.phytochemistry.map(p => ({
        name: validLang === 'mr' ? (p.name.mr || p.name.en) : p.name.en,
        details: validLang === 'mr' ? (p.details.mr || p.details.en) : p.details.en
      }));
    }

    return result;
  }

  /**
   * Formats content object with both English and Marathi fields
   * @param {Object} contentObject - Object containing bilingual content
   * @returns {Object} - Object with both en and mr fields
   */
  static formatBilingualResponse(contentObject) {
    if (!contentObject) {
      return { en: {}, mr: {} };
    }

    return {
      en: this.selectContent(contentObject, 'en'),
      mr: this.selectContent(contentObject, 'mr')
    };
  }
}

module.exports = LanguageService;
