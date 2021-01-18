const { Eslintrc, Shareable } = require('../models/models.js');

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
      log: 'configControllers.saveConfig: no config data in res.locals',
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
        log: 'configControllers.saveConfig: failed to save to mongo db\n' + err,
      });
    });
};

/**
 * Saves config to shareables database  and sets res.locals.shareId to new document id
 */
configControllers.shareConfig = (req, res, next) => {
  if (!req.body.eslintrc)
    return next({
      log: 'configControllers.shareConfig: no config data in res.locals',
    });

  const newShare = new Shareable({
    eslintrc: JSON.stringify(req.body.eslintrc),
  });

  newShare
    .save()
    .then((newDoc) => {
      res.locals.shareId = newDoc.id;
      next();
    })
    .catch((err) => next({ log: 'configControllers.shareConfig: no config data in res.locals' + err }));
};


/**
 * Retrieves shared config from database. 
 * 
 * Expects document id in req.params.id and sets res.locals.config to configuration if found
 */
configControllers.getSharedConfig = (req, res, next) => {
  if (!req.params.id)
    return next({ log: "configControllers.getSharedConfig: Didn't receive id in req params" });

  Shareable.findById(req.params.id )
    .then((doc) => {
      // if document is already expired 
      if (!doc) {
        res.locals.config = null
        return next()
      }

      if (doc.eslintrc) res.locals.config = JSON.parse(doc.eslintrc);
      return next();
    })
    .catch((err) =>
      next({
        log: 'configControllers.setSharedConfig: failed to query mongo db\n' + err,
      })
    );
};

module.exports = configControllers;
