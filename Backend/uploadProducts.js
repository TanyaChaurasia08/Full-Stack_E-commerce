// uploadProducts.js
const mongoose = require("mongoose");
const Product = require("./model/Product");

const products = require("./all_product_local"); // You'll create this below

mongoose.connect("mongodb+srv://Tanya_Chaurasia:qwer1234@ecommerce.zfrmr1w.mongodb.net/E-commerce")
  .then(async () => {
    await Product.deleteMany(); // Optional: clear existing products
    await Product.insertMany(products);
    console.log("✅ All products uploaded to MongoDB");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Upload failed:", err);
    process.exit(1);
  });
