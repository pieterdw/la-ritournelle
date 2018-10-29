export interface BookingOptions {
  prices: BookingPrice[];
  prebookingtext: string;
}

export interface BookingOptionsByLocale {
  nl: BookingOptions;
  en: BookingOptions;
  fr: BookingOptions;
}

export interface BookingPrice {
  start: Date;
  end: Date;
  price: number;
}
