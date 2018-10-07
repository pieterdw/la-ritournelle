import React from 'react';
import { withRouteData } from 'react-static';
import logoImg from '../logo.png';

export default withRouteData((props: any) => (
  <div>
    <h1 style={{ textAlign: 'center' }}>Welcome to a page! {JSON.stringify(props)}</h1>
    <img src={logoImg} alt="" style={{ display: 'block', margin: '0 auto' }} />
  </div>
));
