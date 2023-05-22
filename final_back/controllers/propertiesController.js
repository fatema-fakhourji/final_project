const express = require("express");
const cloudinary = require("cloudinary").v2;
const propertyModel = require("../models/propertyModel");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//create a property
const createProperty = async (req, res) => {
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const uploadedImage = await cloudinary.uploader.upload(
          req.files[i].path
        );
        images.push({
          public_id: uploadedImage.public_id,
          url: uploadedImage.secure_url,
        });
      }
    }

    const property = new propertyModel({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      approve: req.body.approve,
      image: images,
      type: req.body.type,
      agents: req.body.agents
    });

    await property.save();
    //await discounts.updateDescription(agent._id, categorys);
    res.status(201).send(property);
  } catch (error) {
    res.status(400).send(error);
  }
};

// READ all properties
// {path: "category", select: "name"}
const getAllProperties = async (req, res) => {
  try {
    const property = await propertyModel.find().populate("agents");

    res.send(property);
  } catch (error) {
    res.status(500).send(error);
  }
};

// READ a single agent by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await propertyModel.findById(req.params.id);
    if (!property) {
      return res.status(404).send();
    }
    res.send(property);
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPDATE a agent by ID
const updatePropertyById = async (req, res) => {
  const property = await propertyModel.findById(req.params.id);

  if (!property) {
    res.status(400);
    throw new Error("Booking not found");
  }
  const updatedbooking = await propertyModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ updatedbooking });
};

//get agent by category
const getItemsByAgent = async (req, res) => {
  try {
    const agent_id = req.params.agent_id;
    const items = await propertyModel
      .find({ agents: agent_id })
      .populate("agents");

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};


// DELETE a agent by ID
const deletePropertyById = async (req, res) => {
  try {
    const property = await propertyModel.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).send("Not found");
    }
    res.send(property);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
  getItemsByAgent,
};
