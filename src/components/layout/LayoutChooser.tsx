import React from 'react';
import Alert from 'reactstrap/lib/Alert';
import { Layout } from 'scripts/models/Layout';
import { ContentLayout } from './ContentLayout';
import { GridLayout } from './GridLayout';
import { HeadingLayout } from './HeadingLayout';
import { ImageLayout } from './ImageLayout';

export interface LayoutChooserProps {
  layout: Layout;
}

export const LayoutChooser: React.SFC<LayoutChooserProps> = ({ layout }) => {
  switch (layout.component) {
    case 'grid':
      return <GridLayout settings={layout.settings} columns={layout.columns} />;
    case 'heading':
      return <HeadingLayout settings={layout.settings} />;
    case 'content':
      return <ContentLayout settings={layout.settings} />;
    case 'image':
      return <ImageLayout settings={layout.settings} />;
    default:
      return (
        <Alert>
          <strong>No layout component!</strong> {JSON.stringify(layout)}
        </Alert>
      );
  }
};
