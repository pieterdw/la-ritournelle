interface Translation {
  nl: string;
  en: string;
  fr: string;
}

const translations: Map<string, Translation> = new Map();
translations.set('all', { nl: 'Alle', en: 'All', fr: 'Tous' });
translations.set('nights', { nl: 'nachten', en: 'nights', fr: 'nuits' });
translations.set('pleaseSelectADate', {
  nl: 'Kies een datum',
  en: 'Please select a data',
  fr: 'Veuillez choisir une date'
});
translations.set('name', { nl: 'Naam', en: 'Name', fr: 'Nom' });
translations.set('email', { nl: 'Email', en: 'Email', fr: 'Adresse email' });
translations.set('request', { nl: 'Uw aanvraag', en: 'Your request', fr: 'Votre demande' });
translations.set('submitBookingRequest', {
  nl: 'Boekingsaanvraag verzenden',
  en: 'Send booking request',
  fr: 'Envoyer'
});
translations.set('availableLabel', { nl: 'Beschikbaar', en: 'Available', fr: 'Disponible' });
translations.set('overlapsLabel', { nl: 'Mogelijk beschikbaar', en: 'Possibly available', fr: 'Peut-être disponible' });
translations.set('addWeek', { nl: 'week toevoegen', en: 'add week', fr: 'ajouter une semaine' });
translations.set('estimatedPrice', { nl: 'Prijsinschatting:', en: 'Estimated price:', fr: 'Prix estimé :' });
translations.set('perNight', { nl: 'per nacht', en: 'per night', fr: 'par nuit' });
translations.set('', { nl: '', en: '', fr: '' });
translations.set('', { nl: '', en: '', fr: '' });
translations.set('', { nl: '', en: '', fr: '' });

export const tr = (key: string, locale: string) => {
  const value = translations.get(key);
  return value ? value[locale] : key;
};
