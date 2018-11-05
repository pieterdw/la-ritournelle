import React from 'react';
import { withRouteData } from 'react-static';
import { BookingPrice } from 'scripts/models/BookingPrice';
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
  prices: BookingPrice[];
  prebookingtext: string;
}

export default withRouteData((props: BookingPageProps) => (
  <Template {...props}>
    <Header title={props.title} intro={props.intro} />
    <Content {...props}>
      <BookingOverview {...props} />
    </Content>
    <Footer {...props} />
  </Template>
));
