import React from 'react';
import Calendar, { OnChangeDateCallback } from 'react-calendar';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { BookingPageProps } from 'src/containers/BookingPage';

export interface BookingOverviewProps extends BookingPageProps {}

export interface BookingOverviewState {
  bookingStart: Date;
  bookingEnd: Date;
}

interface GetDateClassNameObject {
  date: Date;
  view: string;
}

enum Availability {
  Available = 1,
  Confirmation,
  Option,
  Selected
}

export class BookingOverview extends React.Component<BookingOverviewProps, BookingOverviewState> {
  private _cache: Map<string, Availability> = new Map();
  public state = { bookingStart: null, bookingEnd: null };

  private checkAvailability = (date: Date) => {
    const cached = this._cache.get(date.toString());
    if (cached) {
      return cached;
    } else {
      const isSelected = this.state.bookingStart && date >= this.state.bookingStart && date < this.state.bookingEnd;
      let result = isSelected ? Availability.Selected : Availability.Available;
      if (!isSelected) {
        const overlaps = this.props.bookings.filter(b => new Date(b.start) <= date && new Date(b.end) >= date);
        if (overlaps.some(b => b.isConfirmed)) {
          result = Availability.Confirmation;
        } else if (overlaps.length > 0) {
          result = Availability.Option;
        }
      }
      this._cache.set(date.toString(), result);
      return result;
    }
  };

  private getDateClassName = (obj: GetDateClassNameObject) => {
    const availability = this.checkAvailability(obj.date);
    const yesterdayDate = new Date(obj.date);
    yesterdayDate.setDate(obj.date.getDate() - 1);
    const yesterday = this.checkAvailability(yesterdayDate);

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
    const availability = this.checkAvailability(obj.date);
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
    this._cache = new Map();
    this.setState({ bookingStart: start, bookingEnd: end });
  };

  public render() {
    return (
      <Row className="bookingOverview">
        <Col sm="12" md="5" lg="4">
          <Calendar
            tileClassName={this.getDateClassName}
            tileDisabled={this.checkDateIsDisabled}
            minDate={new Date()}
            prev2Label={null}
            next2Label={null}
            onChange={this.handleChange}
          />
        </Col>
        <Col>
          <h1>{this.state.bookingStart && this.state.bookingStart.toString()}</h1>
        </Col>
      </Row>
    );
  }
}
