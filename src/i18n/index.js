import { createI18n } from "vue-i18n";

// Import stored language
import store from "../store";
var lang = store.state.lang;
if (lang == "auto") {
  lang = navigator.language || navigator.userLanguage || "en";
  lang = lang.substr(0, 2); // Only use the first two characters (e.g. "en")
}

// Lazy-load translation files to reduce initial bundle size
const loaders = {
  en: () => import(/* webpackChunkName: "locale-en" */ "./locales/en.json"),
  zh: () => import(/* webpackChunkName: "locale-zh" */ "./locales/zh.json"),
  de: () => import(/* webpackChunkName: "locale-de" */ "./locales/de.json"),
  ru: () => import(/* webpackChunkName: "locale-ru" */ "./locales/ru.json"),
  vi: () => import(/* webpackChunkName: "locale-vi" */ "./locales/vi.json"),
  fr: () => import(/* webpackChunkName: "locale-fr" */ "./locales/fr.json"),
  it: () => import(/* webpackChunkName: "locale-it" */ "./locales/it.json"),
  ko: () => import(/* webpackChunkName: "locale-ko" */ "./locales/ko.json"),
  es: () => import(/* webpackChunkName: "locale-es" */ "./locales/es.json"),
  ja: () => import(/* webpackChunkName: "locale-ja" */ "./locales/ja.json"),
};

const messages = {};
const loader = loaders[lang] || loaders.en;
try {
  const mod = await loader();
  messages[lang] = mod.default || mod;
  if (lang !== "en") {
    const en = await loaders.en();
    messages.en = en.default || en;
  }
} catch (e) {
  const en = await loaders.en();
  messages.en = en.default || en;
  lang = "en";
}

const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: lang,
  fallbackLocale: "en",
  messages,
});

export default i18n;
