const mongoose = require('mongoose');

// TODO add type precision

const Schema = new mongoose.Schema(
  {
    email: {
      required: true,
      trim: true,
      type: String
    },
    token: {
      trim: true,
      type: String,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

const PasswordResetRequest = mongoose.connection.model(
  'PasswordResetRequest',
  Schema
);
export default PasswordResetRequest;
