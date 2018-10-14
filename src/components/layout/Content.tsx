import React from 'react';
import { Page } from 'scripts/models/Page';

export interface ContentProps {
  page: Page;
}

export class Content extends React.Component<ContentProps, {}> {
  public render() {
    return <div>Page content: {JSON.stringify(this.props.page)}</div>;
  }
}
