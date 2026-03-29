import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ar from './locales/ar.json';

const savedLanguage = localStorage.getItem('kemyan-language') || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: savedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
  },
});

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('kemyan-language', lng);
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
});

// Set initial direction
document.documentElement.lang = savedLanguage;
document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';

export default i18n;
