const express = require('express');
const app = express();
const { PORT } = require('./env-config');

const todoRoutes = require('./api/routes/todo-routes');

app.use('/api/todo', todoRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Path not found'
  }).end();
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
});