const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const {createProduct}=require("../controllers/productControllers");
const{getAllProducts}=require("../controllers/productControllers");
const{getProductById}=require("../controllers/productControllers");
const{ updateProductById}=require("../controllers/productControllers");
const{deleteProductById}=require("../controllers/productControllers");
const {getItemsByCategory}=require("../controllers/productControllers");
const {getItemsByCategoryName}=require("../controllers/productControllers");
//set product
router.post("/product",upload.array('image'),createProduct);

//get all product
router.get("/product",getAllProducts);

//getProductbyID
router.get("/productbyID/:id",getProductById);

//getProductbyCategories
router.get('/productbyCategory/:category_id',getItemsByCategory);

//getProduct by Category name
router.get("/productsbyCategoryName/:categoryName", getItemsByCategoryName );

//updatebyID
router.put('/productUpdate/:id', updateProductById)

//delete
router.delete('/deleteProduct/:id',deleteProductById)

module.exports=router;