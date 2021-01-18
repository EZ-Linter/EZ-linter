import React, { Component } from 'react';
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
        loadPresets={loadPresets}
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
