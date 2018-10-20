import React from 'react';
import { withRouteData } from 'react-static';
import { Gallery } from 'scripts/models/Gallery';
import { Content } from '../components/Content';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Template } from '../components/Template';
import '../css/GalleryPage.scss';
import { PageProps } from './Page';

export interface GalleryPageProps extends PageProps {
  galleries: Gallery[];
  gallerySlug?: string;
}

export default withRouteData((props: GalleryPageProps) => (
  <Template page={props.page} menu={props.menu} various={props.various} match={props.match}>
    <Header page={props.page} animate={true} />
    <Content page={props.page} className="wow slideInUp" />
    <Footer page={props.page} />
  </Template>
));
