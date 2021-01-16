import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rules from './rules.jsx';
import ourState from './state.js';
// import * as Actions from './actions/actions.js';

class Config extends Component {
  constructor(props) {
    super(props);
    this.state = ourState;
    // const { updateRule, updateEnv, updateParserOptions } = Actions;
    const updateRule = this.updateRule.bind(this);
    const updateEnv = this.updateEnv.bind(this);
    const updateParserOptions = this.updateParserOptions.bind(this);
  }

  componentDidMount() {
    console.log('pre state change ', this.state)
    this.updateRule();
  }

  render() {
    console.log('post state change ', this.state)
    return(
      <Rules></Rules>
    )
  }

  updateRule(e) {
    return this.setState(() => {
      return {
        ...this.state,
        parserOptions: {
          ...this.state.parserOptions,
          ecmaVersion: 2016,
        }
      }
    });
  }
  
  updateEnv(e) {
    return null;
  }
  
  updateParserOptions(e) {
    return null;
  }
}
export default Config;