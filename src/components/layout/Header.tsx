import React from 'react';
import Container from 'reactstrap/lib/Container';
import { Page } from 'scripts/models/Page';

export interface HeaderProps {
  page: Page;
}

export class Header extends React.Component<HeaderProps, {}> {
  public render() {
    return (
      <Container>
        <h1>{this.props.page.title}</h1>
      </Container>
    );
  }
}
