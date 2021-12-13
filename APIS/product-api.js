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
    //console.log(type(newproduct))
    let result= await productCollectionObj.deleteOne({model:newproduct});
    let latestcartobj=await productCollectionObj.findOne({model:newproduct})
    //console.log(latestcartobj)
    res.send({message: "producted deleted "})
    
}))

productApi.get("/getcategories",expressErrorHandler(async(req,res,next)=>{
    let categoryCollectionObj=req.app.get("categoryCollectionObj");
    let categories=await categoryCollectionObj.findOne();
    res.send({message:categories.category});
}))

productApi.get("/getdetailsofproduct/:model",expressErrorHandler(async(req,res,next)=>{
    let productCollectionObj = req.app.get("productCollectionObj");
    let newModel=req.params.model
    console.log("model is",newModel)
let result=await productCollectionObj.findOne({model:newModel});
//console.log(result)
    res.send({message:result})
}))


productApi.post("/updateproduct",expressErrorHandler(async(req,res,next)=>{
    let productCollectionObj = req.app.get("productCollectionObj");
    let newproduct=req.body;
    console.log("new product is",newproduct)
    await productCollectionObj.updateOne({model:newproduct.model},{$set:{...newproduct}});
    res.send({message:"product updated"})
}))


productApi.post("/add-to-orders",expressErrorHandler(async(req,res,next)=>{
    let orderCollectionObj=req.app.get("orderCollectionObj")
    let product=req.body;
//console.log(product)
    await orderCollectionObj.insertOne(product);

}))
productApi.get("/getorders",expressErrorHandler(async(req,res,next)=>{
    let orderCollectionObj=req.app.get("orderCollectionObj")
    let orders=await orderCollectionObj.find().toArray();
    //console.log(orders)
    res.send({message:orders});

}))

module.exports=productApi