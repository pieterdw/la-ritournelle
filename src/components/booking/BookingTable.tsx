import React from 'react';

export interface BookingTableProps {
  bookingStart: Date;
  bookingEnd: Date;
}

export class BookingTable extends React.Component<BookingTableProps, {}> {
  public render() {
    return <div />;
  }
}
