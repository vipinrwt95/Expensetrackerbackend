const Razorpay=require('razorpay');
const Order=require('../models/Order');
require("dotenv").config();


exports.purchasepremium=async(req,res)=>{
  
  try{
    var rzp=new Razorpay({
        key_id:'rzp_test_iA7hR6Wpr8GBE2',
        key_secret:'vlaWyxJYw6MoC0Fzk1gJENsI'
    })
    const amount=2500;
    rzp.orders.create({amount,currency:'INR'},(err,order)=>{
if(err){
      throw new Error(JSON.stringify(err));
}
req.user.createOrder({orderid:order.id,status:'PENDING'}).then(()=>{

    return res.status(201).json({order,key_id:rzp.key_id})
}).catch(err=>{
    throw new Error(err);
})

    })
  } 
  catch(err){
    console.log(err);
    res.status(403).json({message:'Somthing went wrong',error:err})
  } 

}
exports.updateTransactionsStatus=async(req,res)=>{
  console.log(req.body.payment_id);
  if(req.body.status==true)
  {
    try{
      const order_id=req.body.order_id;
      const payment_id=req.body.payment_id
      const order = await Order.findOne({ where: { orderid: order_id } });
      const promise1 = order.update({
        paymentid: payment_id,
        status: "SUCCESSFUL",
      });
      const promise2=req.user.update({isPremium:true})
   
      Promise.all([promise1,promise2]).then(data=>{
        
        res.status(202).json({succes:true,message:'Transaction successful'})
      }).catch(err=>{throw new Error(err)});
    }
    catch (err){
      res.status(401).json({ error:err,message:'Order failed,Retry'})
    }
  }
  else if(req.body.status==false){
    const order_id=req.body.order_id;
      const payment_id=req.body.payment_id
      const order = await Order.findOne({ where: { orderid: order_id } });
      await order.update({
        paymentid: payment_id,
        status: "FAILED",
      });
    
  }
}
     
    
  


    