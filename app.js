const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { PORT, DB_PATH } = require('./env-config');

mongoose.connect(DB_PATH, { useNewUrlParser: true }).then(
  success => { console.log('DB connected') },
  err => { console.log('DB connection error') },
);

const authRoutes = require('./api/routes/auth-routes');
const todoRoutes = require('./api/routes/todo-routes');
const authCtrls = require('./api/ctrls/auth-ctrls');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/todo', authCtrls.validateToken, todoRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Path not found'
  }).end();
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
});