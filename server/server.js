const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const configControllers = require('./controllers/configControllers');
const userControllers = require('./controllers/userControllers');
const oauthController = require('./controllers/oauthController');
const sessionController = require('./controllers/sessionController');
const secretCookieController = require('./controllers/secretCookieController');
// const { Redirect } = require('react-router-dom');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}

// retrieve configs saved by user
app.get(
  '/api/user/savedconfigs',
  secretCookieController.decryptCookie,
  sessionController.verifySession,
  // userControllers.ensureSignedIn,
  userControllers.getConfigs,
  (req, res) => {
    return res.json({ configs: res.locals.userConfigs });
  }
);

// remove config from user saved configs
app.delete(
  '/api/user/config',
  secretCookieController.decryptCookie,
  sessionController.verifySession,
  userControllers.ensureSignedIn,
  userControllers.removeConfig,
  (req, res) => {
    return res.sendStatus(200);
  }
);

// save configuration to database
app.post(
  '/api/user/config',
  secretCookieController.decryptCookie,
  sessionController.verifySession,
  userControllers.ensureSignedIn,
  configControllers.saveConfig,
  userControllers.addConfig,
  (req, res) => {
    return res.json({ configId: res.locals.configId });
  }
);

// retrieve specific configuration from database
app.get('/api/config/:id', configControllers.getConfig, (req, res) => {
  if (!res.locals.config) return res.sendStatus(404);

  return res.json({ eslintrc: res.locals.config });
});

// oAuth callback route
// to test, turn on server (in terminal type "node server/server.js") and go to
// https://github.com/login/oauth/authorize?client_id=<Your Github OAuth Client ID here>
app.get(
  '/api/user/signin/callback',
  oauthController.githubAuth,
  oauthController.getGithubUserInfo,
  sessionController.createSession,
  secretCookieController.setEncryptedCookie,
  (req, res) => {
    return res.redirect('http://localhost:8080');
  }
);

// used only for testing purposes. To test, first go through the oAuth callback route
// after that, go to http://localhost:3000/api/user/testdecryptcookie
/*
app.get('/api/user/testdecryptcookie',
  secretCookieController.decryptCookie,
  sessionController.verifySession,
  (req, res) => {
    return res.status(200).send('<h1>Decrypted Cookie and Verified Session</h1>');
  }
);
*/

// used only for testing purposes. To test, first go through the oAuth callback route
// after that, go to Postman and make a POST request to http://localhost:3000/api/user/testjwt
// in the 'Headers' input a Key called "Authorization" and set the value to
// 'Bearer <Your bToken here>'
/*
app.post('/api/user/testjwt',
  sessionController.verifySession,
  (req, res) => {
    return res.status(200).send('<h1>Verified Session</h1>');
  }
)
*/

app.use('/api/user/signin', oauthController.loginToGithub, (req, res) => {
  return res.redirect(res.locals.redirectURL);
});

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
