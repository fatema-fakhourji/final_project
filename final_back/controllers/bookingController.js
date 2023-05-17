const asyncHandler = require("express-async-handler");
const bookingModel = require("../models/bookingModel");
const getAllBooking = async (req, res) => {
  try {
    const booking = await bookingModel.find();
    res.send(booking);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getBooking = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.id);
    if (!booking) {
      return res.status(404).send();
    }
    res.send(booking);
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

const setBooking = asyncHandler(async (req, res) => {
  const booking = await bookingModel.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    availability: req.body.availability,
    address: req.body.address,
  });

  await booking.save();

  res.status(200).json(booking);
});

const updateBooking = asyncHandler(async (req, res) => {
  const booking = await bookingModel.findById(req.params.id);

  if (!booking) {
    res.status(400);
    throw new Error("Booking not found");
  }
  const updatedbooking = await bookingModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ updatedbooking });
});

const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await bookingModel.findById(req.params.id);

  if (!booking) {
    res.status(400);
    throw new Error("Booking not found");
  }

  await bookingModel.deleteOne({ _id: req.params.id });

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
  getAllBooking,
  getBooking,
  setBooking,
  updateBooking,
  deleteBooking,
};
