import React from 'react';
import { withRouteData } from 'react-static';
import { Feature } from 'src/models/Feature';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Template } from '../components/Template';
import { TheHouseOverview } from '../components/theHouse/TheHouseOverview';
import '../css/TheHousePage.scss';
import { PageProps } from './Page';

export interface TheHousePageProps extends PageProps {
  features: Feature[];
  details_title: string;
  details_description: string;
  details_1_title: string;
  details_1_items: string;
  details_2_title: string;
  details_2_items: string;
  details_3_title: string;
  details_3_items: string;
  details_4_title: string;
  details_4_items: string;
}

export default withRouteData((props: TheHousePageProps) => {
  return (
    <Template {...props}>
      <Header title={props.title} intro={props.intro} />
      <TheHouseOverview {...props} />
      <Footer {...props} menu={props.menu} />
    </Template>
  );
});
