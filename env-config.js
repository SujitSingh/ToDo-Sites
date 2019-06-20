require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  DB_PATH: process.env.DB_PATH,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
};