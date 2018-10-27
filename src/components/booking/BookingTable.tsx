import React from 'react';
import { BookingOptions } from 'scripts/models/BookingOptions';

export interface BookingTableProps {
  bookingStart: Date;
  bookingEnd: Date;
  bookingOptions: BookingOptions;
}

export class BookingTable extends React.Component<BookingTableProps, {}> {
  public render() {
    return <div />;
  }
}
