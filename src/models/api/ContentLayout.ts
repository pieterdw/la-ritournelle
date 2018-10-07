import { LayoutSettings } from './LayoutSettings';

export interface ContentLayout {
  component: 'content';
  settings: ContentLayoutSettings;
}

export interface ContentLayoutSettings extends LayoutSettings {
  content: string;
}
