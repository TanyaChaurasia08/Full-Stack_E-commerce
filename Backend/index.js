const port=4000;
const paymentRoute = require('./routes/Payment.js'); 
const Product=require('./model/Product.js');
const products = require("./all_product_local")
const newProduct = require("./Admin/assets/all_product.js");
const express=require('express')
const app=express();
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const multer=require('multer')
const path=require('path')
const cors=require('cors')
const router = require('./router/Product.js');
const userRouter = require('./router/User'); 
app.use(express.json());
app.use(cors());
app.use("/api/payment", paymentRoute); 
app.use('/api',router)
app.use('/api/users',userRouter);
app.get("/",(req,res)=>{    
    res.send("express app is running")
})

// mongoose.connect("mongodb://localhost:27017/TanyaEcomm", {
// }).then(async () => {
//   console.log("MongoDB connected.");

//   try {
//     // Optionally clear existing data
//     console.log("Old products deleted.");

//     // Insert new data
//     // await Product.deleteMany({});
//     await Product.insertMany(products);
//     console.log("Products inserted successfully!");
//   } catch (err) {
//     console.error("Error inserting products:", err);
//   } 
// }).catch(err => {
//   console.error("MongoDB connection error:", err);
// });
app.get('/api/newcollections', async (req, res) => {
  try {
    let products = await Product.find({});
    let newcollection = products.slice(0,8); 
    console.log("NewCollection Fetched");
    res.send(newcollection);
  } catch (error) {
    console.error("Error fetching new collection:", error);
    res.status(500).json({ error: "Failed to fetch new collections" });
  }
});


//Database Connection with Monodb
mongoose.connect("mongodb://localhost:27017/TanyaEcomm")
console.log("MongoDB connect Successfully");

app.listen(port,(error)=>{
if(!error){
    console.log("server running on port"+port)
}
else{
    console.log("error:"+error)
}
})
//Image storage engine
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
       return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`) 
    }
})
const upload=multer({storage:storage})
//creating upload enbdpoints for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    console.log(req.file);
 res.json({
    success:1,
    image_url:`http://localhost:${port}/images/${req.file.filename}`
 })
})


// Creating API for getting all products
app.get('/allproducts',async(req,res)=>{
    let products=await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})
