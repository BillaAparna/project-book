const jwt=require("jsonwebtoken")
require("dotenv").config()
const verifyToken=(req,res,next)=>{
    let tokenwithbearer=req.headers.authorization;
    
    //if token does not exist
    if(tokenwithbearer===undefined){
        return res.send({message:"unauthrozied"})
    }
    else{
        let token=tokenwithbearer.split(" ")[1];
        jwt.verify(token,process.env.SECRET,(err,decoded)=>{
            if(err){
                return res.send({message:"session expired login to continue"});

            }
            else{
                    next()
            }
        })

        
    }
}
module.exports=verifyToken;