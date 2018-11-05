import { MenuItem } from './MenuItem';

export interface Page {
  locale: 'nl' | 'en' | 'fr';
  id: string;
  slug: string;
  path: string;
  title: string;
  intro: string;
  text: any;
  menu: MenuItem[];
}
