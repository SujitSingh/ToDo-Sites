const UserModel = require('../models/User');

const handlers = {};
const restrictKeys = 'email name creationDate isAdmin';

handlers.getUser = (req, res, next) => {
  const userId = req.decoded.id;
  UserModel.findOne({ '_id': userId }, restrictKeys).then(
    userInfo => {
      let users = [];
      if (userInfo) {
        users.push(userInfo);
      }
      res.send({
        users: users,
        success: true
      });
    },
    error => {
      res.status(500).send({
        message: 'Failed to get user details',
        success: false
      });
    }
  )
}

handlers.getAllUsers = (req, res, next) => {
  const isAdmin = req.decoded.isAdmin;
  if (!isAdmin) {
    return next();
  }
  UserModel.find({}, restrictKeys).then(
    usersInfo => {
      let users = [];
      if (usersInfo && usersInfo.length) {
        users = usersInfo;
      }
      res.send({
        users: users,
        success: true
      });
    },
    error => {
      res.status(500).send({
        message: 'Failed to get users details',
        success: false
      });
    }
  );
}

module.exports = handlers;