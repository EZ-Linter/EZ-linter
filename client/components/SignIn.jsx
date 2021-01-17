import React from 'react';

export default function SignIn() {
  // Icons URLs
  const gitHubIconUrl = 'https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png';

  // function to send request to server to sign in via oAuth
  const oAuthSignIn = () => {
    window.location.href = '/api/user/signin';
  };

  return (
    <div id="sign-in-container">
      <div id="sign-in">
        <p>Sign In With...</p>
        <br />
        <div className="oAuth" onClick={oAuthSignIn}>
          <span>
            <img src={gitHubIconUrl} alt="GitHub Icon" />
          </span>
          <span className="oAuthName">GitHub</span>
        </div>
      </div>
    </div>
  );
}
