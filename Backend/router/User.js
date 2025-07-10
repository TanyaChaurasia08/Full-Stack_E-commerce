const express=require('express')
const{ch}=require("../controller/User")
const{log}=require("../controller/User")
const router=express.Router();
router.post('/signup',ch);
router.post('/login',log)
module.exports=router;