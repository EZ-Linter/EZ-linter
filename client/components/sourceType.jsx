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

  // defining default value of drop down menu
  const defaultValue = { value: sourceType, label: sourceType };

  return (
    <div className="option">
      <h2 style={{ color: 'white' }}>Source Type</h2>
      <div className="dropDown" style={{ minWidth: '200px' }}>
        <Select
          defaultValue={defaultValue}
          onChange={updateSourceType}
          options={options}
        />
      </div>
    </div>
  );
}

export default SourceType;
