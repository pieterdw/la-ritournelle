import React from 'react';
import Container from 'reactstrap/lib/Container';
import '../css/Header.scss';
import { cn } from '../utils/cn';
import { Markdown } from './Markdown';

export interface HeaderProps {
  title: string;
  intro: string;
  animate?: boolean;
  bottomContent?: JSX.Element;
}

export class Header extends React.Component<HeaderProps, {}> {
  public render() {
    const { title, intro, animate, children, bottomContent } = this.props;
    return (
      <Container className="pageHeader">
        <div className="innerPageHeader">
          <div className={cn(animate && 'wow fadeInUp')}>
            <h1>{title}</h1>
          </div>
          <Markdown content={intro} className={cn(animate && 'wow fadeIn')} />
          {children}
        </div>
        {bottomContent && <div className="bottomContent">{bottomContent}</div>}
      </Container>
    );
  }
}
