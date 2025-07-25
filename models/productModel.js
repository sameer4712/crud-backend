import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
})

const productDetails = mongoose.model("Product",productSchema)

export default productDetails