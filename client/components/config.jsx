import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ParserOptions from './parserOptions.jsx';
import Rules from './rules.jsx';
import Envs from './envs.jsx';

function Config(props) {
  // destructuring properties passed down from props
  const {
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
      <Rules rules={rules} updateRule={updateRule} />
      <Envs envs={envs} updateEnv={updateBoos} />
    </>
  );
}

export default Config;
