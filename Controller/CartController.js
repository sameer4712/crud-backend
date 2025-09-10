
import cartDetails from "../models/CartModel.js";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
    const productId = req.params.id
    const { quantity } = req.body
    const { id } = req.session.user
    const userId = id

    const newProductId = productId
    try {
        let cartExist = await cartDetails.findOne({ userId });

        if (cartExist) {
            const indexOfExistCart = await cartExist.items.findIndex((item) => {
                return item.productId == newProductId;
            });


            if (indexOfExistCart !== -1) {
                cartExist.items[indexOfExistCart].quantity += quantity
            } else {
                const PushData = {
                    productId,
                    quantity
                };
                cartExist.items.push(PushData)
            }
            await cartExist.save();
            res.json({ message: "Product added successfully..", Items: cartExist })
        } else {
            const DataToInsert = {
                userId,
                items: [{ productId, quantity }]
            };
            const newData = await cartDetails.create(DataToInsert)
            res.json(newData)

        }

    }
    catch (err) {
        res.json({ message: err })
    }
}

// Show the details of carts

export const showCart = async (req, res) => {
    try {
        const id = req.session.user
        const userId = new mongoose.Types.ObjectId(id)
        const Cart = await cartDetails.aggregate([
           {
            $match:{
                userId:userId
            }
           },   
           {
            $unwind:"$items"
           },
           {
            $lookup:{
                from:"products",
                localField:"items.productId",
                foreignField:"_id",
                as:"Details"            
                    },
           },
           {
            $unwind:"$Details"
           },
           {
            $addFields:{
                subtotal:{
                    $multiply:["$items.quantity","$Details.price"]
                }
            }
           },
           {
            $group:{
                _id:"userId",
                cartitems:{
                    $push:{
                        productId:"$items.productId",
                        quantity:"$items.quantity",
                        name:"$Details.name",
                        image:"$Details.image",
                        price:"$Details.price",
                        subtotal:"$subtotal"
                    }
                },
                total:{$sum:"$subtotal"}
            }
           }
        ])
        console.log(Cart[0]);
        return res.json({ Cart })

    }
    catch (err) {
        res.json(err)
    }
}

// Edit cart

export const EditCart = async (req, res) => {
    const userId = req.session.user.id;
    const { quantity } = req.body;
    const quan = quantity;
    const productId = req.params.id;
    try {
        const newCart = await cartDetails.findOne({ userId })
        if (newCart) {
            const findIndex = newCart.items.findIndex((item) => {
                return item.productId == productId
            })
            if (findIndex !== -1)
                newCart.items[findIndex].quantity = quan
            await newCart.save()
            return res.json({ message: "Your cart has been updated..", cart: newCart })
        }
        else {
            res.json({ message: "id with that product does not exist so how can you edit it " })
        }
    } catch (err) {
        return res.json({ err })
    }

}

// Delete a Cart

export const DeleteCart = async (req, res) => {
    try {
        const { id } = req.session.user
        const userId = id
        const product = req.params.id
        const ThisCart = await cartDetails.findOne({ userId })
        if (ThisCart) {
            const findIndex = ThisCart.items.findIndex((item) => {
                return item.productId == product
            })
            if (findIndex === -1) {
                return res.json({ message: "product not found" })
            }
            const del = ThisCart.items.splice(findIndex, 1)
            await ThisCart.save()
            res.json({ message: "Product deleted successfully..", deleted: del })
        } else {
            res.json({ message: "No cart is found for this person.." })
        }

    }
    catch (err) {
        res.json(err)
    }
}