const exp = require('express')
const userApi = exp.Router();
const expressErrorHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const checkToken=require("./middlewares/verifyToken")
require("dotenv").config()
//import cloudinary module
userApi.use(exp.json())

//configure multer
const multerObj=require('./middlewares/multerCloudinary')
//add body parsing middleware
userApi.use(exp.json())




// http://localhost:3000/user/getusers
// userApi.get("/getusers", (req, res, next) => {

//     read docs from user collection
//     userCollectionObj.find().toArray((err, usersList) => {

//         deal with error
//         if (err) {
//             console.log("err in reading users data", err)
//             res.send({ message: err.message })
//         }
//         else {
//             res.send({ message: usersList })
//         }
//     })
// })


// http://localhost:3000/user/getuser/<username>
// userApi.get("/getuser/:username", (req, res, next) => {

//     get username from url params
//     let un = req.params.username;

//     search for user
//     userCollectionObj.findOne({ username: un }, (err, userObj) => {
//         if (err) {
//             console.log("err in reading users data", err)
//             res.send({ message: err.message })
//         }

//         if user not existed
//         if (userObj === null) {
//             res.send({ message: "User not found" })
//         }
//         if user existed
//         else {
//             res.send({ message: userObj })
//         }


//     })
// })









// http://localhost:3000/user/createuser
// userApi.post("/createuser", (req, res, next) => {

//     get user obj
//     let newUser = req.body;

//     check user in db with  this username
//     userCollectionObj.findOne({ username: newUser.username }, (err, userObj) => {

//         if (err) {
//             console.log("err in reading users data", err)
//             res.send({ message: err.message })
//         }

//         if user not existed
//         if (userObj === null) {
//             create new user
//             userCollectionObj.insertOne(newUser, (err, success) => {
//                 if (err) {
//                     console.log("err in reading users data", err)
//                     res.send({ message: err.message })
//                 }
//                 else {
//                     res.send({ message: "New user created" })
//                 }
//             })
//         }
//         else {
//             res.send({ message: "User already existed" })
//         }

//     })
// })







// http://localhost:3000/user/updateuser/<username>
// userApi.put("/updateuser/:username", (req, res, next) => {

//     get modified user
//     let modifiedUser = req.body;

//     update
//     userCollectionObj.updateOne({ username: modifiedUser.username }, {
//         $set: { ...modifiedUser }
//     }, (err, success) => {

//         if (err) {
//             console.log("err in reading users data", err)
//             res.send({ message: err.message })
//         }
//         else {
//             res.send({ message: "User updated" })
//         }
//     })

// })
// http://localhost:3000/user/updateuser/<username>
// userApi.delete("/deleteuser/:username",(req,res,next)=>{
//     deleteuser=req.params.username;
//     userCollectionObj.deleteOne({username:deleteuser},(err,userObj)=>{
//         if(err){
//             res.send({message:"error in delete"});
//         }
//         if(userObj===null){
//             res.send({message:"user not found"});
//         }
//         else{
//             res.send({message:"deleted successfully"});
//         }
//     })
// })

// userApi.get("/getusers",(req,res,next)=>{
//     userCollectionObj.find().toArray().then(userList=>{res.send({message:userList})}).
//     catch(err=>{res.send({message:"error in reading users"})})
// })

// userApi.get("/getuser/:username",(req,res,next)=>{
//     let un=req.params.username;
//     userCollectionObj.findOne({username:un}).then(user=>{
//         if(user===null){res.send({message:"no user found"})}
//         else{res.send({message:user})}}).catch(err=>{res.send({message:"error in reading users"})})
// })
userApi.get("/getusers", expressErrorHandler(async (req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
        let userList= await userCollectionObj.find().toArray()
        res.send({messsage:userList})
     }))
//if error occurs then errorhandler passes error to default error handler in index.js
userApi.get("/getuser/:username",expressErrorHandler(async (req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    let un=req.params.username;
        let user= await userCollectionObj.findOne({username:un})
        if(user===null){res.send({message:"no user found"})}
          else{res.send({message:user})}
     }))

