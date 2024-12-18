import React from 'react';
import { Head } from 'react-static';
import { Api } from '../../scripts/Api';
import { PageProps } from '../containers/Page';
import { Nav } from './Nav';

export interface TemplateProps extends PageProps {}

export class Template extends React.Component<TemplateProps, {}> {
  public componentDidMount() {
    this.wowInit();
    const imagePath = 'https://admin.vakantiehuisantibes.com/storage/uploads/2018/11/05/5be05f608de75bg3-big.jpg';
    const image = new Image();
    image.onload = () => (document.querySelector('html').style.backgroundImage = `url('${imagePath}')`);
    image.src = imagePath;
  }

  private wowInit = () => {
    if ((window as any).WOW) {
      new (window as any).WOW().init();
    } else {
      setTimeout(this.wowInit, 250);
    }
  };

  public render() {
    return (
      <div>
        <div className="html-mobile-background" />
        <Head htmlAttributes={{ class: this.props.id }}>
          <title>
            {this.props.title} - {this.props.text.websiteTitle}
          </title>
          <meta name="description" content={this.props.meta_description} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="canonical" href={'https://www.vakantiehuisantibes.com' + this.props.path} />
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
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href={Api.websiteBasePath + '/assets/animate.css'} crossOrigin="anonymous" />
          {process.env.NODE_ENV === 'production' && (
            <script src={Api.websiteBasePath + '/assets/wow.min.js'} crossOrigin="anonymous" async />
          )}
        </Head>
        <Nav {...this.props} />
        {this.props.children}
      </div>
    );
  }
}
