import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translations/en.json';
import fr from './translations/fr.json';
import { getLocales } from 'expo-localization';

const resources = {
  en: {
    translation: en
  },
  fr: {
    translation: fr
  }
};
i18n.use(initReactI18next).init({
  resources,
  //language to use if translations in user language are not available
  fallbackLng: getLocales()[0].languageCode,
  interpolation: {
    escapeValue: false // not needed for react!!
  }
});

export default i18n;
