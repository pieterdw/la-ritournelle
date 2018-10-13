import { LayoutSettings } from './LayoutSettings';

export interface HeadingLayout {
  component: 'heading';
  settings: HeadingLayoutSettings;
}

export interface HeadingLayoutSettings extends LayoutSettings {
  text: string;
  tag: string;
}
