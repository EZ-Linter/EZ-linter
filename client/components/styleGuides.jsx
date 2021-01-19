import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StyleGuide from './styleGuide.jsx';
import airbnb from './airbnb.js';

function StyleGuides(props){
  // destructure props
  const { styleGuideStatus, loadPresets } = props;
  const guideArray = [<StyleGuide styleGuideStatus={styleGuideStatus} guide={airbnb} loadPresets={loadPresets}/>]

  return (
    <div id="row">
      <h3>Apply Style Guide:</h3>
      <br />
      {guideArray}
      <br />
      <hr />
    </div>
  );
}

export default StyleGuides;


