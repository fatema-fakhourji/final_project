const express = require("express");
const router = express.Router();
const {
  getAllBooking,
  getBooking,
  setBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

router.get("/", getAllBooking);
router.post("/", setBooking);
router.get("/:id", getBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;
