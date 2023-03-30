const User=require('../models/user');
const bcrypt=require('bcrypt')

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
exports.loginUser=(req,res,next)=>{
   
    const email=req.body.email;
    const password=req.body.password;
    
    User.findAll({
        where:{
          email:email  
        }
    }).then(data=>{
        console.log(data)
      if(data.length>0)
      {
        bcrypt.compare(password,data[0].password,function(err,response){
            console.log(response)
          if(err)
          {
            return res.json({succes:false,message:'Something went wrong'})
          }
         if(response)
         {
           return res.json({succes:true,message:'Logged in'}) 
         }

        })
      }
      else{
        return res.status(404).json({message:'passwords do not match'})
      }
    })
}