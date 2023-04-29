const User=require('../models/user');
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
const Sib=require('sib-api-v3-sdk');
const { v4 } = require("uuid");
const ForgotPassword = require('../models/ForgotPasswordRequests');
require("dotenv").config();


function generateAccessToken(id,name,premium){
  return jwt.sign({userId:id,userName:name,isPremium:premium},'987847448332fh4h3h3dbcncnm33m4g07h6865h')
}

exports.postAddUser=async(req,res,next)=>{

    try{
       // console.log(req.body)
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;
       bcrypt.hash(password,10,async(err,hash)=>{
         console.log(err)
         await User.create({name,email,password:hash})
         res.status(201).json({message:'User created'})
       })
    }
    catch(err){
        res.status(500).json(err);
    }

}

exports.loginUser=async(req,res,next)=>{
   try{
      
    const email=req.body.email;
    const password=req.body.password;
  let data=await User.findAll({
       where:{
              email:email }
    })
    if(data.length==0)
    {
      throw "User Not Found";
    }
    if(data.length>0)
      {
        await bcrypt.compare(password,data[0].password,function(err,response){
          
          if(response)
          {
            return res.status(200).json({succes:true,message:'Logged in',token:generateAccessToken(data[0].id,data[0].name,data[0].isPremium)}) 
          }
          else {
            res.status(301).json({ msg: "Wrong Password" })
          }
          
         })
      }
    }
catch(err){
    console.log(err);
      return res.status(404).json({message:err});
   }
    
}
exports.forgotPassword=async(req,res,next)=>{
  
  const {email}=req.body
  const client=Sib.ApiClient.instance
  const apiKey=client.authentications['api-key'];
  apiKey.apiKey="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";
  const tranEmailApi=new Sib.TransactionalEmailsApi()
  const id=v4();
  
  User.findAll({where:{email},attributes:["id"]})
  .then((data)=>{
      const jsonData=JSON.parse(JSON.stringify(data));
      console.log(jsonData)
      if(jsonData.length>0){
        return ForgotPassword.create({
          id,
          userId:jsonData[0].id,
          isActive:true,
          
        })
      }
      else {
        res.json({status:"email not found"});
      }
    })
    .then((data)=>{
     const sender={
      name:"Reset Password",
      email:"Expense@tracker.com"
     };
     const reciever=[{
      email:email
     }]
     return tranEmailApi.sendTransacEmail({
       sender,
       to:reciever,
       subject:"Reset Password",
       textContent:"Reset Your Password",
       htmlContent: `<a href=http://localhost:3001/password/reset/${id} > Reset Link </a>`,
      })
    })
    .then((data)=>{
      console.log(data);
      res.status(200).json({status:"Done"})
    })
    .catch((e)=>{
      console.log(e);
      res.json({status:e});
    })

}
exports.resetPassword=async(req,res,next)=>{
  try {
    
    const data = await ForgotPassword.findByPk(req.params.id);
    if (data.isActive) {
      data.isActive = false;
      data.save();
      res.send(`
    <form action='http://localhost:3001/password/final' method='POST'>
      <input name='password' placeholder='enter new password'/>
      <input type="hidden" name="id" value=${data.userId} />
      <button type='submit'>Submit</button>
    </form>`);
    } else {
      res.send("<h1>Link Exprire</h1>");
    }
  } catch (e) {
    console.log(e);
    res.send("<h1>Link Expire</h1>");
    console.log(e);
  } 
  
}
exports.finalReset = (req, res, next) => {
  const password=req.body.password;
  const id=req.body.id;
  console.log(password);
  bcrypt.hash(password, 8, (err, hash) => {
    User.findByPk(id)
      .then((data) => {
        console.log(data);
        data.password = hash;
        data.save();
        res.send("<h3>Password Has Been Reset!</h3><h3>Login again</h3> ");
      })
      .catch((e) => console.log(e));
  });
};