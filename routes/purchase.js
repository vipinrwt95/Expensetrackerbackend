const express=require('express');
const purchaseController=require('../controllers/purchase');
const authenticatemiddleware=require('../middleware/auth');

const router=express.Router();
router.get('/purchase/premium',authenticatemiddleware.authenticate,purchaseController.purchasepremium)
router.post('/purchase/updatetransactions',authenticatemiddleware.authenticate,purchaseController.updateTransactionsStatus)
router.get('/leaderboard',purchaseController.leaderboard);

module.exports=router;