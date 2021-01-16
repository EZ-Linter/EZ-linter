// this file contains the example for the configurations necessary for the server
// Copy this file and name it config.js, and replace the examples with you own settings.

// connection string for MongoDB. If using MongoDB Atlas, use the string given
// by clicking on cluster -> connect -> "connect using mongodb compass"
// !!Don't forget to substitute usename and password
const MONGO_URI = 'mongodb+srv://<user>:<password>@<cluster>.3ybta.mongodb.net/ez-linter';

// dabatase name inside the cluster.
const dbName = 'ez-linter';

// name of collection that stores configurations
const configsCollection = 'configs';

module.exports = {
  MONGO_URI,
  dbName,
  configsCollection,
};
