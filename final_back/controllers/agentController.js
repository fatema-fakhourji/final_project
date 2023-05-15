const agentModel = require("../models/agentModel");
const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// get all agent
const getAgents = async (req, res) => {
  const agent = await agentModel.find();

  res.status(200).json(agent);
};

//get by Id
const getAgentById = async (req, res) => {
  try {
    const agent = await agentModel.findById(req.params.id);
    if (!agent) {
      return res.status(404).send();
    }
    res.json(agent);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAgentByAgency = async (req, res) => {
  try {
    const agency = req.params.agency;

    const filter = agency ? { agency } : {};
    const agentcy = await agentModel.find(filter);

    res.status(200).json(agentcy);
  } catch (error) {
    res.status(500).send(error);
  }
};

const setAgent = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    if (!req.body) {
      return res.status(400).json({ message: "Error" });
    } else {
      const agent = await agentModel.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        agency: req.body.agency,
        agentprice: req.body.agentprice,

        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });

      return res.status(200).json({ message: "agent created successfully" });
    }
  } catch (err) {
    console.log("error ", err);
  }
};

const updateAgent = async (req, res) => {
  const agent = await agentModel.findById(req.params.id);

  if (!agent) {
    res.status(400);
    throw new Error("agent not found");
  }
  const updatedAgent = await agentModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedAgent);
};

const deleteAgent = async (req, res) => {
  const agent = await agentModel.findById(req.params.id);

  if (!agent) {
    res.status(400);
    throw new Error("agent not found");
  }
  await agent.deleteOne();
  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getAgents,
  getAgentById,
  getAgentByAgency,
  setAgent,
  updateAgent,
  deleteAgent,
};
