import React from 'react';
import Select from 'react-select';

function Version(props) {
  // destructuring properties passed down from props
  const { version, updateVersion } = props;

  // defining all options in drop-down menu
  const options = [
    { value: 3, label: 3, type: 'version' },
    { value: 5, label: 5, type: 'version' },
    { value: 2015, label: 2015, type: 'version' },
    { value: 2016, label: 2016, type: 'version' },
    { value: 2017, label: 2017, type: 'version' },
    { value: 2018, label: 2018, type: 'version' },
    { value: 2019, label: 2019, type: 'version' },
    { value: 2020, label: 2020, type: 'version' },
    { value: 2021, label: 2021, type: 'version' },
  ];

  return (
    <div className="option">
      <h2 style={{ color: 'white' }}>ECMA Version</h2>
      <div className="dropDown" style={{ minWidth: '200px' }}>
        <Select
          onChange={updateVersion}
          options={options}
        />
      </div>
    </div>
  );
}

export default Version;
