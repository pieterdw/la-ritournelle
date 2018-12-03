import React from 'react';
import { hot } from 'react-hot-loader';
import { Router } from 'react-static';
import Routes from 'react-static-routes';
import smoothscroll from 'smoothscroll-polyfill';
import './css/App.scss';

if (window) {
  smoothscroll.polyfill();
}

if (process.env.NODE_ENV !== 'production') {
  const WOW = require('wowjs');
  (window as any).WOW = WOW.WOW;
}

const App = () => (
  <Router>
    <Routes />
  </Router>
);

export default hot(module)(App);
