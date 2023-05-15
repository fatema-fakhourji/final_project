const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add a name "],
  },

  email: {
    type: String,
    required: [true, "please add a email "],
    unique: true,
  },
  role: {
    type: String,
    required: [true, "please add the role  "],
  },
  password: {
    type: String,
    required: [true, "please add a password "],
  },

  phone: {
    type: Number,
    required: [true, "please add a phone number "],
  },
  address: {
    type: String,
    required: [true, "please add a address "],
  },
});

module.exports = mongoose.model("User", userSchema);
