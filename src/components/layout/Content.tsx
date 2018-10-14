import React from 'react';
import Container from 'reactstrap/lib/Container';
import { Page } from 'scripts/models/Page';

export interface ContentProps {
  page: Page;
}

export class Content extends React.Component<ContentProps, {}> {
  public render() {
    return <Container>Page content</Container>;
  }
}
