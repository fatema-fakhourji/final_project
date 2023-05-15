const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const NewModel = new Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name "],
    },
  
    email: {
      type: String,
      required: [true, "please add a email "],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, "please add a phone number "],
    },
    availability: {
      type: Number,
      required: [true, "please add a phone number "],
    },
    address: {
      type: String,
      required: [true, "please add a address "],
    },
  },
);

module.exports = mongoose.model("newtable", newtable);
