import React from 'react';
import { withRouteData } from 'react-static';
import { Layout } from '../components/layout/Layout';
import logoImg from '../logo.png';

export default withRouteData((props: any) => (
  <Layout title={props.page.title}>
    <h1 style={{ textAlign: 'center' }}>Welcome, this is a test! ::: {JSON.stringify(props)}</h1>
    <img src={logoImg} alt="" style={{ display: 'block', margin: '0 auto' }} />
  </Layout>
));
