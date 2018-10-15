import React from 'react';
import Container from 'reactstrap/lib/Container';
import { Page } from 'scripts/models/Page';
import { cn } from '../utils/cn';
import { Markdown } from './Markdown';

export interface HeaderProps {
  page: Page;
}

export class Header extends React.Component<HeaderProps, {}> {
  public render() {
    const page = this.props.page;
    return (
      <Container className="pageHeader">
        <div>
          <h1 className={cn(page.slug === 'home' && 'wow slideInBottom')}>{page.title}</h1>
          <Markdown content={page.intro} />
        </div>
      </Container>
    );
  }
}
