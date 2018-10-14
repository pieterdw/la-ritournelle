import { LayoutSettings } from './LayoutSettings';

export interface ImageLayout {
  component: 'image';
  settings: ImageLayoutSettings;
}

export interface ImageLayoutSettings extends LayoutSettings {
  image: ImageLayoutImage;
  width: number;
  height: number;
}

export interface ImageLayoutImage {
  path: string;
  meta: ImageLayoutImageMeta;
}

export interface ImageLayoutImageMeta {
  title: string;
}
