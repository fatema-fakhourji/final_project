const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const agenttable = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  agency: {
    type: String,
    required: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  agentprice: {
    type: Number,
    required: true,
  },
  properties: [
    {
      type: Schema.Types.ObjectId,
      ref: "propertytable",
    },
  ],
});

const AgentModel = mongoose.model("agenttable", agenttable);

module.exports = AgentModel;
