const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
    createProperty,
    getAllProperties,
    getPropertyById,
    updatePropertyById,
    deletePropertyById,
    getItemsByAgent,
  } = require("../controllers/propertiesController");
//set product
router.post("/",upload.array('image'),createProperty);

//get all product
router.get("/",getAllProperties);

//getProductbyID
router.get("/:id",getPropertyById);

//getProductbyCategories
router.get('/property/:agents_id',getItemsByAgent);


//updatebyID
router.put('/:id', updatePropertyById)

//delete
router.delete('/:id',deletePropertyById)

module.exports=router;