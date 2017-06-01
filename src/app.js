import React from 'react';
import { Fragment } from 'redux-little-router';

import About from './containers/about';
import Send from './containers/send';
import Home from './containers/home';

class App extends React.Component {
  render() {
    return (
      <Fragment forRoute='/'>
        <div className="App">
          <h1 className="text-center title">anon texts</h1>
          <Fragment forRoute='/'><Home /></Fragment>
          <Fragment forRoute='/about'><About /></Fragment>
          <Fragment forRoute='/send'><Send /></Fragment>
        </div>
      </Fragment>
    );
  }
}

export default App;
