const CJS = require('crypto-js');
const { cjsSecretKey: secretKey, sessionLifespan } = require('../settings.js');

const secretCookieController = {};

/**
 * Takes a bearer token and encrypts it, then makes a cookie in the browser and
 * sets the encrypted token to the value
 */
secretCookieController.setEncryptedCookie = (req, res, next) => {
  try {
    // encrypts the token
    const cipher = CJS.AES.encrypt(res.locals.bToken, secretKey).toString();

    // set cookie to encrypted token
    if (sessionLifespan === null) {
      // set cookie to last until browser closes
      res.cookie('session', cipher, { httpOnly: true });
    } else if (typeof(sessionLifespan) === 'number') {
      // set cookie to last until specified amount of minutes
      const curDate = new Date();
      const expireDate = new Date(curDate.getTime() + (sessionLifespan * 60000));

      res.cookie('session', cipher, { httpOnly: true, expires: expireDate });
    } else {
      return next({
        log: 'Error in secretCookieController.setEncryptedCookie: sessionLifespan is not null nor a number',
        // status: 400,
        message: { err: 'Unable to set a cookie' },
      });
    }

    return next();
  } catch(err) {
    return next({
      log: 'Error in secretCookieController.setEncryptedCookie',
      // status: 400,
      message: { err: 'Unable to set a cookie' },
    });
  }
}

/**
 * If a cookie called 'session' exists, decrypt the value and store it
 */
secretCookieController.decryptCookie = (req, res, next) => {
  // get the value of the cookie called 'session' from the client
  const cookieSession = req.cookies.session;

  // if req.cookies.session existed, then decrypt it and put it on res.locals
  if (cookieSession !== undefined) {
    // decrypt the value into the original bearer token
    const bytes = CJS.AES.decrypt(cookieSession, secretKey);
    const originalToken = bytes.toString(CJS.enc.Utf8);

    res.locals.ogToken = originalToken;
  }  

  return next();
}

module.exports = secretCookieController;
