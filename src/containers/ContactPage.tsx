import React from 'react';
import { withRouteData } from 'react-static';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { ContactForm } from '../components/ContactForm';
import { Content } from '../components/Content';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Markdown } from '../components/Markdown';
import { Template } from '../components/Template';
import '../css/ContactPage.scss';
import { PageProps } from './Page';

export interface ContactPageProps extends PageProps {
  contactformtext: string;
  sidepaneltext: string;
}

export default withRouteData((props: ContactPageProps) => (
  <Template {...props}>
    <Header title={props.title} intro={props.intro} />
    <Content {...props}>
      <Row>
        <Col sm={12} md={7} lg={8}>
          <Markdown content={props.contactformtext} />
          <ContactForm {...props} />
        </Col>
        <Col>
          <div className="sidePanel">
            <Markdown content={props.sidepaneltext} />
          </div>
        </Col>
      </Row>
    </Content>
    <Footer {...props} />
  </Template>
));
