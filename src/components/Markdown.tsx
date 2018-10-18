import React from 'react';
import { Converter } from 'showdown';

export interface MarkdownProps {
  content: string;
  className?: string;
}

export const Markdown: React.SFC<MarkdownProps> = ({ content, className }) => {
  content = content ? new Converter().makeHtml(content) : null;
  return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />;
};
