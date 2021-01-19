import React from 'react';

const ImportBtn = ({ importHandler }) => {
  return (
    <div>
      <input id="import-input" type="file" onChange={importHandler} />
      <input id="import-btn" className="ui-btn" type="button" value="Import .eslintrc.json" 
        onClick={() => document.getElementById('import-input').click()}
      />
    </div>
  );
}

export default ImportBtn;
