const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const propertytable = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    approve: {
      type: Number,
    },
    type: {
      type: String,
      required: true,
    },

    image: [
      {
        public_id: {
          type: String,
          //required: true,
        },
        url: {
          type: String,
          //required: true,
        },
      },
    ],

    agents: [
        {
          type: Schema.Types.ObjectId,
          ref: "agenttable",
        },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("propertytable", propertytable);
