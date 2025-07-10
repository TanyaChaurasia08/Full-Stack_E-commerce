
const express=require('express')
const{saveProduct, removeProduct,allproduct}=require("../controller/Product")
const router=express.Router();
router.post("/addproduct",saveProduct);
router.post("/deleteProduct",removeProduct)
router.get("/allproducts",allproduct);
module.exports = router;
