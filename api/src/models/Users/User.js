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
  name: {
    type: String,
    required: false,
  },
  family_name: {
    type: String,
    required: true,
  },
  given_name: {
    type: String,
    required: true,
  },
  picture: {
    type: String
  },
  role: {
  	type: String,
  	required: true,
  	default: ROLE.USER
  },
  verified: {
    type: Boolean,
    default: false
  },
  reset: {
    type: Boolean,
    default: false
  },
  orders: [{
    type : Schema.Types.ObjectId,
    ref : 'Order'
  }]
});

userSchema.statics.hashPassword = (password, salt) => {
  return bcrypt.hash(password, salt);
}

userSchema.statics.comparePassword = (password, password2) => {
  return bcrypt.compare(password, password2);
}



module.exports = model("User", userSchema);
