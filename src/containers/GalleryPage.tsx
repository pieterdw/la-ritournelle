import React from 'react';
import { withRouteData } from 'react-static';
import { Gallery } from 'scripts/models/Gallery';
import { Footer } from '../components/Footer';
import { GalleryOverview } from '../components/gallery/GalleryOverview';
import { Header } from '../components/Header';
import { Template } from '../components/Template';
import '../css/GalleryPage.scss';
import { PageProps } from './Page';

export interface GalleryPageProps extends PageProps {
  galleries: Gallery[];
  gallerySlug?: string;
}

export default withRouteData((props: GalleryPageProps) => (
  <Template {...props}>
    <Header
      title={
        props.title + (props.gallerySlug ? ': ' + props.galleries.find(g => g.slug === props.gallerySlug).title : '')
      }
      intro={props.intro}
    />
    <GalleryOverview {...props} />
    <Footer {...props} />
  </Template>
));
