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
    this.addSavedConfig = this.addSavedConfig.bind(this);
    this.updateBoos = this.updateBoos.bind(this);
    this.updateDropDown = this.updateDropDown.bind(this);
  }

  updateRule(rule) {
    // checking the current value of the rule and setting the newVal accordingly
    // if 0, set to 1; if 1, set to 2; if 2, set to 0
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

  updateBoos(val, type) {
    let currVal;
    let newVal;
    // check if change should be to ECMA features or Environments
    switch (type) {
      case 'features':
        // checking the current value of the env and setting the newVal accordingly
        // if true, set to false; if false, set to true
        currVal = this.state.config.parserOptions.ecmaFeatures[val];
        newVal = !currVal;
        return this.setState({
          config: {
            ...this.state.config,
            parserOptions: {
              ...this.state.config.parserOptions,
              ecmaFeatures: {
                ...this.state.config.parserOptions.ecmaFeatures,
                [val]: newVal,
              },
            },
          },
        });

      case 'envir':
        // checking the current value of the env and setting the newVal accordingly
        // if true, set to false; if false, set to true
        currVal = this.state.config.env[val];
        newVal = !currVal;
        return this.setState({
          config: {
            ...this.state.config,
            env: {
              ...this.state.config.env,
              [val]: newVal,
            },
          },
        });

      default:
      // return this.setState({ ...this.state });
    }
  }

  updateDropDown(selected) {
    // check if change should be to ECMA Version or Source Type
    // and update state accordingly
    switch (selected.type) {
      case 'version':
        return this.setState({config:{
          ...this.state.config,
          parserOptions: {
            ...this.state.config.parserOptions,
            ecmaVersion: selected.value,
          },
        }});

      case 'sourceType':
        return this.setState({config:{
          ...this.state.config,
          parserOptions: {
            ...this.state.config.parserOptions,
            sourceType: selected.value,
          },
        }});

      default:
        // return this.setState({ ...this.state.config });
    }
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
    const { rules, env, parserOptions } = this.state.config;

    return (
      <div id="main">
        {sessionCookieExists() ? (
          <SaveConfigBtn config={this.state.config} addSavedConfig={this.addSavedConfig} />
        ) : null}
        <ExportBtn config={this.state} />
        <SignInBtn />
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

{
  /* <form method="GET" action='/createroom'> */
}
{
  /* <form method="POST" action='/joinroom'></form> */
}

export default Main;
