const User=require('../models/user');
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')


function generateAccessToken(id){
  return jwt.sign({userId:id},'987847448332fh4h3h3dbcncnm33m4g07h6865h')
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
    
    // User.findAll({
    //     where:{
    //       email:email  
    //     }
    // }).then(data=>{
    //   if(data.length>0)
    //   {
    //     bcrypt.compare(password,data[0].password,function(err,response){
    //         console.log(response)
    //       if(err)
    //       {
    //         return res.json({succes:false,message:'Passwords dont match'})
    //       }
    //      if(response)
    //      {
    //        return res.status(200).json({succes:true,message:'Logged in',token:generateAccessToken(data[0].id)}) 
    //      }

    //     })
    //   }}).catch(err=>{
    //     throw "UsER nOT found"
    //   })
    
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
            return res.status(200).json({succes:true,message:'Logged in',token:generateAccessToken(data[0].id)}) 
          }
         })
      }
    }
catch(err){
    console.log('here');
      return res.status(404).json({message:err});
   }
    
}