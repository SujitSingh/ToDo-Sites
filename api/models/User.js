const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../../env-config');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, require: true, trim: true },
  password: { type: String, require: true },
  name: { type: String, required: true, trim: true },
  creationDate: { type: Date, default: Date.now, required: true },
  isAdmin: { type: Boolean, default: false }
});

UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified || !user.isNew) {
    next();
  } else {
    // encrypt password before save
    bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
      if (err) {
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

module.exports = mongoose.model('User', UserSchema);