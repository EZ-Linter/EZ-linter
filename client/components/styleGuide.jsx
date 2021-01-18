import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function StyleGuide(props){
  // destructure props
  const {
    guide,
    loadPresets
  } = props;

  const [visibility, setVisibility] = useState(false);
  const changeVis = () => {
    setVisibility(!visibility);
    loadPresets(guide);
  };

  let opacity = "30%";
  let backgroundColor = "rgb(0,0,0,0.4)";
  if (visibility) {
    opacity = "100%";
    backgroundColor = "green";
  } 

  return (
    <div className="Item"
      onClick={changeVis}
      style={{backgroundColor, opacity}}>
         <h3 className="Text">AirBnb</h3>
    </div>
  );
}

export default StyleGuide;