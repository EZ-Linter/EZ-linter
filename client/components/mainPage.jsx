import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Config from './config.jsx'
import ourState from './state.js';

// import * as Actions from './actions/actions.js'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = ourState;
    this.updateRule = this.updateRule.bind(this);
    this.updateBoos = this.updateBoos.bind(this);
    this.updateDropDown = this.updateDropDown.bind(this);
  }

  updateRule(rule) {
    // checking the current value of the rule and setting the newVal accordingly
    // if 0, set to 1; if 1, set to 2; if 2, set to 0
    let newVal;
    const currVal = this.state.rules[rule];
    if (currVal === 0) newVal = 1;
    else if (currVal === 1) newVal = 2;
    else if (currVal === 2) newVal = 0;

    // set new state
    return this.setState({
      ...this.state,
      rules: {
        ...this.state.rules,
        [rule]: newVal,
      }
    });
  };

  updateBoos(val) {
    // checking the current value of the env and setting the newVal accordingly
    // if true, set to false; if false, set to true
    const currVal = this.state.env[val];
    const newVal = !currVal;
    return this.setState({
      ...this.state,
      env: {
        ...this.state.env,
        [val]: newVal,
      }
    });
  }

  updateDropDown(e) {
    return null;
  }

  render() {
    const { parserOptions, rules, env } = this.state;

    return (
      <div id="main">
        <Config
          parserOptions={parserOptions}
          updateDropDown={this.updateDropDown}
          updateBoos={this.updateBoos}
          rules={rules}
          updateRule={this.updateRule}
          envs={env}
        />
      </div>
    );
  }
}

{/* <form method="GET" action='/createroom'> */}
{/* <form method="POST" action='/joinroom'></form> */}

export default Main;
