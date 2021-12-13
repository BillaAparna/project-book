const exp=require("express")
const app=exp()
app.use(exp.json())
const userApi=require('./APIS/user-api')
const adminApi=require('./APIS/admin-api')
const productApi=require('./APIS/product-api')
const path=require("path")
require("dotenv").config()
//connect angular app with express server
app.use(exp.static(path.join(__dirname,'./dist/application1/')))
app.use('/user',userApi)
app.use('/admin',adminApi)
app.use('/product',productApi)
app.use((err,req,res,next)=>{
    res.send({message:`error is ${err}`})
})


//import MongoCLient

const mc = require("mongodb").MongoClient;



//connection string
//const databaseUrl = "mongodb+srv://mydatabase:Aparna@mydb.sl19c.mongodb.net/vnrdb2021?retryWrites=true&w=majority"
const databaseUrl=process.env.DATABASE_URL

//const databaseUrl="mongodb://<username>:<password>@cluster0-shard-00-00.rjvoz.mongodb.net:27017,cluster0-shard-00-01.rjvoz.mongodb.net:27017,cluster0-shard-00-02.rjvoz.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"


//connect to DB
mc.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

    if (err) {
        console.log("err in db connection", err)
    }
    else {
        //get database object
        let databaseObj = client.db("vnrdb2021")
        //create usercollection object
        let userCollectionObj = databaseObj.collection("usercollection")
        let productCollectionObj=databaseObj.collection("productcollection")
        let userCartCollectionObj=databaseObj.collection("usercartcollection")
        let contactCollectionObj=databaseObj.collection("contactcollection")
        let categoryCollectionObj=databaseObj.collection("categorycollection")
        let orderCollectionObj=databaseObj.collection("ordercollection")
        let userOrderCollectionObj=databaseObj.collection("userordercollection")
        app.set("userCollectionObj",userCollectionObj)
        app.set("productCollectionObj",productCollectionObj)
        app.set("contactCollectionObj",contactCollectionObj)
        app.set("userCartCollectionObj",userCartCollectionObj)
        app.set("categoryCollectionObj",categoryCollectionObj)
        app.set("orderCollectionObj",orderCollectionObj)
        app.set("userOrderCollectionObj",userOrderCollectionObj)

        console.log("connected to database")

    }
})



const port=process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})