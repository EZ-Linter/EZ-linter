import React from 'react';

const ImportBtn = ({ importHandler }) => {
  return (
    <div>
      <input id="import-btn" type="file" onChange={importHandler} />
    </div>
  );
}

export default ImportBtn;
