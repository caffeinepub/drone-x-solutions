import { useState, useCallback, useEffect } from 'react';
import { Language, TranslationKey, Translations, defaultTranslations } from '../utils/translations';

const LANGUAGE_KEY = 'droneX_language';
const CUSTOM_TRANSLATIONS_KEY = 'droneX_custom_translations';

let globalLanguage: Language = (localStorage.getItem(LANGUAGE_KEY) as Language) || 'en';
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach(fn => fn());
}

export function useTranslation() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate(n => n + 1);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    globalLanguage = lang;
    localStorage.setItem(LANGUAGE_KEY, lang);
    notifyListeners();
  }, []);

  const getCustomTranslations = useCallback((): Partial<Record<Language, Partial<Translations>>> => {
    try {
      const stored = localStorage.getItem(CUSTOM_TRANSLATIONS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }, []);

  const saveCustomTranslations = useCallback((lang: Language, translations: Partial<Translations>) => {
    const custom = getCustomTranslations();
    custom[lang] = { ...custom[lang], ...translations };
    localStorage.setItem(CUSTOM_TRANSLATIONS_KEY, JSON.stringify(custom));
    notifyListeners();
  }, [getCustomTranslations]);

  const t = useCallback((key: TranslationKey): string => {
    const custom = getCustomTranslations();
    const customLang = custom[globalLanguage];
    if (customLang && customLang[key]) {
      return customLang[key]!;
    }
    return defaultTranslations[globalLanguage][key] || defaultTranslations['en'][key] || key;
  }, [getCustomTranslations]);

  const getAllTranslationsForLang = useCallback((lang: Language): Translations => {
    const custom = getCustomTranslations();
    const customLang = custom[lang] || {};
    return { ...defaultTranslations[lang], ...customLang };
  }, [getCustomTranslations]);

  return {
    language: globalLanguage,
    setLanguage,
    t,
    saveCustomTranslations,
    getAllTranslationsForLang,
    getCustomTranslations,
  };
}
