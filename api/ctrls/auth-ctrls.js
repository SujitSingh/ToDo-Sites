const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../modals/User');

const { JWT_SECRET, TOKEN_EXPIRY_TIME } = require('../../env-config');

const handlers = {};

handlers.signUp = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;

  try {
    if (email && password && name) {
      const newUser = new UserModel({
        email, password, name
      });
      UserModel.findOne({ 'email': email }).then(
        result => {
          if (!result) {
            newUser.save().then(
              success => {
                res.status(200).send({
                  message: 'User created successfully',
                  success: true
                });
              }
            ).catch(error => {
              res.status(500).send({
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
    res.status(500).send({
      ...error,
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
          bcrypt.compare(password, user.password).then(
            match => {
              if (match) {
                const payload = {
                  email: email,
                  id: user.id
                };
                const options = {
                  expiresIn: TOKEN_EXPIRY_TIME
                };
                const token = jwt.sign(payload, JWT_SECRET, options);
                res.status(200).send({
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  token: token,
                  success: true 
                });
              } else {
                throw {
                  message: 'Invalid user email/password'
                }
              }
            }
          ).catch(error => {
            res.status(500).send({
              error: error.message,
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
    res.status(500).send({
      error: error.message,
      success: false 
    });
  });
};

handlers.logOut = (req, res, next) => {

};

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
      error: error.message,
      success: false 
    });
  }
};

// export functions
module.exports = handlers;