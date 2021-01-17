import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rules from './rules.jsx';
import ourState from './state.js';
// import * as Actions from './actions/actions.js';

class Config extends Component {
  constructor(props) {
    super(props);
    this.state = ourState;
    this.updateRule = this.updateRule.bind(this);
    this.updateEnv = this.updateEnv.bind(this);
    this.updateParserOptions = this.updateParserOptions.bind(this);
  }

  componentDidMount() {
    // console.log('pre state change ', this.state);
    // this.updateRule();
  }

  updateRule(key) {
    // key is the key to the rule stored in state
    // checking the current value of the rule and setting the newVal accordingly
    let currVal = this.state.rules[key];
    let newVal;
    if(currVal === 0) newVal = 1;
    else if (currVal === 1) newVal = 2;
    else if (currVal === 2) newVal = 0;
    // console.log('updateRule state', this.state);;
    this.setState({
      ...this.state,
      rules: {
        ...this.state.rules,
        [key]: newVal,
      }
    });
  }
  
  updateEnv(e) {
    return null;
  }
  
  updateParserOptions(e) {
    return null;
  }

  render() {
    return(
      <Rules updateRule={this.updateRule} rules={this.state.rules}></Rules>
    )
  }
}

export default Config;
