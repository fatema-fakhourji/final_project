const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const propertytable = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: Number,
      required: true,
    },
    approve: {
      type: Boolean,
      required: true,
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
        agentID: {
          type: Schema.Types.ObjectId,
          ref: "agenttable",
          required: [true, "Please include a propertytable"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("propertytable", propertytable);
