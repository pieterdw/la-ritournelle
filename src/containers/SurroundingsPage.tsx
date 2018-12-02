import React from 'react';
import { withRouteData } from 'react-static';
import { Surrounding } from 'src/models/Surrounding';
import { SurroundingDistance } from 'src/models/SurroundingDistance';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SurroundingsOverview } from '../components/surroundings/SurroundingsOverview';
import { Template } from '../components/Template';
import '../css/SurroundingsPage.scss';
import { PageProps } from './Page';

export interface SurroundingsPageProps extends PageProps {
  highlights: Surrounding[];
  distances: SurroundingDistance[];
}

export default withRouteData((props: SurroundingsPageProps) => {
  return (
    <Template {...props}>
      <Header title={props.title} intro={props.intro} />
      <SurroundingsOverview {...props} />
      <Footer {...props} menu={props.menu} />
    </Template>
  );
});
