import React from 'react';
import { MenuItem } from 'scripts/MenuUtil';
import { RouteMatch } from '../../models/RouteMatch';

export interface NavProps {
  menu: MenuItem[];
  match: RouteMatch;
}

export class Nav extends React.Component<NavProps, {}> {
  public render() {
    return <div>nav</div>;
  }
}
