interface Translation {
  nl: string;
  en: string;
  fr: string;
}

const translations: Map<string, Translation> = new Map();
translations.set('all', { nl: 'Alle', en: 'All', fr: 'Tous' });

export const tr = (key: string, locale: string) => {
  const value = translations.get(key);
  return value ? value[locale] : key;
};
