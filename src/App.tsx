import React from 'react';
import { hot } from 'react-hot-loader';
import { Link, Router } from 'react-static';
//
import Routes from 'react-static-routes';
import './app.scss';

const App = () => (
  <Router>
    <div>
      <nav>
        <Link exact to="/">
          Home
        </Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
      </nav>
      <div className="content">
        <Routes />
      </div>
    </div>
  </Router>
);

export default hot(module)(App);
