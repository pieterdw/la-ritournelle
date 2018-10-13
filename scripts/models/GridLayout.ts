import { Layout } from './Layout';
import { LayoutSettings } from './LayoutSettings';

export interface GridLayout {
  component: 'grid';
  settings: LayoutSettings;
  columns: GridColumnLayout[];
}

export interface GridColumnLayout {
  settings: LayoutSettings;
  children: Layout[];
}
