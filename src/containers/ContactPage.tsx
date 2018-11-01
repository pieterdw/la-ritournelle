import React from 'react';
import { withRouteData } from 'react-static';
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
      <ContactForm {...props} />
    </Content>
    <Footer page={props.page} menu={props.menu} />
  </Template>
));
