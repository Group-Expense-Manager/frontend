import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from '../locale/en/translation.json';
import pl from '../locale/pl/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: 'pl',
    fallbackLng: 'en',
    debug: false,
    supportedLngs: ['en', 'pl'],
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: en },
      pl: { translation: pl },
    },
    react: {
      useSuspense: false,
    },
  })
  .catch((error) => {
    console.error(error);
  });

export default i18n;
