import { json } from "stream/consumers";
import cartDetails from "../models/CartModel.js";
import productDetails from "../models/productModel.js";
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
        const Cart = await cartDetails.aggregate([{
            $facet: {
                total: [
                    {
                        $match: {
                            userId: userId
                        },
                    },
                    {
                        $unwind: "$items",
                    },
                    {
                        $lookup: {
                            from: 'products',
                            localField: "items.productId",
                            foreignField: "_id",
                            as: 'productDetails'
                        }
                    },
                    {
                        $unwind: "$productDetails"
                    },
                    {
                        $addFields: {
                            subtotal: {
                                $multiply: ["$productDetails.price", "$items.quantity"]
                            }
                        }
                    },
                    {
                        $group: {
                            _id: " ",
                            total: { $sum: "$subtotal" }
                        }
                    }
                ],
                details: [
                    {
                        $match: {
                            userId: userId
                        },
                    },
                    {
                        $unwind: "$items"
                    },
                    {
                        $lookup: {
                            from: "products",
                            localField: "items.productId",
                            foreignField: "_id",
                            as: "productDetails"
                        }
                    },
                    {
                        $unwind: "$productDetails"
                    },
                    {
                        $addFields: {
                            subtotal: {
                                $multiply: ["$productDetails.price", "$items.quantity"]
                            }
                        }
                    }

                ]
            }
        }])
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
        const id = req.session.id
        const userId = id
        const productId = req.params.id
        const ThisCart = await cartDetails.findOne({ userId })
        if(ThisCart){
            const findIndex = await ThisCart.findIndex.items((item)=>{
                return item.productId==productId
            })
        }

    }
    catch (err) {
        res.json(err)
    }
}