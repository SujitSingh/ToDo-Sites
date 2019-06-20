const express = require('express');
const app = express();
const { PORT } = require('./env-config');

app.get('/', (req, res, next) => {
  res.send({
    message: 'Hello'
  });
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
});