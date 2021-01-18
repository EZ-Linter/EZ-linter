import React from 'react';

const SignInBtn = ({ config, addSavedConfig, savedConfigs }) => {
  const saveCurrentConfig = () => {
    // TODO: something better. Anything, really.
    const configName = window.prompt('Name for configuration template:', '');

    if (savedConfigs.every((cObj) => cObj.name !== configName)) {
      fetch('/api/user/config', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eslintrc: config, configName }),
      })
        .then((res) => {
          // TODO: need specific error messages depending on status code. And a palatable ui.
          if (!res.ok) throw new Error('Ops, there was a problem. Please try login in again.');
          else return res.json();
        })
        .then((data) => addSavedConfig({ name: configName, configId: data.configId }))
        .catch((err) => {
          // TODO: display only errors meant for user, instead of all
          if (err.message) return window.alert(err.message);
          console.log(err);
        });
      } else { // if name is already taken
        window.alert('Name is already used.')
      }
  };

  return (
    <div>
      <button className="ui-btn" onClick={saveCurrentConfig}>
        Save Configuration
      </button>
    </div>
  );
};

export default SignInBtn;
