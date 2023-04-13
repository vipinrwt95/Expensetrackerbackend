const User=require('../models/user');
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
const Sib=require('sib-api-v3-sdk');
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
    console.log(req.body);
    
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
         bcrypt.compare(password,data[0].password,function(err,response){
             console.log(response)
           if(err)
           {
             return res.json({succes:false,message:'Passwords dont match'})
           }
          if(response)
          {
            return res.status(200).json({succes:true,message:'Logged in',token:generateAccessToken(data[0].id,data[0].name,data[0].isPremium)}) 
          }
         })
      }
    }
catch(err){
    console.log('here');
      return res.status(404).json({message:err});
   }
    
}
exports.resetpassword=async(req,res,next)=>{
  
  const client=Sib.ApiClient.instance
  const apiKey=client.authentications['api-key'];
  apiKey.apiKey="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";
  const tranEmailApi=new Sib.TransactionalEmailsApi()
  const sender={
    email:'vipinrwt9@gmail.com'
  }
  const recievers=[{
    email:req.body.email
  }]
  console.log(process.env.SENDINBLUE_API_KEY);

  tranEmailApi.sendTransacEmail({
    sender,
    to:recievers,
    subject:'Demo Project//',
    textContent:'Namaskaaaar'
  }).then(result=>{console.log(result)})
  .catch(err=>{console.log(err)})
}