import React from 'react';
import Container from 'reactstrap/lib/Container';
import '../css/Header.scss';
import { cn } from '../utils/cn';
import { Markdown } from './Markdown';

export interface HeaderProps {
  title: string;
  intro: string;
  animate?: boolean;
}

export class Header extends React.Component<HeaderProps, {}> {
  public render() {
    const { title, intro, animate } = this.props;
    return (
      <Container className="pageHeader">
        <div>
          <h1 className={cn(animate && 'wow fadeInUp')}>{title}</h1>
          <Markdown content={intro} className={cn(animate && 'wow fadeIn')} />
        </div>
      </Container>
    );
  }
}
