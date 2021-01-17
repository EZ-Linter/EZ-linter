const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const configControllers = require('./controllers/configControllers');
const userControllers = require('./controllers/userControllers');
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

// const mockAuthentication = (req, res, next) => {
//   res.locals.userId = '1992';
//   next();
// };

// retrieve configs saved by user
app.get(
  '/api/user/savedconfigs',
  // mockAuthentication,
  userControllers.getConfigs,
  (req, res) => {
    res.json({ configs: res.locals.userConfigs });
  }
);

// remove config from user saved configs
app.delete(
  '/api/user/config',
  // mockAuthentication,
  userControllers.removeConfig,
  (req, res) => {
    res.sendStatus(200);
  }
);

// save configuration to database
app.post(
  '/api/user/config',
  // mockAuthentication,
  configControllers.saveConfig,
  userControllers.addConfig,
  (req, res) => {
    res.json({ configId: res.locals.configId });
  }
);

// retrieve specific configuration from database
app.get('/api/config/:id', configControllers.getConfig, (req, res) => {
  if (!res.locals.config) return res.sendStatus(404);

  res.json({ eslintrc: res.locals.config });
});

// oAuth callback route
// to test, turn on server (in terminal type "node server/server.js") and go to
// https://github.com/login/oauth/authorize?client_id=<Your Github OAuth Client ID here>
app.get('/api/user/signin/callback',
  oauthController.githubAuth,
  oauthController.getGithubUserInfo,
  sessionController.createSession,
  (req, res) => {
    res.status(200).send('<h1>It works???</h1>');
  }
);

app.use('/api/user/signin', (req, res) => {});

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
