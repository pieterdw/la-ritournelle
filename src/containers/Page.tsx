import React from 'react';
import { withRouteData } from 'react-static';
import { Page } from 'scripts/models/Page';
import { Content } from '../components/Content';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Template } from '../components/Template';
import { RouteHistory } from '../models/RouteHistory';
import { RouteMatch } from '../models/RouteMatch';

export interface PageProps extends Page {
  match: RouteMatch;
  history: RouteHistory;
}

export default withRouteData((props: PageProps) => (
  <Template {...props}>
    <Header title={props.title} intro={props.intro} />
    <Content {...props} />
    <Footer {...props} />
  </Template>
));
