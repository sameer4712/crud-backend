import mongoose from "mongoose";

const cartShema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        require:true
    },

    items:[{
        productId:{
            type:mongoose.Types.ObjectId,
            required:true
        },
        quantity:{
            type:Number,
            default:1
        },
    },
],
    total:{
        type:Number,
        required:false
    }
});

const cartDetails = mongoose.model('cart',cartShema)

export default cartDetails