export class StringUtil {
  public static convertToCamelCase = str => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  };

  public static truncate = (str: string, maxLength: number) => {
    if (str != null && str.length > maxLength) return str.substr(0, maxLength - 3) + '...';
    else return str;
  };

  public static joinWithSpaces = (...values: Array<string | undefined>) => {
    if (!values || values.length === 0) {
      return '';
    }
    return values.filter(x => !!x).join(' ');
  };

  public static search = (value: string, searchText: string | RegExp): boolean => {
    if (!searchText) return true;
    if (!value) return false;
    if (typeof searchText === 'string') {
      searchText = new RegExp(searchText, 'i');
    }
    return value.search(searchText) > -1;
  };

  public static isTrue = (value: string): boolean => {
    if (value) {
      value = value.toLowerCase().trim();
      return value === 'true' || value === '1';
    }
    return false;
  };

  public static isImageUrl = (value: string): boolean => {
    if (value) {
      const regexp = /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?.(jpg|png|gif)$/;
      return regexp.test(value);
    }
    return false;
  };

  public static isPdfUrl = (value: string): boolean => {
    if (value) {
      const regexp = /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?.(pdf)$/;
      return regexp.test(value);
    }
    return false;
  };

  public static isUrl = (value: string): boolean => {
    if (value) {
      const regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
      return regexp.test(value);
    }
    return false;
  };

  public static linkify = (value: string): string => {
    if (value) {
      const urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

      // www. sans http:// or https://
      const pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

      // Email addresses *** here I've changed the expression ***
      const emailAddressPattern = /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim;

      return value
        .replace(urlPattern, '<a target="_blank" href="$&">$&</a>')
        .replace(pseudoUrlPattern, '$1<a target="_blank" href="http://$2">$2</a>')
        .replace(emailAddressPattern, '<a target="_blank" href="mailto:$1">$1</a>');
    }
    return value;
  };

  public static formatImagesAndLinks = (value: string): string => {
    if (value) {
      if (StringUtil.isImageUrl(value)) {
        return `<a target="_blank" href="${value}"><img src="${value}" alt="${value}"/></a>`;
      }
      if (StringUtil.isUrl(value)) {
        return `<a target="_blank" href="${value}">open link</a>`;
      }
      return StringUtil.linkify(value);
    }
  };

  public static formatCurrency = (value: number): string => {
    return '€ ' + value.toFixed(2);
  };

  public static containsVariables = (value: string): boolean => value && value.indexOf('{{') >= 0;
}
