import React from 'react';
import { Link } from 'react-router-dom';

function Env(props) {
  // destructuring properties passed down from props
  const { envName, envValue, updateEnv } = props;
  // determining the background-color of rule based on envValue
  let backgroundColor;
  let opacity = "30%";
  if (!envValue){
    opacity = "30%";
    backgroundColor = 'rgb(0,0,0,0.4)';
  }
  if (envValue) {
    opacity = "100%";
    backgroundColor = 'green';
  }

  return (
    <div
      className="Item"
      onClick = {() => updateEnv(envName)}
      style={{ opacity, backgroundColor }}
    >
      <h3 id="Text">{`${envName}`}</h3>
    </div>
  );
}

export default Env;
