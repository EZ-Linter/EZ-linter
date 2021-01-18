import React from 'react';

function Feature(props) {
  // destructuring properties passed down from props
  const { featureName, featureValue, updateFeature } = props;

  // determining the background-color of rule based on envValue
  let color;
  if (featureValue) color = 'green';
  if (!featureValue) color = 'red';

  return (
    <div
      className="feature"
      onClick = {() => updateFeature(featureName, 'features')}
      style={{ color }}
    >
      <h3>{`${featureName}, ${featureValue}`}</h3>
    </div>
  );
}

export default Feature;
