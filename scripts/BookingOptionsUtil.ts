import { BookingOptionsByLocale, BookingPrice } from './models/BookingOptions';

export class BookingOptionsUtil {
  public static parseBookingOptions = (raw): BookingOptionsByLocale => {
    var prices: BookingPrice[] = [];
    raw.prices.forEach(item => {
      const strPrice = item.value.price && isNaN(item.value.price) ? item.value.price.replace(',', '.') : item.price;
      prices.push({
        start: new Date(item.value.start),
        end: new Date(item.value.end),
        price: +strPrice
      });
    });
    return {
      nl: {
        prebookingtext: raw.prebookingtext,
        prices: prices
      },
      en: {
        prebookingtext: raw.prebookingtext_en || raw.prebookingtext,
        prices: prices
      },
      fr: {
        prebookingtext: raw.prebookingtext_fr || raw.prebookingtext,
        prices: prices
      }
    };
  };
}
