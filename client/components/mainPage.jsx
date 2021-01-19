import React, { Component } from 'react';
import Config from './config.jsx';
import Instructions from './instructions.jsx';
import ourState from './state.js';

// import * as Actions from './actions/actions.js'
import ExportBtn from './ExportBtn.jsx';
import ImportBtn from './ImportBtn.jsx';
import SignInBtn from './SignInBtn.jsx';
import ShareBtn from './ShareBtn.jsx';
import SaveConfigBtn from './SaveConfigBtn.jsx';
import SavedConfigs from './SavedConfigs.jsx';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: ourState,
      allRules: 0,
      allEnvironments: false,
      savedConfigs: [],
      isLoggedIn: false,
    };

    this.updateRule = this.updateRule.bind(this);
    this.updateAllRules = this.updateAllRules.bind(this);
    this.addSavedConfig = this.addSavedConfig.bind(this);
    this.removeSavedConfig = this.removeSavedConfig.bind(this);
    this.importConfig = this.importConfig.bind(this);
    this.updateBoos = this.updateBoos.bind(this);
    this.updateAllEnvironments = this.updateAllEnvironments.bind(this);
    this.updateDropDown = this.updateDropDown.bind(this);
    this.loadUserConfig = this.loadUserConfig.bind(this);
    this.loadPresets = this.loadPresets.bind(this);
  }

  loadPresets(presets) {
    console.log('onclick', presets)
    this.setState({
      config: presets});
  }

  updateRule(rule) {
    // checking the current value of the rule and setting the newVal accordingly
    // if 0, set to 1; if 1, set to 2; else set to 0 (in case imported state
    // file gets edited and received values not 0, 1, or 2)
    let newVal;
    const currVal = this.state.config.rules[rule];
    if (currVal === 0) newVal = 1;
    else if (currVal === 1) newVal = 2;
    else newVal = 0;

    // set new state
    return this.setState({
      ...this.state,
      // turn off color for apply-all button
      allRules: 0,
      // update state
      config: {
        ...this.state.config,
        rules: {
          ...this.state.config.rules,
          [rule]: newVal,
        },
      },
    });
  }

  updateAllRules() {
    const allRulesTo = (newVal) => Object.fromEntries(Object.entries(this.state.config.rules).map(([key]) => [key, newVal]))
    // checking the current value of the first rule and setting the newVal accordingly
    // if 0, set to 1; if 1, set to 2; if 2, set to 0
    let newVal;
    const currVal = this.state.allRules;
    if (currVal === 0) newVal = 1;
    else if (currVal === 1) newVal = 2;
    else newVal = 0;

    // set new state
    return this.setState({
      ...this.state,
      allRules: newVal,
      config: {
        ...this.state.config,
        rules: allRulesTo(newVal)
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
          ...this.state,
          // turn off color for apply-all button
          allEnvironments: false,
          // update state
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

  updateAllEnvironments() {
    const allEnvsTo = (newVal) => Object.fromEntries(Object.entries(this.state.config.env).map(([key]) => [key, newVal]))
    // checking the current value of the first env and setting the newVal accordingly
    // if true, set to false; if false, set to true
    const currVal = this.state.allEnvironments;
    const newVal = !currVal;

    return this.setState({
      ...this.state,
      allEnvironments: newVal,
      config: {
        ...this.state.config,
        env: allEnvsTo(newVal),
      },
    });
  }

  updateDropDown(selected) {
    // check if change should be to ECMA Version or Source Type
    // and update state accordingly
    switch (selected.type) {
      case 'version':
        return this.setState({
          config: {
            ...this.state.config,
            parserOptions: {
              ...this.state.config.parserOptions,
              ecmaVersion: selected.value,
            },
          },
        });

      case 'sourceType':
        return this.setState({
          config: {
            ...this.state.config,
            parserOptions: {
              ...this.state.config.parserOptions,
              sourceType: selected.value,
            },
          },
        });

      default:
      // return this.setState({ ...this.state.config });
    }
  }

  addSavedConfig(configObj) {
    this.setState({ savedConfigs: this.state.savedConfigs.concat(configObj) });
  }

  removeSavedConfig(name) {
    this.setState({
      savedConfigs: this.state.savedConfigs.filter((configObj) => configObj.name !== name),
    });
  }

  loadUserConfig(configId) {
    const configUrl = `/api/config/${configId}`;

    fetch(configUrl)
      .then((res) => res.json())
      .then((data) => this.setState({ config: data.eslintrc }))
      .catch((err) => window.alert('Could not load configuration. Tough luck...'));
  }

  importConfig(event) {
    const uploadedFile = event.target.files[0];

    // if the size of the file is greater than 100KB, do nothing
    if (uploadedFile.size > 100000) return;

    const reader = new FileReader();
    
    // define what the reader should do on load
    reader.onload = (e) => {
      const importedConfig = JSON.parse(e.target.result);
      const newRules = importedConfig.rules;
      const newEnv = importedConfig.env;

      this.setState({
        ...this.state,
        config: {
          ...this.state.config,
          rules: newRules,
          env: newEnv
        }
      });
    }

    // tell the reader to read the uploaded file (onload will execute after)
    reader.readAsText(uploadedFile);
  }

  componentDidMount() {
    // attempt to retrieve the user's saved configs
    fetch('api/user/savedconfigs').then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          this.setState({ isLoggedIn: true, savedConfigs: data.configs });
        });
      }
    });

    //if this component was loaded from a /shared/:id url, load config specified on prop
    if (this.props.sharedConfigId) {
      fetch(`/api/config/share/${this.props.sharedConfigId}`)
      .then(res => {
        if (res.status === 410) {
          window.alert('This configuration seems to have expired and is no longer available')
          throw new Error('expired configuration')
        }

        return res
      })
      .then(res => res.json())
      .then(data => this.setState({config: data.eslintrc}))
      .catch((err) => console.error(err))
    }
  }

  render() {
    const { rules, env, parserOptions } = this.state.config;
    const { allRules, allEnvironments, config } = this.state;

    return (
      <div id="main">
        {this.state.isLoggedIn ? (
          <SavedConfigs
            configs={this.state.savedConfigs}
            loader={this.loadConfig}
            remover={this.removeSavedConfig}
            />
          ) : null}
        <ImportBtn importHandler={this.importConfig} />
        <SignInBtn />
        <ShareBtn config={config}/>
        <Config
          loadPresets={this.loadPresets}
          parserOptions={parserOptions}
          updateDropDown={this.updateDropDown}
          updateBoos={this.updateBoos}
          rules={rules}
          allRules={allRules}
          updateRule={this.updateRule}
          updateAllRules={this.updateAllRules}
          envs={env}
          allEnvs={allEnvironments}
          updateAllEnvironments={this.updateAllEnvironments}
        />
        {this.state.isLoggedIn ? (
          <SaveConfigBtn
            config={this.state.config}
            addSavedConfig={this.addSavedConfig}
            savedConfigs={this.state.savedConfigs}
          />
        ) : null}
        <ExportBtn config={config} />
        <Instructions />
      </div>
    );
  }
}

export default Main;
