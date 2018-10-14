import React from 'react';
import { ContentLayoutSettings } from 'scripts/models/ContentLayout';
import { cn } from '../../../utils/cn';
import { StyleUtil } from '../../../utils/StyleUtil';
import { Markdown } from '../../Markdown';

export interface ContentLayoutProps {
  settings: ContentLayoutSettings;
}

export const ContentLayout: React.SFC<ContentLayoutProps> = ({ settings }) => {
  return (
    <div
      id={settings.id || undefined}
      className={cn('contentLayout', settings.class)}
      style={StyleUtil.stringToStyleObject(settings.style) || undefined}>
      <Markdown content={settings.content} />
    </div>
  );
};
