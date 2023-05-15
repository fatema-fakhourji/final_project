

const express=require("express");



const controll= require("../controllers/userController")

const router=express.Router();
const {protect}=require('../middleware/authMiddleware')

router.post("/",controll.registerUser);
router.post("/login",controll.loginUser);


router.get("/me", protect ,controll.getUser);
// router.put("/",controll.updater);
// router.delete("/",controll.deleter)





module.exports = router;