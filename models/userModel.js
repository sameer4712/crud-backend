import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        name:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
        image:{
            type:String,
            require:true
        }
})

const userDetails = mongoose.model('users',userSchema)

export default userDetails