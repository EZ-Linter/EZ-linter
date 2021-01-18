const jwt = require('jsonwebtoken');
const { jwtSecretKey: secretKey } = require('../settings.js');

const sessionController = {};

sessionController.createSession = (req, res, next) => {
  try {
    // using a secret key, create a token for a session
    const token = jwt.sign({ githubId: res.locals.userId }, secretKey);

    // store the token locally then pass it along to the secretCookieController
    // to encrypt the token and create a cookie
    res.locals.bToken = token;
    return next();
  } catch(err) {
    return next({
      log: 'Error in sessionController.createSession',
      // status: 400,
      message: { err: 'Unable to create a session' },
    });
  }
}

sessionController.verifySession = (req, res, next) => {
  try {
    const authData = jwt.verify(res.locals.ogToken, secretKey);
    
    res.locals.authData = authData;
    return next();
  } catch(err) {
    return next({
      log: 'Error in sessionController.verifySession',
      // status: 400,
      message: { err: 'Unable to verify session' },
    });
  }
}

module.exports = sessionController;
