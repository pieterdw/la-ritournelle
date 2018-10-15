import React from 'react';
import Container from 'reactstrap/lib/Container';
import { Page } from 'scripts/models/Page';
import '../css/Footer.scss';

export interface FooterProps {
  page: Page;
}

export class Footer extends React.Component<FooterProps, {}> {
  public render() {
    return (
      <div className="pageFooter">
        <Container />
      </div>
    );
  }
}
