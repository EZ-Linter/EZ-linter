const mongoose = require('mongoose');
const serverSettings = require('../settings.js');

mongoose.connect(serverSettings.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: serverSettings.dbName,
}).then(() => console.log('Connected to Mongo DB'))
.catch(err => console.error('configModels.js: Failed to Connect to Mongo DB\n',err))

const eslintrcSchema = new mongoose.Schema({
  // .eslintrc.json stored as a string
  eslintrc: {type: String, required: true},
})

// create model 'config' and explicitly connect to collection defined in config.js
const Eslintrc = mongoose.model('config', eslintrcSchema, serverSettings.configsCollection)

module.exports = {
  Eslintrc
}