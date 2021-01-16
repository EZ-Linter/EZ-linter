const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const configControllers = require('./controllers/configControllers');

const PORT = 3000;

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}

// get user saved configs
app.get('/api/:user', (req, res) => {});

// retrieve configuration from database
app.get('/api/config/:id', configControllers.getConfig, (req, res) => {
  if (!res.locals.config) return res.sendStatus(404)

  res.json({eslintrc: res.locals.config})
});

// save configuration to database
app.post('/api/config', configControllers.saveConfig, (req, res) => {
  console.log(res.locals.configId)
  res.json({configId: res.locals.configId})
});

// oAuth callback route
app.use('/api/user/signin/callback', (req, res) => {});

app.use('/api/user/signin', (req, res) => {});

app.listen(PORT, () => {
  console.log(`it's going down at: ${PORT}`);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.error(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;
