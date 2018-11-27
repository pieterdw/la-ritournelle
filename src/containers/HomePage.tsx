import React from 'react';
import { Link, withRouteData } from 'react-static';
import Button from 'reactstrap/lib/Button';
import { DistanceContainer } from 'src/models/Distance';
import { ImagePath } from 'src/models/ImagePath';
import { NumberValueContainer } from 'src/models/NumberValue';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HomeOverview } from '../components/home/HomeOverview';
import { Template } from '../components/Template';
import '../css/HomePage.scss';
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
  return (
    <Template {...props}>
      <Header title={props.title} intro={props.intro} animate={true}>
        <div className="headerButtons wow fadeIn">
          <Button color="primary" tag={Link} to={`/${props.locale}/info`}>
            {props.text.moreInfo}
          </Button>
          <Button color="secondary" tag={Link} to={fotos.path}>
            {fotos.label}
          </Button>
        </div>
      </Header>
      <HomeOverview {...props} />
      <Footer {...props} menu={props.menu} />
    </Template>
  );
});
