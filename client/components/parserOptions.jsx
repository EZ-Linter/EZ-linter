import React from 'react';
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

  return (
    <div id="parserOptions">
      <Version version={ecmaVersion} updateVersion={updateDropDown} />
      <SourceType sourceType={sourceType} updateSourceType={updateDropDown} />
      <Features ecmaFeatures={ecmaFeatures} updateFeature={updateFeature} />
    </div>
  );
}

export default parserOptions;
