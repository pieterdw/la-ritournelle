import React from 'react';
import Alert from 'reactstrap/lib/Alert';
import Container from 'reactstrap/lib/Container';
import { Page } from 'scripts/models/Page';
import { cn } from '../utils/cn';
import { LayoutChooser } from './layout/LayoutChooser';

export interface ContentProps {
  page: Page;
}

export class Content extends React.Component<ContentProps, {}> {
  public render() {
    return (
      <React.Fragment>
        {this.props.page.content &&
          this.props.page.content.map((layout, i) => (
            <Container key={i} className={cn('contentContainer', i === 0 && 'first')}>
              <LayoutChooser layout={layout} />
            </Container>
          ))}
        <Container className="contentContainer">
          <Alert className="json">{JSON.stringify(this.props.page)}</Alert>
        </Container>
      </React.Fragment>
    );
  }
}
