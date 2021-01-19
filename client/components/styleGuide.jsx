import React, { useState } from 'react';

function StyleGuide(props){
  // destructure props
  const { styleGuideStatus, guide, loadPresets } = props;

  let opacity = "30%";
  let backgroundColor = "rgb(0,0,0,0.4)";
  if (styleGuideStatus) {
    opacity = "100%";
    backgroundColor = "green";
  } 

  return (
    <div className="Item StyleGuide"
      onClick={() => loadPresets(guide, !styleGuideStatus)}
      style={{backgroundColor, opacity}}>
         <h3 className="Text longBtn">AirBnb</h3>
    </div>
  );
}

export default StyleGuide;