userApi.post("/createuser",multerObj.single('photo'),expressErrorHandler(async(req,res,next)=>{
    let userCollectionObj = req.app.get("userCollectionObj")

    //get user obj
    let newUser = JSON.parse(req.body.registerObj)

    //search for existing user
    let user = await userCollectionObj.findOne({ username: newUser.username })
    //if user existed
    if (user !== null) {
        res.send({ message: "User already existed" });
    }
    else {
        //hash password
        let hashedPassword = await bcryptjs.hash(newUser.password, 7)
        //replace password
        newUser.password = hashedPassword;
        //add image url
        newUser.profileImage=req.file.path;
        delete newUser.photo;
        //insert
        await userCollectionObj.insertOne(newUser)
        res.send({ message: "user created" })
    }
    // let userCollectionObj=req.app.get("userCollectionObj")
    // let newuser=req.body.userObj;
    // console.log(newuser)
    // newuser=JSON.parse(newuser)
    // let un=newuser.username;
    // let user= await userCollectionObj.findOne({username:un})
    // if(user==null){
    //     let hashedpassword=await bcryptjs.hash(newuser.password,5);
    //     console.log(hashedpassword)
    //     newuser.password=hashedpassword;
    //     newuser.profileImage=req.file.path;
    //     await userCollectionObj.insertOne(newuser);
    //     console.log("usercreated")
    //     res.send({message:"user created"});
    // }
    // else{
        
    //     res.send({message:"user already exists"})
    // }
}))
userApi.put("/updateuser/:username",expressErrorHandler(async(req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    let newuser=req.body;
    let un=newuser.username;
    let user= await userCollectionObj.findOne({username:un})
    if(user!=null){
        await userCollectionObj.updateOne({username:un},{$set:{...newuser}});
        res.send({message:"user updated"});
    }
    else{
        res.send({message:"user not found"})
    }
}))
userApi.delete("/deleteuser/:username",expressErrorHandler(async(req,res)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    let un=req.params.username;
    let user= await userCollectionObj.findOne({username:un})
    if(user!=null){
        await userCollectionObj.deleteOne({username:un});
        res.send({message:"user deleted"});
    }
    else{
        res.send({message:"user not found"})
    }
}))

userApi.post("/login",expressErrorHandler(async(req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    let loginuser=req.body;
    let un=loginuser.username;
    let user= await userCollectionObj.findOne({username:un})
    if(user==null){
        
        res.send({message:"invalid username"});
    }
    else{
        let userObj= await userCollectionObj.findOne({username:un})
        let result=await bcryptjs.compare(loginuser.password,userObj.password)
        if(result===false){
            res.send({message:"invalid password"});
        }
        else{
            //create token 
            //send token to client
            let signedToken=jwt.sign({username:un},process.env.SECRET,{expiresIn:10})
            res.send({message:"login success",token:signedToken,username:un,userObj:userObj})
        }
    }
}))
userApi.post("/add-to-cart",expressErrorHandler(async(req,res,next)=>{
    let userCartCollectionObj=req.app.get("userCartCollectionObj")
    let newProductObject=req.body; 
    //console.log(newProductObject)
    
    let usercartobj=await userCartCollectionObj.findOne({username:newProductObject.username});
    //console.log(newObject)
    if(usercartobj==null){
        let products=[]
        newProductObject.productObject.count=1;
        products.push(newProductObject.productObject)
        let newproduct={username:newProductObject.username,products}
        //console.log(newproduct)
        await userCartCollectionObj.insertOne(newproduct)
        
        let latestcartobj=await userCartCollectionObj.findOne({username:newProductObject.username})
        res.send({message:"new product added",latestcartobj:latestcartobj})
    }

    else{
        let flag=0
        x=usercartobj.products
      for(var i=0;i<x.length;i++){
          if(x[i].model==newProductObject.productObject.model){
              console.log()
              x[i].count+=1
            //console.log(newProductObject.productObject.count)
            flag=1
            break
          }
      }
      //console.log(newProductObject.productObject,flag)+
      if(flag==0){
        newProductObject.productObject.count=1;
        usercartobj.products.push(newProductObject.productObject)

      }





        
        await userCartCollectionObj.updateOne({username:newProductObject.username},{$set:{...usercartobj}})
        let latestcartobj=await userCartCollectionObj.findOne({username:newProductObject.username})
        res.send({message:"product added to cart",latestcartobj:latestcartobj})
    }

}))















