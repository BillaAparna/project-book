const exp = require('express')
const productApi = exp.Router();
const expressErrorHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const checkToken=require("./middlewares/verifyToken")
productApi.use(exp.json())
const multerObj=require("./middlewares/multerCloudinary")

productApi.post('/createproduct',multerObj.single('photo'),expressErrorHandler(async(req,res,next)=>{
    let productCollectionObj = req.app.get("productCollectionObj");
    let newproduct=JSON.parse(req.body.productObj);
    //console.log(newproduct);
     let result= await productCollectionObj.findOne({model:newproduct.model});
    if(result!=null){
    res.send({message:"product with the given model already exists"})
    }
    else{
        newproduct.productImage=req.file.path;
       
        delete newproduct.photo;
        //console.log(newproduct)
        await productCollectionObj.insertOne(newproduct);
        res.send({message:"product created"})
    }




}))
productApi.get('/getprodcuts',expressErrorHandler(async(req,res,next)=>{
    let productCollectionObj = req.app.get("productCollectionObj");
    let products=await productCollectionObj.find().toArray();
    res.send({message:products});
}))
productApi.post("/delete-from-list",expressErrorHandler(async(req,res,next)=>{
    let productCollectionObj = req.app.get("productCollectionObj");
    let newproduct=req.body.model
    let result= await productCollectionObj.deleteOne({model:newproduct});
    let latestcartobj=await productCollectionObj.findOne({model:newproduct})
    console.log(latestcartobj)
    res.send({message: "producted deleted "})
    
}))


module.exports=productApi