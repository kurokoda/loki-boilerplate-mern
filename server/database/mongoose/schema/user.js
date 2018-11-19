/* eslint-disable func-names */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// TODO add type precision

const Schema = new mongoose.Schema(
  {
    email: {
      required: true,
      trim: true,
      type: String,
      unique: true
    },
    firstName: {
      trim: true,
      type: String
    },
    lastName: {
      trim: true,
      type: String
    },
    password: {
      required: true,
      type: String
    },
    username: {
      trim: true,
      type: String
    }
  },
  {
    timestamps: true
  }
);

Schema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    return next();
  });
});

Schema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.v;
  return obj;
};

Schema.statics.authenticate = function(email, password) {
  let user;

  return User.findOne({ email })
    .then(result => {
      user = result;
      return bcrypt.compare(password, user.password);
    })
    .then(result => (result ? user : null))
    .catch(error => {
      console.log(error); // tslint:disable-line:no-console
    });
};

const User = mongoose.connection.model('User', Schema);
export default User;
