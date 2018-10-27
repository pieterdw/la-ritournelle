import React from 'react';
import Calendar, { OnChangeDateCallback } from 'react-calendar';
import { CalendarEvent } from 'scripts/models/CalendarEvent';
import '../../css/BookingCalendar.scss';
import { Availability } from './BookingOverview';

export interface BookingCalendarProps {
  bookings: CalendarEvent[];
  bookingStart: Date;
  bookingEnd: Date;
  maxBookingDate: Date;
  onSelected: (start: Date, end: Date) => void;
  onCheckAvailability: (date: Date) => Availability;
}

interface GetDateClassNameObject {
  date: Date;
  view: string;
}

export class BookingCalendar extends React.Component<BookingCalendarProps, {}> {
  private getDateClassName = (obj: GetDateClassNameObject) => {
    const availability = this.props.onCheckAvailability(obj.date);
    const yesterdayDate = new Date(obj.date);
    yesterdayDate.setDate(obj.date.getDate() - 1);
    const yesterday = this.props.onCheckAvailability(yesterdayDate);

    switch (availability) {
      case Availability.Confirmation:
        switch (yesterday) {
          case Availability.Option:
            return 'optionToConfirmation';
          case Availability.Available:
            return 'availableToConfirmation';
          case Availability.Selected:
            return 'selectedToConfirmation';
          default:
            return 'confirmation';
        }
      case Availability.Option:
        switch (yesterday) {
          case Availability.Confirmation:
            return 'confirmationToOption';
          case Availability.Available:
            return 'availableToOption';
          case Availability.Selected:
            return 'selectedToOption';
          default:
            return 'option';
        }
      case Availability.Selected:
        switch (yesterday) {
          case Availability.Confirmation:
            return 'confirmationToSelected';
          case Availability.Option:
            return 'optionToSelected';
          case Availability.Available:
            return 'availableToSelected';
          default:
            return 'selected';
        }
      default:
        switch (yesterday) {
          case Availability.Confirmation:
            return 'confirmationToAvailable';
          case Availability.Option:
            return 'optionToAvailable';
          case Availability.Selected:
            return 'selectedToAvailable';
          default:
            return 'available';
        }
    }
  };

  private checkDateIsDisabled = (obj: GetDateClassNameObject) => {
    const availability = this.props.onCheckAvailability(obj.date);
    switch (availability) {
      case Availability.Confirmation:
        return true;
      default:
        return false;
    }
  };

  private handleChange: OnChangeDateCallback = (date: Date) => {
    const weekday = date.getDay();
    const start = new Date(date);
    start.setDate(start.getDate() - ((weekday + 1) % 7));
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    this.props.onSelected(start, end);
  };

  public render() {
    return (
      <div className="bookingCalendar">
        <Calendar
          tileClassName={this.getDateClassName}
          tileDisabled={this.checkDateIsDisabled}
          minDate={new Date()}
          maxDate={this.props.maxBookingDate}
          prev2Label={null}
          next2Label={null}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
