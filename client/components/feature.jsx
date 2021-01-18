import React from 'react';

function Feature(props) {
  // destructuring properties passed down from props
  const { featureName, featureValue, updateFeature } = props;

  // determining the background-color of rule based on envValue
  let backgroundColor;
  let opacity;
  if (!featureValue) {
    opacity = "30%"
    backgroundColor = 'rgb(0,0,0,0.4)';
  }
  if (featureValue){
    opacity = "100%"
    backgroundColor = 'green';
  } 

  return (
    <div
      className="Item"
      onClick = {() => updateFeature(featureName, 'features')}
      style={{ backgroundColor, opacity }}
    >
      <h3 className="Text">{`${featureName}`}</h3>
    </div>
  );
}

export default Feature;
