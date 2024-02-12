export const supportedTranslations = {
  de: "Deutsch",
  en: "English",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  ja: "日本語",
  nl: "Nederlands",
  "pt-BR": "Português",
};

export const languageZone = {
  de: "de-DE",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  it: "it-IT",
  ja: "ja-JP",
  nl: "nl-NL",
  "pt-BR": "pt-BR",
};

export const i18nConfig = {
  // This is the list of languages your application supports
  supportedLngs: Object.keys(supportedTranslations),
  // This is the language you want to use in case
  // if the user language is not in the supportedLngs
  fallbackLng: "en",
  // The default namespace of i18next is "translation", but you can customize it here
  defaultNS: "common",
  // Disabling suspense is recommended
  react: { useSuspense: false },
};
