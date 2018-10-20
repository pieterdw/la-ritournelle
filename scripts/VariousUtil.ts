import { Various, VariousByLocale } from './models/Various';

export class VariousUtil {
  public static parseVarious = (raw): VariousByLocale => {
    const nl = {};
    const en = {};
    const fr = {};
    const props = ['website_title'];
    props.forEach(prop => {
      const def = raw[prop];
      nl[prop] = def;
      en[prop] = raw[prop + '_en'] || def;
      fr[prop] = raw[prop + '_fr'] || def;
    });
    return {
      nl: nl as Various,
      en: en as Various,
      fr: fr as Various
    };
  };
}
