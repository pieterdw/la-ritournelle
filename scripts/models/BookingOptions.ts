import { BookingPrice } from './BookingPrice';

export interface BookingOptions {
  prices: BookingPrice[];
  prebookingtext: string;
}

export interface BookingOptionsByLocale {
  nl: BookingOptions;
  en: BookingOptions;
  fr: BookingOptions;
}
