const fetch = require('node-fetch');

const { client_id, client_secret } = require('../settings.js');

const oauthController = {};

oauthController.githubAuth = (req, res, next) => {
  try {
    const { code } = req.query;
    console.log('code in oauthController.githubAuth:', code);
    console.log('client_id', client_id);
    console.log('client_secret:', client_secret);

    fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: client_id,
        client_secret: client_secret,
        code: code,
      })
    })
      .then((response) => response.json())
      .then((response) => {
        const accessToken = response.access_token;
        // console.log('accessToken:', accessToken);
        
        res.locals.accessToken = accessToken;
        return next();
      })
  } catch(err) {
    return next({
      log: 'Error in oauthController.githubAuth',
      // status: 400,
      message: { err: 'An error occurred while trying to get permissions from Github' },
    })
  }
};

oauthController.getGithubUserInfo = (req, res, next) => {
  try {
    const accessToken = res.locals.accessToken;
    console.log('accessToken in getGithubUserInfo:', accessToken);

    fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${accessToken}`
      }
    })
      .then((response) => response.json())
      .then((response) => {
        const { id } = response;
        console.log('id in oauthController.getGithubUserInfo:', id);

        res.locals.userID = id;
        next();
      })
  } catch(err) {
    return next({
      log: 'Error in oauthController.getGithubUserInfo',
      // status: 400,
      message: { err: 'An error occurred while trying to get user info from Github' },
    })
  }
}

module.exports = oauthController;
