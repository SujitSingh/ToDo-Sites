const UserModel = require('../modals/User');

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

};

handlers.logOut = (req, res, next) => {

};

// export functions
module.exports = handlers;