require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  DB_PATH: process.env.DB_PATH,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
  JWT_SECRET: process.env.JWT_SECRET,
  TOKEN_EXPIRY_TIME: parseInt(process.env.TOKEN_EXPIRY_TIME)
};