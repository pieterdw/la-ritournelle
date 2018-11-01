import React from 'react';
import { withRouteData } from 'react-static';
import { BookingOptions } from 'scripts/models/BookingOptions';
import { CalendarEvent } from 'scripts/models/CalendarEvent';
import { BookingOverview } from '../components/booking/BookingOverview';
import { Content } from '../components/Content';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Template } from '../components/Template';
import '../css/BookingPage.scss';
import { PageProps } from './Page';

export interface BookingPageProps extends PageProps {
  bookings: CalendarEvent[];
  bookingOptions: BookingOptions;
}

export default withRouteData((props: BookingPageProps) => (
  <Template page={props.page} menu={props.menu} various={props.various} match={props.match}>
    <Header title={props.page.title} intro={props.page.intro} />
    <Content page={props.page}>
      <BookingOverview {...props} />
    </Content>
    <Footer page={props.page} menu={props.menu} isBookingPage={true} />
  </Template>
));
