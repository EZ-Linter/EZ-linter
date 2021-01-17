import React from 'react';
import { Link } from 'react-router-dom';
import Env from './env.jsx';

function Envs(props) {
  // destructuring properties passed down from props
  const { envs, updateEnv } = props;
  // for each env/value pair, create an env component
  // add <ApplyAll/> as first element
  const envsArray = [];
  const envPairs = Object.entries(envs);
  // const expanded = true;
  for (let i = 0; i < envPairs.length; i += 1) {
    envsArray.push(
      <Env
        key={`Env-${i}`}
        updateEnv={updateEnv}
        envName={envPairs[i][0]}
        envValue={envPairs[i][1]}
      />
    );
  }
  // if(expanded){
  //   const visibility = true;
  // }

  return (
    <div className="Container">
      <div className="Title">
        <h2>{'>'}</h2>
        <h2>Environments</h2>
      </div>
      <div className="Grid">
        {envsArray}
      </div>
    </div>
  );
}

export default Envs;
