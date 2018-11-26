import React from 'react';
import { withRouteData } from 'react-static';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Template } from '../components/Template';
import { TheHouseOverview } from '../components/theHouse/TheHouseOverview';
import '../css/TheHousePage.scss';
import { PageProps } from './Page';

export interface TheHousePageProps extends PageProps {}

export default withRouteData((props: TheHousePageProps) => {
  return (
    <Template {...props}>
      <Header title={props.title} intro={props.intro} />
      <TheHouseOverview {...props} />
      <Footer {...props} menu={props.menu} />
    </Template>
  );
});
