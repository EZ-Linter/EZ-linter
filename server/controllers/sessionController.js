const jwt = require('jsonwebtoken');
const { jwtSecretKey: secretKey } = require('../settings.js');

const sessionController = {};

/**
 * Create a bearer token containing the user's Github ID
 */
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

/**
 * Verifies that the client has a valid session and if so, stores the user's
 * Github ID to use in the next middleware
 */
sessionController.verifySession = (req, res, next) => {
  try {
    // if res.locals.ogToken is undefined, that means the cookie session either
    // doesn't exist or it expired. 
    if (res.locals.ogToken === undefined) {
      return next()
    }

    // if jwt.verify() results in an error, code will jump to the catch block
    const authData = jwt.verify(res.locals.ogToken, secretKey);
    const { githubId: userId } = authData;

    res.locals.userId = userId;
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
