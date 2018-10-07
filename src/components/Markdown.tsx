import React from 'react';
import remark from 'remark';
import remarkHtml from 'remark-html';
import recommended from 'remark-preset-lint-recommended';

export interface MarkdownProps {
  content: string;
  className?: string;
}

export const Markdown: React.SFC<MarkdownProps> = ({ content, className }) => {
  content = remark()
    .use(recommended)
    .use(remarkHtml)
    .processSync(content)
    .toString();
  return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />;
};
