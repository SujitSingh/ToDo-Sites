const express = require('express');
const app = express();
const { PORT, DB_PATH } = require('./env-config');
const mongoose = require('mongoose');

mongoose.connect(DB_PATH, { useNewUrlParser: true }).then(
  success => { console.log('DB connected') },
  err => { console.log('DB connection error') },
);

const authRoutes = require('./api/routes/auth-routes');
const todoRoutes = require('./api/routes/todo-routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Path not found'
  }).end();
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
});