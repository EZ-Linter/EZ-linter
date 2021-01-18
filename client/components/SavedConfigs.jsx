import React from 'react';

const SavedConfig = ({ name: configName, configId , loader, remover}) => {
  const loadConfig = (evt) => {
    loader(configId)
  }
  const deleteConfig = (evt) => {
    // prevent click from bubbling up to div
    evt.stopPropagation();

    fetch('/api/user/config', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({configId})
    }).then(res => {
      if (res.status === 200) {
        remover(configName)
      }
    })
  }

  return (
    <div className="saved-config">
      <div className="ui-btn saved-config-btn" onClick={loadConfig}>
        {configName}
        <button className="saved-config-del-btn" onClick={deleteConfig}>x</button>
      </div>
    </div>
  );
};

export default function ({ configs, loader,remover }) {
  return (
    <div className="saved-configs">
      {configs.map((configObj, index) => (
        <SavedConfig key={`savedConfig #${index}`} {...configObj} loader={loader} remover={remover}/>
      ))}
    </div>
  );
}
