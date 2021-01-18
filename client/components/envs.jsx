import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Env from './env.jsx';

function Envs(props) {
  // destructuring properties passed down from props
  const { envs, allEnvs, updateEnv, updateAllEnvironments } = props;

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

  // use hook to set visibility state
  const [visibility, setVisibility] = useState(true);

  // function to change visibility status on click
  const changeVis = () => {
    setVisibility(!visibility);
  };

  return (
    <div className="Container">
      <div className="Title">
        <h2 onClick={changeVis}>
          {/* render icon based on visibility */}
          { visibility ? 'v' : '>' }
        </h2>
        <h2>Environments</h2>
      </div>
      {/* render section based on visibility */}
      { visibility ? (
        <>
          <div className="applyAll">
            <Env
              key="Env-Apply-All"
              updateEnv={updateAllEnvironments}
              envName="Apply All"
              envValue={allEnvs}
            />
          </div>
          <div className="Grid">
            {envsArray}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Envs;
