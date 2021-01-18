import React from 'react';

export default function ShareBtn({ config }) {
  const clickHandler = () => {
    fetch('/api/config/share', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ eslintrc: config }),
    })
      .then((res) => res.json())
      .then(({ endpoint }) => {
        const shareUrl = `${window.location}${endpoint}`;

        navigator.clipboard
          .writeText(shareUrl)
          .then(() => {
            window.alert(`Send the following link to anyone you wish to share this configuration with:\n
${shareUrl}\n
Shared configuration links expire after 7 days.
The configuration has already been added to your clipboard`);
          })
          .catch(() => console.log('failed to write to clipboard'));
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
