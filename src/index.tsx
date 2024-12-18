import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Export your top level component as JSX (for static rendering)
export default App;

// Render your app
if (typeof document !== 'undefined') {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render;
  const render = (Comp: any) => {
    renderMethod(<Comp />, document.getElementById('root'));
  };

  // Render!
  render(App);
}
