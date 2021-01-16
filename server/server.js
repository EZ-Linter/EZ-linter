const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}

// get user saved configs
app.get('/api/:user', (req, res) => {});

// retrieve configuration from database
app.get('/api/config/:id', (req, res) => {});

// save configuration to database
app.post('/api/config', (req, res) => {});

// oAuth callback route
app.use('/api/user/signin/callback', (req, res) => {});

app.listen(PORT, () => {
  console.log(`it's going down at: ${PORT}`);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { defaultErr, ...err };
  console.error(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;
