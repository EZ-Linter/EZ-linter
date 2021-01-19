import React, { useState } from 'react';
import Version from './ECMA_Version.jsx';
import SourceType from './sourceType.jsx';
import Features from './ECMA_Features.jsx';

function parserOptions(props) {
  // destructuring properties passed down from props
  const {
    parserOptions: { ecmaVersion, sourceType, ecmaFeatures },
    updateDropDown,
    updateFeature,
  } = props;

  // use hook to set visibility state
  const [visibility, setVisibility] = useState(false);

  // function to change visibility status on click
  const changeVis = () => {
    setVisibility(!visibility);
  };

  return (
    <div id="parserOptions" className="Container">
      <div className="Title" onClick={changeVis}>
        <h2 className="Collapse" >
          {/* render icon based on visibility */}
          { visibility ? '▼' : '▶' }
        </h2>
        <h2>&nbsp;Set Parser Options</h2>
      </div>
      {/* render section based on visibility */}
      { visibility ? (
        <div>
          <Version version={ecmaVersion} updateVersion={updateDropDown} />
          <br/>
          <SourceType sourceType={sourceType} updateSourceType={updateDropDown} />
          <br />
          <Features ecmaFeatures={ecmaFeatures} updateFeature={updateFeature} />
        </div>
      ) : null}
    </div>
  );
}

export default parserOptions;
