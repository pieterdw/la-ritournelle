import React from 'react';
import { Head } from 'react-static';
import Button from 'reactstrap/lib/Button';
import { MenuItem } from 'scripts/MenuUtil';
import { Page } from 'scripts/models/Page';
import { RouteMatch } from '../../models/RouteMatch';
import { Nav } from './Nav';

export interface LayoutProps {
  page: Page;
  menu: MenuItem[];
  match: RouteMatch;
}

export class Layout extends React.Component<LayoutProps, {}> {
  public render() {
    return (
      <div>
        <Head>
          <title>{this.props.page.title}</title>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
        </Head>
        <Nav menu={this.props.menu} match={this.props.match} />
        <Button color="danger">test!</Button>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}
