const jwt = require('jsonwebtoken');
const { jwtSecretKey: secretKey } = require('../settings.js');

const sessionController = {};

sessionController.createSession = (req, res, next) => {
  jwt.sign({ githubId: res.locals.userId }, secretKey, (err, token) => {
    if (err) {
      return next({
        log: 'Error in sessionController.createSession with jwt.sign',
        // status: 400,
        message: { err: 'Unable to create a session' },
      });
    }

    // console.log('token in createSession:', token);
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnaXRodWJJZCI6Njg1MjE3MDUsImlhdCI6MTYxMDg5NjU3OX0.zXKX6v-XyZCImFIiZbzdcaaTSUvlWr8WH0hQuHm7aCE

    // res.cookie('session', token, {httpOnly: true, secure: true, expiry: 10min})
    res.locals.bToken = token;
    return next();
  });u
}

sessionController.verifySession = (req, res, next) => {
  // const bearerToken = req.cookies.session

//   if (!bearerToken) return res.redirect('/sigin')
// // ....
//   if (!authorized) return res.redirect('/signing')
// // ....
// res.locals.userId = token.githubId

  const bearerHeader = req.headers['authorization'];
  // console.log('bearerHeader:', bearerHeader);
  
  if (bearerHeader === undefined) {
    return next({
      log: 'Error in sessionController.verifySession: bearerHeader is undefined',
      status: 403,
      message: { err: 'Unable to verify session' },
    });
  }
  
  'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnaXRodWJJZCI6Njg1MjE3MDUsImlhdCI6MTYxMDg5NjU3OX0.zXKX6v-XyZCImFIiZbzdcaaTSUvlWr8WH0hQuHm7aCE'
  const bearerToken = bearerHeader.split(' ')[1];
  // const bearerToken = bearerT[0];
  // console.log('bearerToken:', bearerToken);

  jwt.verify(bearerToken, secretKey, (err, authData) => {
    if (err) {
      return next({
        log: 'Error in sessionController.verifySession: jwt cannot verify',
        status: 403,
        message: { err: 'Unable to verify session' },
      });
    }

    res.json({
      message: 'JWT verified data',
      authData
    });
  });
}

module.exports = sessionController;
