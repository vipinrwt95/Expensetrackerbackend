
const ExpenseController=require('../controllers/Expense');
const userAuth =require('../middleware/auth')
const express=require('express');

const router=express.Router();

router.post('/addExpense',userAuth.authenticate,ExpenseController.addExpense);
router.get('/Expenses',userAuth.authenticate,ExpenseController.getExpenses);

router.use('/Expenses/Delete',userAuth.authenticate,ExpenseController.deleteExpense);

module.exports=router;

