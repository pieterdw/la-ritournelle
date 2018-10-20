import React from 'react';
import { withRouteData } from 'react-static';
import { MenuItem } from 'scripts/MenuUtil';
import { Page } from 'scripts/models/Page';
import { Various } from 'scripts/models/Various';
import { Content } from '../components/Content';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Template } from '../components/Template';
import { RouteHistory } from '../models/RouteHistory';
import { RouteMatch } from '../models/RouteMatch';

export interface PageProps {
  page: Page;
  menu: MenuItem[];
  various: Various;
  match: RouteMatch;
  history: RouteHistory;
}

export default withRouteData((props: PageProps) => (
  <Template page={props.page} menu={props.menu} various={props.various} match={props.match}>
    <Header title={props.page.title} intro={props.page.intro} />
    <Content page={props.page} />
    <Footer page={props.page} />
  </Template>
));
