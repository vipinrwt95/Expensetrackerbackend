
const Expense=require('../models/Expense');
const User = require('../models/user');


exports.addExpense=async(req,res,next)=>{
 
 try{
    const expense=req.body.expense;
    const description=req.body.description;
    const category=req.body.category;
     
     req.user.createExpense({expense,description,category,userId:req.user.id}).then(expense=>{
     const totalExpense=Number(req.user.totalExpense)+Number(expense);
     User.update({
      totalExpense:totalExpense
     },{where :{id:req.user.id}}).then(async()=>{
      res.status(201).json({expense:expense})
     }).catch(async(err)=>{
      return res.status(500).json({success:false,error:err})
     })
   })
     }
 catch{err=>{
   return res.status(500).json({success:false,error:err})
 }}
}

exports.getExpenses=async(req,res,next)=>{
   try{
     req.user.getExpenses()
     .then(data=>{
        
       res.status(201).json(data)
     })
   }
   catch{
     err=>{
        console.log(err);
     }
   }

}
exports.deleteExpense=async(req,res,next)=>{
   console.log(req.user)
   console.log(req.body.id)
   try{
       await Expense.destroy({
         where:{id:req.body.id , userId:req.user.id}
       })
       res.status(201).json({message:'Item DELETED'})
    }
   catch{
    err=>{
        console.log(err);
    }
   }
}

