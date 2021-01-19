import React, { useState } from 'react';

function Instructions() {
  // use hook to set visibility state
  const [visibility, setVisibility] = useState(false);

  // function to change visibility status on click
  const changeVis = () => {
    setVisibility(!visibility);
  };

  return (
    <div className="Container">
      <div className="Title">
        <h2 className="Collapse" onClick={changeVis}>
          {/* render icon based on visibility */}
          { visibility ? '▼' : '▲' }
        </h2>
        <h2>&nbsp;Instructions</h2>
      </div>
      {/* render section based on visibility */}
      {visibility ? (
        <div id="Instructions">
          <p>Prerequisites:&nbsp;
            <a 
              href="https://nodejs.org/en/"
              target="_blank"
            >
              Node.js
            </a>
            &nbsp;(<code>^10.12.0</code>, or <code>>=12.0.0</code>) built with SSL support. (If you are using an official Node.js distribution, SSL is always built in.)
          </p>
          <p>To use ESLint, simply:</p>
          <ol>
            <li>Install it globally or locally using npm or yarn:</li>
            <pre>
              <code>
                npm install eslint --save-dev // local install <br />

                # or <br />

                yarn add eslint --dev // local install <br />
              </code>
            </pre>
            <li>Set your desired configurations and export the '.eslintrc.json' file</li>
            <li>Save the exported file in your project's root directory</li>
            <li>Run ESLint on any file or directory like this:</li>
            <pre>
              <code>
                npx eslint yourfile.js <br />

                # or <br />

                yarn run eslint yourfile.js <br />
              </code>
            </pre>
            <p><strong>*If you're using the ESLint extension in your text editor, you can skip step #4 and ensure that the extension is installed and enabled</strong></p>
          </ol>
        </div>
      ) : null}
    </div>
  );
}

export default Instructions;
