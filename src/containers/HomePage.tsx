import React from 'react';
import { withRouteData } from 'react-static';
import { DistanceContainer } from 'src/models/Distance';
import { ImagePath } from 'src/models/ImagePath';
import { NumberValueContainer } from 'src/models/NumberValue';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HomeOverview } from '../components/home/HomeOverview';
import { Template } from '../components/Template';
import '../css/HomePage.scss';
import { scrollIt } from '../utils/scrollIt';
import { PageProps } from './Page';

export interface HomePageProps extends PageProps {
  highlight1title: string;
  highlight1text: string;
  highlight1image: ImagePath;
  highlight2title: string;
  highlight2text: string;
  highlight2image: ImagePath;
  highlight3title: string;
  highlight3text: string;
  highlight3image: ImagePath;
  numbers: NumberValueContainer[];
  distances: DistanceContainer[];
}

export default withRouteData((props: HomePageProps) => {
  const fotos = props.menu.find(x => x.id === 'gallerypage');
  const thehouse = props.menu.find(x => x.id === 'thehousepage');
  const bottomContent = (
    <div className="scrollDown">
      <a
        onClick={() => {
          const destination = (document.querySelector('.homeOverview') as any).offsetTop - 110;
          scrollIt(destination, 750, 'easeInOutQuad', undefined);
        }}>
        <i className="fas fa-angle-down" />{' '}
      </a>
    </div>
  );
  return (
    <Template {...props}>
      <Header title={props.title} intro={props.intro} animate={true} bottomContent={bottomContent} />
      <HomeOverview {...props} />
      <Footer {...props} menu={props.menu} />
    </Template>
  );
});
