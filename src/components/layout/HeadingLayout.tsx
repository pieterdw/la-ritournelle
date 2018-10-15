import React from 'react';
import { HeadingLayoutSettings } from 'scripts/models/HeadingLayout';

export interface HeadingLayoutProps {
  settings: HeadingLayoutSettings;
}

export const HeadingLayout: React.SFC<HeadingLayoutProps> = ({ settings }) => {
  let content = '<' + settings.tag;
  if (settings.id) content += ` id="${settings.id}"`;
  if (settings.class) content += ` class="${settings.class}"`;
  if (settings.style) content += ` style="${settings.style}"`;
  content += `>${settings.text}</${settings.tag}>`;
  return <div className="headerLayout" dangerouslySetInnerHTML={{ __html: content }} />;
};
