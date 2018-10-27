import React from 'react';
import Badge from 'reactstrap/lib/Badge';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Row from 'reactstrap/lib/Row';
import { BookingPageProps } from 'src/containers/BookingPage';
import { DateUtil } from '../../utils/DateUtil';
import { tr } from '../../utils/tr';
import { BookingCalendar } from './BookingCalendar';

export interface BookingOverviewProps extends BookingPageProps {}

export interface BookingOverviewState {
  bookingStart: Date;
  bookingEnd: Date;
  overlapsWithOption: boolean;
  canAddWeek: boolean;
  name: string;
  email: string;
  request: string;
}

export enum Availability {
  Available = 1,
  Confirmation,
  Option,
  Selected
}

export class BookingOverview extends React.Component<BookingOverviewProps, BookingOverviewState> {
  private _cache: Map<string, Availability> = new Map();
  public state = {
    bookingStart: null,
    bookingEnd: null,
    overlapsWithOption: false,
    canAddWeek: false,
    name: '',
    email: '',
    request: ''
  };

  private clearCache = () => {
    this._cache = new Map();
  };

  private handleDateSelected = (start: Date, end: Date) => {
    const overlaps = this.props.bookings.some(b => DateUtil.dateRangesOverlap(start, end, b.start, b.end));
    const nextDay = new Date(end);
    nextDay.setDate(nextDay.getDate() + 1);
    const canAddWeek = this.handleCheckAvailability(nextDay) !== Availability.Confirmation;
    this.clearCache();
    this.setState(
      { bookingStart: start, bookingEnd: end, overlapsWithOption: overlaps, canAddWeek: canAddWeek },
      this.clearCache
    );
  };

  private handleCheckAvailability = (date: Date) => {
    const cached = this._cache.get(date.toString());
    if (cached) {
      return cached;
    } else {
      const { bookings } = this.props;
      const { bookingStart, bookingEnd } = this.state;
      const isSelected = bookingStart && date >= bookingStart && date < bookingEnd;
      let result = isSelected ? Availability.Selected : Availability.Available;
      if (!isSelected) {
        const overlaps = bookings.filter(b => new Date(b.start) <= date && new Date(b.end) > date);
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

  private handleAddWeek = () => {
    const newEnd = new Date(this.state.bookingEnd);
    newEnd.setDate(newEnd.getDate() + 7);
    const overlaps = this.props.bookings.some(b =>
      DateUtil.dateRangesOverlap(this.state.bookingStart, newEnd, b.start, b.end)
    );
    this.clearCache();
    this.setState({ bookingEnd: newEnd, overlapsWithOption: overlaps }, this.clearCache);
  };

  private handleFormSubmit = e => {
    e.preventDefault();
    alert('yes');
    return false;
  };

  public render() {
    return (
      <Row className="bookingOverview">
        <Col sm="12" md="5" lg="4">
          <BookingCalendar
            bookings={this.props.bookings}
            bookingStart={this.state.bookingStart}
            bookingEnd={this.state.bookingEnd}
            onSelected={this.handleDateSelected}
            onCheckAvailability={this.handleCheckAvailability}
          />
        </Col>
        <Col>{this.state.bookingStart ? this.renderDateSelected() : this.renderNoDateSelected()}</Col>
      </Row>
    );
  }

  private renderNoDateSelected() {
    if (window.innerWidth < 768) {
      return null;
    }
    return (
      <div className="noDateSelected animated fadeInRight">
        <i className="fas fa-arrow-left" /> {tr('pleaseSelectADate', this.props.page.locale)}
      </div>
    );
  }

  private renderDateSelected() {
    const { page } = this.props;
    const { bookingStart, bookingEnd, overlapsWithOption, canAddWeek } = this.state;
    return (
      <div className="dateSelected">
        <h2 className="dateRange">{DateUtil.formatStartEndDates(bookingStart, bookingEnd, page.locale, 'short')}</h2>
        <p className="light">
          {DateUtil.daysBetween(bookingStart, bookingEnd)} {tr('nights', page.locale)}
          {canAddWeek && (
            <span>
              &nbsp;(
              <a onClick={this.handleAddWeek}>{tr('addWeek', page.locale)}</a>)
            </span>
          )}
          <br />
          {overlapsWithOption && <Badge color="warning">{tr('overlapsLabel', page.locale)}</Badge>}
          {!overlapsWithOption && <Badge color="success">{tr('availableLabel', page.locale)}</Badge>}
        </p>
        <div className="bookingForm">
          <Form onSubmit={this.handleFormSubmit}>
            <FormGroup>
              <Label for="name">{tr('name', page.locale)}</Label>
              <Input
                type="text"
                id="name"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">{tr('email', page.locale)}</Label>
              <Input
                type="email"
                id="email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="request">{tr('request', page.locale)}</Label>
              <Input
                type="textarea"
                id="request"
                value={this.state.request}
                onChange={e => this.setState({ request: e.target.value })}
              />
            </FormGroup>
            <Button>{tr('submitBookingRequest', page.locale)}</Button>
          </Form>
        </div>
      </div>
    );
  }
}
