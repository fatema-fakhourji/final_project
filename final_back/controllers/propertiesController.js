const express = require("express");
const propertyModel = require("../models/propertyModel");
const cloudinary = require("cloudinary").v2;
const agentModel = require("../models/agentModel");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//calculate the new price
function calculateDiscountedPrice(price, discountPercentage) {
  const discountAmount = price * (discountPercentage / 100);
  const discountedPrice = price - discountAmount;
  return discountedPrice;
}

//create a agent
const createAgent = async (req, res) => {
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
    const category = req.body.category;
    const categorys = await Category.findById(category);
    const discountPercentage = categorys.sale || 0;
    const price = req.body.price;
    const discountedPricess = calculateDiscountedPrice(
      price,
      discountPercentage
    );

    const agent = new propertyModel({
      title: req.body.title,
      price: price,
      size: req.body.size,
      color: req.body.color,
      Description: req.body.Description,
      image: images,
      category: category,
      priceAfterDiscount: discountedPricess,
    });

    await agent.save();
    //await discounts.updateDescription(agent._id, categorys);
    res.status(201).send(agent);
  } catch (error) {
    res.status(400).send(error);
  }
};

// READ all agents
// {path: "category", select: "name"}
const getAllAgents = async (req, res) => {
  try {
    const agents = await agentModel.find().populate("category");

    res.send(agents);
  } catch (error) {
    res.status(500).send(error);
  }
};

// READ a single agent by ID
const getAgentById = async (req, res) => {
  try {
    const agent = await agentModel.findById(req.params.id).populate("category");
    if (!agent) {
      return res.status(404).send();
    }
    res.send(agent);
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPDATE a agent by ID
const updateAgentById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "price", "size", "color", "Description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const agent = await agentModel.findById(req.params.id);
    if (!agent) {
      return res.status(404).send();
    }
    updates.forEach((update) => (agent[update] = req.body[update]));
    await agent.save();
    res.send(agent);
  } catch (error) {
    res.status(400).send(error);
  }
};

//get agent by category
const getItemsByCategory = async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const item = await agentModel.find({ category: category_id }).populate(
      "category"
    );

    res.status(200).json(item);
  } catch (err) {
    res.json({ message: err });
  }
};

//get agent by category name
const getItemsByCategoryName = async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const items = await agentModel.aggregate([
      {
        $lookup: {
          from: "categoris",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $match: {
          "category.name": categoryName,
        },
      },
    ]);

    res.status(200).json(items);
  } catch (err) {
    res.json({ message: err });
  }
};

// DELETE a agent by ID
const deleteAgentById = async (req, res) => {
  try {
    const agent = await agentModel.findByIdAndDelete(req.params.id);
    if (!agent) {
      return res.status(404).send("Not found");
    }
    res.send(agent);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createAgent,
  getAllAgents,
  getAgentById,
  updateAgentById,
  deleteAgentById,
  getItemsByCategory,
  getItemsByCategoryName,
};
