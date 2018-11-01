import React from 'react';
import { Link, withRouteData } from 'react-static';
import Button from 'reactstrap/lib/Button';
import { Content } from '../components/Content';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Template } from '../components/Template';
import '../css/HomePage.scss';
import { tr } from '../utils/tr';
import { PageProps } from './Page';

export default withRouteData((props: PageProps) => {
  const fotos = props.menu.find(x => x.url.endsWith('/fotos'));
  return (
    <Template page={props.page} menu={props.menu} various={props.various} match={props.match}>
      <Header title={props.page.title} intro={props.page.intro} animate={true}>
        <div className="headerButtons wow fadeIn">
          <Button color="primary" tag={Link} to={`/${props.page.locale}/info`}>
            {tr('moreInfo', props.page.locale)}
          </Button>
          <Button color="secondary" tag={Link} to={fotos.url}>
            {fotos.label}
          </Button>
        </div>
      </Header>
      <Content page={props.page} className="wow slideInUp" />
      <Footer page={props.page} />
    </Template>
  );
});
