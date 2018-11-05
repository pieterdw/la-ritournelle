import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Alert from 'reactstrap/lib/Alert';
import Badge from 'reactstrap/lib/Badge';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Row from 'reactstrap/lib/Row';
import { BookingPageProps } from 'src/containers/BookingPage';
import { Api } from '../../../scripts/Api';
import { FormStatus } from '../../models/FormStatus';
import { DateUtil } from '../../utils/DateUtil';
import { StringUtil } from '../../utils/StringUtil';
import { Markdown } from '../Markdown';
import { Spinner } from '../Spinner';
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
  recaptcha: string;
  formStatus: FormStatus;
}

export enum Availability {
  Available = 1,
  Confirmation,
  Option,
  Selected
}

export class BookingOverview extends React.Component<BookingOverviewProps, BookingOverviewState> {
  constructor(props) {
    super(props);
    this._today = new Date();
    this._today.setHours(0);
    this._today.setMinutes(0);
    this._today.setSeconds(0);
    this._today.setMilliseconds(0);
  }

  private _today: Date;

  public state = {
    bookingStart: null,
    bookingEnd: null,
    overlapsWithOption: false,
    canAddWeek: false,
    recaptcha: null,
    name: '',
    email: '',
    request: '',
    formStatus: FormStatus.Initial
  };

  private handleDateSelected = (start: Date, end: Date) => {
    this.setState({
      bookingStart: start,
      bookingEnd: end,
      overlapsWithOption: this.checkOverlapsWithOption(start, end),
      canAddWeek: this.checkCanAddWeek(end)
    });
  };

