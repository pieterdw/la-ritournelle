import React from 'react';
import { withRouteData } from 'react-static';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { ContactForm } from '../components/ContactForm';
import { Content } from '../components/Content';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Template } from '../components/Template';
import '../css/ContactPage.scss';
import { PageProps } from './Page';

export interface ContactPageProps extends PageProps {}

export default withRouteData((props: ContactPageProps) => (
  <Template page={props.page} menu={props.menu} various={props.various} match={props.match}>
    <Header title={props.page.title} intro={props.page.intro} />
    <Content page={props.page}>
      <Row>
        <Col sm={12} md={7} lg={8}>
          <ContactForm {...props} />
        </Col>
        <Col>
          <div style={{ backgroundColor: 'green' }}>test</div>
        </Col>
      </Row>
    </Content>
    <Footer page={props.page} menu={props.menu} />
  </Template>
));
