import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import pl from './src/locales/pl';
import en from './src/locales/en';

const i18n = new I18n({
  en: en,
  pl: pl,
});

i18n.locale = getLocales()[0].languageCode;

export default i18n;
