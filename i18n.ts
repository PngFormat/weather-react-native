import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/resources';
import { getLocales } from 'react-native-localize';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getLocales()[0].languageTag, 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
