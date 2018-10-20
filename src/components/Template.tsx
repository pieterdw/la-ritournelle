import React from 'react';
import { Head } from 'react-static';
import { MenuItem } from 'scripts/MenuUtil';
import { Page } from 'scripts/models/Page';
import { Various } from 'scripts/models/Various';
import { RouteMatch } from '../models/RouteMatch';
import { Nav } from './Nav';

export interface TemplateProps {
  page: Page;
  menu: MenuItem[];
  various: Various;
  match: RouteMatch;
}

export class Template extends React.Component<TemplateProps, {}> {
  public componentDidMount() {
    new (window as any).WOW().init();
  }

  public render() {
    return (
      <div>
        <Head htmlAttributes={{ class: this.props.page.slug }}>
          <title>
            {this.props.page.title} - {this.props.various.website_title}
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://www.vakantiehuisantibes.com/assets/animate.css"
            crossOrigin="anonymous"
          />
          {process.env.NODE_ENV === 'production' && (
            <script src="https://www.vakantiehuisantibes.com/assets/wow.min.js" crossOrigin="anonymous" />
          )}
        </Head>
        <Nav page={this.props.page} menu={this.props.menu} match={this.props.match} />
        {this.props.children}
      </div>
    );
  }
}
