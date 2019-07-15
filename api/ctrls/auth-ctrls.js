const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const { JWT_SECRET, TOKEN_EXPIRY_TIME } = require('../../env-config');

const handlers = {};

handlers.signUp = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;
  let isAdmin = req.body.isAdmin;

  try {
    if (email && password && name) {
      const newUser = new UserModel({
        email, password, name, isAdmin
      });
      UserModel.findOne({ 'email': email }).then(
        result => {
          if (!result) {
            newUser.save().then(
              success => {
                res.status(201).send({
                  message: 'User created successfully',
                  success: true
                });
              }
            ).catch(error => {
              res.status(400).send({
                message: error.message,
                success: false
              });
            });
          } else {
            throw {
              message: 'Email has been already taken',
            };
          }
        }
      ).catch(error => {
        res.status(500).send(error);
      });
    } else {
      throw {
        message: 'Please provide all required fields',
      }
    }
  } catch(error) {
    res.status(400).send({
      message: error.message,
      success: false
    });
  }
};

handlers.logIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  UserModel.findOne({ 'email': email }).then(
    user => {
      try {
        if (user) {
          bcryptjs.compare(password, user.password).then(
            match => {
              if (match) {
                const payload = {
                  email: email,
                  id: user.id,
                  isAdmin: user.isAdmin
                };
                const options = {
                  expiresIn: TOKEN_EXPIRY_TIME
                };
                const token = jwt.sign(payload, JWT_SECRET, options);
                res.send({
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  token: token,
                  isAdmin: user.isAdmin,
                  success: true 
                });
              } else {
                throw {
                  message: 'Invalid user email/password'
                }
              }
            }
          ).catch(error => {
            res.status(400).send({
              message: error.message,
              success: false 
            });
          });
        } else {
          throw {
            message: 'Invalid user email/password'
          }
        }
      } catch(error) {
        res.status(401).send({
          message: error.message,
          success: false 
        });
      }
    }
  ).catch(error => {
    res.status(400).send({
      message: error.message,
      success: false 
    });
  });
};

handlers.logOut = (req, res, next) => { };

handlers.validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const options = {
        expiresIn: TOKEN_EXPIRY_TIME,
      };
      let decoded = jwt.verify(token, JWT_SECRET, options);
      req.decoded = decoded;
      next();
    } else {
      throw {
        message: 'Unauthorized'
      }
    }
  } catch(error) {
    res.status(401).send({
      message: error.message,
      success: false 
    });
  }
};

// export functions
module.exports = handlers;