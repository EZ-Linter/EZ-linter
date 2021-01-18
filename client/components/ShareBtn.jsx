import React from 'react';

export default function ShareBtn({ config }) {
  const clickHandler = () => {
    fetch('/api/config/share', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({eslintrc:config}),
    })
      .then((res) => res.json())
      .then(({ endpoint }) => {
        const shareUrl = `${window.location}${endpoint}`
        window.alert(shareUrl)
      });
  };

  return (
    <div>
      <button className="ui-btn" onClick={clickHandler}>
        Share
      </button>
    </div>
  );
}
