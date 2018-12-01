import { ImagePath } from './ImagePath';

export interface Feature {
  value: FeatureValue;
}

export interface FeatureValue {
  title: string;
  description: string;
  image: ImagePath;
}
