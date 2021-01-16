import React, { Component } from 'react';
import { render } from 'react-dom';
import Main from './components/mainPage.jsx'

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="entry">
        <Main></Main>
      </div>
    );
  }
}

