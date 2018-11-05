import { Layout } from './Layout';
import { MenuItem } from './MenuItem';
import { PathInfo } from './PathInfo';

export interface Page {
  locale: 'nl' | 'en' | 'fr';
  id: string;
  slug: string;
  path: string;
  title: string;
  intro: string;
  content?: Layout[];
  text: any;
  menu: MenuItem[];
  otherPaths: PathInfo[];
}
