import React from 'react';
import Alert from 'reactstrap/lib/Alert';
import Container from 'reactstrap/lib/Container';
import { Page } from 'scripts/models/Page';
import { LayoutChooser } from './content/LayoutChooser';

export interface ContentProps {
  page: Page;
}

export class Content extends React.Component<ContentProps, {}> {
  public render() {
    return (
      <React.Fragment>
        {this.props.page.content &&
          this.props.page.content.map((layout, i) => (
            <Container key={i}>
              <LayoutChooser layout={layout} />
            </Container>
          ))}
        <Container>
          <Alert>{JSON.stringify(this.props.page)}</Alert>
        </Container>
      </React.Fragment>
    );
  }
}