//delete from all carts
userApi.post("/delete-from-cart",expressErrorHandler(async(req,res,next)=>{
    let userCartCollectionObj=req.app.get("userCartCollectionObj")
    let dummyobj=req.app.get("dummyobj")
    let newProductObject=req.body; 
   // console.log("newproduct",newProductObject)
    let pcollection=await  userCartCollectionObj.find().toArray()
    //console.log(listofproducts)
    //console.log(listofusers.length)
    
    //console.log(listofusers)
    let m=newProductObject.model
    //console.log(m)
    
    for(let i=0;i<pcollection.length;i++){
        p=pcollection[i].products
         for(let j=0;j<p.length;j++){
             if(p[j].model==m){
                 p.splice(j,1)
                 //console.log(p[j].model)
             }
         }
    }
    let c=pcollection;
    
   for(let i=0;i<pcollection.length;i++){
        pc=pcollection[i];
       // console.log(pc)
        await userCartCollectionObj.updateOne({username:pc.username},{$set:{...pc}})
    }
    
   pcollection=await  userCartCollectionObj.find().toArray()

  //console.log("pcollection",pcollection)
  //pcollection=JSON.parse(pcollection)
 // await dummyobj.insertMany(pcollection)
 // console.log("jsonobj",pcollection)
 //await userCartCollectionObj.insertMany(pcollection)
    res.send({message:"deleted from cart succesfully"});


}))






userApi.post("/delete-from-range",expressErrorHandler(async(req,res,next)=>{

    let userCartCollectionObj=req.app.get("userCartCollectionObj")
    let newProductObject=req.body; 
    //console.log(newProductObject)
    
    let usercartobj=await userCartCollectionObj.findOne({username:newProductObject.username});
    x=usercartobj.products
    for(var i=0;i<x.length;i++){
        if(x[i].model==newProductObject.productObject.model){
           // console.log()
            x[i].count-=1
          //console.log(newProductObject.productObject.count)
          break
        }
    }
    await userCartCollectionObj.updateOne({username:newProductObject.username},{$set:{...usercartobj}})
   let latestcartobj=await userCartCollectionObj.findOne({username:newProductObject.username})
   res.send({message:"product added to cart",latestcartobj:latestcartobj})
   console.log(latestcartobj)


}))


userApi.post("/deletefromusercart",expressErrorHandler(async(req,res,next)=>{
    let userCartCollectionObj=req.app.get("userCartCollectionObj")
    let newProductObject=req.body; 
    //console.log(newProductObject)
    
    let usercartobj=await userCartCollectionObj.findOne({username:newProductObject.username});
    p=usercartobj.products
    for(let j=0;j<p.length;j++){
        if(p[j].model==newProductObject.productObject.model){
            p.splice(j,1)
            //console.log(p[j].model)
        }
    }
    await userCartCollectionObj.updateOne({username:newProductObject.username},{$set:{...usercartobj}})
   let latestcartobj=await userCartCollectionObj.findOne({username:newProductObject.username})
   res.send({message:"product deleted from cart",latestcartobj:latestcartobj})

}))






//get products from usercart
userApi.get("/getproducts/:username",expressErrorHandler(async(req,res,next)=>{
    let userCartCollectionObj=req.app.get("userCartCollectionObj")
    let un=req.params.username
    let products=await userCartCollectionObj.findOne({username:un})
    //console.log(products)
    if(products===null){
        res.send({message:"cart-empty"})
    }
    else{
    res.send({message:products})
    }
}))




userApi.post("/addcontactqueries",expressErrorHandler(async(req,res,next)=>{
    let contactCollectionObj=req.app.get("contactCollectionObj")
    let contactform=req.body;
    console.log(contactform)
    await contactCollectionObj.insertOne(contactform)
    res.send({message:"success"})

}))












//dummmy private data
userApi.get('/testing',checkToken,(req,res)=>{
    res.send({message:"this is private data"})
})
//export
module.exports = userApi;