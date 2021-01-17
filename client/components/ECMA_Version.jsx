import React from 'react';
import Select from 'react-select';

function Version(props) {
  // destructuring properties passed down from props
  const { version, updateVersion } = props;

  // defining all options in drop-down menu
  const options = [
    { value: 3, label: 3 },
    { value: 5, label: 5 },
    { value: 2015, label: 2015 },
    { value: 2016, label: 2016 },
    { value: 2017, label: 2017 },
    { value: 2018, label: 2018 },
    { value: 2019, label: 2019 },
    { value: 2020, label: 2020 },
    { value: 2021, label: 2021 },
  ];

  return (
    <Select
      value={version}
      onChange={updateVersion}
      options={options}
      style={{ width: '200px' }}
    />
  );
}

export default Version;
