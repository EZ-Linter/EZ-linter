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
  const [visibility, setVisibility] = useState(true);

  // function to change visibility status on click
  const changeVis = () => {
    setVisibility(!visibility);
  };

  return (
    <div id="parserOptions" className="container">
      <div className="Title">
        <h2 onClick={changeVis}>
          {/* render icon based on visibility */}
          { visibility ? 'v' : '>' }
        </h2>
        <h2>Parser Options</h2>
      </div>
      {/* render section based on visibility */}
      { visibility ? 
        (
          <>
            <Version version={ecmaVersion} updateVersion={updateDropDown} />
            <SourceType sourceType={sourceType} updateSourceType={updateDropDown} />
            <Features ecmaFeatures={ecmaFeatures} updateFeature={updateFeature} />
          </>
        ) : null
      }
    </div>
  );
}

export default parserOptions;
