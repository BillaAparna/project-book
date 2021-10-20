const cloudinary=require("cloudinary").v2
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")

//configure cloduinary
cloudinary.config({
    cloud_name:'djky1lqvr',
    api_key:'148849858313177',
    api_secret:'M2W_UCrGLBTUvX5S1Ut7rE7mdHs'
})
//configure multer-storage-cloudinary
const clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return{
            folder:"vnr2021",
            public_id:file.fieldname+'-'+Date.now()
        }
    }
})
//configure multer
const multerObj=multer({storage:clStorage})
module.exports=multerObj;