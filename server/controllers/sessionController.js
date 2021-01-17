const jwt = require('jsonwebtoken');

const sessionController = {};

sessionController.createSession = (req, res, next) => {
  jwt.sign({ githubId: res.locals.userId }, 'team-axolotl', (err, token) => {
    
  })
}

sessionController.verifySession = (req, res, next) => {

}

module.exports = sessionController;
