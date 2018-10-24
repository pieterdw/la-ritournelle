import React from 'react';
import Calendar from 'react-calendar';
import { BookingPageProps } from 'src/containers/BookingPage';

export interface BookingOverviewProps extends BookingPageProps {}

export class BookingOverview extends React.Component<BookingOverviewProps, {}> {
  public render() {
    return (
      <div>
        calendar:
        <Calendar />
      </div>
    );
  }
}
