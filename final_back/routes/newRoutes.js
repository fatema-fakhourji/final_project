const express = require("express");
const router = express.Router();
const {
  getAllNew,
  getNew,
  setNew,
  updateNew,
  deleteNew,
} = require("../controllers/newControllers");

router.get("/", getAllNew);
router.post("/", setNew);
router.get("/:id", getNew);
router.put("/:id", updateNew);
router.delete("/:id", deleteNew);

module.exports = router;
