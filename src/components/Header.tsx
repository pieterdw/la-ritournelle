import React from 'react';
import Container from 'reactstrap/lib/Container';
import { Page } from 'scripts/models/Page';
import '../css/Header.scss';
import { cn } from '../utils/cn';
import { Markdown } from './Markdown';

export interface HeaderProps {
  page: Page;
  animate?: boolean;
}

export class Header extends React.Component<HeaderProps, {}> {
  public render() {
    const { page, animate } = this.props;
    return (
      <Container className="pageHeader">
        <div>
          <h1 className={cn(animate && 'wow fadeInUp')}>{page.title}</h1>
          <Markdown content={page.intro} className={cn(animate && 'wow fadeIn')} />
        </div>
      </Container>
    );
  }
}
