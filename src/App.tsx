import React from 'react';
import { hot } from 'react-hot-loader';
import { Router } from 'react-static';
import Routes from 'react-static-routes';
import './css/App.scss';
const WOW = require('wowjs');

(window as any).WOW = new WOW.WOW();

const App = () => (
  <Router>
    {/* <div>
      <nav>
        <Link exact to="/">
          Home
        </Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
      </nav>
      <div className="content"> */}
    <Routes />
    {/* </div>
    </div> */}
  </Router>
);

export default hot(module)(App);
