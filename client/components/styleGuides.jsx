import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StyleGuide from './styleGuide.jsx';
import airbnb from './airbnb.js';

function StyleGuides(props){
  // destructure props
  const {
    loadPresets
  } = props;
  const guideArray = [<StyleGuide guide={airbnb} loadPresets={loadPresets}/>]

  return (
    <div id="row">
      <h3>Apply Style Guide</h3>
      <h3>{ '<' }</h3>
      {guideArray}
    </div>
  );
}

export default StyleGuides;


