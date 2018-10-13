import React from 'react';
import { Head } from 'react-static';
import { Nav } from './Nav';

export interface LayoutProps {
  title: string;
}

export class Layout extends React.Component<LayoutProps, {}> {
  public render() {
    return (
      <div>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <Nav />
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}
