import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Config from './config.jsx';
import ourState from './state.js';

// import * as Actions from './actions/actions.js'
import ExportBtn from './ExportBtn.jsx';
import SignInBtn from './SignInBtn.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = ourState;
    this.updateRule = this.updateRule.bind(this);
    this.updateEnv = this.updateEnv.bind(this);
    this.updateParserOptions = this.updateParserOptions.bind(this);
  }

  updateRule(rule) {
    // checking the current value of the rule and setting the newVal accordingly
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
      },
    });
  }

  updateEnv(env) {
    // checking the current value of the env and setting the newVal accordingly
    const currVal = this.state.env[env];
    const newVal = !currVal;
    return this.setState({
      ...this.state,
      env: {
        ...this.state.env,
        [env]: newVal,
      },
    });
  }

  updateParserOptions(e) {
    return null;
  }

  render() {
    const { rules, env } = this.state;

    return (
      <div id="main">
        <SignInBtn />
        <ExportBtn config={this.state} />
        <Config rules={rules} updateRule={this.updateRule} envs={env} updateEnv={this.updateEnv} />
      </div>
    );
  }
}

{
  /* <form method="GET" action='/createroom'> */
}
{
  /* <form method="POST" action='/joinroom'></form> */
}

export default Main;
