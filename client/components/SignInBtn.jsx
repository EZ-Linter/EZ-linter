import React from 'react';

const SignInBtn = () => {
  const startLoginFlow = () => {
    window.location.href = '/api/user/signin';
  };
  return (
    <div>
      <button id="signin-btn" onClick={startLoginFlow}>
        Sign In
      </button>
    </div>
  );
};

export default SignInBtn;
