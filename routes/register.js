const path=require('path');

const userController=require('../controllers/User')

const express=require('express');

const router=express.Router();

router.post('/signup',userController.postAddUser);
router.post('/login',userController.loginUser);

module.exports=router;
