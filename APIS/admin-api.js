const exp = require('express')
const adminApi = exp.Router();
const expressErrorHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const checkToken=require("./middlewares/verifyToken")
const multerObj=require("./middlewares/multerCloudinary")

adminApi.post('/login',expressErrorHandler(async(req,res,next)=>{
    let loginObj=req.body;
   // console.log(loginObj);
    if(req.body.username!='admin'){
        res.send({message:'invalid username'})
    }
    if(req.body.password!='admin'){
        res.send({message:'invalid password'});
    }
    else{
        let signedToken=jwt.sign({username:loginObj.username},"abcdef",{expiresIn:10})
        res.send({message:"login success",token:signedToken,username:loginObj.username})
    }
}))



module.exports=adminApi