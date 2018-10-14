import React from 'react';
import { withRouteData } from 'react-static';
import { MenuItem } from 'scripts/MenuUtil';
import { Page } from 'scripts/models/Page';
import { Content } from '../components/layout/Content';
import { Layout } from '../components/layout/Layout';
import { RouteHistory } from '../models/RouteHistory';
import { RouteMatch } from '../models/RouteMatch';

export interface PageProps {
  page: Page;
  menu: MenuItem[];
  match: RouteMatch;
  history: RouteHistory;
}

export default withRouteData((props: any) => (
  <Layout page={props.page} menu={props.menu} match={props.match}>
    <Content page={props.page} />
  </Layout>
));
