export interface BookingOptions {
  prices: BookingPrice[];
}

export interface BookingPrice {
  start: Date;
  end: Date;
  price: number;
}
