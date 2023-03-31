const Expense=require('../models/Expense');


exports.addExpense=async(req,res,next)=>{
 console.log(req.body)
 try{
    const expense=req.body.expense;
    const description=req.body.description;
    const category=req.body.category;
     console.log(category);
    let data=await Expense.create({expense,description,category})
    
    res.status(201).json(data)

 }
 catch{err=>{
    console.log(err)
 }}
}

exports.getExpenses=async(req,res,next)=>{
   try{
     Expense.findAll()
     .then(data=>{
        console.log(data)
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
    
    try{
       await Expense.destroy({
        where:{id:req.body.id}
       }) 
       res.status(201).json({message:'Expense Deleted'});
    }
   catch{
    err=>{
        console.log(err);
    }
   }
}

