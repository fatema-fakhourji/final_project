const express = require("express");
const router = express.Router();
const {
  getAgents,
  getAgentById,
  getAgentByAgency,
  setAgent,
  updateAgent,
  deleteAgent,
} = require("../controllers/agentController");
const catupload = require("../middleware/catupload");

router.get("/", getAgents);

router.get("/:id", getAgentById);

router.get("/agent/:agency?", getAgentByAgency);

router.post("/", catupload.single("image"), setAgent);

router.put("/:id", updateAgent);

router.delete("/:id", deleteAgent);

module.exports = router;
