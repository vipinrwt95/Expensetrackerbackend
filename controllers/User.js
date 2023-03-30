const User=require('../models/user');

exports.postAddUser=(req,res,next)=>{

    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    
    User.create({
     name:name,
     email:email,
     password:password
    }).then(data=>{
        res.send(data)  
       console.log('User created')
    }).catch((err)=>{
        console.log(err.message)
        res.send(err.message);
    })

}
exports.loginUser=(req,res,next)=>{
   
    const email=req.body.email;
    const password=req.body.password;
    
    User.findAll({
        where:{
          email:email  
        }
    }).then(data=>{
      
       if(data[0])
       {
        if(data[0].password==req.body.password)
        {    let message='User Logged in'
            res.send(message);
        }
        else{
            let message='Wrong password'
            res.send(message);
        }
       } 
       else{
        let message='User does not exist '
        res.send(message);
       }
    })
}