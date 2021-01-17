import React from 'react';
import Select from 'react-select';

function SourceType(props) {
  // destructuring properties passed down from props
  const { sourceType, updateSourceType } = props;

  // defining all options in drop-down menu
  const options = [
    { value: 'module', label: 'module', type: 'sourceType' },
    { value: 'script', label: 'script', type: 'sourceType' },
  ];

  return (
    <div className="option">
      <h2 style={{ color: 'white' }}>Source Type</h2>
      <div className="dropDown" style={{ minWidth: '200px' }}>
        <Select
          onChange={updateSourceType}
          options={options}
        />
      </div>
    </div>
  );
}

export default SourceType;
