
const ExpenseController=require('../controllers/Expense');

const express=require('express');

const router=express.Router();

router.post('/addExpense',ExpenseController.addExpense);
router.get('/Expenses',ExpenseController.getExpenses);

router.use('/Expenses/Delete',ExpenseController.deleteExpense);

module.exports=router;

