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
    allRules,
    updateRule,
    updateAllRules,
    envs,
    allEnvs,
    updateAllEnvironments,
  } = props;

  return (
    <>
      <ParserOptions
        parserOptions={parserOptions}
        updateDropDown={updateDropDown}
        updateFeature={updateBoos}
      />
      <Rules
        rules={rules}
        allRules={allRules}
        updateRule={updateRule}
        updateAllRules={updateAllRules}
      />
      <Envs
        envs={envs}
        allEnvs={allEnvs}
        updateEnv={updateBoos}
        updateAllEnvironments={updateAllEnvironments}
      />
    </>
  );
}

export default Config;
