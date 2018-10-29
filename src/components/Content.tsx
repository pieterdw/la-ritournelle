import React from 'react';
import Container from 'reactstrap/lib/Container';
import { Page } from 'scripts/models/Page';
import '../css/Content.scss';
import { cn } from '../utils/cn';
import { LayoutChooser } from './layout/LayoutChooser';

export interface ContentProps {
  page: Page;
  className?: string;
}

export class Content extends React.Component<ContentProps, {}> {
  public render() {
    const {
      page: { intro, content },
      children,
      className
    } = this.props;
    return (
      <div className={cn('pageContent', className)}>
        {/* {intro && (
          <Container className="contentContainer intro">
            <Markdown content={intro} />
          </Container>
        )} */}
        {children && <Container className="contentContainer">{this.props.children}</Container>}
        {content &&
          content.map((layout, i) => (
            <Container key={i} className="contentContainer">
              <LayoutChooser layout={layout} />
            </Container>
          ))}
        {/* <Container className="contentContainer">
          <Alert className="json">{JSON.stringify(this.props.page)}</Alert>
        </Container> */}
      </div>
    );
  }
}
