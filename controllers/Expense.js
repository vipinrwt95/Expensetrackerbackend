const sequelize = require('../util/database');
const Expense=require('../models/Expense');
const User = require('../models/user');


exports.addExpense=async(req,res,next)=>{
   const tran = await sequelize.transaction();
 try{

    const expense=req.body.expense;
    const description=req.body.description;
    const category=req.body.category;
     
   const ExpenseItem= await  Expense .create({expense:expense,description:description,category:category,userId:req.user.id},{
      transaction: tran})
   User.findByPk(req.user.id, {
      transaction: tran,
    })
      .then((data) => {
        data.totalExpense += parseInt(expense);
        data.save();
        tran.commit();
        res.status(200).json({success:true,expense:ExpenseItem})
      })
      .catch((err) => {
        tran.rollback();

        console.log(err);
      });
   }
 catch{err=>{
   return res.status(500).json({success:false,error:err})
 }}
}

exports.getExpenses=async(req,res,next)=>{
   try{
      console.log(req.user);
     const data= await req.user.getExpenses()
     res.status(201).json(data)
     }
   catch{
     err=>{
        console.log(err);
     }
   }

}
exports.deleteExpense=async(req,res,next)=>{
   
   try{
    const tran = await sequelize.transaction();
    let expenseid=req.body.id
    await Expense.findByPk(expenseid,{transaction:tran}).then((data)=>{
     if(data.dataValues.userId==req.user.id){
        User.findByPk(req.user.id,{transaction:tran}).then((Userdata)=>{
          Userdata.totalExpense-=parseInt(data.expense)
          Userdata.save();
        })

     }

    });
    await Expense.destroy({where:{id:expenseid}},{transaction:tran}).then((result)=>{
      tran.commit();
      res.status(202).json({message:'Item Deleted'})
      .catch(err=>{
        tran.rollback();
        throw new Error(err);
      })
    })    
       
    }
   catch (err){
    console.log(err);
    
   }
}

