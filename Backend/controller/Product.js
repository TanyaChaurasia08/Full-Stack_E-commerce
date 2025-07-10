const Product = require('../model/Product.js');

const saveProduct = async (req, res) => {
  // Get the last inserted product by id in descending order
  let last_product = await Product.findOne().sort({ id: -1 });
  let id;

  if (last_product) {
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const newProduct = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  await newProduct.save();
  console.log(newProduct);
  console.log("saved");

  res.json({
    success: true,
    name: req.body.name,
  });
};
const removeProduct = async (req, res) => {
 await Product.findOneAndDelete({id:req.body.id});
 console.log("removed");
 res.json({
   success:true,
   name:req.body.name
 })

  };

  const allproduct=async(req,res)=>{
    let products=await Product.find({});
    console.log("all products fetched");
    res.send(products);
  } 
module.exports = {
  saveProduct,
  removeProduct,
  allproduct,
};
