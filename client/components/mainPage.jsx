import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Config from './config.jsx';
import ourState from './state.js';

// import * as Actions from './actions/actions.js'
import ExportBtn from './ExportBtn.jsx';
import SignInBtn from './SignInBtn.jsx';
import SaveConfigBtn from './SaveConfigBtn.jsx';

import sessionCookieExists from '../lib/sessionCookieExists';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { config: ourState, savedConfigs: [] };
    this.updateRule = this.updateRule.bind(this);
    this.updateEnv = this.updateEnv.bind(this);
    this.updateParserOptions = this.updateParserOptions.bind(this);
    this.addSavedConfig = this.addSavedConfig.bind(this);
  }

  updateRule(rule) {
    // checking the current value of the rule and setting the newVal accordingly
    let newVal;
    const currVal = this.state.config.rules[rule];
    if (currVal === 0) newVal = 1;
    else if (currVal === 1) newVal = 2;
    else if (currVal === 2) newVal = 0;

    // set new state
    return this.setState({
      config: {
        ...this.state.config,
        rules: {
          ...this.state.config.rules,
          [rule]: newVal,
        },
      },
    });
  }

  updateEnv(env) {
    // checking the current value of the env and setting the newVal accordingly
    const currVal = this.state.config.env[env];
    const newVal = !currVal;
    return this.setState({
      config: {
        ...this.state.config,
        env: {
          ...this.state.config.env,
          [env]: newVal,
        },
      },
    });
  }

  updateParserOptions(e) {
    return null;
  }

  addSavedConfig(configObj) {
    // check if config is already in saved list
    const duplicatedConfig = this.state.savedConfigs.find(
      (cObj) => cObj.configId === configObj.configId
    );
    if (duplicatedConfig) {
      throw new Error(`This config is already saved with name ${duplicatedConfig.name}`);
    } else {
      this.setState({ savedConfigs: this.state.savedConfigs.concat(configObj) });
    }
  }

  render() {
    const { rules, env } = this.state.config;

    return (
      <div id="main">
        {sessionCookieExists() ? (
          <SaveConfigBtn config={this.state.config} addSavedConfig={this.addSavedConfig} />
        ) : null}
        <SignInBtn />
        <ExportBtn config={this.state.config} />
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
