const { User, Eslintrc } = require('../models/models.js');

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
    .catch((err) =>
      next({ log: 'userControllers.getUserConfigs: Failed to find user document' + err })
    );
};

/**
 * Adds configuration Id to user saved Configs
 *
 * Must have configId on res.locals.configId and userId on res.locals.userId
 */
userControllers.addConfig = async (_, res, next) => {
  if (!res.locals.userId)
    return next({ log: 'userControllers.getUserConfigs did not receive an userId' });
  if (!res.locals.configId)
    return next({ log: 'userControllers.addConfig did not receive an userId' });

  try {
    const originalUser = await User.findOneAndUpdate(
      { userId: res.locals.userId },
      { $addToSet: { configs: res.locals.configId } },
      { upsert: true, lean: true }
    );
    // if user already had ref to config doc, skip incrementing doc userLinks count
    if (
      originalUser &&
      originalUser.configs.map((idObj) => idObj.toString()).includes(res.locals.configId.toString())
    )
      return next();

    await Eslintrc.findByIdAndUpdate(
      res.locals.configId,
      { $inc: { userLinks: 1 } },
      { new: true }
    );
    next();
  } catch (err) {
    next({ log: 'userControllers.addConfig failed to update document' + err });
  }
};

/**
 * Removes configuration Id from user saved Configs
 *
 * Must have configId on req.body.configId and userId on res.locals.userId
 */
userControllers.removeConfig = async (req, res, next) => {
  if (!res.locals.userId)
    return next({ log: 'userControllers.getUserConfigs did not receive an userId' });
  if (!req.body.configId)
    return next({ log: 'userControllers.addConfig did not receive an userId' });

  try {
    const originalUser = await User.findOneAndUpdate(
      { userId: res.locals.userId },
      { $pull: { configs: req.body.configId } },
      { lean: true }
    );

    // if user didn't have ref to config doc, skip decrementing doc userLinks count
    if (
      !originalUser ||
      !originalUser.configs.map((idObj) => idObj.toString()).includes(req.body.configId.toString())
    )
      return next();

    const updatedConfig = await Eslintrc.findByIdAndUpdate(
      req.body.configId,
      { $inc: { userLinks: -1 } },
      { lean: true, new: true }
    );

    // if there are any users that still use this config, skip to next
    if (updatedConfig.userLinks > 0) next();
    Eslintrc.findByIdAndDelete(updatedConfig._id);
    next();
  } catch (err) {
    next({ log: 'userControllers.removeConfig failed to update document' + err });
  }
};

module.exports = userControllers;
