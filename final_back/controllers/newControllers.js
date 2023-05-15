const asyncHandler = require("express-async-handler");
const newModel = require("../models/newModel");
const getAllNew = async (req, res) => {
  try {
    const neww = await newModel.find();
    res.send(neww);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getNew = async (req, res) => {
  try {
    const neww = await newModel.findById(req.params.id);
    if (!neww) {
      return res.status(404).send();
    }
    res.send(neww);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};
// const getOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate({
//       path: 'cart.productID',
//       select: 'title' // Specify the fields you want to include
//     });
//     if (!order) {
//       return res.status(404).send();
//     }
//     res.send(order);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const setNew = asyncHandler(async (req, res) => {
  const neww = await newModel.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    availability: req.body.availability,
    address: req.body.address,
  });

  await neww.save();

  res.status(200).json(neww);
});

const updateNew = asyncHandler(async (req, res) => {
  const neww = await newModel.findById(req.params.id);

  if (!neww) {
    res.status(400);
    throw new Error("New request not found");
  }
  console.log(neww.cart);
  const updatednew = await newModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ updatednew });
});

const deleteNew = asyncHandler(async (req, res) => {
  const neww = await newModel.findById(req.params.id);

  if (!neww) {
    res.status(400);
    throw new Error("New request not found");
  }

  await newModel.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id });
});

// const deletecart = asyncHandler(async (req, res) => {
//   const order = await OrderModel.findOne({ "cart._id": req.params.id });

//   if (!order) {
//     res.status(404);
//     throw new Error("Order not found");
//   }

//   order.cart = order.cart.filter(
//     (item) => item._id.toString() !== req.params.id
//   );
//   await order.save();

//   res.status(200).json({ message: "Cart deleted successfully" });
//   if (order.cart.length === 0) {
//     const idd = order._id;
//     await OrderModel.findByIdAndDelete(idd);
//     return res.status(200).json({ message: "Order deleted successfully" });
//   }
// });

module.exports = {
  getAllNew,
  getNew,
  setNew,
  updateNew,
  deleteNew,
};
