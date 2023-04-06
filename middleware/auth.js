const jwt=require('jsonwebtoken');
const User=require('../models/user');

const authenticate=(req,res,next)=>{
  //console.log(req.header('Authorization'));
  try{
    const token=req.header('Authorization');
   const user=jwt.verify(token,'987847448332fh4h3h3dbcncnm33m4g07h6865h');
   User.findByPk(user.userId).then(user=>{
   req.user=user
   
   next();
   }).catch(err=>{throw new Error(err)})
}
catch(err){
    return res.status(401).json({succes:false});
} 

}


module.exports={
authenticate
}





