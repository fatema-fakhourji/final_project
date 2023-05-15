const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  const { name, email, password, phone, address, role } = req.body;

  // Check if all required fields are present
  if (!name || !email || !password || !phone || !address || !role) {
    if (!name) {
      return res.send({ message: "Please provide all required the name." });
    } else if (!email) {
      return res.send({ message: "Please provide email." });
    } else if (!password) {
      return res.send({ message: "Please provide password." });
    } else if (!phone) {
      return res.send({ message: "Please provide phone" });
    } else if (!address) {
      return res.send({ message: "Please provide address" });
    } else if (!role) {
      return res.send({ message: "Please provide role" });
    }

    return res.send({ message: "Please provide all required fields." });
  }

  try {
    // Check if the user already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.send({ message: "User already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
    });
    const savedUser = await newUser.save();

    res.send({
      message: "User created successfully.",
      token: generatetoken(savedUser.id),
      role,
      _id: savedUser.id,
      phone,
      address,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while registering the user." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Check for User email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.json({
      _id: user.id,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      token: generatetoken(user.id),
    });
  } else {
    return res.send({ message: "User doesnt  exist." });
  }
};

const getUser = async (req, res) => {
  try {
    const { _id, email, password } = await User.findById(req.user.id);
    res.json({
      id: _id,
      email: email,
      password: password,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// generator token
const generatetoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
