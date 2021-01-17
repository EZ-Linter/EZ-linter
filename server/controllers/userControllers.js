const { User } = require('../models/models.js');

const userControllers = {};

/**
 * Gets list of configs saved by user or empty array and stores in res.locals.userConfigs
 *
 * Must have userId on res.locals.userId
 */
userControllers.getConfigs = (_, res, next) => {
  if (!res.locals.userId)
    return next({ log: 'userControllers.getUserConfigs did not receive an userId' });

  User.findOne({ userId: res.locals.userId }, null, { lean: true })
    .then((user) => {
      res.locals.userConfigs = user.configs || [];
      next();
    })
    .catch((err) => next({ log: 'userControllers.getUserConfigs: Failed to find user document' + err }));
};

/**
 * Adds configuration Id to user saved Configs
 *
 * Must have configId on res.locals.configId and userId on res.locals.userId
 */
userControllers.addConfig = (_, res, next) => {
  if (!res.locals.userId)
    return next({ log: 'userControllers.getUserConfigs did not receive an userId' });
  if (!res.locals.configId)
    return next({ log: 'userControllers.addConfig did not receive an userId' });

  User.findOneAndUpdate(
    { userId: res.locals.userId },
    { $addToSet: { configs: res.locals.configId } },
    { upsert: true, lean: true }
  )
    .then((_) => next())
    .catch((err) => next({ log: 'userControllers.addConfig failed to update document' + err }));
};

/**
 * Removes configuration Id from user saved Configs
 *
 * Must have configId on req.body.configId and userId on res.locals.userId
 */
userControllers.removeConfig = (req, res, next) => {
  if (!res.locals.userId)
    return next({ log: 'userControllers.getUserConfigs did not receive an userId' });
  if (!req.body.configId)
    return next({ log: 'userControllers.addConfig did not receive an userId' });

  User.findOneAndUpdate(
    { userId: res.locals.userId },
    { $pull: { configs: req.body.configId } },
    { lean: true }
  )
    .then((_) => next())
    .catch((err) => next({ log: 'userControllers.removeConfig failed to update document' + err }));
};

module.exports = userControllers;
