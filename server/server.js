const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const oauthController = require('./controllers/oauthController');

if(process.env.NODE_ENV === 'production'){
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`it's going down at: ${PORT}`);
});

app.get('/api/user/signin/callback',
  oauthController.githubAuth,
  oauthController.getGithubUserInfo,  
  (req, res) => {
    res.status(200).send('<h1>It works???</h1>');
  }
)

module.exports = app;
