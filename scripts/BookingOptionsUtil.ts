import { BookingOptions, BookingPrice } from './models/BookingOptions';

export class BookingOptionsUtil {
  public static parseBookingOptions = (raw): BookingOptions => {
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
      prices: prices
    };
  };
}
