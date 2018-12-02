import { ImagePath } from './ImagePath';

export interface Surrounding {
  value: SurroundingValue;
}

export interface SurroundingValue {
  title: string;
  description: string;
  image: ImagePath;
  distance: string;
  link: string;
}
