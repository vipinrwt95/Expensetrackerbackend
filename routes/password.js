
const express=require('express');
const userController=require('../controllers/User')
const router=express.Router()


router.post('/password/reset',userController.resetpassword);

module.exports=router;