
const Expense=require('../models/Expense');


exports.addExpense=async(req,res,next)=>{
 
 try{
    const expense=req.body.expense;
    const description=req.body.description;
    const category=req.body.category;
     
     req.user.createExpense({expense,description,category}).then(data=>{
      res.status(201).json(data)
     })
     
    

 }
 catch{err=>{
    console.log(err)
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

