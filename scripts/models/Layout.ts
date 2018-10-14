import { ContentLayout } from './ContentLayout';
import { GridLayout } from './GridLayout';
import { HeadingLayout } from './HeadingLayout';
import { ImageLayout } from './ImageLayout';

export type Layout = GridLayout | HeadingLayout | ContentLayout | ImageLayout;
