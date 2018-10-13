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
  slug: string;
  path: string;
  title: string;
  intro: string;
  content: Layout[];
}
