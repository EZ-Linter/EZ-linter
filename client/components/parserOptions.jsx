import React from 'react';
import Version from './ECMA_Version.jsx';
import SourceType from './sourceType.jsx';
import Features from './ECMA_Features.jsx';

function parserOptions(props) {
  const {
    parserOptions: { ecmaVersion, sourceType, ecmaFeatures },
    updateDropDown,
    updateBoos,
  } = props;

  console.log('version: ', ecmaVersion);
  console.log('type: ', sourceType);
  console.log('features ', ecmaFeatures);

  return (
    <div id="parserOptions">
      <Version version={ecmaVersion} updateVersion={updateDropDown} />
    </div>
  );
}

export default parserOptions;
