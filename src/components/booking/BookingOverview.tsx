import React from 'react';
import Calendar from 'react-calendar';
import Alert from 'reactstrap/lib/Alert';
import { BookingPageProps } from 'src/containers/BookingPage';

export interface BookingOverviewProps extends BookingPageProps {}

interface GetDateClassNameObject {
  date: Date;
  view: string;
}

enum Availability {
  Available,
  Confirmation,
  Option
}

export class BookingOverview extends React.Component<BookingOverviewProps, {}> {
  private checkAvailability = (date: Date) => {
    const overlaps = this.props.bookings.filter(b => new Date(b.start) <= date && new Date(b.end) >= date);
    if (overlaps.some(b => b.isConfirmed)) {
      console.log('confirmation');
      return Availability.Confirmation;
    } else if (overlaps.length > 0) {
      console.log('option');
      return Availability.Option;
    }
    return Availability.Available;
  };

  private getDateClassName = (obj: GetDateClassNameObject) => {
    const availability = this.checkAvailability(obj.date);
    switch (availability) {
      case Availability.Confirmation:
        return 'confirmation';
      case Availability.Option:
        return 'option';
      default:
        return 'available';
    }
  };

  private checkDateIsDisabled = (obj: GetDateClassNameObject) => {
    const availability = this.checkAvailability(obj.date);
    switch (availability) {
      case Availability.Confirmation:
        return true;
      default:
        return false;
    }
  };

  public render() {
    return (
      <div>
        <Calendar
          selectRange={true}
          tileClassName={this.getDateClassName}
          tileDisabled={this.checkDateIsDisabled}
          minDate={new Date()}
        />
        <Alert>{JSON.stringify(this.props.bookings)}</Alert>
      </div>
    );
  }
}
