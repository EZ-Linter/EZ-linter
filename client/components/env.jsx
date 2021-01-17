import React from 'react';
import { Link } from 'react-router-dom';

function Env(props) {
  // destructuring properties passed down from props
  const { envName, envValue, updateEnv } = props;

  // determining the background-color of rule based on envValue
  let color = 'white';
  if (envValue) color = 'green';
  if (!envValue) color = 'red';

  return (
    <div
      className="env"
      onClick = {() => updateEnv(envName)}
      style={{ color }}
    >
      <h3>{`${envName}, ${envValue}`}</h3>
    </div>
  );
}

export default Env;
