import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Envs from './envs.jsx';
import Rules from './rules.jsx';

function Config(props) {
  // destructuring properties passed down from props
  const { rules, updateRule, envs, updateEnv } = props;

  return (
    <>
      <Rules rules={rules} updateRule={updateRule} />
      <Envs envs={envs} updateEnv={updateEnv} />
    </>
  );
}

export default Config;
