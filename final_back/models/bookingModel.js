const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const BookingModel = new Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name "],
    },
  
    email: {
      type: String,
      required: [true, "please add a email "],
    },
    phone: {
      type: Number,
      required: [true, "please add a phone number "],
    },
    availability: {
      type: String,
      required: [true, "please add a phone number "],
    },
    address: {
      type: String,
      required: [true, "please add a address "],
    },
  },
);

module.exports = mongoose.model("bookingtable", BookingModel);
