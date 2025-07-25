import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    }
})

const CategoryDetails = mongoose.model('category',categorySchema)

export default CategoryDetails