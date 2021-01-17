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
  eslintrc: { type: String, required: true , unique: true},
  userLinks: Number,
});

// create model 'config' and explicitly connect to collection defined in config.js
const Eslintrc = mongoose.model('config', eslintrcSchema, serverSettings.configsCollection);

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true , unique: true},
  configs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'config' }],
});

// create model 'config' and explicitly connect to collection defined in config.js
const User = mongoose.model('user', userSchema, serverSettings.usersCollection);

module.exports = {
  Eslintrc,
  User,
};
