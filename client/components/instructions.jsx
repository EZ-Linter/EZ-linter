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
          { visibility ? '☟' : '☞' }
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
          <p>To use ESLint, you can first install it using npm or yarn:</p>
          <pre>
            <code>
              npm install eslint --save-dev <br />

              # or <br />

              yarn add eslint --dev
            </code>
          </pre>
        </div>
      ) : null}
    </div>
  );
}

export default Instructions;
