const mongoose = require('mongoose');
const serverSettings = require('../settings.js');

mongoose
  .connect(serverSettings.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: serverSettings.dbName,
  })
  .then(() => console.log('Connected to Mongo DB'))
  .catch((err) => console.error('configModels.js: Failed to Connect to Mongo DB\n', err));

const eslintrcSchema = new mongoose.Schema({
  // .eslintrc.json stored as a string
  eslintrc: { type: String, required: true, unique: true },
  userLinks: Number,
});

// create model 'config' and explicitly connect to collection 'configs'
const Eslintrc = mongoose.model('config', eslintrcSchema, 'configs');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  configs: [{ name: String, configId: { type: mongoose.Schema.Types.ObjectId, ref: 'config' } }],
});

// create model 'config' and explicitly connect to collection 'users'
const User = mongoose.model('user', userSchema, 'users');

// model for configs that are shared. These are set to automatically expire and are removed from db after 7 days
const shareableSchema = new mongoose.Schema({
  // .eslintrc.json stored as a string
  eslintrc: { type: String, required: true },
  expireAt: {
    type: Date,
    default: Date.now,
    // set document lifespan. See https://www.npmjs.com/package/ms for time syntax 
    // NOTE: if you change this setting, remember to drop the collection
    // indexes in Mongo
    // https://docs.mongodb.com/manual/reference/method/db.collection.dropIndexes/
    index: { expires: '7 days' },
  },
});

// create model 'config' and explicitly connect to collection 'configs'
const Shareable = mongoose.model('shareable', shareableSchema, 'shareables');

module.exports = {
  Eslintrc,
  User,
  Shareable,
};
