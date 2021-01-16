import React, { Component } from 'react';
import { render } from 'react-dom';
import SignIn from './SignIn.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="entry">
        <div id="title">EZ-Linter</div>
        <SignIn />
      </div>
    );
  }
}
