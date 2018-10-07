import { Layout } from './Layout';

export interface RawPage {
  slug: string;
  title: string;
  title_en: string;
  title_fr: string;
  content: Layout[];
  content_en: Layout[];
  content_fr: Layout[];
}

export interface Page {
  locale: 'nl' | 'en' | 'fr';
  path: string;
  title: string;
  content: Layout[];
}
