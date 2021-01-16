const mongoose = require('mongoose');
const defaultConfigs = require('../configDefaults.js');
const customConfigs = require('../config.js');

// create configs object with configs set in configs.js, filled in with defaults
const serverConfigs = { ...defaultConfigs, ...customConfigs };

mongoose.connect(serverConfigs.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: serverConfigs.dbName,
}).then(() => console.log('Connected to Mongo DB'))
.catch(err => console.error('configModels.js: Failed to Connect to Mongo DB\n',err))

const eslintrcSchema = new Schema({
  // .eslintrc.json stored as a string
  eslintrc: {type: String, required: true}
})

// create model 'config' and explicitly connect to collection defined in config.js
const Eslintrc = mongoose.model('config', eslintrcSchema, serverConfigs.configsCollection)

module.exports = {
  Eslintrc
}