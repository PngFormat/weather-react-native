import * as Localization from 'react-native-localize';
import i18n from 'i18n-js';

import en from '../locales/en.json'
import ua from '../locales/ua.json';

i18n.fallbacks = true;
i18n.translations = {
  en,
  ua,
};

const fallback = { languageTag: 'en', isRTL: false };

const { languageTag } =
  Localization.findBestAvailableLanguage(Object.keys(i18n.translations)) || fallback;

i18n.locale = languageTag;

export default i18n;
