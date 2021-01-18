import React from 'react';
import Feature from './feature.jsx';

function Features(props) {
  // destructuring properties passed down from props
  const { ecmaFeatures, updateFeature } = props;

  // for each feature/value pair, create an env component
  const featuresArray = [];
  const featurePairs = Object.entries(ecmaFeatures);
  for (let i = 0; i < featurePairs.length; i += 1) {
    featuresArray.push(
      <Feature
        key={`Feature-${i}`}
        updateFeature={updateFeature}
        featureName={featurePairs[i][0]}
        featureValue={featurePairs[i][1]}
      />
    );
  }

  return (
    <div className="Container">
      <h2>ECMA Features</h2>
      <div className="Grid">
        {featuresArray}
      </div>
    </div>
  );
}

export default Features;
