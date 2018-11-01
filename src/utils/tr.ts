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
  en: 'Please select a date',
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
translations.set('completeAllFields', {
  nl: 'Gelieve alle velden in te vullen.',
  en: 'Please complete all fields.',
  fr: `Remplissez tous les champs, s'il vous plaît`
});
translations.set('bookingRequestSent', {
  nl: 'Uw boekingsaanvraag is verzonden, wij nemen zo snel mogelijk contact op.',
  en: `Your booking request has been sent, we'll get back to you as soon as possible.`,
  fr: 'Votre demande de réservation a été envoyée. Nous reviendrons vers vous dès que possible. '
});
translations.set('oops', {
  nl: 'Oeps, er is iets misgegaan. Contacteer ons als dit blijft gebeuren.',
  en: 'Oops, something went wrong. Please contact us if this problem persists.',
  fr: `Oups, quelque chose s'est mal passé. S'il vous plaît contactez-nous si le problème persiste.`
});
translations.set('contactFormSent', {
  nl: 'Bedankt voor uw bericht, wij nemen zo snel mogelijk contact op.',
  en: `Thanks for your message, we'll get back to you as soon as possible.`,
  fr: 'Merci pour votre message. Nous reviendrons vers vous dès que possible.'
});
translations.set('submitContactForm', { nl: 'Verzenden', en: 'Send', fr: 'Envoyer' });
translations.set('message', { nl: 'Bericht', en: 'Message', fr: 'Message' });
translations.set('moreInfo', { nl: 'Meer info', en: 'More info', fr: `Plus d'infos` });
translations.set('bookingFooterText', {
  nl: 'Nieuwsgierig? Plan je vakantie en bekijk wanneer het huis beschikbaar is.',
  en: 'Curious? Start planning your vacation and check when the house is available!',
  fr: ''
});
translations.set('bookingFooterButton', {
  nl: 'Bekijk beschikbaarheid',
  en: 'Check availability',
  fr: 'Disponibilités'
});
translations.set('home', { nl: 'Home', en: 'Home', fr: 'Accueil' });
translations.set('', { nl: '', en: '', fr: '' });
translations.set('', { nl: '', en: '', fr: '' });
translations.set('', { nl: '', en: '', fr: '' });
translations.set('', { nl: '', en: '', fr: '' });

const trObject = (key: string, locale: string, obj: any) => {
  if (locale === 'nl') {
    return obj[key];
  } else {
    return obj[key + '_' + locale] || obj[key];
  }
};

const trStatic = (key: string, locale: string) => {
  const value = translations.get(key);
  return value ? value[locale] : key;
};

export const tr = (key: string, locale: string, obj?: any) => {
  return obj ? trObject(key, locale, obj) : trStatic(key, locale);
};
