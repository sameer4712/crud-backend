import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: [
        {
            productName: {
                type: String,
                required: true
            },
            productPrice: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            subtotal: {
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        requied: true
    },
    deliveryStatus: {
        type: String,
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const OrderDetails = mongoose.model('Orders', OrderSchema)

export default OrderDetails