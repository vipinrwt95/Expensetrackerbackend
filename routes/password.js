
const express=require('express');
const userController=require('../controllers/User')
const router=express.Router()


router.post('/password/forgot',userController.forgotPassword);
router.get('/password/reset/:id',userController.resetPassword);
router.post('/password/final',userController.finalReset);

module.exports=router;