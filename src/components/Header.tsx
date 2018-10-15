import React from 'react';
import Container from 'reactstrap/lib/Container';
import { Page } from 'scripts/models/Page';
import { Markdown } from './Markdown';

export interface HeaderProps {
  page: Page;
}

export class Header extends React.Component<HeaderProps, {}> {
  public render() {
    return (
      <Container className="pageHeader">
        <h1>{this.props.page.title}</h1>
        <Markdown content={this.props.page.intro} />
      </Container>
    );
  }
}
