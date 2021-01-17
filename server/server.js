const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const configControllers = require('./controllers/configControllers');
const oauthController = require('./controllers/oauthController');
const sessionController = require('./controllers/sessionController');

const PORT = 3000;

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}

// retrieve configuration from database
app.get('/api/config/:id', configControllers.getConfig, (req, res) => {
  if (!res.locals.config) return res.sendStatus(404)

  res.json({eslintrc: res.locals.config})
});

// save configuration to database
app.post('/api/config', configControllers.saveConfig, (req, res) => {
  console.log(res.locals.configId)
  res.json({configId: res.locals.configId})
});

// oAuth callback route
app.get('/api/user/signin/callback',
  oauthController.githubAuth,
  oauthController.getGithubUserInfo,
  sessionController.createSession,
  (req, res) => {
    res.status(200).send('<h1>It works???</h1>');
  }
)

app.use('/api/user/signin', (req, res) => {});

// get user saved configs
app.get('/api/user/:id', (req, res) => {});

app.listen(PORT, () => {
  console.log(`it's going down at: ${PORT}`);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.error(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;
