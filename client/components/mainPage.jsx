import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Config from './config.jsx';
import ourState from './state.js';

// import * as Actions from './actions/actions.js'
import ExportBtn from './ExportBtn.jsx';
import SignInBtn from './SignInBtn.jsx';
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
    this.updateBoos = this.updateBoos.bind(this);
    this.updateAllEnvironments = this.updateAllEnvironments.bind(this);
    this.updateDropDown = this.updateDropDown.bind(this);
    this.loadConfig = this.loadConfig.bind(this);
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

  updateAllRules() {
    // checking the current value of the first rule and setting the newVal accordingly
    // if 0, set to 1; if 1, set to 2; if 2, set to 0
    let newVal;
    const currVal = this.state.allRules;
    if (currVal === 0) newVal = 1;
    else if (currVal === 1) newVal = 2;
    else if (currVal === 2) newVal = 0;

    // set new state
    return this.setState({
      ...this.state,
      allRules: newVal,
      config: {
        ...this.state.config,
        rules: {
          'accessor-pairs': newVal,
          'array-bracket-newline': newVal,
          'array-bracket-spacing': newVal,
          'array-callback-return': newVal,
          'array-element-newline': newVal,
          'arrow-body-style': newVal,
          'arrow-parens': newVal,
          'arrow-spacing': newVal,
          'block-scoped-var': newVal,
          'block-spacing': newVal,
          'brace-style': newVal,
          'callback-return': newVal,
          'camelcase': newVal,
          'capitalized-comments': newVal,
          'class-methods-use-this': newVal,
          'comma-dangle': newVal,
          'comma-spacing': newVal,
          'comma-style': newVal,
          'complexity': newVal,
          'computed-property-spacing': newVal,
          'consistent-return': newVal,
          'consistent-this': newVal,
          'constructor-super': newVal,
          'curly': newVal,
          'default-case': newVal,
          'default-case-last': newVal,
          'default-param-last': newVal,
          'dot-location': newVal,
          'dot-notation': newVal,
          'eol-last': newVal,
          'eqeqeq': newVal,
          'for-direction': newVal,
          'func-call-spacing': newVal,
          'func-name-matching': newVal,
          'func-names': newVal,
          'func-style': newVal,
          'function-call-argument-newline': newVal,
          'function-paren-newline': newVal,
          'generator-star-spacing': newVal,
          'getter-return': newVal,
          'global-require': newVal,
          'grouped-accessor-pairs': newVal,
          'guard-for-in': newVal,
          'handle-callback-err': newVal,
          'id-blacklist': newVal,
          'id-denylist': newVal,
          'id-length': newVal,
          'id-match': newVal,
          'implicit-arrow-linebreak': newVal,
          'indent': newVal,
          'indent-legacy': newVal,
          'init-declarations': newVal,
          'jsx-quotes': newVal,
          'key-spacing': newVal,
          'keyword-spacing': newVal,
          'line-comment-position': newVal,
          'linebreak-style': newVal,
          'lines-around-comment': newVal,
          'lines-around-directive': newVal,
          'lines-between-class-members': newVal,
          'max-classes-per-file': newVal,
          'max-depth': newVal,
          'max-len': newVal,
          'max-lines': newVal,
          'max-lines-per-function': newVal,
          'max-nested-callbacks': newVal,
          'max-params': newVal,
          'max-statements': newVal,
          'max-statements-per-line': newVal,
          'multiline-comment-style': newVal,
          'multiline-ternary': newVal,
          'new-cap': newVal,
          'new-parens': newVal,
          'newline-after-var': newVal,
          'newline-before-return': newVal,
          'newline-per-chained-call': newVal,
          'no-alert': newVal,
          'no-array-constructor': newVal,
          'no-async-promise-executor': newVal,
          'no-await-in-loop': newVal,
          'no-bitwise': newVal,
          'no-buffer-constructor': newVal,
          'no-caller': newVal,
          'no-case-declarations': newVal,
          'no-catch-shadow': newVal,
          'no-class-assign': newVal,
          'no-compare-neg-zero': newVal,
          'no-cond-assign': newVal,
          'no-confusing-arrow': newVal,
          'no-console': newVal,
          'no-const-assign': newVal,
          'no-constant-condition': newVal,
          'no-constructor-return': newVal,
          'no-continue': newVal,
          'no-control-regex': newVal,
          'no-debugger': newVal,
          'no-delete-var': newVal,
          'no-div-regex': newVal,
          'no-dupe-args': newVal,
          'no-dupe-class-members': newVal,
          'no-dupe-else-if': newVal,
          'no-dupe-keys': newVal,
          'no-duplicate-case': newVal,
          'no-duplicate-imports': newVal,
          'no-else-return': newVal,
          'no-empty': newVal,
          'no-empty-character-class': newVal,
          'no-empty-function': newVal,
          'no-empty-pattern': newVal,
          'no-eq-null': newVal,
          'no-eval': newVal,
          'no-ex-assign': newVal,
          'no-extend-native': newVal,
          'no-extra-bind': newVal,
          'no-extra-boolean-cast': newVal,
          'no-extra-label': newVal,
          'no-extra-parens': newVal,
          'no-extra-semi': newVal,
          'no-fallthrough': newVal,
          'no-floating-decimal': newVal,
          'no-func-assign': newVal,
          'no-global-assign': newVal,
          'no-implicit-coercion': newVal,
          'no-implicit-globals': newVal,
          'no-implied-eval': newVal,
          'no-import-assign': newVal,
          'no-inline-comments': newVal,
          'no-inner-declarations': newVal,
          'no-invalid-regexp': newVal,
          'no-invalid-this': newVal,
          'no-irregular-whitespace': newVal,
          'no-iterator': newVal,
          'no-label-var': newVal,
          'no-labels': newVal,
          'no-lone-blocks': newVal,
          'no-lonely-if': newVal,
          'no-loop-func': newVal,
          'no-loss-of-precision': newVal,
          'no-magic-numbers': newVal,
          'no-misleading-character-class': newVal,
          'no-mixed-operators': newVal,
          'no-mixed-requires': newVal,
          'no-mixed-spaces-and-tabs': newVal,
          'no-multi-assign': newVal,
          'no-multi-spaces': newVal,
          'no-multi-str': newVal,
          'no-multiple-empty-lines': newVal,
          'no-native-reassign': newVal,
          'no-negated-condition': newVal,
          'no-negated-in-lhs': newVal,
          'no-nested-ternary': newVal,
          'no-new': newVal,
          'no-new-func': newVal,
          'no-new-object': newVal,
          'no-new-require': newVal,
          'no-new-symbol': newVal,
          'no-new-wrappers': newVal,
          'no-nonoctal-decimal-escape': newVal,
          'no-obj-calls': newVal,
          'no-octal': newVal,
          'no-octal-escape': newVal,
          'no-param-reassign': newVal,
          'no-path-concat': newVal,
          'no-plusplus': newVal,
          'no-process-env': newVal,
          'no-process-exit': newVal,
          'no-promise-executor-return': newVal,
          'no-proto': newVal,
          'no-prototype-builtins': newVal,
          'no-redeclare': newVal,
          'no-regex-spaces': newVal,
          'no-restricted-exports': newVal,
          'no-restricted-globals': newVal,
          'no-restricted-imports': newVal,
          'no-restricted-modules': newVal,
          'no-restricted-properties': newVal,
          'no-restricted-syntax': newVal,
          'no-return-assign': newVal,
          'no-return-await': newVal,
          'no-script-url': newVal,
          'no-self-assign': newVal,
          'no-self-compare': newVal,
          'no-sequences': newVal,
          'no-setter-return': newVal,
          'no-shadow': newVal,
          'no-shadow-restricted-names': newVal,
          'no-spaced-func': newVal,
          'no-sparse-arrays': newVal,
          'no-sync': newVal,
          'no-tabs': newVal,
          'no-template-curly-in-string': newVal,
          'no-ternary': newVal,
          'no-this-before-super': newVal,
          'no-throw-literal': newVal,
          'no-trailing-spaces': newVal,
          'no-undef': newVal,
          'no-undef-init': newVal,
          'no-undefined': newVal,
          'no-underscore-dangle': newVal,
          'no-unexpected-multiline': newVal,
          'no-unmodified-loop-condition': newVal,
          'no-unneeded-ternary': newVal,
          'no-unreachable': newVal,
          'no-unreachable-loop': newVal,
          'no-unsafe-finally': newVal,
          'no-unsafe-negation': newVal,
          'no-unsafe-optional-chaining': newVal,
          'no-unused-expressions': newVal,
          'no-unused-labels': newVal,
          'no-unused-vars': newVal,
          'no-use-before-define': newVal,
          'no-useless-backreference': newVal,
          'no-useless-call': newVal,
          'no-useless-catch': newVal,
          'no-useless-computed-key': newVal,
          'no-useless-concat': newVal,
          'no-useless-constructor': newVal,
          'no-useless-escape': newVal,
          'no-useless-rename': newVal,
          'no-useless-return': newVal,
          'no-var': newVal,
          'no-void': newVal,
          'no-warning-comments': newVal,
          'no-whitespace-before-property': newVal,
          'no-with': newVal,
          'nonblock-statement-body-position': newVal,
          'object-curly-newline': newVal,
          'object-curly-spacing': newVal,
          'object-property-newline': newVal,
          'object-shorthand': newVal,
          'one-var': newVal,
          'one-var-declaration-per-line': newVal,
          'operator-assignment': newVal,
          'operator-linebreak': newVal,
          'padded-blocks': newVal,
          'padding-line-between-statements': newVal,
          'prefer-arrow-callback': newVal,
          'prefer-const': newVal,
          'prefer-destructuring': newVal,
          'prefer-exponentiation-operator': newVal,
          'prefer-named-capture-group': newVal,
          'prefer-numeric-literals': newVal,
          'prefer-object-spread': newVal,
          'prefer-promise-reject-errors': newVal,
          'prefer-reflect': newVal,
          'prefer-regex-literals': newVal,
          'prefer-rest-params': newVal,
          'prefer-spread': newVal,
          'prefer-template': newVal,
          'quote-props': newVal,
          'quotes': newVal,
          'radix': newVal,
          'require-atomic-updates': newVal,
          'require-await': newVal,
          'require-jsdoc': newVal,
          'require-unicode-regexp': newVal,
          'require-yield': newVal,
          'rest-spread-spacing': newVal,
          'semi': newVal,
          'semi-spacing': newVal,
          'semi-style': newVal,
          'sort-imports': newVal,
          'sort-keys': newVal,
          'sort-vars': newVal,
          'space-before-blocks': newVal,
          'space-before-function-paren': newVal,
          'space-in-parens': newVal,
          'space-infix-ops': newVal,
          'space-unary-ops': newVal,
          'spaced-comment': newVal,
          'strict': newVal,
          'switch-colon-spacing': newVal,
          'symbol-description': newVal,
          'template-curly-spacing': newVal,
          'template-tag-spacing': newVal,
          'unicode-bom': newVal,
          'use-isnan': newVal,
          'valid-jsdoc': newVal,
          'valid-typeof': newVal,
          'vars-on-top': newVal,
          'wrap-iife': newVal,
          'wrap-regex': newVal,
          'yield-star-spacing': newVal,
          'yoda': newVal,
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

  updateAllEnvironments() {
    // checking the current value of the first env and setting the newVal accordingly
    // if true, set to false; if false, set to true
    const currVal = this.state.allEnvironments;
    const newVal = !currVal;

    return this.setState({
      ...this.state,
      allEnvironments: newVal,
      config: {
        ...this.state.config,
        env: {
          'browser': newVal,
          'node': newVal,
          'commonjs': newVal,
          'shared-node-browser': newVal,
          'worker': newVal,
          'amd': newVal,
          'mocha': newVal,
          'jasmine': newVal,
          'jest': newVal,
          'phantomjs': newVal,
          'jquery': newVal,
          'qunit': newVal,
          'prototypejs': newVal,
          'shelljs': newVal,
          'meteor': newVal,
          'mongo': newVal,
          'protractor': newVal,
          'applescript': newVal,
          'nashorn': newVal,
          'serviceworker': newVal,
          'atomtest': newVal,
          'embertest': newVal,
          'webextensions': newVal,
          'es6': newVal,
          'es2017': newVal,
          'es2020': newVal,
          'es2021': newVal,
          'greasemonkey': newVal
        },
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

  loadConfig(configId) {
    const configUrl = `/api/config/${configId}`

    fetch(configUrl)
      .then(res=> res.json())
      .then(data => this.setState({config: data.eslintrc}))
      .catch(err => window.alert('Could not load configuration. Tough luck...'))
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
  }

  render() {
    const { rules, env, parserOptions } = this.state.config;
    const { allRules, allEnvironments } = this.state;
    console.log(this.state.config);

    return (
      <div id="main">
        {this.state.isLoggedIn ? (
          <SaveConfigBtn
            config={this.state.config}
            addSavedConfig={this.addSavedConfig}
            savedConfigs={this.state.savedConfigs}
          />
        ) : null}
        {this.state.isLoggedIn ? (
          <SavedConfigs
            configs={this.state.savedConfigs}
            loader={this.loadConfig}
            remover={this.removeSavedConfig}
          />
        ) : null}
        <ExportBtn config={this.state} />
        <SignInBtn />
        <Config
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
      </div>
    );
  }
}

export default Main;
