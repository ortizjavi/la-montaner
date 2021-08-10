const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');
const ROLE = require('./Role');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
  	type: String,
  	required: true,
  	default: ROLE.USER
  }
});

userSchema.statics.hashPassword = (password, salt) => {
  return bcrypt.hash(password, salt);
}

userSchema.statics.comparePassword = (password, password2) => {
  return bcrypt.compare(password, password2);
}



module.exports = model("User", userSchema);