  private checkCanAddWeek = (endDate: Date) => {
    const nextDay = new Date(endDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return this.handleCheckAvailability(nextDay) !== Availability.Confirmation;
  };

  private checkOverlapsWithOption = (start: Date, end: Date) => {
    start = new Date(start);
    start.setHours(start.getHours() + 5);
    return this.props.bookings.some(b => DateUtil.dateRangesOverlap(start, end, b.start, b.end));
  };

  private handleCheckAvailability = (date: Date) => {
    const { bookings } = this.props;
    const { bookingStart, bookingEnd } = this.state;

    if (date < this._today) {
      return Availability.Confirmation;
    }
    const isSelected = bookingStart && date >= bookingStart && date < bookingEnd;
    let result = isSelected ? Availability.Selected : Availability.Available;
    if (!isSelected) {
      date = new Date(date);
      date.setHours((date.getHours() + 24 - date.getUTCHours()) % 24);
      const endCheck = new Date(date);
      endCheck.setHours(endCheck.getHours() + 5);
      const overlaps = bookings.filter(b => new Date(b.start) <= date && new Date(b.end) > endCheck);
      if (overlaps.some(b => b.isConfirmed)) {
        result = Availability.Confirmation;
      } else if (overlaps.length > 0) {
        result = Availability.Option;
      }
    }
    return result;
  };

  private handleAddWeek = () => {
    const newEnd = new Date(this.state.bookingEnd);
    newEnd.setDate(newEnd.getDate() + 7);
    this.setState({
      bookingEnd: newEnd,
      overlapsWithOption: this.checkOverlapsWithOption(this.state.bookingStart, newEnd),
      canAddWeek: this.checkCanAddWeek(newEnd)
    });
  };

  private handleFormSubmit = e => {
    e.preventDefault();
    if (this.checkIfFormValid()) {
      this.setState({ formStatus: FormStatus.Saving }, () => {
        const { locale } = this.props;
        const { bookingStart, bookingEnd, name, email, request, recaptcha } = this.state;
        Api.post(Api.websiteBasePath + '/booking.php', {
          locale: locale,
          dates: DateUtil.formatStartEndDates(bookingStart, bookingEnd, locale, 'short'),
          nights: DateUtil.daysBetween(bookingStart, bookingEnd),
          price: StringUtil.formatCurrency(this.getPriceEstimate()),
          name: name,
          email: email,
          request: request,
          recaptcha: recaptcha
        })
          .then(response => {
            console.log('Server response: ' + JSON.stringify(response));
            this.setState({ formStatus: FormStatus.Saved });
          })
          .catch(error => {
            console.log('Oops, something went wrong! ' + JSON.stringify(error));
            this.setState({ formStatus: FormStatus.Error });
          });
      });
    } else {
      this.setState({ formStatus: FormStatus.Validating });
    }

    return false;
  };

  private formatCurrency = (value: number) => {
    let formatted = StringUtil.formatCurrency(value);
    if (this.props.locale != 'en') {
      formatted = formatted.replace('.', ',');
    }
    return formatted;
  };

  private getPriceEstimate = () => {
    let price = 0;
    let firstDateOfWeek = new Date(this.state.bookingStart);
    firstDateOfWeek.setDate(firstDateOfWeek.getDate() + 1);
    while (firstDateOfWeek < this.state.bookingEnd) {
      const weekPrice = this.props.prices.find(
        pr => new Date(pr.start) <= firstDateOfWeek && new Date(pr.end) > firstDateOfWeek
      );
      price += weekPrice.price;
      firstDateOfWeek.setDate(firstDateOfWeek.getDate() + 7);
    }
    return price;
  };

  private handleRecaptchaResolved = response => {
    this.setState({ recaptcha: response });
  };

  private checkIfFormValid = () => {
    const { name, email, recaptcha } = this.state;
    return !!(recaptcha && name && email);
  };

  public render() {
    return (
      <Row className="bookingOverview">
        <Col sm="12" md="5" lg="4">
          <BookingCalendar
            bookings={this.props.bookings}
            bookingStart={this.state.bookingStart}
            bookingEnd={this.state.bookingEnd}
            maxBookingDate={this.props.prices.reduce(
              (max, current) => DateUtil.max(max, new Date(current.end)),
              new Date()
            )}
            onSelected={this.handleDateSelected}
            onCheckAvailability={this.handleCheckAvailability}
          />
        </Col>
        <Col>{this.state.bookingStart ? this.renderDateSelected() : this.renderNoDateSelected()}</Col>
      </Row>
    );
  }

  private renderNoDateSelected() {
    return (
      <div className="noDateSelected">
        <div className="animated fadeInRight">
          <i className="fas fa-arrow-left" /> {this.props.text.pleaseSelectADate}
        </div>
      </div>
    );
  }

  private renderDateSelected() {
    const { locale, text, prebookingtext } = this.props;
    const {
      bookingStart,
      bookingEnd,
      overlapsWithOption,
      canAddWeek,
      name,
      email,
      request,
      recaptcha,
      formStatus
    } = this.state;

    const nights = DateUtil.daysBetween(bookingStart, bookingEnd);
    const price = this.getPriceEstimate();

    return (
      <div className="dateSelected animated fadeInUp">
        <h2 className="dateRange">{DateUtil.formatStartEndDates(bookingStart, bookingEnd, locale, 'short')}</h2>
        <p className="light">
          {overlapsWithOption && <Badge color="warning">{text.overlapsLabel}</Badge>}
          {!overlapsWithOption && <Badge color="success">{text.availableLabel}</Badge>}
          &nbsp; {nights} {text.nights}
          {canAddWeek && (
            <span>
              &nbsp;(
              <a onClick={this.handleAddWeek}>{text.addWeek}</a>)
            </span>
          )}
          <br />
          {text.estimatedPrice} {this.formatCurrency(price)} ({this.formatCurrency(price / nights)} {text.perNight})
        </p>
        <div className="prebookingtext">
          <Markdown content={prebookingtext} />
        </div>
        <div className="bookingForm animated fadeInUp">
          <Form onSubmit={this.handleFormSubmit}>
            <FormGroup>
              <Label for="name">{text.name}</Label>
              <Input type="text" id="name" value={name} onChange={e => this.setState({ name: e.target.value })} />
            </FormGroup>
            <FormGroup>
              <Label for="email">{text.email}</Label>
              <Input type="email" id="email" value={email} onChange={e => this.setState({ email: e.target.value })} />
            </FormGroup>
            <FormGroup>
              <Label for="request">{text.request}</Label>
              <Input
                type="textarea"
                id="request"
                value={request}
                onChange={e => this.setState({ request: e.target.value })}
              />
            </FormGroup>
            <div className="captcha">
              <ReCAPTCHA sitekey="6LcmM3cUAAAAAMlm-0Mz-2NpkhY-vog1cag9y_fC" onChange={this.handleRecaptchaResolved} />
            </div>
            {formStatus === FormStatus.Validating &&
              !this.checkIfFormValid() && <Alert color="danger">{text.completeAllFields}</Alert>}
            {formStatus === FormStatus.Saved && <Alert color="success">{text.bookingRequestSent}</Alert>}
            {formStatus === FormStatus.Error && <Alert color="danger">{text.oops}</Alert>}
            <Button color="primary" disabled={formStatus === FormStatus.Saving || !recaptcha}>
              {text.submitBookingRequest}
            </Button>
            {formStatus === FormStatus.Saving && <Spinner />}
          </Form>
        </div>
      </div>
    );
  }
}
