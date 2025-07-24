import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productImage:{
        type:String,
        required:true
    },
        productName:{
        type:String,
        required:true
    },
        productDescription:{
        type:String,
        required:true
    },
        productStock:{
        type:Number,
        required:true
    },
        productCategory:{
        type:String,
        required:true
    },
        productPrice:{
        type:Number,
        required:true
    },
})

const productDetails = new mongoose.model("Product",productSchema)

export default productDetails