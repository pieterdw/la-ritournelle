import React from 'react';
import Container from 'reactstrap/lib/Container';
import { PageProps } from 'src/containers/Page';
import '../css/Content.scss';
import { cn } from '../utils/cn';
import { LayoutChooser } from './layout/LayoutChooser';

export interface ContentProps extends PageProps {
  className?: string;
}

export class Content extends React.Component<ContentProps, {}> {
  public render() {
    const { content, children, className } = this.props;
    return (
      <div className={cn('pageContent', className)}>
        {children && <Container className="contentContainer">{this.props.children}</Container>}
        {content &&
          content.map((layout, i) => (
            <Container key={i} className="contentContainer">
              <LayoutChooser layout={layout} />
            </Container>
          ))}
      </div>
    );
  }
}
