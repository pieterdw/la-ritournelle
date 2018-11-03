import React from 'react';
import { Head } from 'react-static';
import { MenuItem } from 'scripts/MenuUtil';
import { Page } from 'scripts/models/Page';
import { Various } from 'scripts/models/Various';
import { Api } from '../../scripts/Api';
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
    const image = new Image();
    image.onload = () =>
      (document.querySelector(
        'html'
      ).style.backgroundImage = `url('https://admin.vakantiehuisantibes.com/storage/uploads/2018/11/01/5bdac5f58c794bg.jpg')`);
    image.src = 'https://admin.vakantiehuisantibes.com/storage/uploads/2018/11/01/5bdac5f58c794bg.jpg';
  }

  public render() {
    return (
      <div>
        <div className="html-mobile-background" />
        <Head htmlAttributes={{ class: this.props.page.slug }}>
          <title>
            {this.props.page.title} - {this.props.various.website_title}
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" type="image/png" href="/icon-32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/icon-16.png" sizes="16x16" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-127881760-1" />
          <script>
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-127881760-1');
            `}
          </script>

          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.4.2/css/all.css"
            integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href={Api.websiteBasePath + '/assets/animate.css'} crossOrigin="anonymous" />
          {process.env.NODE_ENV === 'production' && (
            <script src={Api.websiteBasePath + '/assets/wow.min.js'} crossOrigin="anonymous" />
          )}
        </Head>
        <Nav page={this.props.page} menu={this.props.menu} match={this.props.match} />
        {this.props.children}
      </div>
    );
  }
}
