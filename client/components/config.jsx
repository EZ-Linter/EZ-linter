import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ParserOptions from './parserOptions.jsx';
import Rules from './rules.jsx';
import Envs from './envs.jsx';

function Config(props) {
  // destructuring properties passed down from props
  const {
    loadPresets,
    parserOptions,
    updateDropDown,
    updateBoos,
    rules,
    updateRule,
    envs 
  } = props;

  return (
    <>
      <ParserOptions
        parserOptions={parserOptions}
        updateDropDown={updateDropDown}
        updateFeature={updateBoos}
      />
      <Envs envs={envs} updateEnv={updateBoos} />
      <Rules 
        loadPresets={loadPresets}
        rules={rules}
        updateRule={updateRule} 
      />
    </>
  );
}

export default Config;
