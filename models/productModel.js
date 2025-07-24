import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    Image:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Stock:{
        type:Number,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
})

const productDetails = new mongoose.model("Product",productSchema)

export default productDetails