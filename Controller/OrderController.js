import OrderDetails from "../models/OrderModel.js";
import mongoose from "mongoose";
import cartDetails from "../models/CartModel.js";
import productDetails from "../models/productModel.js";

// Order creating
export const createOrder = async (req, res) => {

    const userId = req.session.user.id
    const ThisCart = await cartDetails.findOne({ userId })
    if (!ThisCart) {
        res.json({ message: "The cart is empty" })
    }

    let total = 0;
    let subtotal = 0;
    let items = [];
    for (let item of ThisCart.items) {
        const product = await productDetails.findById(item.productId)

        if (!product) { continue }
        subtotal = product.price * item.quantity;
        total += subtotal;
        items.push({
            userId,
            productName: product.name,
            productPrice: product.price,
            quantity: item.quantity,
            subtotal
        })


    }
    const set = await OrderDetails.create({
        userId,
        items,
        total,
        deliveryStatus: "Pending"

    })

    await cartDetails.deleteOne({ userId })
    return res.json({ mesasge: "order Placed", details: set })
}

// Show the ordered orderss
export const showOrder = async (req, res) => {
    const id = req.session.user.id
    const order = await OrderDetails.findOne({ userId: id })
    res.json({ message: "Your order is ", order })
}

// Edit the status
export const editStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { deliveryStatus } = req.body
        const findOrder = await OrderDetails.findById(id)
        findOrder.deliveryStatus = deliveryStatus
        await findOrder.save()
        return res.json({ message: "Updated status", status: findOrder.deliveryStatus })
    }
    catch (err) {
        res.json(err)
    }
}


// Deleting the order

export const deleteOrder = async (req,res)=>{
    try{
        const id = req.params.id;
        const del = await OrderDetails.deleteOne(id)
        return res.json({message:"This order has been deleted..",del})
    }
    catch(err){
        return res.json(err)
    }
}
