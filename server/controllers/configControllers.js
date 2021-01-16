const { Eslintrc } = require('../models/configModels.js');

const configControllers = {};

/**
 * Gets eslintrc from database by id.
 *
 * Expects id to be in req.params.id and sets res.locals.config to config IF found
 */
configControllers.getConfig = (req, res, next) => {
  if (!req.params.id)
    return next({ log: "configControllers.getConfig: Didn't receive id in req params" });

  Eslintrc.findById(req.params.id, null, { lean: true })
    .then(({ eslintrc }) => {
      // only initilizes configStr property if document is found
      if (eslintrc) res.locals.config = JSON.parse(eslintrc);
      next();
    })
    .catch((err) =>
      next({
        log: 'configControllers.getConfig: failed to query mongo db\n' + err.toString(),
      })
    );
};

/**
 * Attempts to save eslintrc config to database. Returns new id or id of matching config on res.locals.configId
 *
 * Expects eslintrc to be found in req.body.eslintrc
 */
configControllers.saveConfig = (req, res, next) => {
  if (!req.body.eslintrc)
    return next({
      log: 'configControllers.saveConfig: no req.body.eslintrc',
    });

  Eslintrc.findOneAndUpdate(
    { eslintrc: JSON.stringify(req.body.eslintrc) },
    {},
    {
      new: true,
      upsert: true,
      lean: true,
    }
  )
    .then((doc) => {
      res.locals.configId = doc._id;
      next();
    })
    .catch((err) => {
      next({
        log: 'configControllers.saveConfig: failed to save to mongo db\n',
      });
    });
};

module.exports = configControllers;
