import React from 'react';
import { withRouteData } from 'react-static';
import { MenuItem } from 'scripts/MenuUtil';
import { Page } from 'scripts/models/Page';
import { Various } from 'scripts/models/Various';
import { Content } from '../components/layout/Content';
import { Header } from '../components/layout/Header';
import { Layout } from '../components/layout/Layout';
import { RouteHistory } from '../models/RouteHistory';
import { RouteMatch } from '../models/RouteMatch';

export interface PageProps {
  page: Page;
  menu: MenuItem[];
  various: Various;
  match: RouteMatch;
  history: RouteHistory;
}

export default withRouteData((props: any) => (
  <Layout page={props.page} menu={props.menu} various={props.various} match={props.match}>
    <Header page={props.page} />
    <Content page={props.page} />
  </Layout>
));
