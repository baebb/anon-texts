import React from 'react';
import { Fragment, Link } from 'redux-little-router';

import About from './containers/about';
import Send from './containers/send';
import Home from './containers/home';

class App extends React.Component {
  render() {
    return (
      <Fragment forRoute='/'>
        <div className="App">
          <a href="/" className="text-center title">
            <h1>anon<br/>texts</h1>
          </a>
          <Fragment forRoute='/'><Home /></Fragment>
          <Fragment forRoute='/about'><About /></Fragment>
          <Fragment forRoute='/send'><Send /></Fragment>
          <Fragment forNoMatch>
            <div className="text-center">
              <br/>
              <h2>404</h2>
              <em>“Anything can happen in life,<br/>especially nothing.”</em>
            </div>
          </Fragment>
        </div>
      </Fragment>
    );
  }
}

export default App;
