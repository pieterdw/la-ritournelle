import React from 'react';
import { Link, withRouteData } from 'react-static';
import Button from 'reactstrap/lib/Button';
import { Content } from '../components/Content';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Template } from '../components/Template';
import '../css/HomePage.scss';
import { PageProps } from './Page';

export default withRouteData((props: PageProps) => {
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
      <Content {...props} className="wow slideInUp" />
      <Footer {...props} menu={props.menu} />
    </Template>
  );
});
